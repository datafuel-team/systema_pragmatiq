import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// lastmod для sitemap — из frontmatter материалов (updated, иначе date).
// Хаб раздела и главная получают дату самого свежего материала.
const CONTENT_DIR = fileURLToPath(new URL('./src/content/', import.meta.url));
const lastmod = new Map();
const latest = (a, b) => (!a || b > a ? b : a);
for (const dir of readdirSync(CONTENT_DIR, { withFileTypes: true })) {
  if (!dir.isDirectory() || dir.name === 'closed') continue;
  for (const file of readdirSync(join(CONTENT_DIR, dir.name))) {
    if (!file.endsWith('.md')) continue;
    const src = readFileSync(join(CONTENT_DIR, dir.name, file), 'utf8');
    if (/^draft:\s*true/m.test(src)) continue;
    const m = src.match(/^updated:\s*(\d{4}-\d{2}-\d{2})/m) || src.match(/^date:\s*(\d{4}-\d{2}-\d{2})/m);
    if (!m) continue;
    lastmod.set(`/${dir.name}/${file.replace(/\.md$/, '')}/`, m[1]);
    lastmod.set(`/${dir.name}/`, latest(lastmod.get(`/${dir.name}/`), m[1]));
    lastmod.set('/', latest(lastmod.get('/'), m[1]));
  }
}

export default defineConfig({
  site: 'https://sistema.pragmatiq.online',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // закрытая часть и служебные noindex-страницы не попадают в sitemap
      filter: (page) => !page.includes('/closed/') && !page.includes('/login/'),
      serialize(item) {
        const d = lastmod.get(new URL(item.url).pathname);
        if (d) item.lastmod = `${d}T12:00:00Z`;
        return item;
      },
    }),
  ],
});
