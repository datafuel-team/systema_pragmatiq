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
    .enum(['article', 'tool', 'case', 'product', 'principle', 'blog', 'kb'])
    .default('article'),
  cover: z.string().optional(),
  draft: z.boolean().default(false),
  /** для type=tool: встраиваемый интерактив */
  tool: z
    .object({
      src: z.string(),
      height: z.number().default(900),
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
  closed: section('closed'),
};
