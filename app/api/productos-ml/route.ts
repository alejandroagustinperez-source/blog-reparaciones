import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  console.log("[API productos-ml] keywords recibidas:", q);

  if (!q) {
    console.log("[API productos-ml] no hay keywords, devolviendo vacío");
    return NextResponse.json({ results: [] });
  }

  try {
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(q)}&limit=3`;
    console.log("[API productos-ml] URL:", url);

    const res = await fetch(url, { next: { revalidate: 3600 } });
    console.log("[API productos-ml] status code:", res.status);

    if (!res.ok) {
      console.log("[API productos-ml] respuesta no OK, devolviendo vacío");
      return NextResponse.json({ results: [] });
    }

    const data = await res.json();
    console.log("[API productos-ml] cantidad de results:", data.results?.length ?? 0);
    return NextResponse.json({ results: data.results || [] });
  } catch (err) {
    console.log("[API productos-ml] error:", err);
    return NextResponse.json({ results: [] });
  }
}
