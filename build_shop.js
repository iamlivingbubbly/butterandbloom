const fs = require('fs');
const path = require('path');
const DIR = __dirname;

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const collections = [
  {
    id: 'soft-glow', name: 'Soft Glow', tag: 'Gentle · soft · natural',
    blurb: 'Oat-in-the-milk calm for tired skin: lavender Sundays, whipped shea butter, a honey-oat bar that cleanses without stripping.',
    keywords: ['gentle', 'soft', 'natural'], tones: ['#F1EAE0', '#EBDDDB', '#A9B894'],
    scents: 'Lavender · Chamomile · Oat & Honey', accent: '#C9A39B',
    frag: 'Lavender · Chamomile · Oat & Honey',
    palette: ['Purple', 'Beige', 'Soft Brown'],
    blend: [
      ['Top', '20–30%', 'Chamomile — a soft, herbal lift'],
      ['Middle', '40–50%', 'Lavender — the calming heart'],
      ['Base', '20–30%', 'Oat & honey — warm, milky depth'],
    ],
    feel: 'whipped, creamy, hug-adjacent',
    for: 'sensitive skin, wind-chapped cheeks, anyone who needs the world to feel softer',
    story: [
      'Soft Glow is the collection we’d press into the hands of anyone whose skin is tired. It’s oat-in-the-milk calm — gentle, warm, and quietly luxurious, built on natural ingredients and skin-first care that feels like a deep breath.',
      'Think lavender on a slow Sunday, whipped shea butter melting into warm skin, a honey-oat bar that cleanses without ever stripping. Nothing here shouts for attention — just buttery textures, gentle botanicals, and soft scents that soothe rather than announce.',
      'It’s for slow mornings with the coffee going cold, evenings that end before screen-time, and the quiet ritual of simply showing up for your skin.',
    ],
  },
  {
    id: 'sweet-playful', name: 'Sweet Playful', tag: 'Cute · cheerful · whimsical',
    blurb: 'A wink in the routine: baths that turn to sherbet, sugar scrubs, and sweet balm grins. Cute on purpose, without apology.',
    keywords: ['cute', 'cheerful', 'whimsical'], tones: ['#F7EED2', '#F2C9C3', '#CBE0CE'],
    scents: 'Citrus · Berry · Floral', accent: '#D9A441',
    frag: 'Citrus · Berry · Floral',
    palette: ['Pinks', 'Yellow/Orange', 'Red'],
    blend: [
      ['Top', '20–30%', 'Citrus — a bright, fizzy opener'],
      ['Middle', '40–50%', 'Berry — the juicy, candy heart'],
      ['Base', '20–30%', 'Soft vanilla & floral warmth — sweet staying power'],
    ],
    feel: 'fizzy, candy-coloured, irresistible',
    for: 'celebrations, gifting, Tuesday-night rescues',
    story: [
      'Sweet Playful is a wink in the routine — the collection that turns the everyday into a tiny celebration. Bright citrus, candy-adjacent scents, cheerful colour, and fizz that actually fizzes.',
      'Drop a hand-pressed bath bomb into warm water after a long Tuesday and watch the tub turn to sherbet. Scoop out a brown-sugar scrub like the treat it is. Blow into a peppermint lip balm and grin. This line is cute on purpose — without apology.',
      'It’s the bath-time joy for kids, and for grown-ups who kept their wonder: whimsical, bubbly, and shamelessly fun.',
    ],
  },
  {
    id: 'reset-minimal', name: 'Reset Minimal', tag: 'Clean · restrained · modern',
    blurb: 'The deep breath at the end of the day: eucalyptus steam, quiet palettes, formulas shorter than your to-do list.',
    keywords: ['clean', 'restrained', 'modern'], tones: ['#EDEDE8', '#D5D8D0', '#9AA7A0'],
    scents: 'Eucalyptus · Mint · Unscented', accent: '#7C916F',
    frag: 'Eucalyptus · Mint · Unscented',
    palette: ['Green', 'Black', 'Dark Brown'],
    blend: [
      ['Top', '20–30%', 'Mint — cool and instant'],
      ['Middle', '40–50%', 'Eucalyptus — the clearing heart'],
      ['Base', '20–30%', 'Quiet woody finish — depth that lingers'],
    ],
    feel: 'cool, airy, precisely tuned',
    for: 'congestion days, winding down, minimalists and reset-seekers',
    story: [
      'Reset Minimal is the deep breath at the end of a long day. Clean, restrained, and modern, it strips everything away until only the essentials remain — honest ingredients, precise scents, a calmer head.',
      'Eucalyptus steams and cool mint cut through the fog; shower steamers turn an ordinary shower into a breathing room, no bath required and no fuss involved. The palette is quiet and the formulas are shorter than your to-do list.',
      'It’s for people who want skincare that stays out of the way — no noise, no clutter, no twelve-step regimen. Just a clean ritual and a moment to reset.',
    ],
  },
];

const paletteHex = {
  Purple: '#8D7CC3', Beige: '#D8C9B8', 'Soft Brown': '#B39A82',
  Pinks: '#F2AEB6', 'Yellow/Orange': '#E8B64C', Red: '#C96F5F',
  Green: '#8AA98A', Black: '#3A3A3A', 'Dark Brown': '#5B4A3F',
};

const logoDataUri = (() => {
  try {
    const buf = fs.readFileSync(path.join(DIR, 'logo-web.jpg'));
    return 'data:image/jpeg;base64,' + buf.toString('base64');
  } catch (_) { return ''; }
})();

const configData = {
  collections: [
    {
      id: 'soft-glow', name: 'Soft Glow', tag: 'Gentle · soft · natural',
      frag: 'Lavender · Chamomile · Oat & Honey', dot: '#C9A39B', t1: '#F1EAE0', t2: '#A9B894',
      scents: [
        { name: 'Lavender', hint: 'The calming classic', notes: [['Top', '20–30%', 'Chamomile — soft herbal lift'], ['Middle', '40–50%', 'Lavender — the calming heart'], ['Base', '20–30%', 'Oat & honey — warm, milky depth']] },
        { name: 'Chamomile', hint: 'Gentle, tea-like calm', notes: [['Top', '20–30%', 'Chamomile blossom — floral lift'], ['Middle', '40–50%', 'Lavender & oat — the soothing body'], ['Base', '20–30%', 'Honey — sweet, warm depth']] },
        { name: 'Oat & Honey', hint: 'Milky, skin-first comfort', notes: [['Top', '20–30%', 'Oat milk — soft, creamy opening'], ['Middle', '40–50%', 'Honey & chamomile — the heart'], ['Base', '20–30%', 'Milk-sweet warmth']] },
      ],
    },
    {
      id: 'sweet-playful', name: 'Sweet Playful', tag: 'Cute · cheerful · whimsical',
      frag: 'Citrus · Berry · Floral', dot: '#D9A441', t1: '#F7EED2', t2: '#F2C9C3',
      scents: [
        { name: 'Citrus', hint: 'Bright, fizzy burst', notes: [['Top', '20–30%', 'Sweet orange & lemon — fizzy opener'], ['Middle', '40–50%', 'Juicy berry — the candy heart'], ['Base', '20–30%', 'Sherbet-soft vanilla']] },
        { name: 'Berry', hint: 'Juicy, candy-forward', notes: [['Top', '20–30%', 'Raspberry sparkle'], ['Middle', '40–50%', 'Strawberry & blueberry — the heart'], ['Base', '20–30%', 'Cotton-candy sweet depth']] },
        { name: 'Floral', hint: 'Playful, never stuffy', notes: [['Top', '20–30%', 'Light blossom — the hello'], ['Middle', '40–50%', 'Rose & peony — the playful body'], ['Base', '20–30%', 'Soft musk-sugar finish']] },
      ],
    },
    {
      id: 'reset-minimal', name: 'Reset Minimal', tag: 'Clean · restrained · modern',
      frag: 'Eucalyptus · Mint · Unscented', dot: '#7C916F', t1: '#EDEDE8', t2: '#9AA7A0',
      scents: [
        { name: 'Eucalyptus', hint: 'Clears the fog', notes: [['Top', '20–30%', 'Mint — cool and instant'], ['Middle', '40–50%', 'Eucalyptus — the clearing heart'], ['Base', '20–30%', 'Quiet cedar — depth that lingers']] },
        { name: 'Mint', hint: 'Cool, precise, clean', notes: [['Top', '20–30%', 'Peppermint — crisp opener'], ['Middle', '40–50%', 'Eucalyptus & green breath'], ['Base', '20–30%', 'Clean woody calm']] },
        { name: 'Unscented', hint: 'No fragrance, no fuss', unscented: true, notes: null },
      ],
    },
  ],
  products: ['Soap', 'Bath Bomb', 'Shower Steamer', 'Sugar Scrub', 'Lip Balm', 'Body Butter'],
  productHints: ['Bar of cold-process soap', 'Fizz, colour & soak', 'Steam — no bath required', 'Gentle exfoliation', 'Silky vegan moisture', 'Whipped deep care'],
  shapes: ['bar', 'bomb', 'steamer', 'jar', 'tube', 'jar'],
  sizes: [
    ['Travel', '1 oz'], ['Standard', '4 oz'], ['Luxury', '8 oz'],
  ],
};

const products = [
  { cat: 'butters', name: 'Whipped Body Butter', format: '450 g', price: 7.00, icon: 'jar', out: false,
    scents: 'Lavender Dream · Vanilla Bean · Citrus Sunrise', coll: 'Soft Glow',
    note: 'Whipped shea & coconut. Softens above 25°C — that’s normal, give it a stir.',
    desc: [
      'Whipped body butter is the closest thing we make to a hug. Shea butter and coconut oil are whipped until light as mousse, softened with sweet almond oil, and set with a whisper of arrowroot so it melts into skin instead of leaving you slick.',
      'Spread it on just-showered, warm skin and watch it disappear — soft, never greasy, with a gentle scent that stays close to the skin. Real moisturizing, not a surface-level lotion.',
      'Because it’s made with real butter, it softens above 25°C. That’s normal — give it a stir and it’s right back to whipped. Available in Lavender Dream, Vanilla Bean, and Citrus Sunrise.',
    ],
    ingredients: ['Shea butter', 'Coconut oil', 'Sweet almond oil', 'Arrowroot powder', 'Fragrance / essential oils'],
    use: 'Massage in after a shower while skin is still warm.',
    life: '12 months (refrigerate in hot weather).',
    faq: [
      ['Why does it soften above 25°C?', 'Real shea butter and coconut oil are naturally temperature-sensitive — that’s a sign there’s nothing fake in the jar. Give it a stir, or pop it in the fridge for ten minutes.'],
      ['Is it greasy?', 'Not the way you expect. We set it with a touch of arrowroot powder, which helps the butter melt in rather than sit on top of the skin.'],
      ['Is it gluten-free?', 'Yes — shea, coconut oil, sweet almond oil, arrowroot, and fragrance. Nothing in the formula contains gluten.'],
      ['How much should I use?', 'A little goes a long way. Start with a fingertip-sized scoop, massage into warm just-showered skin, and build from there.'],
    ] },
  { cat: 'balms', name: 'Lip Balm', format: '10 g', price: 2.00, icon: 'tube', out: false,
    scents: 'Peppermint · Honey · Vanilla Bean', coll: 'Sweet Playful',
    note: 'Fully vegan — candelilla wax, cocoa or mango butter.',
    desc: [
      'A fully vegan lip balm that actually feels like a balm — not a crayon, and not grease.',
      'We use candelilla wax, the plant kingdom’s answer to beeswax, whipped with cocoa or mango butter and sweet almond oil. It glides on softly, sinks in, and stays comfortable for hours.',
      'Choose Peppermint for a cool tingle, Honey for soft sweetness, or Vanilla Bean for comfort in a tube. Keep one by the door, one in the car, and one in the pocket that always goes missing.',
    ],
    ingredients: ['Sweet almond oil', 'Candelilla wax', 'Cocoa or mango butter', 'Flavour / essential oil'],
    use: 'Apply as often as you like — our vegan formula is gentle enough for daily protection.',
    life: '12 months.',
    faq: [
      ['Is it really vegan?', 'Yes. Instead of beeswax or lanolin, we use candelilla wax — a plant wax — with cocoa or mango butter in every tube.'],
      ['Does it contain tree nuts?', 'It contains sweet almond oil, a tree-nut derived oil. It’s always clearly labelled, so nut-sensitive households can decide with full information.'],
      ['Will it melt in my pocket?', 'Candelilla wax has a higher melt point than beeswax, so it holds its shape in warm pockets far better than most natural balms.'],
      ['How much should I use?', 'One light pass is plenty — it’s rich enough to last between applications without constant reapplying.'],
    ] },
  { cat: 'scrubs', name: 'Sugar Scrub', format: '450 g', price: 5.00, icon: 'jar', out: false,
    scents: 'Vanilla Bean · Brown Sugar Glow · Coffee', coll: 'Sweet Playful',
    note: 'Scoop with dry hands and keep water out of the jar.',
    desc: [
      'A sugar scrub is exfoliation with a silver lining: as the sugar polishes away the dull, the oil underneath is already moisturizing the fresh skin it reveals.',
      'Ours is a generous 450 gram jar of sugar suspended in light grapeseed oil (sweet almond when we’re feeling extra luxurious), kept fresh with vitamin E, and scented with warm vanilla, brown sugar, or rich coffee.',
      'The texture is gritty enough to really scrub, but never harsh — it rinses clean and leaves skin soft and lightly glowing.',
    ],
    ingredients: ['Sugar', 'Grapeseed or sweet almond oil', 'Vitamin E', 'Fragrance / essential oils'],
    use: 'Scoop a small amount with dry hands, massage onto damp skin, and rinse. Keep water out of the jar.',
    life: '12 months.',
    faq: [
      ['Is it too rough for my skin?', 'Gritty enough to do the job — never harsh. If your skin feels tight afterwards, ease up on pressure and amount; your skin will tell you what it likes.'],
      ['Can I use it on my face?', 'We formulate it for the body. Facial skin is thinner, and a body scrub’s oil base can be too rich — stick to the neck down.'],
      ['How do I stop it from spoiling?', 'Keep water out of the jar above all else — scoop with completely dry hands. Sealed and dry, it keeps for about a year.'],
      ['Which scent should I try first?', 'Vanilla Bean is our most-loved. Coffee is the morning pick, and Brown Sugar Glow is the gentle sweet spot between the two.'],
    ] },
  { cat: 'soaps', name: 'Soap', format: '70 g', price: 5.00, icon: 'bar', out: false,
    scents: 'Lavender Oat · Tea Tree Charcoal · Honey Oat · Rose Clay · Eucalyptus Mint', coll: 'Soft Glow',
    note: 'Slow-cured at least six weeks for a hard, gentle bar.',
    desc: [
      'Soap is where Butter & Bloom started, and it’s still our heart. Each 70 gram bar is a slow, traditional cold-process recipe — generous olive oil for a gentle cleanse, coconut for a rich, cloud-like lather, skin-softening shea butter, and a touch of castor oil for that creamy, pillowy finish. No shortcuts, no melt-and-pour.',
      'Every batch is weighed by hand, mixed at carefully controlled temperatures, and left to cure for at least six weeks. That long, patient cure makes a bar that is hard enough to last, gentle enough for sensitive skin, and rich in the skin-loving glycerin that modern factory soaps boil right off.',
      'And it’s traceable: every ingredient is named on the label, and every bar carries a batch code and a date — so you can always ask what went into yours, and when.',
    ],
    ingredients: ['Olive oil', 'Coconut oil', 'RSPO-certified sustainable palm oil', 'Shea butter', 'Castor oil', 'Water', 'Sodium hydroxide* (fully consumed during saponification)', 'Essential oils & botanicals'],
    use: 'Lather on damp skin and rinse. Keep the bar dry between uses.',
    life: '1–2 years, kept dry.',
    faq: [
      ['Is your soap vegan?', 'Yes — every bar is made from plant oils and plant butters. The only process ingredient, sodium hydroxide, is fully consumed during saponification and is never present in the finished bar.'],
      ['Is it really cold-process?', 'Yes. Each batch is mixed at a controlled temperature and left to cure at least six weeks — that slow cure gives the bar a long-lasting body and plenty of naturally occurring glycerin, which glycerin-boiling factory soaps lose.'],
      ['My skin is sensitive. Is this for me?', 'Our formula leans gently on olive oil and shea butter, both of which sensitive skin tends to love. As with any new skincare, do a small patch test first.'],
      ['How should I store it?', 'Between washes, keep the bar somewhere it can drain and dry. A dry bar genuinely lasts months longer.'],
      ['How long does one bar last?', 'With basic care, a single 70 g bar typically lasts four to six weeks of daily body use.'],
    ] },
  { cat: 'steamers', name: 'Shower Steamer', format: '340 g', price: 8.00, icon: 'steamer', out: true,
    scents: 'Eucalyptus Mint · Lavender · Citrus Burst', coll: 'Reset Minimal',
    note: 'Aromatherapy for breathing rooms, not baths.',
    desc: [
      'A shower steamer is aromatherapy without the bath — set one on the floor, let the warm water spark it, and breathe.',
      'Each 340 gram pack comes with three tablets pressed from baking soda, citric acid, and a binding kiss of kaolin clay, scented generously with pure essential oils.',
      'This is our congestion-season hero: eucalyptus and mint steam that opens up sinuses and turns a rushed shower into a genuine reset. Equally lovely on grey winter mornings, when a hot shower is the best idea of the day.',
    ],
    ingredients: ['Baking soda', 'Citric acid', 'Kaolin clay', 'Essential oils', 'Witch hazel'],
    use: 'Set on the shower floor, away from the direct water stream. Breathe slowly.',
    life: '6 months, kept dry and sealed.',
    faq: [
      ['Do I need a bathtub?', 'No — that’s the whole point. A shower steamer is aromatherapy for people without a tub: place it on the floor and let the warm water do the rest.'],
      ['How long does one tablet last?', 'Each tablet fizzes on and off for the length of a normal shower — one tablet per shower is usually plenty.'],
      ['Is it safe for kids?', 'Yes, with adult supervision, with the tablet placed out of a child’s reach. Essential-oil products should never be eaten, so keep them up and away from little hands.'],
      ['What are they good for?', 'Congestion, stuffy winter sinuses, or simply turning a rushed morning shower into a mindful two minutes. Eucalyptus Mint is the classic pick.'],
    ] },
  { cat: 'bombs', name: 'Bath Bomb', format: '70 g', price: 5.00, icon: 'bomb', out: true,
    scents: 'Rose Garden · Lavender Dream · Citrus Sunrise', coll: 'Sweet Playful',
    note: 'Hand-pressed in small batches. Use caution getting out — the tub gets slippery.',
    desc: [
      'Our bath bombs are made the old-fashioned way: pressed by hand into every sphere, not blown from a machine. A good bomb is chemistry and patience — baking soda meeting citric acid in warm water for a long, bubbly, sherbet fizz.',
      'We use skin-kind sweet almond oil and a touch of polysorbate 80 to disperse the buttery oils through your bath water. Each 70 gram bomb is single-use, saturated in scent, and honestly a little like dropping candy into your tub.',
      'Rose Garden is the romantic soak, Lavender Dream the wind-down, and Citrus Sunrise the cheerful morning start — restocked in small batches as fast as we can press them.',
    ],
    ingredients: ['Baking soda', 'Citric acid', 'Cornstarch', 'Sweet almond oil', 'Polysorbate 80', 'Fragrance / essential oils', 'Witch hazel'],
    use: 'Drop one into warm bath water. Use caution getting out — the tub gets slippery as it fizzies.',
    life: '6 months, sealed away from moisture.',
    faq: [
      ['Is it vegan?', 'Yes — all of our bath bombs are made without any animal products, and the oils we use are plant-based.'],
      ['Why does the tub get slippery?', 'The skin-kind sweet almond oil dispersing through the water is the culprit. Take your time getting out, and when in doubt, rinse the tub.'],
      ['How long do they keep?', 'About six months when kept sealed away from moisture. A humid bathroom is a fizz’s worst enemy.'],
      ['Do they stain the tub or skin?', 'We use cosmetic-grade, skin-safe colorants in soft, translucent amounts — they rinse away clean and leave nothing behind.'],
    ] },
];

const categories = [
  { id: 'all', label: 'Everything' }, { id: 'soaps', label: 'Soap' }, { id: 'bombs', label: 'Bath Bombs' },
  { id: 'steamers', label: 'Shower Steamers' }, { id: 'scrubs', label: 'Sugar Scrubs' },
  { id: 'balms', label: 'Lip Balms' }, { id: 'butters', label: 'Body Butters' },
];

const ingredients = [
  ['Olive & Coconut Oils', 'Carrier oils', 'The base of every bar — gentle cleansing and a creamy lather.'],
  ['Shea Butter', 'Butter', 'Deep conditioning softness. The heart of the body butter and the skin-loving edge of the soap.'],
  ['Candelilla Wax', 'Wax', 'A plant wax from the candelilla shrub — our vegan answer to beeswax in lip balm.'],
  ['Cocoa & Mango Butters', 'Butter', 'Rich, protective. Mango keeps the balm fully plant-based.'],
  ['Sweet Almond & Jojoba Oils', 'Carrier oils', 'Light, fast-absorbing. Almond is a tree nut — labelled clearly on everything it touches.'],
  ['Grapeseed Oil', 'Carrier oil', 'Non-greasy, feather-light — the scrub base with vitamin E to keep it fresh.'],
  ['Essential Oils', 'Scent', 'Naturally-derived aromatherapy. Citrus oils are photo-sensitive, so we batch them into evening products.'],
  ['Fragrance Oils', 'Scent', 'Cosmetic-grade, IFRA-compliant. Used where a scent can’t be made from plants alone — always skin-safe.'],
  ['Baking Soda & Citric Acid', 'Fizz', 'The chemistry of a good bath bomb — two pantry staples meeting in warm water.'],
  ['Kaolin Clay & Arrowroot', 'Texture', 'Kaolin binds steamers; arrowroot sets body butter so it stays whipped.'],
  ['Vitamin E', 'Keep-fresh', 'A natural antioxidant that protects our nut and seed oils from going rancid.'],
  ['Sodium Hydroxide', 'Saponification', 'Present only in the soapmaking process — it becomes soap. Nothing of it remains in the finished bar.'],
];

const usage = [
  ['Cold-Process Soap', 'Lather on damp skin and rinse. Keep the bar dry between uses to maintain its gentle texture.'],
  ['Hot-Process Soap', 'Ready for immediate use. Use as a gentle cleanser and rinse thoroughly to remove all residue.'],
  ['Bath Bomb', 'Drop one into warm bath water. Use caution getting out — the tub gets slippery as it fizzies.'],
  ['Shower Steamer', 'Set on the shower floor, away from the direct water stream. Breathe slowly to enjoy the steam.'],
  ['Sugar Scrub', 'Massage a small scoop onto damp skin and rinse. Scoop with dry hands and keep water out of the jar.'],
  ['Lip Balm', 'Apply as often as you like. Our vegan formulas are gentle and perfect for daily protection.'],
  ['Whipped Body Butter', 'Massage in after a shower while skin is still warm. It softens above 25°C — that’s normal, give it a stir.'],
];

const shelfLife = [
  ['Cold- / Hot-Process Soap', '1–2 years', 'Store dry, rotate stock'],
  ['Bath Bomb', '6 months', 'Keep away from moisture'],
  ['Shower Steamer', '6 months', 'Keep away from moisture'],
  ['Sugar Scrub', '12 months', 'Keep water out of the jar'],
  ['Lip Balm', '12 months', 'Room temperature'],
  ['Whipped Body Butter', '12 months', 'Refrigerate in hot weather'],
];

const allergens = [
  ['Tree nuts', 'Sweet almond oil appears in bath bombs, scrubs, lip balm and body butter. Always labelled.'],
  ['Essential oils', 'Labels list the specific oils used in each product.'],
  ['Gluten', 'Our oatmeal topping and honey are food-grade; we do not make certified gluten-free claims.'],
  ['Palm oil', 'We only use RSPO-certified sustainable palm, and keep amounts minimal.'],
];

// ---------------------------------------------------------------------------
// SVG product illustrations (restrained line + tone)
// ---------------------------------------------------------------------------

function productSVG(icon, tone) {
  const stroke = '#2E2C27';
  const common = 'fill="none" stroke="' + stroke + '" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
  let body = '';
  if (icon === 'bar') {
    body = `<rect x="26" y="34" width="76" height="52" rx="10" ${common} /><path d="M26 46h76M50 34v16M78 34v16" ${common} stroke-width="1.3" opacity=".5"/>`;
  } else if (icon === 'bomb') {
    body = `<circle cx="64" cy="62" r="30" ${common} /><path d="M48 40c-2-8 4-12 8-10m20 10c2-8-4-12-8-10M54 30c6-8 14-8 20 0" ${common} stroke-width="1.2" />`;
  } else if (icon === 'steamer') {
    body = `<ellipse cx="64" cy="64" rx="38" ry="24" ${common} /><path d="M48 50c0-10 32-10 32 0M56 44c2-14 20-14 16 2" ${common} stroke-width="1.3" />`;
  } else if (icon === 'jar') {
    body = `<rect x="34" y="44" width="60" height="42" rx="8" ${common} /><path d="M38 44V34m-5 0V30M38 30c3-4 8-6 12-6M28 34c0-6 6-8 12-8m-4-2c4-4 10-6 14-3" ${common} stroke-width="1.3" />`;
  } else if (icon === 'tube') {
    body = `<rect x="40" y="28" width="48" height="64" rx="8" ${common} /><rect x="40" y="28" width="48" height="14" ${common} stroke-width="1.4" /><circle cx="64" cy="70" r="1.6" fill="${stroke}"/><circle cx="64" cy="78" r="1.6" fill="${stroke}" opacity=".6"/>`;
  }
  return `<svg class="prod-svg" viewBox="0 0 128 128" aria-hidden="true" style="--tone:${tone}">${body}</svg>`;
}

// ---------------------------------------------------------------------------
// Render helpers
// ---------------------------------------------------------------------------

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const leaf = `<svg class="leaf" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3C9 4 4 9 4 16c0 7 5 13 12 13 8 0 12-6 12-13C28 10 22 3 16 3z" fill="currentColor" opacity=".9"/><path d="M16 3c0 6 4 10 11 12M16 29c0-7-3-11-8-14" stroke="#FBF9F4" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".85"/></svg>`;

function collectionCard(c) {
  return `
  <a class="collection-card" href="#collections" data-scroll="collections">
    <div class="cc-tile" style="background:linear-gradient(135deg,${c.tones[0]},${c.tones[1]})">
      ${productSVG(c.id === 'sweet-playful' ? 'bomb' : c.id === 'reset-minimal' ? 'steamer' : 'jar', c.accent)}
    </div>
    <div class="cc-name">${c.name}</div>
    <div class="cc-tag">${esc(c.tag)}</div>
    <div class="cc-blurb">${c.blurb}</div>
    <div class="cc-scent">${esc(c.scents)}</div>
  </a>`;
}

function productCard(p) {
  return `
  <div class="product-card" data-cat="${p.cat}">
    ${p.out ? '<span class="pc-soldout">Out of stock</span>' : ''}
    <div class="pc-tile" style="background:linear-gradient(135deg,var(--paper),var(--cream))">
      ${productSVG(p.icon, '#B9805F')}
      <span class="pc-cat">${esc(p.cat.replace(/s$/, ''))}</span>
    </div>
    <div class="pc-body">
      <div class="pc-name">${p.name}</div>
      <div class="pc-format"><span class="pc-price">$${p.price.toFixed(2)}</span> / ${esc(p.format)}</div>
      <div class="pc-tax">Excluding GST/HST</div>
      <div class="pc-note">${esc(p.note)}</div>
      <details class="pc-more">
        <summary>Details, scents &amp; ingredients</summary>
        <div class="pc-desc">${p.desc.map(d => `<p>${esc(d)}</p>`).join('')}</div>
        <div class="pc-scent"><b>Scent world</b> <span>${esc(p.scents)}</span></div>
        <div class="pc-ing"><b>What’s inside</b><ul>${p.ingredients.map(i => `<li>${esc(i)}</li>`).join('')}</ul></div>
        <div class="pc-use"><b>How to use</b> <span>${esc(p.use)}</span></div>
        <div class="pc-life"><b>Shelf life</b> <span>${esc(p.life)}</span></div>
        <div class="pc-faq"><b>Common questions</b>
          ${p.faq.map(f => `<div class="qa"><div class="q">${esc(f[0])}</div><div class="a">${esc(f[1])}</div></div>`).join('')}
        </div>
      </details>
      <div class="pc-foot"><span class="pc-coll">${esc(p.coll)}</span></div>
    </div>
  </div>`;
}

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

function home() {
  return `
  <section class="hero">
    <div class="hero-inner">
      <h1 class="hero-line" aria-live="polite">Made slowly.<br>Made thoughtfully.</h1>
      <p class="hero-sub">Handmade vegan skincare, proudly made in Ontario, Canada. From a passion project to a dream come true, we make simple, useful, and thoughtful products with care that you can feel.</p>
      <div class="hero-cta">
        <a class="btn btn-pine" href="#shop" data-nav="shop">Shop the collection</a>
      </div>
    </div>
  </section>
  <div class="marquee" aria-hidden="true"><div class="marquee-track">
    <span>Slow cured <i>•</i> Hand pressed <i>•</i> Small batched <i>•</i></span>
    <span>Slow cured <i>•</i> Hand pressed <i>•</i> Small batched <i>•</i></span>
  </div></div>

  <section class="block" id="lines">
    <div class="block-head">
      <p class="eyebrow">Three ways to feel</p>
      <h2>The collections</h2>
    </div>
    <div class="coll-grid">${collections.map(collectionCard).join('')}</div>
  </section>

  <section class="block sand" id="featured">
    <div class="block-head">
      <p class="eyebrow">Favourites</p>
      <h2>Favorites</h2>
    </div>
    <div class="feature-grid">
      <div class="feature">
        <div class="f-tile" style="background:linear-gradient(150deg,#efe7dc,#ead9d6)">${productSVG('bar', '#C9A39B')}</div>
        <div class="f-meta"><span>Soap</span><b>Lavender Oat</b></div>
      </div>
      <div class="feature">
        <div class="f-tile" style="background:linear-gradient(150deg,#f8f0da,#f4d9a6)">${productSVG('jar', '#D9A441')}</div>
        <div class="f-meta"><span>Sugar Scrub</span><b>Vanilla Bean</b></div>
      </div>
      <div class="feature">
        <div class="f-tile" style="background:linear-gradient(150deg,#f3efe4,#e7e0cf)">${productSVG('tube', '#B9805F')}</div>
        <div class="f-meta"><span>Lip Balm</span><b>Vanilla Bean</b></div>
      </div>
      <div class="feature">
        <div class="f-tile" style="background:linear-gradient(150deg,#efe7dc,#e3d5c4)">${productSVG('jar', '#B9805F')}</div>
        <div class="f-meta"><span>Whipped Body Butter</span><b>Lavender Dream</b></div>
      </div>
    </div>
    <div style="text-align:center;margin-top:1.6rem">
      <a class="btn btn-ghost" href="#shop" data-nav="shop">Shop all</a>
    </div>
  </section>

  <section class="block quote">
    <div class="leaf-big">${leaf}</div>
    <blockquote>Simple. Thoughtful. Slowly made.</blockquote>
    <p class="quote-src">— the Butter &amp; Bloom kitchen</p>
  </section>`;
}

function shop() {
  return `
  <section class="block" id="shop">
    <div class="block-head">
      <p class="eyebrow">The range</p>
      <h2>Shop</h2>
      <p class="sub">Everything batched by hand, labelled with its code and date. Prices in CAD.</p>
    </div>
    <div class="cat-filters" id="catFilters">
      ${categories.map((c, i) => `<button class="cat-chip ${i === 0 ? 'active' : ''}" data-cat="${c.id}">${c.label}</button>`).join('')}
    </div>
    <div class="shop-grid" id="shopGrid">${products.map(productCard).join('')}</div>
  </section>
  ${configurator()}`;
}

function designerStage(shape, accent, t1, t2) {
  const outline = '#2E2C27';
  const grad = '<defs><linearGradient id="cfgGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + t1 + '"/><stop offset="1" stop-color="' + t2 + '"/></linearGradient></defs>';
  let body = '';
  if (shape === 'bar') {
    body = '<rect x="24" y="42" width="80" height="46" rx="9" fill="url(#cfgGrad)" stroke="' + outline + '" stroke-width="1.5"/><path d="M24 55h80" stroke="' + outline + '" stroke-width="1" opacity=".3"/><path d="M38 42c10 16 0 22 8 34" stroke="' + accent + '" stroke-width="3.5" stroke-linecap="round" fill="none" opacity=".75"/><path d="M52 42c-6 12 4 20-4 32" stroke="' + t1 + '" stroke-width="2.6" stroke-linecap="round" fill="none" opacity=".9"/>';
  } else if (shape === 'bomb') {
    body = '<circle cx="64" cy="60" r="30" fill="url(#cfgGrad)" stroke="' + outline + '" stroke-width="1.5"/><path d="M48 40c-2-8 6-11 9-9m14 9c2-8-6-11-9-9M55 29c6-7 12-7 18 0" stroke="' + outline + '" stroke-width="1.2" fill="none"/><path d="M50 72l28-22M48 80l30-24" stroke="' + accent + '" stroke-width="3" opacity=".55" stroke-linecap="round"/>';
  } else if (shape === 'steamer') {
    body = '<ellipse cx="64" cy="62" rx="36" ry="24" fill="url(#cfgGrad)" stroke="' + outline + '" stroke-width="1.5"/><path d="M48 52c0-8 32-8 32 0M56 46c2-11 18-11 16 1" stroke="' + outline + '" stroke-width="1.2" fill="none"/><path d="M38 72c6 10 46 10 52 0" stroke="' + accent + '" stroke-width="2.5" opacity=".5" fill="none"/>';
  } else if (shape === 'jar') {
    body = '<rect x="34" y="50" width="60" height="42" rx="8" fill="url(#cfgGrad)" stroke="' + outline + '" stroke-width="1.5"/><rect x="38" y="40" width="52" height="10" rx="4" fill="' + t1 + '" stroke="' + outline + '" stroke-width="1.3"/><path d="M50 68c2-10 26-10 28 0M52 76c2-7 22-7 24 0" stroke="' + accent + '" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".7"/>';
  } else if (shape === 'tube') {
    body = '<rect x="42" y="34" width="44" height="58" rx="8" fill="url(#cfgGrad)" stroke="' + outline + '" stroke-width="1.5"/><rect x="42" y="34" width="44" height="12" rx="6" fill="' + t1 + '" stroke="' + outline + '" stroke-width="1.3"/><circle cx="64" cy="70" r="2" fill="' + accent + '"/><path d="M36 40h-8M12 40h4" stroke="' + outline + '" stroke-width="3" stroke-linecap="round" opacity=".35"/>';
  }
  return '<svg viewBox="0 0 128 128" class="cfg-stage-svg" aria-hidden="true">' + grad + body +
    '<circle cx="18" cy="22" r="3" fill="' + accent + '" opacity=".35"/><circle cx="108" cy="24" r="4" fill="' + t1 + '"/><circle cx="22" cy="106" r="4" fill="' + t2 + '" opacity=".6"/></svg>';
}

function configurator() {
  const step = (n, title, hint, inner) => `
    <div class="cfg-step">
      <div class="cfg-step-head"><span class="cfg-num">${n}</span><div><div class="cfg-title">${title}</div><div class="cfg-hint">${hint}</div></div></div>
      <div class="cfg-opts">${inner}</div>
    </div>`;

  const collBtns = configData.collections.map(c => `<button type="button" class="cfg-opt cfg-coll" data-group="coll" data-value="${c.name}" data-tag="${c.tag}" data-dot="${c.dot}" data-t1="${c.t1}" data-t2="${c.t2}"><i style="background:${c.dot}"></i><b>${c.name}</b><span>${c.frag}</span></button>`).join('');
  const prodBtns = configData.products.map((p, i) => `<button type="button" class="cfg-opt cfg-prod" data-group="prod" data-shape="${configData.shapes[i]}" data-value="${p}"><b>${p}</b><span>${configData.productHints[i]}</span></button>`).join('');
  const scentBtns = configData.collections.map(c => c.scents.map(s => `
    <button type="button" class="cfg-opt cfg-scent" data-group="scent" data-coll="${c.name}" data-value="${s.name}">
      <b>${s.name}</b><span>${s.hint}</span>
      ${s.notes ? `<span class="cfg-pyr">${s.notes.map(n => `<span class="pyr-tier"><i>${n[0]}</i><b>${n[1]}</b>${n[2]}</span>`).join('')}</span>` : '<span class="cfg-pyr unscented">No fragrance — the stage is empty on purpose.</span>'}
    </button>`).join('')).join('');
  const sizeBtns = configData.sizes.map(s => `<button type="button" class="cfg-opt cfg-size" data-group="size" data-value="${s[0]} (${s[1]})"><b>${s[0]}</b><span>${s[1]}</span></button>`).join('');

  return `
  <section class="block sand" id="build">
    <div class="block-head">
      <p class="eyebrow">Custom order</p>
      <h2>Design your own</h2>
      <p class="sub">Four steps to your own bar — collection, product, scent, finish. The preview beside you updates as you go.</p>
    </div>

    <div class="cfg-layout">
      <div class="cfg-steps">
        ${step('01', 'Collection &amp; fragrance', 'Three moods, three scent homes', collBtns)}
        ${step('02', 'Product', 'Whatever your ritual needs', prodBtns)}

        ${step('03', 'Scent', 'Collection-specific — tap one to read its pyramid', scentBtns)}
        <div class="cfg-legend">
          <b>Note guide</b>
          <span><i class="lg-top"></i>Top <b>20–30%</b> — bright, immediate, fastest fading</span>
          <span><i class="lg-mid"></i>Middle <b>40–50%</b> — main body &amp; heart, lingers longest</span>
          <span><i class="lg-base"></i>Base <b>20–30%</b> — depth &amp; longevity, stays on the skin</span>
        </div>

        ${step('04', 'Finish', 'Name it, pick a size',
          `<div class="cfg-name-row"><input class="cfg-name" id="cfgName" maxlength="40" placeholder="Name your creation…" value="My Butter &amp; Bloom"><div class="cfg-opts cfg-sizes">${sizeBtns}</div></div>`)}
      </div>

      <div class="cfg-preview">
        <div class="cfg-preview-head">Live preview</div>
        <div class="cfg-pv-stage" id="cfgStage"></div>
        <div class="cfg-card">
          <div class="cfg-card-brand">Butter &amp; Bloom</div>
          <div class="cfg-card-name" id="cfgCardName">My Butter &amp; Bloom</div>
          <div class="cfg-card-line" id="cfgCardLine">Soft Glow · Soap · Lavender</div>
          <div class="cfg-card-meta" id="cfgCardMeta">Standard (4 oz)</div>
          <div class="cfg-card-foot">Handmade in Ontario · batch-dated</div>
        </div>
      </div>
    </div>

    <div class="cfg-bar">
      <div class="cfg-summary"><span>Your order</span><b id="cfgSummary">Soft Glow · Soap · Lavender · My Butter &amp; Bloom · Standard (4 oz)</b></div>
      <button type="button" class="btn btn-pine" id="cfgRequest">Request this order</button>
    </div>
    <p class="cfg-note">Configurations are handmade to order — lead time and price confirmed by email. Travel 1 oz · Standard 4 oz · Luxury 8 oz.</p>
  </section>`;
}

function collectionsPage() {
  const blendRule = [
    ['Top', '20–30%', 'Bright, immediate — the first impression, fastest to fade.'],
    ['Middle', '40–50%', 'The main body and heart of the scent — it lingers longest.'],
    ['Base', '20–30%', 'Depth and longevity — the warm finish that stays on the skin.'],
  ];
  return `
  <section class="block" id="collections">
    <div class="block-head">
      <p class="eyebrow">Find your mood</p>
      <h2>The collections</h2>
    </div>

    <div class="blend-rule">
      <div class="blend-rule-head">
        <div class="blend-rule-title">How we blend a scent</div>
        <p>Every Butter &amp; Bloom fragrance follows the same honest architecture, built in three acts, so the scent unfolds instead of shouting. Unscented options leave the stage empty on purpose.</p>
      </div>
      <div class="blend-rule-body">
        ${blendRule.map(b => `
        <div class="blend-note">
          <div class="bn-name">${b[0]} notes</div>
          <div class="bn-pct">${b[1]}</div>
          <p>${b[2]}</p>
        </div>`).join('')}
      </div>
    </div>

    ${collections.map(c => `
    <div class="collection-panel" id="${c.id}">
      <div class="cp-tile" style="background:linear-gradient(135deg,${c.tones[0]},${c.tones[2]})">
        ${productSVG(c.id === 'sweet-playful' ? 'bomb' : c.id === 'reset-minimal' ? 'steamer' : 'jar', c.accent)}
      </div>
      <div class="cp-body">
        <div class="cp-name">${c.name}</div>
        <div class="cc-tag">${esc(c.tag)}</div>
        <p class="cp-blurb">${c.blurb}</p>
        ${c.story.map(p => `<p class="about-p">${p}</p>`).join('')}
        <div class="cp-keywords">${c.keywords.map(k => `<span class="kw">${k}</span>`).join('')}</div>
        <div class="cp-feel"><b>Signature feel</b> — ${esc(c.feel)}</div>
        <div class="cp-scents"><b>Fragrance profile</b> — ${esc(c.frag)}</div>
        <div class="cp-blend">
          ${c.blend.map(n => `
          <div class="cp-blend-row">
            <span class="cbr-note">${n[0]}</span>
            <span class="cbr-pct">${n[1]}</span>
            <span class="cbr-in">${n[2]}</span>
          </div>`).join('')}
        </div>
        <div class="cp-for"><b>Made for</b> — ${esc(c.for)}</div>
        <div class="cp-palette">${c.palette.map(p => `<span class="pal-chip"><i style="background:${paletteHex[p] || '#ccc'}"></i>${p}</span>`).join('')}</div>
        <div class="cp-swatches">${c.tones.map(t => `<span class="swatch" style="background:${t}"></span>`).join('')}</div>
      </div>
    </div>`).join('')}
  </section>`;
}

function about() {
  const principles = [
    ['Small batches', 'We batch in counts we can watch over — never a production line we can’t look in the eye.'],
    ['Ingredients we can name', 'Every ingredient is plant-based or trustworthy enough to print in full on the label.'],
    ['Safety before speed', 'Lye is measured twice. pH is checked. Every batch gets a QC pass before it’s sold.'],
    ['Minimal, honest packaging', 'Kraft, glass, and compostable labels where we can manage it.'],
  ];
  return `
  <section class="block" id="about">
    <div class="about-grid">
      <div>
        <p class="eyebrow">About</p>
        <h2>Our story</h2>
        <h3 class="about-h3">Proudly made in Ontario, Canada</h3>
        <p class="about-p">Butter &amp; Bloom is proudly based in the gorgeous lands of Ontario, Canada. Every bar, bomb, scrub, and butter we make is handcrafted in small batches from our home studio — surrounded by maples in spring, lake light in summer, and the quiet of a winter that insists a hot shower is the best idea of the day. Ontario’s seasons are part of the recipe: they remind us to make things slowly, and to make them well.</p>
        <h3 class="about-h3">From passion project to dream come true</h3>
        <p class="about-p">Butter &amp; Bloom blossomed from a passion project. It began with a curious maker, a bag of olive oil, a kitchen scale, and one very stubborn pot of lye slurry — the way most great handmade-soap stories do. We learned soapmaking the slow way: six-week cures, plenty of failed batches, and finally the first golden bar that actually lathered. That little bar was a revelation, and we’ve been chasing that feeling ever since.</p>
        <h3 class="about-h3">Care that you can feel</h3>
        <p class="about-p">Today we pour every ounce of our hearts into creating stunning, high-performance skincare treasures. Nothing is stamped out by a machine. Oils are weighed by hand, shea butter is whipped until it’s light enough to float, candelilla wax is melted slowly so our vegan lip balms set perfectly silky, and essential oils are measured drop by drop. When you hold a Butter &amp; Bloom product, you’re holding a small piece of a very good day.</p>
        <h3 class="about-h3">Clean, simple, fiercely dedicated</h3>
        <p class="about-p">As we grow, we remain fiercely dedicated to what started it all: clean, simple formulas and traceable vegan ingredients that celebrate our handmade quality. Our recipes are deliberately short — every ingredient has one job and earns its place. And traceable is only a promise if you can check it: every batch carries a code and a date, so you can write to us and we’ll tell you exactly what went into your jar on the day it was made.</p>
        <h3 class="about-h3">Handmade, with the fingerprints to prove it</h3>
        <p class="about-p">Because everything is made by hand, in small batches, no two runs are perfectly identical — a softer curve here, a different marble of rose clay there. We call that the quiet signature of handmade, and we wouldn’t smooth it out if we could. That’s the Butter &amp; Bloom promise: slow-made, traceable, vegan skincare, made with love and labelled with the truth.</p>
      </div>
      <div class="about-tile" style="background:linear-gradient(150deg,#efe7dc,#e3d5c4)">${productSVG('jar', '#7C916F')}</div>
    </div>

    <div class="principles">
      ${principles.map(p => `
      <div class="principle">
        <div class="principle-num">${p[0].charAt(0)}</div>
        <div class="principle-name">${p[0]}</div>
        <p>${p[1]}</p>
      </div>`).join('')}
    </div>

    <div class="statement">
      <div class="leaf-big">${leaf}</div>
      <div>
        <p class="eyebrow">What we stand for</p>
        <h2>Good ingredients, honest labels,<br>and time on our side.</h2>
        <p class="about-p">We’d rather sell a little, slowly, to people who come back — than make a lot, fast, for people who don’t.</p>
      </div>
    </div>
  </section>`;
}

function guide() {
  return `
  <section class="block" id="guide">
    <div class="block-head">
      <p class="eyebrow">Know your jar</p>
      <h2>Ingredient &amp; care guide</h2>
    </div>

    <h3 class="g-h3">Ingredients we use</h3>
    <div class="ing-grid">${ingredients.map(i => `
      <div class="ing-card">
        <div class="ing-name">${i[0]}</div>
        <div class="ing-role">${i[1]}</div>
        <p>${i[2]}</p>
      </div>`).join('')}</div>

    <h3 class="g-h3" style="margin-top:2.4rem">How to use</h3>
    ${table(['Product', 'How to use'], usage)}

    <h3 class="g-h3">Storage &amp; safety</h3>
    <div class="stor-grid">
      <div class="stor"><div class="stor-title">Shelf life</div>
        <p>Our products are crafted with care and time. To preserve their botanical integrity, we recommend storing cold-process soaps and body butters in a cool, dry place. Bath bombs and shower steamers should be kept away from moisture to maintain their fizz and scent.</p></div>
      <div class="stor"><div class="stor-title">Allergens</div>
        <p>We prioritize transparency. Our products contain sweet almond oil, which is a tree nut allergen. All ingredients are listed on the label. We use only certified sustainable palm oil and ensure all products are free from gluten and other common sensitivities.</p></div>
    </div>

    <h3 class="g-h3">Shelf life at a glance</h3>
    ${table(['Product', 'Shelf life', 'Keep'], shelfLife)}

    <h3 class="g-h3">Allergens &amp; sensitivities in detail</h3>
    ${table(['Concern', 'How we handle it'], allergens)}

    <div class="guide-note">
      <div class="leaf-big">${leaf}</div>
      <p>Spotting a concern? Every label lists the full ingredient list in descending order, and every batch is dated — write to us with the code, and we’ll tell you exactly what went into it and when.</p>
    </div>
  </section>`;
}

function table(header, rows) {
  return `<div class="tbl"><table><thead><tr>${header.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>
  ${rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}
  </tbody></table></div>`;
}

function contact() {
  return `
  <section class="block" id="contact">
    <div class="block-head">
      <p class="eyebrow">Say hello</p>
      <h2>Contact</h2>
    </div>
    <div class="contact-grid">
      <form class="contact-form" onsubmit="event.preventDefault();document.getElementById('sent').hidden=false;this.reset()">
        <label>Name<input name="name" required placeholder="Your name"></label>
        <label>Email<input name="email" type="email" required placeholder="you@example.com"></label>
        <label>Message<textarea name="message" rows="5" required placeholder="Ask about a custom order, a batch code, or just say hi…"></textarea></label>
        <button class="btn btn-pine" type="submit">Send</button>
        <p id="sent" class="sent" hidden>Thanks — this demo doesn’t send anywhere yet. Wire it up to your mail service and you’re live. 🌿</p>
      </form>
      <div class="contact-aside">
        <div class="ca-block"><div class="ca-label">Email</div><a href="mailto:hello@butterbloom.ca">hello@butterbloom.ca</a></div>
        <div class="ca-block"><div class="ca-label">Follow our journey</div>
          <div class="socials">
            <a href="#">Instagram</a><a href="#">Pinterest</a><a href="#">TikTok</a>
          </div>
        </div>
        <div class="ca-block"><div class="ca-label">Custom orders</div>
          <p>Markets, weddings, and small corporate gifting — tell us the occasion and we’ll work something out in the right collection.</p>
        </div>
      </div>
    </div>
  </section>`;
}

function privacy() {
  return `
  <section class="block" id="privacy">
    <div class="block-head">
      <p class="eyebrow">Legal</p>
      <h2>Privacy Policy</h2>
      <p class="about-p" style="margin-top:.6rem">Last updated: September 15, 2026.</p>
    </div>
    <p class="about-p">Butter &amp; Bloom ("we", "us") respects your privacy. This policy explains what information we collect through this site, our contact and custom-order form, our mailing list, and our online store, and how we use, protect, and share it. It applies to butterbloom.com and to purchases made through our Wix-hosted store.</p>

    <h3 class="g-h3">1. What we collect and why</h3>
    <p class="about-p"><strong>Contact and custom-order form.</strong> The contact form collects your name, your email address, and your message. Messages may include custom-order details you share with us (collection, product, size, scent, occasion). We use this information only to reply to you and to prepare custom orders. Form messages are delivered to our support inbox (hello@butterbloom.ca) by email; we keep the conversation only for as long as needed to serve you.</p>
    <p class="about-p"><strong>Orders and checkout.</strong> We take orders through our Wix store. To fulfil an order we receive your name, email, shipping address, and the products you ordered. Payments are processed by Wix and its payment providers — we never see or store your card number. Order details are kept on file to make your products, arrange shipment, and meet our record-keeping and product-safety obligations.</p>
    <p class="about-p"><strong>Shipping.</strong> To deliver your order we share your name and shipping address with the courier (such as Canada Post) you select at checkout.</p>
    <p class="about-p"><strong>Mailing list.</strong> If we ever offer a newsletter or mailing list, we will only add you with your express consent, in line with Canada's Anti-Spam Legislation (CASL). You can unsubscribe with one click, in every email, at any time.</p>
    <p class="about-p"><strong>Analytics.</strong> We use website analytics (such as Google Analytics and Meta pixels) to understand how people use our site and what they enjoy. These tools collect technical information such as your device type, browser, IP address, and pages visited. This helps us improve the site and — where enabled — measure advertising. You can see our cookie options in section 2.</p>
    <p class="about-p"><strong>Cookies and similar technologies.</strong> This site uses Google Fonts, a third-party service that may log requests from your browser and set cookies when loading fonts. Our store platform (Wix) sets cookies to keep a shopping experience working, remember your preferences, and support analytics. See section 2 for the full picture.</p>

    <h3 class="g-h3">2. Cookies</h3>
    <p class="about-p">Cookies are small files stored on your device. We treat them as follows:</p>
    <p class="about-p">• <strong>Essential cookies</strong> keep the site and store working (for example, keeping your cart together). These cannot be turned off.<br>
    • <strong>Analytics cookies</strong> tell us how the site is used, in aggregate. You can opt out of Google Analytics and Meta tracking using their opt-out tools or your browser settings.<br>
    • <strong>Marketing cookies</strong> may help us show you relevant offers across the web when you have agreed to receive them. You can manage these through your browser and through the advertising settings offered by Google and Meta.<br>
    • <strong>Third-party cookies</strong> may be set by services we use (fonts, analytics, social platforms). We do not control cookies set by those providers.</p>
    <p class="about-p">Most browsers let you block or delete cookies in their settings, and you can "Do Not Track" where supported. Blocking cookies may limit some site features.</p>

    <h3 class="g-h3">3. How we share information</h3>
    <p class="about-p">We never sell or rent your information. We share it only with the limited service providers needed to run the business — payment processors, shipping carriers, our email service, and analytics tools — and only what each needs to do their job. These providers are bound to keep your data confidential. We may also disclose information where the law requires it (for example, to regulators or in response to lawful requests).</p>

    <h3 class="g-h3">4. Children</h3>
    <p class="about-p">Our products and website are intended for people aged 13 and older. We do not knowingly collect personal information from children under 13. If you believe a child has shared personal information with us, contact us and we will delete it.</p>

    <h3 class="g-h3">5. Retention</h3>
    <p class="about-p">We keep order and correspondence records only as long as needed to serve you and to meet legal, tax, and product-safety obligations in Canada. Analytics data is kept in aggregate form. When information is no longer needed, we delete or anonymise it.</p>

    <h3 class="g-h3">6. Security</h3>
    <p class="about-p">This site is served over HTTPS, we limit who can access personal information, and we treat your data with care. No method of transmission over the internet is 100% secure, so we cannot guarantee absolute security — but we use reasonable safeguards.</p>

    <h3 class="g-h3">7. Your rights</h3>
    <p class="about-p">Under Canada's Personal Information Protection and Electronic Documents Act (PIPEDA) you have the right to access the personal information we hold about you, to ask us to correct it, and to withdraw your consent to our use of it. To make a request, email privacy@butterbloom.ca with the subject line "Privacy request". We will verify your identity and respond within 30 days. If you are not satisfied, you may complain to the Office of the Privacy Commissioner of Canada.</p>

    <h3 class="g-h3">8. International transfers</h3>
    <p class="about-p">Some of the services we rely on (such as email, analytics, and payment processing) may store or process information outside Canada. We use providers with appropriate safeguards and only for the purposes in this policy.</p>

    <h3 class="g-h3">9. Third-party websites</h3>
    <p class="about-p">This site links to services such as Instagram, Pinterest, TikTok, and our Wix store. Those sites have their own privacy policies and their use of your data is governed by them, not by this policy.</p>

    <h3 class="g-h3">10. Changes</h3>
    <p class="about-p">We may update this policy from time to time. The date at the top of this page always shows the latest revision, and significant changes will be flagged on the site.</p>

    <h3 class="g-h3">Contact us</h3>
    <p class="about-p">Questions, requests, or removals: <a href="mailto:privacy@butterbloom.ca">privacy@butterbloom.ca</a>. General enquiries: <a href="mailto:hello@butterbloom.ca">hello@butterbloom.ca</a>.</p>
    <p class="about-p">Butter &amp; Bloom · Cornwall, Ontario, Canada</p>
  </section>`;
}

// ---------------------------------------------------------------------------
// Assemble
// ---------------------------------------------------------------------------

const nav = [
  ['home', '#home', 'Home'],
  ['shop', '#shop', 'Shop'],
  ['about', '#about', 'About'],
  ['guide', '#guide', 'Care Guide'],
  ['contact', '#contact', 'Contact'],
];

const NAV = nav.map(n => `<a class="nav-item" href="${n[1]}" data-nav="${n[0]}">${n[2]}</a>`).join('');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet">
<title>Butter &amp; Bloom — Made slowly. Made thoughtfully. | Handmade vegan bath &amp; body care, Ontario</title>
<meta name="description" content="Butter &amp; Bloom is a small-batch, vegan handcrafted bath and body care brand based in Ontario, Canada. Slow-cured cold-process soap, bath bombs, shower steamers, sugar scrubs, lip balm, and whipped body butter — made slowly, made thoughtfully. Every batch traceable, every ingredient named.">
<style>
  :root {
    --paper:#FBF9F4; --panel:#FFFFFF; --cream:#F4EFE6; --sand:#F4EFE6;
    --ink:#2E2C27; --ink-soft:#6E6A60; --line:#E7E1D4;
    --pine:#3F5A3E; --pine-deep:#2E4230; --sage:#7C916F; --moss:#A9B894;
    --clay:#B9805F; --blush:#C9A39B; --gold:#D9A441;
    --shadow:0 1px 2px rgba(40,38,30,.05),0 8px 28px rgba(40,38,30,.06);
  }
  * { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { font-family:'Segoe UI', system-ui, -apple-system, sans-serif; background:var(--paper); color:var(--ink); line-height:1.65; }
  h1,h2,h3,.serif { font-family:Georgia, 'Iowan Old Style', 'Times New Roman', serif; font-weight:500; }
  a { color:inherit; }
  img, svg { display:block; }

  .nav {
    position:sticky; top:0; z-index:60; display:flex; align-items:center; gap:2rem;
    padding:.85rem 3rem; background:rgba(251,249,244,.86); backdrop-filter:blur(10px);
    border-bottom:1px solid var(--line);
  }
  .nav-brand { display:flex; align-items:center; gap:.55rem; text-decoration:none; }
  .nav-brand .leaf { width:26px; height:26px; color:var(--pine); }
  .nav-brand .word { font-family:Georgia,serif; font-size:1.5rem; letter-spacing:.02em; color:var(--pine-deep); }
  .nav-brand .brand-mark { height:96px; width:auto; border-radius:10px; display:block; box-shadow:0 2px 8px rgba(40,38,30,.12); }
  .nav-links { margin-left:auto; display:flex; gap:.25rem; flex-wrap:wrap; }
  .nav-item { padding:.45rem .9rem; border-radius:999px; font-size:.86rem; color:var(--ink-soft); text-decoration:none; transition:all .15s; }
  .nav-item:hover { color:var(--pine); background:var(--cream); }
  .nav-item.active { color:var(--pine-deep); background:var(--cream); font-weight:500; }

  .page { display:none; padding-top:3.2rem; }
  .page.visible { display:block; animation:fade .3s ease; }
  @keyframes fade { from{opacity:0; transform:translateY(4px);} to{opacity:1; transform:none;} }

  .block { max-width:1080px; margin:0 auto; padding:0 2rem 2.6rem; }
  .block-head { margin-bottom:1.8rem; }
  .block-head h2 { font-size:2.05rem; color:var(--pine-deep); }
  .eyebrow { font-size:.74rem; letter-spacing:.16em; text-transform:uppercase; color:var(--sage); margin-bottom:.55rem; }
  .sub { color:var(--ink-soft); margin-top:.4rem; font-size:.92rem; }

  /* hero */
  .hero { min-height:78vh; display:flex; align-items:center; position:relative; overflow:hidden;
    background:radial-gradient(1200px 600px at 85% -10%, #eee7d8 0%, transparent 55%), var(--paper); }
  .hero-inner { max-width:1080px; margin:0 auto; padding:0 2rem; width:100%; }
  .hero h1 { font-size:clamp(2.6rem,7vw,4.6rem); line-height:1.08; color:var(--pine-deep); margin:1rem 0 1.4rem; }
  .hero-sub { max-width:540px; color:var(--ink-soft); font-size:1.02rem; margin-bottom:1.8rem; }
  .hero-line { transition:opacity .28s ease, transform .28s ease; min-height:1.2em; }
  .hero-line.switching { opacity:0; transform:translateY(8px); }
  .hero-cta { display:flex; gap:.8rem; flex-wrap:wrap; }
  .hero-sig { margin-top:2rem; font-size:.82rem; color:var(--sage); letter-spacing:.02em; }

  .btn { display:inline-block; padding:.72rem 1.6rem; border-radius:999px; font-size:.9rem; font-weight:500; text-decoration:none; cursor:pointer; border:1px solid transparent; transition:all .18s; }
  .btn-pine { background:var(--pine); color:#FBF9F4; }
  .btn-pine:hover { background:var(--pine-deep); transform:translateY(-1px); }
  .btn-ghost { border-color:var(--pine); color:var(--pine); background:transparent; }
  .btn-ghost:hover { background:var(--cream); }

  /* marquee */
  .marquee { overflow:hidden; border-top:1px solid var(--line); border-bottom:1px solid var(--line); background:var(--cream); padding:.7rem 0; }
  .marquee-track { display:flex; white-space:nowrap; animation:marq 24s linear infinite; }
  .marquee-track span { font-size:.74rem; letter-spacing:.24em; text-transform:uppercase; color:var(--sage); padding-right:4rem; }
  .marquee-track i { font-style:normal; color:var(--clay); }
  @keyframes marq { from{transform:translateX(0);} to{transform:translateX(-50%);} }

  /* sol& out badges + tax note */
  .pc-soldout { position:absolute; top:.7rem; right:.7rem; z-index:2; font-size:.68rem; letter-spacing:.08em; text-transform:uppercase; background:var(--ink); color:var(--paper); padding:.25rem .65rem; border-radius:999px; }
  .product-card { position:relative; }
  .pc-tax { font-size:.72rem; color:var(--sage); margin-bottom:.5rem; }
  .pc-price { color:var(--clay); font-weight:600; }

  /* storage & safety */
  .stor-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:1rem; margin-bottom:1.4rem; }
  .stor { background:var(--panel); border:1px solid var(--line); border-radius:14px; padding:1.2rem 1.3rem; box-shadow:var(--shadow); }
  .stor-title { font-family:Georgia,serif; font-size:1.05rem; color:var(--pine-deep); margin-bottom:.5rem; }
  .stor p { font-size:.84rem; color:var(--ink-soft); }

  /* collections on home */
  .coll-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:1.4rem; }
  .collection-card { display:block; background:var(--panel); border:1px solid var(--line); border-radius:18px; padding:1.4rem; text-decoration:none; box-shadow:var(--shadow); transition:transform .2s,box-shadow .2s; }
  .collection-card:hover { transform:translateY(-4px); box-shadow:0 14px 38px rgba(40,38,30,.1); }
  .cc-tile { height:150px; border-radius:12px; display:grid; place-items:center; margin-bottom:1rem; }
  .cc-name { font-family:Georgia,serif; font-size:1.25rem; color:var(--pine-deep); }
  .cc-tag { font-size:.8rem; color:var(--clay); letter-spacing:.03em; margin:.1rem 0 .5rem; }
  .cc-blurb { font-size:.86rem; color:var(--ink-soft); }
  .cc-scent { font-size:.76rem; color:var(--sage); margin-top:.7rem; }

  .prod-svg { width:92px; height:92px; }

  /* featured */
  .sand { background:var(--sand); border-radius:0; margin-top:1rem; padding-top:3.4rem; padding-bottom:3.4rem; }
  .feature-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(190px,1fr)); gap:1.2rem; }
  .feature { background:var(--panel); border:1px solid var(--line); border-radius:16px; padding:.9rem; box-shadow:var(--shadow); }
  .f-tile { height:150px; border-radius:11px; display:grid; place-items:center; }
  .f-meta { padding:.7rem .2rem .2rem; }
  .f-meta span { font-size:.72rem; text-transform:uppercase; letter-spacing:.1em; color:var(--sage); display:block; }
  .f-meta b { font-family:Georgia,serif; font-weight:500; font-size:1.02rem; color:var(--pine-deep); }

  .block.quote { text-align:center; padding:3.6rem 2rem; }
  .block.quote blockquote { font-family:Georgia,serif; font-size:1.6rem; color:var(--pine-deep); max-width:640px; margin:1.1rem auto .8rem; line-height:1.4; }
  .quote-src { font-size:.82rem; color:var(--ink-soft); }
  .leaf-big .leaf { width:40px; height:40px; color:var(--moss); margin:0 auto; }

  /* shop */
  .cat-filters { display:flex; gap:.5rem; flex-wrap:wrap; margin-bottom:1.8rem; }
  .cat-chip { padding:.42rem 1.05rem; border-radius:999px; border:1px solid var(--line); background:var(--panel); color:var(--ink-soft); font-size:.84rem; cursor:pointer; transition:all .15s; font-family:inherit; }
  .cat-chip:hover { border-color:var(--sage); color:var(--pine); }
  .cat-chip.active { background:var(--pine); border-color:var(--pine); color:#FBF9F4; }
  .shop-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); gap:1.3rem; }
  .shop-grid .product-card { transition:opacity .2s; }
  .product-card { background:var(--panel); border:1px solid var(--line); border-radius:16px; overflow:hidden; box-shadow:var(--shadow); }
  .pc-tile { position:relative; height:170px; display:grid; place-items:center; }
  .pc-cat { position:absolute; top:.7rem; left:.7rem; font-size:.68rem; text-transform:uppercase; letter-spacing:.1em; color:var(--ink-soft); background:rgba(255,255,255,.7); padding:.2rem .6rem; border-radius:999px; }
  .pc-body { padding:1.05rem 1.15rem 1.15rem; }
  .pc-name { font-family:Georgia,serif; font-size:1.12rem; color:var(--pine-deep); }
  .pc-format { font-size:.78rem; color:var(--ink-soft); margin:.1rem 0 .55rem; }
  .pc-price { color:var(--clay); font-weight:600; }
  .pc-scents { font-size:.82rem; line-height:1.55; }
  .pc-note { font-size:.76rem; color:var(--ink-soft); margin-top:.5rem; line-height:1.5; }
  .pc-more { margin-top:.7rem; border-top:1px dotted var(--line); padding-top:.6rem; }
  .pc-more summary { cursor:pointer; font-size:.76rem; color:var(--pine); list-style:none; user-select:none; font-weight:500; letter-spacing:.02em; display:inline-block; }
  .pc-more summary::-webkit-details-marker { display:none; }
  .pc-more summary::after { content:'+'; color:var(--clay); margin-left:.4rem; }
  .pc-more[open] summary::after { content:'–'; }
  .pc-desc p { font-size:.8rem; color:var(--ink-soft); margin-top:.55rem; line-height:1.65; }
  .pc-scent, .pc-use, .pc-life { font-size:.8rem; color:var(--ink-soft); margin-top:.6rem; line-height:1.55; }
  .pc-scent b, .pc-use b, .pc-life b { color:var(--pine-deep); font-weight:600; }
  .pc-ing { font-size:.8rem; color:var(--ink-soft); margin-top:.6rem; }
  .pc-ing b { color:var(--pine-deep); font-weight:600; }
  .pc-ing ul { margin:.3rem 0 0 1.1rem; }
  .pc-ing li { font-size:.76rem; margin-top:.15rem; }
  .pc-faq { margin-top:.7rem; border-top:1px dotted var(--line); padding-top:.6rem; }
  .pc-faq b { color:var(--pine-deep); font-size:.8rem; }
  .qa { margin-top:.55rem; }
  .q { font-size:.78rem; font-weight:600; color:var(--ink); }
  .a { font-size:.76rem; color:var(--ink-soft); margin-top:.15rem; line-height:1.55; }
  .pc-foot { margin-top:.7rem; padding-top:.6rem; border-top:1px dotted var(--line); }
  .pc-coll { font-size:.72rem; color:var(--sage); letter-spacing:.05em; }

  /* configurator */
  .cfg-layout { display:grid; grid-template-columns:1fr 320px; gap:1.6rem; align-items:start; }
  .cfg-steps { min-width:0; }
  .cfg-step { margin-bottom:1.4rem; }
  .cfg-step-head { display:flex; gap:.8rem; align-items:center; margin-bottom:.7rem; }
  .cfg-num { width:30px; height:30px; border-radius:50%; background:var(--pine); color:#FBF9F4; font-family:Georgia,serif; display:grid; place-items:center; font-size:.85rem; flex:none; }
  .cfg-title { font-family:Georgia,serif; font-size:1.06rem; color:var(--pine-deep); }
  .cfg-hint { font-size:.76rem; color:var(--ink-soft); }
  .cfg-opts { display:flex; flex-wrap:wrap; gap:.6rem; }
  .cfg-opt { display:flex; flex-direction:column; gap:.25rem; background:var(--panel); border:1px solid var(--line); border-radius:12px; padding:.6rem .95rem; cursor:pointer; text-align:left; box-shadow:var(--shadow); transition:border-color .15s, transform .15s; min-width:150px; }
  .cfg-opt i { width:12px; height:12px; border-radius:50%; display:inline-block; margin-bottom:.1rem; }
  .cfg-opt:hover { transform:translateY(-1px); }
  .cfg-opt.active { border-color:var(--pine); outline:2px solid rgba(95,116,90,.25); }
  .cfg-opt b { display:block; font-size:.88rem; color:var(--pine-deep); }
  .cfg-opt span { display:block; font-size:.76rem; color:var(--ink-soft); }
  .cfg-scent { flex:1 1 230px; max-width:340px; }
  .cfg-pyr { display:flex; flex-direction:column; gap:.15rem; border-top:1px dotted var(--line); margin-top:.45rem; padding-top:.45rem; }
  .pyr-tier { font-size:.71rem; color:var(--ink-soft); line-height:1.35; }
  .pyr-tier i { width:auto; height:auto; border-radius:3px; display:inline-block; font-style:normal; font-weight:700; font-size:.66rem; text-transform:uppercase; letter-spacing:.05em; padding:.05rem .3rem; margin:0 .35rem 0 0; background:var(--cream); color:var(--sage); }
  .pyr-tier b { display:inline; font-size:.71rem; color:var(--clay); margin-right:.35rem; }
  .cfg-pyr.unscented { color:var(--sage); font-style:italic; }
  .cfg-legend { display:flex; flex-direction:column; gap:.35rem; background:var(--cream); border-radius:12px; padding:.85rem 1rem; margin-bottom:1.4rem; font-size:.76rem; color:var(--ink-soft); }
  .cfg-legend > b { color:var(--pine-deep); font-family:Georgia,serif; font-size:.9rem; margin-bottom:.15rem; }
  .cfg-legend span { display:flex; align-items:center; gap:.5rem; }
  .cfg-legend i { width:10px; height:10px; border-radius:50%; display:inline-block; }
  .lg-top { background:#C9A39B; } .lg-mid { background:#8D7CC3; } .lg-base { background:#5B4A3F; }
  .cfg-name-row { display:flex; gap:1rem; align-items:center; flex-wrap:wrap; width:100%; }
  .cfg-name { font-family:Georgia,serif; font-size:1rem; color:var(--pine-deep); border:1px solid var(--line); border-radius:12px; padding:.7rem .95rem; background:var(--panel); box-shadow:var(--shadow); flex:1 1 220px; min-width:200px; }
  .cfg-name:focus { outline:2px solid rgba(95,116,90,.3); }
  .cfg-preview { position:sticky; top:1rem; display:flex; flex-direction:column; gap:.9rem; }
  .cfg-preview-head { font-family:'DM Serif Display',Georgia,serif; font-size:1.06rem; color:var(--pine-deep); }
  .cfg-pv-stage { background:linear-gradient(160deg,#faf7f0,#efe7dc); border:1px solid var(--line); border-radius:18px; padding:1.4rem 1.4rem 1rem; text-align:center; box-shadow:var(--shadow); }
  .cfg-stage-svg { height:auto; max-width:100%; }
  .cfg-stage-name { margin-top:.6rem; font-size:.76rem; text-transform:uppercase; letter-spacing:.1em; color:var(--ink-soft); }
  .cfg-card { background:#FBF9F4; border:1px solid var(--line); border-radius:14px; padding:1rem 1.1rem 1.2rem; box-shadow:var(--shadow); }
  .cfg-card-brand { font-size:.66rem; text-transform:uppercase; letter-spacing:.16em; color:var(--clay); }
  .cfg-card-name { font-family:'DM Serif Display',Georgia,serif; font-size:1.5rem; line-height:1.1; color:var(--pine-deep); margin:.15rem 0 .3rem; }
  .cfg-card-line { font-size:.8rem; color:var(--ink-soft); }
  .cfg-card-meta { display:inline-block; font-size:.72rem; color:var(--sage); background:var(--cream); border-radius:999px; padding:.18rem .65rem; margin-top:.5rem; }
  .cfg-card-foot { margin-top:.7rem; padding-top:.6rem; border-top:1px dotted var(--line); font-size:.68rem; color:var(--ink-soft); letter-spacing:.03em; }
  .cfg-bar { display:flex; gap:1rem; align-items:center; justify-content:space-between; flex-wrap:wrap; background:var(--panel); border:1px solid var(--line); border-radius:16px; padding:1rem 1.2rem; box-shadow:var(--shadow); margin-top:1.6rem; }
  .cfg-summary { font-size:.84rem; color:var(--ink-soft); }
  .cfg-summary span { display:block; font-size:.7rem; text-transform:uppercase; letter-spacing:.09em; color:var(--clay); margin-bottom:.25rem; }
  .cfg-summary b { color:var(--pine-deep); font-weight:600; }
  .cfg-note { margin-top:.8rem; font-size:.76rem; color:var(--ink-soft); }

  /* collections page */
  .collection-panel { display:grid; grid-template-columns:280px 1fr; gap:1.6rem; background:var(--panel); border:1px solid var(--line); border-radius:20px; padding:1.6rem; box-shadow:var(--shadow); margin-bottom:1.5rem; align-items:center; }
  .cp-tile { height:230px; border-radius:14px; display:grid; place-items:center; }
  .cp-name { font-family:Georgia,serif; font-size:1.7rem; color:var(--pine-deep); }
  .cp-blurb { font-size:.94rem; color:var(--ink-soft); margin:.7rem 0 .9rem; max-width:560px; }
  .cp-keywords { display:flex; gap:.45rem; margin-bottom:.9rem; }
  .kw { font-size:.72rem; text-transform:lowercase; letter-spacing:.04em; background:var(--cream); border-radius:999px; padding:.22rem .8rem; color:var(--ink-soft); }
  .cp-scents { font-size:.84rem; color:var(--pine); margin-top:.5rem; }
  .cp-feel, .cp-for { font-size:.84rem; color:var(--ink-soft); margin-top:.5rem; }
  .cp-body b { color:var(--pine-deep); font-weight:600; }
  .cp-swatches { display:flex; gap:.5rem; margin-top:1rem; }
  .swatch { width:26px; height:26px; border-radius:50%; border:1px solid rgba(0,0,0,.06); }
  .blend-rule { display:grid; grid-template-columns:240px 1fr; gap:1.6rem; background:var(--sand); border-radius:20px; padding:1.8rem 2rem; margin-bottom:1.6rem; align-items:center; }
  .blend-rule-title { font-family:Georgia,serif; font-size:1.25rem; color:var(--pine-deep); margin-bottom:.5rem; }
  .blend-rule-head p { font-size:.84rem; color:var(--ink-soft); }
  .blend-rule-body { display:grid; grid-template-columns:1fr 1fr 1fr; gap:1rem; }
  .blend-note { background:var(--panel); border:1px solid var(--line); border-radius:14px; padding:1rem 1.15rem; box-shadow:var(--shadow); }
  .bn-name { font-family:Georgia,serif; color:var(--pine-deep); font-weight:600; }
  .bn-pct { font-size:.8rem; color:var(--clay); font-weight:600; margin:.15rem 0 .5rem; }
  .blend-note p { font-size:.8rem; color:var(--ink-soft); }
  .cp-blend { margin-top:.6rem; border-top:1px dotted var(--line); padding-top:.55rem; }
  .cp-blend-row { display:flex; gap:.6rem; align-items:baseline; font-size:.82rem; padding:.12rem 0; color:var(--ink-soft); }
  .cbr-note { width:62px; font-weight:600; color:var(--pine-deep); }
  .cbr-pct { width:52px; color:var(--clay); font-weight:600; }
  .cp-palette { display:flex; gap:.45rem; flex-wrap:wrap; margin-top:.7rem; }
  .pal-chip { display:inline-flex; align-items:center; gap:.4rem; font-size:.74rem; color:var(--ink-soft); background:var(--cream); border-radius:999px; padding:.22rem .75rem .22rem .5rem; }
  .pal-chip i { width:10px; height:10px; border-radius:50%; display:inline-block; }

  /* about */
  .about-grid { display:grid; grid-template-columns:1.3fr 1fr; gap:2.2rem; align-items:center; margin-bottom:2.4rem; }
  .about-p { color:var(--ink-soft); font-size:.94rem; margin-top:.7rem; max-width:60ch; }
  .about-h3 { font-family:Georgia,serif; font-size:1.12rem; color:var(--pine-deep); margin:1.6rem 0 .35rem; }
  .about-tile { height:300px; border-radius:18px; display:grid; place-items:center; }
  .principles { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:1.2rem; margin-bottom:2.6rem; }
  .principle { background:var(--panel); border:1px solid var(--line); border-radius:16px; padding:1.3rem; box-shadow:var(--shadow); }
  .principle-num { width:34px; height:34px; border-radius:50%; background:var(--pine); color:#FBF9F4; display:grid; place-items:center; font-family:Georgia,serif; font-size:1.1rem; margin-bottom:.8rem; }
  .principle-name { font-family:Georgia,serif; font-size:1.1rem; color:var(--pine-deep); margin-bottom:.35rem; }
  .principle p { font-size:.84rem; color:var(--ink-soft); }
  .statement { display:flex; gap:1.4rem; align-items:flex-start; background:var(--sand); border-radius:20px; padding:2.2rem 2.4rem; }
  .statement h2 { font-size:1.65rem; color:var(--pine-deep); line-height:1.3; }
  .statement .leaf-big { margin-top:.3rem; }

  /* guide */
  .g-h3 { font-family:Georgia,serif; font-size:1.25rem; color:var(--pine-deep); margin:0 0 1.1rem; }
  .ing-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:1rem; margin-bottom:2rem; }
  .ing-card { background:var(--panel); border:1px solid var(--line); border-radius:14px; padding:1.1rem 1.25rem; box-shadow:var(--shadow); }
  .ing-name { font-family:Georgia,serif; color:var(--pine-deep); font-size:1.02rem; }
  .ing-role { font-size:.72rem; text-transform:uppercase; letter-spacing:.09em; color:var(--clay); margin:.15rem 0 .55rem; }
  .ing-card p { font-size:.82rem; color:var(--ink-soft); }
  .tbl { overflow-x:auto; background:var(--panel); border:1px solid var(--line); border-radius:14px; box-shadow:var(--shadow); margin-bottom:2rem; }
  table { width:100%; border-collapse:collapse; font-size:.88rem; }
  th,td { text-align:left; padding:.7rem .95rem; border-bottom:1px solid var(--line); vertical-align:top; }
  th { font-size:.72rem; text-transform:uppercase; letter-spacing:.08em; color:var(--sage); font-weight:600; background:var(--cream); }
  tbody tr:last-child td { border-bottom:none; }
  .guide-note { display:flex; gap:1.2rem; align-items:flex-start; background:var(--sand); border-radius:18px; padding:1.8rem 2rem; }
  .guide-note p { color:var(--ink-soft); font-size:.92rem; max-width:70ch; }

  /* contact */
  .contact-grid { display:grid; grid-template-columns:1.2fr 1fr; gap:2rem; }
  .contact-form { display:flex; flex-direction:column; gap:1rem; background:var(--panel); border:1px solid var(--line); border-radius:18px; padding:1.8rem; box-shadow:var(--shadow); }
  .contact-form label { display:flex; flex-direction:column; gap:.35rem; font-size:.82rem; color:var(--ink-soft); }
  .contact-form input, .contact-form textarea { border:1px solid var(--line); border-radius:10px; padding:.7rem .9rem; font-size:.9rem; font-family:inherit; background:var(--paper); color:var(--ink); outline:none; transition:border-color .15s; }
  .contact-form input:focus, .contact-form textarea:focus { border-color:var(--sage); box-shadow:0 0 0 3px rgba(124,145,111,.15); }
  .contact-form .btn { align-self:flex-start; }
  .sent { font-size:.82rem; color:var(--pine); }
  .contact-aside { display:flex; flex-direction:column; gap:1.6rem; }
  .ca-block .ca-label { font-size:.72rem; text-transform:uppercase; letter-spacing:.12em; color:var(--sage); margin-bottom:.5rem; }
  .ca-block a { color:var(--pine-deep); font-weight:500; text-decoration:none; border-bottom:1px solid transparent; transition:border-color .15s; }
  .ca-block a:hover { border-bottom-color:var(--pine); }
  .socials { display:flex; gap:1rem; }
  .ca-block p { font-size:.88rem; color:var(--ink-soft); }

  /* footer */
  footer { border-top:1px solid var(--line); background:var(--cream); margin-top:2rem; }
  .foot-inner { max-width:1080px; margin:0 auto; padding:2.4rem 2rem; display:flex; flex-wrap:wrap; gap:2rem; align-items:flex-start; }
  .foot-brand { display:flex; flex-direction:column; gap:.4rem; margin-right:auto; }
  .foot-brand .row { display:flex; align-items:center; gap:.55rem; }
  .foot-brand .leaf { width:24px; height:24px; color:var(--pine); }
  .foot-brand .word { font-family:Georgia,serif; font-size:1.7rem; color:var(--pine-deep); }
  .foot-brand .brand-mark { height:128px; width:auto; border-radius:10px; display:block; box-shadow:0 2px 8px rgba(40,38,30,.12); }
  .foot-brand p { font-size:.8rem; color:var(--ink-soft); max-width:260px; }
  .foot-col .fc-title { font-size:.7rem; text-transform:uppercase; letter-spacing:.12em; color:var(--sage); margin-bottom:.6rem; }
  .foot-col a { display:block; font-size:.86rem; color:var(--ink-soft); text-decoration:none; padding:.18rem 0; width:max-content; }
  .foot-col a:hover { color:var(--pine); }
  .foot-bottom { border-top:1px solid var(--line); text-align:center; font-size:.76rem; color:var(--ink-soft); padding:1.1rem 2rem; }

  @media (max-width:820px) {
    .nav { padding:.8rem 1.2rem; gap:1rem; }
    .nav-links { margin-left:0; }
    .collection-panel, .about-grid, .contact-grid { grid-template-columns:1fr; }
    .cp-tile, .about-tile { height:200px; }
    .blend-rule { grid-template-columns:1fr; }
    .blend-rule-body { grid-template-columns:1fr; }
    .cfg-layout { grid-template-columns:1fr; }
    .cfg-preview { position:static; }
    .page { padding-top:2rem; }
    .nav-item { font-size:.82rem; padding:.4rem .7rem; }
  }
  @media (max-width:520px) {
    .nav-links { width:100%; order:3; overflow-x:auto; padding-bottom:.2rem; }
    .hero h1 { font-size:2.4rem; }
  }
  @media print { .nav, footer { display:none; } .page { display:block !important; } }
</style>
</head>
<body>

<header class="nav">
  <a class="nav-brand" href="#home" data-nav="home">
    ${logoDataUri ? `<img class="brand-mark nav" src="${logoDataUri}" alt="Butter &amp; Bloom logo">` : ``}
    <span class="word">Butter &amp; Bloom</span>
  </a>
  <div class="nav-links">${NAV}</div>
</header>

<main>
  <div class="page visible" id="home">${home()}</div>
  <div class="page" id="shop">${shop()}</div>
  <div class="page" id="collections">${collectionsPage()}</div>
  <div class="page" id="about">${about()}</div>
  <div class="page" id="guide">${guide()}</div>
  <div class="page" id="contact">${contact()}</div>
  <div class="page" id="privacy">${privacy()}</div>
</main>

<footer>
  <div class="foot-inner">
    <div class="foot-brand">
      <div class="row">${logoDataUri ? `<img class="brand-mark foot" src="${logoDataUri}" alt="Butter &amp; Bloom logo">` : leaf}<span class="word">Butter &amp; Bloom</span></div>
      <p>Handcrafted bath &amp; body care, made slowly and made thoughtfully in small batches.</p>
    </div>
    <div class="foot-col"><div class="fc-title">Explore</div>
      <a href="#shop" data-nav="shop">Shop</a><a href="#collections" data-nav="collections">Collections</a><a href="#about" data-nav="about">About</a>
    </div>
    <div class="foot-col"><div class="fc-title">Learn</div>
      <a href="#guide" data-nav="guide">Care Guide</a><a href="#guide" data-nav="guide">Ingredients</a><a href="#guide" data-nav="guide">Shelf Life</a>
    </div>
    <div class="foot-col"><div class="fc-title">Legal</div>
      <a href="#privacy" data-nav="privacy">Privacy Policy</a>
    </div>
    <div class="foot-col"><div class="fc-title">Contact</div>
      <a href="#contact" data-nav="contact">Contact</a><a href="#contact" data-nav="contact">Custom orders</a><a href="mailto:hello@butterbloom.ca">hello@butterbloom.ca</a>
    </div>
  </div>
  <div class="foot-bottom">© 2026 ButterBloom. Made slowly. Made thoughtfully.</div>
</footer>

<script>
  const pages = document.querySelectorAll('.page');
  const navItems = document.querySelectorAll('.nav-item, .nav-brand');
  const VISIBLE = new Map();

  function show(id, push) {
    let valid = false;
    pages.forEach(p => { const on = p.id === id; p.classList.toggle('visible', on); if (on) valid = true; });
    if (!valid) id = 'home';
    pages.forEach(p => p.classList.toggle('visible', p.id === id));
    navItems.forEach(n => n.classList.toggle('active', n.dataset.nav === id));
    if (push) { try { history.replaceState(null, '', '#' + id); } catch (e) {} }
    window.scrollTo(0, 0);
    if (VISIBLE.has(id)) { pages.forEach(p => { if (p.id === id) p.style.display = 'block'; }); }
  }

  // internal links: switch pages if the target is a page, else stay and scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      if (target.classList.contains('page')) {
        e.preventDefault();
        show(id, true);
      } else {
        // ensure its parent page is visible, then smooth scroll
        const page = target.closest('.page');
        const pageId = page ? page.id : null;
        if (pageId && !page.classList.contains('visible')) show(pageId, true);
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
      }
    });
  });

  // catalog filter
  const chips = document.querySelectorAll('.cat-chip');
  const cards = document.querySelectorAll('.product-card');
  chips.forEach(ch => ch.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    ch.classList.add('active');
    const cat = ch.dataset.cat;
    cards.forEach(c => c.style.display = (cat === 'all' || c.dataset.cat === cat) ? '' : 'none');
  }));

  // hero rotating taglines
  const heroSlides = [
    'Made slowly.<br>Made thoughtfully.',
    'Cured for six weeks,<br>made by hand.',
    'Vegan, traceable,<br>small-batch care.',
    'Ontario-made,<br>with love and truth.',
  ];
  const heroLine = document.querySelector('.hero-line');
  if (heroLine) {
    let h = 0;
    setInterval(() => {
      h = (h + 1) % heroSlides.length;
      heroLine.classList.add('switching');
      setTimeout(() => {
        heroLine.innerHTML = heroSlides[h];
        heroLine.classList.remove('switching');
      }, 280);
    }, 4400);
  }

  // design-your-own configurator
  const designerStage = ${designerStage.toString()};
  const $q = s => document.querySelector(s);
  const cfgAll = document.querySelectorAll('.cfg-opt');
  const cfgSummary = $q('#cfgSummary');
  const cfgCardName = $q('#cfgCardName');
  const cfgCardLine = $q('#cfgCardLine');
  const cfgCardMeta = $q('#cfgCardMeta');
  const cfgStage = $q('#cfgStage');
  const cfgNameInput = $q('#cfgName');
  const collBtns = document.querySelectorAll('.cfg-coll');
  const prodBtns = document.querySelectorAll('.cfg-prod');
  const scentBtns = document.querySelectorAll('.cfg-scent');
  const sizeBtns = document.querySelectorAll('.cfg-size');

  const sel = {
    coll: 'Soft Glow', tag: 'Gentle · soft · natural', dot: '#C9A39B', t1: '#F1EAE0', t2: '#A9B894',
    prod: 'Soap', shape: 'bar', scent: 'Lavender', size: 'Standard (4 oz)', name: 'My Butter & Bloom',
  };

  function refreshCfg() {
    const base = sel.name || 'My Butter & Bloom';
    cfgStage.innerHTML = designerStage(sel.shape, sel.dot, sel.t1, sel.t2) +
      '<div class="cfg-stage-name">' + sel.prod + ' · ' + sel.coll + '</div>';
    cfgCardName.textContent = base;
    cfgCardLine.textContent = sel.coll + ' · ' + sel.prod + ' · ' + sel.scent;
    cfgCardMeta.textContent = sel.size + (sel.scent === 'Unscented' ? ' · fragrance-free' : '');
    cfgSummary.textContent = sel.coll + ' · ' + sel.prod + ' · ' + sel.scent + ' · ' + base + ' · ' + sel.size;
  }

  collBtns.forEach(b => b.addEventListener('click', () => {
    collBtns.forEach(x => x.classList.toggle('active', x === b));
    sel.coll = b.dataset.value; sel.tag = b.dataset.tag; sel.dot = b.dataset.dot; sel.t1 = b.dataset.t1; sel.t2 = b.dataset.t2;
    let first = null;
    scentBtns.forEach(s => { const on = s.dataset.coll === sel.coll; s.style.display = on ? '' : 'none'; if (on && !first) first = s; });
    if (first) { scentBtns.forEach(x => x.classList.toggle('active', x === first)); sel.scent = first.dataset.value; }
    refreshCfg();
  }));

  prodBtns.forEach(b => b.addEventListener('click', () => {
    prodBtns.forEach(x => x.classList.toggle('active', x === b));
    sel.prod = b.dataset.value; sel.shape = b.dataset.shape;
    refreshCfg();
  }));

  scentBtns.forEach(b => b.addEventListener('click', () => {
    if (b.style.display === 'none') return;
    scentBtns.forEach(x => x.classList.toggle('active', x === b));
    sel.scent = b.dataset.value;
    refreshCfg();
  }));

  sizeBtns.forEach(b => b.addEventListener('click', () => {
    sizeBtns.forEach(x => x.classList.toggle('active', x === b));
    sel.size = b.dataset.value;
    refreshCfg();
  }));

  if (cfgNameInput) cfgNameInput.addEventListener('input', () => {
    sel.name = cfgNameInput.value.trim() || 'My Butter & Bloom';
    refreshCfg();
  });

  collBtns.forEach(x => x.classList.toggle('active', x.dataset.value === sel.coll));
  prodBtns.forEach(x => x.classList.toggle('active', x.dataset.value === sel.prod));
  scentBtns.forEach(s => { const on = s.dataset.coll === sel.coll; s.style.display = on ? '' : 'none'; s.classList.toggle('active', on && s.dataset.value === sel.scent); });
  sizeBtns.forEach(x => x.classList.toggle('active', x.dataset.value === sel.size));
  refreshCfg();

  const cfgRequest = document.getElementById('cfgRequest');
  if (cfgRequest) cfgRequest.addEventListener('click', () => {
    const msg = document.querySelector('#contact textarea[name="message"]');
    if (msg) msg.value = 'Custom order request:\\n\\nCollection: ' + sel.coll + ' (' + sel.tag + ')\\nProduct: ' + sel.prod + '\\nScent: ' + sel.scent + '\\nSize: ' + sel.size + '\\nName: ' + sel.name + '\\n\\nChosen with the Design-your-own designer.';
    show('contact', false);
    setTimeout(() => { const f = document.querySelector('#contact .contact-form'); if (f) f.scrollIntoView({ behavior: 'smooth' }); }, 60);
  });

  const init = (location.hash || '').replace('#', '');
  show(document.getElementById(init) && init !== 'home' ? init : 'home', true);
  window.addEventListener('hashchange', () => { const h = (location.hash || 'home').replace('#', ''); show(h, false); });
</script>
</body>
</html>`;

fs.writeFileSync(path.join(DIR, 'shop.html'), html, 'utf-8');
console.log(`Built shop.html (${(html.length / 1024).toFixed(1)} KB)`);