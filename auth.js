/* Daksh Learning auth helper. Used by login.html and the classroom (index.html). */
(function () {
  var cfg = window.DL_AUTH || {};
  var sb = null;
  function client() {
    if (sb) return sb;
    if (!window.supabase || !cfg.SUPABASE_URL || /YOUR-/.test(cfg.SUPABASE_URL)) return null;
    sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });
    return sb;
  }
  function setCookie(session) {
    var secure = location.protocol === 'https:' ? '; Secure' : '';
    if (session && session.access_token) {
      document.cookie = 'dl-token=' + session.access_token + '; Path=/; Max-Age=604800; SameSite=Lax' + secure;
    } else {
      document.cookie = 'dl-token=; Path=/; Max-Age=0; SameSite=Lax' + secure;
    }
  }
  function signIn() {
    var c = client(); if (!c) return Promise.reject(new Error('Auth is not configured yet'));
    return c.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: location.origin + '/login.html', queryParams: { prompt: 'select_account' } } });
  }
  function signOut() {
    var c = client();
    setCookie(null);
    return (c ? c.auth.signOut() : Promise.resolve()).then(function () { location.replace('/login.html'); });
  }
  function userChip(user) {
    var top = document.querySelector('header.top'); if (!top || document.getElementById('dlUser')) return;
    var meta = user.user_metadata || {};
    var name = (meta.full_name || meta.name || user.email || 'Learner').split(' ')[0];
    var wrap = document.createElement('div'); wrap.id = 'dlUser'; wrap.className = 'dluser';
    if (meta.avatar_url) { var im = document.createElement('img'); im.src = meta.avatar_url; im.alt = ''; im.referrerPolicy = 'no-referrer'; wrap.appendChild(im); }
    var s = document.createElement('span'); s.textContent = name; wrap.appendChild(s);
    var b = document.createElement('button'); b.type = 'button'; b.textContent = 'Log out'; b.addEventListener('click', signOut); wrap.appendChild(b);
    top.appendChild(wrap);
  }
  // Classroom guard: runs on index.html
  function guard() {
    var c = client();
    if (!c) { location.replace('/login.html'); return; }
    c.auth.getSession().then(function (r) {
      var s = r.data && r.data.session;
      if (!s) { setCookie(null); location.replace('/login.html'); return; }
      setCookie(s); userChip(s.user);
    });
    c.auth.onAuthStateChange(function (ev, s) {
      if (ev === 'SIGNED_OUT' || !s) { setCookie(null); location.replace('/login.html'); }
      else { setCookie(s); }
    });
  }
  window.DLAuth = { client: client, signIn: signIn, signOut: signOut, setCookie: setCookie, guard: guard };
})();
