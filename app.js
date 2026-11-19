/* =============================================================
   Secondhand Shopper Personality Quiz — app / UI logic
   ============================================================= */

const CTA_COPY = {
  valueLine: "Because you value {value}, your next move is simple.",
  statBig: "Up to 42%",
  statText: "lower climate impact per wear when you buy second-hand instead of new, and up to 53% less water stress.",
  statSource: "Source: Klooster et al., Journal of Circular Economy (life cycle assessment of t-shirts, dresses, trousers & sweaters).",
  microcopy: "Pre-checked, photographed, and priced well below retail. Same style, better quality for your money.",
  success: "Nice. You're a thrifter now.",
  checkboxLabel: "Next time I need something new, I'll check secondhand first.",
};

(function () {
  const { RESULTS, QUESTIONS, scoreQuiz } = window.QUIZ;

  function stripEmoji(text) {
    return text.replace(/\p{Extended_Pictographic}|\p{Emoji_Presentation}/gu, '').trim();
  }

  const state = {
    index: 0,
    answers: new Array(QUESTIONS.length).fill(null),
  };

  // --- element refs ---
  const screens = {
    start: document.getElementById("screen-start"),
    quiz: document.getElementById("screen-quiz"),
    result: document.getElementById("screen-result"),
    cta: document.getElementById("screen-cta"),
  };
  const el = {
    progressBar: document.getElementById("progress-bar"),
    counter: document.getElementById("q-counter"),
    tag: document.getElementById("q-tag"),
    title: document.getElementById("q-title"),
    note: document.getElementById("q-note"),
    options: document.getElementById("options"),
    questionCard: document.getElementById("question-card"),
    btnBack: document.getElementById("btn-back"),
    // result
    resEmoji: document.getElementById("result-emoji"),
    resAlias: document.getElementById("result-alias"),
    resArchetype: document.getElementById("result-archetype"),
    resBlurb: document.getElementById("result-blurb"),
    resSite: document.getElementById("result-site"),
    resAffirm: document.getElementById("result-affirm"),
    runners: document.getElementById("runners"),
    shareStatus: document.getElementById("share-status"),
    resultCard: document.getElementById("result-card"),
    btnExplore: document.getElementById("btn-explore"),
    // cta
    ctaValue: document.getElementById("cta-value"),
    ctaPlatformBtn: document.getElementById("btn-platform"),
    ctaSuccess: document.getElementById("cta-success"),
    ctaCheck: document.getElementById("cta-check"),
    ctaMicrocopy: document.querySelector(".cta-microcopy"),
    btnShareCta: document.getElementById("btn-share-cta"),
    btnRestartCta: document.getElementById("btn-restart-cta"),
  };

  let lastResult = null;

  // --- screen switching ---
  function show(name) {
    Object.values(screens).forEach((s) => s.classList.remove("is-active"));
    screens[name].classList.add("is-active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // --- render current question ---
  function renderQuestion() {
    const q = QUESTIONS[state.index];
    const total = QUESTIONS.length;

    el.counter.textContent = `Question ${state.index + 1} of ${total}`;
    el.progressBar.style.width = `${(state.index / total) * 100}%`;

    el.tag.textContent =
      q.theme === "sustainability" ? "Thrift talk" : "About you";
    el.tag.dataset.theme = q.theme;

    el.title.textContent = q.title;

    if (q.note) {
      el.note.textContent = q.note;
      el.note.hidden = false;
    } else {
      el.note.hidden = true;
    }

    el.options.innerHTML = "";
    q.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.type = "button";
      if (state.answers[state.index] === opt) btn.classList.add("is-selected");
      btn.innerHTML = `<span class="option__dot"></span><span class="option__text"></span>`;
      btn.querySelector(".option__text").textContent = opt.text;
      btn.addEventListener("click", () => choose(opt, btn));
      el.options.appendChild(btn);
    });

    el.btnBack.disabled = state.index === 0;

    // retrigger entrance animation
    el.questionCard.classList.remove("pop");
    void el.questionCard.offsetWidth;
    el.questionCard.classList.add("pop");
  }

  // --- handle answer ---
  function choose(opt, btn) {
    state.answers[state.index] = opt;
    [...el.options.children].forEach((c) => c.classList.remove("is-selected"));
    if (btn) btn.classList.add("is-selected");

    setTimeout(() => {
      if (state.index < QUESTIONS.length - 1) {
        state.index++;
        renderQuestion();
      } else {
        finish();
      }
    }, 260);
  }

  function back() {
    if (state.index > 0) {
      state.index--;
      renderQuestion();
    }
  }

  function renderCta() {
    if (!lastResult) return;

    const value = lastResult.coreValue || "quality";
    const statBig = document.getElementById("cta-stat-big");
    const statText = document.getElementById("cta-stat-text");
    const statSource = document.getElementById("cta-stat-source");

    el.ctaValue.textContent = CTA_COPY.valueLine.replace("{value}", value);
    statBig.textContent = CTA_COPY.statBig;
    statText.textContent = CTA_COPY.statText;
    statSource.textContent = CTA_COPY.statSource;
    el.ctaPlatformBtn.href = lastResult.url || "#";
    el.ctaPlatformBtn.textContent = `Find your first 3 pieces on ${lastResult.site} →`;
    el.ctaPlatformBtn.setAttribute(
      "aria-label",
      `Find your first 3 pieces on ${lastResult.site}`
    );
    el.ctaMicrocopy.textContent = CTA_COPY.microcopy;
    el.ctaCheck.checked = false;
    el.ctaSuccess.hidden = true;
    el.ctaSuccess.textContent = CTA_COPY.success;
    el.ctaCheck.setAttribute("aria-label", CTA_COPY.checkboxLabel);
  }

  // --- finish & show result ---
  function finish() {
    el.progressBar.style.width = "100%";
    const ranked = scoreQuiz(state.answers);
    const top = ranked[0];
    const data = RESULTS[top.key];
    lastResult = data;

    el.resEmoji.textContent = "";
    el.resAlias.textContent = stripEmoji(data.alias);
    el.resArchetype.textContent = data.archetype;
    el.resBlurb.textContent = data.blurb;
    el.resSite.textContent = data.site;
    el.resAffirm.textContent = data.affirmation;
    el.resultCard.style.setProperty("--accent", data.color);

    el.runners.innerHTML = "";
    ranked.slice(1, 3).forEach((r) => {
      const rd = RESULTS[r.key];
      const chip = document.createElement("div");
      chip.className = "runner";
      chip.innerHTML = `<span class="runner__emoji"></span>
        <span class="runner__text"><strong></strong><small></small></span>`;
      chip.querySelector(".runner__emoji").textContent = rd.emoji;
      chip.querySelector("strong").textContent = rd.alias;
      chip.querySelector("small").textContent = rd.site;
      el.runners.appendChild(chip);
    });

    show("result");
  }

  // --- share ---
  async function share() {
    if (!lastResult) return;
    const text = `I'm "${lastResult.alias}" ${lastResult.emoji} — my secondhand shopper type! My platform match is ${lastResult.site}. What's yours?`;
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title: "My Secondhand Shopper Type", text, url });
        return;
      }
    } catch (e) {
      /* user cancelled — fall through to copy */
    }

    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      flashShare("Copied to clipboard! Paste it anywhere 📋");
    } catch (e) {
      flashShare(text);
    }
  }

  function flashShare(msg) {
    const target = el.shareStatus || document.getElementById("share-status");
    if (!target) return;
    target.textContent = msg;
    target.hidden = false;
    setTimeout(() => (target.hidden = true), 4000);
  }

  // --- restart ---
  function restart() {
    state.index = 0;
    state.answers = new Array(QUESTIONS.length).fill(null);
    lastResult = null;
    el.ctaCheck.checked = false;
    el.ctaSuccess.hidden = true;
    renderQuestion();
    show("quiz");
  }

  // --- wire up ---
  document.getElementById("btn-start").addEventListener("click", () => {
    renderQuestion();
    show("quiz");
  });
  el.btnBack.addEventListener("click", back);
  document.getElementById("btn-restart-top").addEventListener("click", () => {
    state.index = 0;
    state.answers = new Array(QUESTIONS.length).fill(null);
    lastResult = null;
    show("start");
  });
  el.btnShareCta.addEventListener("click", share);
  el.btnRestartCta.addEventListener("click", restart);
  el.btnExplore.addEventListener("click", () => {
    renderCta();
    show("cta");
  });

  el.ctaCheck.addEventListener("change", () => {
    if (el.ctaCheck.checked) {
      el.ctaSuccess.hidden = false;
      el.ctaPlatformBtn.classList.add("is-celebrating");
      setTimeout(() => el.ctaPlatformBtn.classList.remove("is-celebrating"), 500);
    } else {
      el.ctaSuccess.hidden = true;
      el.ctaPlatformBtn.classList.remove("is-celebrating");
    }
  });
})();
