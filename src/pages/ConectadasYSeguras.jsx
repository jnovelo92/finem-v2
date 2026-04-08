import React, { useEffect } from 'react';

/**
 * Conectadas y Seguras — Presentación de taller
 * FINEM Politics × PAN Quintana Roo
 * 
 * Renderiza la presentación HTML completa en un iframe fullscreen
 * para preservar toda la lógica original (navegación por teclado,
 * touch swipe, transiciones CSS, progress bar).
 */
const ConectadasYSeguras = () => {
  useEffect(() => {
    // Ocultar scroll del body mientras la presentación está activa
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <iframe
      src="/conectadas-y-seguras.html"
      title="Conectadas y Seguras — Taller FINEM Politics"
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

export default ConectadasYSeguras;
