/* Shared SVG diagrams (08 §10, concepts 2 and 4). Load after ui.js so the launch state is known.
   Each diagram fills an <svg> that already has role="img" and an aria-label; the page keeps a text alternative. */
(function () {
  var has = (window.PROTO && window.PROTO.has) || function () { return true; };
  var each = function (sel, fn) { [].forEach.call(document.querySelectorAll(sel), fn); };

  // Concept 2: pipeline with a security gate between every stage and an evidence band underneath.
  each('svg[data-diagram="pipeline"]', function (svg) {
    var names = ['Plan', 'Develop', 'Build', 'Test', 'Deploy', 'Operate', 'Monitor'], h = '';
    h += '<line x1="40" y1="120" x2="600" y2="120" stroke="#c9d1dc" stroke-width="2"/><line class="flow" x1="40" y1="120" x2="600" y2="120" stroke="#1d4ed8" stroke-width="2"/>';
    h += '<g font-family="Geist Mono, monospace" font-size="10" fill="#5d6779" text-anchor="middle">';
    names.forEach(function (n, i) {
      var x = 40 + i * (560 / 6);
      h += '<circle cx="' + x + '" cy="120" r="9" fill="#fff" stroke="#1d4ed8" stroke-width="2"/><text x="' + x + '" y="92" fill="#0b1220" font-family="Geist, sans-serif" font-size="13" font-weight="600">' + n + '</text><text x="' + x + '" y="148">0' + (i + 1) + '</text>';
      if (i < 6) { var m = x + 560 / 12; h += '<path d="M' + m + ' 108l8 3.500v6c0 5-3.500 9-8 10.500-4.500-1.500-8-5.500-8-10.500v-6z" fill="#fff" stroke="#0891b2" stroke-width="1.500"/><line x1="' + m + '" y1="131" x2="' + m + '" y2="196" stroke="#0891b2" stroke-width="1" stroke-dasharray="2 4"/>'; }
    });
    h += '</g><rect x="40" y="196" width="560" height="30" rx="15" fill="#eef3fe" stroke="#1d4ed8" stroke-dasharray="4 4"/>';
    h += '<text x="320" y="215" text-anchor="middle" font-family="Geist Mono, monospace" font-size="10" fill="#173fae" letter-spacing="1">EVIDENCE COLLECTED AT EVERY GATE</text>';
    svg.setAttribute('viewBox', '0 60 640 180'); svg.innerHTML = h;
  });

  // Concept 4: requirement -> control -> evidence. data-only="hipaa" limits it to one framework.
  each('svg[data-diagram="controlmap"]', function (svg) {
    var only = svg.getAttribute('data-only');
    var req = [['hipaa', 'HIPAA §164.312(a)', [0, 1]], ['hipaa', 'HIPAA §164.312(b)', [2]], ['hipaa', 'HIPAA §164.312(d)', [0]], ['hipaa', 'HIPAA §164.312(e)', [1]], ['pci', 'PCI DSS Req. 8', [0]], ['pci', 'PCI DSS Req. 10', [2]], ['gdpr', 'GDPR Art. 32', [0, 1, 2]], ['pipeda', 'PIPEDA Principle 7', [0, 1, 2]]]
      .filter(function (r) { return only ? r[0] === only : (svg.hasAttribute("data-all") || has(r[0])); });
    if (!only) req = req.filter(function (r, i, a) { return r[0] !== 'hipaa' || a.filter(function (x) { return x[0] === 'hipaa'; }).indexOf(r) < 2; });
    var ctl = ['MFA + least privilege', 'Encryption', 'Central audit logging'], ev = ['Access review export', 'Policy compliance state', 'Log retention config'], map2 = [[0, 0], [1, 1], [2, 2], [0, 1]];
    var H = Math.max(200, req.length * 46 + 40), y = function (i, n) { return n < 2 ? H / 2 + 10 : 50 + i * ((H - 70) / (n - 1)); }, nodes = '', links = '';
    var box = function (x, yy, w, t, c) { return '<rect x="' + x + '" y="' + (yy - 14) + '" width="' + w + '" height="28" rx="6" fill="#fff" stroke="' + c + '"/><text x="' + (x + 10) + '" y="' + (yy + 4) + '" fill="#0b1220">' + t + '</text>'; };
    req.forEach(function (r, i) { nodes += box(20, y(i, req.length), 150, r[1], '#c9d1dc'); r[2].forEach(function (c) { var a = y(i, req.length), b = y(c, 3); links += '<path d="M170 ' + a + 'C216 ' + a + ',216 ' + b + ',262 ' + b + '"/>'; }); });
    ctl.forEach(function (t, i) { nodes += box(262, y(i, 3), 160, t, '#1d4ed8'); });
    ev.forEach(function (t, i) { nodes += box(474, y(i, 3), 162, t, '#0891b2'); });
    map2.forEach(function (m) { var a = y(m[0], 3), b = y(m[1], 3); links += '<path d="M422 ' + a + 'C448 ' + a + ',448 ' + b + ',474 ' + b + '" stroke="#0891b2"/>'; });
    svg.setAttribute('viewBox', '0 0 640 ' + H); svg.setAttribute('font-family', 'Geist Mono, monospace'); svg.setAttribute('font-size', '10');
    svg.innerHTML = '<g fill="none" stroke="#1d4ed8" stroke-width="1.500" opacity=".55">' + links + '</g>' + nodes +
      '<g fill="#5d6779" letter-spacing="1"><text x="20" y="20">REQUIREMENTS</text><text x="262" y="20">CONTROLS</text><text x="474" y="20">EVIDENCE</text></g>';
  });
})();
