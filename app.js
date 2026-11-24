/* =============================================================
   Secondhand Shopper Personality Quiz — app / UI logic
   ============================================================= */

const CTA_COPY = {
  valueLine: "Because you value {value}, your next move is simple.",
  statBig: "Up to 42%",
  statText:
    "lower climate impact per wear when you buy second-hand instead of new, and up to 53% less water stress.",
  statSource:
    "Source: Klooster et al., Journal of Circular Economy (life cycle assessment of t-shirts, dresses, trousers & sweaters).",
  microcopy:
    "Pre-checked, photographed, and priced well below retail. Same style, better quality for your money.",
  success: "Nice. You're a thrifter now.",
  checkboxLabel: "Next time I need something new, I'll check secondhand first.",
};

const AFFINITY_ORDER = [
  "vinted",
  "depop",
  "ebay",
  "fbmarketplace",
  "poshmark",
  "vestiaire",
  "realreal",
  "grailed",
  "thredup",
  "beni",
];

// Spoke length (0–1) for a platform's ratio (raw ÷ max). `top` is the person's
// highest ratio. The top spoke lands on √top and every other spoke is scaled by
// the same divisor, so the chart fills out without distorting the proportions.
function affinityRadius(ratio, top) {
  return top ? ratio / Math.sqrt(top) : 0;
}

const AFFINITY_LABELS = {
  vinted: "Vinted",
  depop: "Depop",
  ebay: "eBay",
  fbmarketplace: "Facebook",
  poshmark: "Poshmark",
  vestiaire: "Vestiaire",
  realreal: "RealReal",
  grailed: "Grailed",
  thredup: "ThredUp",
  beni: "Beni",
};

(function () {
  const { RESULTS, QUESTIONS, scoreQuiz } = window.QUIZ;

  function stripEmoji(text) {
    return String(text || "")
      .replace(/\p{Extended_Pictographic}|\p{Emoji_Presentation}/gu, "")
      .trim();
  }

  // Fisher-Yates shuffle (returns a new array)
  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // A fresh run: questions in random order, each with its answers in random order.
  // Option objects are reused, so scoring and selection checks still match.
  function newRun() {
    return {
      index: 0,
      questions: shuffle(QUESTIONS).map((q) => ({ ...q, options: shuffle(q.options) })),
      answers: new Array(QUESTIONS.length).fill(null),
    };
  }

  const state = newRun();

  const screens = {
    start: document.getElementById("screen-start"),
    quiz: document.getElementById("screen-quiz"),
    result: document.getElementById("screen-result"),
    cta: document.getElementById("screen-cta"),
  };

  const el = {
    progressBar: document.getElementById("progress-bar"),
    counter: document.getElementById("q-counter"),
    title: document.getElementById("q-title"),
    note: document.getElementById("q-note"),
    options: document.getElementById("options"),
    questionCard: document.getElementById("question-card"),
    btnBack: document.getElementById("btn-back"),
    // result
    resultCard: document.getElementById("result-card"),
    resultTags: document.getElementById("result-tags"),
    resAlias: document.getElementById("result-alias"),
    resSite: document.getElementById("result-site"),
    resLogo: document.getElementById("result-logo"),
    resMatchPct: document.getElementById("result-match-pct"),
    resHeroImg: document.getElementById("result-hero-img"),
    resHeroFallback: document.getElementById("result-hero-fallback"),
    resAesthetic: document.getElementById("result-aesthetic"),
    resVibe: document.getElementById("result-vibe"),
    resQuizSignal: document.getElementById("result-quiz-signal"),
    platformTitle: document.getElementById("platform-unique-title"),
    platformIntro: document.getElementById("platform-unique-intro"),
    platformList: document.getElementById("platform-unique-list"),
    resOverview: document.getElementById("result-overview"),
    resStrengths: document.getElementById("result-strengths"),
    resWeaknesses: document.getElementById("result-weaknesses"),
    resFriendship: document.getElementById("result-friendship"),
    compat: document.getElementById("compat"),
    runners: document.getElementById("runners"),
    affinityChart: document.getElementById("affinity-chart"),
    btnExplore: document.getElementById("btn-explore"),
    shareStatus: document.getElementById("share-status"),
    stageBg: document.getElementById("stage-bg"),
    app: document.getElementById("app"),
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
  let lastRanked = null;

  function show(name) {
    Object.values(screens).forEach((s) => s.classList.remove("is-active"));
    screens[name].classList.add("is-active");
    el.app.classList.toggle("app--wide", name === "result");
    if (el.stageBg) el.stageBg.style.opacity = name === "result" ? "0" : "1";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderQuestion() {
    const q = state.questions[state.index];
    const total = state.questions.length;

    el.counter.textContent = `Question ${state.index + 1} of ${total}`;
    el.progressBar.style.width = `${(state.index / total) * 100}%`;
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
    el.questionCard.classList.remove("pop");
    void el.questionCard.offsetWidth;
    el.questionCard.classList.add("pop");
  }

  function choose(opt, btn) {
    state.answers[state.index] = opt;
    [...el.options.children].forEach((c) => c.classList.remove("is-selected"));
    if (btn) btn.classList.add("is-selected");

    setTimeout(() => {
      if (state.index < state.questions.length - 1) {
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

  function renderAffinityChart(ranked, topKey) {
    const size = 360;
    const cx = size / 2;
    const cy = size / 2;
    const maxR = 110;
    const n = AFFINITY_ORDER.length;
    const ratios = Object.fromEntries(ranked.map((r) => [r.key, r.ratio]));
    const topRatio = Math.max(...ranked.map((r) => r.ratio));

    function point(i, r) {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
    }

    const rings = [0.25, 0.5, 0.75, 1]
      .map((t) => {
        const pts = AFFINITY_ORDER.map((_, i) => point(i, maxR * t).join(",")).join(" ");
        return `<polygon points="${pts}" fill="none" stroke="#111" stroke-opacity="0.18" stroke-width="1" />`;
      })
      .join("");

    const axes = AFFINITY_ORDER.map((_, i) => {
      const [x, y] = point(i, maxR);
      return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#111" stroke-opacity="0.2" stroke-width="1" />`;
    }).join("");

    const shapePts = AFFINITY_ORDER.map((key, i) => {
      const ratio = Math.max(0.08, Math.min(1, affinityRadius(ratios[key] || 0, topRatio)));
      return point(i, maxR * ratio).join(",");
    }).join(" ");

    const labels = AFFINITY_ORDER.map((key, i) => {
      const [x, y] = point(i, maxR + 28);
      const active = key === topKey;
      return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" class="affinity-label${
        active ? " is-active" : ""
      }" data-key="${key}">${AFFINITY_LABELS[key]}</text>`;
    }).join("");

    el.affinityChart.innerHTML = `
      <svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Platform affinity chart">
        ${rings}
        ${axes}
        <polygon points="${shapePts}" fill="rgba(54,103,240,0.28)" stroke="#3667f0" stroke-width="2.5" />
        ${labels}
      </svg>
    `;

    el.affinityChart.querySelectorAll(".affinity-label").forEach((node) => {
      node.style.cursor = "pointer";
      node.addEventListener("click", () => {
        const key = node.getAttribute("data-key");
        const rd = RESULTS[key];
        if (!rd) return;
        // soft compare: scroll unique section and flash platform name
        el.platformTitle.textContent = `What makes ${rd.site} unique?`;
        el.platformIntro.textContent = rd.platformUnique || "";
        el.platformList.innerHTML = "";
        (rd.platformBullets || []).forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          el.platformList.appendChild(li);
        });
        el.platformTitle.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  }

  function finish() {
    el.progressBar.style.width = "100%";
    const ranked = scoreQuiz(state.answers);
    lastRanked = ranked;
    const top = ranked[0];
    const data = RESULTS[top.key];
    lastResult = data;

    el.resultTags.innerHTML = "";
    (data.tags || []).forEach((tag) => {
      const span = document.createElement("span");
      span.textContent = tag;
      el.resultTags.appendChild(span);
    });

    el.resAlias.innerHTML = `${stripEmoji(data.alias)}<span class="result-title__underscore">_</span>`;
    el.resSite.textContent = data.site;
    el.resMatchPct.textContent = `${Math.round((top.ratio || 0) * 100)}%`;

    if (data.logoImage) {
      el.resLogo.src = data.logoImage;
      el.resLogo.alt = data.site;
      el.resLogo.hidden = false;
      el.resSite.hidden = true;
    } else {
      el.resLogo.hidden = true;
      el.resSite.hidden = false;
    }

    if (data.heroImage) {
      el.resHeroImg.src = data.heroImage;
      el.resHeroImg.alt = data.alias;
      el.resHeroImg.hidden = false;
      el.resHeroFallback.hidden = true;
    } else {
      el.resHeroImg.hidden = true;
      el.resHeroFallback.hidden = false;
      el.resHeroFallback.textContent = data.emoji || "✨";
    }

    el.resAesthetic.textContent = data.aesthetic || "";
    el.resVibe.textContent = data.vibe || "";
    el.resQuizSignal.textContent = data.quizSignal || "";
    el.platformTitle.textContent = `What makes ${data.site} unique?`;
    el.platformIntro.textContent = data.platformUnique || "";
    el.platformList.innerHTML = "";
    (data.platformBullets || []).forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      el.platformList.appendChild(li);
    });

    el.resOverview.textContent = data.overview || "";
    el.resStrengths.textContent = data.strengths || "";
    el.resWeaknesses.textContent = data.weaknesses || "";
    el.resFriendship.textContent = data.friendship || "";

    function fillChip(container, rd) {
      const chip = document.createElement("div");
      chip.className = "runner";
      chip.innerHTML = `<span class="runner__emoji"></span>
        <span class="runner__text"><strong></strong><small></small></span>`;
      chip.querySelector(".runner__emoji").textContent = rd.emoji || "";
      chip.querySelector("strong").textContent = rd.alias;
      chip.querySelector("small").textContent = rd.site;
      container.appendChild(chip);
    }

    el.compat.innerHTML = "";
    (data.compatible || []).forEach((key) => {
      if (RESULTS[key]) fillChip(el.compat, RESULTS[key]);
    });

    el.runners.innerHTML = "";
    ranked.slice(1, 3).forEach((r) => {
      fillChip(el.runners, RESULTS[r.key]);
    });

    renderAffinityChart(ranked, top.key);
    show("result");
  }

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
      /* cancelled */
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

  function restart() {
    Object.assign(state, newRun());
    lastResult = null;
    lastRanked = null;
    el.ctaCheck.checked = false;
    el.ctaSuccess.hidden = true;
    renderQuestion();
    show("quiz");
  }

  document.getElementById("btn-start").addEventListener("click", () => {
    renderQuestion();
    show("quiz");
  });
  el.btnBack.addEventListener("click", back);
  document.getElementById("btn-restart-top").addEventListener("click", () => {
    Object.assign(state, newRun());
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
