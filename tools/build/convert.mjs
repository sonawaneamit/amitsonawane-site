// Converts the mockup's Main.dc.html into a static index.html.
import fs from 'node:fs';
import { parseHTML } from 'linkedom';

const [src, outDir] = process.argv.slice(2);
let s = fs.readFileSync(src, 'utf8');

// ---------- 1. source tweaks for the live site ----------
const rep = (a, b) => { if (!s.includes(a)) throw new Error('missing: ' + a.slice(0, 80)); s = s.split(a).join(b); };
// workflow card buttons -> real downloads
rep('<article style="border: 1px solid #E9E9E7; border-radius: 8px; padding: 20px; display: flex; flex-direction: column; gap: 10px">\n              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px">',
    '<article data-theme="{{ f.theme }}" style="border: 1px solid #E9E9E7; border-radius: 8px; padding: 20px; display: flex; flex-direction: column; gap: 10px">\n              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px">');
s = s.replace(/<button style="display: flex; align-items: center; gap: 6px; min-height: 40px;([^"]*)">(<svg[\s\S]*?<\/svg>)<span>Download<\/span><\/button>/,
  (m, st, svg) => `<a class="btn" href="/workflows/{{ f.slug }}.zip" download style="display: flex; align-items: center; gap: 6px; min-height: 40px; text-decoration: none;${st}">${svg}<span>Download</span></a>`);
rep('<button style="min-height: 40px; padding: 0 12px; border: 0; border-radius: 6px; background: transparent; color: #4A4945; font-size: 13px; font-weight: 500; text-decoration: underline; cursor: pointer">Skill file only</button>',
    '<a href="/workflows/{{ f.slug }}/SKILL.md" download="{{ f.slug }}-SKILL.md" style="display: inline-flex; align-items: center; min-height: 40px; padding: 0 12px; color: #4A4945; font-size: 13px; font-weight: 500">Skill file only</a>');
s = s.replace(/<button style="display: flex; align-items: center; gap: 8px; min-height: 44px;([^"]*)">(<svg[\s\S]*?<\/svg>)<span>Download all 19<\/span><\/button>/,
  (m, st, svg) => `<a class="btn" href="/workflows/growth-workflows.zip" download style="display: flex; align-items: center; gap: 8px; min-height: 44px; text-decoration: none;${st}">${svg}<span>Download all 19</span></a>`);
// newsletter form has no backend yet -> LinkedIn follow
s = s.replace(/<section aria-label="Get new workflows"[\s\S]*?<\/section>/, `<section aria-label="Get new workflows" style="background: #F7F7F5; border-radius: 8px; padding: 24px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px">
          <div style="flex: 1 1 300px; display: flex; flex-direction: column; gap: 4px">
            <h2 style="margin: 0; font-size: 18px; font-weight: 600">Get the next one when it ships</h2>
            <p style="margin: 0; font-size: 14px; color: #4A4945">I post new workflows on LinkedIn first.</p>
          </div>
          <a class="btn" href="https://www.linkedin.com/in/amit-vijay-sonawane/" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 16px; border-radius: 6px; background: {{ accent }}; color: #FFFFFF; font-size: 15px; font-weight: 600; text-decoration: none">Follow on LinkedIn</a>
        </section>`);
// "Pick a time" has no booking link yet -> email
s = s.replace(/<button style="align-self: flex-start; min-height: 44px; padding: 0 18px;([^"]*)">Pick a time<\/button>/,
  (m, st) => `<a class="btn" href="#book" data-go="book" style="align-self: flex-start; display: inline-flex; align-items: center; min-height: 44px; padding: 0 18px; text-decoration: none;${st}">Request a time</a>`);

// ---------- 2. evaluate the component's data ----------
const script = s.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
class DCLogic { constructor(p) { this.props = p || {}; } setState(o) { Object.assign(this.state, o); } }
const Component = new Function('DCLogic', 'window', 'performance', 'requestAnimationFrame', 'cancelAnimationFrame', script + '\nreturn Component;')(DCLogic, {}, { now: () => 0 }, () => 0, () => 0);
const inst = new Component({});
inst.state.p = 1;
const vals = inst.renderVals();

// ---------- 3. expand the template ----------
const body = s.match(/<x-dc>([\s\S]*?)<\/x-dc>/)[1];
const helmet = body.match(/<helmet>([\s\S]*?)<\/helmet>/)[1];
const markup = body.replace(/<helmet>[\s\S]*?<\/helmet>/, '');
const { document } = parseHTML(`<!doctype html><html><body><div id="root">${markup}</div></body></html>`);
const root = document.getElementById('root');

const goMap = new Map(Object.entries(vals.go).map(([k, f]) => [f, k]));
const lookup = (path, scope) => path.trim().split('.').reduce((o, k) => (o == null ? undefined : o[k]), scope);
const HOLE = /\{\{\s*([^}]+?)\s*\}\}/g;
const interp = (str, scope) => str.replace(HOLE, (m, p) => { const v = lookup(p, scope); return v == null ? '' : String(v); });

function expand(node, scope) {
  for (const child of [...node.childNodes]) {
    if (child.nodeType === 3) { if (HOLE.test(child.textContent)) { HOLE.lastIndex = 0; child.textContent = interp(child.textContent, scope); } HOLE.lastIndex = 0; continue; }
    if (child.nodeType !== 1) continue;
    const tag = child.tagName.toLowerCase();
    if (tag === 'sc-for') {
      const listPath = child.getAttribute('list').replace(/[{}]/g, '').trim();
      const list = lookup(listPath, scope) || [];
      const as = child.getAttribute('as');
      const frag = document.createDocumentFragment();
      list.forEach((item, i) => {
        const holder = document.createElement('div');
        holder.innerHTML = child.innerHTML;
        // per-item click handlers
        holder.querySelectorAll('[onClick],[onclick]').forEach(el => {
          const hole = (el.getAttribute('onClick') || el.getAttribute('onclick')).replace(/[{}]/g, '').trim();
          el.removeAttribute('onClick'); el.removeAttribute('onclick');
          if (listPath === 'flowChips') el.setAttribute('data-filter', String(i));
          else throw new Error('unhandled loop handler ' + hole);
        });
        expand(holder, { ...scope, [as]: item, $index: i });
        while (holder.firstChild) frag.appendChild(holder.firstChild);
      });
      child.replaceWith(frag);
      continue;
    }
    if (tag === 'sc-if') {
      const page = child.getAttribute('value').match(/is\.(\w+)/)[1];
      const sec = document.createElement('section');
      sec.setAttribute('data-page', page);
      if (page !== 'home') sec.setAttribute('hidden', '');
      sec.innerHTML = child.innerHTML;
      expand(sec, scope);
      child.replaceWith(sec);
      continue;
    }
    for (const attr of [...child.attributes]) {
      const name = attr.name.toLowerCase();
      if (name === 'onclick') {
        const v = lookup(attr.value.replace(/[{}]/g, ''), scope);
        child.removeAttribute(attr.name);
        if (goMap.has(v)) child.setAttribute('data-go', goMap.get(v));
        else if (v === vals.replay) child.setAttribute('data-action', 'replay');
        else if (attr.value.includes('c.pick')) child.setAttribute('data-filter', String(scope.$index));
        else throw new Error('unknown handler ' + attr.value);
        continue;
      }
      if (attr.value.includes('{{')) child.setAttribute(attr.name, interp(attr.value, scope));
    }
    expand(child, scope);
  }
}
expand(root, { ...vals, true: true, false: false });

// nav active state handled by CSS/JS
root.querySelectorAll('button.nv').forEach(b => { b.style.background = ''; });
// stats: mark for the counter animation
const statCards = root.querySelectorAll('section[aria-label="Results"] [style*="font-size: 40px"]');
statCards.forEach((el, i) => el.setAttribute('data-stat', String(i)));
root.querySelectorAll('section[aria-label="Results"] [aria-hidden="true"] > div').forEach((el, i) => el.setAttribute('data-bar', String(i)));

root.querySelectorAll('button[data-go="contact"]').forEach(b => { if (b.textContent.includes('Send me the problem')) b.setAttribute('data-go', 'send'); });
const mainEl = root.querySelector('main');
mainEl.insertAdjacentHTML('beforeend', fs.readFileSync(new URL('./forms.html', import.meta.url), 'utf8'));
root.querySelectorAll('div.ms').forEach(d => { if ((d.getAttribute('style') || '').includes('width: 12%')) d.classList.add('msl'); });
root.querySelectorAll('div').forEach(d => { if (d.textContent === 'From flight paths to growth curves.' && !d.children.length) d.classList.add('bannerhead'); });
let html = root.innerHTML;
// ---------- 4. assets ----------
const blobMap = JSON.parse(fs.readFileSync(new URL('./blobmap.json', import.meta.url)));
html = html.replace(/\/_blob\/([0-9a-f]{32})/g, (m, id) => { if (!blobMap[id]) throw new Error('no asset for ' + id); return '/assets/' + blobMap[id]; });
const helmetOut = helmet.replace(/\/_blob\/([0-9a-f]{32})/g, (m, id) => '/assets/' + blobMap[id]);

const stats = fs.readFileSync(new URL('./stats.json', import.meta.url), 'utf8');
const tpl = fs.readFileSync(new URL('./shell.html', import.meta.url), 'utf8');
const out = tpl.replace('<!--HEAD-->', helmetOut).replace('<!--BODY-->', html).replace('/*STATS*/', stats.trim()).split('__SITEKEY__').join(fs.readFileSync(new URL('./sitekey.txt', import.meta.url), 'utf8').trim());
fs.writeFileSync(outDir + '/index.html', out);
console.log('ok', out.length, 'bytes; leftover holes:', (out.match(/\{\{/g) || []).length);
