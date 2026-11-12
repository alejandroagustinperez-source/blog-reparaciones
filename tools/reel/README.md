# Reel diario (spot de TV, 1080x1920, ~26 s)

Formato: gancho (pregunta + foto del artículo) → "antes de llamar al técnico" → 3 pasos en tarjetas →
"menos de 30 minutos" → cierre (guía gratis + link en la bio). Marca: azul #1e3a5f + naranja #f97316.
Voz: AI Studio (Generate speech), voz **Nika**, estilo "Locutora argentina rioplatense de comercial de TV de
electrodomésticos, voz cálida, segura y cercana, ritmo ágil y claro, sonriendo..." (NO usar Koda: es de AP-CM).

## Guion (≈23 s de voz, cada oración termina con <short pause>)
¿{problema}... {consecuencia}? <short pause> Antes de llamar al técnico, probá esto. <short pause>
Uno: {paso 1}. Dos: {paso 2}. Tres: {paso 3}. <short pause> {frase de tiempo/ahorro, sólo si el artículo la respalda}. <short pause>
Mirá la guía completa, gratis, en Reparaciones Simples del Hogar. Link en la bio.
Los pasos salen del artículo (los 3 más simples y seguros). Nada de gas ni electricidad peligrosa en los pasos.

## Pasos
1. Elegir el artículo del día (el más nuevo sin reel; ver archivos AAAA-MM-DD_slug.mp4 en la carpeta de salida).
2. Voz en aistudio.google.com/generate-speech: un solo bloque, voz Nika, texto del guion. Run → descargar WAV.
3. `ffmpeg -i voz.wav -af silencedetect=noise=-32dB:d=0.18 -f null -` para ver las pausas y fijar los inicios de
   escena en spec.json (hook, before, step1..3, time, cta; cada una empieza ~0.1 s antes de su frase). `total` = duración de la voz + ~2.5 s.
4. spec.json: copiar spec_ejemplo.json y cambiar name (AAAA-MM-DD_slug), photo (imagen del artículo; si no tiene,
   usar la de categoría o /images de otro artículo parecido), hook (2 líneas, la 2ª en naranja), chip, steps (icon: dial | drum | filter | check),
   scenes, total, cover_t.
5. `python3 -I make_reel.py spec.json voz.wav salida/` → MP4 + _web.mp4 (<10 MB) + _portada.jpg. Ver fotogramas con `--stills 2.9,8.4,...` antes del render final.
