/**
 * Персональные OG-картинки: /og/<раздел>.png, /og/<раздел>/<slug>.png, /og/leadgen.png.
 * Один стиль с заставкой сайта (public/og-default.png): Pragmatiq Light, логотип, лаймовый тег,
 * заголовок и до трёх ключевых пунктов (tldr → meta → описание). Рендер satori → resvg, 2400×1260.
 */
import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getCollection } from 'astro:content';
import { STORY_SERIES } from '../../lib/sections';
import { visibleSections } from '../../lib/nav';

interface Card {
  tag: string;
  eyebrow: string;
  title: string;
  points: string[];
  cover?: string;
}

const TYPE_LABEL: Record<string, string> = {
  article: 'Статья', tool: 'Инструмент', case: 'Кейс', product: 'Продукт',
  principle: 'Принципы', blog: 'Блог', kb: 'База знаний', story: 'Глава',
};
const fmtDate = (d: Date) =>
  d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).replace(/\s*г\.$/, '');
const plural = (n: number) =>
  n % 10 === 1 && n % 100 !== 11 ? 'материал' : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? 'материала' : 'материалов';
// обрезка по границе предложения, если она есть в разумных пределах; иначе по слову с многоточием
const cut = (s: string, max: number) => {
  if (s.length <= max) return s;
  const head = s.slice(0, max);
  const sentence = Math.max(head.lastIndexOf('. '), head.lastIndexOf('! '), head.lastIndexOf('? '));
  if (sentence >= max * 0.45) return head.slice(0, sentence + 1);
  return head.replace(/[\s,;:—-]+\S*$/, '') + '…';
};

export async function getStaticPaths() {
  const paths: { params: { path: string }; props: { card: Card } }[] = [];
  for (const s of await visibleSections()) {
    const items = (await getCollection(s.id, ({ data }) => !data.draft)).sort((a, b) =>
      s.id === 'stories'
        ? (a.data.story?.chapter ?? 0) - (b.data.story?.chapter ?? 0)
        : b.data.date.valueOf() - a.data.date.valueOf()
    );
    paths.push({
      params: { path: s.id },
      props: {
        card: {
          tag: 'Система',
          eyebrow: `Раздел ${String(s.order).padStart(2, '0')} · ${items.length} ${plural(items.length)}`,
          title: s.title,
          points: [s.description, ...items.slice(0, 2).map((i) => i.data.title)],
        },
      },
    });
    for (const e of items) {
      const d = e.data;
      const story = d.type === 'story' ? d.story : undefined;
      let points: string[];
      if (story) points = [d.description, ...(story.concept ? [story.concept] : [])];
      else if (d.tldr?.length) points = d.tldr.slice(0, 3);
      else if (d.meta?.length) points = d.meta.slice(0, 3).map((m) => `${m.label}: ${m.value}`);
      else points = [d.description];
      paths.push({
        params: { path: `${s.id}/${e.id}` },
        props: {
          card: {
            tag: s.title,
            eyebrow: story
              ? `Глава ${String(story.chapter).padStart(2, '0')} · ${STORY_SERIES.title}`
              : `${TYPE_LABEL[d.type] ?? s.title} · ${fmtDate(d.updated ?? d.date)}`,
            title: d.title,
            points,
            cover: story ? d.cover : undefined,
          },
        },
      });
    }
  }
  paths.push({
    params: { path: 'leadgen' },
    props: {
      card: {
        tag: 'Лидогенерация',
        eyebrow: 'Performance-маркетинг для застройщиков',
        title: 'Целевые лиды для недвижимости',
        points: [
          'ДРР 0,68% в VK Ads — ГК «Третий трест», снижение на 80% за 3 месяца',
          'CPL 7 169 ₽ в Яндекс.Директе — Kalinka Group',
          'Комиссия привязана к KPI: лиды, встречи, сделки',
        ],
      },
    },
  });
  return paths;
}

// ---- рендер -------------------------------------------------------------

// пути от корня проекта (site/): при сборке модуль лежит в dist и относительные URL не работают
const ROOT = process.cwd();
const font = (f: string) => readFile(path.join(ROOT, 'src/og/fonts', f));
const [onest400, onest700, mono400, mono700, logoSvg] = await Promise.all([
  font('Onest-400.ttf'), font('Onest-700.ttf'), font('JetBrainsMono-400.ttf'), font('JetBrainsMono-700.ttf'),
  readFile(path.join(ROOT, 'public/img/logo-pragmatiq.svg')),
]);
const LOGO = `data:image/svg+xml;base64,${logoSvg.toString('base64')}`;
const C = { bg: '#f4f3f1', white: '#fff', lime: '#d5fc6a', blue: '#2558fc', text: '#111', muted: '#666', border: '#d8d7d1' };
const MONO = 'JetBrains Mono';

const h = (type: string, props: Record<string, unknown>, ...children: unknown[]) => ({
  type,
  props: { ...props, children: children.length === 1 ? children[0] : children },
});
const star = (size: number, fill = C.blue) =>
  h('svg', { width: size, height: size, viewBox: '0 0 24 24' },
    h('path', { d: 'M12 0c0 6.63 5.37 12 12 12-6.63 0-12 5.37-12 12 0-6.63-5.37-12-12-12 6.63 0 12-5.37 12-12z', fill }));
const arrow = (size: number) =>
  h('svg', { width: size, height: size, viewBox: '0 0 24 24' },
    h('path', { d: 'M5 3v11h13M14 10l4 4-4 4', fill: 'none', stroke: C.text, strokeWidth: 2.6, strokeLinecap: 'round', strokeLinejoin: 'round' }));

function titleSize(t: string, withCover: boolean) {
  const n = t.length;
  const base = n <= 30 ? 64 : n <= 50 ? 56 : n <= 75 ? 48 : 42;
  return withCover ? Math.min(base, 50) : base;
}

async function card(c: Card) {
  const coverData = c.cover
    ? `data:image/jpeg;base64,${(await readFile(path.join(ROOT, 'public', c.cover))).toString('base64')}`
    : null;
  const title = cut(c.title, 110);
  const points = c.points.filter(Boolean).slice(0, coverData ? 2 : 3).map((p) => cut(p, coverData ? 170 : 170));
  const size = titleSize(title, !!coverData);

  const tree = h('div', { style: { width: 1200, height: 630, display: 'flex', background: C.bg, fontFamily: 'Onest', color: C.text } },
    h('div', { style: { position: 'absolute', top: 40, left: 40, right: 40, bottom: 40, display: 'flex', flexDirection: 'column', background: C.white, border: `1px solid ${C.border}`, padding: '46px 60px 42px' } },
      // шапка: логотип + тег
      h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        h('img', { src: LOGO, width: 384, height: 32 }),
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, background: C.lime, padding: '8px 16px 7px', fontFamily: MONO, fontSize: 15, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' } },
          arrow(14), h('span', {}, c.tag))),
      // тело: текст (+ обложка справа)
      h('div', { style: { display: 'flex', flex: 1, gap: 44, marginTop: 34, minHeight: 0 } },
        h('div', { style: { display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 } },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: 10, fontFamily: MONO, fontSize: 15, letterSpacing: 1.5, textTransform: 'uppercase', color: C.blue } },
            star(14), h('span', {}, c.eyebrow)),
          h('div', { style: { display: 'flex', marginTop: 12, fontSize: size, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5 } }, title),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 } },
            ...points.map((p) =>
              h('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12 } },
                h('div', { style: { display: 'flex', width: 10, height: 10, background: C.lime, marginTop: 9, flexShrink: 0 } }),
                h('div', { style: { display: 'flex', fontSize: 21, lineHeight: 1.32, color: '#333' } }, p))))),
        ...(coverData ? [h('img', { src: coverData, width: 360, height: 328, style: { objectFit: 'cover', flexShrink: 0, border: `1px solid ${C.border}` } })] : [])),
      // подвал
      h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, paddingTop: 18, borderTop: `1px solid ${C.border}`, fontFamily: MONO, fontSize: 16 } },
        h('span', { style: { color: C.blue, fontWeight: 700 } }, 'sistema.pragmatiq.online'),
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, color: C.muted } }, star(12), h('span', {}, 'Контент-хаб агентства Прагматик')))));

  const svg = await satori(tree as any, {
    width: 1200, height: 630,
    fonts: [
      { name: 'Onest', data: onest400, weight: 400, style: 'normal' },
      { name: 'Onest', data: onest700, weight: 700, style: 'normal' },
      { name: MONO, data: mono400, weight: 400, style: 'normal' },
      { name: MONO, data: mono700, weight: 700, style: 'normal' },
    ],
  });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 2400 }, font: { loadSystemFonts: false } }).render().asPng();
}

export const GET: APIRoute = async ({ props }) => {
  const png = await card((props as { card: Card }).card);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
