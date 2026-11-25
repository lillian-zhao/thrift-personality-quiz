/* =============================================================
   Secondhand Shopper Personality Quiz — data & scoring
   -------------------------------------------------------------
   10 result "types", each an ALIAS for a real secondhand platform.
   Scoring uses NORMALIZATION: a user's raw points for each type are
   divided by the maximum points that type could earn. The winner is
   the highest ratio, so every result is equally achievable even
   though the raw point opportunities differ slightly per type.
   ============================================================= */

/* ---- The 10 result types (fruit + object aliases for the sites) ---- */
const RESULTS = {
  vinted: {
    alias: "The Blueberry Bomber",
    site: "Vinted",
    coreValue: "intentional",
    url: "https://www.vinted.com/",
    archetype: "Trendsetter",
    emoji: "🫐",
    color: "#2e5a8b",
    tags: ["intentional","steady","understated"],
    aesthetic: "clean basics, thoughtful layers, quiet everyday pieces you actually rewear.",
    vibe: "low-drama and sure of yourself. you buy what fits your life, not the feed.",
    quizSignal: "skips hype, trusts their own style, prefers fewer better things.",
    heroImage: null,
    logoImage: null,
    blurb:
      "Quietly sure of yourself. You skip the hype, stick to what feels like you, and keep your closet (and life) unfussy.",
    overview:
      "You're intentional without being precious. You know your style, you buy when something actually fits your life, and you don't need a logo to feel put together. In work, friendships, and shopping, you prefer fewer, better choices; you'd rather reuse something great than chase whatever's loudest right now.",
    strengths:
      "Self-aware, steady, and hard to pressure. You make calm decisions, stick with what works, and bring a low-drama energy that other people trust. You're good at editing: closets, plans, and noise.",
    weaknesses:
      "Your comfort zone can get too cozy. You may skip experiments that would stretch you, or dismiss trends so quickly you miss something you'd actually love. Sometimes \"keeping it simple\" becomes avoiding change.",
    friendship:
      "You're the reliable friend who shows up without the performance — texts back, remembers the small stuff, and prefers deep one-on-ones to crowded nights. People feel safe around you because you don't need them to be \"on.\"",
    compatible: ["thredup", "beni"],
    platformUnique:
      "Vinted is peer-to-peer thrifting without the middleman markup — everyday closets, fair prices, and a no-pressure place to buy and sell what you actually wear.",
    platformBullets: [
      "buyer-to-seller marketplace with low fees",
      "great for everyday clothes, not just designer",
      "easy to list and declutter your own closet",
      "strong community of real people selling real wardrobes",
      "built for intentional, repeat thrifting",
    ],
    affirmation:
      "Your instinct to keep it simple is quietly powerful: extending a garment's life by just nine months cuts its carbon, water and waste footprint by about 20–30%. Vinted was basically made for you.",
  },
  grailed: {
    alias: "The Blackberry Sneakers",
    site: "Grailed",
    coreValue: "originality",
    url: "https://grailed.com/",
    archetype: "Perfection Seeking",
    emoji: "🖤",
    color: "#3d2a4a",
    tags: ["collector","original","elevated"],
    aesthetic: "archival streetwear, rare sneakers, design-forward one-offs.",
    vibe: "taste over trends. you want the piece with a story, and you know which designers represent you best.",
    quizSignal: "hunts unique finds, waits for the one-of-one, digs past the obvious.",
    heroImage: null,
    logoImage: null,
    blurb:
      "Design comes first. You chase the rare, the archival, the piece with a story. If you know, you know.",
    overview:
      "You have a collector's instinct. Whether it's clothes, music, or hobbies, you care about originality and provenance more than popularity. You'd rather wait for the one-of-one than settle for whatever everyone else is wearing this month — and that pickiness is part of your charm.",
    strengths:
      "Sharp eye, real patience, and taste that feels personal. You notice details other people skim past, and you're willing to dig for something with history. When you commit, it's because you mean it.",
    weaknesses:
      "You can get snobby about \"basic\" choices, or wait so long for the perfect find that you miss good-enough options. Sometimes the hunt becomes the point — even when you already have what you need.",
    friendship:
      "You're the friend who opens doors — a hidden spot, a deep-cut reference, a vintage tip nobody else would know. Your circle is selective, but once someone's in, you're fiercely loyal and always bringing something interesting to the table.",
    compatible: ["therealreal", "depop"],
    platformUnique:
      "Grailed is the go-to for menswear, streetwear, and archival fashion — a curated marketplace where rare finds and design history matter more than mass trends.",
    platformBullets: [
      "specialized in streetwear, designer, and vintage menswear",
      "sellers who know their pieces and provenance",
      "filters built for serious collectors",
      "community that values originality over hype",
      "strong bidding market for archival and limited drops",
    ],
    affirmation:
      "Curating vintage keeps genuinely great design in circulation instead of in a landfill. Grailed is your natural habitat for rare, archival finds.",
  },
  vestiaire: {
    alias: "The Persimmon Ring",
    site: "Vestiaire Collective",
    coreValue: "craftsmanship",
    url: "https://www.vestiairecollective.com/",
    archetype: "Perfection Seeking",
    emoji: "💍",
    color: "#c45c26",
    tags: ["polished","elevated","discerning"],
    aesthetic: "authenticated luxury, statement accessories, investment wardrobe staples.",
    vibe: "put-together on purpose. quality and status matter — with proof.",
    quizSignal: "cares about brand reputation, wants polish, invests in lasting pieces.",
    heroImage: null,
    logoImage: null,
    blurb:
      "Polished and intentional. Status and quality matter — you want proof, and you invest in pieces that hold their own.",
    overview:
      "You like things that signal care — in how you dress, how you show up, and what you invest in. Quality and reputation matter to you, not just for flexing, but because you want your choices to last and look intentional. You're drawn to the elevated version of almost everything.",
    strengths:
      "High standards, polished presence, and a gift for making ordinary moments feel intentional. You notice craftsmanship, you plan ahead, and you rarely look like you rolled out of bed by accident.",
    weaknesses:
      "Image can weigh on you. You may compare yourself to others, overthink how you're being perceived, or hesitate until something feels \"impressive enough.\" Perfectionism can quietly steal the fun.",
    friendship:
      "You show care through thoughtful invites, good taste, and being the friend who makes plans feel special. You keep a curated circle and appreciate people who also put in effort — emotionally and aesthetically.",
    compatible: ["realreal", "poshmark"],
    platformUnique:
      "Vestiaire Collective is the secondhand luxury marketplace that authenticates high-end pieces so you can shop status brands with more confidence.",
    platformBullets: [
      "authentication for designer and luxury items",
      "global inventory of elevated pre-owned fashion, strong European seller community",
      "strong resale value for investment pieces",
      "curated luxury experience beyond casual thrift",
      "trusted by shoppers who want proof of quality",
    ],
    affirmation:
      "Buying pre-owned luxury keeps high-value pieces circulating and out of waste streams — and they often hold resale value. Vestiaire Collective authenticates the real deal for you.",
  },
  realreal: {
    alias: "The Quince Watch",
    site: "The RealReal",
    coreValue: "craftsmanship",
    url: "https://www.therealreal.com/",
    archetype: "Perfection Seeking",
    emoji: "⌚",
    color: "#8b6914",
    tags: ["curated","timeless","exacting"],
    aesthetic: "crafted luxury, classic silhouettes, brands you trust for longevity.",
    vibe: "long-game energy. fewer impeccable things beat a closet of maybes.",
    quizSignal: "trusts craftsmanship, researches before buying, avoids impulse.",
    heroImage: null,
    logoImage: null,
    blurb:
      "You trust craftsmanship. A few impeccable pieces beat a closet of maybes every time.",
    overview:
      "You're a long-game person. You'd rather own fewer things that last — clothes, habits, opinions — than constantly rotate through whatever's new. Brands and makers you trust matter because they've earned it. You're less about trends and more about timeless quality.",
    strengths:
      "Discerning, consistent, and quietly confident. You research before you commit, value longevity over novelty, and tend to give solid advice because you've thought it through.",
    weaknesses:
      "Caution can tip into delay. You might wait for the \"perfect\" option while good opportunities pass, or hold yourself (and others) to standards that feel a bit rigid in everyday life.",
    friendship:
      "You're the friend who remembers birthdays, gives advice that actually helps, and sticks around for the long haul. Not the loudest in the group chat — but often the one people trust most when it counts.",
    compatible: ["vestiaire", "beni"],
    platformUnique:
      "The RealReal is consignment done carefully — authenticated luxury fashion and home goods, curated for shoppers who care about craftsmanship and lasting quality.",
    platformBullets: [
      "expert authentication and consignment model",
      "curated selection of luxury brands",
      "clothes, accessories, and home in one place",
      "quality-first shopping for fewer, better pieces",
      "trusted names with verified craftsmanship",
    ],
    affirmation:
      "Choosing well-made pieces that last is one of the most sustainable habits there is. The RealReal curates and authenticates quality consignment just for curators like you.",
  },
  thredup: {
    alias: "The Honeydew Crewneck",
    site: "ThredUp",
    coreValue: "a good deal",
    url: "https://www.thredup.com/",
    archetype: "Bargain Hunter",
    emoji: "🍈",
    color: "#7cb342",
    tags: ["practical","cozy","resourceful"],
    aesthetic: "easy everyday wear, soft knits, haul-friendly closet fillers.",
    vibe: "soft life, smart spends. style without the stress of overpaying.",
    quizSignal: "loves a deal, shops in bulk, returns what doesn't work.",
    heroImage: null,
    logoImage: null,
    blurb:
      "Soft life, smart spends. You love a haul, a deal, and the freedom to send back what isn't right.",
    overview:
      "You're practical about pleasure. You want style and comfort without the stress of overpaying — and you're fine browsing a lot to get there. Hauls, returns, and \"good enough for now\" are part of how you move through the world: flexible, budget-aware, and unbothered by perfection.",
    strengths:
      "Adaptable, resourceful, and low-pressure. You know how to stretch a dollar, keep things light, and pivot when something doesn't work. People find you easy to be around because you don't overcomplicate.",
    weaknesses:
      "\"Just one more\" can become a pile. You may buy more than you need, lose track of what you already own, or default to comfort so hard that style becomes an afterthought.",
    friendship:
      "You're the cozy hang friend — couch, snacks, no dress code, no agenda. You make people feel at home, and you're usually the one who says \"we don't have to do anything fancy\" and means it.",
    compatible: ["vinted", "fbmarketplace"],
    platformUnique:
      "ThredUp is thrift at scale — huge inventory, easy returns, and the kind of haul-friendly secondhand shopping that feels as simple as buying new.",
    platformBullets: [
      "massive selection across sizes and styles",
      "easy returns if something isn't right",
      "clean, retail-like shopping experience",
      "great for budget-friendly everyday finds",
      "effortless way to thrift in bulk",
    ],
    affirmation:
      "Shopping secondhand first is the single easiest swap for your wallet AND the planet — the fashion industry produces around 10% of global carbon emissions. ThredUp makes big thrift hauls effortless.",
  },
  depop: {
    alias: "The Cherry Platform",
    site: "Depop",
    coreValue: "self-expression",
    url: "https://www.depop.com/",
    archetype: "Trendsetter",
    emoji: "🍒",
    color: "#e63946",
    tags: ["expressive","curious","visual"],
    aesthetic: "y2k, vintage mixes, mood-board looks, trend-led personal style.",
    vibe: "your feed is your fitting room. you dress for the era you're in.",
    quizSignal: "follows aesthetics, builds a mood first, shops for self-expression.",
    heroImage: null,
    logoImage: null,
    blurb:
      "Your feed is your fitting room. You build a mood first, then chase the pieces that match your aesthetic.",
    overview:
      "You're expressive and visual. Mood boards, screenshots, and setting the \"trend\" aren't a joke to you — they're how you figure out who you are. You like trying on identities through style, and you follow trends when they feel like an extension of your taste, not a costume.",
    strengths:
      "Creative, curious, and quick to turn inspiration into action. You notice aesthetics everywhere, you're open to reinvention, and you make ordinary days feel more intentional just by caring how they look and feel.",
    weaknesses:
      "Inspiration can outrun reality. You may buy for the vibe before the lifestyle, chase micro-trends too hard, or feel restless the moment something stops feeling \"new.\"",
    friendship:
      "You're the hype friend — outfit checks, \"you have to try this,\" and the group chat energy that turns a random night into a story. You celebrate people's eras and help them lean into who they're becoming.",
    compatible: ["poshmark", "grailed"],
    platformUnique:
      "Depop is the social thrift app — part marketplace, part mood board — where sellers style their closets and shoppers hunt aesthetics as much as items.",
    platformBullets: [
      "social, visual shopping feed",
      "strong for Y2K, vintage, and trend-led looks",
      "buy directly from stylish individual sellers",
      "great for building a personal aesthetic",
      "community-driven discovery and inspiration",
    ],
    affirmation:
      "Finding trendy looks secondhand means you can experiment with your style without feeding fast fashion's waste cycle. Depop is where your aesthetic lives.",
  },
  ebay: {
    alias: "The Mango Digicam",
    site: "eBay",
    coreValue: "a good deal",
    url: "https://www.ebay.com/",
    archetype: "Bargain Hunter",
    emoji: "🥭",
    color: "#e67e22",
    tags: ["patient","collector","resourceful"],
    aesthetic: "vintage, collectibles, watches, leather bags, rare one-offs.",
    vibe: "uniquely you. you know what you want and you're ready to hunt for a steal.",
    quizSignal: "hunts for a specific rare thing, loves a competition, not afraid of a chase to find it.",
    heroImage: "assets/mango-digicam.png",
    logoImage: "assets/ebay-logo.png",
    blurb:
      "Patient hunter. You wait for the right piece at the right price — the chase is half the fun.",
    overview:
      "You're strategic and curious. You don't mind waiting, researching, or comparing options until the timing feels right — whether that's a jacket, a flight, or a life decision. The thrill isn't just owning something; it's knowing you found it well.",
    strengths:
      "Patient, informed, and hard to rush. You play the long game, stay calm under FOMO, and often end up with better outcomes because you didn't grab the first shiny thing.",
    weaknesses:
      "Overthinking is your trap. You can research past the point of usefulness, talk yourself out of good options, or enjoy the chase so much that finishing feels strangely anticlimactic.",
    friendship:
      "You're the friend with the tip, the link, the workaround. People come to you when they want the real scoop — and you love being useful without making it a whole performance.",
    compatible: ["grailed", "beni"],
    platformUnique:
      "eBay is the original online flea market: a global marketplace with international sellers and a huge range of things beyond clothing, including collectibles and just about anything else you can think of.",
    platformBullets: [
      "bargaining and haggling built in",
      "the best prices go to shoppers who know how to search for exactly what they're looking for",
      "international volume and scale",
      "plenty of seller reviews",
      "options for authenticating secondhand designer items",
    ],
    affirmation:
      "Every secondhand treasure you win is one less new item manufactured. eBay's endless marketplace rewards your patience and your bargain radar.",
  },
  beni: {
    alias: "The Yuzu Mirror",
    site: "Beni",
    coreValue: "precision",
    url: "https://www.beni.com/",
    archetype: "Trendsetter",
    emoji: "🪞",
    color: "#c9a227",
    tags: ["precise","decisive","focused"],
    aesthetic: "exact pieces, known silhouettes, quality over quantity every time.",
    vibe: "no wandering. you search with purpose and buy when it's right.",
    quizSignal: "knows the exact item, compares carefully, skips endless browsing.",
    heroImage: null,
    logoImage: null,
    blurb:
      "You know exactly what you want. No wandering — just the exact piece, at the best quality you can find.",
    overview:
      "You're decisive once you've decided. You don't browse for fun as much as you search with purpose — the exact item, the exact fit, the exact plan. Clarity is your comfort zone, and wasting time on maybes is your least favorite sport.",
    strengths:
      "Focused, efficient, and intentional. You cut through noise, avoid impulse buys, and usually end up with things you'll actually use. People trust your judgment because it's specific.",
    weaknesses:
      "Precision can become rigidity. If it isn't the exact thing, you might walk away empty-handed — or struggle when life asks you to improvise. Spontaneity isn't always your strong suit.",
    friendship:
      "You're the friend who plans ahead, communicates clearly, and doesn't leave people guessing. Your circle may be small, but it's high-trust — and you show up exactly when you say you will.",
    compatible: ["ebay", "realreal"],
    platformUnique:
      "Beni is a secondhand search engine — it scans listings across platforms so you can find the exact piece you want without hopping between tabs.",
    platformBullets: [
      "searches multiple thrift sites at once",
      "built for shoppers who know the exact item",
      "saves time vs. browsing endless feeds",
      "helps compare price and condition across sellers",
      "precision shopping instead of endless scrolling",
    ],
    affirmation:
      "Buying the exact thing you'll actually wear beats impulse buys that get worn once. Beni scans secondhand listings across the web to find your precise piece, pre-loved.",
  },
  fbmarketplace: {
    alias: "The Plum Thermos",
    site: "Facebook Marketplace",
    coreValue: "convenience",
    url: "https://www.facebook.com/marketplace/",
    archetype: "Bargain Hunter",
    emoji: "🫖",
    color: "#6b3a6d",
    tags: ["grounded","handy","local"],
    aesthetic: "practical finds, try-on-today pieces, neighborhood thrift staples.",
    vibe: "hands-on and unfussy. if you can take it home today, done.",
    quizSignal: "prefers local pickup, tries before buying, decides in the moment.",
    heroImage: null,
    logoImage: null,
    blurb:
      "Hands-on and practical. If you can try it on, haggle a little, and take it home today — done.",
    overview:
      "You're grounded in the real world. You like decisions you can touch — try it on, meet nearby, take it home today. Big online rabbit holes aren't your vibe; convenience, common sense, and \"does this work for my life right now?\" usually win.",
    strengths:
      "Resourceful, decisive in person, and refreshingly unfussy. You're good in the moment, great at negotiating practical tradeoffs, and rarely paralyzed by options.",
    weaknesses:
      "If something takes too much waiting or planning, you may skip it entirely — even when it'd be worth it. Impatience with process can mean missing slower, better finds.",
    friendship:
      "You're the neighborly friend: help with the move, share the tip, keep it real. No fluff, just care. People appreciate that you're present and useful without making friendship feel complicated.",
    compatible: ["thredup", "vinted"],
    platformUnique:
      "Facebook Marketplace is thrifting in your neighborhood — local pickups, same-day decisions, and deals you can see (and try) before you commit.",
    platformBullets: [
      "local pickup with no shipping wait",
      "try before you buy when meeting in person",
      "room to negotiate face-to-face",
      "keeps items circulating in your community",
      "great for furniture, clothes, and random useful finds",
    ],
    affirmation:
      "Buying local means no shipping footprint and keeping items in your own community. Facebook Marketplace is your neighborhood thrift pipeline.",
  },
  poshmark: {
    alias: "The Fig Purse",
    site: "Poshmark",
    coreValue: "community",
    url: "https://poshmark.com/",
    archetype: "Trendsetter",
    emoji: "👜",
    color: "#8b5a2b",
    tags: ["social","warm","connected"],
    aesthetic: "styled closets, polished apparel, accessories discovered through people.",
    vibe: "style is social. you shop through recommendations and shared taste.",
    quizSignal: "follows people's taste, loves community picks, builds looks with others.",
    heroImage: null,
    logoImage: null,
    blurb:
      "Style is social for you. You build your look through people whose taste you love — recommendations, shares, community.",
    overview:
      "You're relational by nature. Taste isn't something you invent alone — you discover it through people, conversations, and shared inspiration. Whether it's outfits, restaurants, or weekend plans, you like knowing what others love and building your world through connection.",
    strengths:
      "Warm, plugged-in, and generous with attention. You're great at spotting what people need, sharing recommendations, and turning style (or almost anything) into a social experience.",
    weaknesses:
      "You can lean on other people's opinions before trusting your own. Sometimes the desire to belong — or to be \"in the know\" — can pull you away from what you actually want.",
    friendship:
      "You're the connector friend — group chats, introductions, \"you two would love each other.\" Friendship is your favorite accessory, and you make communities feel bigger and warmer just by being in them.",
    compatible: ["depop", "vestiaire"],
    platformUnique:
      "Poshmark is social shopping for fashion — closets, shares, and a community that turns secondhand buying into something collaborative and shareable.",
    platformBullets: [
      "social sharing and closet following",
      "strong community of smaller fashion sellers",
      "offers and bundles that make deals social",
      "y2k apparel and accessories focus",
      "great for discovering style through people you trust",
    ],
    affirmation:
      "Shopping from real people's closets turns sustainability into a social, sharable habit. Poshmark's community is made for stylists like you.",
  },
};
/* ---- Questions ----
   Each option's `points` maps a result-key -> points awarded.
   Sustainability questions carry a pro-secondhand "did you know" note.
   ---------------------------------------------------------------- */

const QUESTIONS = [
  {
    id: "brand",
    theme: "sustainability",
    title: "How much do you consider Brand when shopping?",
    note: "Did you know? Chasing new-season brand drops drives overproduction. An estimated 85% of textiles end up in landfills or incinerated each year.",
    options: [
      {
        text: "Not at all — the look and feel is all that matters to me.",
        points: { vinted: 2 },
      },
      {
        text: "Not at all — design matters most. I value unique or vintage pieces.",
        points: { ebay: 2, grailed: 1 },
      },
      {
        text: "Quite a bit — the brand and status matter to me.",
        points: { vestiaire: 2 },
      },
      {
        text: "Quite a bit — there are brands I trust to meet a certain quality.",
        points: { realreal: 2 },
      },
    ],
  },
  {
    id: "buying",
    theme: "fun",
    title: "When I buy clothes, I tend to…",
    options: [
      {
        text: "Shop in bulk! I love hauls — and I return what's not right.",
        points: { thredup: 2, depop: 1 },
      },
      {
        text: "Wait for the right piece to find me, at the right bargain.",
        points: { ebay: 2, fbmarketplace: 1 },
      },
      {
        text: "Know what I want, then buy that exact piece at the best quality.",
        points: { beni: 2, ebay: 1 },
      },
      {
        text: "Search for my favorite brands — I know what works best for me.",
        points: { grailed: 2, vestiaire: 2 },
      },
    ],
  },
  {
    id: "trends",
    theme: "sustainability",
    title: "How do you feel about following fashion trends?",
    note: "Did you know? The average fast-fashion micro-trend can come and go in weeks, but a thrifted piece you love can last for years.",
    options: [
      {
        text: "I wouldn't follow an influencer just for style — I know my own.",
        points: { vinted: 2, beni: 1 },
      },
      {
        text: "I shop practically and don't really engage with trends.",
        points: { thredup: 2, fbmarketplace: 1 },
      },
      {
        text: "I follow trends when they match my taste, especially from creators I like.",
        points: { depop: 2, vestiaire: 1 },
      },
      {
        text: "I follow trends closely — down to the exact piece that's popular.",
        points: { grailed: 2 },
      },
    ],
  },
  {
    id: "morning",
    theme: "fun",
    title: "Which one looks most like you on an average morning?",
    options: [
      {
        text: "I default to the style that makes me feel like me — I curate my outfit.",
        points: { depop: 2, poshmark: 1 },
      },
      {
        text: "Up early, perfectly polished — not a hair out of place or a wrinkle in sight.",
        points: { vestiaire: 2, realreal: 2 },
      },
      {
        text: "I roll out of bed and leave in sweats.",
        points: { thredup: 2, vinted: 1 },
      },
      {
        text: "My accessories matter most — phone, headphones, a vintage watch.",
        points: { ebay: 1, fbmarketplace: 1 },
      },
    ],
  },
  {
    id: "price",
    theme: "sustainability",
    title: "When I'm buying clothes, I think of price as…",
    note: "Did you know? Buying one secondhand item instead of new can save roughly 1 kg of CO₂ and hundreds of litres of water.",
    options: [
      {
        text: "Number one. I want style, but no item is worth a month's rent.",
        points: { thredup: 2, vinted: 1 },
      },
      {
        text: "A fun chase — getting a great deal is part of the thrill.",
        points: { ebay: 2, fbmarketplace: 2 },
      },
      {
        text: "An indicator of quality — pricier means more authentic and rare.",
        points: { vestiaire: 2, realreal: 2 },
      },
      {
        text: "Less important than the item. If I love it, price doesn't stop me.",
        points: { grailed: 2, depop: 1 },
      },
    ],
  },
  {
    id: "curate",
    theme: "fun",
    title: "I curate my taste through…",
    options: [
      {
        text: "Pinterest — screenshots, boards, and building a mood before I buy.",
        points: { depop: 2, vestiaire: 2 },
      },
      {
        text: "In-person shopping — I like to feel and try things on.",
        points: { fbmarketplace: 2, vinted: 1 },
      },
      {
        text: "Influencers — I research their recommendations and tastes.",
        points: { poshmark: 2, realreal: 1 },
      },
      {
        text: "Brands — they symbolize quality, style, and reputation to me.",
        points: { grailed: 2, beni: 1 },
      },
    ],
  },
  {
    id: "boba",
    theme: "fun",
    title: "You're at the boba shop. You order…",
    options: [
      {
        text: "The same drink I always get — I stick to what I know.",
        points: { beni: 1, realreal: 1 },
      },
      {
        text: "Something new every time — I want to try the whole menu.",
        points: { vinted: 1, beni: 1 },
      },
      {
        text: "Whatever the staff or my friends recommend.",
        points: { poshmark: 2, depop: 2 },
      },
      {
        text: "Whatever's the best deal or biggest size for the price.",
        points: { thredup: 2, fbmarketplace: 1 },
      },
    ],
  },
  {
    id: "invite",
    theme: "fun",
    title: "A friend invites you to try something you've never done. You…",
    options: [
      {
        text: "Decide once I get a clear idea of what to expect.",
        points: { ebay: 2, beni: 2 },
      },
      {
        text: "Say yes instantly — I love new experiences.",
        points: { vinted: 2, depop: 1 },
      },
      {
        text: "Go if I know most of the people going.",
        points: { poshmark: 2, grailed: 1 },
      },
      {
        text: "Pass — I'm comfortable with my routines.",
        points: { thredup: 2, fbmarketplace: 1 },
      },
    ],
  },
  {
    id: "relationships",
    theme: "fun",
    title: "I navigate relationships in a way where I…",
    options: [
      {
        text: "Keep my network expansive — the more people, the better.",
        points: { vinted: 2, poshmark: 1 },
      },
      {
        text: "Pour into a few close bonds and keep them strong.",
        points: { ebay: 2, fbmarketplace: 2 },
      },
      {
        text: "Talk to anyone who talks to me first.",
        points: { fbmarketplace: 2, beni: 1 },
      },
      {
        text: "Connect with people who elevate my position.",
        points: { vestiaire: 2, realreal: 2 },
      },
    ],
  },
  {
    id: "friday",
    theme: "fun",
    title: "It's Friday night. Your go-to is…",
    options: [
      {
        text: "Staying in to unwind with a show.",
        points: { vinted: 2, thredup: 1 },
      },
      {
        text: "A bar or a party, to meet new people.",
        points: { poshmark: 2, depop: 1 },
      },
      {
        text: "Something artsy — a gallery, a small show, a night of making.",
        points: { grailed: 2, realreal: 1, fbmarketplace: 1 },
      },
      {
        text: "A sport — a little competition kicks off the weekend right.",
        points: { ebay: 2, beni: 1 },
      },
    ],
  },
  {
    id: "trust",
    theme: "fun",
    title: "What makes you trust a seller you've never met?",
    options: [
      {
        text: "I trust the platform's authentication system.",
        points: { vestiaire: 1, realreal: 1, grailed: 1 },
      },
      {
        text: "A history of good reviews and ratings is enough for me.",
        points: { ebay: 2, poshmark: 1 },
      },
      {
        text: "It doesn't matter much to me. Worst case, I contact the platform for a refund.",
        points: { thredup: 2, vinted: 1 },
      },
      {
        text: "I care about proof of activity on the platform, whether that's reviews from other buyers or messages between me and the seller.",
        points: { fbmarketplace: 2, beni: 1 },
      },
    ],
  },
  {
    id: "favorite-item",
    theme: "fun",
    title: "What describes your favorite closet item?",
    options: [
      {
        text: "A high quality piece from a renowned brand.",
        points: { vestiaire: 1, realreal: 2, grailed: 1 },
      },
      {
        text: "A rare vintage piece with a story, which nobody else owns.",
        points: { poshmark: 2, grailed: 1 },
      },
      {
        text: "This season's hottest piece, snagged before it sold out.",
        points: { depop: 2, beni: 2 },
      },
      {
        text: "Something I've worn for years and gotten attached to.",
        points: { ebay: 1 },
      },
    ],
  },
  {
    id: "decisions",
    theme: "fun",
    title: "When forced to choose between multiple options, I am someone who…",
    options: [
      {
        text: "Takes time to thoroughly research the options to see which one best suits my needs. The worst thing is to buy something useless to me.",
        points: { beni: 2, ebay: 1 },
      },
      {
        text: "Goes off vibes! If I feel like it, I'll just get it. Life is too short to hesitate. I'll make do with whatever I get.",
        points: { depop: 2, vinted: 1 },
      },
      {
        text: "Quickly skims the information on the options before making a choice.",
        points: { poshmark: 2, realreal: 1, beni: 1 },
      },
      {
        text: "Flips a coin. NEVER make me choose between anything.",
        points: { thredup: 2, fbmarketplace: 1, grailed: 1 },
      },
    ],
  },
  {
    id: "party",
    theme: "fun",
    title: "A friend invites you to a party where you barely know anyone. What are you most likely to do?",
    options: [
      {
        text: "I'm confident in this setting and who I am. I go around talking with others and leaving an impression.",
        points: { depop: 2 },
      },
      {
        text: "I'm comfortable in this setting, but I'd rather stick to my own pace than start conversations with strangers.",
        points: { realreal: 2 },
      },
      {
        text: "I stick with the people I know and talk with some of their mutuals.",
        points: { vinted: 2 },
      },
      {
        text: "I look for people who might share similar interests to mine to talk to.",
        points: { grailed: 2 },
      },
    ],
  },
  {
    id: "flight",
    theme: "fun",
    title: "A few days before a group trip you planned starts, your flight is cancelled. You…",
    options: [
      {
        text: "Immediately compare every rebooking option and pick the best.",
        points: { beni: 2 },
      },
      {
        text: "Check in with everyone and come up with a plan together.",
        points: { poshmark: 2 },
      },
      {
        text: "Wait it out. You know there's a possibility prices may drop if you stay patient.",
        points: { fbmarketplace: 2, ebay: 1 },
      },
      {
        text: "Just buy whatever flight is closest to the originally cancelled flight. Wasting precious energy trying to find better deals isn't worth the risk.",
        points: { vestiaire: 2 },
      },
    ],
  },
];


/* ---- Maximum Achievable Scores ----
   For each question, find the highest points each platform
   could receive from any one answer, then add those values.
   This normalizes scores across platforms.
   ---------------------------------------------------------------- */

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

    Object.entries(best).forEach(([k, v]) => {
      max[k] += v;
    });
  });

  return max;
})();


/* ---- Scoring ----
   1. Add points awarded by each selected answer.
   2. Divide each platform's raw score by its maximum achievable score.
   3. Rank by normalized score, highest first.
   4. Break ties using raw score.
   ---------------------------------------------------------------- */

function scoreQuiz(answers) {
  const raw = {};
  Object.keys(RESULTS).forEach((k) => (raw[k] = 0));

  answers.forEach((opt) => {
    if (!opt) return;

    Object.entries(opt.points).forEach(([k, v]) => {
      raw[k] += v;
    });
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


/* ---- Export ---- */

window.QUIZ = {
  RESULTS,
  QUESTIONS,
  MAX_POINTS,
  scoreQuiz,
};
