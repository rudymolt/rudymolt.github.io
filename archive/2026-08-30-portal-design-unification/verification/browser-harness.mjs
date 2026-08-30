import fs from "node:fs/promises";
import path from "node:path";

const cdpPort = Number(process.env.CDP_PORT || "9333");
const sitePort = Number(process.env.SITE_PORT || "4173");
const root = `http://127.0.0.1:${sitePort}/agent-engineering-playbook/`;
const evidenceDir = path.resolve("planning/portal-design-unification/verification");
const screenshotDir = path.join(evidenceDir, "screenshots");

const pages = [
  "index.html",
  "00-foundations.html",
  "10-process/index.html",
  "10-process/01-align.html",
  "10-process/04-breakdown.html",
  "20-frontend-track.html",
  "30-document-lifecycle.html",
  "50-how-to-write-code-with-ai.html",
  "60-the-theory-behind-the-playbook.html",
  "70-lite-mode.html",
  "80-quickstart.html",
  "glossary.html"
];

const representatives = [
  ["hub", "index.html"],
  ["drive", "50-how-to-write-code-with-ai.html"],
  ["theory", "60-the-theory-behind-the-playbook.html"],
  ["process", "10-process/index.html"],
  ["reference", "00-foundations.html"],
  ["interactive", "10-process/01-align.html"],
  ["glossary", "glossary.html"]
];

const viewports = [390, 768, 1440];
const heightFor = width => width === 1440 ? 1000 : width === 768 ? 1024 : 844;
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

class CDP {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.pending = new Map();
    this.listeners = new Map();
  }
  async open() {
    await new Promise((resolve, reject) => {
      this.ws.addEventListener("open", resolve, { once: true });
      this.ws.addEventListener("error", reject, { once: true });
    });
    this.ws.addEventListener("message", event => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(JSON.stringify(message.error)));
        else pending.resolve(message.result || {});
        return;
      }
      const callbacks = this.listeners.get(message.method) || [];
      callbacks.forEach(callback => callback(message.params || {}));
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  on(method, callback) {
    const callbacks = this.listeners.get(method) || [];
    callbacks.push(callback);
    this.listeners.set(method, callbacks);
  }
  close() { this.ws.close(); }
}

async function connect() {
  const target = await fetch(`http://127.0.0.1:${cdpPort}/json/new?about:blank`, { method: "PUT" }).then(r => r.json());
  const cdp = new CDP(target.webSocketDebuggerUrl);
  await cdp.open();
  await Promise.all([
    cdp.send("Page.enable"),
    cdp.send("Runtime.enable"),
    cdp.send("Log.enable"),
    cdp.send("Network.enable")
  ]);
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  return cdp;
}

async function evaluate(cdp, expression) {
  const response = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
    userGesture: true
  });
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.text || "evaluation failed");
  return response.result.value;
}

async function viewport(cdp, width) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width,
    height: heightFor(width),
    deviceScaleFactor: 1,
    mobile: width <= 390,
    screenWidth: width,
    screenHeight: heightFor(width)
  });
}

async function navigate(cdp, relative, runLog) {
  runLog.console = [];
  runLog.exceptions = [];
  runLog.networkErrors = [];
  let loaded;
  const loadPromise = new Promise(resolve => { loaded = resolve; });
  const onLoad = () => loaded();
  cdp.on("Page.loadEventFired", onLoad);
  await cdp.send("Page.navigate", { url: root + relative });
  await Promise.race([loadPromise, pause(10000)]);
  await pause(650);
}

function installCollectors(cdp, runLog) {
  cdp.on("Runtime.consoleAPICalled", event => {
    if (event.type === "error" || event.type === "assert") {
      runLog.console.push(event.args.map(arg => arg.value || arg.description || "").join(" "));
    }
  });
  cdp.on("Runtime.exceptionThrown", event => runLog.exceptions.push(event.exceptionDetails?.text || "runtime exception"));
  cdp.on("Network.loadingFailed", event => {
    if (!event.canceled && event.type !== "Ping") runLog.networkErrors.push(event.errorText || "network load failed");
  });
}

const pageProbe = `(() => {
  const visible = el => {
    const s = getComputedStyle(el), r = el.getBoundingClientRect();
    return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0;
  };
  const rect = el => { const r = el.getBoundingClientRect(); return {w:+r.width.toFixed(1),h:+r.height.toFixed(1)}; };
  const prevNext = [...document.querySelectorAll('.guide-sequence a')].filter(visible).map(a => ({text:a.textContent.trim(), ...rect(a)}));
  const local = [...document.querySelectorAll('.diagram-wrap,.table-wrap,.code-block,pre')].filter(visible).map(el => {
    const s = getComputedStyle(el);
    return {tag:el.tagName.toLowerCase(), cls:el.className || '', clientWidth:el.clientWidth, scrollWidth:el.scrollWidth, overflowX:s.overflowX, tabindex:el.getAttribute('tabindex'), label:el.getAttribute('aria-label')};
  });
  const interactive = [...document.querySelectorAll('a,button,select,input')].filter(visible).map(el => ({
    tag:el.tagName.toLowerCase(), cls:el.className || '', text:(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0,80), display:getComputedStyle(el).display, ...rect(el)
  }));
  const targetViolations = interactive.filter(x => x.cls !== 'term' && x.display !== 'inline' && (x.w < 44 || x.h < 44));
  const main = document.querySelector('main');
  const guide = document.querySelector('.guide-timeline');
  const footer = document.querySelector('footer');
  return {
    url:location.pathname,
    title:document.title,
    innerWidth,
    bodyScrollWidth:document.documentElement.scrollWidth,
    overflow:document.documentElement.scrollWidth > innerWidth,
    h1Count:document.querySelectorAll('h1').length,
    landmarks:{nav:document.querySelectorAll('nav').length,main:!!main,complementary:!!guide,footer:!!footer,skipTarget:document.querySelector('.skip-link')?.getAttribute('href') === '#main-content'},
    prevNext,
    targetViolations,
    localOverflow:local,
    guide:{current:guide?.querySelector('[aria-current="page"]')?.textContent.trim() || null,status:guide?.querySelector('.guide-status')?.textContent.trim() || null},
    driveMobile:{wideDiagramVisible:[...document.querySelectorAll('svg.diagram')].some(visible),mobileStructuresVisible:[...document.querySelectorAll('.role-split,.stage-strip,.ship-handoff')].filter(visible).length}
  };
})()`;

async function screenshot(cdp, filename) {
  const metrics = await cdp.send("Page.getLayoutMetrics");
  const size = metrics.cssContentSize || metrics.contentSize;
  const scale = Math.max(0.1, Math.min(1, 4500 / size.height));
  const metadata = { filename, cssWidth: size.width, cssHeight: size.height, scale, outputWidth: Math.round(size.width * scale), outputHeight: Math.round(size.height * scale) };
  try {
    await fs.access(path.join(screenshotDir, filename));
    if (filename !== "interactive-1440.jpg") return { ...metadata, reusedFromFreshRun: true };
  } catch {}
  try {
    const shot = await cdp.send("Page.captureScreenshot", {
      format: "jpeg",
      quality: 78,
      fromSurface: true,
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: size.width, height: size.height, scale }
    });
    await fs.writeFile(path.join(screenshotDir, filename), Buffer.from(shot.data, "base64"));
    return metadata;
  } catch {
    return captureTiled(cdp, filename, size, metadata);
  }
}

async function captureTiled(cdp, filename, size, metadata) {
  const tileScale = 0.3;
  const tileHeight = 4000;
  const stem = filename.replace(/\.jpg$/, "");
  const tileDir = path.join(screenshotDir, `.tiles-${stem}`);
  await fs.mkdir(tileDir, { recursive: true });
  const tiles = [];
  for (let y = 0, index = 0; y < size.height; y += tileHeight, index += 1) {
    const height = Math.min(tileHeight, size.height - y);
    const tile = await cdp.send("Page.captureScreenshot", {
      format: "jpeg", quality: 82, fromSurface: true, captureBeyondViewport: true,
      clip: { x: 0, y, width: size.width, height, scale: tileScale }
    });
    const name = `${index}.jpg`;
    await fs.writeFile(path.join(tileDir, name), Buffer.from(tile.data, "base64"));
    tiles.push({ name, outputHeight: Math.round(height * tileScale) });
  }
  const stitchName = `.stitch-${stem}.html`;
  const stitchPath = path.join(screenshotDir, stitchName);
  const imgs = tiles.map(tile => `<img src=".tiles-${stem}/${tile.name}" width="${Math.round(size.width * tileScale)}" height="${tile.outputHeight}" alt="">`).join("");
  await fs.writeFile(stitchPath, `<!doctype html><meta name="viewport" content="width=device-width"><style>*{box-sizing:border-box}html,body{margin:0;background:#0a0605}img{display:block}</style>${imgs}`);
  await cdp.send("Page.navigate", { url: `http://127.0.0.1:${sitePort}/planning/portal-design-unification/verification/screenshots/${stitchName}` });
  await pause(600);
  const stitchedMetrics = await cdp.send("Page.getLayoutMetrics");
  const stitchedSize = stitchedMetrics.cssContentSize || stitchedMetrics.contentSize;
  const stitched = await cdp.send("Page.captureScreenshot", {
    format: "jpeg", quality: 78, fromSurface: true, captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: Math.round(size.width * tileScale), height: Math.round(size.height * tileScale), scale: 1 }
  });
  await fs.writeFile(path.join(screenshotDir, filename), Buffer.from(stitched.data, "base64"));
  await fs.rm(tileDir, { recursive: true });
  await fs.unlink(stitchPath);
  return { ...metadata, scale: tileScale, outputWidth: Math.round(size.width * tileScale), outputHeight: Math.round(size.height * tileScale), tiledFallback: true };
}

async function main() {
  await fs.mkdir(screenshotDir, { recursive: true });
  const cdp = await connect();
  const runLog = { console: [], exceptions: [], networkErrors: [] };
  installCollectors(cdp, runLog);
  const results = {
    schema: 1,
    testedHead: "4553682e93170e73a4a0998d7f234ab1028cc59f",
    baseline: "99e9c2957bb934381f05f5ad4453d9c388d97ea5",
    browser: "Google Chrome 152.0.7977.64",
    generatedAt: new Date().toISOString(),
    allPages320: [],
    representativeMatrix: [],
    interactions: {},
    styleAssertions: {}
  };

  await viewport(cdp, 320);
  for (const page of pages) {
    await navigate(cdp, page, runLog);
    const probe = await evaluate(cdp, pageProbe);
    results.allPages320.push({ page, ...probe, consoleErrors:[...runLog.console], runtimeExceptions:[...runLog.exceptions], networkErrors:[...runLog.networkErrors] });
  }

  for (const width of viewports) {
    await viewport(cdp, width);
    for (const [archetype, page] of representatives) {
      await navigate(cdp, page, runLog);
      const probe = await evaluate(cdp, pageProbe);
      const filename = `${archetype}-${width}.jpg`;
      const shot = await screenshot(cdp, filename);
      results.representativeMatrix.push({ archetype, page, width, ...probe, screenshot:shot, consoleErrors:[...runLog.console], runtimeExceptions:[...runLog.exceptions], networkErrors:[...runLog.networkErrors] });
    }
  }

  await viewport(cdp, 390);
  await navigate(cdp, "50-how-to-write-code-with-ai.html", runLog);
  results.interactions.mobileGuide = await evaluate(cdp, `(async () => {
    const button=document.querySelector('.guide-toggle'); const current=document.querySelector('.guide-current');
    const before={label:button?.getAttribute('aria-label'),expanded:button?.getAttribute('aria-expanded'),current:current?.textContent.trim(),height:button?.getBoundingClientRect().height};
    button?.click(); const opened={expanded:button?.getAttribute('aria-expanded'),open:document.querySelector('.guide-timeline')?.classList.contains('is-open')};
    document.querySelector('.guide-timeline')?.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
    await new Promise(requestAnimationFrame);
    return {before,opened,closed:{expanded:button?.getAttribute('aria-expanded'),open:document.querySelector('.guide-timeline')?.classList.contains('is-open'),focusReturned:document.activeElement===button}};
  })()`);

  await cdp.send("Emulation.setScriptExecutionDisabled", { value: true });
  await navigate(cdp, "50-how-to-write-code-with-ai.html?no-js=1", runLog);
  results.interactions.noJavaScriptGuide = await evaluate(cdp, `(() => { const s=document.querySelector('.timeline-steps'); const r=s?.getBoundingClientRect(); return {toggleAbsent:!document.querySelector('.guide-toggle'),display:getComputedStyle(s).display,visible:r.width>0&&r.height>0,links:s?.querySelectorAll('a').length||0}; })()`);
  await cdp.send("Emulation.setScriptExecutionDisabled", { value: false });

  await navigate(cdp, "10-process/index.html?interaction=1", runLog);
  results.interactions.glossary = await evaluate(cdp, `(async()=>{const term=document.querySelector('button.term'); term.focus(); term.click(); await new Promise(requestAnimationFrame); const open=document.querySelector('.term-popover.open'); const opened={open:!!open,title:open?.querySelector('.pop-title')?.textContent}; document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true})); await new Promise(requestAnimationFrame); return {opened,closed:!document.querySelector('.term-popover.open'),focusReturned:document.activeElement===term};})()`);
  results.interactions.choice = await evaluate(cdp, `(()=>{const panel=document.querySelector('[data-choice-panel]'); const buttons=panel.querySelectorAll('[data-choice]'); buttons[1].click(); return {active:buttons[1].classList.contains('active'),output:panel.querySelector('[data-choice-output]').textContent.trim().slice(0,140)};})()`);
  results.interactions.quiz = await evaluate(cdp, `(async()=>{const q=document.querySelector('[data-quiz]'); const correct=q.querySelector('[data-quiz-option][data-correct="true"]'); correct.click(); await new Promise(r=>setTimeout(r,80)); const f=q.querySelector('[data-quiz-feedback]'); return {pressed:correct.getAttribute('aria-pressed'),hidden:f.hidden,text:f.textContent.trim().slice(0,140),focused:document.activeElement===f};})()`);

  await navigate(cdp, "10-process/04-breakdown.html?interaction=1", runLog);
  results.interactions.checklist = await evaluate(cdp, `(()=>{const list=document.querySelector('[data-checklist]'); const c=list.querySelector('input[type="checkbox"]'); const before=list.querySelector('[data-checklist-output]').textContent; c.click(); return {before,after:list.querySelector('[data-checklist-output]').textContent,checked:c.checked};})()`);

  await navigate(cdp, "50-how-to-write-code-with-ai.html?interaction=2", runLog);
  results.interactions.routeAndCopy = await evaluate(cdp, `(async()=>{const select=document.querySelector('[data-route-select]'); select.value='feature'; select.dispatchEvent(new Event('change',{bubbles:true})); const route=document.querySelector('[data-route-output]')?.textContent.trim(); const copy=document.querySelector('[data-copy-phrase]'); copy.click(); await new Promise(r=>setTimeout(r,100)); return {route,copyStatus:document.querySelector('[data-copy-status]')?.textContent.trim()};})()`);

  await evaluate(cdp, `(()=>{if(document.activeElement)document.activeElement.blur();})()`);
  await cdp.send("Input.dispatchKeyEvent", { type: "rawKeyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
  await cdp.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
  results.styleAssertions = await evaluate(cdp, `(async()=>{
    const css=await fetch('assets/playbook-docs.css').then(r=>r.text());
    const focus=document.activeElement; const fs=getComputedStyle(focus);
    return {visitedRule:/:visited/.test(css),focusVisibleRule:/:focus-visible/.test(css),reducedMotionRule:css.includes('@media (prefers-reduced-motion: reduce)'),focusComputed:{tag:focus.tagName.toLowerCase(),className:focus.className,outlineWidth:fs.outlineWidth,outlineStyle:fs.outlineStyle,outlineColor:fs.outlineColor,outlineOffset:fs.outlineOffset},body:{color:getComputedStyle(document.body).color,background:getComputedStyle(document.body).backgroundColor}};
  })()`);

  await fs.writeFile(path.join(evidenceDir, "browser-results.json"), JSON.stringify(results, null, 2) + "\n");
  cdp.close();
}

main().catch(error => { console.error(error.stack || error); process.exit(1); });
