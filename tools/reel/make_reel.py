#!/usr/bin/env python3
"""Reel vertical estilo spot de TV para Reparaciones Simples del Hogar.

Uso:  python3 -I make_reel.py spec.json voz.wav salida_dir [--stills 1.0,3.0,...]

spec.json (ver spec_ejemplo.json): foto del artículo, textos y tiempos de cada escena.
Todo se dibuja por código (PIL) y se codifica con ffmpeg; la música y los efectos se
sintetizan por código (sin derechos de autor) y bajan solos cuando habla la locutora.
"""
import json, math, os, subprocess, sys, functools
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H, FPS = 1080, 1920, 30
NAVY = (30, 58, 95); NAVY2 = (45, 90, 142); ORANGE = (249, 115, 22)
WHITE = (255, 255, 255); DARK = (12, 26, 46); GRAY = (71, 85, 105); GREEN = (34, 197, 94)
BLUE = (96, 175, 235)
FP = "/usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf"
FPM = "/usr/share/fonts/truetype/google-fonts/Poppins-Medium.ttf"
FI = "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"
FIB = "/usr/share/fonts/opentype/inter/Inter-Bold.otf"


@functools.lru_cache(maxsize=None)
def font(path, size):
    return ImageFont.truetype(path, size)


def clamp(x, a=0.0, b=1.0):
    return max(a, min(b, x))


def eo(x):  # ease out cubic
    x = clamp(x); return 1 - (1 - x) ** 3


def eob(x):  # ease out back (rebote)
    x = clamp(x); c1 = 1.70158; c3 = c1 + 1
    return 1 + c3 * (x - 1) ** 3 + c1 * (x - 1) ** 2


def seg(t, a, d):  # progreso 0..1 de t en [a, a+d]
    return clamp((t - a) / d)


# ----------------------------------------------------------------- capas de texto
@functools.lru_cache(maxsize=512)
def text_layer(txt, fpath, size, fill, shadow=True):
    f = font(fpath, size)
    l, t, r, b = f.getbbox(txt)
    pad = 24
    img = Image.new("RGBA", (r - l + pad * 2, b - t + pad * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if shadow:
        sh = Image.new("RGBA", img.size, (0, 0, 0, 0))
        ImageDraw.Draw(sh).text((pad - l, pad - t + 5), txt, font=f, fill=(0, 0, 0, 110))
        img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(6)))
    d.text((pad - l, pad - t), txt, font=f, fill=fill)
    return img


def put(base, layer, cx, cy, scale=1.0, alpha=1.0):
    if alpha <= 0.003 or scale <= 0.01:
        return
    if scale != 1.0:
        layer = layer.resize((max(1, int(layer.width * scale)), max(1, int(layer.height * scale))), Image.BILINEAR)
    if alpha < 1.0:
        a = layer.getchannel("A").point(lambda v: int(v * alpha))
        layer = layer.copy(); layer.putalpha(a)
    x, y = int(cx - layer.width / 2), int(cy - layer.height / 2)
    base.paste(layer, (x, y), layer)


def txt(base, s, fpath, size, fill, cx, cy, scale=1.0, alpha=1.0, shadow=True):
    put(base, text_layer(s, fpath, size, tuple(fill), shadow), cx, cy, scale, alpha)


def wrap(s, fpath, size, maxw):
    f = font(fpath, size); words = s.split(); lines = []; cur = ""
    for w in words:
        test = (cur + " " + w).strip()
        if f.getlength(test) <= maxw:
            cur = test
        else:
            lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines


@functools.lru_cache(maxsize=64)
def rrect_layer(w, h, r, fill, shadow=0):
    pad = 60 if shadow else 0
    img = Image.new("RGBA", (w + pad * 2, h + pad * 2), (0, 0, 0, 0))
    if shadow:
        sh = Image.new("RGBA", img.size, (0, 0, 0, 0))
        ImageDraw.Draw(sh).rounded_rectangle((pad, pad + 14, pad + w, pad + h + 14), r, fill=(0, 0, 0, shadow))
        img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(24)))
    ImageDraw.Draw(img).rounded_rectangle((pad, pad, pad + w, pad + h), r, fill=fill)
    return img


# ----------------------------------------------------------------- fondos
@functools.lru_cache(maxsize=1)
def base_bg():
    y = np.linspace(0, 1, H)[:, None, None]
    top = np.array(DARK, float); bot = np.array(NAVY2, float)
    g = (top * (1 - y) + bot * y) * np.ones((H, W, 3))
    img = Image.fromarray(g.astype("uint8"))
    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(grid)
    for x in range(0, W, 60): d.line((x, 0, x, H), fill=(255, 255, 255, 12), width=1)
    for yy in range(0, H, 60): d.line((0, yy, W, yy), fill=(255, 255, 255, 12), width=1)
    img = img.convert("RGBA"); img.alpha_composite(grid)
    return img.convert("RGB")


@functools.lru_cache(maxsize=1)
def glow():
    s = 900; yy, xx = np.mgrid[0:s, 0:s]
    d = np.sqrt((xx - s / 2) ** 2 + (yy - s / 2) ** 2) / (s / 2)
    a = np.clip(1 - d, 0, 1) ** 2
    img = np.zeros((s, s, 4), "uint8"); img[..., 0:3] = ORANGE; img[..., 3] = (a * 120).astype("uint8")
    return Image.fromarray(img, "RGBA")


def background(t):
    im = base_bg().copy()
    gx = 200 + 300 * math.sin(t * 0.35); gy = 420 + 220 * math.cos(t * 0.28)
    g2x = 900 - 260 * math.sin(t * 0.3 + 1); g2y = 1500 + 200 * math.sin(t * 0.4)
    im.paste(glow(), (int(gx - 450), int(gy - 450)), glow())
    gl = glow().point(lambda v: v) if False else glow()
    tint = Image.new("RGB", glow().size, (75, 134, 198))
    im.paste(tint, (int(g2x - 450), int(g2y - 450)), glow().getchannel("A").point(lambda v: int(v * 0.6)))
    return im


def draw_wrench(d, cx, cy, s, fill, bg):
    """Llave inglesa simple centrada en (cx,cy), tamaño s."""
    d.line((cx - s * .30, cy + s * .30, cx + s * .10, cy - s * .10), fill=fill, width=int(s * .20))
    d.ellipse((cx + s * .02 - s * .05, cy - s * .30 - s * .05, cx + s * .02 + s * .38, cy + s * .08 + s * .05), fill=fill)
    d.ellipse((cx + s * .15, cy - s * .20, cx + s * .27, cy - s * .08), fill=bg)
    d.polygon([(cx + s * .21, cy - s * .14), (cx + s * .52, cy - s * .45), (cx + s * .40, cy - s * .50), (cx + s * .12, cy - s * .20)], fill=bg)


@functools.lru_cache(maxsize=8)
def logo_layer(size):
    img = Image.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "logo.png")).convert("RGBA")
    ImageDraw.Draw(img).rounded_rectangle((7, 7, 504, 504), 114, outline=(255, 255, 255, 150), width=14)
    return img.resize((size, size), Image.LANCZOS)


def txt_left(base, s, fpath, size, fill, x, cy, alpha=1.0):
    lay = text_layer(s, fpath, size, tuple(fill), False)
    put(base, lay, x - 24 + lay.width / 2, cy, 1.0, alpha)


def brand_bar(im, t, alpha=1.0):
    put(im, logo_layer(100), 110, 150, alpha=alpha)
    txt_left(im, "Reparaciones Simples", FP, 36, WHITE, 180, 132, alpha)
    txt_left(im, "del Hogar", FP, 36, ORANGE, 180, 174, alpha)


# ----------------------------------------------------------------- íconos
@functools.lru_cache(maxsize=8)
def icon_layer(kind, size=300):
    ss = 2; S = size * ss
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    c = S / 2; w = int(S * 0.045); col = WHITE + (255,)
    if kind == "dial":
        d.ellipse((c - S * .33, c - S * .33, c + S * .33, c + S * .33), outline=col, width=w)
        for i in range(12):
            a = math.radians(i * 30 - 90)
            d.line((c + math.cos(a) * S * .40, c + math.sin(a) * S * .40, c + math.cos(a) * S * .46, c + math.sin(a) * S * .46), fill=col, width=w)
        a = math.radians(40)
        d.line((c, c, c + math.sin(a) * S * .24, c - math.cos(a) * S * .24), fill=ORANGE + (255,), width=int(w * 1.4))
        d.ellipse((c - S * .05, c - S * .05, c + S * .05, c + S * .05), fill=ORANGE + (255,))
    elif kind == "drum":
        d.ellipse((c - S * .38, c - S * .38, c + S * .38, c + S * .38), outline=col, width=w)
        for i in range(3):
            a = math.radians(i * 120 - 90); r = S * .20; rr = S * .11
            x, y = c + math.cos(a) * r, c + math.sin(a) * r
            d.ellipse((x - rr, y - rr, x + rr, y + rr), fill=ORANGE + (255,) if i == 0 else col)
        d.ellipse((c - S * .03, c - S * .03, c + S * .03, c + S * .03), fill=col)
    elif kind == "filter":
        d.ellipse((c - S * .36, c - S * .36, c + S * .36, c + S * .36), outline=col, width=w)
        m = Image.new("L", (S, S), 0); md = ImageDraw.Draw(m)
        md.ellipse((c - S * .34, c - S * .34, c + S * .34, c + S * .34), fill=255)
        mesh = Image.new("RGBA", (S, S), (0, 0, 0, 0)); mdw = ImageDraw.Draw(mesh)
        for k in range(-3, 4):
            mdw.line((c + k * S * .095, 0, c + k * S * .095, S), fill=col, width=int(w * .6))
            mdw.line((0, c + k * S * .095, S, c + k * S * .095), fill=col, width=int(w * .6))
        img.paste(mesh, (0, 0), m)
        d.ellipse((c - S * .07, c - S * .07, c + S * .07, c + S * .07), fill=ORANGE + (255,))
    elif kind == "check":
        d.line((S * .22, S * .52, S * .42, S * .72), fill=col, width=int(S * .12))
        d.line((S * .42, S * .72, S * .80, S * .30), fill=col, width=int(S * .12))
        for p in ((S * .22, S * .52), (S * .42, S * .72), (S * .80, S * .30)):
            d.ellipse((p[0] - S * .06, p[1] - S * .06, p[0] + S * .06, p[1] + S * .06), fill=col)
    return img.resize((size, size), Image.LANCZOS)


@functools.lru_cache(maxsize=8)
def disc(size, fill):
    ss = 3; S = size * ss
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    ImageDraw.Draw(img).ellipse((0, 0, S - 1, S - 1), fill=fill)
    return img.resize((size, size), Image.LANCZOS)


def flash(im, t, at, dur=0.16, strength=0.7):
    p = 1 - seg(t, at, dur)
    if 0 < p < 1 and t >= at:
        ov = Image.new("RGB", (W, H), WHITE)
        im.paste(Image.blend(im, ov, p * strength))


def teardrop(d, x, y, r, col):
    d.ellipse((x - r, y - r * .55, x + r, y + r * 1.45), fill=col)
    d.polygon([(x, y - r * 2.1), (x - r * .93, y), (x + r * .93, y)], fill=col)


# ----------------------------------------------------------------- escenas
class Reel:
    def __init__(self, spec, photo_path):
        self.s = spec
        ph = Image.open(photo_path).convert("RGB")
        self.photo = ph
        cover = ph.copy()
        sc = max(W / cover.width, H / cover.height)
        cover = cover.resize((int(cover.width * sc), int(cover.height * sc)), Image.LANCZOS)
        cover = cover.crop(((cover.width - W) // 2, 0, (cover.width - W) // 2 + W, H)).filter(ImageFilter.GaussianBlur(38))
        self.blur = Image.blend(cover, Image.new("RGB", (W, H), DARK), 0.62)
        # foto grande para zoom
        ph_h = 820
        self.big = ph.resize((int(ph.width * ph_h / ph.height), ph_h), Image.LANCZOS)
        self.mask_cache = {}

    def photo_panel(self, w, h, zoom, shift=0.0):
        bw, bh = self.big.size
        cw, ch = int(w / zoom), int(h / zoom)
        x0 = int((bw - cw) / 2 + shift * (bw - cw) / 2); y0 = int((bh - ch) / 2)
        x0 = max(0, min(bw - cw, x0))
        crop = self.big.crop((x0, y0, x0 + cw, y0 + ch)).resize((w, h), Image.BILINEAR)
        key = (w, h)
        if key not in self.mask_cache:
            m = Image.new("L", (w * 2, h * 2), 0)
            ImageDraw.Draw(m).rounded_rectangle((0, 0, w * 2 - 1, h * 2 - 1), 70, fill=255)
            self.mask_cache[key] = m.resize((w, h), Image.LANCZOS)
        return crop, self.mask_cache[key]

    # --- escena 1: gancho
    def s_hook(self, t, d):
        im = self.blur.copy()
        g = glow(); im.paste(Image.new("RGB", g.size, ORANGE), (int(540 + 200 * math.sin(t) - 450), 1500 - 450), g.getchannel("A").point(lambda v: int(v * .5)))
        a1 = eob(seg(t, 0.15, 0.55)); a2 = eob(seg(t, 0.75, 0.55))
        lines = self.s["hook"]
        txt(im, lines[0], FP, 104, WHITE, 540, 330, scale=0.6 + 0.4 * a1, alpha=clamp(a1))
        txt(im, lines[1], FP, 124, ORANGE, 540, 470, scale=0.6 + 0.4 * a2, alpha=clamp(a2))
        # panel con la foto del artículo
        pw, ph_ = 1000, 700
        zoom = 1.0 + 0.16 * seg(t, 0, d + 0.5)
        crop, mask = self.photo_panel(pw, ph_, zoom, shift=-0.3 + 0.6 * seg(t, 0, d))
        slide = eo(seg(t, 0.4, 0.7))
        py = 640 + int((1 - slide) * 260)
        card = rrect_layer(pw + 16, ph_ + 16, 78, WHITE + (255,), shadow=170)
        put(im, card, 540, py + ph_ / 2, alpha=slide)
        panel = Image.new("RGBA", (pw, ph_)); panel.paste(crop, (0, 0)); panel.putalpha(mask)
        put(im, panel, 540, py + ph_ / 2, alpha=slide)
        # gotas cayendo
        dr = ImageDraw.Draw(im)
        if t > 1.2:
            for i, x in enumerate((300, 560, 790)):
                ph = ((t - 1.2) * 0.95 + i * 0.37) % 1.0
                y = py + ph_ + 20 + ph * 210
                r = 15 + i * 2
                if y < py + ph_ + 230:
                    teardrop(dr, x, y, r, BLUE)
        # chip de alerta
        p = eob(seg(t, 2.1, 0.5))
        chip = rrect_layer(900, 118, 59, ORANGE + (255,), shadow=140)
        put(im, chip, 540, 1500, scale=0.7 + 0.3 * p, alpha=clamp(p))
        txt(im, self.s["chip"], FP, 50, WHITE, 540, 1500, scale=0.7 + 0.3 * p, alpha=clamp(p), shadow=False)
        brand_bar(im, t)
        return im

    # --- escena 2: antes de llamar al técnico
    def s_before(self, t, d):
        im = background(t)
        brand_bar(im, t)
        a = eob(seg(t, 0.0, 0.5)); b = eob(seg(t, 0.35, 0.5))
        txt(im, "ANTES DE LLAMAR", FP, 100, WHITE, 540, 560, scale=0.7 + 0.3 * a, alpha=clamp(a))
        txt(im, "AL TÉCNICO", FP, 128, ORANGE, 540, 720, scale=0.7 + 0.3 * b, alpha=clamp(b))
        # pastilla "visita técnica" tachada
        c = eob(seg(t, 0.8, 0.45))
        pill = rrect_layer(760, 130, 65, (255, 255, 255, 235), shadow=120)
        put(im, pill, 540, 980, scale=0.8 + 0.2 * c, alpha=clamp(c))
        txt(im, "Visita técnica  $$$", FI, 56, NAVY, 540, 980, scale=0.8 + 0.2 * c, alpha=clamp(c), shadow=False)
        x = seg(t, 1.35, 0.35)
        if x > 0:
            dr = ImageDraw.Draw(im)
            dr.line((200, 1020, 200 + 680 * eo(x), 940), fill=(239, 68, 68), width=16)
        e = eob(seg(t, 1.5, 0.5))
        bounce = math.sin(t * 7) * 14
        txt(im, "Probá esto", FP, 112, WHITE, 540, 1260, scale=0.7 + 0.3 * e, alpha=clamp(e))
        if e > 0.2:
            dr = ImageDraw.Draw(im)
            ay = 1400 + bounce
            dr.polygon([(480, ay), (600, ay), (540, ay + 70)], fill=ORANGE)
        return im

    # --- escenas 3-5: pasos
    def s_step(self, t, d, i):
        st = self.s["steps"][i]
        im = background(t)
        brand_bar(im, t)
        # progreso
        for k in range(3):
            on = k <= i
            put(im, disc(34, ORANGE + (255,) if on else (255, 255, 255, 70)), 540 + (k - 1) * 70, 300)
        pop = eob(seg(t, 0.0, 0.55))
        out = 1 - 0.0
        sc = 0.88 + 0.12 * pop
        cy = 960 + (1 - eo(seg(t, 0, 0.5))) * 420
        card = rrect_layer(940, 900, 70, WHITE + (255,), shadow=150)
        put(im, card, 540, cy, scale=sc, alpha=clamp(pop * 1.4))
        # contenido
        o = lambda a_: eob(seg(t, a_, 0.5))
        pw = rrect_layer(250, 78, 39, ORANGE + (255,))
        put(im, pw, 330, cy - 370, scale=sc * (0.7 + 0.3 * o(0.25)), alpha=clamp(o(0.25)))
        txt(im, f"PASO {i + 1}", FP, 42, WHITE, 330, cy - 370, scale=sc * (0.7 + 0.3 * o(0.25)), alpha=clamp(o(0.25)), shadow=False)
        ic = o(0.3)
        put(im, disc(330, NAVY + (255,)), 540, cy - 170, scale=sc * (0.6 + 0.4 * ic), alpha=clamp(ic))
        rot_scale = 1.0 + 0.03 * math.sin(t * 3)
        put(im, icon_layer(st["icon"], 260), 540, cy - 170, scale=sc * (0.6 + 0.4 * ic) * rot_scale, alpha=clamp(ic))
        tl = wrap(st["title"], FP, 74, 820)
        y = cy + 60
        for ln in tl:
            o2 = o(0.5)
            txt(im, ln, FP, 74, NAVY, 540, y + (1 - clamp(o2)) * 40, alpha=clamp(o2), shadow=False)
            y += 92
        sl = wrap(st["sub"], FI, 46, 800)
        y += 16
        for ln in sl:
            o3 = o(0.7)
            txt(im, ln, FI, 46, GRAY, 540, y + (1 - clamp(o3)) * 30, alpha=clamp(o3), shadow=False)
            y += 62
        ck = eob(seg(t, d - 0.9, 0.45))
        if ck > 0:
            put(im, disc(120, GREEN + (255,)), 540, cy + 365, scale=ck)
            put(im, icon_layer("check", 120), 540, cy + 365, scale=ck)
        return im

    # --- escena 6: menos de 30 minutos
    def s_time(self, t, d):
        im = background(t)
        brand_bar(im, t)
        a = eob(seg(t, 0.0, 0.5))
        txt(im, "SE ARREGLA EN", FP, 70, WHITE, 540, 480, scale=0.7 + 0.3 * a, alpha=clamp(a))
        txt(im, "MENOS DE", FP, 70, ORANGE, 540, 570, scale=0.7 + 0.3 * a, alpha=clamp(a))
        p = eo(seg(t, 0.25, 1.3))
        S = 760
        ring = Image.new("RGBA", (S * 2, S * 2), (0, 0, 0, 0)); rd = ImageDraw.Draw(ring)
        box = (S - 560, S - 560, S + 560, S + 560)
        rd.arc(box, 0, 360, fill=(255, 255, 255, 40), width=70)
        rd.arc(box, -90, -90 + 360 * p, fill=ORANGE + (255,), width=70)
        ring = ring.resize((S, S), Image.LANCZOS)
        put(im, ring, 540, 1060, alpha=clamp(a))
        n = int(round(30 * p))
        txt(im, str(n), FP, 330, WHITE, 540, 1010, alpha=clamp(a))
        txt(im, "minutos", FP, 62, ORANGE, 540, 1195, alpha=clamp(a))
        c = eob(seg(t, 1.5, 0.45))
        if c > 0:
            put(im, disc(130, GREEN + (255,)), 840, 740, scale=c)
            put(im, icon_layer("check", 130), 840, 740, scale=c)
        e = eob(seg(t, 1.1, 0.5))
        txt(im, "La mayoría de las veces", FI, 50, (226, 232, 240), 540, 1520, alpha=clamp(e), shadow=False)
        return im

    # --- escena 7: llamada a la acción
    def s_cta(self, t, d):
        im = background(t)
        a = eob(seg(t, 0.0, 0.6))
        put(im, logo_layer(260), 540, 430, scale=0.5 + 0.5 * a, alpha=clamp(a))
        txt(im, "Reparaciones Simples", FP, 70, WHITE, 540, 660, alpha=clamp(a))
        txt(im, "del Hogar", FP, 70, ORANGE, 540, 750, alpha=clamp(a))
        b = eob(seg(t, 0.5, 0.55))
        txt(im, "GUÍA COMPLETA", FP, 100, WHITE, 540, 960, scale=0.7 + 0.3 * b, alpha=clamp(b))
        gl = 1 + 0.04 * math.sin(t * 6)
        c = eob(seg(t, 0.8, 0.55))
        pill = rrect_layer(520, 150, 75, GREEN + (255,), shadow=150)
        put(im, pill, 540, 1120, scale=(0.7 + 0.3 * c) * gl, alpha=clamp(c))
        txt(im, "GRATIS", FP, 90, WHITE, 540, 1120, scale=(0.7 + 0.3 * c) * gl, alpha=clamp(c), shadow=False)
        e = eob(seg(t, 1.3, 0.5))
        txt(im, self.s["url"], FIB, 38, (226, 232, 240), 540, 1290, alpha=clamp(e), shadow=False)
        f = eob(seg(t, 1.8, 0.5))
        bio = rrect_layer(640, 120, 60, ORANGE + (255,), shadow=150)
        put(im, bio, 540, 1440, scale=0.7 + 0.3 * f, alpha=clamp(f))
        txt(im, "Link en la bio", FP, 56, WHITE, 540, 1440, scale=0.7 + 0.3 * f, alpha=clamp(f), shadow=False)
        txt(im, "Voz generada con IA", FI, 30, (148, 163, 184), 540, 1560, alpha=clamp(f) * 0.9, shadow=False)
        return im

    def frame(self, t):
        sc = self.s["scenes"]  # lista de [inicio, nombre]
        idx = max(i for i, (st, _) in enumerate(sc) if t >= st - 1e-9)
        st, name = sc[idx]
        end = sc[idx + 1][0] if idx + 1 < len(sc) else self.s["total"]
        lt, d = t - st, end - st
        if name == "hook": im = self.s_hook(lt, d)
        elif name == "before": im = self.s_before(lt, d)
        elif name.startswith("step"): im = self.s_step(lt, d, int(name[4:]) - 1)
        elif name == "time": im = self.s_time(lt, d)
        else: im = self.s_cta(lt, d)
        if idx > 0:
            flash(im, lt, 0.0)
        return im


# ----------------------------------------------------------------- audio
SR = 44100


def env_from(path, hop=0.02):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout
    x = np.abs(np.frombuffer(raw, dtype="<f4"))
    n = int(hop * SR)
    e = np.array([x[i:i + n].mean() for i in range(0, len(x), n)])
    return e, len(x) / SR


def synth(total, cut_times, ding_times, vo_env, hop=0.02, bpm=108):
    n = int(total * SR); t = np.arange(n) / SR
    beat = 60 / bpm
    out = np.zeros((2, n))

    def add(sig, start, gain=1.0, pan=0.0):
        i = int(start * SR)
        if i >= n: return
        sig = sig[: n - i]
        out[0, i:i + len(sig)] += sig * gain * (1 - pan) / 1.0
        out[1, i:i + len(sig)] += sig * gain * (1 + pan) / 1.0

    def tone(f, dur, kind="pluck"):
        tt = np.arange(int(dur * SR)) / SR
        if kind == "pad":
            s = sum(np.sin(2 * np.pi * f * k * tt + k) / k for k in (1, 2, 3)) * 0.4
            env = np.minimum(1, tt / 0.25) * np.minimum(1, (dur - tt) / 0.3)
        else:
            s = (np.sin(2 * np.pi * f * tt) + 0.4 * np.sin(2 * np.pi * 2 * f * tt) + 0.15 * np.sin(2 * np.pi * 3 * f * tt))
            env = np.exp(-tt * 7)
        return s * env

    midi = lambda m: 440 * 2 ** ((m - 69) / 12)
    prog = [(57, 60, 64), (53, 57, 60), (48, 52, 55), (55, 59, 62)]  # Am F C G
    bars = int(total / (beat * 4)) + 1
    for b in range(bars):
        ch = prog[b % 4]; t0 = b * beat * 4
        for m in ch:
            add(tone(midi(m), beat * 4, "pad"), t0, 0.08, pan=-0.2 if m == ch[0] else 0.2)
        add(tone(midi(ch[0] - 12), beat * 4, "pad"), t0, 0.12)
        for k in range(8):  # arpegio en corcheas
            m = ch[[0, 1, 2, 1, 0, 1, 2, 2][k]] + 12
            add(tone(midi(m), beat, "pluck"), t0 + k * beat / 2, 0.09, pan=0.35 if k % 2 else -0.35)
    # percusión
    kick = np.sin(2 * np.pi * (55 + 90 * np.exp(-np.arange(int(.25 * SR)) / SR * 30)) * np.arange(int(.25 * SR)) / SR) * np.exp(-np.arange(int(.25 * SR)) / SR * 14)
    rng = np.random.default_rng(3)
    hat = rng.standard_normal(int(.05 * SR)) * np.exp(-np.arange(int(.05 * SR)) / SR * 90)
    hat = np.diff(hat, prepend=0)
    for k in range(int(total / beat) + 1):
        if k >= 2:
            add(kick, k * beat, 0.35)
        add(hat, k * beat + beat / 2, 0.10)
    # efectos
    for c in cut_times:  # whoosh
        dur = 0.45; tt = np.arange(int(dur * SR)) / SR
        nz = rng.standard_normal(len(tt)) * np.sin(np.pi * tt / dur) ** 2
        k = np.ones(40) / 40
        nz = nz - np.convolve(nz, k, "same")
        add(nz, max(0, c - 0.3), 0.10)
    for d_ in ding_times:
        tt = np.arange(int(.9 * SR)) / SR
        s = (np.sin(2 * np.pi * 1318 * tt) + 0.5 * np.sin(2 * np.pi * 1975 * tt)) * np.exp(-tt * 5)
        add(s, d_, 0.14)
    # ducking: baja la música cuando habla la locutora
    e = np.interp(t, np.arange(len(vo_env)) * hop, vo_env, right=0)
    sm = np.convolve(e, np.ones(int(.15 * SR)) / int(.15 * SR), "same")
    duck = 1 - 0.78 * np.clip(sm / 0.04, 0, 1)
    k = np.exp(-np.arange(int(.35 * SR)) / (SR * .12)); k /= k.sum()
    duck = np.convolve(duck, k, "full")[:n]
    out *= duck
    fade = np.minimum(1, t / 0.4) * np.minimum(1, (total - t) / 1.2)
    out *= fade
    return out.T


def write_wav(path, arr):
    import wave
    a = np.clip(arr, -1, 1)
    pcm = (a * 32767).astype("<i2")
    with wave.open(path, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())


# ----------------------------------------------------------------- main
def main():
    args = sys.argv[1:]
    spec_path, vo, outdir = args[0], args[1], args[2]
    stills = None
    if "--stills" in args:
        stills = [float(x) for x in args[args.index("--stills") + 1].split(",")]
    spec = json.load(open(spec_path))
    os.makedirs(outdir, exist_ok=True)
    base = os.path.dirname(os.path.abspath(spec_path))
    photo = spec["photo"] if os.path.isabs(spec["photo"]) else os.path.join(base, spec["photo"])
    reel = Reel(spec, photo)
    if stills:
        for s in stills:
            reel.frame(s).save(os.path.join(outdir, f"still_{s:.1f}.png"))
        return
    total = spec["total"]
    name = spec["name"]
    tmp_v = os.path.join(outdir, "_video.mp4")
    p = subprocess.Popen(
        ["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
         "-c:v", "libx264", "-crf", "18", "-preset", "veryfast", "-pix_fmt", "yuv420p", "-movflags", "+faststart", tmp_v],
        stdin=subprocess.PIPE)
    nframes = int(total * FPS)
    for i in range(nframes):
        p.stdin.write(reel.frame(i / FPS).tobytes())
    p.stdin.close(); p.wait()
    # audio
    env, vdur = env_from(vo)
    cuts = [st for st, _ in spec["scenes"][1:]]
    dings = [spec["scenes"][i + 1][0] - 0.9 for i in range(len(spec["scenes"]) - 1) if spec["scenes"][i][1].startswith("step")]
    dings.append(spec["scenes"][-2][0] + 1.5)
    music = synth(total, cuts, dings, env)
    mpath = os.path.join(outdir, "_music.wav"); write_wav(mpath, music)
    final = os.path.join(outdir, f"{name}.mp4")
    tmp_f = os.path.join(outdir, f"_{name}.tmp.mp4")
    vstart = spec.get("vo_start", 0.0)
    subprocess.run(
        ["ffmpeg", "-y", "-v", "error", "-i", tmp_v, "-i", mpath, "-i", vo, "-filter_complex",
         f"[2:a]aresample={SR},adelay={int(vstart * 1000)}|{int(vstart * 1000)},volume=1.15[v];[1:a]volume=1.0[m];"
         f"[m][v]amix=inputs=2:duration=longest:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9,alimiter=limit=0.89,atrim=0:{total}[a]",
         "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", tmp_f], check=True)
    os.replace(tmp_f, final)
    reel.frame(spec.get("cover_t", 2.8)).save(os.path.join(outdir, f"{name}_portada.jpg"), quality=92)
    # versión liviana < 10 MB
    web = os.path.join(outdir, f"{name}_web.mp4")
    tmp_w = os.path.join(outdir, f"_{name}_web.tmp.mp4")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", final, "-c:v", "libx264", "-crf", "26", "-preset", "veryfast",
                    "-maxrate", "2.5M", "-bufsize", "5M", "-c:a", "copy", tmp_w], check=True)
    os.replace(tmp_w, web)
    os.remove(tmp_v); os.remove(mpath)
    print("OK", final, os.path.getsize(final), os.path.getsize(web))


if __name__ == "__main__":
    main()
