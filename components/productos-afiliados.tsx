export default function ProductosAfiliados({ keywords }: { keywords: string }) {
  const slug = keywords.toLowerCase().replace(/\s+/g, '-');
  const searchUrl = `https://listado.mercadolibre.com.ar/${slug}`;

  return (
    <div style={{
      backgroundColor: '#1E3A5F',
      borderRadius: '12px',
      padding: '24px',
      margin: '32px 0',
      textAlign: 'center'
    }}>
      <h3 style={{ color: 'white', margin: '0 0 8px 0' }}>🛒 Productos recomendados</h3>
      <p style={{ color: '#ccc', margin: '0 0 16px 0' }}>
        Encontrá los mejores productos para este trabajo en MercadoLibre
      </p>
      
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: '#F97316',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
          display: 'inline-block'
        }}
      >
        Ver productos en MercadoLibre →
      </a>
    </div>
  );
}
