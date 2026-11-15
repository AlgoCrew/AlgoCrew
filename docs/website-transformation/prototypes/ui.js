/* Prototype behaviour: launch-state switch, mega menus, mobile drawer, scroll reveal.
   Prototype shortcut: the header is built here so the static pages share it.
   In production the menus must be server-rendered HTML (04 §8.1); only the open/close logic is client-side. */
(function () {
  /* ---- Launch state: which gated items (07 §11, V-01/V-03) are verified. Default: nothing verified. ---- */
  var STATES = {
    none: { label: 'Nothing verified', have: [] },
    one: { label: 'One of each', have: ['az', 'hipaa'] },
    partial: { label: 'Two of each', have: ['az', 'aws', 'hipaa', 'pipeda'] },
    all: { label: 'All verified', have: ['az', 'aws', 'gcp', 'hipaa', 'gdpr', 'pci', 'pipeda'] }
  };
  var NAMES = { az: 'Microsoft Azure', aws: 'AWS', gcp: 'Google Cloud', hipaa: 'HIPAA', gdpr: 'GDPR', pci: 'PCI DSS', pipeda: 'PIPEDA' };
  var state = new URLSearchParams(location.search).get('state');
  try { if (STATES[state]) localStorage.setItem('protoState', state); else state = localStorage.getItem('protoState'); } catch (e) {}
  if (!STATES[state]) state = 'none';
  var have = STATES[state].have;
  var has = function (n) { return !n || have.indexOf(n) > -1; };
  var listOf = function (keys) { return keys.filter(has); };
  var PLAT = listOf(['az', 'aws', 'gcp']), FW = listOf(['hipaa', 'gdpr', 'pci', 'pipeda']);
  window.PROTO = { state: state, has: has, platforms: PLAT, frameworks: FW };
  var sentence = function (a) { return a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1]; };
  var each = function (sel, fn) { [].forEach.call(document.querySelectorAll(sel), fn); };

  each('[data-need]', function (el) { if (!has(el.getAttribute('data-need'))) el.remove(); });
  each('[data-when]', function (el) {
    var w = el.getAttribute('data-when'), n = w.indexOf('platforms') > -1 ? PLAT.length : FW.length;
    if (w.indexOf('no-') === 0 ? n > 0 : n === 0) el.remove();
  });
  // Tables with one column per cloud: drop the columns that are not verified.
  each('table[data-cols]', function (t) {
    var cols = t.getAttribute('data-cols').split(',');
    [].forEach.call(t.rows, function (r) { for (var i = cols.length - 1; i >= 0; i--) if (!has(cols[i])) r.deleteCell(i); });
  });
  // Lists of verified names written into copy, e.g. "on Microsoft Azure and AWS".
  each('[data-list]', function (el) {
    var keys = el.getAttribute('data-list') === 'platforms' ? PLAT : FW, names = keys.map(function (k) { return k === 'az' && el.hasAttribute('data-short') ? 'Azure' : NAMES[k]; });
    if (!names.length) { if (el.hasAttribute('data-drop')) el.closest(el.getAttribute('data-drop')).remove(); else el.textContent = el.getAttribute('data-empty') || ''; return; }
    el.textContent = (el.getAttribute('data-prefix') || '') + (el.hasAttribute('data-dot') ? names.join(' · ') : sentence(names)) + (el.getAttribute('data-suffix') || '');
  });
  var bar = document.querySelector('.protobar');
  if (bar) {
    var sw = document.createElement('div'); sw.className = 'statesw';
    sw.innerHTML = 'Launch state: ' + Object.keys(STATES).map(function (k) { return k === state ? '<b>' + STATES[k].label + '</b>' : '<a href="?state=' + k + '">' + STATES[k].label + '</a>'; }).join(' · ');
    bar.appendChild(sw);
  }

  /* ---- Header ---- */
  var P = { home: 'index.html', svc: 'service-devsecops.html', sec: 'pillar-cloud-security.html', az: 'platform-azure.html', hub: 'compliance.html', hipaa: 'compliance-hipaa.html', contact: 'contact.html' };
  var L = function (t, d, h, need) { return { t: t, d: d, h: h || '#', need: need }; };
  var delivered = PLAT.length ? '<span>Delivered on ' + PLAT.map(function (k) { return '<a href="' + (k === 'az' ? P.az : '#') + '">' + (k === 'az' ? 'Azure' : NAMES[k]) + '</a>'; }).join(' · ') + '</span>' : '';
  var MENUS = [
    { id: 'services', label: 'Services', cols: [
      { h: 'Cloud Consulting & Engineering', links: [L('Strategy & Architecture', 'Target architecture, landing zones and roadmaps'), L('Migration & Modernization', 'Move and modernize workloads in planned waves'), L('Hybrid & Multi-Cloud', 'Consistent design across clouds and data centers'), L('Cloud-Native Engineering', 'Containers, serverless and managed services, built right')] },
      { h: 'DevOps & DevSecOps', links: [L('DevSecOps', 'Security checks at every stage of delivery', P.svc), L('CI/CD Pipelines', 'Repeatable build, test and release pipelines'), L('Infrastructure as Code', 'Versioned, reviewed, reproducible infrastructure'), L('Kubernetes & Platform Engineering', 'Container platforms and self-service paths'), L('Monitoring & Observability', 'Metrics, logs and traces that lead to action')] },
      { h: 'Cloud Security', hh: P.sec, links: [L('Security Architecture & Zero Trust', 'Identity-centered, segmented, least-privilege design', P.sec), L('Identity & Access Management', 'Roles, federation and privileged access', P.sec), L('Threat Detection & Monitoring', 'Native detection tooling, tuned and routed', P.sec), L('Vulnerability Management', 'Find, rank and fix weaknesses continuously', P.sec), L('Security Assessments', 'A clear view of your current posture', P.sec)] },
      { h: 'Compliance & Governance', hh: P.hub, links: [L('Cloud Governance', 'Guardrails, policies and account structure', P.hub), L('Audit Readiness', 'Evidence your auditor can actually use', P.hub)], chips: [['HIPAA', P.hipaa, 'hipaa'], ['GDPR', '#', 'gdpr'], ['PCI DSS', '#', 'pci'], ['PIPEDA', '#', 'pipeda']] },
      { h: 'Managed Cloud Services', links: [L('Managed Cloud Operations', 'Day-two operations on your cloud'), L('Monitoring & Incident Management', 'Alerting, response and post-incident review'), L('Cost Optimization', 'Right-sizing, commitments and spend guardrails'), L('Backup & Disaster Recovery', 'Tested recovery, not just scheduled backups')] }
    ], foot: '<a class="link" href="#">Explore Our Capabilities →</a>' + delivered + '<a class="mm-feature" href="index.html#approach"><b>How we work</b>Assess → Architect → Implement → Manage → Optimize, with security at every step.</a>' },
    { id: 'platforms', label: 'Cloud Platforms', cols: [
      { h: 'Platforms', links: [L('Microsoft Azure', 'Landing zones, migration, DevSecOps and security on Azure', P.az, 'az'), L('Amazon Web Services', 'Multi-account foundations, migration and security on AWS', '#', 'aws'), L('Google Cloud', 'Organization design, GKE and security on Google Cloud', '#', 'gcp'), L('Multi-cloud overview', 'How we choose, combine and govern platforms')] }
    ], side: '<a class="mm-feature" href="#"><b>Hybrid &amp; Multi-Cloud</b>One method and consistent governance across clouds and data centers.<i>Partner badges replace this slot only for statuses actually held (V-01).</i></a>', foot: '<a class="link" href="' + P.contact + '">Discuss Your Cloud Strategy →</a>' },
    { id: 'compliance', label: 'Compliance', cols: [
      { h: 'Frameworks', links: [L('HIPAA', 'Safeguards and evidence for health information in the cloud', P.hipaa, 'hipaa'), L('GDPR', 'Technical measures for EU and UK personal data', '#', 'gdpr'), L('PCI DSS', 'Controls for cardholder-data environments', '#', 'pci'), L('PIPEDA', 'Safeguards for Canadian personal information', '#', 'pipeda')] },
      { h: 'Governance & Readiness', links: [L('Cloud Governance', 'Policy, guardrails and account hierarchy', P.hub), L('Policy & Control Implementation', 'Controls as code, continuously checked', P.hub), L('Risk Management', 'Cloud risk register and treatment plans', P.hub), L('Audit Readiness', 'Organized, current evidence for assessors', P.hub)] }
    ], side: '<a class="mm-feature" href="' + P.hub + '#boundaries"><b>Our role</b>We implement controls and prepare evidence. Your auditor or assessor certifies.</a>', foot: '<a class="link" href="' + P.hub + '">View all compliance services →</a>' },
    { id: 'insights', label: 'Insights', href: 'index.html#insights' },
    { id: 'company', label: 'Company', cols: [
      { h: 'Company', wide: true, links: [L('About', 'Who we are and where we work from'), L('Our Approach', 'Method, engagement models and FAQ', 'index.html#approach'), L('Trust & Security', 'How we protect your environments and data'), L('Careers', 'Cloud, DevOps and security roles'), L('Contact', 'Talk to the team', P.contact)] }
    ], foot: '<a class="link" href="' + P.contact + '">Discuss Your Cloud Strategy →</a>' }
  ];
  // Apply the launch state: drop unverified links, empty columns, and turn a one-link menu into a plain link (04 §8.3 fallback).
  MENUS.forEach(function (m) {
    if (!m.cols) return;
    m.cols.forEach(function (c) { c.links = c.links.filter(function (l) { return has(l.need); }); if (c.chips) c.chips = c.chips.filter(function (x) { return has(x[2]); }); });
    m.cols = m.cols.filter(function (c) { return c.links.length; });
    if (m.id === 'platforms' && !PLAT.length) { m.href = '#'; delete m.cols; }
  });

  var header = document.querySelector('.header');
  if (!header) return;
  var esc = function (s) { return s.replace(/&/g, '&amp;'); };
  var colHtml = function (c) {
    return '<div class="mm-col' + (c.wide ? ' wide' : '') + '"><a class="mm-h" href="' + (c.hh || '#') + '">' + esc(c.h) + '</a><ul>' +
      c.links.map(function (l) { return '<li><a href="' + l.h + '"><strong>' + esc(l.t) + '</strong><span>' + esc(l.d) + '</span></a></li>'; }).join('') + '</ul>' +
      (c.chips && c.chips.length ? '<p class="mm-chips">' + c.chips.map(function (x) { return '<a href="' + x[1] + '">' + x[0] + '</a>'; }).join('') + '</p>' : '') + '</div>';
  };
  // Each panel is rendered directly after its trigger, inside the same <li>, so Tab goes trigger -> its panel (review R-01).
  var panelHtml = function (m) {
    return '<div class="mm" id="mm-' + m.id + '" hidden><div class="wrap"><div class="mm-grid n' + m.cols.length + (m.side ? ' has-side' : '') + '">' +
      m.cols.map(colHtml).join('') + (m.side ? '<div class="mm-side">' + m.side + '</div>' : '') + '</div><div class="mm-foot">' + m.foot + '</div></div></div>';
  };
  var desktop = MENUS.map(function (m) {
    if (m.href) return '<li><a class="top-link" href="' + m.href + '">' + m.label + '</a></li>';
    return '<li><button type="button" class="top" aria-expanded="false" aria-controls="mm-' + m.id + '">' + m.label + '</button>' + panelHtml(m) + '</li>';
  }).join('');
  var mobile = MENUS.map(function (m) {
    if (m.href) return '<a class="d-link" href="' + m.href + '">' + m.label + '</a>';
    // Mobile lists pages only: column headings plus real pages, no anchor links (04 §8.8).
    var items = m.cols.length > 2 ? m.cols.map(function (c) { return '<a href="' + (c.hh || '#') + '">' + esc(c.h) + '</a>'; }).join('')
      : m.cols.map(function (c) { return c.links.map(function (l) { return '<a href="' + l.h + '">' + esc(l.t) + '</a>'; }).join(''); }).join('');
    return '<details name="drawer"><summary>' + m.label + '</summary><div>' + items + '</div></details>';
  }).join('');

  header.innerHTML = '<div class="wrap"><a class="logo" href="' + P.home + '" aria-label="AlgoCrew home">AlgoCrew<i></i></a>' +
    '<nav aria-label="Primary"><ul class="nav">' + desktop + '</ul></nav>' +
    '<a class="btn primary sm cta-full" href="' + P.contact + '">Discuss Your Cloud Strategy</a>' +
    '<a class="btn primary sm cta-short" href="' + P.contact + '">Talk to us</a>' +
    '<button type="button" class="burger" aria-expanded="false" aria-controls="drawer" aria-label="Menu"><span></span></button></div>' +
    '<div class="drawer" id="drawer" hidden><nav aria-label="Mobile">' + mobile + '</nav>' +
    '<div class="drawer-foot"><a class="btn primary" href="' + P.contact + '">Discuss Your Cloud Strategy</a></div></div>';
  var scrim = document.createElement('div'); scrim.className = 'scrim'; scrim.hidden = true; header.after(scrim);

  // Mega menus: click or Enter/Space toggles, hover opens after an intent delay, Esc closes, one open at a time.
  var tops = [].slice.call(header.querySelectorAll('.top')), timer, byHover = false;
  function close(focus) {
    tops.forEach(function (b) { if (b.getAttribute('aria-expanded') === 'true') { b.setAttribute('aria-expanded', 'false'); document.getElementById(b.getAttribute('aria-controls')).hidden = true; if (focus) b.focus(); } });
    scrim.hidden = true; byHover = false;
  }
  function open(b) { if (b.getAttribute('aria-expanded') === 'true') return; close(); b.setAttribute('aria-expanded', 'true'); document.getElementById(b.getAttribute('aria-controls')).hidden = false; scrim.hidden = false; }
  var hoverable = window.matchMedia('(hover: hover) and (min-width: 1024px)');
  tops.forEach(function (b) {
    b.addEventListener('click', function () {
      // A click that follows a hover-open keeps the panel open instead of toggling it shut (review R-02).
      if (b.getAttribute('aria-expanded') === 'true') { if (byHover) byHover = false; else close(); }
      else open(b);
    });
    b.addEventListener('mouseenter', function () { if (hoverable.matches) { clearTimeout(timer); timer = setTimeout(function () { if (b.getAttribute('aria-expanded') !== 'true') { open(b); byHover = true; } }, 150); } });
  });
  header.addEventListener('mouseleave', function () { if (hoverable.matches) { clearTimeout(timer); timer = setTimeout(close, 250); } });
  header.addEventListener('mouseenter', function () { clearTimeout(timer); }, true);
  // Focus moving to anything outside the open trigger's <li> closes its panel.
  header.addEventListener('focusin', function (e) {
    var openBtn = tops.filter(function (b) { return b.getAttribute('aria-expanded') === 'true'; })[0];
    if (openBtn && !openBtn.parentNode.contains(e.target)) close();
  });
  scrim.addEventListener('click', function () { close(); });
  header.addEventListener('focusout', function (e) { if (e.relatedTarget && !header.contains(e.relatedTarget)) close(); });

  // Mobile drawer: scroll lock, focus trap, Esc closes and returns focus.
  var burger = header.querySelector('.burger'), drawer = document.getElementById('drawer');
  function setDrawer(on) { drawer.style.setProperty('--drawer-top', header.getBoundingClientRect().bottom + 'px'); drawer.hidden = !on; burger.setAttribute('aria-expanded', on); document.body.classList.toggle('locked', on); if (!on) burger.focus(); }
  burger.addEventListener('click', function () { setDrawer(drawer.hidden); });
  drawer.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var f = [burger].concat([].slice.call(drawer.querySelectorAll('a, summary')).filter(function (el) { return el.offsetParent; }));
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { if (!drawer.hidden) setDrawer(false); else close(true); } });

  // Scroll reveal: one short fade-up per block, staggered within a grid. Skipped entirely for reduced motion.
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    each('main .section-head, main .card, main .fw, main .row, main .steps, main .strip, main .cta, main .checks, main .tablewrap, main .concept, main .diagram', function (el) {
      if (el.getBoundingClientRect().top < innerHeight) return; // never hide what is already on screen
      el.classList.add('rv');
      el.style.transitionDelay = Math.min([].indexOf.call(el.parentNode.children, el), 4) * 60 + 'ms';
      io.observe(el);
    });
  }
})();
