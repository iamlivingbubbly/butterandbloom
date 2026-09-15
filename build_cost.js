const fs = require('fs');
const path = require('path');
const DIR = __dirname;

const PRICES = {
  olive: 12, coconut: 5, palm: 8, shea: 12, castor: 12, lye: 10,
  soda: 2, citric: 8, starch: 3, kaolin: 8, sugar: 2.5,
  wax: 30, cocoa: 12, arrowroot: 4,
  almond: 20, poly80: 15, vite: 60,
};

const PRODUCTS = [
  { name: 'Soap', unitsPerRun: 200, pack: 1.10,
    ing: { olive: 0.040, coconut: 0.025, palm: 0.020, shea: 0.010, castor: 0.005, lye: 0.014 }, scentML: 3.0 },
  { name: 'Bath Bomb', unitsPerRun: 145, pack: 0.90,
    ing: { soda: 0.030, citric: 0.015, starch: 0.00375, almond: 0.0017 }, scentML: 0.8 },
  { name: 'Shower Steamer', unitsPerRun: 145, pack: 0.90,
    ing: { soda: 0.080, citric: 0.040, kaolin: 0.005 }, scentML: 6.7 },
  { name: 'Sugar Scrub', unitsPerRun: 128, pack: 1.20,
    ing: { sugar: 0.100, almond: 0.030, vite: 0.00015 }, scentML: 0.55 },
  { name: 'Lip Balm', unitsPerRun: 120, pack: 0.80,
    ing: { wax: 0.0015, cocoa: 0.0015, almond: 0.003 }, scentML: 0.1 },
  { name: 'Body Butter', unitsPerRun: 64, pack: 1.20,
    ing: { shea: 0.050, coconut: 0.025, almond: 0.015, arrowroot: 0.005 }, scentML: 1.1 },
];

const TIERS = {
  current:     [8, 6, 10, 6, 3, 10],
  recommended: [9, 7, 11, 7, 4, 12],
  premium:     [12, 9, 13, 9, 5, 15],
};
const TIER_LABEL = { current: 'Your prices', recommended: 'Recommended ($7 bar)', premium: 'Premium (custom designer)', markup: '4.5 × ingredient, floor 45% margin' };
const FLOOR_MULT = 4.5;
const FLOOR_RECOVER = 0.55;

const BUNDLES = [
  { name: 'Starter Ritual', items: [['Soap', 1], ['Sugar Scrub', 1], ['Shower Steamer', 1]] },
  { name: 'Soak & Glow', items: [['Soap', 1], ['Bath Bomb', 1], ['Body Butter', 1]] },
  { name: 'Butter & Bloom Luxe', items: [['Soap', 1], ['Bath Bomb', 1], ['Shower Steamer', 1], ['Sugar Scrub', 1], ['Lip Balm', 1], ['Body Butter', 1]] },
];

const DEFAULTS = {
  spend: 450, runs: 1,
  scentPerMl: 0.30,
  shippingPerOrder: 14, itemsPerOrder: 4,
  overheadPerRun: 50,
  flatOn: false, flatCost: 3, flatPrice: 5, tier: 'markup',
};

const fmt = n => '$' + n.toFixed(2);
const pct = n => n.toFixed(1) + '%';

function rawIngredientCost(p, scentPerMl) {
  let c = 0;
  for (const [k, v] of Object.entries(p.ing)) c += v * (PRICES[k] || 0);
  return c + p.scentML * scentPerMl;
}

function compute(v) {
  const unitsTotal = PRODUCTS.reduce((a, p) => a + p.unitsPerRun, 0);
  const spendPerRun = v.spend / v.runs;
  const rawTotal = PRODUCTS.reduce((a, p) => a + rawIngredientCost(p, v.scentPerMl) * p.unitsPerRun, 0);
  const scale = spendPerRun / rawTotal;
  const shipPerUnit = v.shippingPerOrder / v.itemsPerOrder;
  const ohPerUnit = v.overheadPerRun / unitsTotal;
  const retail = TIERS[v.tier] || TIERS.current;
  const rows = PRODUCTS.map((p, i) => {
    const ing = rawIngredientCost(p, v.scentPerMl) * scale;
    const cogs = ing + p.pack + shipPerUnit + ohPerUnit;
    const price = v.tier === 'markup'
      ? Math.max(ing * FLOOR_MULT, cogs / FLOOR_RECOVER)
      : retail[i];
    return { name: p.name, units: p.unitsPerRun, ing, pack: p.pack, ship: shipPerUnit, oh: ohPerUnit, cogs, retail: price, m: (price - cogs) / price };
  });
  return { unitsTotal, scale, shipPerUnit, ohPerUnit, rows,
    rev: rows.reduce((a, r) => a + r.units * r.retail, 0),
    cog: rows.reduce((a, r) => a + r.units * r.cogs, 0) };
}

function build() {
  const v = Object.assign({}, DEFAULTS);
  const flat = v.flatOn;
  const c = compute(v);

  const trs = c.rows.map((r, i) => `<tr>
    <td>${r.name}</td><td>${r.units}</td>
    <td class="c-ing" data-i="${i}">${flat ? '—' : fmt(r.ing)}</td>
    <td class="c-pack" data-i="${i}">${flat ? '—' : fmt(r.pack)}</td>
    <td class="c-ship" data-i="${i}">${flat ? '—' : fmt(r.ship)}</td>
    <td class="c-oh" data-i="${i}">${flat ? '—' : fmt(r.oh)}</td>
    <td class="c-cogs" data-i="${i}"><b>${flat ? fmt(v.flatCost) : fmt(r.cogs)}</b></td>
    <td class="c-price" data-i="${i}">${flat ? fmt(v.flatPrice) : fmt(r.retail)}</td>
    <td class="c-mgn" data-i="${i}">${flat ? pct((v.flatPrice - v.flatCost) / v.flatPrice * 100) : pct(r.m * 100)}</td>
  </tr>`).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Butter &amp; Bloom — Product Costing</title>
<style>
  :root { --paper:#FBF9F4; --panel:#FFFFFF; --cream:#F4EFE6;
    --ink:#2E2C27; --ink-soft:#6E6A60; --line:#E7E1D4; --pine:#5F746A; --pine-deep:#35503F;
    --clay:#B9805F; --sage:#7C916F; --good:#2F6B4F; --bad:#9A3324; }
  * { box-sizing:border-box; }
  body { margin:0; font:14px/1.5 -apple-system,'Segoe UI',Roboto,sans-serif; background:var(--cream); color:var(--ink); }
  header { background:var(--pine-deep); color:#FBF9F4; padding:1.4rem 2rem; }
  header h1 { margin:0; font-family:Georgia,serif; font-size:1.4rem; }
  header p { margin:.2rem 0 0; opacity:.85; font-size:.85rem; }
  main { max-width:1080px; margin:0 auto; padding:1.6rem 1.2rem 3rem; }
  .grid { display:grid; grid-template-columns:320px 1fr; gap:1.4rem; align-items:start; }
  .card { background:var(--panel); border:1px solid var(--line); border-radius:14px; padding:1.1rem 1.2rem; box-shadow:0 2px 10px rgba(40,38,30,.06); }
  .card h3 { margin:0 0 .8rem; font-family:Georgia,serif; font-size:1.02rem; color:var(--pine-deep); }
  .flat { background:var(--cream); border:1px solid var(--line); border-radius:10px; padding:.7rem .8rem .9rem; margin-bottom:1rem; }
  .flat-row { display:grid; grid-template-columns:1fr 1fr; gap:.7rem; margin-top:.3rem; }
  label { display:block; font-size:.78rem; color:var(--ink-soft); margin:.55rem 0 .2rem; }
  label.chk { display:flex; align-items:center; gap:.5rem; margin-top:0; font-weight:600; color:var(--pine-deep); }
  input[type=number], select { width:100%; border:1px solid var(--line); border-radius:8px; padding:.45rem .6rem; font-size:.95rem; background:var(--paper); }
  input[type=range] { width:100%; accent-color:var(--pine); }
  input[type=checkbox] { accent-color:var(--pine); width:16px; height:16px; }
  .hint { font-size:.72rem; color:var(--ink-soft); margin-top:.15rem; }
  table { width:100%; border-collapse:collapse; font-size:.84rem; }
  th, td { text-align:right; padding:.55rem .6rem; border-bottom:1px solid var(--line); white-space:nowrap; }
  th { text-transform:uppercase; letter-spacing:.06em; font-size:.68rem; color:var(--sage); background:var(--cream); }
  th:nth-child(-n+2), td:nth-child(-n+2) { text-align:left; }
  tfoot td { font-weight:700; border-top:2px solid var(--pine-deep); background:var(--cream); }
  .pos { color:var(--good); font-weight:700; } .neg { color:var(--bad); font-weight:700; }
  .sums { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:.8rem; margin-bottom:1.2rem; }
  .sum { background:var(--panel); border:1px solid var(--line); border-radius:12px; padding:.9rem 1.1rem; box-shadow:0 2px 10px rgba(40,38,30,.06); }
  .sum .l { font-size:.7rem; text-transform:uppercase; letter-spacing:.08em; color:var(--sage); }
  .sum .v { font-family:Georgia,serif; font-size:1.5rem; color:var(--pine-deep); margin-top:.15rem; }
  .sum .v.bad { color:var(--bad); }
  .recon { margin-top:1rem; font-size:.82rem; color:var(--ink-soft); background:var(--cream); border-radius:10px; padding:.7rem .9rem; }
  .bar { display:flex; gap:.5rem; flex-wrap:wrap; margin-bottom:1.2rem; }
  button { border:0; border-radius:9px; padding:.55rem 1rem; font-size:.85rem; cursor:pointer; }
  .btn-p { background:var(--pine); color:#FBF9F4; } .btn-g { background:var(--cream); color:var(--ink-soft); }
  h2 { font-family:Georgia,serif; font-size:1.1rem; color:var(--pine-deep); margin:1.8rem 0 .7rem; }
  .brow { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:.9rem; }
  .bundle { border:1px solid var(--line); border-radius:12px; padding:.9rem 1rem; background:var(--cream); }
  .bundle h4 { margin:0 0 .4rem; font-family:Georgia,serif; font-size:.95rem; color:var(--pine-deep); }
  .bundle .what { font-size:.75rem; color:var(--ink-soft); margin-bottom:.5rem; }
  .bundle .line { display:flex; justify-content:space-between; font-size:.8rem; padding:.12rem 0; }
  .bundle .price { font-family:Georgia,serif; font-size:1.15rem; color:var(--pine-deep); }
  @media (max-width:860px){ .grid{grid-template-columns:1fr;} }
  @media print { button{display:none;} .grid{grid-template-columns:1fr;} }
</style>
</head>
<body>
<header>
  <h1>Butter &amp; Bloom — Product Costing</h1>
  <p>Per-unit COGS → margin per run (${c.unitsTotal} units), plus a bundle analysis.</p>
</header>
<main>
  <div class="bar"><button class="btn-g" onclick="resetIt()">Restore defaults</button><button class="btn-p" onclick="window.print()">Print PDF</button></div>
  <div class="grid">
    <div>
      <div class="card">
        <h3>Assumptions</h3>
        <div class="flat">
          <label class="chk"><input type="checkbox" id="flatOn" ${flat ? 'checked' : ''}> Flat cost &amp; price (simplified view)</label>
          <div class="flat-row">
            <div><label>Cost / item</label><input type="number" id="flatCost" value="${v.flatCost}" step="0.25" min="0"></div>
            <div><label>Retail / item</label><input type="number" id="flatPrice" value="${v.flatPrice}" step="0.25" min="0"></div>
          </div>
        </div>
        <label>Pricing tier (itemized view)</label>
        <select id="tier">
          <option value="current" ${v.tier === 'current' ? 'selected' : ''}>Your prices ($8 bar, $6 scrub)</option>
          <option value="recommended" ${v.tier === 'recommended' ? 'selected' : ''}>Recommended ($7 bar, $9 butter)</option>
          <option value="premium" ${v.tier === 'premium' ? 'selected' : ''}>Premium (custom designer)</option>
          <option value="markup" ${v.tier === 'markup' ? 'selected' : ''}>4.5 × ingredient, floor 45% margin</option>
        </select>
        <label>Ingredient spend (CAD)</label>
        <input type="number" id="spend" value="${v.spend}" step="10" min="0">
        <label>Covers how many production runs?</label>
        <input type="number" id="runs" value="${v.runs}" step="1" min="1">
        <div class="hint">"Batch one makes 4 more batches" → set runs = 5.</div>
        <label>Scent (EO/FO) cost per mL</label>
        <input type="range" id="scent" min="0" max="1.5" step="0.05" value="${v.scentPerMl}">
        <div class="hint" id="scentHint">${fmt(v.scentPerMl)}/mL — biggest swing factor (steamers use ~6.7 mL each).</div>
        <label>Shipping cost per order</label>
        <input type="number" id="shipOrder" value="${v.shippingPerOrder}" step="1" min="0">
        <label>Average items per order</label>
        <input type="number" id="items" value="${v.itemsPerOrder}" step="1" min="1">
        <label>Overhead per run (utilities, cleanup)</label>
        <input type="number" id="oh" value="${v.overheadPerRun}" step="5" min="0">
      </div>
    </div>
    <div>
      <div class="sums">
        <div class="sum"><div class="l">Revenue / run</div><div class="v" id="sRev">${fmt(c.rev)}</div></div>
        <div class="sum"><div class="l">COGS / run</div><div class="v" id="sCog">${fmt(c.cog)}</div></div>
        <div class="sum"><div class="l">Gross profit / run</div><div class="v" id="sPro">${fmt(c.rev - c.cog)}</div></div>
        <div class="sum"><div class="l">Gross margin</div><div class="v" id="sMgn">${pct((c.rev - c.cog) / c.rev * 100)}</div></div>
      </div>
      <div class="card">
        <h3>Per-unit breakdown (one run = ${c.unitsTotal} units)</h3>
        <div style="overflow-x:auto">
        <table id="tbl">
          <thead><tr><th>Product</th><th># units</th><th>Ingredients</th><th>Packaging</th><th>Shipping</th><th>Overhead</th><th>COGS</th><th>Retail</th><th>Margin %</th></tr></thead>
          <tbody>${trs}</tbody>
          <tfoot id="tfoot"></tfoot>
        </table>
        </div>
        <div class="recon" id="recon"></div>
      </div>
      <h2>Bundle analysis — one parcel, one shipping charge</h2>
      <div class="brow" id="bundleWrap"><!-- filled live --></div>
    </div>
  </div>
</main>
<script>
  const DATA = ${JSON.stringify({ products: PRODUCTS, prices: PRICES, def: DEFAULTS, tiers: TIERS, tierLabel: TIER_LABEL, bundles: BUNDLES, floorMult: FLOOR_MULT, floorRecover: FLOOR_RECOVER })};
  const fmt = n => '$' + n.toFixed(2);
  const pct = n => n.toFixed(1) + '%';
  function rawCost(p, s) { let cc = 0; for (const [k, vl] of Object.entries(p.ing)) cc += vl * (DATA.prices[k] || 0); return cc + p.scentML * s; }
  function read() { return {
    spend: +document.getElementById('spend').value || 0,
    runs: Math.max(1, +document.getElementById('runs').value || 1),
    scentPerMl: +document.getElementById('scent').value || 0,
    shippingPerOrder: +document.getElementById('shipOrder').value || 0,
    itemsPerOrder: Math.max(1, +document.getElementById('items').value || 1),
    overheadPerRun: +document.getElementById('oh').value || 0,
    flatOn: document.getElementById('flatOn').checked,
    flatCost: +document.getElementById('flatCost').value || 0,
    flatPrice: +document.getElementById('flatPrice').value || 0,
    tier: document.getElementById('tier').value,
  }; }
  function setRow(i, ing, pack, ship, oh, cogs, price, mgn, cls) {
    document.querySelector('.c-ing[data-i="' + i + '"]').textContent = ing;
    document.querySelector('.c-pack[data-i="' + i + '"]').textContent = pack;
    document.querySelector('.c-ship[data-i="' + i + '"]').textContent = ship;
    document.querySelector('.c-oh[data-i="' + i + '"]').textContent = oh;
    document.querySelector('.c-cogs[data-i="' + i + '"]').innerHTML = '<b>' + cogs + '</b>';
    document.querySelector('.c-price[data-i="' + i + '"]').textContent = price;
    const cEl = document.querySelector('.c-mgn[data-i="' + i + '"]');
    cEl.textContent = mgn; cEl.className = 'c-mgn ' + cls;
  }
  function setSums(rev, cig, pro, mg, bad) {
    document.getElementById('sRev').textContent = fmt(rev);
    document.getElementById('sCog').textContent = fmt(cig);
    const p = document.getElementById('sPro'); p.textContent = fmt(pro); p.className = 'v ' + (bad ? 'bad' : '');
    const m = document.getElementById('sMgn'); m.textContent = pct(mg); m.className = 'v ' + (bad ? 'bad' : '');
  }
  function bundleHTML(m, tierKey) {
    const ret = DATA.tiers[tierKey] || DATA.tiers.current;
    const byName = {};
    DATA.products.forEach((p, i) => byName[p.name] = { p, i });
    return DATA.bundles.map(b => {
      let ing = 0, pack = 0, cnt = 0, value = 0;
      b.items.forEach(([name, n]) => {
        const { p, i } = byName[name];
        ing += m.byName[name].ing * n; pack += p.pack * n; cnt += n;
        const single = tierKey === 'markup'
          ? Math.max(m.byName[name].ing * DATA.floorMult, (m.byName[name].ing + p.pack + m.shipU + m.ohU) / DATA.floorRecover)
          : ret[i];
        value += single * n;
      });
      const cogs = ing + pack + m.shipOnce + cnt * m.ohU;
      const exact = cogs / 0.6;
      const round = Math.ceil(exact);
      const mg = (round - cogs) / round;
      const save = value > round ? pct((value - round) / value * 100) : 'no savings vs à-la-carte';
      return '<div class="bundle"><h4>' + b.name + '</h4>' +
        '<div class="what">' + b.items.map(([n, c]) => c + ' × ' + n).join(' · ') + '</div>' +
        '<div class="line"><span>Contents COGS</span><span>' + fmt(ing + pack) + '</span></div>' +
        '<div class="line"><span>Shipping (1 parcel)</span><span>' + fmt(m.shipOnce) + '</span></div>' +
        '<div class="line"><span>Full COGS</span><span><b>' + fmt(cogs) + '</b></span></div>' +
        '<div class="line"><span>Price for 40% margin</span><span>' + fmt(exact) + '</span></div>' +
        '<div class="line"><span>Rounded price</span><span class="price">' + fmt(round) + '</span></div>' +
        '<div class="line ' + (mg < 0 ? 'neg' : 'pos') + '"><span>Margin at rounded price</span><span>' + pct(mg * 100) + '</span></div>' +
        '<div class="line"><span>Value (à-la-carte)</span><span>' + fmt(value) + ' · ' + save + '</span></div></div>';
    }).join('');
  }
  function recalc() {
    const v = read();
    const units = DATA.products.reduce((a, p) => a + p.unitsPerRun, 0);
    const spendPerRun = v.spend / v.runs;
    const rawTotal = DATA.products.reduce((a, p) => a + rawCost(p, v.scentPerMl) * p.unitsPerRun, 0);
    const scale = spendPerRun / rawTotal;
    const shipU = v.shippingPerOrder / v.itemsPerOrder;
    const ohU = v.overheadPerRun / units;
    const model = { scale, shipU, ohU, shipOnce: v.shippingPerOrder, byName: {} };
    DATA.products.forEach((p, i) => model.byName[p.name] = { ing: rawCost(p, v.scentPerMl) * scale, pack: p.pack });
    document.getElementById('bundleWrap').innerHTML = bundleHTML(model, v.tier);

    if (v.flatOn) {
      const rev = units * v.flatPrice, cig = units * v.flatCost, pro = rev - cig;
      const mg = rev > 0 ? pro / rev * 100 : 0;
      setSums(rev, cig, pro, mg, pro < 0);
      DATA.products.forEach((p, i) => setRow(i, '—', '—', '—', '—', fmt(v.flatCost), fmt(v.flatPrice), pct(mg), mg < 0 ? 'neg' : 'pos'));
      document.getElementById('tfoot').innerHTML = '<tr><td>Totals</td><td>' + units + '</td><td>—</td><td>—</td><td>—</td><td>—</td><td>' + fmt(cig) + '</td><td>' + fmt(rev) + '</td><td class="' + (mg < 0 ? 'neg' : 'pos') + '">' + pct(mg) + '</td></tr>';
      document.getElementById('recon').textContent = 'Flat model: ' + fmt(v.flatCost) + ' cost × ' + units + ' = ' + fmt(cig) + ' COGS · ' + fmt(v.flatPrice) + ' price × ' + units + ' = ' + fmt(rev) + ' revenue → ' + fmt(pro) + ' profit (' + pct(mg) + ' margin). Uncheck to see the itemized breakdown.';
      return;
    }
    const ret = DATA.tiers[v.tier] || DATA.tiers.current;
    let cogTotal = 0, rev = 0;
    DATA.products.forEach((p, i) => {
      const ing = rawCost(p, v.scentPerMl) * scale;
      const cogs = ing + p.pack + shipU + ohU;
      const g = v.tier === 'markup'
        ? Math.max(ing * DATA.floorMult, cogs / DATA.floorRecover)
        : ret[i];
      cogTotal += p.unitsPerRun * cogs;
      rev += p.unitsPerRun * g;
      const m = (g - cogs) / g;
      setRow(i, fmt(ing), fmt(p.pack), fmt(shipU), fmt(ohU), fmt(cogs), fmt(g), pct(m * 100), m < 0 ? 'neg' : 'pos');
    });
    setSums(rev, cogTotal, rev - cogTotal, (rev - cogTotal) / rev * 100, rev - cogTotal < 0);
    document.getElementById('scentHint').textContent = fmt(v.scentPerMl) + '/mL · ' + DATA.tierLabel[v.tier];
    document.getElementById('tfoot').innerHTML = '<tr><td>Totals</td><td>' + units + '</td>' +
      '<td>' + fmt(rawTotal * scale) + '</td><td>' + fmt(DATA.products.reduce((a, p) => a + p.pack * p.unitsPerRun, 0)) + '</td>' +
      '<td>' + fmt(shipU * units) + '</td><td>' + fmt(ohU * units) + '</td><td>' + fmt(cogTotal) + '</td><td>' + fmt(rev) + '</td>' +
      '<td class="' + (rev - cogTotal < 0 ? 'neg' : 'pos') + '">' + pct((rev - cogTotal) / rev * 100) + '</td></tr>';
    const tierNote = v.tier === 'markup'
      ? 'retail = max(4.5 × ingredient cost, COGS ÷ 0.55) → never below 45% margin'
      : 'tier: ' + DATA.tierLabel[v.tier];
    document.getElementById('recon').textContent = 'Raw ingredient model at ' + fmt(v.scentPerMl) + '/mL scent: ' + fmt(rawTotal) +
      ' → scaled by ' + (scale * 100).toFixed(0) + '% to your ' + fmt(v.spend) + ' spend over ' + v.runs + ' run(s). ' + tierNote + '.';
  }
  function resetIt() {
    const d = DATA.def;
    document.getElementById('flatOn').checked = d.flatOn;
    document.getElementById('flatCost').value = d.flatCost;
    document.getElementById('flatPrice').value = d.flatPrice;
    document.getElementById('tier').value = d.tier;
    document.getElementById('spend').value = d.spend;
    document.getElementById('runs').value = d.runs;
    document.getElementById('scent').value = d.scentPerMl;
    document.getElementById('shipOrder').value = d.shippingPerOrder;
    document.getElementById('items').value = d.itemsPerOrder;
    document.getElementById('oh').value = d.overheadPerRun;
    recalc();
  }
  document.getElementById('scent').addEventListener('input', () => { document.getElementById('scentHint').textContent = fmt(+document.getElementById('scent').value) + '/mL'; });
  document.querySelectorAll('input, select').forEach(i => i.addEventListener('input', recalc));
  recalc();
</script>
</body>
</html>`;

  fs.writeFileSync(path.join(DIR, 'costing.html'), html, 'utf-8');
  console.log('Built costing.html (' + (html.length / 1024).toFixed(1) + ' KB)');
}

build();