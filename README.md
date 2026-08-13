# Система прагматичного маркетинга недвижимости

Контент-хаб агентства «Прагматик»: sistema.pragmatiq.online

## Состав

- `site/` — сайт (Astro, SSG). Контент — Markdown в `site/src/content/`.
- `api/` — auth-слой (FastAPI): Telegram-логин, magic-link, события shareToStory. _(фаза 2)_
- `bot/` — Telegram-бот: deep-link роутер, лиды, magic-link. _(фаза 2)_
- `deploy/` — конфиги сервера (nginx), заметки по эксплуатации.
- `.github/workflows/deploy.yml` — деплой: push в `main` → сборка Astro в CI → rsync на VPS.

## Инфраструктура

- VPS 200.165.233.251 (Ubuntu 26.04, ssh-алиас `sistema` на Mac владельца).
- Статика: `/var/www/sistema` (nginx). Динамика: `/opt/systema` (docker compose, фаза 2).
- Деплой-юзер для CI: `deploy` (ключ в GitHub Secrets `SSH_PRIVATE_KEY`).
- Секреты рантайма: `/opt/systema/.env` на сервере (в git не попадают).

## Локальная разработка

```bash
cd site
npm install
npm run dev
```

## Правила контента

- Тексты — по гайду языка Прагматик (скилл `pragmatiq-copy`): контур «Мы», без эмодзи, ё обязательна.
- Дизайн — Pragmatiq Light (скилл `website-pragmatiq`).
- Закрытые материалы — только в `site/src/content/closed/` (noindex, вне sitemap).
- У каждого материала — `related` в frontmatter (перелинковка).
