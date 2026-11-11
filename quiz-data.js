/* =============================================================
   Secondhand Shopper Personality Quiz — data & scoring
   -------------------------------------------------------------
   10 result "types", each an ALIAS for a real secondhand platform.
   Scoring uses NORMALIZATION: a user's raw points for each type are
   divided by the maximum points that type could earn. The winner is
   the highest ratio, so every result is equally achievable even
   though the raw point opportunities differ slightly per type.
   ============================================================= */

/* ---- The 10 result types (aliases for the sites) ---- */
const RESULTS = {
  vinted: {
    alias: "The Mindful Minimalist",
    site: "Vinted",
    archetype: "Eco-Conscious",
    emoji: "🌱",
    color: "#2e8b57",
    blurb:
      "You know your own style and don't let trends or logos boss you around. You shop with intention — buying less, choosing well, and giving clothes a second life.",
    affirmation:
      "Your instinct to keep it simple is quietly powerful: extending a garment's life by just nine months cuts its carbon, water and waste footprint by about 20–30%. Vinted was basically made for you.",
  },
  grailed: {
    alias: "The Vintage Connoisseur",
    site: "Grailed",
    archetype: "Vintage Curator",
    emoji: "🧥",
    color: "#6b4226",
    blurb:
      "Design over hype. You hunt for the unique, the rare, the one-of-one. A piece with a story beats a piece with a billboard every time.",
    affirmation:
      "Curating vintage keeps genuinely great design in circulation instead of in a landfill. Grailed is your natural habitat for rare, archival finds.",
  },
  vestiaire: {
    alias: "The Luxe Authenticator",
    site: "Vestiaire Collective",
    archetype: "Perfection Seeking",
    emoji: "💎",
    color: "#1b1b3a",
    blurb:
      "Status and quality matter, and you want proof. You invest in pieces that hold their value and signal that you have taste.",
    affirmation:
      "Buying pre-owned luxury keeps high-value pieces circulating and out of waste streams — and they often hold resale value. Vestiaire Collective authenticates the real deal for you.",
  },
  realreal: {
    alias: "The Quality Curator",
    site: "The RealReal",
    archetype: "Perfection Seeking",
    emoji: "🏷️",
    color: "#8b0000",
    blurb:
      "You trust certain brands because you know their craftsmanship. You'd rather own a few impeccable things than a closet of maybes.",
    affirmation:
      "Choosing well-made pieces that last is one of the most sustainable habits there is. The RealReal curates and authenticates quality consignment just for curators like you.",
  },
  thredup: {
    alias: "The Savvy Saver",
    site: "ThredUp",
    archetype: "Bargain Hunter",
    emoji: "💸",
    color: "#f4a261",
    blurb:
      "Great style shouldn't cost a month's rent. You love a haul, a deal, and the freedom to send back what isn't right.",
    affirmation:
      "Shopping secondhand first is the single easiest swap for your wallet AND the planet — the fashion industry produces around 10% of global carbon emissions. ThredUp makes big thrift hauls effortless.",
  },
  depop: {
    alias: "The Trendsetter",
    site: "Depop",
    archetype: "Casual Curiosity",
    emoji: "✨",
    color: "#e63946",
    blurb:
      "You follow trends that match your taste and love building a mood board before you buy. Your feed is your fitting room.",
    affirmation:
      "Finding trendy looks secondhand means you can experiment with your style without feeding fast fashion's waste cycle. Depop is where your aesthetic lives.",
  },
  ebay: {
    alias: "The Treasure Hunter",
    site: "eBay",
    archetype: "Bargain Hunter",
    emoji: "🔎",
    color: "#457b9d",
    blurb:
      "Patience is your superpower. You wait for the right piece at the right price and the thrill of the hunt is half the fun.",
    affirmation:
      "Every secondhand treasure you win is one less new item manufactured. eBay's endless marketplace rewards your patience and your bargain radar.",
  },
  beni: {
    alias: "The Precision Seeker",
    site: "Beni",
    archetype: "Perfection Seeking",
    emoji: "🎯",
    color: "#3a0ca3",
    blurb:
      "You know exactly what you want, down to the specific piece. Then you find it at the best quality you can — no wandering required.",
    affirmation:
      "Buying the exact thing you'll actually wear beats impulse buys that get worn once. Beni scans secondhand listings across the web to find your precise piece, pre-loved.",
  },
  fbmarketplace: {
    alias: "The Local Hunter",
    site: "Facebook Marketplace",
    archetype: "Bargain Hunter",
    emoji: "📍",
    color: "#1877f2",
    blurb:
      "Practical and hands-on. If you can try it on, haggle a little, and take it home today, that's the whole decision made.",
    affirmation:
      "Buying local means no shipping footprint and keeping items in your own community. Facebook Marketplace is your neighborhood thrift pipeline.",
  },
  poshmark: {
    alias: "The Social Stylist",
    site: "Poshmark",
    archetype: "Casual Curiosity",
    emoji: "👗",
    color: "#a020f0",
    blurb:
      "Style is social for you. You follow the people whose taste you love and build your look through community and recommendations.",
    affirmation:
      "Shopping from real people's closets turns sustainability into a social, sharable habit. Poshmark's community is made for stylists like you.",
  },
};

/* ---- Questions ----
   Each option's `points` maps a result-key -> points awarded.
   `sustainability` questions carry a pro-secondhand "did you know" note.
   ---------------------------------------------------------------- */
const QUESTIONS = [
  {
    id: "brand",
    theme: "sustainability",
    title: "How much do you consider Brand when shopping?",
    note: "Did you know? Chasing new-season brand drops drives overproduction — an estimated 85% of textiles end up in landfills or incinerated each year.",
    options: [
      { text: "Not at all — the look and feel is all that matters to me.", points: { vinted: 2 } },
      { text: "Not at all — design matters most. I value unique or vintage pieces.", points: { grailed: 2 } },
      { text: "Quite a bit — the brand and status matter to me.", points: { vestiaire: 2 } },
      { text: "Quite a bit — there are brands I trust to meet a certain quality.", points: { realreal: 2 } },
    ],
  },
  {
    id: "buying",
    theme: "fun",
    title: "When I buy clothes, I tend to…",
    options: [
      { text: "Shop in bulk! I love hauls — and I return what's not right.", points: { thredup: 2, depop: 1 } },
      { text: "Wait for the right piece to find me, at the right bargain.", points: { ebay: 2, grailed: 1 } },
      { text: "Know what I want, then buy that exact piece at the best quality.", points: { beni: 2, ebay: 1 } },
      { text: "Buy from a person nearby — try it on and take it home today.", points: { fbmarketplace: 2, vinted: 1 } },
    ],
  },
  {
    id: "trends",
    theme: "sustainability",
    title: "How do you feel about following fashion trends?",
    note: "Did you know? The average fast-fashion micro-trend can come and go in weeks, but a thrifted piece you love can last for years.",
    options: [
      { text: "I wouldn't follow an influencer just for style — I know my own.", points: { vinted: 2 } },
      { text: "I shop practically and don't really engage with trends.", points: { fbmarketplace: 2 } },
      { text: "I follow trends when they match my taste, especially from creators I like.", points: { depop: 2 } },
      { text: "I follow trends closely — down to the exact piece that's popular.", points: { beni: 2 } },
    ],
  },
  {
    id: "morning",
    theme: "fun",
    title: "Which one looks most like you on an average morning?",
    options: [
      { text: "I default to the style that makes me feel like me — I curate my outfit.", points: { depop: 2, poshmark: 1 } },
      { text: "Up early, perfectly polished — not a hair out of place or a wrinkle in sight.", points: { vestiaire: 2, realreal: 2 } },
      { text: "I roll out of bed and leave in sweats.", points: { thredup: 2, vinted: 1 } },
      { text: "My accessories matter most — phone, headphones, a vintage watch.", points: { ebay: 2, fbmarketplace: 1 } },
    ],
  },
  {
    id: "price",
    theme: "sustainability",
    title: "When I'm buying clothes, I think of price as…",
    note: "Did you know? Buying one secondhand item instead of new can save roughly 1 kg of CO₂ and hundreds of litres of water.",
    options: [
      { text: "Number one. I want style, but no item is worth a month's rent.", points: { thredup: 2, vinted: 1 } },
      { text: "A fun chase — getting a great deal is part of the thrill.", points: { ebay: 2, fbmarketplace: 1 } },
      { text: "An indicator of quality — pricier means more authentic and rare.", points: { vestiaire: 2, realreal: 2 } },
      { text: "Less important than the item. If I love it, price doesn't stop me.", points: { vinted: 2, grailed: 1 } },
    ],
  },
  {
    id: "curate",
    theme: "fun",
    title: "I curate my taste through…",
    options: [
      { text: "Pinterest — screenshots, boards, and building a mood before I buy.", points: { depop: 2, vestiaire: 1 } },
      { text: "In-person shopping — I like to feel and try things on.", points: { fbmarketplace: 2, vinted: 1 } },
      { text: "Influencers — I research their recommendations and tastes.", points: { poshmark: 2, realreal: 1 } },
      { text: "Brands — they symbolize quality, style, and reputation to me.", points: { grailed: 2, ebay: 1 } },
    ],
  },
  {
    id: "boba",
    theme: "fun",
    title: "You're at the boba shop. You order…",
    options: [
      { text: "The same drink I always get — I stick to what I know.", points: { beni: 2, realreal: 1 } },
      { text: "Something new every time — I want to try the whole menu.", points: { grailed: 2, depop: 1 } },
      { text: "Whatever the staff or my friends recommend.", points: { poshmark: 2, realreal: 2 } },
      { text: "Whatever's the best deal or biggest size for the price.", points: { thredup: 2, fbmarketplace: 1 } },
    ],
  },
  {
    id: "invite",
    theme: "fun",
    title: "A friend invites you to try something you've never done. You…",
    options: [
      { text: "Decide once I get a clear idea of what to expect.", points: { ebay: 2, beni: 1 } },
      { text: "Say yes instantly — I love new experiences.", points: { grailed: 2, depop: 1 } },
      { text: "Go if I know most of the people going.", points: { poshmark: 2, vinted: 1 } },
      { text: "Pass — I'm comfortable with my routines.", points: { thredup: 2, beni: 1 } },
    ],
  },
  {
    id: "relationships",
    theme: "fun",
    title: "I navigate relationships in a way where I…",
    options: [
      { text: "Keep my network expansive — the more people, the better.", points: { ebay: 2, fbmarketplace: 1 } },
      { text: "Pour into a few close bonds and keep them strong.", points: { vinted: 2, beni: 1 } },
      { text: "Talk to anyone who talks to me first.", points: { fbmarketplace: 2, poshmark: 1 } },
      { text: "Connect with people who elevate my position.", points: { vestiaire: 2, realreal: 2 } },
    ],
  },
  {
    id: "friday",
    theme: "fun",
    title: "It's Friday night. Your go-to is…",
    options: [
      { text: "Staying in to unwind with a show.", points: { vinted: 2, thredup: 1 } },
      { text: "A bar or a party, to meet new people.", points: { poshmark: 2, depop: 1 } },
      { text: "Something artsy — a gallery, a small show, a night of making.", points: { grailed: 2, depop: 1 } },
      { text: "A sport — a little competition kicks off the weekend right.", points: { ebay: 2, beni: 1 } },
    ],
  },
];

/* ---- Precompute the maximum points each result type can earn ----
   (used to normalize scores so every type is equally achievable) */
const MAX_POINTS = (() => {
  const max = {};
  Object.keys(RESULTS).forEach((k) => (max[k] = 0));
  QUESTIONS.forEach((q) => {
    const best = {};
    q.options.forEach((opt) => {
      Object.entries(opt.points).forEach(([k, v]) => {
        best[k] = Math.max(best[k] || 0, v);
      });
    });
    Object.entries(best).forEach(([k, v]) => (max[k] += v));
  });
  return max;
})();

/* ---- Scoring: returns ranked results by normalized ratio ---- */
function scoreQuiz(answers) {
  // answers: array of chosen option objects
  const raw = {};
  Object.keys(RESULTS).forEach((k) => (raw[k] = 0));
  answers.forEach((opt) => {
    if (!opt) return;
    Object.entries(opt.points).forEach(([k, v]) => (raw[k] += v));
  });

  const ranked = Object.keys(RESULTS)
    .map((k) => ({
      key: k,
      raw: raw[k],
      ratio: MAX_POINTS[k] ? raw[k] / MAX_POINTS[k] : 0,
    }))
    .sort((a, b) => b.ratio - a.ratio || b.raw - a.raw);

  return ranked;
}

/* expose for the browser */
window.QUIZ = { RESULTS, QUESTIONS, MAX_POINTS, scoreQuiz };
