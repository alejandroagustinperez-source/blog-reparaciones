interface Producto {
  nombre: string;
  link: string;
}

const productosPorCategoria: Record<string, Producto[]> = {
  "herramientas plomeria": [
    { nombre: "Teflon", link: "https://meli.la/2Kp9P1p" },
    { nombre: "Desatascador sopapa", link: "https://meli.la/23xTGSU" },
    { nombre: "Llave de paso", link: "https://meli.la/2neG1fw" },
    { nombre: "Arandelas y gomas", link: "https://meli.la/19NwokA" },
    { nombre: "Cinta autofusionante", link: "https://meli.la/172H5z3" },
    { nombre: "Llave stillson", link: "https://meli.la/1qAqJ1X" },
    { nombre: "Silicona selladora", link: "https://meli.la/19YK9Yj" },
    { nombre: "Flexible de conexion", link: "https://meli.la/1n84vfm" },
  ],
};

export default function ProductosAfiliados({ keywords }: { keywords: string }) {
  const productos = productosPorCategoria[keywords];
  if (!productos) return null;

  return (
    <div
      style={{
        backgroundColor: "#1E3A5F",
        borderRadius: "12px",
        padding: "24px",
        margin: "32px 0",
      }}
    >
      <h3 style={{ color: "white", margin: "0 0 16px 0" }}>
        Productos recomendados
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "12px",
        }}
      >
        {productos.map((p) => (
          
            key={p.link}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#F97316",
              color: "white",
              padding: "10px 14px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "14px",
              textAlign: "center",
              display: "block",
            }}
          >
            {p.nombre}
          </a>
        ))}
      </div>
    </div>
  );
}
