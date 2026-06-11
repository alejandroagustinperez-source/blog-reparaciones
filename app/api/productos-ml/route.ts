import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  console.log("[API productos-ml] keywords recibidas:", q);

  if (!q) {
    console.log("[API productos-ml] no hay keywords, devolviendo vacío");
    return NextResponse.json({ results: [] });
  }

  try {
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(q)}&limit=3&condition=new`;
    console.log("[API productos-ml] URL completa:", url);

    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
        "Accept-Language": "es-AR,es;q=0.9",
      },
    });
    console.log("[API productos-ml] status code:", res.status);

    const raw = await res.text();
    console.log("[API productos-ml] primeros 200 chars del body:", raw.slice(0, 200));

    if (!res.ok) {
      console.log("[API productos-ml] respuesta no OK, devolviendo vacío");
      return NextResponse.json({ results: [] });
    }

    const data = JSON.parse(raw);
    console.log("[API productos-ml] cantidad de results:", data.results?.length ?? 0);
    return NextResponse.json({ results: data.results || [] });
  } catch (err) {
    console.log("[API productos-ml] error:", err);
    return NextResponse.json({ results: [] });
  }
}
