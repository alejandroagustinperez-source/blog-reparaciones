"use client";

import { useEffect, useState } from "react";

const AFILIADO_PARAMS =
  "?matt_word=peal2834773&matt_tool=87059659";

export function ProductosAfiliados({
  keywords,
  cantidad = 3,
}: {
  keywords: string;
  cantidad?: number;
}) {
  const [productos, setProductos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("[ProductosAfiliados] SE MONTÓ el componente");
    console.log("[ProductosAfiliados] keywords recibidas:", keywords);

    let cancel = false;
    setError(null);
    setLoading(true);
    setProductos([]);

    const url = `/api/productos-ml?q=${encodeURIComponent(keywords)}`;
    console.log("[ProductosAfiliados] iniciando fetch a:", url);

    fetch(url)
      .then(async (res) => {
        console.log("[ProductosAfiliados] respuesta status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }
        const text = await res.text();
        console.log("[ProductosAfiliados] texto crudo:", text.slice(0, 500));
        return JSON.parse(text);
      })
      .then((data) => {
        if (cancel) return;
        console.log("[ProductosAfiliados] JSON parseado:", data);
        const results = data.results || [];
        console.log("[ProductosAfiliados] cantidad de results:", results.length);
        setProductos(results);
        setLoading(false);
      })
      .catch((err: any) => {
        if (cancel) return;
        console.log("[ProductosAfiliados] ERROR:", err.message);
        setError(err.message);
        setLoading(false);
      });

    return () => {
      console.log("[ProductosAfiliados] DESMONTAJE");
      cancel = true;
    };
  }, [keywords, cantidad]);

  if (loading) {
    return (
      <section className="mx-auto mt-10 max-w-[700px]">
        <p className="text-sm text-gray-500">Cargando productos...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto mt-10 max-w-[700px]">
        <div className="rounded-lg border border-red-300 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">
            Error: {error}
          </p>
          <p className="text-xs text-red-500">keywords: {keywords}</p>
        </div>
      </section>
    );
  }

  if (productos.length === 0) {
    return (
      <section className="mx-auto mt-10 max-w-[700px]">
        <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4">
          <p className="text-sm font-medium text-yellow-700">
            Sin resultados para: {keywords}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto mt-10 max-w-[700px]">
      <h2 className="mb-4 text-xl font-bold text-[#1e3a5f]">
        Productos recomendados 🛒
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {productos.map((p: any) => (
          <a
            key={p.id}
            href={`${p.permalink}${AFILIADO_PARAMS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-40 items-center justify-center bg-gray-50 p-4">
              <img
                src={p.thumbnail?.replace("http:", "https:")}
                alt={p.title}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-2 p-3">
              <p className="text-sm leading-snug text-gray-700">
                {p.title?.length > 60
                  ? p.title.slice(0, 60) + "…"
                  : p.title}
              </p>
              <span className="text-lg font-bold text-[#1e3a5f]">
                {p.price != null
                  ? "$" + Number(p.price).toLocaleString("es-AR")
                  : ""}
              </span>
              <span className="inline-block rounded-lg bg-[#f97316] px-3 py-1.5 text-center text-xs font-semibold text-white transition-colors hover:bg-[#e0650a]">
                Ver en MercadoLibre
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
