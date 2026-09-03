# OG-заставка сайта

Здесь — только заставка главной (`og-default.png`). Картинки остальных страниц генерируются на сборке: `src/pages/og/[...path].png.ts` (satori + resvg, шрифты в `src/og/fonts/`), тот же стиль; править макет — там.

`og-default.html` — исходник карточки 1200×630 в стиле Pragmatiq Light (Onest + JetBrains Mono, логотип `public/img/logo-pragmatiq.svg`).
Пересобрать PNG (нужен установленный Chrome, шрифты грузятся с Google Fonts):

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=2 --window-size=1200,630 --virtual-time-budget=6000 \
  --screenshot=public/og-default.png "file://$PWD/og/og-default.html"
```

Логотип: `logo-pragmatiq.svg` — чёрный шрифтовой знак для светлого фона, `logo-pragmatiq-white.svg` — оригинал с pragmatiq.ru (белые буквы, для тёмного фона).
После замены картинки Telegram отдаёт старое превью из кэша — отправить ссылку боту @WebpageBot, он обновит.
