'use strict';

// ── DATA ───────────────────────────────────────────────────────────────
const EQUITY = {
  labels: ['Jan 20','Jan 21','Jan 22','Jan 23','Jan 24','Jan 25','Mar 26'],
  v10: [100000, 140000, 182000, 107000, 168000, 229000, 234000],
  v20: [100000, 148000, 195000, 104000, 172000, 234000, 247000],
  v30: [100000, 130000, 167000, 107000, 185000, 190000, 193000],
  v40: [100000, 151000, 193000, 186000, 312000, 360000, 366000],
  v50: [100000, 137000, 180000, 122000, 200000, 224000, 227000],
};

const ANNUAL_WR = {
  labels: ['2020','2021','2022','2023','2024','2025'],
  v10: [50, 36, 20, 66, 44, null],
  v20: [67, 41, 31, 64, 51, 59],
  v30: [null, 66, 36, 79, 61, 64],
  v40: [0, 55, 43, 65, 57, 90],
  v50: [25, 62, 45, 67, 62, 44],
};

const ANNUAL_RET = {
  labels: ['2020','2021','2022','2023','2024','2025'],
  v10: [40, 180, -48, 568, 58, null],
  v20: [74, 370, -45, 622, 118, 507],
  v30: [null, 237, -87, 658, 171, 55],
  v40: [-10, 435, -4, 1087, 417, 99],
  v50: [-19, 318, -50, 730, 273, 69],
};

const HEATMAP_DATA = {
  Jan:  { v10:50,  v20:0,  v30:22, v40:27, v50:null, label:'SKIP 2.0/3.0/4.0' },
  Feb:  { v10:20,  v20:40, v30:29, v40:78, v50:75,   label:'4.0: 110% size' },
  Mar:  { v10:null,v20:null,v30:75,v40:75, v50:84,   label:'3.0/4.0/5.0: 110%' },
  Apr:  { v10:90,  v20:null,v30:null,v40:54,v50:42,  label:'1.0: 110%' },
  May:  { v10:null,v20:64, v30:47, v40:33, v50:40,   label:'2.0: 110%, skip 4.0' },
  Jun:  { v10:38,  v20:61, v30:null,v40:null,v50:null,label:'2.0 standard' },
  Jul:  { v10:54,  v20:null,v30:81, v40:85, v50:64,  label:'3.0+4.0: 120%' },
  Aug:  { v10:null,v20:null,v30:81, v40:64, v50:66,  label:'3.0: 120%' },
  Sep:  { v10:null,v20:82, v30:80, v40:null,v50:75,  label:'2.0+3.0: 120%' },
  Oct:  { v10:null,v20:null,v30:50, v40:60, v50:42,  label:'Standard 100%' },
  Nov:  { v10:12,  v20:26, v30:null,v40:48, v50:null,label:'SKIP 1.0/2.0' },
  Dec:  { v10:null,v20:null,v30:67, v40:30, v50:36,  label:'3.0 standard, skip 4.0' },
};

const SECTOR_EV = {
  '4': { XLF:15.4, XLK:11.2, XLE:10.5, XLI:9.5,  XLY:6.6,  XLV:3.2,  XLB:3.3  },
  '3': { XLK:14.0, XLE:10.9, XLF:10.5, XLY:7.3,  XLY2:4.1, XLB:1.7,  XLV:-0.7, XLI:-2.0 },
  '35':{ XLE:8.9,  XLK:8.7,  XLF:5.9,  XLV:5.8,  XLY:4.6,  XLY2:2.4, XLI:1.8,  XLB:0.2  },
  '2': { XLY:12.0, XLK:11.0, XLV:9.0,  XLE:6.1,  XLF:5.4,  XLY2:5.1, XLB:0.9,  XLI:2.1  },
  '1': { XLK:12.9, XLY:9.3,  XLF:8.4,  XLE:2.7,  XLY2:2.6, XLV:0.5,  XLB:-2.0 },
};

const MONTH_STRONG = {
  '4': [7,2,3], '3': [8,9,3], '35': [3,7,8], '2': [9,5,6], '1': [4,7,1]
};
const MONTH_WEAK = {
  '4': [1,12,5], '3': [1,2,12], '35': [12,5,4], '2': [1,11,2], '1': [11,2,6]
};

const RS_SCORE_TABLE = {
  '4':  { 2:4, 7:3, 15:2, 25:1, 50:1, 75:1, 90:1 },
  '3':  { 2:1, 7:3, 15:4, 25:3, 50:2, 75:1, 90:1 },
  '35': { 2:4, 7:3, 15:2, 25:3, 50:2, 75:1, 90:1 },
  '2':  { 2:3, 7:3, 15:2, 25:2, 50:1, 75:2, 90:3 },
  '1':  { 2:1, 7:1, 15:1, 25:1, 50:1, 75:2, 90:3 },
};

const GRADE_META = [
  null,
  { label:'Minimum Viable',     wr:'45–49%', ev:'+0–1% avg',  cls:'gd1' },
  { label:'Below Average',      wr:'45–54%', ev:'+1–5% avg',  cls:'gd2' },
  { label:'Standard Entry',     wr:'55–69%', ev:'+5–9% avg',  cls:'gd3' },
  { label:'High Quality Entry', wr:'70–84%', ev:'+9–14% avg', cls:'gd4' },
  { label:'Tier 1 Entry',       wr:'≥85%',   ev:'+14–22% avg',cls:'gd5' },
];
const STARS = ['','★☆☆☆☆','★★☆☆☆','★★★☆☆','★★★★☆','★★★★★'];

let signalLog = [];
let signalIdCounter = 1;
const LOG_KEY = 'cosky_signals';

// ── INIT ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  animateCounters();
  initCharts();
  buildHeatmap();
  initTabs();
  calcCoskyGrade();
  loadLog();
  renderLog();
});

// ── NAV ────────────────────────────────────────────────────────────────
function initNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  toggle?.addEventListener('click', () => links.classList.toggle('open'));
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
    highlightNav();
  });
  document.querySelectorAll('.nav-a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

function highlightNav() {
  const sections = document.querySelectorAll('.section');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  document.querySelectorAll('.nav-a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

// ── COUNTERS ───────────────────────────────────────────────────────────
function animateCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const dec    = parseInt(el.dataset.dec) || 0;
      const dur = 1600;
      const start = performance.now();
      const fmt = n => prefix + (n >= 1000 ? n.toLocaleString('en-US', {maximumFractionDigits:dec}) : dec>0 ? n.toFixed(dec) : Math.round(n).toString()) + suffix;
      const step = now => {
        const p = Math.min((now - start) / dur, 1);
        const e2 = 1 - Math.pow(1 - p, 4);
        el.textContent = fmt(target * e2);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = fmt(target);
      };
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.stat-num').forEach(el => obs.observe(el));
}

// ── CHARTS ─────────────────────────────────────────────────────────────
function initCharts() {
  drawEquity();
  drawAnnualWR();
  drawAnnualRet();
}

const PALETTE = {
  v10: { line:'#FF9F40', bg:'rgba(255,159,64,0.06)' },
  v20: { line:'#4B9FFF', bg:'rgba(75,159,255,0.06)' },
  v30: { line:'#9B6BF5', bg:'rgba(155,107,245,0.06)' },
  v40: { line:'#00D4A0', bg:'rgba(0,212,160,0.08)' },
  v50: { line:'#F59E0B', bg:'rgba(245,158,11,0.06)' },
};

const chartDefaults = {
  responsive: true, maintainAspectRatio: false,
  interaction: { mode:'index', intersect:false },
  plugins: {
    legend: { labels: { color:'#7DB89C', font:{family:'Space Mono',size:10}, boxWidth:12, padding:14 } },
    tooltip: {
      backgroundColor:'#0B2218', borderColor:'#123D27', borderWidth:1,
      titleColor:'#D4EDE5', bodyColor:'#7DB89C',
    }
  },
  scales: {
    x: { grid:{ color:'rgba(18,61,39,0.5)' }, ticks:{ color:'#3D7A60', font:{family:'Space Mono',size:9} } },
    y: { grid:{ color:'rgba(18,61,39,0.5)' }, ticks:{ color:'#3D7A60', font:{family:'Space Mono',size:9} } }
  }
};

function drawEquity() {
  const ctx = document.getElementById('equityChart')?.getContext('2d');
  if (!ctx) return;
  const fmt = v => v >= 1000 ? '$'+(v/1000).toFixed(0)+'K' : '$'+v;
  new Chart(ctx, {
    type:'line',
    data: {
      labels: EQUITY.labels,
      datasets: [
        { label:'4.0 Dark Horse', data:EQUITY.v40, borderColor:PALETTE.v40.line, borderWidth:3, pointRadius:3, tension:0.4, fill:false },
        { label:'2.0 Regime+VCP', data:EQUITY.v20, borderColor:PALETTE.v20.line, borderWidth:2, pointRadius:2, tension:0.4, fill:false },
        { label:'5.0 Phoenix',    data:EQUITY.v50, borderColor:PALETTE.v50.line, borderWidth:2, pointRadius:2, tension:0.4, fill:false },
        { label:'3.0 RS Reversal',data:EQUITY.v30, borderColor:PALETTE.v30.line, borderWidth:2, pointRadius:2, tension:0.4, fill:false },
        { label:'1.0 RS High',    data:EQUITY.v10, borderColor:PALETTE.v10.line, borderWidth:1.5, borderDash:[5,3], pointRadius:2, tension:0.4, fill:false },
      ]
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        tooltip: {
          ...chartDefaults.plugins.tooltip,
          callbacks: { label: c => ` ${c.dataset.label}: ${fmt(c.parsed.y)}` }
        }
      },
      scales: {
        x: chartDefaults.scales.x,
        y: { ...chartDefaults.scales.y, ticks: { ...chartDefaults.scales.y.ticks, callback: v => fmt(v) } }
      }
    }
  });
}

function drawAnnualWR() {
  const ctx = document.getElementById('annualWRChart')?.getContext('2d');
  if (!ctx) return;
  new Chart(ctx, {
    type:'bar',
    data: {
      labels: ANNUAL_WR.labels,
      datasets: [
        { label:'4.0', data:ANNUAL_WR.v40, backgroundColor:'rgba(0,212,160,0.6)', borderColor:'#00D4A0', borderWidth:1, borderRadius:3 },
        { label:'3.0', data:ANNUAL_WR.v30, backgroundColor:'rgba(155,107,245,0.5)', borderColor:'#9B6BF5', borderWidth:1, borderRadius:3 },
        { label:'2.0', data:ANNUAL_WR.v20, backgroundColor:'rgba(75,159,255,0.5)', borderColor:'#4B9FFF', borderWidth:1, borderRadius:3 },
        { label:'1.0', data:ANNUAL_WR.v10, backgroundColor:'rgba(255,159,64,0.5)', borderColor:'#FF9F40', borderWidth:1, borderRadius:3 },
      ]
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        title: { display:true, text:'Annual Win Rate (%)', color:'#7DB89C', font:{family:'Space Mono',size:11} }
      },
      scales: {
        x: chartDefaults.scales.x,
        y: { ...chartDefaults.scales.y, ticks: { ...chartDefaults.scales.y.ticks, callback: v => v+'%' }, max:100 }
      }
    }
  });
}

function drawAnnualRet() {
  const ctx = document.getElementById('annualRetChart')?.getContext('2d');
  if (!ctx) return;
  new Chart(ctx, {
    type:'bar',
    data: {
      labels: ANNUAL_RET.labels,
      datasets: [
        { label:'4.0', data:ANNUAL_RET.v40, backgroundColor:ANNUAL_RET.v40.map(v=>(v>=0)?'rgba(0,212,160,0.65)':'rgba(239,68,68,0.5)'), borderRadius:3 },
        { label:'3.0', data:ANNUAL_RET.v30, backgroundColor:ANNUAL_RET.v30.map(v=>(v>=0)?'rgba(155,107,245,0.55)':'rgba(239,68,68,0.4)'), borderRadius:3 },
        { label:'2.0', data:ANNUAL_RET.v20, backgroundColor:ANNUAL_RET.v20.map(v=>(v>=0)?'rgba(75,159,255,0.55)':'rgba(239,68,68,0.4)'), borderRadius:3 },
      ]
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        title: { display:true, text:'Annual Net P&L (%)', color:'#7DB89C', font:{family:'Space Mono',size:11} }
      },
      scales: {
        x: chartDefaults.scales.x,
        y: { ...chartDefaults.scales.y, ticks: { ...chartDefaults.scales.y.ticks, callback: v => v+'%' } }
      }
    }
  });
}

// ── HEATMAP ────────────────────────────────────────────────────────────
function buildHeatmap() {
  const wrap = document.getElementById('coskyHeatmap');
  if (!wrap) return;

  Object.entries(HEATMAP_DATA).forEach(([month, data]) => {
    const wrs = [data.v10, data.v20, data.v30, data.v40, data.v50].filter(v => v !== null);
    const avg = wrs.length ? wrs.reduce((a,b)=>a+b,0)/wrs.length : 50;
    const norm = (avg - 20) / 70;
    const alpha = Math.max(0.08, Math.min(0.5, 0.08 + norm * 0.42));
    const isStrong = avg >= 70;
    const isWeak   = avg < 40;

    const versions = ['1.0','2.0','3.0','4.0','5.0'];
    const vals = [data.v10, data.v20, data.v30, data.v40, data.v50];
    const summary = versions
      .map((v,i) => vals[i] !== null ? `${v}:${vals[i]}%` : null)
      .filter(Boolean).join(' · ');

    const cell = document.createElement('div');
    cell.className = 'hm-cell';
    cell.style.background = isStrong
      ? `rgba(0,212,160,${alpha})`
      : isWeak
        ? `rgba(239,68,68,${alpha * 0.7})`
        : `rgba(155,107,245,${alpha * 0.6})`;
    cell.style.borderColor = isStrong
      ? `rgba(0,212,160,${alpha + 0.1})`
      : isWeak
        ? `rgba(239,68,68,0.15)`
        : `rgba(18,61,39,1)`;
    cell.innerHTML = `
      <span class="hm-month">${month}</span>
      <span class="hm-ver-list">${isStrong ? '★ Strong' : isWeak ? '✗ Weak' : 'Neutral'}</span>
      <div class="hm-tip">${summary}<br>${data.label}</div>
    `;
    wrap.appendChild(cell);
  });
}

// ── TABS ───────────────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      btn.closest('.section, .section-alt').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.closest('.section, .section-alt').querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + tab)?.classList.add('active');
    });
  });
}

// ── GRADE SWITCHER ─────────────────────────────────────────────────────
function switchTrack(track) {
  document.getElementById('entryTrack').style.display = track === 'entry' ? 'block' : 'none';
  document.getElementById('liveTrack').style.display  = track === 'live'  ? 'block' : 'none';
  document.getElementById('trackEntryBtn').classList.toggle('active', track === 'entry');
  document.getElementById('trackLiveBtn').classList.toggle('active', track === 'live');
}

// ── COSKY GRADE CALCULATOR ─────────────────────────────────────────────
function calcCoskyGrade() {
  const version  = document.getElementById('gc-version')?.value  || '4';
  const sector   = document.getElementById('gc-sector')?.value   || 'XLF';
  const month    = parseInt(document.getElementById('gc-month')?.value  || '7');
  const rsRank   = parseInt(document.getElementById('gc-rsrank')?.value || '2');
  const regime   = parseInt(document.getElementById('gc-regime')?.value || '4');

  // 1. Version base
  const vScore = { '4':4, '3':3, '35':3, '2':2, '1':1 }[version] || 2;

  // 2. Sector EV score
  const secEVs = SECTOR_EV[version] || {};
  const secEV  = secEVs[sector] || 2;
  const allEVs = Object.values(secEVs);
  const maxEV  = Math.max(...allEVs);
  const sortedEVs = [...allEVs].sort((a,b) => b-a);
  let sScore = 1;
  if (secEV < 0) sScore = 0;
  else if (secEV >= sortedEVs[0]) sScore = 4;
  else if (secEV >= sortedEVs[1]) sScore = 3;
  else if (secEV >= sortedEVs[2]) sScore = 2;
  else sScore = 1;

  // 3. Month score
  const strong = MONTH_STRONG[version] || [7,8,9];
  const weak   = MONTH_WEAK[version]   || [1,2];
  let mScore = 2;
  if (strong.includes(month)) mScore = 4;
  else if (weak.includes(month)) mScore = 1;

  // 4. RS rank score
  const rsTable = RS_SCORE_TABLE[version] || {};
  const rScore = rsTable[rsRank] ?? 2;

  // 5. Regime score (already numeric from select)
  const regScore = regime;

  const total = vScore + sScore + mScore + rScore + regScore;

  let grade;
  if (total >= 15) grade = 5;
  else if (total >= 12) grade = 4;
  else if (total >= 9)  grade = 3;
  else if (total >= 6)  grade = 2;
  else grade = 1;

  const meta = GRADE_META[grade];

  // Update display
  const disp = document.getElementById('coskyGradeDisplay');
  if (disp) {
    disp.className = 'grade-display ' + meta.cls;
    document.getElementById('cGradeStars').textContent = STARS[grade];
    document.getElementById('cGradeNum').textContent = grade;
    document.getElementById('cGradeLabel').textContent = meta.label;
    document.getElementById('cGradeScore').textContent = total;
    document.getElementById('cGradeWR').textContent = 'Win Rate: ' + meta.wr;
    document.getElementById('cGradeEV').textContent  = 'EV: ' + meta.ev;
  }

  // Breakdown
  const dims = [
    { name:'Version',  score:vScore,   max:4 },
    { name:'Sector',   score:sScore,   max:4 },
    { name:'Month',    score:mScore,   max:4 },
    { name:'RS Rank',  score:rScore,   max:4 },
    { name:'Regime',   score:regScore, max:4 },
  ];
  const bd = document.getElementById('cDimBreakdown');
  if (bd) {
    const gradeColor = ['var(--red)','var(--red)','var(--amber)','var(--purple-lt)','var(--green)','var(--teal-lt)'][grade];
    bd.innerHTML = dims.map(d => `
      <div class="dim-row">
        <span class="dim-name">${d.name}</span>
        <div class="dim-bar-wrap"><div class="dim-bar" style="width:${(d.score/d.max)*100}%;background:${d.score>=3?'var(--teal)':'var(--border-lt)'}"></div></div>
        <span class="dim-score" style="color:${d.score>=3?'var(--teal-lt)':'var(--text-mid)'}">${d.score}/${d.max}</span>
      </div>
    `).join('') + `
      <div class="dim-total">
        <span style="color:var(--text-dim)">Total</span>
        <span style="color:${gradeColor};font-family:var(--mono)">${total} / 20</span>
      </div>
    `;
    if (sScore <= 0) {
      bd.innerHTML += `<div style="font-size:11px;color:var(--red);padding:6px 0">⚠ ${sector} has negative EV for version ${version === '35' ? '5.0' : version + '.0'} — consider a different sector.</div>`;
    }
  }

  // Sector EV reference
  const sRef = document.getElementById('sectorEVRef');
  if (sRef && secEV !== undefined) {
    const evColor = secEV < 0 ? 'var(--red)' : secEV >= 10 ? 'var(--teal-lt)' : 'var(--text-mid)';
    sRef.innerHTML = `<span style="color:var(--text-dim);font-family:var(--mono);font-size:11px">
      ${sector} EV for ${version === '35' ? '5.0' : version+'.0'}: 
      <strong style="color:${evColor}">${secEV > 0 ? '+' : ''}${secEV}%</strong>
      ${secEV < 0 ? '  ← Negative EV — skip' : secEV >= 10 ? '  ← Top-tier sector' : ''}
    </span>`;
  }
}

// ── SIGNAL LOG ─────────────────────────────────────────────────────────
function loadLog() {
  try {
    const saved = localStorage.getItem(LOG_KEY);
    if (saved) {
      signalLog = JSON.parse(saved);
      signalIdCounter = signalLog.reduce((max,s) => {
        const n = parseInt(s.id?.replace('C-','') || 0);
        return n >= max ? n+1 : max;
      }, 1);
    }
  } catch(e) { signalLog = []; }
}

function saveLog() {
  try { localStorage.setItem(LOG_KEY, JSON.stringify(signalLog)); } catch(e) {}
}

function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('signalModal').classList.add('open');
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  document.getElementById('m-dt').value = now.toISOString().slice(0,16);
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.getElementById('signalModal').classList.remove('open');
}

function saveSignal() {
  const entry = parseFloat(document.getElementById('m-entry').value);
  const stop  = entry ? parseFloat((entry * 0.93).toFixed(2)) : '';
  const risk  = entry && stop ? entry - stop : 0;
  const tp1   = risk ? parseFloat((entry + 2 * risk).toFixed(2)) : '';

  if (!document.getElementById('m-stop').value && stop) {
    document.getElementById('m-stop').value = stop;
  }
  if (!document.getElementById('m-tp1').value && tp1) {
    document.getElementById('m-tp1').value = tp1;
  }

  const sig = {
    id:       'C-' + String(signalIdCounter++).padStart(3,'0'),
    dt:       document.getElementById('m-dt').value.replace('T',' '),
    version:  document.getElementById('m-version').value,
    ticker:   document.getElementById('m-ticker').value,
    sector:   document.getElementById('m-sector').value,
    grade:    document.getElementById('m-grade').value,
    tier:     document.getElementById('m-tier').value,
    rsrank:   document.getElementById('m-rsrank').value,
    entry:    document.getElementById('m-entry').value,
    stop:     document.getElementById('m-stop').value || stop,
    tp1:      document.getElementById('m-tp1').value || tp1,
    tp2:      document.getElementById('m-tp2').value,
    rr:       document.getElementById('m-rr').value,
    cond:     document.getElementById('m-cond').value,
    action:   document.getElementById('m-action').value,
    fill:     document.getElementById('m-fill').value,
    exitDt:'', exitPrice:'', exitReason:'', pnl:'', liveGrade:'',
  };
  signalLog.unshift(sig);
  saveLog();
  renderLog();
  closeModal();
  ['m-ticker','m-rsrank','m-entry','m-stop','m-tp1','m-tp2','m-rr','m-cond','m-fill'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function deleteSignal(id) {
  signalLog = signalLog.filter(s => s.id !== id);
  saveLog(); renderLog();
}

function clearLog() {
  if (!confirm('Clear all COSKY signals?')) return;
  signalLog = []; saveLog(); renderLog();
}

function renderLog() {
  const tbody = document.getElementById('logBody');
  const count = document.getElementById('logCount');
  if (!tbody) return;
  count.textContent = signalLog.length + ' signal' + (signalLog.length !== 1 ? 's' : '');

  if (!signalLog.length) {
    tbody.innerHTML = `<tr><td colspan="22" class="log-empty">No signals yet. Click <strong>+ Add Signal</strong> to begin tracking.</td></tr>`;
    return;
  }

  const gCls = g => {
    const n = parseInt(g);
    return n===5 ? 'grade-g5' : n===4 ? 'grade-g4' : n===3 ? 'grade-g3' : n===2 ? 'grade-g2' : 'grade-g1';
  };

  const colKeys = ['dt','version','ticker','sector','grade','tier','rsrank','entry','stop','tp1','tp2','rr','cond','action','fill','exitDt','exitPrice','exitReason','pnl','liveGrade'];

  tbody.innerHTML = signalLog.map(s => {
    const fields = colKeys.map(k => s[k] || '');
    return `<tr>
      <td class="td-sticky">${s.id}</td>
      ${fields.map((f,ci) => {
        const key = colKeys[ci];
        const cls = key==='grade' ? gCls(f) : key==='pnl' ? (f.startsWith('+') ? 'teal' : f.startsWith('-') ? 'red' : '') : '';
        return `<td contenteditable="true" class="${cls}"
          oninput="updateField('${s.id}','${key}',this.textContent)">${f}</td>`;
      }).join('')}
      <td><button class="del-btn" onclick="deleteSignal('${s.id}')">×</button></td>
    </tr>`;
  }).join('');
}

function updateField(id, key, val) {
  const sig = signalLog.find(s => s.id === id);
  if (sig) { sig[key] = val; saveLog(); }
}

function exportCSV() {
  if (!signalLog.length) { alert('No signals to export.'); return; }
  const headers = ['ID','Signal Date/Time (UTC)','Version','Ticker','Sector','Grade','Tier',
    'RS Rank','Entry $','Stop $','TP1 (2R)','TP2','R:R','Conditions','Action','Fill $',
    'Exit Date/Time','Exit $','Exit Reason','P&L %','Live Grade'];
  const rows = signalLog.map(s => [
    s.id, s.dt, s.version, s.ticker, s.sector, s.grade, s.tier,
    s.rsrank, s.entry, s.stop, s.tp1, s.tp2, s.rr,
    s.cond, s.action, s.fill, s.exitDt, s.exitPrice, s.exitReason, s.pnl, s.liveGrade
  ].map(v => `"${(v||'').replace(/"/g,'""')}"`));
  const csv = [headers.join(','), ...rows.map(r=>r.join(','))].join('\n');
  const blob = new Blob([csv], {type:'text/csv'});
  const url  = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), {
    href: url, download: 'cosky_signals_' + new Date().toISOString().slice(0,10) + '.csv'
  });
  a.click();
  URL.revokeObjectURL(url);
}

// ── PROMPTS ────────────────────────────────────────────────────────────
function copyPrompt(id) {
  const el = document.getElementById(id);
  if (!el) return;
  navigator.clipboard.writeText(el.textContent.trim()).then(() => {
    const btn = el.closest('.prompt-card').querySelector('.copy-btn');
    btn.textContent = '✓ Copied';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  });
}
