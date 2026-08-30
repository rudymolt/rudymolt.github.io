#!/usr/bin/env node

import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../../../../");
const OUT = HERE;
const SHOTS = join(OUT, "screenshots");
const CHROME = process.env.CHROME_BIN || "google-chrome";
const HEAD = "5985fbd390a05b226451b0f2b7f47d78ca2f3fcc";
const MAX_RETRIES = 2;
const MAX_CAPTURE_HEIGHT = 8000;

const pages = [
  "agent-engineering-playbook/index.html",
  "agent-engineering-playbook/50-how-to-write-code-with-ai.html",
  "agent-engineering-playbook/60-the-theory-behind-the-playbook.html",
  "agent-engineering-playbook/10-process/index.html",
  "agent-engineering-playbook/00-foundations.html",
  "agent-engineering-playbook/20-frontend-track.html",
  "agent-engineering-playbook/30-document-lifecycle.html",
  "agent-engineering-playbook/70-lite-mode.html",
  "agent-engineering-playbook/10-process/01-align.html",
  "agent-engineering-playbook/10-process/04-breakdown.html",
  "agent-engineering-playbook/80-quickstart.html",
  "agent-engineering-playbook/glossary.html",
];

const representatives = {
  hub: "agent-engineering-playbook/index.html",
  drive: "agent-engineering-playbook/50-how-to-write-code-with-ai.html",
  theory: "agent-engineering-playbook/60-the-theory-behind-the-playbook.html",
  process: "agent-engineering-playbook/10-process/index.html",
  reference: "agent-engineering-playbook/00-foundations.html",
  interactive: "agent-engineering-playbook/10-process/01-align.html",
  glossary: "agent-engineering-playbook/glossary.html",
};

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
  let last;
  while (Date.now() - start < ceilingMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      last = new Error(`${response.status} ${response.statusText}`);
    } catch (error) {
      last = error;
    }
    await sleep(100);
  }
  throw new Error(`Timed out waiting for ${url}: ${last?.message || "unknown error"}`);
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
      for (const callback of this.listeners.get(message.method) || []) callback(message.params || {});
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

  on(method, callback) {
    if (!this.listeners.has(method)) this.listeners.set(method, []);
    this.listeners.get(method).push(callback);
  }

  event(method, ceilingMs = 15000) {
    return new Promise((resolvePromise, reject) => {
      const timer = setTimeout(() => reject(new Error(`Timed out waiting for ${method}`)), ceilingMs);
      const callback = (params) => {
        clearTimeout(timer);
        const list = this.listeners.get(method) || [];
        this.listeners.set(method, list.filter((item) => item !== callback));
        resolvePromise(params);
      };
      this.on(method, callback);
    });
  }

  close() {
    try { this.ws.close(); } catch {}
  }
}

async function createTarget(debugPort) {
  const response = await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: "PUT" });
  if (!response.ok) throw new Error(`Unable to create Chrome target: ${response.status}`);
  const target = await response.json();
  const cdp = await CDP.connect(target.webSocketDebuggerUrl);
  return { target, cdp };
}

async function closeTarget(debugPort, target, cdp) {
  cdp.close();
  try { await fetch(`http://127.0.0.1:${debugPort}/json/close/${target.id}`); } catch {}
}

async function evaluate(cdp, expression, awaitPromise = false) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise,
    returnByValue: true,
    userGesture: true,
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || "Runtime evaluation failed");
  return result.result?.value;
}

async function loadPage(debugPort, baseUrl, path, width, { javaScript = true } = {}) {
  const { target, cdp } = await createTarget(debugPort);
  const logs = { console: [], exceptions: [], network: [], http: [], browserNoise: [] };
  cdp.on("Runtime.consoleAPICalled", (event) => {
    if (event.type === "error" || event.type === "assert") logs.console.push(event.args.map((arg) => arg.value || arg.description || "").join(" "));
  });
  cdp.on("Runtime.exceptionThrown", (event) => logs.exceptions.push(event.exceptionDetails?.text || "Uncaught exception"));
  cdp.on("Network.loadingFailed", (event) => {
    if (!event.canceled) logs.network.push({ url: event.url, errorText: event.errorText, type: event.type });
  });
  cdp.on("Network.responseReceived", (event) => {
    if (event.response?.status >= 400) {
      const item = { url: event.response.url, status: event.response.status, type: event.type };
      if (event.type === "Other" && new URL(event.response.url).pathname === "/favicon.ico") logs.browserNoise.push(item);
      else logs.http.push(item);
    }
  });
  await Promise.all([
    cdp.send("Page.enable"), cdp.send("Runtime.enable"), cdp.send("Network.enable"),
    cdp.send("Accessibility.enable"),
  ]);
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width, height: 900, deviceScaleFactor: 1, mobile: false, screenWidth: width, screenHeight: 900,
  });
  if (!javaScript) await cdp.send("Emulation.setScriptExecutionDisabled", { value: true });
  const loaded = cdp.event("Page.loadEventFired");
  await cdp.send("Page.navigate", { url: `${baseUrl}/${path}` });
  await loaded;
  if (javaScript) {
    await evaluate(cdp, "document.fonts && document.fonts.ready ? document.fonts.ready.then(() => true) : true", true);
  }
  await sleep(250);
  return { target, cdp, logs, path, width };
}

function logSummary(logs) {
  return {
    consoleErrors: logs.console,
    runtimeExceptions: logs.exceptions,
    networkFailures: logs.network,
    httpErrors: logs.http,
    ignoredBrowserNoise: logs.browserNoise,
    pass: !logs.console.length && !logs.exceptions.length && !logs.network.length && !logs.http.length,
  };
}

async function auditPage(page) {
  const dom = await evaluate(page.cdp, `(() => {
    const visible = (el) => {
      if (!el) return false;
      const s = getComputedStyle(el), r = el.getBoundingClientRect();
      return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0;
    };
    const target = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { text: el.textContent.trim().replace(/\\s+/g,' '), width: +r.width.toFixed(2), height: +r.height.toFixed(2), visible: visible(el) };
    };
    const pre = [...document.querySelectorAll('pre')].map((el, index) => {
      const r = el.getBoundingClientRect(), cs = getComputedStyle(el), overflowing = el.scrollWidth > el.clientWidth + 1;
      return {
        index, overflowing, clientWidth: el.clientWidth, scrollWidth: el.scrollWidth,
        tabindex: el.getAttribute('tabindex'), label: el.getAttribute('aria-label') || '',
        overflowX: cs.overflowX, locallyContained: r.left >= -1 && r.right <= innerWidth + 1,
        keyboardFocus: null,
        focusOutline: null,
      };
    });
    const sequence = [...document.querySelectorAll('.guide-sequence a')].filter(visible).map(target);
    return {
      url: location.href, viewport: { width: innerWidth, height: innerHeight },
      documentWidth: document.documentElement.scrollWidth, bodyWidth: document.body.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      bodyOverflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) > document.documentElement.clientWidth + 1,
      h1Count: document.querySelectorAll('h1').length,
      headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => ({ level:+h.tagName[1], text:h.textContent.trim().replace(/\\s+/g,' ') })),
      targets: { skip: target(document.querySelector('.skip-link')), masthead: target(document.querySelector('.masthead-portal')), previousNext: sequence },
      visiblePreviousNext: sequence.length,
      landmarks: {
        mastheadNav: !!document.querySelector('nav.site-nav'), main: !!document.querySelector('main#main-content'),
        complementary: !!document.querySelector('aside.guide-timeline'), footer: !!document.querySelector('footer.doc-footer'),
        skipTarget: document.querySelector('.skip-link')?.getAttribute('href') === '#main-content',
      },
      pre,
    };
  })()`);
  dom.runtime = logSummary(page.logs);
  for (const item of dom.pre.filter((entry) => entry.overflowing)) {
    await evaluate(page.cdp, `(() => {
      const target=document.querySelectorAll('pre')[${item.index}];
      const focusable=[...document.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])')].filter(el=>!el.disabled&&getComputedStyle(el).display!=='none'&&getComputedStyle(el).visibility!=='hidden');
      const index=focusable.indexOf(target), previous=focusable[index-1];
      if(previous) previous.focus(); else { document.body.tabIndex=-1; document.body.focus(); }
      return {index,previous:previous?.tagName||'BODY'};
    })()`);
    await page.cdp.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    await page.cdp.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    const focus = await evaluate(page.cdp, `(() => {const el=document.querySelectorAll('pre')[${item.index}],s=getComputedStyle(el);return {keyboardFocus:document.activeElement===el,focusOutline:{style:s.outlineStyle,width:s.outlineWidth,color:s.outlineColor,offset:s.outlineOffset}}})()`);
    item.keyboardFocus = focus.keyboardFocus;
    item.focusOutline = focus.focusOutline;
  }
  const targetList = [dom.targets.skip, dom.targets.masthead, ...dom.targets.previousNext].filter(Boolean);
  dom.targetFloorPass = targetList.length === 4 && targetList.every((item) => item.visible && item.height >= 44);
  dom.prePass = dom.pre.filter((item) => item.overflowing).every((item) =>
    item.tabindex === "0" && item.label.trim() && ["auto", "scroll"].includes(item.overflowX) &&
    item.locallyContained && item.keyboardFocus && item.focusOutline.style !== "none" && parseFloat(item.focusOutline.width) >= 2
  );
  dom.pass = !dom.bodyOverflow && dom.h1Count === 1 && dom.visiblePreviousNext === 2 &&
    Object.values(dom.landmarks).every(Boolean) && dom.targetFloorPass && dom.prePass && dom.runtime.pass;
  return dom;
}

async function accessibilityNames(cdp) {
  const tree = await cdp.send("Accessibility.getFullAXTree");
  return tree.nodes.filter((node) => !node.ignored).map((node) => ({
    role: node.role?.value || "", name: node.name?.value || "",
  }));
}

async function driveMobileProbe(page) {
  const dom = await evaluate(page.cdp, `(() => {
    const visible = (selector) => { const el=document.querySelector(selector); if(!el) return false; const r=el.getBoundingClientRect(),s=getComputedStyle(el); return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0; };
    const hidden = (selector) => { const el=document.querySelector(selector); return !!el && getComputedStyle(el).display === 'none'; };
    const text = (selector) => document.querySelector(selector)?.textContent.trim().replace(/\\s+/g,' ') || '';
    const roleSplit=document.querySelector('.role-split');
    const directHandoff=[...roleSplit.children].filter(el=>!el.classList.contains('role-card')&&visible('.'+[...el.classList].join('.'))).map(el=>el.textContent.trim());
    const pseudoHandoff=[roleSplit,...roleSplit.querySelectorAll(':scope > .role-card')].flatMap(el=>['::before','::after'].map(pseudo=>getComputedStyle(el,pseudo).content)).filter(content=>content&&content!=='none'&&content!=='normal');
    return {
      wideSvgsHidden: { responsibility:hidden('svg.responsibility-diagram'), loop:hidden('svg.loop-diagram'), ship:hidden('svg.ship-diagram') },
      verticalVisible: { responsibility:visible('.role-split'), loop:visible('.mobile-process-loop'), ship:visible('.mobile-ship-handoff') },
      loopText:text('.mobile-process-loop'), shipText:text('.mobile-ship-handoff'), responsibilityText:text('.role-split'),
      responsibilityDirectionalHandoff: { directHandoff, pseudoHandoff, pass:[...directHandoff,...pseudoHandoff].some(value=>/(intent|pull request|handoff|[↓↑→←])/i.test(value)) },
    };
  })()`);
  const ax = await accessibilityNames(page.cdp);
  const expected = [
    "Human owns intent and approval; agent owns execution and verification. Intent flows from human to agent; a pull request flows from agent back to human for review.",
    "A five-stage development loop. Align, Slice, Build, Review and correct, Ship. After Ship a curved arrow returns to Align for the next feature.",
    "The default manual-merge route. The agent confirms the branch, runs checks, uses a fresh verifier, updates documents, commits, pushes, and hands back the exact pull request. The human reviews and merges it. Control returns to the agent, which confirms the merge, verifies state, checks post-merge steps, and recommends what comes next.",
  ];
  dom.accessibleNames = expected.map((name) => ({ name, present: ax.some((node) => node.name === name) }));
  dom.pass = Object.values(dom.wideSvgsHidden).every(Boolean) && Object.values(dom.verticalVisible).every(Boolean) &&
    /Align.*Slice.*Build.*Review.*Ship.*next feature.*Align/i.test(dom.loopText) &&
    /Agent.*pre-PR.*Human.*GitHub.*Agent.*post-merge/i.test(dom.shipText) &&
    /Human.*Agent/i.test(dom.responsibilityText) && dom.responsibilityDirectionalHandoff.pass && dom.accessibleNames.every((item) => item.present);
  return dom;
}

async function captureFullPage(page, debugPort, filename) {
  await evaluate(page.cdp, "window.scrollTo(0, document.documentElement.scrollHeight); new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))", true);
  await evaluate(page.cdp, "window.scrollTo(0, 0); true");
  const metrics = await page.cdp.send("Page.getLayoutMetrics");
  const width = Math.ceil(metrics.cssContentSize?.width || metrics.contentSize.width);
  const height = Math.ceil(metrics.cssContentSize?.height || metrics.contentSize.height);
  const scale = Math.min(1, MAX_CAPTURE_HEIGHT / height);
  const destination = join(SHOTS, filename);
  try {
    const shot = await page.cdp.send("Page.captureScreenshot", {
      format: "jpeg", quality: 55, fromSurface: true, captureBeyondViewport: true,
      clip: { x: 0, y: 0, width, height, scale },
    });
    await writeFile(destination, Buffer.from(shot.data, "base64"));
    return { method: "bounded-full-page", width, height, scale, rasterHeight: Math.ceil(height * scale), file: `screenshots/${filename}` };
  } catch (initialError) {
    // Dependency-free fallback: capture bounded Chromium tiles, compose them in a
    // fresh data-only target, then ask Chromium for one final full-page JPEG.
    const chunk = 5000;
    const tiles = [];
    for (let y = 0; y < height; y += chunk) {
      const tileHeight = Math.min(chunk, height - y);
      const tile = await page.cdp.send("Page.captureScreenshot", {
        format: "jpeg", quality: 68, fromSurface: true, captureBeyondViewport: true,
        clip: { x: 0, y, width, height: tileHeight, scale },
      });
      tiles.push({ data: tile.data, height: tileHeight * scale });
    }
    const composer = await createTarget(debugPort);
    try {
      await Promise.all([composer.cdp.send("Page.enable"), composer.cdp.send("Runtime.enable")]);
      const rasterWidth = Math.ceil(width * scale);
      const rasterHeight = Math.ceil(height * scale);
      await composer.cdp.send("Emulation.setDeviceMetricsOverride", { width: rasterWidth, height: 900, deviceScaleFactor: 1, mobile: false });
      const html = `<style>*{box-sizing:border-box}html,body{margin:0;background:#0a0605}img{display:block;width:${rasterWidth}px}</style>${tiles.map((tile) => `<img src="data:image/jpeg;base64,${tile.data}" style="height:${tile.height}px">`).join("")}`;
      await evaluate(composer.cdp, `document.open();document.write(${JSON.stringify(html)});document.close();Promise.all([...document.images].map(i=>i.decode())).then(()=>true)`, true);
      const composed = await composer.cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 55, fromSurface: true, captureBeyondViewport: true, clip: { x:0, y:0, width:rasterWidth, height:rasterHeight, scale:1 } });
      await writeFile(destination, Buffer.from(composed.data, "base64"));
      return { method: "chromium-tiled-full-page-fallback", width, height, scale, rasterHeight, tiles: tiles.length, initialError: initialError.message, file: `screenshots/${filename}` };
    } finally {
      await closeTarget(debugPort, composer.target, composer.cdp);
    }
  }
}

async function withRetry(label, operation, harnessErrors) {
  let last;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try { return await operation(attempt); }
    catch (error) {
      last = error;
      harnessErrors.push({ label, attempt, error: error.message });
    }
  }
  throw new Error(`${label} failed after ${MAX_RETRIES} fresh attempts: ${last.message}`);
}

async function runInteractions(debugPort, baseUrl) {
  const results = {};
  let page = await loadPage(debugPort, baseUrl, representatives.drive, 390);
  try {
    results.mobileGuide = await evaluate(page.cdp, `(async()=>{
      const button=document.querySelector('.guide-toggle'), steps=document.querySelector('.timeline-steps');
      const initial={expanded:button?.getAttribute('aria-expanded'), stepsDisplay:getComputedStyle(steps).display, current:document.querySelector('.guide-current')?.textContent.trim(), height:button?.getBoundingClientRect().height};
      button.focus(); button.click();
      const opened={expanded:button.getAttribute('aria-expanded'), stepsDisplay:getComputedStyle(steps).display};
      button.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
      await new Promise(r=>setTimeout(r,20));
      const closed={expanded:button.getAttribute('aria-expanded'), stepsDisplay:getComputedStyle(steps).display, focusReturned:document.activeElement===button};
      return {initial,opened,closed,pass:initial.expanded==='false'&&initial.height>=44&&opened.expanded==='true'&&opened.stepsDisplay!=='none'&&closed.expanded==='false'&&closed.stepsDisplay==='none'&&closed.focusReturned};
    })()`, true);
    results.glossary = await evaluate(page.cdp, `(async()=>{
      const term=document.querySelector('button.term'); term.focus(); term.click(); await new Promise(r=>setTimeout(r,20));
      const pop=document.querySelector('.term-popover'); const opened={open:pop.classList.contains('open'),title:pop.querySelector('.pop-title')?.textContent,definition:pop.querySelector('.pop-def')?.textContent};
      document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true})); await new Promise(r=>setTimeout(r,20));
      const closed={open:pop.classList.contains('open'),focusReturned:document.activeElement===term};
      return {opened,closed,pass:opened.open&&!!opened.title&&!!opened.definition&&!closed.open&&closed.focusReturned};
    })()`, true);
    results.route = await evaluate(page.cdp, `(()=>{const s=document.querySelector('[data-route-select]'),o=document.querySelector('[data-route-output]');s.value='feature';s.dispatchEvent(new Event('change',{bubbles:true}));return {value:s.value,output:o.textContent.trim(),pass:o.textContent.trim()==='Type: I want to build [feature].'};})()`);
    results.copy = await evaluate(page.cdp, `(async()=>{const b=document.querySelector('[data-copy-phrase]'),o=document.querySelector('[data-copy-status]');b.click();await new Promise(r=>setTimeout(r,80));return {status:o.textContent.trim(),pass:o.textContent.trim()==="Copied: What's next?"};})()`, true);
    await evaluate(page.cdp, "document.activeElement?.blur(); document.body.tabIndex=-1; document.body.focus(); true");
    await page.cdp.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    await page.cdp.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    results.focus = await evaluate(page.cdp, `(()=>{const el=document.querySelector('.skip-link'),s=getComputedStyle(el);return {active:document.activeElement===el,style:s.outlineStyle,width:s.outlineWidth,color:s.outlineColor,offset:s.outlineOffset,pass:document.activeElement===el&&s.outlineStyle!=='none'&&parseFloat(s.outlineWidth)>=2&&parseFloat(s.outlineOffset)>=4};})()`);
  } finally { await closeTarget(debugPort, page.target, page.cdp); }

  page = await loadPage(debugPort, baseUrl, representatives.interactive, 390);
  try {
    results.quiz = await evaluate(page.cdp, `(async()=>{const q=document.querySelector('[data-quiz]'),b=q.querySelector('[data-quiz-option][data-correct="true"]'),f=q.querySelector('[data-quiz-feedback]');b.click();await new Promise(r=>setTimeout(r,80));return {text:f.textContent.trim(),hidden:f.hidden,focused:document.activeElement===f,role:f.getAttribute('role'),pass:!f.hidden&&/Right/.test(f.textContent)&&document.activeElement===f&&f.getAttribute('role')==='status'};})()`, true);
  } finally { await closeTarget(debugPort, page.target, page.cdp); }

  page = await loadPage(debugPort, baseUrl, "agent-engineering-playbook/10-process/04-breakdown.html", 390);
  try {
    results.choice = await evaluate(page.cdp, `(()=>{const p=document.querySelector('[data-choice-panel]'),b=p.querySelectorAll('[data-choice]')[1],o=p.querySelector('[data-choice-output]');b.click();return {active:b.classList.contains('active'),output:o.textContent.trim(),pass:b.classList.contains('active')&&/All screens first/.test(o.textContent)};})()`);
    results.checklist = await evaluate(page.cdp, `(()=>{const p=document.querySelector('[data-checklist]'),c=p.querySelector('input[type=checkbox]'),o=p.querySelector('[data-checklist-output]'),before=o.textContent.trim();c.click();const after=o.textContent.trim();return {before,after,pass:/0 of 6/.test(before)&&/1 of 6/.test(after)};})()`);
  } finally { await closeTarget(debugPort, page.target, page.cdp); }

  page = await loadPage(debugPort, baseUrl, representatives.drive, 390, { javaScript: false });
  try {
    results.noJavaScript = await evaluate(page.cdp, `(()=>{const steps=document.querySelector('.timeline-steps');return {toggleCount:document.querySelectorAll('.guide-toggle').length,stepCount:steps?.querySelectorAll('a').length||0,display:getComputedStyle(steps).display,pass:document.querySelectorAll('.guide-toggle').length===0&&(steps?.querySelectorAll('a').length||0)===11&&getComputedStyle(steps).display!=='none'};})()`);
  } finally { await closeTarget(debugPort, page.target, page.cdp); }

  page = await loadPage(debugPort, baseUrl, representatives.drive, 390);
  try {
    await page.cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
    results.reducedMotion = await evaluate(page.cdp, `(()=>{const html=getComputedStyle(document.documentElement),sample=getComputedStyle(document.querySelector('.phrase-card'));return {scrollBehavior:html.scrollBehavior,transitionDuration:sample.transitionDuration,animationDuration:sample.animationDuration,pass:html.scrollBehavior==='auto'&&sample.transitionDuration.split(',').every(v=>parseFloat(v)===0)&&sample.animationDuration.split(',').every(v=>parseFloat(v)===0)};})()`);
    results.visited = await evaluate(page.cdp, `(()=>{let rules=[];for(const sheet of [...document.styleSheets]){try{for(const rule of [...sheet.cssRules]){if(rule.selectorText?.includes(':visited'))rules.push({selector:rule.selectorText,color:rule.style.color})}}catch{}}const body=getComputedStyle(document.body).color;return {rules,bodyColor:body,pass:rules.some(r=>r.color&&r.color!==body)};})()`);
    results.contrast = await evaluate(page.cdp, `(()=>{const cs=getComputedStyle(document.documentElement);const vals={soot:cs.getPropertyValue('--bg').trim(),parchment:cs.getPropertyValue('--ink').trim(),muted:cs.getPropertyValue('--ink-mute').trim(),gold:cs.getPropertyValue('--agent').trim(),ember:cs.getPropertyValue('--human').trim()};const rgb=h=>{h=h.replace('#','');return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16))};const lum=h=>rgb(h).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);const ratio=(a,b)=>{const x=lum(a),y=lum(b);return +((Math.max(x,y)+.05)/(Math.min(x,y)+.05)).toFixed(2)};const ratios={parchment:ratio(vals.soot,vals.parchment),muted:ratio(vals.soot,vals.muted),gold:ratio(vals.soot,vals.gold),ember:ratio(vals.soot,vals.ember)};return {values:vals,ratios,pass:Object.values(ratios).every(v=>v>=4.5)};})()`);
  } finally { await closeTarget(debugPort, page.target, page.cdp); }
  results.pass = Object.entries(results).filter(([key]) => key !== "pass").every(([, value]) => value.pass);
  return results;
}

async function main() {
  const startedAt = new Date().toISOString();
  const serverPort = await freePort();
  const debugPort = await freePort();
  const profile = await mkdtemp(join(tmpdir(), "portal-pass-chrome-"));
  const harnessErrors = [];
  const server = spawn("python3", ["-m", "http.server", String(serverPort), "--bind", "127.0.0.1"], { cwd: ROOT, stdio: ["ignore", "ignore", "pipe"] });
  const chrome = spawn(CHROME, [
    "--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars",
    `--remote-debugging-port=${debugPort}`, `--user-data-dir=${profile}`, "about:blank",
  ], { stdio: ["ignore", "ignore", "pipe"] });
  const baseUrl = `http://127.0.0.1:${serverPort}`;
  const results = {
    metadata: { testedHead: HEAD, startedAt, serverPort, debugPort, profile, maxRetries: MAX_RETRIES, maxCaptureHeight: MAX_CAPTURE_HEIGHT },
    allPages320: [], allPages390Targets: [], representativeMatrix: [], interactions: null,
    priorDefects: {}, harnessErrors, cleanup: {}, verdict: "FAIL",
  };
  try {
    await Promise.all([
      waitFor(`${baseUrl}/agent-engineering-playbook/index.html`),
      waitFor(`http://127.0.0.1:${debugPort}/json/version`),
    ]);
    const version = await (await fetch(`http://127.0.0.1:${debugPort}/json/version`)).json();
    results.metadata.browser = version.Browser;

    for (const width of [320, 390]) {
      for (const path of pages) {
        const audit = await withRetry(`${path}@${width}`, async () => {
          const page = await loadPage(debugPort, baseUrl, path, width);
          try { return await auditPage(page); }
          finally { await closeTarget(debugPort, page.target, page.cdp); }
        }, harnessErrors);
        (width === 320 ? results.allPages320 : results.allPages390Targets).push({ path, ...audit });
      }
    }

    for (const [archetype, path] of Object.entries(representatives)) {
      for (const width of [390, 768, 1440]) {
        const row = await withRetry(`${archetype}-capture@${width}`, async () => {
          const page = await loadPage(debugPort, baseUrl, path, width);
          try {
            const audit = await auditPage(page);
            const capture = await captureFullPage(page, debugPort, `${archetype}-${width}.jpg`);
            return { archetype, path, width, audit, capture, pass: audit.pass };
          } finally { await closeTarget(debugPort, page.target, page.cdp); }
        }, harnessErrors);
        results.representativeMatrix.push(row);
      }
    }

    const drive = await loadPage(debugPort, baseUrl, representatives.drive, 390);
    try { results.priorDefects.drive390 = await driveMobileProbe(drive); }
    finally { await closeTarget(debugPort, drive.target, drive.cdp); }
    results.priorDefects.targets320 = results.allPages320.every((item) => item.targetFloorPass);
    results.priorDefects.targets390 = results.allPages390Targets.every((item) => item.targetFloorPass);
    const allPre = [...results.allPages320, ...results.allPages390Targets].flatMap((item) => item.pre.map((pre) => ({ path: item.path, width: item.viewport.width, ...pre })));
    results.priorDefects.overflowingPre = allPre.filter((item) => item.overflowing);
    results.priorDefects.overflowingPrePass = results.priorDefects.overflowingPre.every((item) => item.tabindex === "0" && item.label && item.locallyContained && item.keyboardFocus && item.focusOutline.style !== "none" && parseFloat(item.focusOutline.width) >= 2);

    results.interactions = await runInteractions(debugPort, baseUrl);
    const productPass = results.allPages320.every((item) => item.pass) &&
      results.allPages390Targets.every((item) => item.pass) &&
      results.representativeMatrix.every((item) => item.pass) &&
      results.priorDefects.drive390.pass && results.priorDefects.targets320 && results.priorDefects.targets390 &&
      results.priorDefects.overflowingPrePass && results.interactions.pass;
    results.verdict = productPass ? "PASS" : "FAIL";
  } finally {
    results.metadata.finishedAt = new Date().toISOString();
    chrome.kill("SIGTERM");
    server.kill("SIGTERM");
    await Promise.allSettled([once(chrome, "exit"), once(server, "exit")]);
    await sleep(1000);
    await rm(profile, { recursive: true, force: true });
    results.cleanup = { chromeStopped: chrome.exitCode !== null || chrome.signalCode !== null, serverStopped: server.exitCode !== null || server.signalCode !== null, profileRemoved: true };
    await writeFile(join(OUT, "browser-results.json"), `${JSON.stringify(results, null, 2)}\n`);
  }
  console.log(JSON.stringify({ verdict: results.verdict, browser: results.metadata.browser, harnessErrors: results.harnessErrors.length, screenshots: results.representativeMatrix.length, cleanup: results.cleanup }, null, 2));
  if (results.verdict !== "PASS") process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 2;
});
