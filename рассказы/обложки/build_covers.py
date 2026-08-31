#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Сборка обложек серии «Орбит-фронтальный переход» в стилистике канала «Прагматик».

  python3 build_covers.py             — собрать HTML всех глав в out/
  python3 build_covers.py --png       — плюс отрендерить PNG через headless Chrome
  python3 build_covers.py --only 1 2  — только указанные главы

Картинка главы: img/NN.jpg (Higgsfield, 4:5 или шире). Нет файла — рисуется
служебная заглушка, вёрстка не ломается.
"""
import io, json, os, subprocess, sys, shutil

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, 'out')
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

TPL = '''<!doctype html><html lang="ru"><head><meta charset="utf-8">
<title>Глава {ch:02d} — {plain}</title>
<link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
*{{margin:0;padding:0;box-sizing:border-box}}
:root{{--lime:#d5fc6a;--blue:#2558fc;--ink:#0d0d0d;
--font:'Onest',system-ui,sans-serif;--mono:'JetBrains Mono',ui-monospace,monospace}}
body{{width:640px;height:800px;background:var(--ink);color:#fff;font-family:var(--font);
position:relative;overflow:hidden;display:flex;flex-direction:column;padding:26px 28px 24px}}
/* цветная утечка — фирменный приём канала */
.bleed{{position:absolute;inset:0;pointer-events:none}}
.bleed i,.veil i{{position:absolute;border-radius:50%;display:block}}
.b1{{right:-120px;top:150px;width:520px;height:520px;
background:radial-gradient(circle,rgba(150,255,90,.42) 0%,rgba(150,255,90,0) 66%)}}
.b2{{left:-200px;top:300px;width:600px;height:600px;
background:radial-gradient(circle,rgba(37,88,252,.55) 0%,rgba(37,88,252,0) 68%)}}
.b3{{right:20px;bottom:-190px;width:460px;height:460px;
background:radial-gradient(circle,rgba(150,80,230,.40) 0%,rgba(150,80,230,0) 70%)}}
/* та же утечка поверх кадра — в канале цвет заходит на фотографию */
.veil{{position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen;opacity:.55;z-index:3}}
.top,.mid,.shot,.foot{{position:relative;z-index:2}}
.top{{display:flex;justify-content:space-between;align-items:baseline;font-family:var(--mono);
font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--lime)}}
.top .r{{color:rgba(255,255,255,.5)}}
h1{{margin-top:20px;font-size:{size}px;font-weight:700;line-height:1.14;letter-spacing:-1px}}
h1 span{{display:inline-block;padding:1px 10px 3px;margin-bottom:5px}}
h1 .w{{background:#fff;color:var(--ink)}}
h1 .l{{background:var(--lime);color:var(--ink)}}
.hook{{margin-top:14px;font-size:17px;line-height:1.42;font-weight:500;
color:rgba(255,255,255,.92);max-width:520px}}
.shot{{position:relative;margin-top:20px;flex:1;min-height:300px;overflow:hidden;background:#141414}}
.shot img{{width:100%;height:100%;object-fit:cover;object-position:50% 76%;display:block}}
.stub{{width:100%;height:100%;display:flex;align-items:center;justify-content:center;
border:1px dashed rgba(255,255,255,.22);font-family:var(--mono);font-size:11px;
letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.35);text-align:center;padding:0 30px}}
.concept{{position:absolute;left:0;bottom:0;z-index:4;background:var(--ink);color:rgba(255,255,255,.72);
font-family:var(--mono);font-size:9.5px;letter-spacing:.6px;padding:7px 12px 6px;max-width:88%}}
.foot{{margin-top:18px;padding-top:15px;border-top:1px solid rgba(255,255,255,.16);
display:flex;align-items:center;gap:11px}}
.mark{{width:28px;height:28px;background:var(--lime);color:var(--ink);flex-shrink:0;
display:flex;align-items:center;justify-content:center;font-size:15px;line-height:1}}
.foot .t{{font-family:var(--mono);font-size:9.5px;font-weight:700;letter-spacing:1.4px;
text-transform:uppercase;color:rgba(255,255,255,.5);line-height:1.6}}
.foot .t b{{color:#fff;display:block}}
</style></head><body>
<div class="bleed"><i class="b1"></i><i class="b2"></i><i class="b3"></i></div>
<div class="veil"><i class="b1"></i><i class="b2"></i><i class="b3"></i></div>

<div class="top"><span>[ Орбит-фронтальный переход ]</span><span class="r">/ Глава {ch:02d}</span></div>

<div class="mid">
  <h1>{head}</h1>
  <div class="hook">{hook}</div>
</div>

<div class="shot">{shot}
  <div class="concept">{concept}</div>
</div>

<div class="foot">
  <div class="mark">✦</div>
  <div class="t"><b>Прагматик · Система</b>sistema.pragmatiq.online / stories</div>
</div>
</body></html>
'''

TPL_INLINE = '''<!doctype html><html lang="ru"><head><meta charset="utf-8">
<title>Глава {ch:02d} — врезка</title>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet">
<style>
*{{margin:0;padding:0;box-sizing:border-box}}
body{{width:1200px;height:720px;background:#0d0d0d;position:relative;overflow:hidden}}
img{{width:100%;height:100%;object-fit:cover;object-position:50% 76%;display:block}}
.stub{{width:100%;height:100%;display:flex;align-items:center;justify-content:center;
font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:2px;
text-transform:uppercase;color:rgba(255,255,255,.3)}}
/* марка: только знак и номер главы — в статье текст не нужен */
.mark{{position:absolute;left:0;bottom:0;display:flex;align-items:stretch;height:38px}}
.sq{{width:38px;background:#d5fc6a;color:#0d0d0d;display:flex;align-items:center;
justify-content:center;font-size:18px;line-height:1}}
.lbl{{background:rgba(13,13,13,.82);color:#fff;font-family:'JetBrains Mono',monospace;
font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;
display:flex;align-items:center;padding:0 16px}}
</style></head><body>
{shot}
<div class="mark"><div class="sq">✦</div><div class="lbl">Глава {ch:02d}</div></div>
</body></html>
'''

def build(items, png=False):
    os.makedirs(OUT, exist_ok=True)
    for it in items:
        ch = it['chapter']
        img = os.path.join(ROOT, 'img', '%02d.jpg' % ch)
        if os.path.exists(img):
            shutil.copy(img, os.path.join(OUT, '%02d.jpg' % ch))
            shot = '<img src="%02d.jpg" alt="">' % ch
        else:
            shot = ('<div class="stub">место под кадр Higgsfield<br>img/%02d.jpg — 4:5 или шире</div>' % ch)
        head = '<br>'.join('<span class="%s">%s</span>' % (kind, text) for text, kind in it['lines'])
        plain = ' '.join(t for t, _ in it['lines'])
        size = 52 if len(it['lines']) < 3 else 44
        html = TPL.format(ch=ch, plain=plain, head=head, hook=it['hook'],
                          concept=it.get('concept', ''), size=size, shot=shot)
        io.open(os.path.join(OUT, '%02d.html' % ch), 'w', encoding='utf-8').write(html)
        shot_in = shot if os.path.exists(img) else '<div class="stub">нет img/%02d.jpg</div>' % ch
        io.open(os.path.join(OUT, '%02d_inline.html' % ch), 'w', encoding='utf-8').write(
            TPL_INLINE.format(ch=ch, shot=shot_in))
        print('html %02d — %s' % (ch, plain))
    if png:
        render(items)

def render(items):
    if not os.path.exists(CHROME):
        print('Chrome не найден, PNG пропущены'); return
    for it in items:
        ch = it['chapter']
        src = 'file://' + os.path.join(OUT, '%02d.html' % ch)
        subprocess.run([CHROME, '--headless', '--disable-gpu', '--hide-scrollbars',
                        '--force-device-scale-factor=2', '--window-size=640,800',
                        '--screenshot=' + os.path.join(OUT, '%02d.png' % ch), src],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        subprocess.run([CHROME, '--headless', '--disable-gpu', '--hide-scrollbars',
                        '--force-device-scale-factor=2', '--window-size=1200,720',
                        '--screenshot=' + os.path.join(OUT, '%02d_inline.png' % ch),
                        'file://' + os.path.join(OUT, '%02d_inline.html' % ch)],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print('png  %02d — превью 640x800 + врезка 1200x720' % ch)

if __name__ == '__main__':
    data = json.load(io.open(os.path.join(ROOT, 'covers.json'), encoding='utf-8'))
    # концепт-строка берётся из фронтматтера главы на сайте
    stories = os.path.normpath(os.path.join(ROOT, '..', '..', 'site', 'src', 'content', 'stories'))
    for it in data:
        p = os.path.join(stories, it['slug'] + '.md')
        if os.path.exists(p):
            for line in io.open(p, encoding='utf-8'):
                if line.strip().startswith('concept:'):
                    it['concept'] = line.split('concept:', 1)[1].strip().strip('"').split('.')[0]
                    break
    only = []
    if '--only' in sys.argv:
        only = [int(a) for a in sys.argv[sys.argv.index('--only') + 1:] if a.isdigit()]
    items = [i for i in data if not only or i['chapter'] in only]
    build(items, png='--png' in sys.argv)
