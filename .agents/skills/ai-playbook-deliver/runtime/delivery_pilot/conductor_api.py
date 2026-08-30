"""Minimal fail-closed adapter for the beta Conductor Cloud API."""

from __future__ import annotations

import json
import os
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from typing import Any, Callable

from .canonical import digest
from .contracts import ContractError


Transport = Callable[[str, str, dict[str, str], dict[str, Any] | None], tuple[int, dict[str, Any]]]


class ConductorApiError(ContractError):
    def __init__(self, method: str, path: str, status: int):
        super().__init__(f"Conductor API {method} {path} failed with HTTP {status}")
        self.status = status


def normalize_api_url(value: str) -> tuple[str, str]:
    """Return (origin, v0 base), accepting either documented environment form."""

    value = value.rstrip("/")
    parsed = urllib.parse.urlparse(value)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc or parsed.query or parsed.fragment:
        raise ContractError("invalid CONDUCTOR_API_URL")
    if parsed.path in ("", "/"):
        origin = value
        return origin, origin + "/v0"
    if parsed.path == "/v0":
        return value[:-3], value
    raise ContractError("CONDUCTOR_API_URL must be an origin or end exactly in /v0")


def _urllib_transport(method: str, url: str, headers: dict[str, str], body: dict[str, Any] | None) -> tuple[int, dict[str, Any]]:
    raw = None if body is None else json.dumps(body, sort_keys=True, separators=(",", ":")).encode()
    request = urllib.request.Request(url, data=raw, method=method, headers=headers)
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return response.status, json.loads(response.read())
    except urllib.error.HTTPError as exc:
        try:
            payload = json.loads(exc.read())
        except (json.JSONDecodeError, UnicodeDecodeError):
            payload = {"error": "non-json API error"}
        return exc.code, payload


@dataclass
class ConductorApiClient:
    api_url: str
    credential: str
    session_id: str | None = None
    transport: Transport = _urllib_transport
    user_agent: str = "ai-engineering-playbook-k3/1"

    @classmethod
    def from_environment(cls, transport: Transport = _urllib_transport) -> "ConductorApiClient":
        credential = os.environ.get("CONDUCTOR_API_KEY") or os.environ.get("CONDUCTOR_API_TOKEN")
        if not credential:
            raise ContractError("CONDUCTOR_API_KEY or CONDUCTOR_API_TOKEN is required")
        return cls(os.environ.get("CONDUCTOR_API_URL", ""), credential, os.environ.get("CONDUCTOR_SESSION_ID"), transport)

    def __post_init__(self) -> None:
        self.origin, self.v0 = normalize_api_url(self.api_url)
        if not self.credential:
            raise ContractError("Conductor API credential is empty")

    @property
    def headers(self) -> dict[str, str]:
        result = {"Authorization": f"Bearer {self.credential}", "Content-Type": "application/json", "User-Agent": self.user_agent}
        if self.session_id:
            result["X-Conductor-Session-Id"] = self.session_id
        return result

    def _call(self, method: str, path: str, body: dict[str, Any] | None = None, *, versioned: bool = True) -> dict[str, Any]:
        base = self.v0 if versioned else self.origin
        status, payload = self.transport(method, base + path, self.headers, body)
        if status < 200 or status >= 300:
            raise ConductorApiError(method, path, status)
        if not isinstance(payload, dict):
            raise ContractError("Conductor API returned a non-object")
        return payload

    def capability_preflight(self) -> dict[str, Any]:
        identity = self._call("GET", "/me", versioned=False)
        spec_status, spec = self.transport("GET", self.v0 + "/openapi.json", self.headers, None)
        if spec_status != 200 or not isinstance(spec, dict) or not spec.get("openapi"):
            raise ContractError("Conductor OpenAPI capability preflight failed")
        auth = identity.get("authMethod")
        if auth not in {"api-key", "access-jwt", "legacy-api-token"}:
            raise ContractError("unsupported Conductor authentication method")
        scope = "workspace" if identity.get("workspaceId") else "organization"
        return {
            "outcome": "ready", "auth_method": auth, "credential_scope": scope,
            "workspace_id": identity.get("workspaceId"), "openapi_version": spec.get("openapi"),
            "api_version": spec.get("info", {}).get("version"), "openapi_digest": digest(spec),
        }

    def create_workspace(self, body: dict[str, Any]) -> dict[str, Any]:
        return self._call("POST", "/workspaces", body)

    def observe_workspace(self, workspace_id: str) -> dict[str, Any]:
        return self._call("GET", f"/workspaces/{workspace_id}/status")

    def launch_checker(self, workspace_id: str, prompt: str, agent: str, model: str, effort: str, message_id: str) -> dict[str, Any]:
        body = {"workspaceId": workspace_id, "agent": agent, "model": model, "effort": effort, "message": prompt, "messageId": message_id}
        try:
            return self._call("POST", "/sessions", body)
        except ConductorApiError as exc:
            if exc.status < 500:
                raise
            observed = self.observe_message(message_id)
            return {"id": observed["sessionId"], "initialMessage": {"messageId": observed["id"], "state": "sent"}, "reconciled": True}
        except OSError:
            # The stable message ID is the idempotency/reconciliation key. Do
            # not blindly repeat a potentially accepted POST.
            observed = self.observe_message(message_id)
            return {"id": observed["sessionId"], "initialMessage": {"messageId": observed["id"], "state": "sent"}, "reconciled": True}

    def send_message(self, session_id: str, message: str, message_id: str) -> dict[str, Any]:
        try:
            return self._call("POST", f"/sessions/{session_id}/messages", {"message": message, "messageId": message_id})
        except ConductorApiError as exc:
            if exc.status < 500:
                raise
            return {**self.observe_message(message_id), "reconciled": True}
        except OSError:
            return {**self.observe_message(message_id), "reconciled": True}

    def observe_message(self, message_id: str) -> dict[str, Any]:
        return self._call("GET", f"/messages/{message_id}")

    def observe_session(self, session_id: str, after_message_id: str | None = None) -> dict[str, Any]:
        messages_data: list[dict[str, Any]] = []
        cursor = after_message_id
        while True:
            suffix = "?limit=100" + ("" if cursor is None else "&after=" + urllib.parse.quote(cursor, safe=""))
            page = self._call("GET", f"/sessions/{session_id}/messages{suffix}")
            data = page.get("data", [])
            if not isinstance(data, list):
                raise ContractError("Conductor messages response is malformed")
            messages_data.extend(data)
            if not page.get("hasMore"):
                messages = {"data": messages_data, "hasMore": False, "offset": 0}
                break
            if not data or not isinstance(data[-1].get("id"), str):
                raise ContractError("Conductor messages pagination made no progress")
            cursor = data[-1]["id"]
        status = self._call("GET", f"/sessions/{session_id}/status")
        return {"status": status, "messages": messages}

    def cancel_session(self, session_id: str) -> dict[str, Any]:
        result = self._call("POST", f"/sessions/{session_id}/cancel")
        if result.get("status") == "error":
            raise ContractError("Conductor cancellation entered adapter error state")
        return {**result, "cancellation_outcome": "complete" if result.get("status") == "idle" else "pending"}

    def sleep_workspace(self, workspace_id: str) -> dict[str, Any]:
        result = self._call("POST", f"/workspaces/{workspace_id}/sleep")
        if result.get("status") == "archived":
            raise ContractError("workspace became archived; parking did not succeed")
        return result

    def request_archive(self, workspace_id: str) -> dict[str, Any]:
        return self._call("POST", f"/workspaces/{workspace_id}/archive")


def session_completion(status_history: list[str], messages: list[dict[str, Any]]) -> str:
    if "error" in status_history:
        raise ContractError("Conductor session entered adapter error state")
    content = messages[-1].get("content") if messages else None
    nonempty_content = bool(content.strip()) if isinstance(content, str) else bool(content)
    terminal_reply = bool(
        messages
        and messages[-1].get("type") in {"assistant", "agent"}
        and nonempty_content
    )
    if status_history and status_history[-1] == "idle" and "working" in status_history and terminal_reply:
        return "complete"
    return "pending"


def validate_runtime_review(
    workspace: dict[str, Any], session: dict[str, Any], *, workspace_id: str,
    session_id: str, agent: str, model: str, effort: str,
) -> dict[str, Any]:
    if workspace.get("workspaceId") != workspace_id or workspace.get("status") != "ready":
        raise ContractError("Cloud workspace identity or readiness mismatch")
    if session.get("id") != session_id:
        raise ContractError("Cloud session identity mismatch")
    if session.get("agent") not in (None, agent):
        raise ContractError("Cloud session agent mismatch")
    if session.get("model") != model or session.get("effort") != effort:
        raise ContractError("Cloud session model/effort mismatch")
    return {"outcome": "pass", "workspace_id": workspace_id, "session_id": session_id, "agent": agent, "model": model, "effort": effort}
