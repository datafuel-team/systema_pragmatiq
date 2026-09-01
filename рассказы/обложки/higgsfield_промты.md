# Промты Higgsfield — обложки серии «Орбит-фронтальный переход»

Главы 2–11. Первая уже сделана: из девяти вариантов взят `01_v2` — там пустые две трети
кадра и всего три предмета. На этом и построены остальные промты.

## Как это работает

Один кадр главы используется в двух форматах, поэтому композиция обязана быть одинаковой:

- **превью 640×800** — берётся кадр целиком, сверху ложится заголовок на плашках;
- **врезка в статью 1200×720** — берётся нижняя часть кадра, текста почти нет.

Отсюда жёсткое правило: **верхние две трети пустые** (небо, туман, стена, бетон),
**предмет в нижней трети, ближе к правому краю**. Если предмет окажется по центру или
вверху — превью не соберётся, текст ляжет на него.

Второе правило: **мало предметов**. В рабочем кадре первой главы их три — чашка, телефон,
салфетка. Четыре уже много.

## Порядок

1. Прогнать промт, получить 6–9 вариантов.
2. Сложить в `img/` как `NN_v1.png`, `NN_v2.png` … (NN — номер главы с нулём: `02_v1.png`).
3. Сказать мне — я соберу контактный лист, выберу кадр по композиции и соберу оба формата.

Ничего не переименовывать и не кропать руками: кроп делает сборка.

---

## Базовый блок стиля

Уже вшит в каждый промт ниже — копировать блок главы целиком, ничего не дописывая.
Здесь приведён отдельно, чтобы было понятно, что именно держит серию в одном ключе:

```
Editorial photography, medium format look, 85mm, shallow depth of field.
Muted desaturated palette: warm beige, cool grey-blue, soft cream light.
Overcast morning after rain, thin haze, wet surfaces, no direct sun, no harsh shadows.
Empty upper two thirds of the frame, single subject in the lower third, slightly right of centre.
Calm, quiet, understated. Very few objects in frame.
No people, no faces, no hands. No text, no letters, no numbers, no signage, no logos, no watermarks.
Aspect ratio 4:5.
```

---

## Глава 02 — «Конформизм серого роя»

Про то, что покупают не квартиру, а соседей. Кадр — про одинаковость без единого человека.

```
A rack with six identical oversized grey hoodies hanging in a row against a raw concrete wall,
one hanger empty. Soft even light, dust in the air, industrial space.

Editorial photography, medium format look, 85mm, shallow depth of field.
Muted desaturated palette: warm beige, cool grey-blue, soft cream light.
Overcast morning after rain, thin haze, wet surfaces, no direct sun, no harsh shadows.
Empty upper two thirds of the frame, single subject in the lower third, slightly right of centre.
Calm, quiet, understated. Very few objects in frame.
No people, no faces, no hands. No text, no letters, no numbers, no signage, no logos, no watermarks.
Aspect ratio 4:5.
```

## Глава 03 — «Универсальный гамбургер Шекспира»

Про единую шкалу ценности: метры переводят в годы работы и бутылки вина.

```
Small brass balance scales on a wet stone surface: a plain grey concrete cube on one pan,
a single wine glass on the other. Hazy window light behind, everything else empty.

Editorial photography, medium format look, 85mm, shallow depth of field.
Muted desaturated palette: warm beige, cool grey-blue, soft cream light.
Overcast morning after rain, thin haze, wet surfaces, no direct sun, no harsh shadows.
Empty upper two thirds of the frame, single subject in the lower third, slightly right of centre.
Calm, quiet, understated. Very few objects in frame.
No people, no faces, no hands. No text, no letters, no numbers, no signage, no logos, no watermarks.
Aspect ratio 4:5.
```

## Глава 04 — «Привычка пить пустоту»

Про субботнюю СМС в десять утра, покупку на автомате.

```
A plain analogue alarm clock showing ten o'clock on an empty bedside table,
morning light through a curtain, dust floating in the beam. Nothing else on the table.

Editorial photography, medium format look, 85mm, shallow depth of field.
Muted desaturated palette: warm beige, cool grey-blue, soft cream light.
Overcast morning after rain, thin haze, wet surfaces, no direct sun, no harsh shadows.
Empty upper two thirds of the frame, single subject in the lower third, slightly right of centre.
Calm, quiet, understated. Very few objects in frame.
No people, no faces, no hands. No text, no letters, no numbers, no signage, no logos, no watermarks.
Aspect ratio 4:5.
```

## Глава 05 — «Фрейминг сансары»

Про первые этажи у котельной, проданные как апартаменты для глубокого сна.

```
A window facing a blank concrete wall two metres away, heavy linen curtain half drawn,
a warm table lamp glowing inside the room. Deep quiet shadow, cold light outside.

Editorial photography, medium format look, 85mm, shallow depth of field.
Muted desaturated palette: warm beige, cool grey-blue, soft cream light.
Overcast morning after rain, thin haze, wet surfaces, no direct sun, no harsh shadows.
Empty upper two thirds of the frame, single subject in the lower third, slightly right of centre.
Calm, quiet, understated. Very few objects in frame.
No people, no faces, no hands. No text, no letters, no numbers, no signage, no logos, no watermarks.
Aspect ratio 4:5.
```

## Глава 06 — «Окситоциновый туман»

Про офис продаж, где клиента укутывают в плед и поят чаем.

```
A thick wool blanket thrown over the arm of an armchair, a ceramic teapot with faint steam
on unsanded larch wood. Warm soft light, textile texture, empty space above.

Editorial photography, medium format look, 85mm, shallow depth of field.
Muted desaturated palette: warm beige, cool grey-blue, soft cream light.
Overcast morning after rain, thin haze, wet surfaces, no direct sun, no harsh shadows.
Empty upper two thirds of the frame, single subject in the lower third, slightly right of centre.
Calm, quiet, understated. Very few objects in frame.
No people, no faces, no hands. No text, no letters, no numbers, no signage, no logos, no watermarks.
Aspect ratio 4:5.
```

## Глава 07 — «Эффект священной кружки»

Про магнит на чужом холодильнике и присвоение до сделки.

```
A clean white fridge door with a single small cheap ceramic souvenir magnet on it,
nothing else. Flat daylight, minimal composition, large empty white field above.

Editorial photography, medium format look, 85mm, shallow depth of field.
Muted desaturated palette: warm beige, cool grey-blue, soft cream light.
Overcast morning after rain, thin haze, wet surfaces, no direct sun, no harsh shadows.
Empty upper two thirds of the frame, single subject in the lower third, slightly right of centre.
Calm, quiet, understated. Very few objects in frame.
No people, no faces, no hands. No text, no letters, no numbers, no signage, no logos, no watermarks.
Aspect ratio 4:5.
```

## Глава 08 — «Миндалина на страже ипотеки»

Про таймер обратного отсчёта, который обгоняет расчёт.

```
A mechanical split-flap display board in a dark empty hall, flaps blurred mid-flip,
cold blue light, no readable characters. Deep shadow, single point of focus.

Editorial photography, medium format look, 85mm, shallow depth of field.
Muted desaturated palette: warm beige, cool grey-blue, soft cream light.
Overcast morning after rain, thin haze, wet surfaces, no direct sun, no harsh shadows.
Empty upper two thirds of the frame, single subject in the lower third, slightly right of centre.
Calm, quiet, understated. Very few objects in frame.
No people, no faces, no hands. No text, no letters, no numbers, no signage, no logos, no watermarks.
Aspect ratio 4:5.
```

## Глава 09 — «Ловушка невозвратных инвестиций»

Про папку с именем клиента, которая тяжелеет и держит крепче договора.

```
A thick worn cardboard folder tied with cloth ribbons on a desk, a stack of papers beside it,
one desk lamp lighting it from the side. No hands, no readable text on the papers.

Editorial photography, medium format look, 85mm, shallow depth of field.
Muted desaturated palette: warm beige, cool grey-blue, soft cream light.
Overcast morning after rain, thin haze, wet surfaces, no direct sun, no harsh shadows.
Empty upper two thirds of the frame, single subject in the lower third, slightly right of centre.
Calm, quiet, understated. Very few objects in frame.
No people, no faces, no hands. No text, no letters, no numbers, no signage, no logos, no watermarks.
Aspect ratio 4:5.
```

## Глава 10 — «Качели для Системы 1 и 2»

Про папку графиков, которой оправдывают уже принятое решение.

```
Printed charts fanned out on a table, abstract line graphs with no readable labels,
one sheet in focus, a dried coffee ring stain on the paper, a glass of water at the edge.

Editorial photography, medium format look, 85mm, shallow depth of field.
Muted desaturated palette: warm beige, cool grey-blue, soft cream light.
Overcast morning after rain, thin haze, wet surfaces, no direct sun, no harsh shadows.
Empty upper two thirds of the frame, single subject in the lower third, slightly right of centre.
Calm, quiet, understated. Very few objects in frame.
No people, no faces, no hands. No text, no letters, no numbers, no signage, no logos, no watermarks.
Aspect ratio 4:5.
```

## Глава 11 — «Лобная кора говорит по-английски»

Про золотого дельфина на болоте, которого совет директоров всё-таки не построил.

```
A small golden dolphin scale model half sunk in dark peat water, mist over the surface,
cold early morning, reeds barely visible in the haze. Still water, muted gold reflection.

Editorial photography, medium format look, 85mm, shallow depth of field.
Muted desaturated palette: warm beige, cool grey-blue, soft cream light.
Overcast morning after rain, thin haze, wet surfaces, no direct sun, no harsh shadows.
Empty upper two thirds of the frame, single subject in the lower third, slightly right of centre.
Calm, quiet, understated. Very few objects in frame.
No people, no faces, no hands. No text, no letters, no numbers, no signage, no logos, no watermarks.
Aspect ratio 4:5.
```

---

## Если кадр не выходит

- **Предмет уехал в центр или вверх** — добавить в конец: `subject strictly in the lower right
  quadrant, top two thirds completely empty`.
- **Слишком много предметов** — `only two objects in the entire frame, nothing else`.
- **Лезет текст на табличках и бумагах** — усилить: `absolutely no text, no letters, no numbers
  anywhere in the image, blank surfaces`.
- **Кадр слишком контрастный и рекламный** — `flat lighting, low contrast, faded film look,
  no glossy advertising aesthetics`.

Смысл серии в том, что кадры намеренно «недожатые»: это визуальный эквивалент того самого
рендера, который Герман заказывает в первой главе, — обещание вместо предмета.
