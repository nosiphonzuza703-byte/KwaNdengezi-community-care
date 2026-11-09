(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

// Dynamic content: latest updates rendered from data (home page)
const UPDATES = [
  {date: '2026-10-03', title: 'Food parcel collection', text: 'Parcels are ready for collection every Tuesday and Thursday, 09:00 to 13:00.'},
  {date: '2026-10-10', title: 'Community clean-up day', text: 'Join us on the first Saturday of the month at 08:00. Gloves and refreshments are provided.'},
  {date: '2026-10-17', title: 'School stationery drive', text: 'Help us give children the stationery they need for the new term.'}
];
const upd = $('#updates');
if (upd) upd.replaceChildren(...UPDATES.map(u => {
  const a = document.createElement('article'); a.className = 'info-card';
  a.innerHTML = '<p class="meta"></p><h3></h3><p></p>';
  a.children[0].textContent = new Date(u.date).toLocaleDateString('en-ZA', {day: 'numeric', month: 'long', year: 'numeric'});
  a.children[1].textContent = u.title; a.children[2].textContent = u.text; return a;
}));

// Accordion
$$('.acc button').forEach(b => b.addEventListener('click', () => {
  const p = b.nextElementSibling, open = !p.classList.contains('open');
  $$('.acc .panel').forEach(x => x.classList.remove('open'));
  $$('.acc button').forEach(x => x.setAttribute('aria-expanded', 'false'));
  p.classList.toggle('open', open); b.setAttribute('aria-expanded', open);
}));

// Tabs
$$('[role=tablist]').forEach(list => {
  const tabs = $$('[role=tab]', list);
  tabs.forEach(t => t.addEventListener('click', () => tabs.forEach(o => {
    const on = o === t; o.setAttribute('aria-selected', on); $('#' + o.getAttribute('aria-controls')).hidden = !on;
  })));
});

// Modal
const modal = $('#modal');
if (modal) {
  const close = () => { modal.hidden = true; };
  $$('[data-open-modal]').forEach(b => b.addEventListener('click', () => { modal.hidden = false; $('button', modal).focus(); }));
  $('button', modal).addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

// Animated counters
$$('[data-count]').forEach(el => {
  const end = +el.dataset.count, io = new IntersectionObserver(([en]) => {
    if (!en.isIntersecting) return; io.disconnect(); let n = 0;
    const t = setInterval(() => { n = Math.min(end, n + 1); el.textContent = n; if (n >= end) clearInterval(t); }, 120);
  }); io.observe(el);
});

// Search, filter and sort programmes (works on the existing HTML cards, so content stays crawlable)
const grid = $('#programs');
if (grid) {
  const cards = $$('.program-card', grid), q = $('#q'), cat = $('#cat'), sort = $('#sort'), count = $('#count');
  [...new Set(cards.map(c => c.dataset.cat))].forEach(c => cat.append(new Option(c, c)));
  const render = () => {
    const term = q.value.trim().toLowerCase();
    const ordered = [...cards].sort(sort.value === 'cost' ? (a, b) => a.dataset.cost - b.dataset.cost : (a, b) => $('h3', a).textContent.localeCompare($('h3', b).textContent));
    ordered.forEach(c => grid.append(c));
    let n = 0;
    cards.forEach(c => { const show = (!cat.value || c.dataset.cat === cat.value) && c.textContent.toLowerCase().includes(term); c.hidden = !show; if (show) n++; });
    count.textContent = n + (n === 1 ? ' programme found' : ' programmes found');
  };
  [q, cat, sort].forEach(e => e.addEventListener('input', render)); render();
}

// Gallery lightbox
const lb = $('#lightbox');
if (lb) {
  $$('.zoom').forEach(b => b.addEventListener('click', () => {
    const i = $('img', b); $('img', lb).src = i.src; $('img', lb).alt = i.alt; lb.hidden = false; $('button', lb).focus();
  }));
  const close = () => { lb.hidden = true; };
  lb.addEventListener('click', close); document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

// Interactive map (Leaflet)
if ($('#map') && window.L) {
  const pos = [-29.8, 30.83], m = L.map('map').setView(pos, 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; OpenStreetMap contributors', maxZoom: 18}).addTo(m);
  L.marker(pos).addTo(m).bindPopup('<b>Kwandengezi Community Care</b>').openPopup();
}

// Forms: validation + AJAX
const RULES = {
  name: v => v.length >= 2 || 'Enter your full name (at least 2 characters).',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Enter a valid email, like name@example.com.',
  phone: v => !v || /^(\+27|0)[1-9]\d{8}$/.test(v.replace(/[\s-]/g, '')) || 'Use a South African number, like 031 123 4567 or 082 123 4567.',
  type: v => !!v || 'Choose an option.',
  amount: v => !v || (+v >= 10 && +v <= 100000) || 'Enter an amount from R10 to R100 000.',
  date: v => !v || v >= new Date().toISOString().slice(0, 10) || 'Choose today or a future date.',
  message: v => v.length >= 20 || 'Write at least 20 characters so we can help properly.'
};
const check = el => {
  const r = RULES[el.name]; if (!r) return true;
  const res = r(el.value.trim()), err = $('#' + el.id + '-err');
  el.setAttribute('aria-invalid', res !== true); if (err) err.textContent = res === true ? '' : res; return res === true;
};
const send = async form => {
  try { const res = await fetch('/', {method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'}, body: new URLSearchParams(new FormData(form))}); return res.ok; }
  catch { return false; }
};
function answer(d) {
  const a = +d.amount || 0;
  if (d.type === 'donate') return a >= 500 ? `Your R${a} can feed two families and cover school stationery. Use your name plus "donation" as the EFT reference.` : a >= 250 ? `Your R${a} provides a full weekly food parcel for a family of four.` : a >= 150 ? `Your R${a} provides a school pack for a child.` : a >= 100 ? `Your R${a} covers a youth programme session or a community clean-up.` : 'Every rand counts. Use your name plus "donation" as the EFT reference.';
  if (d.type === 'volunteer') return 'Volunteering is free. The next outreach is on the first Saturday of the month at 08:00. Wear closed shoes and bring water. We will email details to ' + d.email + '.';
  if (d.type === 'sponsor') return 'Partnerships start at R500 per event and cover supplies, refreshments and transport. We will send a partner pack to ' + d.email + ' within 2 working days.';
  return 'Support is free. Food parcels can be collected on Tuesday or Thursday, 09:00 to 13:00. Bring your ID, or use the contact page to tell us what you need.';
}
$$('form[data-validate]').forEach(form => {
  $$('input,select,textarea', form).forEach(el => el.addEventListener('blur', () => check(el)));
  const t = $('#type', form), p = new URLSearchParams(location.search).get('type');
  if (t && p && [...t.options].some(o => o.value === p)) t.value = p;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const els = $$('input,select,textarea', form).filter(el => el.name && el.name !== 'form-name');
    const bad = els.filter(el => !check(el)); if (bad.length) { bad[0].focus(); return; }
    const d = Object.fromEntries(new FormData(form)), out = $('#result'), ok = await send(form);
    out.hidden = false; out.replaceChildren();
    const h = document.createElement('h3'), body = document.createElement('p');
    h.textContent = 'Thank you, ' + d.name.split(' ')[0]; out.append(h, body);
    if (form.id === 'enquiry-form') body.textContent = answer(d);
    else {
      body.textContent = 'Your message is ready. Click below to send it from your email app.';
      const a = document.createElement('a'); a.className = 'button primary'; a.textContent = 'Open email and send';
      a.href = 'mailto:hello@kwandengezicare.org?subject=' + encodeURIComponent('[' + d.type + '] from ' + d.name) + '&body=' + encodeURIComponent(d.message + '\n\nReply to: ' + d.email + (d.phone ? '\nPhone: ' + d.phone : ''));
      out.append(a);
    }
    if (!ok) { const s = document.createElement('p'); s.className = 'meta'; s.textContent = 'Note: the form service is not reachable (normal when running locally).'; out.append(s); }
    out.focus(); form.reset();
  });
});
})();
