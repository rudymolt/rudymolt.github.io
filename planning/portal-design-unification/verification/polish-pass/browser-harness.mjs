#!/usr/bin/env node

import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../../../../");
const SHOTS = join(HERE, "screenshots");
const PROFILE = join(HERE, ".chrome-profile");
const CHROME = process.env.CHROME_BIN || "google-chrome";
const CANDIDATE = "fd797cf1d634289634ad352a9cbfa73be44ed82f";
const WIDTHS = [390, 768, 1440];
const ACTIVE_PAGES = [
  "agent-engineering-playbook/index.html",
  "agent-engineering-playbook/00-foundations.html",
  "agent-engineering-playbook/10-process/01-align.html",
  "agent-engineering-playbook/10-process/04-breakdown.html",
  "agent-engineering-playbook/10-process/index.html",
  "agent-engineering-playbook/20-frontend-track.html",
  "agent-engineering-playbook/30-document-lifecycle.html",
  "agent-engineering-playbook/50-how-to-write-code-with-ai.html",
  "agent-engineering-playbook/60-the-theory-behind-the-playbook.html",
  "agent-engineering-playbook/70-lite-mode.html",
  "agent-engineering-playbook/80-quickstart.html",
  "agent-engineering-playbook/glossary.html",
];

const sleep = (ms) => new Promise((resolvePromise) => setTimeout(resolvePromise, ms));

async function freePort() {
  const server = createServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const port = server.address().port;
  await new Promise((resolvePromise) => server.close(resolvePromise));
  return port;
}

async function waitFor(url, ceilingMs = 10000) {
  const start = Date.now();
  let lastError;
  while (Date.now() - start < ceilingMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
      lastError = new Error(`${response.status} ${response.statusText}`);
    } catch (error) { lastError = error; }
    await sleep(100);
  }
  throw new Error(`Timed out waiting for ${url}: ${lastError?.message || "unknown"}`);
}

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
    ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(`${pending.method}: ${message.error.message}`));
        else pending.resolve(message.result || {});
        return;
      }
      for (const listener of this.listeners.get(message.method) || []) listener(message.params || {});
    });
  }
  static async connect(url) {
    const ws = new WebSocket(url);
    await new Promise((resolvePromise, reject) => {
      ws.addEventListener("open", resolvePromise, { once: true });
      ws.addEventListener("error", reject, { once: true });
    });
    return new CDP(ws);
  }
  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolvePromise, reject) => {
      this.pending.set(id, { resolve: resolvePromise, reject, method });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  on(method, listener) {
    if (!this.listeners.has(method)) this.listeners.set(method, []);
    this.listeners.get(method).push(listener);
  }
  event(method, ceilingMs = 15000) {
    return new Promise((resolvePromise, reject) => {
      const timer = setTimeout(() => reject(new Error(`Timed out waiting for ${method}`)), ceilingMs);
      const listener = (params) => {
        clearTimeout(timer);
        this.listeners.set(method, (this.listeners.get(method) || []).filter((item) => item !== listener));
        resolvePromise(params);
      };
      this.on(method, listener);
    });
  }
  close() { try { this.ws.close(); } catch {} }
}

async function evaluate(cdp, expression, awaitPromise = false) {
  const result = await cdp.send("Runtime.evaluate", { expression, awaitPromise, returnByValue: true, userGesture: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || "Runtime evaluation failed");
  return result.result?.value;
}

async function createPage(debugPort, baseUrl, path, width) {
  const response = await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: "PUT" });
  const target = await response.json();
  const cdp = await CDP.connect(target.webSocketDebuggerUrl);
  const logs = { console: [], exceptions: [], network: [], http: [], ignored: [] };
  cdp.on("Runtime.consoleAPICalled", (event) => {
    if (["error", "assert"].includes(event.type)) logs.console.push(event.args.map((arg) => arg.value || arg.description || "").join(" "));
  });
  cdp.on("Runtime.exceptionThrown", (event) => logs.exceptions.push(event.exceptionDetails?.text || "Uncaught exception"));
  cdp.on("Network.loadingFailed", (event) => { if (!event.canceled) logs.network.push({ url: event.url, error: event.errorText, type: event.type }); });
  cdp.on("Network.responseReceived", (event) => {
    if (event.response?.status < 400) return;
    const item = { url: event.response.url, status: event.response.status, type: event.type };
    if (new URL(event.response.url).pathname === "/favicon.ico") logs.ignored.push(item);
    else logs.http.push(item);
  });
  await Promise.all([cdp.send("Page.enable"), cdp.send("Runtime.enable"), cdp.send("Network.enable"), cdp.send("DOM.enable"), cdp.send("CSS.enable")]);
  await cdp.send("Emulation.setDeviceMetricsOverride", { width, height: 1000, deviceScaleFactor: 1, mobile: false, screenWidth: width, screenHeight: 1000 });
  const loaded = cdp.event("Page.loadEventFired");
  await cdp.send("Page.navigate", { url: `${baseUrl}/${path}` });
  await loaded;
  await evaluate(cdp, "document.fonts?.ready || true", true);
  await sleep(200);
  return { target, cdp, logs, path, width };
}

async function closePage(debugPort, page) {
  page.cdp.close();
  try { await fetch(`http://127.0.0.1:${debugPort}/json/close/${page.target.id}`); } catch {}
}

function runtimeResult(logs) {
  return { ...logs, pass: !logs.console.length && !logs.exceptions.length && !logs.network.length && !logs.http.length };
}

async function screenshotElement(page, selector, filename, padding = 18) {
  const rect = await evaluate(page.cdp, `(async()=>{const e=document.querySelector(${JSON.stringify(selector)});document.documentElement.style.scrollBehavior='auto';e.scrollIntoView({block:'center'});await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));const r=e.getBoundingClientRect();return {x:Math.max(0,scrollX+r.left-${padding}),y:Math.max(0,scrollY+r.top-${padding}),width:Math.min(innerWidth, r.width+${padding * 2}),height:Math.min(innerHeight, r.height+${padding * 2})};})()`, true);
  const data = await page.cdp.send("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: true, clip: { ...rect, scale: 1 } });
  await writeFile(join(SHOTS, filename), Buffer.from(data.data, "base64"));
  return { file: `screenshots/${filename}`, ...rect };
}

async function responsiveAudit(page) {
  return evaluate(page.cdp, `(()=>{
    const root=document.documentElement, body=document.body;
    const visible=e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0};
    const targets=[...document.querySelectorAll('.skip-link,.masthead-portal,.guide-sequence a,.guide-toggle,.quiz-options button,.start-path')].filter(visible).map(e=>{const r=e.getBoundingClientRect();return {selector:e.className||e.tagName,text:e.textContent.trim().replace(/\\s+/g,' '),width:+r.width.toFixed(2),height:+r.height.toFixed(2),pass:r.height>=44}});
    return {
      path:location.pathname,width:innerWidth,documentWidth:root.scrollWidth,bodyWidth:body.scrollWidth,
      horizontalOverflow:Math.max(root.scrollWidth,body.scrollWidth)>root.clientWidth+1,
      targets,targetFloorPass:targets.length>0&&targets.every(t=>t.pass),
      oneH1:document.querySelectorAll('h1').length===1,
    };
  })()`);
}

async function quizAudit(page) {
  const styleExpression = `(()=>{
    const parse=c=>{const m=c.match(/[\\d.]+/g).map(Number);return m.slice(0,3)};
    const luminance=c=>parse(c).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
    const ratio=(a,b)=>{const x=luminance(a),y=luminance(b);return +((Math.max(x,y)+.05)/(Math.min(x,y)+.05)).toFixed(2)};
    return [...document.querySelectorAll('.quiz-options button')].map(button=>{const s=getComputedStyle(button),r=button.getBoundingClientRect();return {text:button.textContent.trim(),color:s.color,background:s.backgroundColor,border:s.borderColor,contrast:ratio(s.color,s.backgroundColor),height:+r.height.toFixed(2),chosen:button.classList.contains('chosen'),correct:button.classList.contains('is-correct')};});
  })()`;
  const before = await evaluate(page.cdp, styleExpression);
  const beforeShot = await screenshotElement(page, "[data-quiz]", `process-${page.width}-quiz-before.png`);
  const interaction = await evaluate(page.cdp, `(async()=>{const q=document.querySelector('[data-quiz]'),b=q.querySelector('[data-quiz-option][data-correct="true"]'),f=q.querySelector('[data-quiz-feedback]');b.click();await new Promise(r=>setTimeout(r,60));return {feedback:f.textContent.trim(),hidden:f.hidden,focused:document.activeElement===f,role:f.getAttribute('role')};})()`, true);
  const after = await evaluate(page.cdp, styleExpression);
  const afterShot = await screenshotElement(page, "[data-quiz]", `process-${page.width}-quiz-after.png`);
  const pass = before.every((item) => item.contrast >= 4.5 && item.height >= 44) && after.every((item) => item.contrast >= 4.5 && item.height >= 44) && !interaction.hidden && interaction.focused && interaction.role === "status" && /Right/.test(interaction.feedback);
  return { before, after, interaction, beforeShot, afterShot, pass };
}

async function guideAudit(page) {
  const metrics = await evaluate(page.cdp, `(()=>{
    const links=[...document.querySelectorAll('.guide-sequence a')];
    const rows=links.map(link=>{const label=link.querySelector('span'),lr=label.getBoundingClientRect(),ar=link.getBoundingClientRect(),s=getComputedStyle(link),ls=getComputedStyle(label);const range=document.createRange();range.selectNodeContents(link);return {text:link.textContent.trim().replace(/\\s+/g,' '),display:s.display,gap:s.gap,height:+ar.height.toFixed(2),label:{text:label.textContent.trim(),top:+lr.top.toFixed(2),bottom:+lr.bottom.toFixed(2),fontSize:ls.fontSize,color:ls.color},destinationTop:+(lr.bottom+parseFloat(s.gap||0)).toFixed(2),whiteSpace:s.whiteSpace};});
    return {rows,pass:rows.length===2&&rows.every(r=>r.display==='grid'&&r.height>=44&&parseFloat(r.gap)>=2&&r.destinationTop>r.label.top)};
  })()`);
  let disclosure = { applicable: page.width <= 640 };
  if (disclosure.applicable) {
    disclosure = await evaluate(page.cdp, `(async()=>{const b=document.querySelector('.guide-toggle'),steps=document.querySelector('.timeline-steps');const initial={expanded:b.getAttribute('aria-expanded'),height:b.getBoundingClientRect().height,display:getComputedStyle(steps).display};b.focus();b.click();const opened={expanded:b.getAttribute('aria-expanded'),display:getComputedStyle(steps).display};b.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));await new Promise(r=>setTimeout(r,20));return {applicable:true,initial,opened,closed:{expanded:b.getAttribute('aria-expanded'),display:getComputedStyle(steps).display,focusReturned:document.activeElement===b},pass:initial.expanded==='false'&&initial.height>=44&&opened.expanded==='true'&&opened.display!=='none'&&b.getAttribute('aria-expanded')==='false'&&getComputedStyle(steps).display==='none'&&document.activeElement===b};})()`, true);
  } else {
    disclosure = await evaluate(page.cdp, `(async()=>{const b=document.querySelector('.guide-toggle'),steps=document.querySelector('.timeline-steps');const initial={buttonDisplay:getComputedStyle(b).display,expanded:b.getAttribute('aria-expanded'),stepsDisplay:getComputedStyle(steps).display,stepsHeight:steps.getBoundingClientRect().height};b.click();await new Promise(r=>setTimeout(r,20));const after={buttonDisplay:getComputedStyle(b).display,expanded:b.getAttribute('aria-expanded'),stepsDisplay:getComputedStyle(steps).display,stepsHeight:steps.getBoundingClientRect().height};return {applicable:false,initial,after,pass:initial.buttonDisplay==='none'};})()`, true);
  }
  const shot = await screenshotElement(page, ".guide-timeline", `process-${page.width}-guide.png`, 8);
  return { ...metrics, disclosure, shot, pass: metrics.pass && disclosure.pass };
}

async function hubStateAudit(page, debugPort, baseUrl) {
  const state = async (name) => {
    const computed = await evaluate(page.cdp, `(()=>{const e=document.querySelector('.start-path'),s=getComputedStyle(e),r=e.getBoundingClientRect();return {color:s.color,background:s.backgroundColor,borderTop:s.borderTopColor,borderBottom:s.borderBottomColor,outlineStyle:s.outlineStyle,outlineWidth:s.outlineWidth,outlineColor:s.outlineColor,outlineOffset:s.outlineOffset,height:+r.height.toFixed(2),url:location.href};})()`);
    const shot = await screenshotElement(page, ".start-path", `hub-${page.width}-start-${name}.png`, 12);
    return { computed, shot };
  };
  const normal = await state("normal");
  let visited = null, hover = null, focus = null;
  if (page.width === 1440) {
    const loaded = page.cdp.event("Page.loadEventFired");
    await page.cdp.send("Page.navigate", { url: `${baseUrl}/agent-engineering-playbook/50-how-to-write-code-with-ai.html` });
    await loaded;
    const hubLoaded = page.cdp.event("Page.loadEventFired");
    await page.cdp.send("Page.navigate", { url: `${baseUrl}/agent-engineering-playbook/index.html` });
    await hubLoaded;
    await sleep(100);
    visited = await state("visited");
    const center = await evaluate(page.cdp, `(()=>{const r=document.querySelector('.start-path').getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2}})()`);
    await page.cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: center.x, y: center.y });
    await sleep(50);
    hover = await state("hover");
    await page.cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 1, y: 1 });
    await evaluate(page.cdp, "document.querySelector('.start-path').focus(); true");
    focus = await state("focus");
  }
  const normalPass = normal.computed.background === "rgba(0, 0, 0, 0)" && normal.computed.height >= 44;
  const statePass = page.width !== 1440 || (
    visited.computed.background === "rgba(0, 0, 0, 0)" &&
    hover.computed.background !== "rgba(0, 0, 0, 0)" &&
    focus.computed.background !== "rgba(0, 0, 0, 0)" &&
    focus.computed.outlineStyle !== "none" && parseFloat(focus.computed.outlineWidth) >= 2
  );
  return { normal, visited, hover, focus, pass: normalPass && statePass };
}

async function main() {
  await mkdir(SHOTS, { recursive: true });
  await rm(PROFILE, { recursive: true, force: true });
  const serverPort = await freePort();
  const debugPort = await freePort();
  const server = spawn("python3", ["-m", "http.server", String(serverPort), "--bind", "127.0.0.1"], { cwd: ROOT, stdio: ["ignore", "ignore", "pipe"] });
  const chrome = spawn(CHROME, ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage", `--remote-debugging-port=${debugPort}`, `--user-data-dir=${PROFILE}`, "about:blank"], { stdio: ["ignore", "ignore", "pipe"] });
  const baseUrl = `http://127.0.0.1:${serverPort}`;
  const results = { metadata: { candidate: CANDIDATE, startedAt: new Date().toISOString(), widths: WIDTHS }, responsive: [], quiz: [], guide: [], hub: [], runtime: [], cleanup: {}, verdict: "FAIL" };
  try {
    await Promise.all([waitFor(`${baseUrl}/agent-engineering-playbook/index.html`), waitFor(`http://127.0.0.1:${debugPort}/json/version`)]);
    const version = await (await fetch(`http://127.0.0.1:${debugPort}/json/version`)).json();
    results.metadata.browser = version.Browser;
    for (const width of WIDTHS) {
      for (const path of ACTIVE_PAGES) {
        const page = await createPage(debugPort, baseUrl, path, width);
        try {
          results.responsive.push(await responsiveAudit(page));
          results.runtime.push({ path, width, ...runtimeResult(page.logs) });
        } finally { await closePage(debugPort, page); }
      }
      const processPage = await createPage(debugPort, baseUrl, "agent-engineering-playbook/10-process/index.html", width);
      try {
        results.guide.push({ width, ...(await guideAudit(processPage)) });
        results.quiz.push({ width, ...(await quizAudit(processPage)) });
        results.runtime.push({ path: `${processPage.path}#state-probes`, width, ...runtimeResult(processPage.logs) });
      } finally { await closePage(debugPort, processPage); }
      const hubPage = await createPage(debugPort, baseUrl, "agent-engineering-playbook/index.html", width);
      try {
        results.hub.push({ width, ...(await hubStateAudit(hubPage, debugPort, baseUrl)) });
        results.runtime.push({ path: `${hubPage.path}#state-probes`, width, ...runtimeResult(hubPage.logs) });
      } finally { await closePage(debugPort, hubPage); }
    }
    results.verdict = results.responsive.every((item) => !item.horizontalOverflow && item.targetFloorPass && item.oneH1) && results.quiz.every((item) => item.pass) && results.guide.every((item) => item.pass) && results.hub.every((item) => item.pass) && results.runtime.every((item) => item.pass) ? "PASS" : "FAIL";
  } finally {
    results.metadata.finishedAt = new Date().toISOString();
    chrome.kill("SIGTERM");
    server.kill("SIGTERM");
    await Promise.allSettled([once(chrome, "exit"), once(server, "exit")]);
    let profileRemoved = false;
    for (let attempt = 0; attempt < 3 && !profileRemoved; attempt += 1) {
      await sleep(500 * (attempt + 1));
      try { await rm(PROFILE, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 }); profileRemoved = true; } catch {}
    }
    if (!profileRemoved) throw new Error(`Unable to remove Chrome evidence profile: ${PROFILE}`);
    results.cleanup = { chromeStopped: true, serverStopped: true, profileRemoved: true };
    await writeFile(join(HERE, "browser-results.json"), `${JSON.stringify(results, null, 2)}\n`);
  }
  console.log(JSON.stringify({ verdict: results.verdict, browser: results.metadata.browser, responsiveChecks: results.responsive.length, screenshots: results.quiz.length * 2 + results.guide.length + results.hub.reduce((n, item) => n + [item.normal,item.visited,item.hover,item.focus].filter(Boolean).length, 0), runtimeFailures: results.runtime.filter((item) => !item.pass).length }, null, 2));
  if (results.verdict !== "PASS") process.exitCode = 1;
}

main().catch((error) => { console.error(error.stack || error.message); process.exitCode = 2; });
