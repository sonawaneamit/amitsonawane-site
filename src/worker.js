// amitsonawane.com: static site + two form endpoints that email Amit.
// Static files are served from ./public by Workers Static Assets.
// Only /api/* reaches this code (see run_worker_first in wrangler.jsonc).

const MAX_FILES = 10;
const MAX_BYTES = 18 * 1024 * 1024; // keeps the email under the 25 MiB limit after base64
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/book' || url.pathname === '/api/send') {
      if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed.' }, 405);
      try {
        return await handleForm(url.pathname, request, env);
      } catch (err) {
        console.error('form error', err && err.code, err && err.message);
        return json({ ok: false, error: 'Something went wrong on my side. Please email me@amitsonawane.com instead.' }, 500);
      }
    }
    if (url.pathname.startsWith('/api/')) return json({ ok: false, error: 'Not found.' }, 404);
    return env.ASSETS.fetch(request);
  },
};

async function handleForm(path, request, env) {
  const type = request.headers.get('content-type') || '';
  if (!type.includes('multipart/form-data') && !type.includes('application/x-www-form-urlencoded')) {
    return json({ ok: false, error: 'Unsupported request.' }, 400);
  }
  const len = Number(request.headers.get('content-length') || 0);
  if (len > MAX_BYTES + 2 * 1024 * 1024) return json({ ok: false, error: 'That upload is over 18 MB. Please send fewer or smaller files.' }, 413);

  const form = await request.formData();

  // Honeypot: real people never fill this hidden field.
  if (str(form, 'website_url')) return json({ ok: true });

  // Cloudflare Turnstile check.
  const token = str(form, 'cf-turnstile-response');
  if (!token) return json({ ok: false, error: 'The spam check did not finish. Please try again.' }, 400);
  if (!env.TURNSTILE_SECRET) {
    console.error('TURNSTILE_SECRET is not set');
    return json({ ok: false, error: 'The form is not fully set up yet. Please email me@amitsonawane.com.' }, 503);
  }
  const verify = new FormData();
  verify.append('secret', env.TURNSTILE_SECRET);
  verify.append('response', token);
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) verify.append('remoteip', ip);
  const outcome = await (await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: verify })).json();
  if (!outcome.success) {
    const codes = (outcome['error-codes'] || []).join(', ') || 'unknown';
    console.error('turnstile failed', codes, outcome.hostname || '');
    return json({ ok: false, error: "The spam check failed. Please refresh the page and try again." }, 403);
  }

  const name = str(form, 'name', 120);
  const email = str(form, 'email', 200);
  const company = str(form, 'company', 200);
  if (!name || !EMAIL_RE.test(email)) return json({ ok: false, error: 'Please add your name and a valid email address.' }, 400);

  const rows = [['Name', name], ['Email', email], ['Company or website', company || '-']];
  let subject, intro;
  const attachments = [];

  if (path === '/api/book') {
    const topic = str(form, 'topic', 4000);
    if (!topic) return json({ ok: false, error: 'Please say what we should look at.' }, 400);
    const tz = str(form, 'tz', 80) || 'not given';
    const slots = [];
    for (let i = 1; i <= 3; i++) {
      const d = str(form, 'date' + i, 10), t = str(form, 'time' + i, 5);
      if (d && t && /^\d{4}-\d{2}-\d{2}$/.test(d) && /^\d{2}:\d{2}$/.test(t)) slots.push(prettySlot(d, t));
    }
    if (!slots.length) return json({ ok: false, error: 'Please give at least one date and time.' }, 400);
    subject = `Audit request: ${name}${company ? ' (' + company + ')' : ''}`;
    intro = 'New request for a free 30-minute growth audit.';
    rows.push(['Their time zone', tz]);
    slots.forEach((s, i) => rows.push(['Option ' + (i + 1), s + ' (' + tz + ')']));
    rows.push(['What to look at', topic]);
  } else {
    const problem = str(form, 'problem', 10000);
    if (!problem) return json({ ok: false, error: 'Please describe the problem.' }, 400);
    const files = form.getAll('files').filter((f) => f && typeof f === 'object' && f.size > 0);
    if (files.length > MAX_FILES) return json({ ok: false, error: `Please attach up to ${MAX_FILES} files.` }, 400);
    const total = files.reduce((n, f) => n + f.size, 0);
    if (total > MAX_BYTES) return json({ ok: false, error: 'Those files add up to more than 18 MB.' }, 413);
    for (const f of files) {
      attachments.push({
        filename: safeName(f.name),
        content: await f.arrayBuffer(),
        type: f.type || 'application/octet-stream',
        disposition: 'attachment',
      });
    }
    subject = `Problem sent in: ${name}${company ? ' (' + company + ')' : ''}`;
    intro = 'Someone sent in a problem for an async teardown.';
    rows.push(['The problem', problem]);
    rows.push(['Files', attachments.length ? attachments.map((a) => a.filename).join(', ') : 'none']);
  }

  const text = intro + '\n\n' + rows.map(([k, v]) => `${k}:\n${v}`).join('\n\n') + '\n\nReply to this email to answer them directly.';
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#37352F;max-width:640px">
<p>${esc(intro)}</p>
<table cellpadding="8" style="border-collapse:collapse;width:100%">${rows
    .map(([k, v]) => `<tr><td style="vertical-align:top;color:#6F6E69;white-space:nowrap;border-top:1px solid #eee">${esc(k)}</td><td style="border-top:1px solid #eee;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('')}</table>
<p style="color:#6F6E69;font-size:13px">Reply to this email to answer ${esc(name)} directly.</p></div>`;

  await env.EMAIL.send({
    to: env.TO_ADDRESS,
    from: { email: env.FROM_ADDRESS, name: 'amitsonawane.com' },
    replyTo: { email, name },
    subject,
    text,
    html,
    attachments: attachments.length ? attachments : undefined,
  });
  return json({ ok: true });
}

function str(form, key, max = 1000) {
  const v = form.get(key);
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}
function safeName(n) {
  return (String(n || 'file').replace(/[^\w.\- ]+/g, '_').slice(0, 120)) || 'file';
}
function prettySlot(d, t) {
  const dt = new Date(d + 'T' + t + ':00Z');
  const day = dt.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  return `${day}, ${t}`;
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
}
