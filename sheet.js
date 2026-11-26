/* A small working spreadsheet for practice: formulas, cell references, SUM/AVERAGE/MAX/MIN/COUNT, fill down, errors. */
(function () {
  'use strict';
  var LMS = window.LMS, h = LMS.h;

  function colToNum(c) { var n = 0; for (var i = 0; i < c.length; i++) n = n * 26 + c.charCodeAt(i) - 64; return n; }
  function numToCol(n) { var s = ''; while (n > 0) { var m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; }
  function splitAddr(a) { var m = /^\$?([A-Za-z]{1,2})\$?(\d+)$/.exec(a); return m ? { c: colToNum(m[1].toUpperCase()), r: parseInt(m[2], 10) } : null; }
  function norm(a) { var p = splitAddr(a); return numToCol(p.c) + p.r; }
  function serr(code) { var e = new Error(code); e.sheet = code; return e; }

  function shiftFormula(raw, dRow, dCol) {
    return raw.replace(/(\$?)([A-Za-z]{1,2})(\$?)(\d+)/g, function (m, a, c, b, r) {
      var col = a ? c.toUpperCase() : numToCol(colToNum(c.toUpperCase()) + dCol);
      var row = b ? r : String(parseInt(r, 10) + dRow);
      return a + col + b + row;
    });
  }

  function Engine(getRaw) {
    var cache = {}, stack = {};
    var TOKEN = /\s*(?:(\d+(?:\.\d+)?)|(\$?[A-Za-z]{1,2}\$?\d+)(?::(\$?[A-Za-z]{1,2}\$?\d+))?|([A-Za-z][A-Za-z0-9.]*)(?=\()|([-+*\/(),%]))/y;

    function tokenize(s) {
      var toks = [], pos = 0, m;
      s = s.replace(/\s+$/, '');
      while (pos < s.length) {
        TOKEN.lastIndex = pos; m = TOKEN.exec(s);
        if (!m) throw serr('#NAME?');
        pos = TOKEN.lastIndex;
        if (m[1] != null) toks.push({ t: 'num', v: parseFloat(m[1]) });
        else if (m[2] != null && m[3] != null) toks.push({ t: 'range', a: m[2], b: m[3] });
        else if (m[2] != null) toks.push({ t: 'ref', a: m[2] });
        else if (m[4] != null) toks.push({ t: 'fn', n: m[4] });
        else toks.push({ t: 'op', v: m[5] });
      }
      return toks;
    }
    function num(v) {
      if (v === null || v === undefined) return 0;
      if (typeof v === 'number') return v;
      throw serr('#VALUE!');
    }
    function evalFormula(src) {
      var toks = tokenize(src), i = 0;
      function peek() { return toks[i]; }
      function isOp(t, v) { return t && t.t === 'op' && t.v === v; }
      function expect(v) { if (!isOp(toks[i], v)) throw serr('#VALUE!'); i++; }
      function expr() {
        var v = term();
        while (isOp(peek(), '+') || isOp(peek(), '-')) {
          var op = toks[i++].v, r = term();
          v = op === '+' ? num(v) + num(r) : num(v) - num(r);
        }
        return v;
      }
      function term() {
        var v = factor();
        while (isOp(peek(), '*') || isOp(peek(), '/')) {
          var op = toks[i++].v, r = factor();
          if (op === '*') v = num(v) * num(r);
          else { var d = num(r); if (d === 0) throw serr('#DIV/0!'); v = num(v) / d; }
        }
        return v;
      }
      function factor() {
        var t = peek();
        if (isOp(t, '-') || isOp(t, '+')) { i++; var f = factor(); return t.v === '-' ? -num(f) : num(f); }
        var v = primary();
        while (isOp(peek(), '%')) { i++; v = num(v) / 100; }
        return v;
      }
      function primary() {
        var t = toks[i++];
        if (!t) throw serr('#VALUE!');
        if (t.t === 'num') return t.v;
        if (t.t === 'ref') return cellValue(norm(t.a));
        if (t.t === 'range') return rangeVals(t.a, t.b);
        if (t.t === 'fn') {
          expect('(');
          var args = [];
          if (!isOp(peek(), ')')) { args.push(expr()); while (isOp(peek(), ',')) { i++; args.push(expr()); } }
          expect(')');
          return callFn(t.n.toUpperCase(), args);
        }
        if (isOp(t, '(')) { var v = expr(); expect(')'); return v; }
        throw serr('#VALUE!');
      }
      var out = expr();
      if (i !== toks.length) throw serr('#VALUE!');
      if (Array.isArray(out)) throw serr('#VALUE!');
      return out;
    }
    function rangeVals(a, b) {
      var p = splitAddr(a), q = splitAddr(b), out = [];
      if (!p || !q) throw serr('#REF!');
      var r1 = Math.min(p.r, q.r), r2 = Math.max(p.r, q.r), c1 = Math.min(p.c, q.c), c2 = Math.max(p.c, q.c);
      for (var r = r1; r <= r2; r++) for (var c = c1; c <= c2; c++) out.push(cellValue(numToCol(c) + r));
      return out;
    }
    function nums(args) {
      var out = [];
      args.forEach(function (a) {
        if (Array.isArray(a)) a.forEach(function (x) { if (typeof x === 'number') out.push(x); });
        else if (typeof a === 'number') out.push(a);
        else if (a !== null) throw serr('#VALUE!');
      });
      return out;
    }
    function callFn(n, args) {
      var xs = nums(args);
      if (n === 'SUM') return xs.reduce(function (s, x) { return s + x; }, 0);
      if (n === 'AVERAGE') { if (!xs.length) throw serr('#DIV/0!'); return xs.reduce(function (s, x) { return s + x; }, 0) / xs.length; }
      if (n === 'MAX') return xs.length ? Math.max.apply(null, xs) : 0;
      if (n === 'MIN') return xs.length ? Math.min.apply(null, xs) : 0;
      if (n === 'COUNT') return xs.length;
      throw serr('#NAME?');
    }
    function cellValue(addr) {
      if (Object.prototype.hasOwnProperty.call(cache, addr)) { var c = cache[addr]; if (c.e) throw serr(c.e); return c.v; }
      if (stack[addr]) throw serr('#REF!');
      stack[addr] = true;
      try {
        var raw = getRaw(addr); raw = raw == null ? '' : String(raw).trim();
        var v;
        if (raw === '') v = null;
        else if (raw.charAt(0) === '=') v = evalFormula(raw.slice(1));
        else if (/^-?\d+(\.\d+)?$/.test(raw.replace(/,/g, ''))) v = parseFloat(raw.replace(/,/g, ''));
        else v = raw;
        cache[addr] = { v: v }; return v;
      } catch (e) { if (e.sheet) cache[addr] = { e: e.sheet }; throw e; }
      finally { delete stack[addr]; }
    }
    this.cellValue = cellValue;
  }
  LMS.SheetEngine = Engine; LMS.shiftFormula = shiftFormula;

  /* ---------- the lab widget ---------- */
  var HEAD = ['post_id', 'date', 'platform', 'format', 'topic', 'reach', 'likes', 'comments', 'shares', 'engagements', 'engagement_rate'];
  var DATA = [
    ['1', '2026-11-03', 'Instagram', 'Reel', 'Campus life', 4200, 310, 22, 41],
    ['2', '2026-11-05', 'Instagram', 'Carousel', 'Exam tips', 3100, 280, 35, 66],
    ['3', '2026-11-07', 'YouTube', 'Short', 'Campus life', 5800, 420, 18, 30],
    ['4', '2026-11-10', 'Instagram', 'Static', 'Events', 1900, 120, 8, 5],
    ['5', '2026-11-12', 'YouTube', 'Video', 'Interview', 2600, 190, 40, 22],
    ['6', '2026-11-14', 'Instagram', 'Reel', 'Exam tips', 6100, 510, 47, 88],
    ['7', '2026-11-17', 'YouTube', 'Short', 'Exam tips', 7200, 560, 31, 74],
    ['8', '2026-11-19', 'Instagram', 'Carousel', 'Events', 2400, 150, 12, 18],
    ['9', '2026-11-21', 'YouTube', 'Video', 'Campus life', 3300, 210, 26, 15],
    ['10', '2026-11-24', 'Instagram', 'Reel', 'Interview', 3900, 260, 29, 37]
  ];
  var NCOL = 11, LASTDATA = 11, SCRATCH = [12, 13];

  LMS.widget('sheetLab', function (b) {
    var edits = {}, sel = null, pct = false, engine;
    var inputs = {};

    function isFixed(c, r) { return r === 1 || (r >= 2 && r <= LASTDATA && c <= 9); }
    function getRaw(addr) {
      var p = splitAddr(addr); if (!p) return '';
      if (p.r === 1) return HEAD[p.c - 1] || '';
      if (p.r >= 2 && p.r <= LASTDATA && p.c <= 9) { var v = DATA[p.r - 2][p.c - 1]; return v == null ? '' : v; }
      return edits[addr] || '';
    }
    function display(addr) {
      try {
        var v = engine.cellValue(addr);
        if (v === null) return '';
        if (typeof v === 'number') {
          var p = splitAddr(addr);
          if (pct && p.c === 11 && p.r >= 2 && p.r <= LASTDATA) return (v * 100).toFixed(2) + '%';
          return String(Math.round(v * 1e6) / 1e6);
        }
        return String(v);
      } catch (e) { return e.sheet || '#ERR'; }
    }
    function val(addr) { try { return engine.cellValue(addr); } catch (e) { return null; } }
    function rawOf(addr) { return String(getRaw(addr) || '').trim(); }
    function isF(addr) { return rawOf(addr).charAt(0) === '='; }
    function scratch(fn) {
      for (var i = 0; i < SCRATCH.length; i++) for (var c = 1; c <= NCOL; c++) { var a = numToCol(c) + SCRATCH[i]; if (fn(a)) return true; }
      return false;
    }
    var tasks = [
      { t: 'In <b>J2</b>, type a formula that adds likes, comments and shares for post 1: <code>=G2+H2+I2</code>. The answer is 373.', ok: function () { return isF('J2') && val('J2') === 373; } },
      { t: 'In <b>K2</b>, divide engagements by reach: <code>=J2/F2</code>. The answer is about 0.0888.', ok: function () { return isF('K2') && Math.abs((val('K2') || 0) - 373 / 4200) < 1e-6; } },
      { t: 'Click J2, press <b>Fill down</b>. Then click K2 and press Fill down. Row 11 now shows 665 and about 0.0924.', ok: function () { return isF('J11') && isF('K11') && val('J11') === 665 && Math.abs((val('K11') || 0) - 665 / 7200) < 1e-6; } },
      { t: 'In row 12 or 13, total the reach with <code>=SUM(F2:F11)</code>. The answer is 40500.', ok: function () { return scratch(function (a) { return /^=\s*SUM\(/i.test(rawOf(a)) && val(a) === 40500; }); } },
      { t: 'In another scratch cell, find the average reach with <code>=AVERAGE(F2:F11)</code>. The answer is 4050.', ok: function () { return scratch(function (a) { return /^=\s*AVERAGE\(/i.test(rawOf(a)) && val(a) === 4050; }); } },
      { t: 'Find the highest reach with <code>=MAX(F2:F11)</code>. The answer is 7200.', ok: function () { return scratch(function (a) { return /^=\s*MAX\(/i.test(rawOf(a)) && val(a) === 7200; }); } },
      { t: 'Make an error on purpose with <code>=1/0</code> in a scratch cell and read the message. Then fix it.', ok: function () { return scratch(function (a) { return isF(a) && display(a) === '#DIV/0!'; }) || !!done.err; } }
    ];
    var done = {};

    var addrBox = h('span', { class: 'addr' }, '–'), fv = h('div', { class: 'fv' }, 'Click a white cell and type. Formulas start with =');
    var taskList = h('ul', { class: 'tasks' }), msg = h('p', { class: 'muted', 'aria-live': 'polite' });

    function updateTasks() {
      taskList.replaceChildren();
      var all = true;
      tasks.forEach(function (t) {
        var ok = false; try { ok = t.ok(); } catch (e) { }
        if (ok && t === tasks[6]) done.err = true;
        ok = ok || (t === tasks[6] && done.err);
        if (!ok) all = false;
        taskList.append(h('li', { class: ok ? 'done' : '' }, h('span', { class: 'box', 'aria-hidden': 'true' }, ok ? '✓' : ''), h('span', { html: t.t + (ok ? ' <b>Done.</b>' : '') })));
      });
      if (all) LMS.store.update(function (p) { p.checks['sheetlab'] = true; });
    }
    function refresh() {
      engine = new Engine(getRaw);
      Object.keys(inputs).forEach(function (a) { if (document.activeElement !== inputs[a].el) inputs[a].el.value = display(a); inputs[a].td.classList.toggle('err', /^#/.test(inputs[a].el.value)); });
      updateTasks();
    }
    function selectCell(a) { sel = a; addrBox.textContent = a; fv.textContent = rawOf(a) || ' '; }

    var head = h('tr', null, h('th', { class: 'rn' }, ''));
    for (var c = 1; c <= NCOL; c++) head.append(h('th', null, numToCol(c)));
    var tbody = h('tbody');
    for (var r = 1; r <= SCRATCH[1]; r++) {
      var tr = h('tr', null, h('td', { class: 'rn' }, String(r)));
      for (c = 1; c <= NCOL; c++) {
        (function (c, r) {
          var addr = numToCol(c) + r, td;
          if (isFixed(c, r)) {
            var raw = getRaw(addr);
            td = h('td', { class: 'fixed' + (r === 1 ? ' hdr' : '') + (typeof raw === 'number' ? ' num' : '') }, String(raw));
            td.addEventListener('click', function () { selectCell(addr); });
          } else {
            var inp = h('input', { class: 'cell', type: 'text', 'aria-label': 'Cell ' + addr, autocomplete: 'off', spellcheck: 'false' });
            td = h('td', { class: 'edit' }, inp);
            inputs[addr] = { el: inp, td: td };
            inp.addEventListener('focus', function () { selectCell(addr); inp.value = edits[addr] || ''; });
            inp.addEventListener('input', function () { edits[addr] = inp.value; fv.textContent = inp.value || ' '; });
            inp.addEventListener('blur', function () { refresh(); });
            inp.addEventListener('keydown', function (e) {
              if (e.key === 'Enter') { e.preventDefault(); var p = splitAddr(addr), nx = inputs[numToCol(p.c) + (p.r + 1)]; inp.blur(); if (nx) nx.el.focus(); }
            });
          }
          tr.append(td);
        })(c, r);
      }
      tbody.append(tr);
    }

    function fillDown() {
      msg.textContent = '';
      if (!sel) { msg.textContent = 'Click the cell with the formula first (for example J2).'; return; }
      var p = splitAddr(sel), raw = edits[sel] || '';
      if (raw.charAt(0) !== '=' || p.r < 2 || p.r >= LASTDATA || p.c < 10) { msg.textContent = 'Select a formula cell in column J or K (rows 2 to 10), then press Fill down.'; return; }
      for (var rr = p.r + 1; rr <= LASTDATA; rr++) edits[numToCol(p.c) + rr] = shiftFormula(raw, rr - p.r, 0);
      refresh();
      msg.textContent = 'Filled down to row 11. Click J11 to see how the row numbers changed.';
    }
    var pctBox = h('input', { type: 'checkbox', id: LMS.uid() });
    pctBox.addEventListener('change', function () { pct = pctBox.checked; refresh(); });
    var reset = h('button', { class: 'btn ghost small', onClick: function () { edits = {}; done = {}; msg.textContent = 'Sheet cleared.'; refresh(); } }, 'Clear my work');

    var table = h('table', { class: 'sheet' }, h('thead', null, head), tbody);
    refresh();
    return h('div', { class: 'widget' }, h('h4', null, b.title || 'Spreadsheet lab'),
      h('p', { class: 'muted' }, b.help || 'This is Dataset A. White cells are yours. Grey cells are locked data. Rows 12 and 13 are scratch rows for trying functions.'),
      h('div', { class: 'fbar' }, addrBox, h('span', { class: 'fxl' }, 'fx'), fv),
      h('p', { class: 'swipehint' }, 'Swipe the sheet sideways to see columns J and K.'),
      h('div', { class: 'sheetscroll' }, table),
      h('div', { class: 'row' }, h('button', { class: 'btn small', onClick: fillDown }, 'Fill down'), reset,
        h('label', { for: pctBox.id, style: 'display:inline-flex;gap:8px;align-items:center;min-height:36px' }, pctBox, 'Show column K as percentage')),
      msg, h('h5', { style: 'margin-top:14px' }, 'Your tasks'), taskList);
  });
})();
