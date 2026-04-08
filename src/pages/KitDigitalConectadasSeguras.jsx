import React, { useEffect } from 'react';

/**
 * Kit Digital — Conectadas y Seguras
 * FINEM Politics × PAN Quintana Roo
 * 
 * Renderiza la página HTML del Kit Digital en un iframe fullscreen
 * para preservar toda la lógica y estilos originales.
 */
const KitDigitalConectadasSeguras = () => {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <iframe
      src="/kit-digital-conectadas-seguras.html"
      title="Kit Digital — Conectadas y Seguras"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        border: 'none',
        margin: 0,
        padding: 0,
        zIndex: 9999,
        background: '#020410',
      }}
      allowFullScreen
    />
  );
};

export default KitDigitalConectadasSeguras;
