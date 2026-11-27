// Daksh Learning: server-side login gate (Vercel Routing Middleware).
// Every request needs a valid Supabase session cookie, except the login page itself.
import { next } from '@vercel/functions';

const PUBLIC = new Set(['/login.html', '/login', '/auth-config.js', '/auth.js', '/brand.js', '/favicon.ico']);
const cache = new Map(); // token -> expiry ms (short cache to avoid one auth call per file)

function readCookie(req, name) {
  const raw = req.headers.get('cookie') || '';
  for (const part of raw.split(';')) {
    const i = part.indexOf('=');
    if (i > -1 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
  }
  return '';
}

async function valid(token) {
  if (!token) return false;
  const hit = cache.get(token);
  if (hit && hit > Date.now()) return true;
  const base = process.env.SUPABASE_URL, key = process.env.SUPABASE_ANON_KEY;
  if (!base || !key) return false;
  try {
    const r = await fetch(base.replace(/\/$/, '') + '/auth/v1/user', {
      headers: { Authorization: 'Bearer ' + token, apikey: key }
    });
    if (!r.ok) return false;
    if (cache.size > 500) cache.clear();
    cache.set(token, Date.now() + 60000);
    return true;
  } catch (e) { return false; }
}

export default async function middleware(request) {
  const url = new URL(request.url);
  if (PUBLIC.has(url.pathname)) return next();
  if (await valid(readCookie(request, 'dl-token'))) return next();
  const wantsPage = url.pathname === '/' || url.pathname.endsWith('.html') || (request.headers.get('accept') || '').includes('text/html');
  if (wantsPage) return new Response(null, { status: 302, headers: { Location: '/login.html' + (readCookie(request, 'dl-token') ? '?denied=1' : ''), 'Cache-Control': 'no-store' } });
  return new Response('Please log in', { status: 401, headers: { 'Cache-Control': 'no-store' } });
}
