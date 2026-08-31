# Промты для Higgsfield — обложки серии «Орбит-фронтальный переход»

Нужны, только если выбран **вариант A** (кадр в рамке): Higgsfield генерит картинку,
она вставляется в брендовую рамку вместо векторной сцены.

MCP higgsfield доступен из любой папки воркспейса (не только из `Хигсхилд/`).
Рабочая связка: `generate_image_batch` → `jobs_wait` → скачать `result_url` в `img/`.
Модель: `nano_banana_pro` (сервер маппит на nano_banana_2), `resolution: 2k`, `aspect_ratio: 4:5` → 1856×2304.

## Базовый стиль (добавлять к каждому промту — он держит серию в одном ключе)

```
Editorial illustration for a satirical short story about real-estate marketing.
Muted desaturated palette: warm beige #f4f3f1, cool grey-blue, soft cream light.
One single accent object; everything else soft, hazy, low contrast.
Early morning light after rain, wet surfaces, thin haze, no direct sun.
No people, no faces. No text, no logos, no watermarks.
Shallow depth of field, architectural photography feel, medium format look.
Composition: empty upper third, subject in lower right, generous negative space.
Aspect ratio 4:5.
```

Кадры намеренно «недожатые»: это визуальный эквивалент того самого рендера,
который Герман заказывает в первой главе — обещание вместо предмета.

## Кадр под каждую главу

| # | Глава | Сюжет кадра |
|---|-------|-------------|
| 1 | Дофаминовый замок | terrace stone table, a cup of coffee drunk one third, crumpled napkin, phone face down, blurred glass railing, hazy city dissolving into light |
| 2 | Конформизм серого роя | five identical oversized grey hoodies on a concrete parapet, seen from behind, one empty space among them |
| 3 | Универсальный гамбургер Шекспира | brass scales on a concrete slab: architectural model of a flat on one side, wine bottles on the other |
| 4 | Привычка пить пустоту | phone on a bedside table, 10:00 Saturday, identical notification stack, dust in morning light |
| 5 | Фрейминг сансары | window facing a blank boiler-house wall, thick soft curtain, warm lamp inside, deep shadow |
| 6 | Окситоциновый туман | woollen plaid over an armchair arm, ceramic teapot, steam, unsanded larch wood surface |
| 7 | Эффект священной кружки | fridge door with a single cheap souvenir magnet, one mug on an empty kitchen table |
| 8 | Миндалина на страже ипотеки | mechanical split-flap counter in a dark hall, blurred numbers mid-flip, cold blue light |
| 9 | Ловушка невозвратных инвестиций | thick cardboard folder with a name on the spine, papers stacked, hands absent, desk lamp |
| 10 | Качели для Системы 1 и 2 | printed charts fanned on a table, one page in focus, coffee ring stain, glass of water |
| 11 | Лобная кора говорит по-английски | golden dolphin scale model half-sunk in dark peat water, mist, cold morning |

## Что делать с результатом

1. Сгенерировать 4:5, сохранить в `рассказы/обложки/img/NN.jpg`.
2. В `NN_<глава>.html` заменить блок `.frame` на `<img src="img/NN.jpg">` (рамка, поля и подпись остаются).
3. Отрендерить PNG:
   `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --force-device-scale-factor=2 --window-size=640,800 --screenshot=NN.png <url>`

## Что выяснилось на первом прогоне (31.08.2026)

Проверено на 9 кадрах первой главы (`img/01_v1..v9.png`, контактный лист — `01_варианты.png`).

- **Базовый стиль-блок держит палитру, но не держит реквизит.** Модель дорисовывает
  «уместные» предметы: табличку FOR SALE с текстом (v1) и брелок-домик (v4). В промт
  обязателен явный стоп-лист: `Nothing else on the table: no signs, no placards,
  no keychains, no toys, no props, no lettering of any kind.`
- **«Drunk one third» читается как «допита».** Писать прямо: `still two thirds full`.
- **`cinematic_studio_2_5` уводит в ночь и цветное боке** (v5) — для этой серии не годится,
  палитра ломается. Оставляем `nano_banana_pro`.
- **`phone lying face down` не воспроизводится** — тёмный прямоугольник читается одинаково
  в обе стороны, капслок и «screen hidden» не помогают. На размере обложки разницы нет,
  бороться не стоит.
- Композиция «empty upper third + subject lower right» отрабатывает стабильно, кроп под рамку не нужен.
