/* Core of the Data Analytics Classroom: registry, storage, router, shell.
   Content lives in modules/*.js and registers itself with LMS.module / LMS.lesson.
   Widgets live in widgets.js and sheet.js and register with LMS.widget. */
(function () {
  'use strict';
  var LMS = window.LMS = { modules: [], widgets: {}, _uid: 0 };

  /* ---------- registry ---------- */
  LMS.module = function (m) { m.lessons = []; LMS.modules.push(m); };
  LMS.lesson = function (mid, l) {
    var m = LMS.modules.filter(function (x) { return x.id === mid; })[0];
    if (!m) { console.error('Unknown module ' + mid); return; }
    l.key = mid + '-' + l.id; l.mod = m; m.lessons.push(l);
  };
  LMS.widget = function (name, fn) { LMS.widgets[name] = fn; };

  /* ---------- small helpers ---------- */
  LMS.uid = function () { return 'u' + (++LMS._uid); };
  var h = LMS.h = function (tag, attrs) {
    var el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2).toLowerCase(), v);
      else el.setAttribute(k, v === true ? '' : v);
    });
    for (var i = 2; i < arguments.length; i++) add(el, arguments[i]);
    return el;
  };
  function add(el, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { add(el, x); }); return; }
    el.appendChild(c.nodeType ? c : document.createTextNode(String(c)));
  }
  LMS.esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
  LMS.fmt = function (n, kind) {
    if (typeof n !== 'number' || !isFinite(n)) return '–';
    var r = Number(n.toFixed(2));
    if (kind === 'pct') return Number((n * 100).toFixed(2)) + '%';
    if (kind === 'inr') return '₹' + r.toLocaleString('en-IN');
    return r.toLocaleString('en-IN');
  };
  LMS.copy = function (text, btn) {
    var old = btn ? btn.textContent : '';
    function done(ok) {
      if (!btn) return;
      btn.textContent = ok ? 'Copied' : 'Copy blocked: select the text and copy by hand';
      setTimeout(function () { btn.textContent = old; }, 2000);
    }
    try { navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); }); }
    catch (e) { done(false); }
  };
  /* html helpers for authoring content */
  LMS.tbl = function (heads, rows) {
    return '<table><thead><tr>' + heads.map(function (x) { return '<th>' + x + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>';
  };
  LMS.ul = function (a) { return '<ul>' + a.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>'; };
  LMS.ol = function (a) { return '<ol>' + a.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol>'; };

  /* ---------- progress storage (this browser only) ---------- */
  var mem = null;
  function blank() { return { lessons: {}, quiz: {}, checks: {}, notes: {} }; }
  LMS.store = {
    get: function () {
      var p = null;
      try { var s = localStorage.getItem('dac.progress.v1'); if (s) p = JSON.parse(s); } catch (e) { }
      if (!p) p = mem || blank();
      ['lessons', 'quiz', 'checks', 'notes'].forEach(function (k) { if (!p[k]) p[k] = {}; });
      return p;
    },
    set: function (p) {
      mem = p;
      try { localStorage.setItem('dac.progress.v1', JSON.stringify(p)); } catch (e) { }
      window.dispatchEvent(new Event('lms-progress'));
    },
    update: function (fn) { var p = LMS.store.get(); fn(p); LMS.store.set(p); }
  };

  /* ---------- progress maths ---------- */
  function realModules() { return LMS.modules.filter(function (m) { return !m.soon; }); }
  function modDone(m) { var p = LMS.store.get(); return m.lessons.filter(function (l) { return p.lessons[l.key]; }).length; }
  function overall() {
    var tot = 0, done = 0;
    realModules().forEach(function (m) { tot += m.lessons.length; done += modDone(m); });
    return tot ? Math.round(done / tot * 100) : 0;
  }

  /* ---------- rendering ---------- */
  var app, side;
  function renderBlock(b) {
    if (b.t === 'html') return h('div', { class: 'prose', html: b.html });
    if (b.t === 'callout') return h('aside', { class: 'callout ' + (b.kind || '') }, h('strong', null, b.title || ''), h('div', { html: b.html }));
    var f = LMS.widgets[b.t];
    return f ? f(b) : h('p', null, 'Missing widget: ' + b.t);
  }
  function wrapTables(root) {
    Array.prototype.slice.call(root.querySelectorAll('table:not(.sheet)')).forEach(function (t) {
      if (t.parentNode.classList && t.parentNode.classList.contains('tablewrap')) return;
      var w = h('div', { class: 'tablewrap' });
      t.parentNode.insertBefore(w, t); w.appendChild(t);
    });
  }

  function renderSide(cur) {
    var p = LMS.store.get();
    side.replaceChildren();
    LMS.modules.forEach(function (m) {
      if (m.soon) {
        side.append(h('h6', null, 'Module ' + m.num), h('div', { class: 'soon' }, m.title + ' (coming soon)'));
        return;
      }
      var open = cur.mod && cur.mod.id === m.id || (!cur.mod && m.id === realModules()[0].id);
      side.append(h('h6', null, 'Module ' + m.num + ' · ' + modDone(m) + ' of ' + m.lessons.length + ' done'));
      side.append(h('a', { class: 'modlink', href: '#' + m.id, 'aria-current': cur.mod === m && !cur.lesson ? 'page' : null }, m.title));
      if (open) {
        side.append(h('ol', null, m.lessons.map(function (l, i) {
          var done = !!p.lessons[l.key];
          return h('li', { class: done ? 'done' : '' }, h('a', { href: '#' + l.key, 'aria-current': cur.lesson === l ? 'page' : null },
            h('span', { class: 'tick', 'aria-hidden': 'true' }, done ? '✓' : String(i + 1)), h('span', null, l.title, done ? h('span', { class: 'sr', style: 'position:absolute;left:-9999px' }, ' (completed)') : null)));
        })));
      }
    });
    var pct = overall();
    var bar = document.getElementById('overallBar'), txt = document.getElementById('overallTxt');
    if (bar) bar.style.width = pct + '%';
    if (txt) txt.textContent = pct + '% done';
  }

  function band(fxLabel, title, lede, extra) {
    return h('section', { class: 'band' }, h('div', { class: 'wrap' },
      fxLabel === 'A1' ? h('img', { class: 'home-logo', src: BRAND.logo, alt: 'Daksh Learning logo' }) : null,
      h('div', { class: 'fx' }, h('b', null, 'fx'), fxLabel),
      h('h1', null, title), lede ? h('p', { class: 'lede' }, lede) : null, extra));
  }

  function viewHome() {
    var first = realModules()[0];
    var cards = LMS.modules.map(function (m) {
      if (m.soon) return h('div', { class: 'card soon' }, h('span', { class: 'tag' }, 'Coming soon'), h('h3', null, 'Module ' + m.num), h('p', null, m.title));
      return h('a', { class: 'card', href: '#' + m.id }, h('span', { class: 'tag' }, modDone(m) + ' of ' + m.lessons.length + ' lessons done'),
        h('h3', null, 'Module ' + m.num + ': ' + m.title), h('p', null, m.blurb), h('p', { class: 'muted' }, m.hours + ' hours · ' + m.lessons.length + ' lessons'));
    });
    return [
      band('A1', 'Read the numbers behind media.', 'A self-paced classroom for Data Analytics in Media. Short lessons, live calculators, a working spreadsheet and quizzes, all on one page.',
        h('div', { class: 'cta' }, h('a', { class: 'btn', href: '#' + first.id }, 'Start Module ' + first.num), h('a', { class: 'btn ghost', href: '#' + first.id + '-p7' }, 'Jump to the practice test'))),
      h('div', { class: 'wrap section' },
        h('h2', null, 'Modules'), h('div', { class: 'cards' }, cards),
        h('h2', null, 'How every lesson works'),
        h('ol', { class: 'how' },
          h('li', null, h('b', null, 'Learn'), 'The idea explained from zero, in plain words.'),
          h('li', null, h('b', null, 'See'), 'Worked examples from media and from other industries you may work in.'),
          h('li', null, h('b', null, 'Try it'), 'Calculators, drills and a real spreadsheet you can type into.'),
          h('li', null, h('b', null, 'Check'), 'Cue questions and quizzes with instant feedback.')),
        h('p', { class: 'muted' }, 'Your progress is saved in this browser on this device. It is not shared with your teacher. Use the same browser to pick up where you stopped.'))
    ];
  }

  function viewModule(m) {
    var p = LMS.store.get();
    var items = m.lessons.map(function (l, i) {
      var done = !!p.lessons[l.key];
      return h('li', { class: done ? 'done' : '' }, h('a', { href: '#' + l.key },
        h('span', { class: 'num' }, String(i + 1)), h('span', { class: 't' }, l.title), h('span', { class: 'm' }, l.minutes + ' min'), h('span', { class: 'st' }, done ? 'DONE' : 'TODO')));
    });
    var next = m.lessons.filter(function (l) { return !p.lessons[l.key]; })[0] || m.lessons[0];
    return [
      band('Module ' + m.num, m.title, m.blurb, h('div', { class: 'cta' }, h('a', { class: 'btn', href: '#' + next.key }, modDone(m) ? 'Continue: ' + next.title : 'Start lesson 1'))),
      h('div', { class: 'wrap section' },
        h('h2', null, 'What you will be able to do'), h('div', { class: 'prose', html: LMS.ol(m.outcomes || []) }),
        h('h2', null, 'Lessons (' + m.hours + ' hours in total)'), h('ul', { class: 'lessonlist' }, items))
    ];
  }

  function viewLesson(l) {
    var m = l.mod, idx = m.lessons.indexOf(l), p = LMS.store.get();
    var prev = m.lessons[idx - 1], next = m.lessons[idx + 1];
    var secs = l.sections.map(function (s, i) {
      return h('section', { class: 'section' }, h('h2', null, s.title), s.blocks.map(renderBlock));
    });
    var doneBtn = h('button', { class: 'btn' + (p.lessons[l.key] ? ' ghost' : ''), onClick: function () {
      var was = !!LMS.store.get().lessons[l.key];
      LMS.store.update(function (q) { if (was) delete q.lessons[l.key]; else q.lessons[l.key] = true; });
      doneBtn.textContent = !was ? 'Completed. Click to undo' : 'Mark lesson complete';
      doneBtn.classList.toggle('ghost', !was);
    } }, p.lessons[l.key] ? 'Completed. Click to undo' : 'Mark lesson complete');
    return [
      band('Lesson ' + (idx + 1) + ' of ' + m.lessons.length + ' · ' + l.minutes + ' min', l.title, l.intro),
      h('div', { class: 'wrap' }, secs,
        h('div', { class: 'lessonnav' },
          prev ? h('a', { class: 'btn ghost', href: '#' + prev.key }, '← ' + prev.title) : h('a', { class: 'btn ghost', href: '#' + m.id }, '← Module overview'),
          doneBtn,
          next ? h('a', { class: 'btn', href: '#' + next.key }, next.title + ' →') : h('a', { class: 'btn', href: '#home' }, 'Back to all modules')))
    ];
  }

  function parse() {
    var hash = location.hash.replace(/^#/, '');
    var cur = { view: 'home' };
    if (!hash || hash === 'home') return cur;
    var mod = LMS.modules.filter(function (x) { return hash === x.id || hash.indexOf(x.id + '-') === 0; })[0];
    if (!mod || mod.soon) return cur;
    cur.mod = mod; cur.view = 'module';
    if (hash !== mod.id) {
      var l = mod.lessons.filter(function (x) { return x.key === hash; })[0];
      if (l) { cur.lesson = l; cur.view = 'lesson'; }
    }
    return cur;
  }

  var lastKey = null;
  function route() {
    var cur = parse();
    var nodes = cur.view === 'lesson' ? viewLesson(cur.lesson) : cur.view === 'module' ? viewModule(cur.mod) : viewHome();
    nodes.push(h('footer', { class: 'brandfoot' }, h('img', { src: BRAND.logo, alt: '' }), 'Daksh Learning'));
    app.replaceChildren.apply(app, nodes);
    wrapTables(app);
    renderSide(cur);
    document.body.classList.remove('nav-open');
    var mb = document.getElementById('menuBtn'); if (mb) mb.setAttribute('aria-expanded', 'false');
    var key = cur.view + (cur.lesson ? cur.lesson.key : cur.mod ? cur.mod.id : '');
    if (key !== lastKey) { window.scrollTo(0, 0); lastKey = key; }
    document.title = (cur.lesson ? cur.lesson.title + ' | ' : cur.mod ? 'Module ' + cur.mod.num + ' | ' : '') + 'Daksh Learning | Data Analytics Classroom';
  }

  LMS.start = function () {
    app = document.getElementById('app'); side = document.getElementById('side');
    var mb = document.getElementById('menuBtn'), sc = document.getElementById('scrim');
    mb.addEventListener('click', function () {
      var o = document.body.classList.toggle('nav-open'); mb.setAttribute('aria-expanded', String(o));
    });
    sc.addEventListener('click', function () { document.body.classList.remove('nav-open'); mb.setAttribute('aria-expanded', 'false'); });
    window.addEventListener('hashchange', route);
    window.addEventListener('lms-progress', function () { renderSide(parse()); });
    route();
  };
})();
