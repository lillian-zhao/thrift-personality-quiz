/* =============================================================
   Secondhand Shopper Personality Quiz — app / UI logic
   ============================================================= */
(function () {
  const { RESULTS, QUESTIONS, scoreQuiz } = window.QUIZ;

  const state = {
    index: 0,
    answers: new Array(QUESTIONS.length).fill(null),
  };

  // --- element refs ---
  const screens = {
    start: document.getElementById("screen-start"),
    quiz: document.getElementById("screen-quiz"),
    result: document.getElementById("screen-result"),
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
    el.progressBar.style.width = `${((state.index) / total) * 100}%`;

    el.tag.textContent =
      q.theme === "sustainability" ? "🌱 Thrift talk" : "✨ About you";
    el.tag.dataset.theme = q.theme;

    el.title.textContent = q.title;

    if (q.note) {
      el.note.textContent = q.note;
      el.note.hidden = false;
    } else {
      el.note.hidden = true;
    }

    el.options.innerHTML = "";
    q.options.forEach((opt, i) => {
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
    // visual select
    [...el.options.children].forEach((c) => c.classList.remove("is-selected"));
    if (btn) btn.classList.add("is-selected");

    // small delay so the selection is visible, then advance
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

  // --- finish & show result ---
  function finish() {
    el.progressBar.style.width = "100%";
    const ranked = scoreQuiz(state.answers);
    const top = ranked[0];
    const data = RESULTS[top.key];
    lastResult = data;

    el.resEmoji.textContent = data.emoji;
    el.resAlias.textContent = data.alias;
    el.resArchetype.textContent = data.archetype;
    el.resBlurb.textContent = data.blurb;
    el.resSite.textContent = data.site;
    el.resAffirm.textContent = data.affirmation;

    // accent color
    el.resultCard.style.setProperty("--accent", data.color);

    // runners-up (next 2)
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
    el.shareStatus.textContent = msg;
    el.shareStatus.hidden = false;
    setTimeout(() => (el.shareStatus.hidden = true), 4000);
  }

  // --- restart ---
  function restart() {
    state.index = 0;
    state.answers = new Array(QUESTIONS.length).fill(null);
    renderQuestion();
    show("quiz");
  }

  // --- wire up ---
  document.getElementById("btn-start").addEventListener("click", () => {
    renderQuestion();
    show("quiz");
  });
  el.btnBack.addEventListener("click", back);
  document.getElementById("btn-restart").addEventListener("click", restart);
  document.getElementById("btn-restart-top").addEventListener("click", () => {
    state.index = 0;
    state.answers = new Array(QUESTIONS.length).fill(null);
    show("start");
  });
  document.getElementById("btn-share").addEventListener("click", share);
})();
