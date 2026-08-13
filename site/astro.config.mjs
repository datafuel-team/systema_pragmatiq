import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sistema.pragmatiq.online',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // закрытая часть не попадает в sitemap
      filter: (page) => !page.includes('/closed/'),
    }),
  ],
});
