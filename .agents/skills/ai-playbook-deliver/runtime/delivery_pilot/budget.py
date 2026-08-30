"""Executable active-time and TTL accounting."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime


class CeilingError(RuntimeError):
    pass


@dataclass
class ActiveTimeLedger:
    total_limit: int
    phase_limits: dict[str, int] = field(default_factory=dict)
    total_seconds: int = 0
    by_phase: dict[str, int] = field(default_factory=dict)
    charged_ids: set[str] = field(default_factory=set)
    open_intervals: dict[str, tuple[str, int]] = field(default_factory=dict)

    def start(self, interval_id: str, phase: str, monotonic_second: int) -> None:
        if interval_id in self.charged_ids or interval_id in self.open_intervals:
            return
        self.open_intervals[interval_id] = (phase, monotonic_second)

    def stop(self, interval_id: str, monotonic_second: int) -> int:
        if interval_id in self.charged_ids:
            return 0
        if interval_id not in self.open_intervals:
            return 0
        phase, started = self.open_intervals.pop(interval_id)
        if monotonic_second < started:
            raise CeilingError("interval ended before it started")
        seconds = int(monotonic_second - started)
        self.total_seconds += seconds
        self.by_phase[phase] = self.by_phase.get(phase, 0) + seconds
        self.charged_ids.add(interval_id)
        self._check_limits(phase)
        return seconds

    def split(self, interval_id: str, new_phase: str, monotonic_second: int) -> str:
        self.stop(interval_id, monotonic_second)
        next_id = f"{interval_id}:{new_phase}:{monotonic_second}"
        self.start(next_id, new_phase, monotonic_second)
        return next_id

    def reconcile_unknown(self, interval_id: str) -> None:
        if interval_id in self.open_intervals:
            raise CeilingError(f"interval {interval_id} has no trustworthy end")

    def check_ttl(self, now: datetime, expires_at: datetime) -> None:
        if now >= expires_at:
            raise CeilingError("mission TTL expired")

    def extend(self, limit_name: str, new_seconds: int, authorized: bool) -> None:
        if not authorized:
            raise CeilingError("ceiling extension is not authorized")
        if limit_name == "active_seconds_total":
            if new_seconds <= self.total_limit:
                raise CeilingError("extension must raise the exact named limit")
            self.total_limit = new_seconds
            return
        prefix = "active_seconds_by_phase."
        if not limit_name.startswith(prefix):
            raise CeilingError("unknown ceiling extension target")
        phase = limit_name.removeprefix(prefix)
        current = self.phase_limits.get(phase, 0)
        if new_seconds <= current:
            raise CeilingError("extension must raise the exact named limit")
        self.phase_limits[phase] = new_seconds

    def _check_limits(self, phase: str) -> None:
        if self.total_seconds >= self.total_limit:
            raise CeilingError("mission active-time ceiling reached")
        phase_limit = self.phase_limits.get(phase)
        if phase_limit is not None and self.by_phase[phase] >= phase_limit:
            raise CeilingError(f"{phase} active-time ceiling reached")
