import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { LogoFinem, containerVariants, itemVariants, lineReveal } from './shared';

/* -------------------------------------------------------------------------- */
/* NAVBAR                                                                      */
/* -------------------------------------------------------------------------- */

export const DiscoveryNavbar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = ['diagnostico','benchmark','vision','pilares','roadmap','entregables','metodologia','onboarding','roi','inversion','cta'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) { setActiveSection(id); break; }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const navItems = [
    { id: 'diagnostico', label: 'Diagnóstico' },
    { id: 'benchmark', label: 'Benchmark' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'inversion', label: 'Inversión' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${isScrolled ? "py-3" : "py-5 md:py-7"}`}>
      <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${isScrolled ? "opacity-100" : "opacity-0"}`}
        style={{ background: 'linear-gradient(to bottom, rgba(2,4,16,0.97) 0%, rgba(2,4,16,0.7) 70%, transparent 100%)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }} />
      <div className="container mx-auto px-5 md:px-12 relative z-10 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:opacity-80 transition-opacity"><LogoFinem className="h-7 md:h-9 w-auto text-white" /></Link>
          <div className="hidden md:block h-7 w-px bg-white/10" />
          <span className="hidden md:block text-[9px] tracking-[0.3em] text-slate-500 uppercase">Propuesta Amerimed 2026</span>
        </div>
        <div className="flex items-center gap-2 md:gap-6">
          {isScrolled && navItems.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)}
              className={`hidden lg:block text-[9px] tracking-[0.2em] uppercase transition-colors cursor-pointer ${activeSection === n.id ? 'text-teal-400 font-bold' : 'text-slate-500 hover:text-white'}`}>
              {n.label}
            </button>
          ))}
          <Link to="/" className="hidden md:flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-slate-500 hover:text-white uppercase transition-colors">
            <ArrowLeft className="w-3 h-3" /> Regresar
          </Link>
          <motion.a href="https://wa.me/529984750514?text=Hola%2C%20me%20interesa%20agendar%20una%20reuni%C3%B3n%20para%20revisar%20la%20propuesta%20Amerimed" target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 px-5 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 transition-all backdrop-blur-md cursor-pointer">
            <span className="text-[9px] font-bold tracking-[0.25em] text-orange-300 uppercase">Agendar</span>
            <div className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500"></span>
            </div>
          </motion.a>
        </div>
      </div>
    </nav>
  );
});
DiscoveryNavbar.displayName = 'DiscoveryNavbar';

/* -------------------------------------------------------------------------- */
/* SECTION 1: HERO                                                             */
/* -------------------------------------------------------------------------- */

export const HeroSection = memo(() => (
  <header id="hero" className="relative z-10 min-h-screen w-full flex flex-col justify-center pt-24 pb-20">
    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #020410 0%, #020410 70%, transparent 100%)' }} />
    <div className="absolute inset-0 overflow-hidden pointer-events-none blur-3xl" style={{ transform: 'translate3d(0,0,0)' }}>
      <div className="absolute -left-[10%] top-[5%] w-[55vw] h-[55vw] md:w-[40vw] md:h-[40vw] rounded-full animate-blob gpu-layer" style={{ background: '#14b8a6', opacity: 0.25 }} />
      <div className="absolute right-[-10%] top-[15%] w-[35vw] h-[35vw] md:w-[35vw] md:h-[35vw] rounded-full animate-blob-reverse gpu-layer" style={{ background: '#3b82f6', opacity: 0.2 }} />
      <div className="absolute bottom-[10%] left-[30%] w-[20vw] h-[20vw] rounded-full animate-pulse-glow gpu-layer" style={{ background: '#7c3aed', opacity: 0.15 }} />
    </div>

    <motion.div className="container mx-auto max-w-6xl px-5 md:px-12 relative z-30" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
        <motion.span variants={lineReveal} className="w-12 md:w-16 h-[1px] bg-gradient-to-r from-teal-500 to-teal-500/0" />
        <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-teal-300/70 font-medium">Propuesta Integral · 12 Meses</span>
      </motion.div>

      <div className="mb-8 md:mb-12">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter leading-[1.05] text-white pb-2">
            La Red Hospitalaria Más Completa del Destino.
          </h1>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter leading-[1.05] pb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-teal-300 via-teal-500 to-blue-400 animate-gradient-flow">
              La Presencia Digital Que Aún No Lo Refleja.
            </span>
          </h1>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="max-w-2xl mb-8">
        <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
          Un plan integral de <span className="text-white font-medium">12 meses</span> para cerrar la brecha entre la infraestructura real de Amerimed y su presencia digital. Sin improvisaciones. Sin paquetes genéricos.
        </p>
      </motion.div>

      {/* Dato de impacto */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-3 md:gap-4 mb-12">
        {[
          { val: '7', label: 'Hospitales' },
          { val: '+25', label: 'Especialidades' },
          { val: '+15', label: 'Años' },
          { val: '1', label: 'Presencia digital fragmentada', accent: true },
        ].map(d => (
          <div key={d.label} className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border ${d.accent ? 'border-amber-500/30 bg-amber-500/10' : 'border-white/10 bg-white/[0.04]'}`}>
            <span className={`text-lg md:text-xl font-bold ${d.accent ? 'text-amber-400' : 'text-white'}`}>{d.val}</span>
            <span className={`text-[10px] md:text-xs uppercase tracking-wider ${d.accent ? 'text-amber-400/70' : 'text-slate-400'}`}>{d.label}</span>
          </div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants}>
        <motion.button onClick={() => document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' })}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="group relative px-10 py-5 bg-white text-black font-bold tracking-[0.15em] text-[11px] uppercase overflow-hidden transition-all duration-500 rounded-lg cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-teal-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-[2px] bg-white group-hover:bg-[#020410] transition-colors duration-500 rounded-md" />
          <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500">
            Descubrir el Plan <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </motion.button>
      </motion.div>

      <motion.div className="flex items-center gap-3 mt-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }}>
        <ChevronDown className="w-5 h-5 text-teal-500 animate-bounce" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-slate-600">8-12 min de lectura</span>
      </motion.div>
    </motion.div>
  </header>
));
HeroSection.displayName = 'HeroSection';
