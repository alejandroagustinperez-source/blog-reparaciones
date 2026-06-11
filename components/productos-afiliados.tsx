export function ProductosAfiliados({
  keywords,
}: {
  keywords: string;
}) {
  const href = `https://www.mercadolibre.com.ar/social/peal2834773?matt_word=peal2834773&matt_tool=87059659`;

  return (
    <section className="mx-auto mt-10 max-w-[700px] rounded-2xl bg-[#1E3A5F] p-6 text-white shadow-lg sm:p-8">
      <p className="mb-1 text-2xl font-bold">🛒 Productos recomendados</p>
      <p className="mb-5 text-sm leading-relaxed text-gray-200">
        Encontrá los mejores productos para {keywords ? "este trabajo" : "tu próximo reparación"} en MercadoLibre
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-xl bg-[#F97316] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e0650a]"
      >
        Ver productos en MercadoLibre →
      </a>
    </section>
  );
}
