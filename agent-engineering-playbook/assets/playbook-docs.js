(function () {
  var glossary = window.PLAYBOOK_GLOSSARY || {};

  function closest(el, selector) {
    return el && el.closest ? el.closest(selector) : null;
  }

  function ensurePopover() {
    var pop = document.getElementById("term-popover");
    if (pop) return pop;
    pop = document.createElement("div");
    pop.className = "term-popover";
    pop.id = "term-popover";
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-modal", "false");
    pop.setAttribute("aria-labelledby", "pop-title");
    pop.setAttribute("aria-live", "polite");
    pop.innerHTML = '<button class="pop-close" type="button" aria-label="Close definition">&times;</button><div class="pop-title" id="pop-title"></div><p class="pop-def" id="pop-def"></p>';
    document.body.appendChild(pop);
    return pop;
  }

  function initGlossary() {
    var pop = ensurePopover();
    var popTitle = pop.querySelector(".pop-title");
    var popDef = pop.querySelector(".pop-def");
    var popClose = pop.querySelector(".pop-close");
    var lastTermEl = null;

    function openPop(termEl) {
      var entry = glossary[termEl.dataset.def];
      if (!entry) return;
      popTitle.textContent = entry.title + (entry.group === "playbook" ? " · playbook term" : "");
      popDef.textContent = entry.def;
      pop.classList.add("open");

      var rect = termEl.getBoundingClientRect();
      var popWidth = Math.min(340, window.innerWidth - 32);
      pop.style.maxWidth = popWidth + "px";
      var left = rect.left + window.scrollX;
      if (left + popWidth > window.scrollX + window.innerWidth - 16) {
        left = window.scrollX + window.innerWidth - popWidth - 16;
      }
      if (left < window.scrollX + 16) left = window.scrollX + 16;
      pop.style.left = left + "px";
      pop.style.top = rect.bottom + window.scrollY + 6 + "px";
      lastTermEl = termEl;
    }

    function closePop() {
      pop.classList.remove("open");
      if (lastTermEl) {
        try { lastTermEl.focus(); } catch (e) {}
      }
      lastTermEl = null;
    }

    document.addEventListener("click", function (e) {
      var termEl = closest(e.target, "button.term");
      if (termEl) {
        e.preventDefault();
        openPop(termEl);
        return;
      }
      if (!closest(e.target, ".term-popover")) closePop();
    });

    if (popClose) {
      popClose.addEventListener("click", function (e) {
        e.stopPropagation();
        closePop();
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" || e.keyCode === 27) closePop();
    });

    window.addEventListener("resize", function () {
      if (pop.classList.contains("open") && lastTermEl) openPop(lastTermEl);
    });
  }

  function initSectionNav() {
    document.querySelectorAll("[data-scroll-target]").forEach(function (button) {
      button.addEventListener("click", function () {
        var target = document.querySelector(button.dataset.scrollTarget);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function initPhraseTool() {
    document.querySelectorAll(".phrase-tool").forEach(function (tool) {
      var cards = Array.prototype.slice.call(tool.querySelectorAll(".phrase-card"));
      var buttons = Array.prototype.slice.call(tool.querySelectorAll("[data-filter-stage]"));
      var status = tool.querySelector("[data-copy-status]");
      var routeSelect = tool.querySelector("[data-route-select]");
      var routeOutput = tool.querySelector("[data-route-output]");
      var routes = {
        next: "Type: What's next?",
        feature: "Type: I want to build [feature].",
        fuzzy: "Type: Before we code, make a mockup.",
        sliced: "Type: Build slice 1.",
        continue: "Type: Build the next slice.",
        correction: "Type your correction plainly, for example: This label is wrong.",
        mobile: "Type: Check this on mobile too.",
        ship: "Type: Ship the feature.",
        merged: "Type: I reviewed and merged the PR. Can you check?"
      };

      function setFilter(stage) {
        buttons.forEach(function (button) {
          var active = button.dataset.filterStage === stage;
          button.classList.toggle("active", active);
          button.setAttribute("aria-pressed", active ? "true" : "false");
        });
        cards.forEach(function (card) {
          var show = stage === "all" || card.dataset.stage === stage;
          card.hidden = !show;
        });
      }

      buttons.forEach(function (button) {
        button.addEventListener("click", function () {
          setFilter(button.dataset.filterStage);
        });
      });
      setFilter("all");

      tool.addEventListener("click", function (e) {
        var copyButton = closest(e.target, "[data-copy-phrase]");
        if (!copyButton) return;
        var phrase = copyButton.dataset.copyPhrase;
        var done = function () {
          if (status) status.textContent = "Copied: " + phrase;
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(phrase).then(done).catch(done);
        } else {
          done();
        }
      });

      if (routeSelect && routeOutput) {
        routeSelect.addEventListener("change", function () {
          routeOutput.textContent = routes[routeSelect.value] || "Choose what is happening now.";
        });
      }
    });
  }

  function explainerData() {
    var node = document.getElementById("playbook-explainers");
    if (!node) return {};
    try { return JSON.parse(node.textContent); } catch (e) { return {}; }
  }

  function initExplainers() {
    var data = explainerData();
    var outputs = Array.prototype.slice.call(document.querySelectorAll("[data-explainer-output]"));
    if (!outputs.length) return;

    function render(key) {
      var item = data[key];
      if (!item) return;
      outputs.forEach(function (output) {
        if (output.dataset.explainerOutput !== "all" && output.dataset.explainerOutput !== item.group) return;
        output.innerHTML = "<h3>" + item.title + "</h3><p>" + item.body + "</p>" + (item.action ? "<p><strong>Use it when:</strong> " + item.action + "</p>" : "");
      });
      document.querySelectorAll("[data-explainer]").forEach(function (el) {
        el.classList.toggle("active", el.dataset.explainer === key);
      });
    }

    document.addEventListener("click", function (e) {
      var trigger = closest(e.target, "[data-explainer]");
      if (trigger) render(trigger.dataset.explainer);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var trigger = closest(e.target, "[data-explainer]");
      if (!trigger) return;
      e.preventDefault();
      render(trigger.dataset.explainer);
    });

    var first = document.querySelector("[data-explainer]");
    if (first) render(first.dataset.explainer);
  }

  function initChoicePanels() {
    document.querySelectorAll("[data-choice-panel]").forEach(function (panel) {
      var output = panel.querySelector("[data-choice-output]");
      var buttons = Array.prototype.slice.call(panel.querySelectorAll("[data-choice]"));

      function select(button) {
        buttons.forEach(function (b) { b.classList.remove("active"); });
        button.classList.add("active");
        if (output) {
          output.innerHTML = "<strong>" + button.dataset.choiceTitle + "</strong><br>" + button.dataset.choiceBody;
        }
      }

      buttons.forEach(function (button) {
        button.addEventListener("click", function () { select(button); });
      });

      // Auto-select the first option so the panel is never empty on load.
      if (buttons.length) select(buttons[0]);

      // "Show all answers" toggle: expand every option into a scannable list.
      if (buttons.length > 1 && output) {
        var toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "show-all-toggle";
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Show all answers";

        var listWrap = document.createElement("div");
        listWrap.className = "show-all-list";
        listWrap.hidden = true;
        var html = "";
        buttons.forEach(function (b) {
          html += "<div class='show-all-item'><strong>" + b.dataset.choiceTitle + "</strong><p>" + b.dataset.choiceBody + "</p></div>";
        });
        listWrap.innerHTML = html;

        output.insertAdjacentElement("afterend", listWrap);
        output.insertAdjacentElement("afterend", toggle);

        toggle.addEventListener("click", function () {
          var opening = listWrap.hidden;
          listWrap.hidden = !opening;
          toggle.textContent = opening ? "Hide all answers" : "Show all answers";
          toggle.setAttribute("aria-expanded", opening ? "true" : "false");
        });
      }
    });
  }

  function initQuizzes() {
    document.querySelectorAll("[data-quiz]").forEach(function (quiz) {
      var feedback = quiz.querySelector("[data-quiz-feedback]");
      var options = Array.prototype.slice.call(quiz.querySelectorAll("[data-quiz-option]"));
      if (feedback) {
        feedback.setAttribute("role", "status");
        feedback.setAttribute("aria-live", "polite");
        feedback.setAttribute("tabindex", "-1");
      }
      options.forEach(function (option) {
        option.setAttribute("aria-pressed", "false");
        option.addEventListener("click", function () {
          var correct = option.dataset.correct === "true";
          options.forEach(function (o) {
            o.classList.remove("chosen");
            o.setAttribute("aria-pressed", "false");
            o.classList.toggle("is-correct", o.dataset.correct === "true");
          });
          option.classList.add("chosen");
          option.setAttribute("aria-pressed", "true");
          quiz.classList.add("answered");
          if (feedback) {
            feedback.hidden = false;
            feedback.className = "quiz-feedback " + (correct ? "good" : "bad");
            feedback.innerHTML = "<strong>" + (correct ? "✓ Right." : "✗ Not quite.") + "</strong> " + (option.dataset.explain || "");
            window.requestAnimationFrame(function () {
              feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
              try { feedback.focus({ preventScroll: true }); } catch (e) {}
            });
          }
        });
      });
    });
  }

  function initChecklists() {
    document.querySelectorAll("[data-checklist]").forEach(function (list) {
      var output = list.querySelector("[data-checklist-output]");
      var checks = Array.prototype.slice.call(list.querySelectorAll("input[type='checkbox']"));
      function update() {
        var done = checks.filter(function (check) { return check.checked; }).length;
        if (output) output.textContent = done + " of " + checks.length + " checks satisfied";
      }
      checks.forEach(function (check) { check.addEventListener("change", update); });
      update();
    });
  }

  function initTierSimulator() {
    document.querySelectorAll("[data-tier-select]").forEach(function (select) {
      var output = document.querySelector(select.dataset.tierSelect);
      var tiers = {
        planning: "Tier 1 — temporary. Useful every day during the build, then archived at ship so it cannot go stale and mislead anyone later.",
        adr: "Tier 2 — decision record. Promote it to an ADR when the choice is hard to reverse, surprising, and a real trade-off.",
        living: "Tier 3 — living document. Keep it present-tense and update it as the project changes.",
        generated: "Generated output. Treat it as derived: fix the source that produces it, not the file itself."
      };
      select.addEventListener("change", function () {
        if (output) output.textContent = tiers[select.value] || "Choose a document type.";
      });
    });
  }

  function init() {
    initGlossary();
    initSectionNav();
    initPhraseTool();
    initExplainers();
    initChoicePanels();
    initQuizzes();
    initChecklists();
    initTierSimulator();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
