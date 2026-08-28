import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const material = z.object({
  title: z.string(),
  /** отдельный title для поисковиков; H1 остаётся title */
  seoTitle: z.string().optional(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  type: z
    .enum(['article', 'tool', 'case', 'product', 'principle', 'blog', 'kb', 'story'])
    .default('article'),
  /** для type=story: номер главы и нейроконцепт в шапке */
  story: z
    .object({
      chapter: z.number(),
      concept: z.string(),
    })
    .optional(),
  cover: z.string().optional(),
  draft: z.boolean().default(false),
  /** для type=tool: встраиваемый интерактив */
  tool: z
    .object({
      src: z.string(),
      /** фиксированная высота в px; оставлено для старых материалов */
      height: z.number().optional(),
      /** высота фрейма = calc(100vh - viewportOffset) — инструмент занимает экран */
      viewportOffset: z.number().default(140),
      minHeight: z.number().default(560),
      /** широкий контейнер под инструмент (таблица УТП не влезает в 1200px) */
      wide: z.boolean().default(true),
    })
    .optional(),
});

const section = (dir: string) =>
  defineCollection({
    loader: glob({ pattern: '**/*.md', base: `./src/content/${dir}` }),
    schema: material,
  });

export const collections = {
  kb: section('kb'),
  products: section('products'),
  cases: section('cases'),
  services: section('services'),
  articles: section('articles'),
  principles: section('principles'),
  blog: section('blog'),
  stories: section('stories'),
  closed: section('closed'),
};
