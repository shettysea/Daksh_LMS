/* XP, levels, streaks, badges, quotes, toasts and confetti. Everything is derived from the saved progress. */
(function () {
  'use strict';
  var LMS = window.LMS, h = LMS.h;
  var G = LMS.gam = {};

  var LEVELS = ['Newbie', 'Data Intern', 'Junior Analyst', 'Insight Hunter', 'Dashboard Boss', 'Data Wizard', 'Analytics Legend'];

  /* ---------- days and streak ---------- */
  function ymd(d) { var m = d.getMonth() + 1, x = d.getDate(); return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (x < 10 ? '0' : '') + x; }
  G.touchDay = function () {
    var t = ymd(new Date()), p = LMS.store.get();
    if (p.days.indexOf(t) < 0) { LMS.store.update(function (q) { q.days.push(t); if (q.days.length > 400) q.days.shift(); }); }
  };
  G.streak = function (p) {
    p = p || LMS.store.get();
    var set = {}; p.days.forEach(function (d) { set[d] = 1; });
    var d = new Date(), n = 0;
    if (!set[ymd(d)]) d.setDate(d.getDate() - 1);
    while (set[ymd(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  };

  /* ---------- XP and level ---------- */
  G.xp = function (p) {
    p = p || LMS.store.get();
    var x = 0;
    Object.keys(p.lessons).forEach(function (k) { if (p.lessons[k]) x += 50; });
    Object.keys(p.quiz).forEach(function (k) { x += (p.quiz[k].best || 0) * 10; });
    Object.keys(p.games).forEach(function (k) { x += p.games[k].xp || 0; });
    x += p.days.length * 5;
    return x;
  };
  G.level = function (p) {
    var x = G.xp(p), n = Math.floor(x / 100);
    return { n: n + 1, name: LEVELS[Math.min(n, LEVELS.length - 1)], into: x % 100, xp: x };
  };

  /* ---------- badges ---------- */
  function allDone(p, mid) {
    var m = LMS.modules.filter(function (x) { return x.id === mid; })[0];
    return !!m && m.lessons.length > 0 && m.lessons.every(function (l) { return p.lessons[l.key]; });
  }
  var BADGES = [
    { id: 'first', icon: '🚀', name: 'First Step', desc: 'Finish your first lesson', ok: function (p) { return Object.keys(p.lessons).some(function (k) { return p.lessons[k]; }); } },
    { id: 'four', icon: '📚', name: 'Bookworm', desc: 'Finish 4 lessons', ok: function (p) { return Object.keys(p.lessons).filter(function (k) { return p.lessons[k]; }).length >= 4; } },
    { id: 'whiz', icon: '🧠', name: 'Quiz Whiz', desc: 'Score 100% on any quiz', ok: function (p) { return Object.keys(p.quiz).some(function (k) { return p.quiz[k].total && p.quiz[k].best === p.quiz[k].total; }); } },
    { id: 'sheet', icon: '📊', name: 'Sheet Wizard', desc: 'Complete the spreadsheet lab', ok: function (p) { var c = p.checks.sheetlab; return Array.isArray(c) ? c.some(Boolean) : !!c; } },
    { id: 'm1', icon: '🏆', name: 'Module Master', desc: 'Finish every lesson in Module 1', ok: function (p) { return allDone(p, 'm1'); } },
    { id: 'fire', icon: '🔥', name: 'On Fire', desc: 'Learn 3 days in a row', ok: function (p) { return G.streak(p) >= 3; } },
    { id: 'game', icon: '🎮', name: 'Game On', desc: 'Play any arcade game', ok: function (p) { return Object.keys(p.games).length > 0; } },
    { id: 'speed', icon: '⚡', name: 'Speed Demon', desc: 'Get 10 right in Quick Maths', ok: function (p) { return p.games.sprint && p.games.sprint.best >= 10; } },
    { id: 'eye', icon: '🕵️', name: 'Sharp Eye', desc: 'Clear all rounds in Data Detective', ok: function (p) { return p.games.detective && p.games.detective.best >= 3; } },
    { id: 'streak', icon: '🎯', name: 'Hot Streak', desc: 'Get 8 in a row in Rate Showdown', ok: function (p) { return p.games.rate && p.games.rate.best >= 8; } }
  ];
  G.badges = function (p) { p = p || LMS.store.get(); return BADGES.map(function (b) { return { id: b.id, icon: b.icon, name: b.name, desc: b.desc, got: !!b.ok(p) }; }); };

  /* ---------- game results ---------- */
  G.award = function (id, score, xp) {
    LMS.store.update(function (p) {
      var g = p.games[id] || { best: 0, xp: 0, plays: 0 };
      g.plays++; g.best = Math.max(g.best, score); g.xp = Math.max(g.xp, xp);
      p.games[id] = g;
    });
    if (xp >= 20) G.confetti();
  };

  /* ---------- toast ---------- */
  var toastBox;
  G.toast = function (msg, icon) {
    if (!toastBox) { toastBox = h('div', { class: 'toasts', 'aria-live': 'polite' }); document.body.append(toastBox); }
    var t = h('div', { class: 'toast' }, h('span', { class: 'ti' }, icon || '✨'), h('span', null, msg));
    toastBox.append(t);
    setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 350); }, 3200);
  };

  /* ---------- confetti ---------- */
  G.confetti = function () {
    try { if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return; } catch (e) { }
    var c = document.createElement('canvas'); c.className = 'confetti'; c.setAttribute('aria-hidden', 'true');
    var W = c.width = window.innerWidth, H = c.height = window.innerHeight, ctx = c.getContext('2d');
    document.body.append(c);
    var cols = ['#f0b84a', '#023ff9', '#04045e', '#ffffff', '#bcbcbc', '#ff6b9d'];
    var ps = [], i;
    for (i = 0; i < 140; i++) ps.push({ x: W / 2 + (Math.random() - .5) * W * .3, y: H * .35, vx: (Math.random() - .5) * 16, vy: -Math.random() * 15 - 4, s: 5 + Math.random() * 7, r: Math.random() * 6, vr: (Math.random() - .5) * .4, c: cols[i % cols.length] });
    var t0 = null;
    function frame(t) {
      if (t0 === null) t0 = t;
      var dt = t - t0; ctx.clearRect(0, 0, W, H);
      ps.forEach(function (p) {
        p.vy += .5; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.globalAlpha = Math.max(0, 1 - dt / 2200);
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .6); ctx.restore();
      });
      if (dt < 2300) requestAnimationFrame(frame); else c.remove();
    }
    requestAnimationFrame(frame);
  };

  /* ---------- celebration lines ---------- */
  var HYPE = ['Lesson cleared. Absolute W.', 'You ate that. Brain gains unlocked.', 'That is a wrap. Main character behavior.', 'Certified data nerd moment.', 'Another one. Your future self says thanks.', 'No notes. Next lesson?'];
  G.hype = function () { return HYPE[Math.floor(Math.random() * HYPE.length)]; };
  G.lessonDone = function () { G.confetti(); G.toast(G.hype() + ' +50 XP', '🎉'); };
  G.quizDone = function (pct) { if (pct === 100) { G.confetti(); G.toast('Perfect score. Big brain energy.', '🧠'); } };

  /* ---------- watch for level ups and new badges ---------- */
  var lastLevel = null;
  function watch() {
    var p = LMS.store.get(), lv = G.level(p).n;
    if (lastLevel !== null && lv > lastLevel) { G.confetti(); G.toast('Level ' + lv + ': ' + G.level(p).name, '🆙'); }
    lastLevel = lv;
    var fresh = G.badges(p).filter(function (b) { return b.got && p.seen.indexOf(b.id) < 0; });
    if (fresh.length) {
      LMS.store.update(function (q) { fresh.forEach(function (b) { if (q.seen.indexOf(b.id) < 0) q.seen.push(b.id); }); });
      fresh.forEach(function (b, i) { setTimeout(function () { G.toast('Badge unlocked: ' + b.name, b.icon); }, 900 * (i + 1)); });
    }
    chips();
  }
  function chips() {
    var el = document.getElementById('chips'); if (!el) return;
    var p = LMS.store.get(), lv = G.level(p), st = G.streak(p);
    el.replaceChildren(
      h('span', { class: 'chip fire', title: 'Day streak' }, '🔥 ' + st),
      h('span', { class: 'chip xp', title: 'Total XP' }, '⚡ ' + lv.xp + ' XP'),
      h('span', { class: 'chip lv', title: lv.name }, 'Lv ' + lv.n));
  }
  G.init = function () { G.touchDay(); lastLevel = G.level().n; var p = LMS.store.get(); chips(); window.addEventListener('lms-progress', watch); watch(); };

  /* ---------- player card ---------- */
  G.playerCard = function () {
    var p = LMS.store.get(), lv = G.level(p), st = G.streak(p), bs = G.badges(p), got = bs.filter(function (b) { return b.got; }).length;
    return h('section', { class: 'player', 'aria-label': 'Your player card' },
      h('div', { class: 'ptop' },
        h('div', { class: 'lvl' }, h('small', null, 'LVL'), String(lv.n)),
        h('div', { class: 'pinfo' }, h('h3', null, lv.name), h('div', { class: 'xpbar', role: 'img', 'aria-label': lv.into + ' of 100 XP to the next level' }, h('i', { style: 'width:' + lv.into + '%' })),
          h('p', null, lv.into + ' / 100 XP to Level ' + (lv.n + 1))),
        h('div', { class: 'pstat' }, h('b', null, '🔥 ' + st), h('span', null, st === 1 ? 'day streak' : 'day streak'))),
      h('div', { class: 'badges' }, bs.map(function (b) {
        return h('div', { class: 'badge' + (b.got ? ' got' : ''), title: b.name + ': ' + b.desc }, h('span', { class: 'bi' }, b.got ? b.icon : '🔒'), h('span', { class: 'bn' }, b.name));
      })),
      h('p', { class: 'muted small' }, got + ' of ' + bs.length + ' badges. Learn, play and keep your streak alive to unlock the rest.'));
  };

  /* ---------- quotes ---------- */
  var QUOTES = LMS.QUOTES || [{ t: 'Learn it, flex it, teach it.', a: 'Daksh Learning' }];
  function dayNo() { var d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000); }
  G.quote = function (seed) {
    var i = seed == null ? dayNo() : seed;
    return QUOTES[Math.abs(i) % QUOTES.length];
  };
  G.quoteCard = function (opts) {
    opts = opts || {};
    var idx = opts.seed != null ? opts.seed : dayNo();
    var box = h('figure', { class: 'quote' });
    function paint() {
      var q = G.quote(idx);
      var kids = [h('div', { class: 'qk' }, opts.label || 'Quote of the day'), h('blockquote', null, q.t), h('figcaption', null, q.a)];
      if (opts.shuffle !== false) kids.push(h('button', { class: 'btn ghost small', onClick: function () { idx += 1 + Math.floor(Math.random() * 5); paint(); } }, 'Another one'));
      box.replaceChildren.apply(box, kids);
    }
    paint();
    return box;
  };
})();
