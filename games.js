/* Arcade: four quick games that practise the same skills as the lessons. Results feed XP and badges. */
(function () {
  'use strict';
  var LMS = window.LMS, h = LMS.h, G = LMS.gam;
  function rnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = rnd(0, i), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function n(x) { return Number(x).toLocaleString('en-IN'); }
  function inr(x) { return '₹' + n(x); }
  function alive(el) { return document.body.contains(el); }

  /* ================= 1. Rate Showdown ================= */
  function rateGame(box) {
    var streak = 0, over = false, lock = false, root = h('div', { class: 'game' });
    var TYPES = [
      { name: 'success rate', a: 'Matches won', b: 'Matches played', lo: 0.3, hi: 0.9, dens: [10, 12, 15, 20, 25, 30, 40] },
      { name: 'accuracy', a: 'Correct answers', b: 'Questions', lo: 0.4, hi: 0.95, dens: [20, 25, 40, 50, 60, 80] },
      { name: 'strike rate', a: 'Goals', b: 'Shots', lo: 0.1, hi: 0.5, dens: [20, 30, 40, 50, 60] },
      { name: 'attendance', a: 'Days present', b: 'Working days', lo: 0.7, hi: 0.98, dens: [20, 22, 25, 50, 100] }
    ];
    function side(t) { var den = pick(t.dens), r = t.lo + Math.random() * (t.hi - t.lo), num = Math.max(1, Math.round(den * r)); return { num: num, den: den, r: num / den }; }
    function round() {
      var t = pick(TYPES), A, B, tries = 0;
      do { A = side(t); B = side(t); tries++; } while (Math.abs(A.r - B.r) / Math.max(A.r, B.r) < 0.12 && tries < 50);
      var high = Math.random() < 0.7, winner = (A.r > B.r) === high ? 0 : 1;
      lock = false;
      var fb = h('p', { class: 'gfb', 'aria-live': 'polite' }, '');
      function card(S, label, idx) {
        var btn = h('button', { class: 'pick', onClick: function () { choose(idx); } },
          h('span', { class: 'plab' }, label), h('span', { class: 'pnum' }, n(S.num)), h('span', { class: 'psub' }, t.a), h('span', { class: 'pnum' }, n(S.den)), h('span', { class: 'psub' }, t.b), h('span', { class: 'reveal', hidden: true }, (S.r * 100).toFixed(2) + '%'));
        return btn;
      }
      var cA = card(A, 'A', 0), cB = card(B, 'B', 1);
      function choose(i) {
        if (lock) return; lock = true;
        [cA, cB].forEach(function (c, k) { c.querySelector('.reveal').hidden = false; c.classList.add(k === winner ? 'right' : 'wrong'); c.disabled = true; });
        if (i === winner) { streak++; fb.textContent = 'Correct. Streak ' + streak + '.'; fb.className = 'gfb good'; setTimeout(function () { if (alive(root)) draw(); }, 1300); }
        else { over = true; fb.textContent = 'Oops. Wrong pick.'; fb.className = 'gfb bad'; setTimeout(function () { if (alive(root)) draw(); }, 1300); }
      }
      return h('div', null, h('p', { class: 'gq' }, 'Which one has the ', h('b', null, high ? 'HIGHER' : 'LOWER'), ' ' + t.name + '?'), h('div', { class: 'pair' }, cA, cB), fb);
    }
    function draw() {
      if (over) {
        var xp = Math.min(100, streak * 5); G.award('rate', streak, xp);
        root.replaceChildren(h('div', { class: 'gover' }, h('div', { class: 'big' }, String(streak)), h('p', null, streak >= 8 ? 'Unreal. That is a Hot Streak.' : streak >= 4 ? 'Solid run.' : 'Warm up done. Go again.'), h('p', { class: 'muted' }, '+' + xp + ' XP'),
          h('button', { class: 'btn', onClick: function () { streak = 0; over = false; draw(); } }, 'Play again')));
        return;
      }
      root.replaceChildren(h('div', { class: 'gstat' }, h('span', null, 'Streak: ' + streak), h('span', { class: 'muted' }, 'Work it out in your head. One miss ends the run.')), round());
    }
    draw(); return root;
  }

  /* ================= 2. Metric Match ================= */
  function matchGame() {
    var PAIRS = [
      ['Mean (average)', 'sum of values \u00f7 number of values'], ['Median', 'the middle value when sorted'], ['Mode', 'the value that appears most often'],
      ['Range', 'largest value \u2212 smallest value'], ['Percentage', 'part \u00f7 whole \u00d7 100'], ['Percentage change', '(new \u2212 old) \u00f7 old \u00d7 100'],
      ['Profit', 'money earned \u2212 money spent'], ['Profit margin', 'profit \u00f7 sales \u00d7 100'], ['Ratio', 'one amount compared with another']];
    var root = h('div', { class: 'game' });
    function start() {
      var chosen = shuffle(PAIRS).slice(0, 6), cards = [];
      chosen.forEach(function (p, i) { cards.push({ id: i, t: p[0], k: 'm' }); cards.push({ id: i, t: p[1], k: 'f' }); });
      cards = shuffle(cards);
      var first = null, lock = false, moves = 0, found = 0, mv = h('span', null, 'Moves: 0'), grid = h('div', { class: 'memgrid' });
      cards.forEach(function (c) {
        var el = h('button', { class: 'mem ' + c.k, 'aria-label': 'Hidden card' }, h('span', { class: 'face' }, c.t));
        c.el = el;
        el.addEventListener('click', function () {
          if (lock || el.classList.contains('up') || el.classList.contains('ok')) return;
          el.classList.add('up'); el.setAttribute('aria-label', c.t);
          if (!first) { first = c; return; }
          moves++; mv.textContent = 'Moves: ' + moves;
          var a = first; first = null;
          if (a.id === c.id && a.k !== c.k) {
            a.el.classList.replace('up', 'ok'); el.classList.replace('up', 'ok'); found++;
            if (found === 6) finish();
          } else {
            lock = true;
            setTimeout(function () { a.el.classList.remove('up'); el.classList.remove('up'); a.el.setAttribute('aria-label', 'Hidden card'); el.setAttribute('aria-label', 'Hidden card'); lock = false; }, 850);
          }
        });
        grid.append(el);
      });
      function finish() {
        var score = Math.max(1, 24 - moves), xp = Math.max(10, 70 - (moves - 6) * 5); G.award('match', score, xp);
        setTimeout(function () {
          root.replaceChildren(h('div', { class: 'gover' }, h('div', { class: 'big' }, moves + ''), h('p', null, 'moves to match all 6' + (moves <= 8 ? '. Elite memory.' : '.')), h('p', { class: 'muted' }, '+' + xp + ' XP'),
            h('button', { class: 'btn', onClick: start }, 'New board')));
        }, 700);
      }
      root.replaceChildren(h('div', { class: 'gstat' }, mv, h('span', { class: 'muted' }, 'Match each term with its meaning.')), grid);
    }
    start(); return root;
  }

  /* ================= 3. Data Detective ================= */
  function detectiveGame() {
    var ROUNDS = [
      { head: ['name', 'city', 'marks', 'joined'], rows: [['Asha', 'Mumbai', '78', '2026-06-01'], ['Ravi', 'pune', '85', '2026-06-03'], ['Neha', 'Mumbai', 'eighty', '2026-06-05'], ['Karan', 'Delhi', '64', '3 June']], bad: ['1,1', '2,2', '3,3'], tip: 'Spellings, number types and date formats must match.' },
      { head: ['item', 'qty', 'price', 'category'], rows: [['Notebook', '10', '45', 'Stationery'], ['Pen', '20', '', 'Stationery'], ['Bag', '5', '\u20b9750', 'Accessories'], ['Bottle', '3', '300', 'accessories']], bad: ['1,2', '2,2', '3,3'], tip: 'Blanks, symbols inside numbers and spelling twins all cause trouble.' },
      { head: ['date', 'expense', 'amount', 'mode'], rows: [['2026-11-01', 'Food', '250', 'UPI'], ['2026/11/02', 'Travel', '120', 'UPI'], ['2026-11-03', 'Food', '-80', 'Cash'], ['2026-11-04', 'Rent', '5000', 'upi']], bad: ['1,0', '2,2', '3,3'], tip: 'Odd formats, impossible values and case differences all count.' }
    ];
    var root = h('div', { class: 'game' }), cleared = 0, lives = 3, ri = 0;
    function draw() {
      if (lives <= 0 || ri >= ROUNDS.length) return end();
      var R = ROUNDS[ri], found = {}, nfound = 0;
      var info = h('div', { class: 'gstat' }, h('span', null, 'Round ' + (ri + 1) + ' of ' + ROUNDS.length), h('span', null, '❤️'.repeat(lives)), h('span', { class: 'muted' }, R.bad.length + ' problems hiding'));
      var fb = h('p', { class: 'gfb', 'aria-live': 'polite' }, 'Tap the cells that break the dataset rules.');
      var tbl = h('table', { class: 'dtable' }, h('thead', null, h('tr', null, R.head.map(function (x) { return h('th', null, x); }))));
      var tb = h('tbody'); tbl.append(tb);
      R.rows.forEach(function (row, r) {
        tb.append(h('tr', null, row.map(function (v, c) {
          var key = r + ',' + c, td = h('td', null, h('button', { class: 'dcell' + (v === '' ? ' blank' : ''), 'aria-label': v === '' ? 'blank cell' : v, onClick: function (e) { tap(key, e.currentTarget); } }, v === '' ? '(empty)' : v));
          return td;
        })));
      });
      function tap(key, el) {
        if (found[key] || el.disabled) return;
        if (R.bad.indexOf(key) >= 0) {
          found[key] = 1; nfound++; el.classList.add('hit'); el.disabled = true; fb.textContent = 'Nice catch. ' + (R.bad.length - nfound) + ' to go.'; fb.className = 'gfb good';
          if (nfound === R.bad.length) { cleared++; fb.textContent = 'Round cleared. ' + R.tip; setTimeout(function () { if (alive(root)) { ri++; draw(); } }, 1700); }
        } else {
          lives--; el.classList.add('miss'); fb.textContent = 'That cell is fine. Lose a life.'; fb.className = 'gfb bad';
          info.children[1].textContent = '❤️'.repeat(lives);
          if (lives <= 0) setTimeout(function () { if (alive(root)) draw(); }, 900);
        }
      }
      root.replaceChildren(info, h('div', { class: 'tablewrap' }, tbl), fb);
    }
    function end() {
      var xp = cleared * 15 + (cleared === ROUNDS.length ? lives * 5 : 0); G.award('detective', cleared, xp);
      root.replaceChildren(h('div', { class: 'gover' }, h('div', { class: 'big' }, cleared + '/' + ROUNDS.length), h('p', null, cleared === ROUNDS.length ? 'Case closed. Sharp Eye unlocked.' : 'Rounds cleared. Messy data is sneaky. Give it another go.'), h('p', { class: 'muted' }, '+' + xp + ' XP'),
        h('button', { class: 'btn', onClick: function () { cleared = 0; lives = 3; ri = 0; draw(); } }, 'Play again')));
    }
    draw(); return root;
  }

  /* ================= 4. Formula Sprint ================= */
  function sprintGame() {
    var root = h('div', { class: 'game' });
    function q() {
      var t = rnd(0, 6);
      if (t === 0) { var base = rnd(1, 10) * 40, p = pick([5, 10, 15, 20, 25, 50]); return { s: 'What is ' + p + '% of ' + n(base) + '?', a: base * p / 100 }; }
      if (t === 1) { var pr = rnd(2, 20) * 100, d = pick([10, 20, 25, 50]); return { s: 'A bag costs ' + inr(pr) + ' and is ' + d + '% off. Sale price in \u20b9?', a: pr * (100 - d) / 100 }; }
      if (t === 2) { var x = rnd(5, 40), y = rnd(5, 40), z = rnd(5, 40); while ((x + y + z) % 3) z++; return { s: 'Average of ' + x + ', ' + y + ' and ' + z + '?', a: (x + y + z) / 3 }; }
      if (t === 3) { var cost = pick([200, 400, 500, 800]), pc = pick([10, 20, 25, 50]); return { s: 'Bought for ' + inr(cost) + ', sold for ' + inr(cost * (100 + pc) / 100) + '. Profit in %?', a: pc }; }
      if (t === 4) { var old = pick([40, 80, 100, 200, 400]), pi = pick([10, 20, 25, 50]); return { s: 'A price rises from ' + inr(old) + ' to ' + inr(old * (100 + pi) / 100) + '. Increase in %?', a: pi }; }
      if (t === 5) { var hrs = rnd(2, 6), v = rnd(3, 15) * 10; return { s: 'A bus covers ' + n(v * hrs) + ' km in ' + hrs + ' hours. Speed in km/h?', a: v }; }
      var each = rnd(3, 20), cnt = rnd(2, 12); return { s: cnt + ' pens cost ' + inr(each * cnt) + '. Cost of one pen in \u20b9?', a: each };
    }
    function start() {
      var left = 45, score = 0, cur = q(), done = false;
      var timer = h('span', { class: 'timer' }, left + 's'), sc = h('span', null, 'Score: 0');
      var qt = h('p', { class: 'gq' }, cur.s), inp = h('input', { type: 'number', step: 'any', inputmode: 'decimal', 'aria-label': 'Your answer', autocomplete: 'off' }), fb = h('p', { class: 'gfb', 'aria-live': 'polite' }, '');
      function submit() {
        if (done) return; var v = parseFloat(inp.value); if (isNaN(v)) return;
        if (Math.abs(v - cur.a) < 0.001) { score++; sc.textContent = 'Score: ' + score; fb.textContent = 'Yes!'; fb.className = 'gfb good'; next(); }
        else { fb.textContent = 'Not that one. Try again or skip.'; fb.className = 'gfb bad'; inp.classList.remove('shake'); void inp.offsetWidth; inp.classList.add('shake'); inp.select(); }
      }
      function next() { cur = q(); qt.textContent = cur.s; inp.value = ''; inp.focus(); }
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
      var iv = setInterval(function () {
        if (!alive(root)) { clearInterval(iv); return; }
        left--; timer.textContent = left + 's'; if (left <= 10) timer.classList.add('low');
        if (left <= 0) { clearInterval(iv); done = true; finish(); }
      }, 1000);
      function finish() {
        var xp = Math.min(80, score * 4); G.award('sprint', score, xp);
        root.replaceChildren(h('div', { class: 'gover' }, h('div', { class: 'big' }, String(score)), h('p', null, score >= 10 ? 'Speed Demon. Calculator who?' : 'right answers. Go faster next time.'), h('p', { class: 'muted' }, '+' + xp + ' XP'),
          h('button', { class: 'btn', onClick: start }, 'Go again')));
      }
      root.replaceChildren(h('div', { class: 'gstat' }, sc, timer), qt, h('div', { class: 'numrow' }, inp, h('button', { class: 'btn', onClick: submit }, 'Lock it in'), h('button', { class: 'btn ghost', onClick: function () { fb.textContent = ''; next(); } }, 'Skip')), fb);
      inp.focus();
    }
    root.replaceChildren(h('div', { class: 'gover' }, h('p', { class: 'gq' }, '45 seconds. Solve as many quick maths questions as you can. Whole numbers only, no calculator needed.'), h('button', { class: 'btn', onClick: start }, 'Start sprint')));
    return root;
  }

  /* ================= arcade page ================= */
  var GAMES = [
    { id: 'rate', icon: '\uD83C\uDFAF', name: 'Rate Showdown', tag: 'Two scorecards enter. Pick the higher (or lower) rate. One miss and you are out.', skill: 'Percentages and ratios', make: rateGame },
    { id: 'match', icon: '\uD83E\uDDE9', name: 'Term Match', tag: 'Flip cards to pair each everyday data term with its meaning.', skill: 'Mean, median, profit and friends', make: matchGame },
    { id: 'detective', icon: '\uD83D\uDD75\uFE0F', name: 'Data Detective', tag: 'Spot the messy cells hiding in the table.', skill: 'Spotting messy data', make: detectiveGame },
    { id: 'sprint', icon: '\u26A1', name: 'Quick Maths', tag: '45 seconds. Mental maths. Go.', skill: 'Discounts, averages, profit and speed', make: sprintGame }
  ];

  LMS.viewArcade = function (selected, onSelect) {
    var gm = selected ? GAMES.filter(function (g) { return g.id === selected; })[0] : null;
    var p = LMS.store.get();
    var body;
    if (gm) {
      body = h('div', { class: 'gamebox' }, h('div', { class: 'ghead' }, h('a', { class: 'backlink', href: '#arcade' }, '← All games'), h('h2', null, gm.icon + ' ' + gm.name), h('p', { class: 'muted' }, gm.skill)), gm.make());
    } else {
      body = h('div', { class: 'progs' }, GAMES.map(function (g) {
        var s = p.games[g.id];
        return h('a', { class: 'card gcard', href: '#arcade-' + g.id }, h('span', { class: 'gem' }, g.icon), h('h3', null, g.name), h('p', null, g.tag), h('p', { class: 'muted' }, g.skill), h('span', { class: 'tag' }, s ? 'Best: ' + s.best + ' · played ' + s.plays + 'x' : 'New'));
      }));
    }
    return [
      LMS.band('Arcade', gm ? gm.name : 'Arcade', gm ? null : 'Quick brain games for everyone. No prior knowledge needed. Every game earns XP.'),
      h('div', { class: 'wrap wide section' }, body, gm ? null : h('div', null, h('h2', null, 'Your player card'), G.playerCard()), gm ? null : LMS.gam.quoteCard({ shuffle: true }))
    ];
  };
})();
