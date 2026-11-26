/* Reusable widgets. A lesson block {t:'name', ...} renders through LMS.widgets[name]. */
(function () {
  'use strict';
  var LMS = window.LMS, h = LMS.h, uid = LMS.uid, fmt = LMS.fmt;

  /* ---------- calculator ---------- */
  LMS.widget('calc', function (b) {
    var vals = {};
    b.fields.forEach(function (f) { vals[f.id] = f.value; });
    var outs = h('div', { class: 'outs', 'aria-live': 'polite' });
    var grid = h('div', { class: 'fields' });
    b.fields.forEach(function (f) {
      var id = uid();
      var inp = h('input', { id: id, type: 'number', value: String(f.value), step: 'any', min: '0', inputmode: 'decimal' });
      inp.addEventListener('input', function () { vals[f.id] = parseFloat(inp.value); update(); });
      grid.append(h('label', { for: id }, f.label, inp));
    });
    function update() {
      outs.replaceChildren();
      b.outputs.forEach(function (o) {
        var r; try { r = o.fn(vals); } catch (e) { r = NaN; }
        outs.append(h('div', { class: 'out' }, h('span', { class: 'k' }, o.label),
          h('strong', null, typeof r === 'string' ? r : fmt(r, o.fmt)), o.note ? h('small', null, o.note) : null));
      });
    }
    update();
    return h('div', { class: 'widget' }, h('h4', null, b.title), b.help ? h('p', { class: 'muted' }, b.help) : null, grid, outs,
      b.takeaway ? h('p', { class: 'take' }, b.takeaway) : null);
  });

  /* ---------- cue questions: reveal answers ---------- */
  LMS.widget('reveal', function (b) {
    return h('div', { class: 'widget reveal' }, h('h4', null, b.title || 'Check yourself'),
      h('p', { class: 'muted' }, b.help || 'Answer in your own words first, in your log book. Then open the answer.'),
      b.items.map(function (it) {
        return h('details', { class: 'rv' }, h('summary', { html: it.q }), h('div', { class: 'ans', html: it.a }));
      }));
  });

  /* ---------- quiz (multiple choice and numeric) ---------- */
  function quiz(b) {
    var wrap = h('div', { class: 'widget quiz' });
    var i = 0, score = 0, answered = false, missed = [];
    function render() {
      wrap.replaceChildren(h('h4', null, b.title));
      if (i >= b.questions.length) return done();
      var q = b.questions[i]; answered = false;
      wrap.append(h('div', { class: 'qmeta' }, 'Question ' + (i + 1) + ' of ' + b.questions.length,
        h('span', { class: 'bar' }, h('i', { style: 'width:' + Math.round(i / b.questions.length * 100) + '%' }))));
      wrap.append(h('p', { class: 'qtext', html: q.q }));
      var fb = h('div', { class: 'fb', 'aria-live': 'polite' });
      var last = i === b.questions.length - 1;
      var next = h('button', { class: 'btn', onClick: function () { i++; render(); } }, last ? 'See result' : 'Next question');
      next.hidden = true;
      function finish(ok, correctText) {
        if (answered) return; answered = true;
        if (ok) score++; else missed.push({ q: q.q, a: correctText });
        fb.className = 'fb ' + (ok ? 'good' : 'bad');
        fb.innerHTML = (ok ? '<b>Yes! \u2705</b> ' : '<b>Close, not quite \uD83D\uDE05</b> Answer: ' + LMS.esc(correctText) + '. ') + (q.why || '');
        next.hidden = false; next.focus();
      }
      if (q.type === 'num') {
        var inp = h('input', { type: 'number', step: 'any', inputmode: 'decimal', 'aria-label': 'Your answer' });
        var btn = h('button', { class: 'btn', onClick: function () {
          var v = parseFloat(inp.value); if (isNaN(v)) { inp.focus(); return; }
          var ok = Math.abs(v - q.answer) <= (q.tol == null ? 0.01 : q.tol);
          inp.disabled = true; btn.disabled = true;
          finish(ok, q.answer + (q.unit ? ' ' + q.unit : ''));
        } }, 'Check answer');
        inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') btn.click(); });
        wrap.append(h('div', { class: 'numrow' }, inp, q.unit ? h('span', { class: 'muted' }, q.unit) : null, btn));
      } else {
        var opts = h('div', { class: 'opts', role: 'group' });
        q.options.forEach(function (o, k) {
          opts.append(h('button', { class: 'opt', onClick: function () {
            if (answered) return;
            Array.prototype.forEach.call(opts.children, function (c, j) {
              c.disabled = true;
              if (j === q.answer) c.classList.add('right'); else if (j === k) c.classList.add('wrong');
            });
            finish(k === q.answer, q.options[q.answer]);
          } }, o));
        });
        wrap.append(opts);
      }
      wrap.append(fb, next);
    }
    function done() {
      var total = b.questions.length, pct = Math.round(score / total * 100);
      LMS.store.update(function (p) {
        var old = p.quiz[b.id] ? p.quiz[b.id].best : 0;
        p.quiz[b.id] = { best: Math.max(old, score), total: total };
      });
      var best = LMS.store.get().quiz[b.id].best;
      if (LMS.gam) LMS.gam.quizDone(pct);
      var msg = pct >= 85 ? 'Big brain energy. You are ready to move on.' : pct >= 60 ? 'Good start. Reread the parts behind the missed questions and try again.' : 'Reread the lesson slowly, do the Try it boxes on a laptop, then retry.';
      wrap.append(h('div', { class: 'score' }, score + ' / ' + total), h('p', null, msg + ' Your best score here: ' + best + ' / ' + total + '.'));
      if (missed.length) wrap.append(h('p', null, h('b', null, 'Review these:')),
        h('ul', { class: 'missed' }, missed.map(function (m) { return h('li', null, h('span', { html: m.q }), ' ', h('b', null, '→ ' + m.a)); })));
      wrap.append(h('div', { class: 'row' }, h('button', { class: 'btn', onClick: function () { i = 0; score = 0; missed = []; render(); } }, 'Try again')));
    }
    render();
    return wrap;
  }
  LMS.widget('quiz', quiz);

  /* classify drill = quiz where the options are the categories */
  LMS.widget('classify', function (b) {
    return quiz({
      id: b.id, title: b.title,
      questions: b.items.map(function (it) {
        return { q: (b.prompt || 'Classify this:') + ' <b>' + it.text + '</b>', options: b.categories, answer: it.answer, why: it.why };
      })
    });
  });

  /* ---------- tabs ---------- */
  LMS.widget('tabs', function (b) {
    var tabs = h('div', { class: 'tabs', role: 'tablist' }), body = h('div', { class: 'prose' });
    function show(i) {
      Array.prototype.forEach.call(tabs.children, function (c, j) { c.setAttribute('aria-selected', String(i === j)); });
      body.innerHTML = b.tabs[i].html;
      var tw = body.querySelectorAll('table');
      Array.prototype.forEach.call(tw, function (t) { var w = h('div', { class: 'tablewrap' }); t.parentNode.insertBefore(w, t); w.appendChild(t); });
    }
    b.tabs.forEach(function (t, i) { tabs.append(h('button', { class: 'tab', role: 'tab', onClick: function () { show(i); } }, t.label)); });
    show(0);
    return h('div', { class: 'widget read' }, h('h4', null, b.title), tabs, body);
  });

  /* ---------- stepper ---------- */
  LMS.widget('stepper', function (b) {
    var nav = h('div', { class: 'steps', role: 'tablist' }), body = h('div', { class: 'stepbody', 'aria-live': 'polite' });
    function show(i) {
      Array.prototype.forEach.call(nav.children, function (c, j) { c.classList.toggle('on', i === j); c.setAttribute('aria-selected', String(i === j)); });
      var s = b.steps[i];
      body.replaceChildren(h('h5', null, (i + 1) + '. ' + s.title), h('p', { html: s.text }),
        s.example ? h('div', { class: 'ex' }, h('b', null, (b.exampleLabel || 'Example: ')), h('span', { html: s.example })) : null,
        h('div', { class: 'row' },
          h('button', { class: 'btn ghost small', disabled: i === 0 ? true : null, onClick: function () { show(i - 1); } }, 'Back'),
          h('button', { class: 'btn small', disabled: i === b.steps.length - 1 ? true : null, onClick: function () { show(i + 1); } }, 'Next step')));
    }
    b.steps.forEach(function (s, i) { nav.append(h('button', { class: 'stepbtn', role: 'tab', onClick: function () { show(i); } }, String(i + 1), h('span', null, s.title))); });
    show(0);
    return h('div', { class: 'widget' }, h('h4', null, b.title), b.help ? h('p', { class: 'muted' }, b.help) : null, nav, body);
  });

  /* ---------- filterable table ---------- */
  LMS.widget('filterTable', function (b) {
    var id = uid();
    var inp = h('input', { id: id, type: 'search', placeholder: b.placeholder || 'Type to filter', 'aria-label': 'Filter ' + b.title });
    var tbody = h('tbody');
    var count = h('p', { class: 'muted', 'aria-live': 'polite' });
    var table = h('table', null, h('thead', null, h('tr', null, b.headers.map(function (x) { return h('th', null, x); }))), tbody);
    function draw() {
      var q = inp.value.trim().toLowerCase(), n = 0;
      tbody.replaceChildren();
      b.rows.forEach(function (r) {
        if (q && r.join(' ').toLowerCase().indexOf(q) < 0) return;
        n++; tbody.append(h('tr', null, r.map(function (c) { return h('td', { html: c }); })));
      });
      count.textContent = n + ' of ' + b.rows.length + ' shown';
    }
    inp.addEventListener('input', draw); draw();
    return h('div', { class: 'widget read' }, h('h4', null, b.title), b.help ? h('p', { class: 'muted' }, b.help) : null, inp, count, h('div', { class: 'tablewrap' }, table));
  });

  /* ---------- persistent checklist ---------- */
  LMS.widget('checklist', function (b) {
    var saved = LMS.store.get().checks[b.id] || [];
    var count = h('p', { class: 'muted', 'aria-live': 'polite' });
    function tally() { var n = Array.prototype.filter.call(list.querySelectorAll('input'), function (x) { return x.checked; }).length; count.textContent = n + ' of ' + b.items.length + ' done'; }
    var list = h('ul', { class: 'check' }, b.items.map(function (t, i) {
      var id = uid();
      var cb = h('input', { type: 'checkbox', id: id });
      cb.checked = !!saved[i];
      cb.addEventListener('change', function () {
        LMS.store.update(function (p) { var a = p.checks[b.id] || []; a[i] = cb.checked; p.checks[b.id] = a; });
        tally();
      });
      return h('li', null, h('label', { for: id }, cb, h('span', { html: t })));
    }));
    tally();
    return h('div', { class: 'widget' }, h('h4', null, b.title), list, count);
  });

  /* ---------- notepad with copy (saved in this browser) ---------- */
  LMS.widget('notepad', function (b) {
    var id = uid();
    var ta = h('textarea', { id: id, 'aria-label': b.title, placeholder: b.placeholder || '' });
    ta.value = LMS.store.get().notes[b.id] != null ? LMS.store.get().notes[b.id] : (b.text || '');
    ta.addEventListener('input', function () { LMS.store.update(function (p) { p.notes[b.id] = ta.value; }); });
    var cp = h('button', { class: 'btn small', onClick: function () { LMS.copy(ta.value, cp); } }, 'Copy text');
    var reset = h('button', { class: 'btn ghost small', onClick: function () { ta.value = b.text || ''; ta.dispatchEvent(new Event('input')); } }, 'Reset');
    return h('div', { class: 'widget' }, h('h4', null, b.title), b.help ? h('p', { class: 'muted' }, b.help) : null, ta, h('div', { class: 'row' }, cp, reset));
  });

  /* ---------- collection plan builder ---------- */
  LMS.widget('planBuilder', function (b) {
    var vals = {};
    var out = h('pre', { class: 'out-pre' });
    var chips = h('div', { class: 'chips', 'aria-live': 'polite' });
    var grid = h('div', { class: 'fields' });
    b.fields.forEach(function (f) {
      var id = uid();
      var inp = f.multiline ? h('textarea', { id: id, placeholder: f.placeholder || '', style: 'min-height:80px' }) : h('input', { id: id, type: f.type || 'text', placeholder: f.placeholder || '' });
      inp.addEventListener('input', function () { vals[f.id] = inp.value; update(); });
      grid.append(h('label', { for: id, style: f.wide ? 'grid-column:1/-1' : null }, f.label, inp));
    });
    function chip(ok, text) { chips.append(h('span', { class: 'chip ' + (ok ? 'ok' : 'no') }, (ok ? '✓ ' : '✗ ') + text)); }
    function update() {
      var v = function (k) { return (vals[k] || '').trim(); };
      var vars = v('variables').split(/[,\n]/).map(function (x) { return x.trim(); }).filter(Boolean);
      out.textContent = 'COLLECTION PLAN\n' +
        'Goal: ' + (v('goal') || '...') + '\nPlatforms or sources: ' + (v('source') || '...') + '\nVariables (' + vars.length + '): ' + (vars.join(', ') || '...') +
        '\nPeriod: ' + (v('period') || '...') + '\nSample size: ' + (v('sample') || '...') + '\nCollection date: ' + (v('date') || '...');
      chips.replaceChildren();
      chip(v('goal').length > 15, 'Goal is a real question');
      chip(vars.length >= 6, 'Six or more variables');
      chip(/date/i.test(v('variables')), 'Has a date column');
      chip(/link|url/i.test(v('variables')), 'Has a link column');
      chip(parseInt(v('sample'), 10) >= 30, 'Sample of 30 or more');
      chip(v('source').indexOf(',') > -1 || /and|&/i.test(v('source')), 'Two or more sources');
      chip(v('period').length > 3 && v('date').length > 3, 'Period and collection date set');
    }
    update();
    var cp = h('button', { class: 'btn small', onClick: function () { LMS.copy(out.textContent, cp); } }, 'Copy plan');
    return h('div', { class: 'widget' }, h('h4', null, b.title), b.help ? h('p', { class: 'muted' }, b.help) : null, grid, chips, out, h('div', { class: 'row' }, cp));
  });

  /* ---------- dataset doctor ---------- */
  function parseCSV(text) {
    var rows = [], row = [], cur = '', q = false, i, c;
    text = text.replace(/\r/g, '');
    for (i = 0; i < text.length; i++) {
      c = text[i];
      if (q) { if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
      else if (c === '"') q = true;
      else if (c === ',') { row.push(cur); cur = ''; }
      else if (c === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; }
      else cur += c;
    }
    if (cur !== '' || row.length) { row.push(cur); rows.push(row); }
    return rows;
  }
  LMS.parseCSV = parseCSV;

  function diagnose(text) {
    var f = [], rows = parseCSV(text.trim());
    function add(ok, msg) { f.push({ ok: ok, msg: msg }); }
    if (rows.length < 2) { add(false, 'Paste a header row and at least one data row.'); return f; }
    var head = rows[0], data = rows.slice(1), nc = head.length, r, c;
    var nonEmpty = head.filter(function (x) { return x.trim() !== ''; }).length;
    if (nonEmpty <= 1 && nc > 1) add(false, 'Row 1 looks like a title, not a header. Keep one clean header row in row 1.');
    else if (head.some(function (x) { return x.trim() === '' || /^\d+(\.\d+)?$/.test(x.trim()); })) add(false, 'Row 1 has blank or number-only column names. Give every column a clear name.');
    else add(true, 'Row 1 is a clean header with ' + nc + ' named columns.');
    var uniq = {}; head.forEach(function (x) { uniq[x.trim().toLowerCase()] = 1; });
    if (Object.keys(uniq).length !== nc) add(false, 'Two columns share the same name. Every column needs a unique name.');
    var ragged = []; data.forEach(function (d, i) { if (d.length !== nc) ragged.push(i + 2); });
    add(!ragged.length, ragged.length ? 'Rows ' + ragged.join(', ') + ' have a different number of cells than the header. Check for missing or extra commas.' : 'Every row has the same number of cells.');
    var blanks = []; data.forEach(function (d, i) { d.forEach(function (x, j) { if (x.trim() === '') blanks.push(head[j] + ' in row ' + (i + 2)); }); });
    add(!blanks.length, blanks.length ? 'Blank cells: ' + blanks.slice(0, 6).join('; ') + (blanks.length > 6 ? '; and more' : '') + '. Find the real value, or flag it in your Notes sheet. Module 2 shows how to treat gaps.' : 'No blank cells.');
    var textNums = [];
    for (c = 0; c < nc; c++) {
      var col = data.map(function (d) { return (d[c] || '').trim(); }).filter(Boolean);
      if (!col.length) continue;
      var numLike = col.filter(function (x) { return /^[₹$]?\s*-?[\d,]+(\.\d+)?\s*(k|m|lakh|cr|crore|approx\.?)?$/i.test(x); });
      if (numLike.length >= Math.ceil(col.length / 2)) {
        data.forEach(function (d, i) {
          var x = (d[c] || '').trim();
          if (x && !/^-?\d+(\.\d+)?$/.test(x)) textNums.push(head[c] + ' row ' + (i + 2) + ' ("' + x + '")');
        });
      }
    }
    add(!textNums.length, textNums.length ? 'Numbers stored as text: ' + textNums.slice(0, 6).join('; ') + '. Type plain numbers such as 4200, with no K, lakh, commas or symbols.' : 'Number columns hold plain numbers.');
    var badDates = [];
    for (c = 0; c < nc; c++) {
      if (!/date/i.test(head[c])) continue;
      data.forEach(function (d, i) { var x = (d[c] || '').trim(); if (x && !/^\d{4}-\d{2}-\d{2}$/.test(x)) badDates.push(head[c] + ' row ' + (i + 2) + ' ("' + x + '")'); });
    }
    add(!badDates.length, badDates.length ? 'Dates not in YYYY-MM-DD: ' + badDates.join('; ') + '.' : 'Date columns use one format.');
    var catIssues = [];
    for (c = 0; c < nc; c++) {
      var vals = data.map(function (d) { return (d[c] || '').trim(); }).filter(Boolean);
      var distinct = {}; vals.forEach(function (x) { distinct[x] = 1; });
      var keys = Object.keys(distinct);
      if (keys.length < 2 || keys.length > Math.max(8, vals.length * 0.7)) continue;
      if (keys.every(function (k) { return /^-?[\d.,]+$/.test(k); })) continue;
      var groups = {};
      keys.forEach(function (k) { var n = k.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/s$/, ''); (groups[n] = groups[n] || []).push(k); });
      Object.keys(groups).forEach(function (n) { if (groups[n].length > 1) catIssues.push(head[c] + ': ' + groups[n].join(' / ')); });
    }
    add(!catIssues.length, catIssues.length ? 'Same category spelled differently: ' + catIssues.join('; ') + '. Pick one spelling and use it everywhere.' : 'Category names are spelled consistently.');
    var seen = {}, dups = [];
    data.forEach(function (d, i) { var k = d.join('|'); if (seen[k] != null) dups.push((seen[k] + 2) + ' and ' + (i + 2)); else seen[k] = i; });
    add(!dups.length, dups.length ? 'Duplicate rows: rows ' + dups.join('; ') + '. One post should appear once.' : 'No duplicate rows.');
    return f;
  }
  LMS.diagnose = diagnose;

  LMS.widget('datasetDoctor', function (b) {
    var id = uid();
    var ta = h('textarea', { id: id, 'aria-label': 'Dataset in CSV form', style: 'min-height:190px' });
    ta.value = b.messy;
    var res = h('div', { 'aria-live': 'polite' });
    function run() {
      var f = diagnose(ta.value), bad = f.filter(function (x) { return !x.ok; }).length;
      res.replaceChildren(
        h('p', null, h('b', null, bad ? bad + ' problem' + (bad > 1 ? 's' : '') + ' found.' : 'Clean. This dataset follows the rules.')),
        h('ul', { class: 'findings' }, f.map(function (x) { return h('li', { class: x.ok ? 'pass' : 'fail' }, h('span', { class: 'ic' }, x.ok ? '✓' : '✗'), h('span', null, x.msg)); })));
    }
    return h('div', { class: 'widget' }, h('h4', null, b.title), h('p', { class: 'muted' }, b.help || ''), ta,
      h('div', { class: 'row' },
        h('button', { class: 'btn', onClick: run }, 'Check dataset'),
        h('button', { class: 'btn ghost', onClick: function () { ta.value = b.messy; res.replaceChildren(); } }, 'Load messy sample'),
        h('button', { class: 'btn ghost', onClick: function () { ta.value = b.clean; res.replaceChildren(); } }, 'Load clean sample')), res);
  });

  /* ---------- practice datasets (table view + copy) ---------- */
  LMS.widget('datasets', function (b) {
    var tabs = h('div', { class: 'tabs', role: 'tablist' }), body = h('div');
    function show(i) {
      Array.prototype.forEach.call(tabs.children, function (c, j) { c.setAttribute('aria-selected', String(i === j)); });
      var d = b.sets[i], rows = parseCSV(d.csv.trim());
      var table = h('table', null, h('thead', null, h('tr', null, rows[0].map(function (x) { return h('th', null, x); }))),
        h('tbody', null, rows.slice(1).map(function (r) { return h('tr', null, r.map(function (x) { return h('td', null, x); })); })));
      var cp = h('button', { class: 'btn small', onClick: function () { LMS.copy(d.csv.trim(), cp); } }, 'Copy as CSV');
      body.replaceChildren(h('p', { class: 'muted', html: d.note }), h('div', { class: 'tablewrap' }, table),
        h('div', { class: 'row' }, cp), h('p', { class: 'muted' }, 'To use it: copy, paste into cell A1 of a new sheet, then split the text into columns by comma (Lesson 5 shows how).'));
    }
    b.sets.forEach(function (d, i) { tabs.append(h('button', { class: 'tab', role: 'tab', onClick: function () { show(i); } }, d.name)); });
    show(0);
    return h('div', { class: 'widget read' }, h('h4', null, b.title), tabs, body);
  });
})();
