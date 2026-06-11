"use client";

import { useEffect, useState } from "react";

type Producto = {
  id: string;
  title: string;
  price: number;
  currency_id: string;
  thumbnail: string;
  permalink: string;
};

const AFILIADO_PARAMS =
  "?matt_tool=97247845&matt_word=&matt_source=google&matt_campaign=&matt_ad_type=&matt_ad_id=peal2834773";

function formatearPrecio(precio: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(precio);
}

export function ProductosAfiliados({
  keywords,
  cantidad = 3,
}: {
  keywords: string;
  cantidad?: number;
}) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancel = false;
    setError(false);

    fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(keywords)}&limit=${cantidad}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (cancel) return;
        const results: Producto[] = (data.results || []).map((r: any) => ({
          id: r.id,
          title: r.title,
          price: r.price,
          currency_id: r.currency_id,
          thumbnail: r.thumbnail,
          permalink: r.permalink,
        }));
        setProductos(results);
      })
      .catch(() => {
        if (!cancel) setError(true);
      });

    return () => {
      cancel = true;
    };
  }, [keywords, cantidad]);

  if (error || productos.length === 0) return null;

  return (
    <section className="mx-auto mt-10 max-w-[700px]">
      <h2 className="mb-4 text-xl font-bold text-[#1e3a5f]">
        Productos recomendados 🛒
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {productos.map((p) => (
          <a
            key={p.id}
            href={`${p.permalink}${AFILIADO_PARAMS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-40 items-center justify-center bg-gray-50 p-4">
              <img
                src={p.thumbnail.replace("http:", "https:")}
                alt={p.title}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-2 p-3">
              <p className="text-sm leading-snug text-gray-700">
                {p.title.length > 60
                  ? p.title.slice(0, 60) + "…"
                  : p.title}
              </p>
              <span className="text-lg font-bold text-[#1e3a5f]">
                {formatearPrecio(p.price)}
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
