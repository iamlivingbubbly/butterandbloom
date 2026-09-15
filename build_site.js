const fs = require('fs');
const path = require('path');

const DIR = __dirname;

const docs = [
  { file: '01_Batch_Record_Template.csv', title: 'Batch Production Record', nav: 'Batch Record' },
  { file: '02_Production_Workflow_Checklists.txt', title: 'Production Workflow & Checklists', nav: 'Workflow' },
  { file: '03_Formulation_Sheets_Ingredient_Calcs.txt', title: 'Formulation Sheets & Ingredient Calculations', nav: 'Formulations' },
  { file: '04_QC_Inspection_Checklist.txt', title: 'QC Inspection Checklist', nav: 'QC Checklist' },
  { file: '05_Packaging_Labeling_Spec_Sheets.txt', title: 'Packaging & Labeling Spec Sheets', nav: 'Packaging' },
  { file: '06_Inventory_Tracking_Spreadsheet.csv', title: 'Inventory Tracking Spreadsheet', nav: 'Inventory' },
  { file: '07_Brand_Collections_Reference.txt', title: 'Brand Collections & Supplier Reference', nav: 'Brand' },
];

const catalog = [
  { name: 'Soap', type: 'CF / HP', format: '3.5 oz bar', price: 5.00, collections: ['Soft Glow', 'Sweet Playful', 'Reset Minimal'], scents: 'Lavender Oat · Tea Tree Charcoal · Honey Oat · Rose Clay · Eucalyptus Mint', batchSize: '1,000 g oils → ~10 bars', notes: 'CP cures 4–6 wk, HP 1–2 wk', icon: '🧼' },
  { name: 'Bath Bomb', type: 'BB', format: '70 g bomb', price: 5.00, collections: ['Soft Glow', 'Sweet Playful', 'Reset Minimal'], scents: 'Rose Garden · Lavender Dream · Citrus Sunrise', batchSize: '4 bombs / batch', notes: 'Dry 24–48 hrs · moisture sensitive', icon: '🛁' },
  { name: 'Shower Steamer', type: 'SS', format: '~113 g tablet', price: 8.00, collections: ['Soft Glow', 'Sweet Playful', 'Reset Minimal'], scents: 'Eucalyptus Mint · Lavender · Citrus Burst · Sinus Relief', batchSize: '3 tablets / batch', notes: 'Dry 24–48 hrs · moisture sensitive', icon: '🚿' },
  { name: 'Sugar Scrub', type: 'SC', format: '4 oz jar', price: 5.00, collections: ['Soft Glow', 'Sweet Playful', 'Reset Minimal'], scents: 'Vanilla Bean · Brown Sugar Glow · Coffee · Honey Oat · Citrus', batchSize: '~450 g → 4 jars', notes: 'Keep water out of jar', icon: '🍯' },
  { name: 'Lip Balm', type: 'LB', format: '10 mL tube', price: 2.00, collections: ['Soft Glow', 'Sweet Playful', 'Reset Minimal'], scents: 'Peppermint · Honey · Vanilla Bean · Berry · Rose', batchSize: '10 tubes / batch', notes: 'Vegan — candelilla wax', icon: '💋' },
  { name: 'Whipped Body Butter', type: 'WB', format: '4 oz jar', price: 7.00, collections: ['Soft Glow', 'Sweet Playful', 'Reset Minimal'], scents: 'Lavender Dream · Vanilla Bean · Citrus Sunrise · Fresh Garden', batchSize: '4 jars / batch', notes: 'Softens above 25°C', icon: '🧴' },
];

const glossary = [
  { name: 'Olive Oil (Pomace)', category: 'Carrier Oil', usedIn: 'Soap', purpose: 'Primary conditioning base; gentle, moisturizing lather.', safety: '—', source: 'Voyageur Soap & Candle' },
  { name: 'Coconut Oil (76°F)', category: 'Carrier Oil', usedIn: 'Soap, Body Butter', purpose: 'Hard bar, fluffy lather, cleansing. Solid at room temp.', safety: 'Can be drying at high %', source: 'Voyageur Soap & Candle' },
  { name: 'Palm Oil (RSPO)', category: 'Carrier Oil', usedIn: 'Soap', purpose: 'Hard bar, stable creamy lather.', safety: 'Use RSPO-certified only', source: 'Voyageur Soap & Candle' },
  { name: 'Shea Butter', category: 'Butter', usedIn: 'Soap, Body Butter, Lip Balm', purpose: 'Deep conditioning, skin-softening, adds hardness.', safety: '—', source: 'Voyageur Soap & Candle' },
  { name: 'Castor Oil', category: 'Carrier Oil', usedIn: 'Soap', purpose: 'Boosts stable, fluffy lather.', safety: '—', source: 'Voyageur Soap & Candle' },
  { name: 'Cocoa Butter', category: 'Butter', usedIn: 'Lip Balm', purpose: 'Firm, protective balm base; chocolate aroma.', safety: 'May be comedogenic', source: 'Voyageur Soap & Candle' },
  { name: 'Mango Butter', category: 'Butter', usedIn: 'Lip Balm', purpose: 'Vegan alt to cocoa butter; soft and smooth.', safety: '—', source: 'Voyageur Soap & Candle' },
  { name: 'Candelilla Wax', category: 'Wax', usedIn: 'Lip Balm', purpose: 'Vegan plant wax — structure and firmness.', safety: '—', source: 'Voyageur Soap & Candle' },
  { name: 'Sweet Almond Oil', category: 'Carrier Oil', usedIn: 'Bomb, Scrub, Balm, Butter', purpose: 'Light, nourishing, fast-absorbing carrier.', safety: 'Tree nut — label allergen', source: 'Voyageur Soap & Candle' },
  { name: 'Jojoba Oil', category: 'Carrier Oil', usedIn: 'Bath Bomb', purpose: 'Wax-ester carrier, long shelf life.', safety: '—', source: 'Voyageur Soap & Candle' },
  { name: 'Grapeseed Oil', category: 'Carrier Oil', usedIn: 'Sugar Scrub', purpose: 'Light, non-greasy scrub oil.', safety: 'Pair with vitamin E', source: 'Voyageur Soap & Candle' },
  { name: 'Sodium Hydroxide', category: 'Chemical', usedIn: 'Soap', purpose: 'Saponifies oils into soap.', safety: 'CAUSTIC — PPE, ventilation, lye into water, vinegar on hand', source: 'Windy Point' },
  { name: 'Baking Soda (NaHCO3)', category: 'Dry', usedIn: 'Bomb, Steamer', purpose: 'Fizzing agent — reacts with citric acid.', safety: 'Avoid inhaling dust', source: 'Uline Canada' },
  { name: 'Citric Acid', category: 'Dry', usedIn: 'Bomb, Steamer', purpose: 'Acid that drives the fizz.', safety: 'Eye/skin irritant — wear mask', source: 'Windy Point' },
  { name: 'Cornstarch', category: 'Dry', usedIn: 'Bath Bomb', purpose: 'Binder, silky feel, slows fizz.', safety: '—', source: 'Uline Canada' },
  { name: 'Kaolin Clay', category: 'Dry', usedIn: 'Shower Steamer', purpose: 'Binder and skin-soothing absorbent.', safety: 'Avoid inhaling dust', source: 'Windy Point' },
  { name: 'Arrowroot Powder', category: 'Dry', usedIn: 'Body Butter', purpose: 'Sets consistency, reduces greasiness.', safety: '—', source: 'Uline Canada' },
  { name: 'Polysorbate 80', category: 'Emulsifier', usedIn: 'Bath Bomb', purpose: 'Disperses oils, prevents oil ring.', safety: '—', source: 'Voyageur Soap & Candle' },
  { name: 'Witch Hazel', category: 'Liquid', usedIn: 'Bomb, Steamer', purpose: 'Binding mist that reactivates no fizz.', safety: '—', source: 'NDA / drugstore' },
  { name: 'Essential Oils', category: 'Fragrance', usedIn: 'All products', purpose: 'Natural scent + aromatherapy.', safety: 'Citrus = photo-sensitive; dilute; keep from eyes', source: 'NDA Canada' },
  { name: 'Fragrance Oils', category: 'Fragrance', usedIn: 'Soap, Scrub, Butter', purpose: 'Cosmetic-grade scent, strong throw.', safety: 'Use IFRA-compliant, skin-safe FOs', source: 'NDA Canada' },
  { name: 'Vitamin E Oil', category: 'Antioxidant', usedIn: 'Sugar Scrub', purpose: 'Preserves oils; conditions skin.', safety: '—', source: 'NDA Canada' },
  { name: 'Mica / Oxide Colorants', category: 'Colorant', usedIn: 'Soap, Bomb, Steamer, Scrub', purpose: 'Mica = shimmer, oxide = matte.', safety: 'Cosmetic-grade only', source: 'Windy Point' },
  { name: 'Sodium Lactate', category: 'Additive', usedIn: 'Soap (optional)', purpose: 'Hardens bars for easy unmolding.', safety: '—', source: 'Voyageur Soap & Candle' },
  { name: 'Distilled Water', category: 'Liquid', usedIn: 'Soap, Steamers', purpose: 'Lye solvent; prevents mineral reactions.', safety: '—', source: 'Grocery' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function parseCSVLine(line) {
  const out = []; let cur = ''; let q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { if (q && line[i + 1] === '"') { cur += '"'; i++; } else q = !q; }
    else if (c === ',' && !q) { out.push(cur); cur = ''; }
    else cur += c;
  }
  out.push(cur); return out;
}

function num(s) { const n = parseFloat(String(s).replace(/[^0-9.\-]/g, '')); return isNaN(n) ? null : n; }

function parseInventorySections(content) {
  const sections = [];
  for (const chunk of content.split(/={5,}/)) {
    const lines = chunk.split('\n').map(l => l.trim()).filter(l => l && !/^={5,}\s*$/.test(l));
    if (!lines.length) continue;
    const titleMatch = lines.find(l => /^TAB\s+\d+:/i.test(l));
    if (!titleMatch) continue;
    let header = null; const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const l = lines[i];
      if (!l.includes(',')) continue;
      if (/^Channel Options:|^All prices/.test(l)) continue;
      const cells = parseCSVLine(l);
      if (!header) header = cells;
      else if (cells.filter(c => c.trim()).length > 1) rows.push(cells);
    }
    if (header) sections.push({ title: titleMatch.replace(/^TAB\s+\d+:/i, '').trim(), header, rows });
  }
  return sections;
}

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------

function buildDashboard(invPath) {
  const content = fs.readFileSync(invPath, 'utf-8');
  const s = parseInventorySections(content);
  const get = t => s.find(x => x.title.toLowerCase().includes(t.toLowerCase()));
  const ing = get('INGREDIENT'), pack = get('PACKAGING'), fg = get('FINISHED'), sched = get('PRODUCTION');
  const PRICE = { CP: 5, HP: 5, BB: 5, SS: 8, SC: 5, LB: 2, WB: 7 };
  const today = new Date();

  const ingLow = [];
  let packLow = 0;
  const expiryWatch = [];
  let totalValue = 0, fgUnits = 0;
  const byProduct = {};

  if (ing && ing.header) {
    const H = ing.header;
    for (const r of ing.rows) {
      const rec = num(r[H.indexOf('Quantity Received')]) ?? 0;
      const used = num(r[H.indexOf('Quantity Used')]) ?? 0;
      const rem = num(r[H.indexOf('Quantity Remaining')]) ?? (rec - used);
      const reo = num(r[H.indexOf('Reorder Level')]) ?? 0;
      if (rem <= reo) ingLow.push({ name: r[H.indexOf('Ingredient')], rem, reo });
    }
  }
  if (pack && pack.header) {
    const H = pack.header;
    for (const r of pack.rows) {
      const rem = num(r[H.indexOf('Quantity Remaining')]) ?? (num(r[H.indexOf('Quantity Received')]) ?? 0);
      const reo = num(r[H.indexOf('Reorder Level')]) ?? 0;
      if (rem <= reo) packLow++;
    }
  }
  if (fg && fg.header) {
    const H = fg.header;
    for (const r of fg.rows) {
      const qty = num(r[H.indexOf('Quantity Produced')]) ?? 0;
      const code = r[H.indexOf('Batch Code')] || '';
      const p = PRICE[String(code).slice(0, 2)] || 0;
      totalValue += qty * p; fgUnits += qty;
      const key = String(code).slice(0, 2) || '?';
      byProduct[key] = (byProduct[key] || 0) + qty;
      const m = (r[H.indexOf('Expiry Date')] || '').match(/(\d{4})-(\d{2})-(\d{2})/);
      if (m) {
        const d = new Date(+m[1], +m[2] - 1, +m[3]);
        const days = Math.ceil((d - today) / 86400000);
        if (days <= 90 && days >= 0) expiryWatch.push({ code, name: r[H.indexOf('Product Name')], days });
        if (days < 0) expiryWatch.push({ code, name: r[H.indexOf('Product Name')], days, expired: true });
      }
    }
  }

  const planRows = [];
  let planUnits = 0;
  if (sched && sched.header) {
    const H = sched.header;
    for (const r of sched.rows) {
      const q = num(r[H.indexOf('Quantity to Produce')]) ?? 0;
      planUnits += q;
      planRows.push({ week: r[H.indexOf('Week')] || '', date: r[H.indexOf('Date')] || '', product: r[H.indexOf('Product')] || '', qty: q, status: r[H.indexOf('Status')] || 'Not started' });
    }
  }

  // Chart: potential revenue by product
  const prodNames = { CP: 'Soap', HP: 'Soap', BB: 'Bath Bomb', SS: 'Steamer', SC: 'Sugar Scrub', LB: 'Lip Balm', WB: 'Body Butter' };
  const chartData = Object.entries(byProduct).map(([k, q]) => ({ label: prodNames[k] || k, units: q, value: q * (PRICE[k] || 0) }));
  chartData.sort((a, b) => b.value - a.value);
  const maxVal = Math.max(...chartData.map(d => d.value), 1);

  // Donut: collections mix (primary mapping)
  const collectionCount = { 'Soft Glow': 12, 'Sweet Playful': 3, 'Reset Minimal': 4 };
  const donutTotal = Object.values(collectionCount).reduce((a, b) => a + b, 0);
  const COLORS = ['#8aab84', '#d99a9a', '#9aa7c4'];
  let donutOffset = 25;
  const donutSegs = Object.entries(collectionCount).map(([k, v]) => {
    const pct = v / donutTotal;
    const seg = `<circle class="donut-seg" cx="60" cy="60" r="48" fill="none" stroke-width="14"
      stroke-dasharray="${(pct * 301.6).toFixed(1)} ${301.6}" stroke-dashoffset="${donutOffset}"
      data-label="${esc(k)}" data-pct="${(pct * 100).toFixed(0)}"/>`;
    donutOffset -= pct * 301.6;
    return seg;
  }).join('');

  function kpi(label, value, sub, tone = '') {
    return `<div class="kpi ${tone}"><div class="kpi-value">${value}</div><div class="kpi-label">${esc(label)}</div>${sub ? `<div class="kpi-sub">${esc(sub)}</div>` : ''}</div>`;
  }

  let h = '<div class="page-head"><div><h2 class="page-title">Dashboard</h2><p class="page-sub">Operations overview · built from your inventory spreadsheet</p></div><span class="chip chip-soft">Updated ' + today.toLocaleDateString() + '</span></div>';

  h += '<div class="kpi-grid">';
  h += kpi('Products', '6', 'catalog product lines');
  h += kpi('FG Units', fgUnits.toLocaleString(), 'current inventory');
  h += kpi('Retail Value', '$' + totalValue.toLocaleString(), 'at catalog prices · CAD');
  h += kpi('Multi-Pack', '9', 'including sampler sets');
  const lowTone = ingLow.length ? 'warn' : '';
  h += kpi('Low Stock', ingLow.length, ingLow.length ? 'ingredients below reorder' : 'all levels healthy', lowTone);
  h += kpi('Packaging Low', packLow, packLow ? 'items below reorder' : 'all levels ok', packLow ? 'warn' : '');
  h += kpi('Expiry Watch', expiryWatch.length, expiryWatch.length ? 'due within 90 days' : 'nothing due soon', expiryWatch.length ? 'warn' : '');
  h += kpi('Plan Units', planUnits.toLocaleString(), 'across 14-day cycle');
  h += '</div>';

  // Charts row
  h += '<div class="grid-2">';

  h += '<div class="panel"><div class="panel-head"><h3>Potential Revenue by Product</h3><span class="chip">CAD</span></div><div class="chart-bars">';
  for (const d of chartData) {
    const w = Math.round((d.value / maxVal) * 100);
    h += `<div class="bar-row"><span class="bar-label">${esc(d.label)}</span><div class="bar-track"><div class="bar-fill" style="width:${w}%"></div></div><span class="bar-val">$${d.value.toLocaleString()}</span><span class="bar-units">${d.units} units</span></div>`;
  }
  h += '</div></div>';

  h += '<div class="panel"><div class="panel-head"><h3>Collection Mix</h3><span class="chip">primary mapping</span></div>';
  h += '<div class="donut-wrap"><svg class="donut" viewBox="0 0 120 120">' + donutSegs + '</svg><div class="donut-center"><div class="donut-total">' + donutTotal + '</div><div class="donut-cap">product-lines</div></div></div>';
  h += '<div class="legend">';
  for (const [k, v] of Object.entries(collectionCount)) {
    h += `<div class="legend-row"><span class="legend-dot" style="background:${COLORS[Object.keys(collectionCount).indexOf(k)]}"></span><span>${esc(k)}</span><span class="legend-val">${v}</span></div>`;
  }
  h += '</div></div>';
  h += '</div>';

  // Low stock
  h += '<div class="section-title"><h3>Low-Stock Alerts</h3></div>';
  if (ingLow.length) {
    h += '<div class="table-wrap"><table><thead><tr><th>Ingredient</th><th>Remaining</th><th>Reorder Level</th><th>Status</th></tr></thead><tbody>';
    for (const r of ingLow) h += `<tr><td>${esc(r.name)}</td><td class="num">${r.rem}</td><td class="num">${r.reo}</td><td><span class="chip chip-warn">Reorder soon</span></td></tr>`;
    h += '</tbody></table></div>';
  } else h += '<div class="empty-state">✓ No ingredients at or below reorder level</div>';

  // Expiry watch
  h += '<div class="section-title"><h3>Expiry Watch · next 90 days</h3></div>';
  if (expiryWatch.length) {
    expiryWatch.sort((a, b) => a.days - b.days);
    h += '<div class="table-wrap"><table><thead><tr><th>Batch</th><th>Product</th><th>Status</th></tr></thead><tbody>';
    for (const r of expiryWatch) {
      const chip = r.expired ? '<span class="chip chip-danger">Expired</span>' : (r.days <= 30 ? '<span class="chip chip-warn">' + r.days + ' days</span>' : '<span class="chip">' + r.days + ' days</span>');
      h += `<tr><td class="mono">${esc(r.code)}</td><td>${esc(r.name)}</td><td>${chip}</td></tr>`;
    }
    h += '</tbody></table></div>';
  } else h += '<div class="empty-state">✓ No finished goods expire within the next 90 days</div>';

  // Plan
  h += '<div class="section-title"><h3>Production Plan</h3></div>';
  h += '<div class="timeline">';
  for (const r of planRows) {
    const statusClass = r.status === 'Not started' ? 'st-neutral' : (r.status === 'Done' || r.status === 'Complete' ? 'st-done' : 'st-active');
    h += `<div class="tl-row"><span class="tl-date">${esc(r.date)}</span><div class="tl-body"><div class="tl-title">${esc(r.product)} <span class="chip chip-soft">${r.qty ? r.qty + ' units' : ''}</span></div><div class="tl-status"><span class="dot ${statusClass}"></span>${esc(r.status)}</div></div><span class="tl-week">${esc(r.week)}</span></div>`;
  }
  h += '</div>';

  return h;
}

// ---------------------------------------------------------------------------
// Catalog
// ---------------------------------------------------------------------------

function buildCatalog() {
  const collectionList = ['All', 'Soft Glow', 'Sweet Playful', 'Reset Minimal'];
  let h = '<div class="page-head"><div><h2 class="page-title">Catalog</h2><p class="page-sub">Product lines · formats · pricing (CAD)</p></div></div>';

  h += '<div class="chip-row">';
  for (const c of collectionList) h += `<button class="chip chip-filter active" data-filter="${esc(c)}">${esc(c)}</button>`;
  h += '</div>';

  h += '<div class="card-grid" id="catalogGrid">';
  for (const p of catalog) {
    const colls = p.collections.map(c => `<span class="chip chip-soft">${esc(c)}</span>`).join(' ');
    h += `<div class="product-card" data-colls="${esc(p.collections.join(','))}">
      <div class="product-top">
        <span class="product-icon">${p.icon}</span>
        <div class="product-price">$${p.price.toFixed(2)}<small> CAD</small></div>
      </div>
      <div class="product-name">${esc(p.name)}</div>
      <div class="product-meta">${esc(p.format)} · <span class="mono">${esc(p.type)}</span></div>
      <div class="prod-colls">${colls}</div>
      <div class="prod-detail"><svg class="i" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>${esc(p.batchSize)}</div>
      <div class="prod-detail"><svg class="i" viewBox="0 0 24 24"><path d="M12 3v18M5 6l7 3 7-3"/></svg>${esc(p.scents)}</div>
      <div class="prod-notes">${esc(p.notes)}</div>
    </div>`;
  }
  h += '</div>';

  h += '<div class="section-title"><h3>Pricing Reference</h3></div>';
  h += '<div class="table-wrap"><table><thead><tr><th>Product</th><th>Format</th><th>Retail</th><th>Wholesale 50%</th><th>Breakeven ceiling</th></tr></thead><tbody>';
  for (const p of catalog) h += `<tr><td>${esc(p.name)}</td><td>${esc(p.format)}</td><td class="num">$${p.price.toFixed(2)}</td><td class="num">$${(p.price * 0.5).toFixed(2)}</td><td class="num">$${(p.price * 0.5).toFixed(2)}</td></tr>`;
  h += '</tbody></table></div>';
  h += '<p class="hint">Update Sales Tracking in the inventory sheet to refine margins.</p>';
  return h;
}

// ---------------------------------------------------------------------------
// Glossary
// ---------------------------------------------------------------------------

function buildGlossary() {
  const cats = [...new Set(glossary.map(g => g.category))];
  let h = '<div class="page-head"><div><h2 class="page-title">Ingredient Glossary</h2><p class="page-sub">Everything used across the product line</p></div></div>';

  h += '<div class="chip-row" id="glossFilters"><button class="chip chip-filter active" data-filter="All">All</button>';
  for (const c of cats) h += `<button class="chip chip-filter" data-filter="${esc(c)}">${esc(c)}</button>`;
  h += '</div>';

  h += '<div class="gloss-grid">';
  for (const g of glossary) {
    h += `<div class="gloss-card" data-cat="${esc(g.category)}">
      <div class="gloss-head"><span class="gloss-name">${esc(g.name)}</span><span class="chip chip-soft">${esc(g.category)}</span></div>
      <div class="gloss-used"><svg class="i" viewBox="0 0 24 24"><path d="M5 8l7 3 7-3M5 12l7 3 7-3M5 16l7 3 7-3"/></svg>${esc(g.usedIn)}</div>
      <p class="gloss-purpose">${esc(g.purpose)}</p>
      <div class="gloss-foot"><span class="gloss-src">${esc(g.source)}</span></div>
      ${g.safety !== '—' ? `<div class="gloss-safety"><svg class="i" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>${esc(g.safety)}</div>` : ''}
    </div>`;
  }
  h += '</div>';
  return h;
}

// ---------------------------------------------------------------------------
// Doc renderers
// ---------------------------------------------------------------------------

function renderTxt(content) {
  const lines = content.split('\n');
  let h = ''; let inT = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const sep = /^\s*\|[\s\-:|]+\|\s*$/.test(line);
    if (/^\s*\|/.test(line) && !sep) {
      if (!inT) { inT = true; h += '<div class="table-wrap"><table>'; }
      const cells = line.split('|').slice(1, -1).map(c => c.trim());
      const isHead = lines[i + 1] && /^\s*\|[\s\-:|]+\|\s*$/.test(lines[i + 1]);
      if (isHead) { h += '<thead><tr>'; for (const c of cells) h += `<th>${esc(c)}</th>`; h += '</tr></thead><tbody>'; }
      else { h += '<tr>'; for (const c of cells) h += `<td>${esc(c)}</td>`; h += '</tr>'; }
    } else {
      if (inT) { h += '</tbody></table></div>'; inT = false; }
      if (line.startsWith('===')) h += '<hr class="sep">';
      else if (/^---/.test(line)) h += '<hr class="sep sub">';
      else if (/^[A-Z][A-Z &_()]{5,}$/.test(line.trim()) && line.trim().length > 5) h += `<h3 class="doc-h3">${esc(line.trim())}</h3>`;
      else if (line.trim() === '') h += '';
      else h += `<p class="doc-p">${esc(line)}</p>`;
    }
  }
  if (inT) h += '</tbody></table></div>';
  return h;
}

function renderCSVDoc(content) {
  let h = '';
  for (const chunk of content.split(/={5,}/)) {
    const lines = chunk.split('\n').map(l => l.trim()).filter(l => l);
    if (!lines.length) continue;
    const tm = lines.find(l => /^TAB\s+\d+:/i.test(l));
    if (tm) h += `<h3 class="doc-h3">${esc(tm)}</h3>`;
    const csv = lines.filter(l => l.includes(',') && !/^Channel Options:|^All prices/.test(l));
    const plain = lines.filter(l => !l.includes(',') && !/^TAB\s+\d+:/i.test(l) && !/^BUTTER & BLOOM/i.test(l) && !/^Standard Operating|^Effective|^Version|^This file|^INSTRUCTIONS/i.test(l));
    if (csv.length >= 2) {
      const header = parseCSVLine(csv[0]);
      const rows = csv.slice(1).map(l => { const c = parseCSVLine(l); return c.length >= Math.min(header.length, 3) ? c : null; }).filter(Boolean);
      if (rows.length) {
        h += '<div class="table-wrap"><table><thead><tr>';
        for (const x of header) h += `<th>${esc(x.trim())}</th>`;
        h += '</tr></thead><tbody>';
        for (const r of rows) {
          h += '<tr>';
          for (let c = 0; c < header.length; c++) {
            const v = r[c] !== undefined ? r[c].trim() : '';
            h += `<td${/^\$?[\d,]+(\.\d+)?$/.test(v) ? ' class="num"' : ''}>${esc(v)}</td>`;
          }
          h += '</tr>';
        }
        h += '</tbody></table></div>';
      }
    }
    for (const l of plain) {
      if (/^={5,}|^-+$/.test(l)) continue;
      if (/^[A-Z][A-Z &()]{5,}$/.test(l) && l.length > 5) h += `<h4 class="doc-h4">${esc(l)}</h4>`;
      else h += `<p class="doc-p">${esc(l)}</p>`;
    }
  }
  return h;
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

const I = {
  grid: '<svg class="i" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  box: '<svg class="i" viewBox="0 0 24 24"><path d="M21 8l-9-5-9 5v8l9 5 9-5V8z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
  drop: '<svg class="i" viewBox="0 0 24 24"><path d="M12 2l7 8a8 8 0 11-14 0z"/></svg>',
  file: '<svg class="i" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>',
  sun: '<svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg class="i" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>',
  search: '<svg class="i" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  print: '<svg class="i" viewBox="0 0 24 24"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z"/></svg>',
  pallete: '<svg class="i" viewBox="0 0 24 24"><path d="M12 2a10 10 0 000 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.4 0-1 .8-1.8 1.8-1.8H17a5 5 0 005-5c0-4.7-4.5-8.5-10-8.5z"/><circle cx="7.5" cy="10.5" r="1.2"/><circle cx="10" cy="6.5" r="1.2"/><circle cx="14.5" cy="6.5" r="1.2"/><circle cx="17" cy="10" r="1.2"/></svg>',
  home: '<svg class="i" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>',
};

// ---------------------------------------------------------------------------
// Assemble
// ---------------------------------------------------------------------------

const inventoryPath = path.join(DIR, '06_Inventory_Tracking_Spreadsheet.csv');
const dashboardHtml = buildDashboard(inventoryPath);
const catalogHtml = buildCatalog();
const glossaryHtml = buildGlossary();

const navMain = [
  { id: 's-dash', label: 'Dashboard', icon: I.grid, key: 'dash' },
  { id: 's-cat', label: 'Catalog', icon: I.box, key: 'cat' },
  { id: 's-gloss', label: 'Ingredients', icon: I.drop, key: 'gloss' },
];
const navDocs = docs.map((d, i) => ({ id: 's-doc-' + i, label: d.nav, icon: I.file, key: d.file }));

function navLink(n, idx) {
  return `<a class="nav-link" href="#${n.id}" data-nav="${n.id}"><span class="nav-ic">${n.icon}</span><span class="nav-txt">${n.label}</span></a>`;
}

let sections = '';
sections += `<section class="page" id="s-dash" data-title="Dashboard">${dashboardHtml}</section>`;
sections += `<section class="page" id="s-cat" data-title="Catalog">${catalogHtml}</section>`;
sections += `<section class="page" id="s-gloss" data-title="Ingredient Glossary">${glossaryHtml}</section>`;
for (let i = 0; i < docs.length; i++) {
  const d = docs[i];
  const raw = fs.readFileSync(path.join(DIR, d.file), 'utf-8');
  const body = d.file.endsWith('.csv') ? renderCSVDoc(raw) : renderTxt(raw);
  sections += `<section class="page" id="s-doc-${i}" data-title="${d.title}"><div class="page-head"><div><h2 class="page-title">${d.title}</h2></div></div>${body}</section>`;
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Butter & Bloom — Operations App</title>
<style>
  :root {
    --bg: #f4f2ee; --panel: #ffffff; --panel-2: #faf9f6;
    --text: #23231f; --muted: #8a887f; --line: #e5e3dc;
    --brand: #5e7a5a; --brand-strong: #3f5a3c; --brand-soft: #eef2ea;
    --accent: #c4a882; --accent-soft: #f6efe3;
    --warn: #b98a1f; --warn-bg: #fbf3dd; --danger: #b0413e; --danger-bg: #fbebea;
    --ok: #4b7a52;
    --shadow: 0 1px 2px rgba(28,28,24,.04), 0 4px 16px rgba(28,28,24,.05);
    --rad: 14px;
    --side-w: 244px;
  }
  [data-theme="dark"] {
    --bg: #171714; --panel: #20201c; --panel-2: #1b1b18;
    --text: #e8e7e2; --muted: #8f8d84; --line: #33332d;
    --brand: #8aab84; --brand-strong: #b0c9ab; --brand-soft: #2a3027;
    --accent: #c9b08a; --accent-soft: #302a22;
    --warn: #d9a83b; --warn-bg: #332b17; --danger: #e2807c; --danger-bg: #3a2422;
    --ok: #8fbf96;
    --shadow: 0 1px 2px rgba(0,0,0,.3), 0 4px 20px rgba(0,0,0,.35);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { height: 100%; }
  body {
    font-family: 'Segoe UI Variable', 'Segoe UI', system-ui, -apple-system, sans-serif;
    background: var(--bg); color: var(--text); line-height: 1.55;
    display: flex; height: 100vh; overflow: hidden; transition: background .25s;
  }
  svg { fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
  .i { width: 18px; height: 18px; flex-shrink: 0; display: inline-block; vertical-align: -3px; }
  .mono { font-family: 'Cascadia Code', Consolas, monospace; font-size: .86em; }

  /* ---------- Sidebar ---------- */
  .sidebar {
    width: var(--side-w); min-width: var(--side-w); height: 100%;
    background: linear-gradient(180deg, var(--brand-strong), var(--brand-strong));
    color: #eef1ec; display: flex; flex-direction: column;
    transition: width .25s, min-width .25s;
  }
  .side-top { padding: 1.25rem 1.25rem 1rem; display: flex; align-items: center; gap: .7rem; }
  .side-logo {
    width: 38px; height: 38px; border-radius: 11px; background: rgba(255,255,255,.14);
    display: grid; place-items: center; font-size: 20px; box-shadow: inset 0 0 0 1px rgba(255,255,255,.2);
  }
  .side-name h1 { font-size: 1.05rem; font-weight: 600; letter-spacing: .02em; color: #fff; }
  .side-name p { font-size: .7rem; opacity: .6; letter-spacing: .06em; text-transform: uppercase; }
  .side-label { font-size: .66rem; text-transform: uppercase; letter-spacing: .09em; color: rgba(255,255,255,.45); padding: .9rem 1.25rem .35rem; }
  .side-links { flex: 1; overflow-y: auto; padding: 0 .6rem; scrollbar-width: thin; }
  .nav-link {
    display: flex; align-items: center; gap: .72rem; padding: .52rem .7rem; margin-bottom: 2px;
    color: rgba(238,241,236,.78); text-decoration: none; font-size: .87rem; font-weight: 500;
    border-radius: 9px; transition: background .15s, color .15s, transform .1s;
  }
  .nav-link:hover { background: rgba(255,255,255,.1); color: #fff; }
  .nav-link.active { background: rgba(255,255,255,.18); color: #fff; box-shadow: inset 0 0 0 1px rgba(255,255,255,.12); }
  .nav-ic { display: grid; place-items: center; width: 22px; }
  .nav-link.collapsed-ic .nav-txt, .nav-link.collapsed-ic .side-label, .sidebar.collapsed .nav-txt, .sidebar.collapsed .side-label { display: none; }
  .side-foot { padding: 1rem 1.25rem; border-top: 1px solid rgba(255,255,255,.1); }
  .side-foot .row { display: flex; justify-content: space-between; align-items: center; }

  /* ---------- Main ---------- */
  .app-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
  .topbar {
    height: 62px; display: flex; align-items: center; gap: 1rem; padding: 0 1.5rem;
    border-bottom: 1px solid var(--line); background: var(--panel); backdrop-filter: blur(8px);
  }
  .crumb { display: flex; align-items: center; gap: .5rem; font-size: .85rem; color: var(--muted); min-width: 0; }
  .crumb b { color: var(--text); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .tb-search {
    margin-left: auto; display: flex; align-items: center; gap: .5rem;
    background: var(--panel-2); border: 1px solid var(--line); border-radius: 10px;
    padding: .42rem .8rem; min-width: 240px; color: var(--muted);
  }
  .tb-search:focus-within { border-color: var(--brand); box-shadow: 0 0 0 3px var(--brand-soft); }
  .tb-search input { border: none; outline: none; background: transparent; color: var(--text); font-size: .85rem; width: 100%; }
  .icon-btn {
    display: grid; place-items: center; width: 36px; height: 36px; border-radius: 9px;
    border: 1px solid var(--line); background: var(--panel); color: var(--text); cursor: pointer; transition: all .15s;
  }
  .icon-btn:hover { background: var(--brand-soft); color: var(--brand-strong); border-color: transparent; }
  .icon-btn .i { width: 17px; height: 17px; }

  .content { flex: 1; overflow-y: auto; padding: 1.75rem 2.25rem 4rem; max-width: 1180px; width: 100%; margin: 0 auto; }
  .page { display: none; animation: rise .28s ease; }
  .page.visible { display: block; }
  @keyframes rise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }

  .page-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
  .page-title { font-size: 1.55rem; font-weight: 650; letter-spacing: -.01em; }
  .page-sub { color: var(--muted); font-size: .86rem; margin-top: .15rem; }

  .chip { display: inline-flex; align-items: center; gap: .3rem; padding: .16rem .62rem; border-radius: 999px; font-size: .72rem; font-weight: 500; background: var(--panel-2); border: 1px solid var(--line); color: var(--muted); white-space: nowrap; }
  .chip-soft { background: var(--brand-soft); color: var(--brand-strong); border-color: transparent; }
  .chip-warn { background: var(--warn-bg); color: var(--warn); border-color: transparent; }
  .chip-danger { background: var(--danger-bg); color: var(--danger); border-color: transparent; }
  .chip-filter { cursor: pointer; transition: all .15s; padding: .3rem .8rem; font-size: .78rem; }
  .chip-filter.active { background: var(--brand-strong); color: #fff; border-color: transparent; }
  .chip--row { margin-bottom: 1rem; }

  /* KPIs */
  .kpi-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(168px, 1fr)); gap: .9rem; margin-bottom: 1.4rem; }
  .kpi { background: var(--panel); border: 1px solid var(--line); border-radius: var(--rad); padding: 1rem 1.1rem; box-shadow: var(--shadow); transition: transform .15s; }
  .kpi:hover { transform: translateY(-2px); }
  .kpi.warn { border-color: var(--warn); }
  .kpi-value { font-size: 1.55rem; font-weight: 700; letter-spacing: -.02em; color: var(--brand-strong); line-height: 1.1; font-variant-numeric: tabular-nums; }
  .kpi-label { font-size: .74rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: .05em; margin-top: .3rem; }
  .kpi-sub { font-size: .74rem; color: var(--muted); margin-top: .2rem; }

  .panel { background: var(--panel); border: 1px solid var(--line); border-radius: var(--rad); padding: 1.1rem 1.25rem; box-shadow: var(--shadow); }
  .panel-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: .85rem; }
  .panel-head h3 { font-size: .95rem; font-weight: 650; }
  .grid-2 { display: grid; grid-template-columns: 1.4fr 1fr; gap: 1rem; margin-bottom: 1.75rem; }
  .section-title { margin: .4rem 0 .75rem; display: flex; align-items: center; gap: .5rem; }
  .section-title h3 { font-size: 1rem; font-weight: 650; }

  /* Bars chart */
  .chart-bars { display: flex; flex-direction: column; gap: .6rem; }
  .bar-row { display: grid; grid-template-columns: 92px 1fr 74px 60px; gap: .6rem; align-items: center; font-size: .8rem; }
  .bar-label { font-weight: 500; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  .bar-track { background: var(--panel-2); border-radius: 6px; height: 12px; overflow: hidden; }
  .bar-fill { height: 100%; border-radius: 6px; background: linear-gradient(90deg, var(--brand), var(--accent)); transition: width .8s cubic-bezier(.22,1,.36,1); }
  .bar-val { text-align: right; font-weight: 600; font-variant-numeric: tabular-nums; }
  .bar-units { color: var(--muted); font-size: .74rem; text-align: right; }

  /* Donut */
  .donut-wrap { display: flex; justify-content: center; align-items: center; gap: 1.4rem; padding: .5rem 0; flex-wrap: wrap; }
  .donut { width: 128px; height: 128px; transform: rotate(-90deg); }
  .donut-seg { transition: stroke-dashoffset .8s; cursor: pointer; }
  .donut-seg:hover { stroke-width: 17; }
  .donut-center { font-variant-numeric: tabular-nums; text-align: center; margin-left: -128px; display: grid; place-items: center; }
  .donut-center::after { content: ''; }
  .donut-wrap .donut-center { position: absolute; }
  .legend { display: flex; flex-direction: column; gap: .35rem; font-size: .8rem; }
  .legend-row { display: flex; align-items: center; gap: .5rem; }
  .legend-dot { width: 10px; height: 10px; border-radius: 3px; }
  .legend-val { margin-left: auto; font-weight: 600; }

  /* Tables */
  .table-wrap { overflow-x: auto; border: 1px solid var(--line); border-radius: 12px; background: var(--panel); box-shadow: var(--shadow); }
  table { width: 100%; border-collapse: collapse; font-size: .84rem; }
  th, td { padding: .55rem .85rem; text-align: left; border-bottom: 1px solid var(--line); vertical-align: top; }
  th { font-size: .72rem; text-transform: uppercase; letter-spacing: .05em; color: var(--muted); font-weight: 600; background: var(--panel-2); white-space: nowrap; }
  tbody tr:last-child td { border-bottom: none; }
  tr:hover td { background: var(--accent-soft); }
  td.num { text-align: right; font-variant-numeric: tabular-nums; }

  .empty-state { background: var(--panel); border: 1px dashed var(--line); border-radius: 12px; padding: 1rem 1.25rem; color: var(--ok); font-size: .86rem; }

  /* Timeline */
  .timeline { background: var(--panel); border: 1px solid var(--line); border-radius: var(--rad); box-shadow: var(--shadow); padding: .5rem 1.1rem; }
  .tl-row { display: grid; grid-template-columns: 104px 1fr 64px; gap: .8rem; padding: .62rem 0; border-bottom: 1px solid var(--line); align-items: center; }
  .tl-row:last-child { border-bottom: none; }
  .tl-date { font-family: 'Cascadia Code', Consolas, monospace; font-size: .76rem; color: var(--muted); }
  .tl-title { font-size: .87rem; font-weight: 550; display: flex; align-items: center; gap: .5rem; flex-wrap: wrap; }
  .tl-status { font-size: .76rem; color: var(--muted); display: flex; align-items: center; gap: .4rem; }
  .tl-week { font-size: .76rem; color: var(--muted); text-align: right; }
  .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
  .st-neutral { background: var(--line); } .st-done { background: var(--ok); } .st-active { background: var(--warn); }

  /* Catalog cards */
  .chip-row { display: flex; gap: .5rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
  .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.1rem; margin-bottom: 1.75rem; }
  .product-card {
    background: var(--panel); border: 1px solid var(--line); border-radius: var(--rad); padding: 1.2rem 1.3rem;
    box-shadow: var(--shadow); transition: transform .15s, box-shadow .15s; display: flex; flex-direction: column; gap: .35rem;
  }
  .product-card:hover { transform: translateY(-3px); box-shadow: 0 6px 24px rgba(28,28,24,.09); }
  .product-top { display: flex; justify-content: space-between; align-items: center; }
  .product-icon { font-size: 26px; }
  .product-price { font-size: 1.3rem; font-weight: 700; color: var(--accent); } .product-price small { font-size: .7rem; color: var(--muted); font-weight: 500; }
  .product-name { font-size: 1.12rem; font-weight: 650; }
  .product-meta { font-size: .8rem; color: var(--muted); }
  .prod-colls { display: flex; gap: .35rem; flex-wrap: wrap; margin: .25rem 0; }
  .prod-detail { display: flex; align-items: center; gap: .45rem; font-size: .8rem; color: var(--text); }
  .prod-detail .i { width: 15px; height: 15px; color: var(--muted); }
  .prod-notes { font-size: .76rem; color: var(--muted); background: var(--brand-soft); border-radius: 8px; padding: .4rem .6rem; margin-top: .3rem; }

  /* Glossary */
  .gloss-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1rem; }
  .gloss-card { background: var(--panel); border: 1px solid var(--line); border-radius: var(--rad); padding: 1.05rem 1.2rem; box-shadow: var(--shadow); transition: transform .15s; }
  .gloss-card:hover { transform: translateY(-2px); }
  .gloss-head { display: flex; justify-content: space-between; align-items: center; gap: .5rem; margin-bottom: .4rem; }
  .gloss-name { font-weight: 650; font-size: .96rem; }
  .gloss-used { font-size: .78rem; color: var(--brand-strong); display: flex; align-items: center; gap: .4rem; }
  .gloss-used .i { width: 14px; height: 14px; }
  .gloss-purpose { font-size: .83rem; margin-top: .25rem; }
  .gloss-foot { margin-top: .5rem; display: flex; align-items: center; justify-content: space-between; }
  .gloss-src { font-size: .72rem; color: var(--muted); }
  .gloss-safety { display: flex; align-items: flex-start; gap: .4rem; font-size: .76rem; color: var(--warn); background: var(--warn-bg); border-radius: 8px; padding: .4rem .6rem; margin-top: .5rem; }
  .gloss-safety .i { width: 14px; height: 14px; margin-top: 1px; flex-shrink: 0; }

  /* Doc rendering */
  .doc-h3 { font-size: 1.02rem; font-weight: 650; color: var(--brand-strong); margin: 1.6rem 0 .6rem; padding-bottom: .35rem; border-bottom: 1px solid var(--line); display: flex; align-items: center; gap: .4rem; }
  .doc-h3::before { content: ''; width: 4px; height: 14px; border-radius: 2px; background: var(--accent); display: inline-block; }
  .doc-h4 { font-size: .92rem; font-weight: 600; color: var(--brand); margin: 1.1rem 0 .35rem; }
  .doc-p { font-size: .87rem; margin: .25rem 0; }
  hr.sep { border: none; border-top: 1px solid var(--line); margin: 1.6rem 0; }
  hr.sep.sub { margin: 1rem 0; border-top-style: dashed; }
  .page .table-wrap { margin: .75rem 0; }

  .hint { font-size: .78rem; color: var(--muted); margin-top: .9rem; }

  /* Mobile bottom nav */
  .bottom-nav { display: none; }
  @media (max-width: 860px) {
    body { flex-direction: column; overflow: hidden; }
    .sidebar { width: 100%; height: auto; flex-direction: row; align-items: center; padding: 0 .75rem; border-bottom: 1px solid rgba(255,255,255,.12); }
    .side-top { padding: .6rem .5rem; }
    .side-name, .side-label, .side-links, .side-foot { display: none; }
    .app-main { flex: 1; }
    .content { padding: 1.25rem 1rem 6rem; }
    .grid-2 { grid-template-columns: 1fr; }
    .bottom-nav {
      position: fixed; bottom: 0; left: 0; right: 0; height: 58px; display: flex;
      background: var(--panel); border-top: 1px solid var(--line); z-index: 50;
    }
    .b-nav-item { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; color: var(--muted); text-decoration: none; font-size: .62rem; font-weight: 550; }
    .b-nav-item.active { color: var(--brand-strong); }
    .tl-row { grid-template-columns: 82px 1fr; } .tl-week { display: none; }
  }

  ::-webkit-scrollbar { width: 10px; height: 10px; }
  ::-webkit-scrollbar-thumb { background: var(--line); border-radius: 8px; border: 2px solid var(--bg); }
  ::-webkit-scrollbar-thumb:hover { background: var(--muted); }

  .highlight { background: var(--accent-soft); outline: 2px solid var(--accent); border-radius: 3px; padding: 0 1px; }
</style>
</head>
<body>

<aside class="sidebar" id="sidebar">
  <div class="side-top">
    <div class="side-logo">🌿</div>
    <div class="side-name"><h1>Butter &amp; Bloom</h1><p>Operations</p></div>
  </div>
  <div class="side-label">At a glance</div>
  <div class="side-links" id="sideLinks">
    ${navMain.map(navLink).join('')}
    <div class="side-label" style="padding-bottom:.35rem">Documents</div>
    ${navDocs.map(navLink).join('')}
  </div>
  <div class="side-foot">
    <div class="row"><span class="chip chip-soft" style="opacity:.85">🌿 6 product lines</span></div>
  </div>
</aside>

<main class="app-main">
  <header class="topbar">
    <button class="icon-btn" id="collapseBtn" title="Collapse sidebar">
      <svg class="i" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>
    </button>
    <div class="crumb"><span class="chip chip-soft">Ops app</span><span>/</span><b id="crumbTitle">Dashboard</b></div>
    <div class="tb-search">
      <span style="display:grid;place-items:center">${I.search}</span>
      <input type="text" id="search" placeholder="Search everything…" autocomplete="off">
    </div>
    <button class="icon-btn" id="themeBtn" title="Toggle dark mode">
      ${I.moon}
    </button>
    <button class="icon-btn" onclick="window.print()" title="Print section">${I.print}</button>
  </header>

  <div class="content">
    ${sections}
  </div>
</main>

<nav class="bottom-nav">
  ${navMain.map(n => `<a class="b-nav-item" href="#${n.id}" data-nav="${n.id}">${n.icon}<span>${n.label}</span></a>`).join('')}
  <a class="b-nav-item" href="#s-doc-0" data-nav="s-doc-0">${I.file}<span>Docs</span></a>
</nav>

<script>
  const pages = document.querySelectorAll('.page');
  const links = document.querySelectorAll('[data-nav]');
  const bottomItems = document.querySelectorAll('.b-nav-item');
  const crumb = document.getElementById('crumbTitle');

  function show(id) {
    pages.forEach(p => { p.classList.toggle('visible', p.id === id); });
    links.forEach(l => { l.classList.toggle('active', l.dataset.nav === id); });
    bottomItems.forEach(b => { b.classList.toggle('active', b.dataset.nav === id); });
    const page = document.getElementById(id);
    if (page) crumb.textContent = page.dataset.title;
    document.querySelector('.content').scrollTop = 0;
    localStorage.setItem('bb-page', id);
  }
  links.forEach(l => l.addEventListener('click', e => {
    const id = l.dataset.nav;
    if (id) { e.preventDefault(); show(id); history.pushState(null, '', '#' + id); }
  }));

  const initHash = (location.hash || '').replace('#', '');
  const saved = localStorage.getItem('bb-page');
  show(document.getElementById(initHash) ? initHash : (document.getElementById(saved) ? saved : 's-dash'));

  window.addEventListener('popstate', () => { const h = (location.hash || '').replace('#', ''); if (document.getElementById(h)) show(h); });

  // Collapse sidebar (desktop)
  const sidebar = document.getElementById('sidebar');
  document.getElementById('collapseBtn').addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    if (document.documentElement.clientWidth > 860) {
      sidebar.style.width = sidebar.classList.contains('collapsed') ? '64px' : 'var(--side-w)';
      sidebar.style.minWidth = sidebar.classList.contains('collapsed') ? '64px' : 'var(--side-w)';
      document.querySelectorAll('.nav-txt, .side-label, .side-name, .side-foot').forEach(el => { el.style.display = sidebar.classList.contains('collapsed') ? 'none' : ''; });
    }
  });

  // Theme
  const themeBtn = document.getElementById('themeBtn');
  function applyTheme(t) { document.documentElement.dataset.theme = t; themeBtn.innerHTML = t === 'dark'
    ? '<svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
    : '<svg class="i" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>'; }
  applyTheme(localStorage.getItem('bb-theme') || 'light');
  themeBtn.addEventListener('click', () => { const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; applyTheme(t); localStorage.setItem('bb-theme', t); });

  // Search
  let matchId = null;
  document.getElementById('search').addEventListener('input', function () {
    const q = this.value.toLowerCase().trim();
    document.querySelectorAll('.highlight').forEach(el => { el.outerHTML = el.textContent; });
    if (!q) { if (matchId) { show(matchId); matchId = null; } return; }
    for (const p of pages) {
      const text = p.textContent.toLowerCase();
      if (text.includes(q)) {
        if (p.id !== matchId) { show(p.id); matchId = p.id; }
        const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT, null, false);
        let node;
        const targets = [];
        while (node = walker.nextNode()) {
          const lower = node.textContent.toLowerCase(); let pos = lower.indexOf(q);
          while (pos !== -1) { targets.push({ node, pos }); pos = lower.indexOf(q, pos + 1); }
        }
        if (targets.length) {
          targets.slice(0, 20).forEach(({ node, pos }) => {
            const span = document.createElement('mark'); span.className = 'highlight';
            const range = document.createRange();
            range.setStart(node, pos); range.setEnd(node, pos + q.length);
            range.surroundContents(span);
          });
        }
        const first = document.querySelector('.highlight');
        if (first) first.scrollIntoView({ block: 'center', behavior: 'smooth' });
        return;
      }
    }
    // no matches
    if (matchId) { matchId = null; }
  });

  // Catalog filter
  const filters = document.querySelectorAll('.chip-filter');
  const glossCats = document.querySelectorAll('.gloss-card');
  const catCards = document.querySelectorAll('.product-card');
  filters.forEach(f => f.addEventListener('click', () => {
    const wrap = f.parentElement;
    wrap.querySelectorAll('.chip-filter').forEach(x => x.classList.remove('active'));
    f.classList.add('active');
    const val = f.dataset.filter;
    const isCat = wrap.id === 'glossFilters';
    (isCat ? glossCats : catCards).forEach(el => {
      const group = isCat ? el.dataset.cat : el.dataset.colls;
      el.style.display = (val === 'All' || (group || '').includes(val)) ? '' : 'none';
    });
  }));
</script>
</body>
</html>`;

fs.writeFileSync(path.join(DIR, 'site.html'), html, 'utf-8');
console.log(`Built site.html (${(html.length / 1024).toFixed(1)} KB) via build_site.js`);