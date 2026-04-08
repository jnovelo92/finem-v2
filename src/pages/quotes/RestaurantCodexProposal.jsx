import React, { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowLeft, Check, ChevronDown, TrendingUp, BarChart3,
  Layers, Eye, Camera, MessageCircle, Calendar, FileText, Palette,
  Zap, Target, Users, Mic, Video, PenTool, Send, LayoutGrid,
  Clock, Rocket, Award, DollarSign, ArrowUpRight, Play
} from 'lucide-react';
import { motion, useTransform, useScroll } from 'framer-motion';

/* ══════════════════════════════════════════════════════════════════════════
   STYLES — Instrument Serif + Satoshi / Fallback: Playfair Display + DM Sans
   ══════════════════════════════════════════════════════════════════════════ */
const ProposalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&family=Playfair+Display:wght@400;500;600;700&display=swap');

    .rc-heading {
      font-family: 'Instrument Serif', 'Playfair Display', Georgia, serif;
      font-weight: 400;
      letter-spacing: -0.02em;
    }
    .rc-body {
      font-family: 'DM Sans', 'Satoshi', system-ui, sans-serif;
      font-weight: 400;
    }
    .rc-mono {
      font-family: 'DM Mono', 'SF Mono', monospace;
      font-variant-numeric: tabular-nums;
    }
    .rc-bg { background-color: #0A0A0F; }
    .rc-surface { background-color: #141419; }
    .rc-separator {
      height: 1px;
      background: linear-gradient(to right, transparent, #27272A, transparent);
    }
    .rc-glass {
      background: rgba(255,255,255,0.04);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.08);
    }
    .rc-glass:hover {
      background: rgba(255,255,255,0.06);
      border-color: rgba(255,255,255,0.12);
    }
    @keyframes rc-float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-8px) rotate(1deg); }
      66% { transform: translateY(4px) rotate(-0.5deg); }
    }
    @keyframes rc-glow-pulse {
      0%, 100% { opacity: 0.4; filter: blur(40px); }
      50% { opacity: 0.7; filter: blur(50px); }
    }
    @keyframes rc-line-grow {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
    }
    @keyframes rc-grain {
      0%, 100% { transform: translate(0, 0); }
      10% { transform: translate(-2%, -2%); }
      30% { transform: translate(1%, -1%); }
      50% { transform: translate(-1%, 2%); }
      70% { transform: translate(3%, 1%); }
      90% { transform: translate(2%, -3%); }
    }
    .rc-card-hover {
      transition: all 0.6s cubic-bezier(0.25, 0.4, 0.25, 1);
    }
    .rc-card-hover:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 60px -15px rgba(249, 115, 22, 0.1), 0 0 0 1px rgba(255,255,255,0.08);
    }
    .rc-accent-glow {
      position: relative;
    }
    .rc-accent-glow::after {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: inherit;
      background: linear-gradient(135deg, rgba(249,115,22,0.15), rgba(16,185,129,0.1));
      z-index: -1;
      filter: blur(20px);
      opacity: 0;
      transition: opacity 0.5s;
    }
    .rc-accent-glow:hover::after { opacity: 1; }
    html { scroll-behavior: smooth; }
    * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  `}</style>
);

/* ══════════════════════════════════════════════════════════════════════════
   LOGO FINEM
   ══════════════════════════════════════════════════════════════════════════ */
const LogoFinem = memo(({ className }) => (
  <svg className={className} viewBox="0 0 1664.2 706.9" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M335.7,166.9h-133.6c0-18.8-15.3-34-34.2-34s-34.2,15.2-34.2,34h-.1v506c0,18.7-15.3,33.9-34.1,33.9H0V170.4C0,79.5,71.7,2.6,163.1,0c94.9-2.6,172.6,73,172.6,166.8Z" />
    <path d="M740,504v201.4h-99.3c-18.9,0-34.2-15.3-34.2-34.1v-167.3h-.1c0-18.7-15.3-34-34.2-34s-34.2,15.3-34.2,34h-.1v35.1c0,80.5-57.3,147.6-133.5,163.4-11.1,2.3-22.6,3.5-34.4,3.5s-23.2-1.2-34.2-3.5c-74.5-15.3-130.9-79.7-133.5-157.7v-172.7h133.5v167c0,18.8,15.3,34,34.2,34s34.2-15.2,34.2-34h.1v-31.6c0-91,71.8-167.9,163.2-170.3,94.8-2.5,172.5,73.1,172.5,166.8Z" />
    <path d="M268.9,304.4c18.9,0,34.2-15.2,34.2-34s-15.3-34-34.2-34-34.2,15.2-34.2,34,15.3,34,34.2,34Z" />
    <path d="M1664.2,507.9v197.9h-99.3c-18.9,0-34.2-15.2-34.2-34v-167.4h-.1c0-18.7-15.3-34-34.2-34s-34.2,15.3-34.2,34h-.1v201.4h-133.5v-201.4h-.1c0-18.7-15.3-34-34.2-34s-34.2,15.3-34.2,34h-.1v201.4h-99.4c-18.8,0-34.1-15.2-34.1-33.9v-163.9c0-92.4,74-169.9,166.9-170.4,38.3-.2,73.7,12.4,102,33.6,28.3-21.3,63.7-33.8,102-33.6,92.9.5,166.9,78,166.9,170.4Z" />
    <path d="M1087.1,624s0,.1-.1.2c-.2.4-.5.7-.7,1.1-14.4,23.6-34.6,43.4-58.6,57.4-.7.4-1.3.9-2,1.2-.6.4-1.3.8-2,1.1-24,13.3-51.6,20.8-81,20.8-92.8,0-168-74.8-168-167.1s64.2-155.5,147-165.8h0c6.9-.9,13.8-1.3,20.9-1.3s14.1.4,20.9,1.3h0c55,6.8,101.8,40.1,127,86.6l-113.9,79-43.2,29.9-10.8,7.5h0c-8.7,6.3-14.3,16.3-14.3,27.8,0,18.8,15.3,34,34.2,34s1.8,0,2.6-.1c.9,0,1.8-.2,2.6-.3.8-.1,1.6-.3,2.4-.5h.2c.8-.2,1.6-.4,2.4-.7.8-.3,1.6-.5,2.4-.9.8-.3,1.6-.6,2.3-1,1.5-.7,3-1.5,4.3-2.5l1.6-1.1,73.5-51,2.1-1.4c10.6-6.7,24.4-7.4,36-.6,16.2,9.5,21.5,30.3,12,46.5Z" />
  </svg>
));
LogoFinem.displayName = 'LogoFinem';

/* ══════════════════════════════════════════════════════════════════════════
   SHARED ANIMATION VARIANTS
   ══════════════════════════════════════════════════════════════════════════ */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] } }
};

/* ══════════════════════════════════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════════════════════════════════ */
const ProposalNavbar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${isScrolled ? "py-3" : "py-5 md:py-7"}`}>
      <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${isScrolled ? "opacity-100" : "opacity-0"}`}
        style={{ background: 'linear-gradient(to bottom, rgba(10,10,15,0.97) 0%, rgba(10,10,15,0.7) 60%, transparent 100%)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }} />
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:opacity-80 transition-opacity"><LogoFinem className="h-7 md:h-9 w-auto text-white" /></Link>
          <div className="hidden md:block h-7 w-px bg-white/10" />
          <span className="hidden md:block text-[10px] tracking-[0.3em] text-[#A1A1AA] uppercase rc-body">Propuesta Restaurant Codex</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="hidden md:flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-[#A1A1AA] hover:text-white uppercase transition-colors rc-body"><ArrowLeft className="w-3 h-3" />Regresar</Link>
          <motion.button onClick={() => document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' })} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-md cursor-pointer">
            <span className="text-[9px] font-bold tracking-[0.3em] text-white uppercase rc-body">Ver Propuesta</span>
            <div className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F97316] opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#F97316]" /></div>
          </motion.button>
        </div>
      </div>
    </nav>
  );
});
ProposalNavbar.displayName = 'ProposalNavbar';

/* ══════════════════════════════════════════════════════════════════════════
   S1 — HERO
   ══════════════════════════════════════════════════════════════════════════ */
const HeroSection = memo(() => (
  <header className="relative z-10 min-h-screen w-full flex flex-col justify-center pt-24 pb-20 rc-bg overflow-hidden">
    {/* Atmospheric orbs */}
    <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 60%)', animation: 'rc-glow-pulse 8s ease-in-out infinite' }} />
    <div className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vw] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 60%)', animation: 'rc-glow-pulse 10s ease-in-out infinite 3s' }} />

    <motion.div className="container mx-auto max-w-5xl px-6 md:px-12 relative z-30" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants} className="flex items-center gap-4 mb-10">
        <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }} className="w-16 h-px bg-gradient-to-r from-[#F97316] to-[#F97316]/0 origin-left" />
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#A1A1AA] rc-body">Propuesta de Contenido & Redes Sociales</span>
      </motion.div>

      <motion.h1 variants={itemVariants} className="rc-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F5F5F5] leading-[1.1] mb-4">
        Tu restaurante no tiene un problema de gente.{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#F97316] to-[#10B981]">Tiene un problema de sistemas.</span>
      </motion.h1>

      <motion.p variants={itemVariants} className="rc-heading italic text-2xl md:text-3xl text-[#A1A1AA]/70 mb-8">
        Tu contenido debería decir lo mismo.
      </motion.p>

      <motion.p variants={itemVariants} className="rc-body text-lg md:text-xl text-[#A1A1AA] max-w-2xl leading-relaxed mb-12">
        Una estrategia de contenido diseñada para posicionar a Restaurant Codex como el estándar de operaciones en la industria restaurantera.
      </motion.p>

      <motion.div variants={itemVariants}>
        <motion.button onClick={() => document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' })} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="group relative px-10 py-5 bg-white text-black font-bold tracking-[0.15em] text-[11px] uppercase overflow-hidden transition-all duration-500 rounded-lg cursor-pointer rc-body">
          <div className="absolute inset-0 bg-gradient-to-r from-[#F97316] via-[#F97316] to-[#10B981] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-[2px] bg-white group-hover:bg-[#0A0A0F] transition-colors duration-500 rounded-md" />
          <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500">Ver la propuesta<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" /></span>
        </motion.button>
      </motion.div>

      <motion.p variants={itemVariants} className="text-[11px] text-[#A1A1AA]/40 mt-16 rc-body tracking-wide">
        Propuesta preparada por FINEM para David Castro — Abril 2026
      </motion.p>
    </motion.div>

    {/* Scroll indicator */}
    <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }}>
      <span className="text-[9px] tracking-[0.4em] uppercase text-[#A1A1AA]/40 rc-body">Scroll</span>
      <ChevronDown className="w-4 h-4 text-[#F97316]/60 animate-bounce" />
    </motion.div>
  </header>
));
HeroSection.displayName = 'HeroSection';

/* ══════════════════════════════════════════════════════════════════════════
   S2 — DIAGNÓSTICO
   ══════════════════════════════════════════════════════════════════════════ */
const DiagnosticoSection = memo(() => {
  const cards = [
    { handle: '@foodhub.io', followers: '10,000', posts: '117 publicaciones', desc: 'Tu cuenta más fuerte. Ya tiene audiencia y la bio apunta a Codex. Pero sin estrategia de contenido consistente, el crecimiento se estancó.', color: '#F97316' },
    { handle: '@restaurant.codex', followers: '960', posts: null, desc: 'La cuenta del producto. Sin momentum propio. Necesita contenido técnico (demos, features, comparativas) pero no necesita producción independiente — se alimenta de lo que ya produces para Food Hub.', color: '#10B981' },
    { handle: 'David Castro (personal)', followers: '~4,000', posts: null, desc: 'Tu marca personal como chef y operador. No entra en scope de producción — pero es un amplificador natural de lo que publiques en Food Hub.', color: '#A1A1AA' },
  ];
  return (
    <section id="diagnostico" className="relative py-24 md:py-32 rc-bg">
      <div className="rc-separator w-full" />
      <div className="container mx-auto px-6 max-w-5xl relative z-10 pt-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
          <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-[#F97316]/80 uppercase mb-6 rc-body"><span className="w-8 h-px bg-[#F97316]/50" />Diagnóstico</motion.span>
          <motion.h2 variants={itemVariants} className="rc-heading text-4xl md:text-5xl lg:text-6xl text-[#F5F5F5] leading-[1.1] mb-16">Dónde estás hoy</motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {cards.map((c, i) => (
              <motion.div key={i} variants={itemVariants} className="rc-card-hover rc-accent-glow p-6 rounded-xl border border-[#27272A] hover:border-white/10" style={{ backgroundColor: '#141419' }}>
                <p className="rc-mono text-4xl font-bold mb-1" style={{ color: c.color }}>{c.followers}</p>
                <p className="rc-body text-sm text-white font-semibold mb-1">{c.handle}</p>
                {c.posts && <p className="rc-mono text-xs text-[#A1A1AA] mb-4">{c.posts}</p>}
                {!c.posts && <div className="mb-4" />}
                <p className="rc-body text-sm text-[#A1A1AA] leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="p-8 md:p-10 rounded-xl border border-[#F97316]/10 relative overflow-hidden" style={{ backgroundColor: '#141419' }}>
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#F97316] to-[#10B981]" />
            <p className="rc-body text-lg md:text-xl text-[#A1A1AA] leading-relaxed pl-4">
              El diagnóstico es claro: tienes el producto, tienes el conocimiento, tienes la historia. Lo que falta es <span className="text-[#F5F5F5] font-medium">el sistema que convierte todo eso en contenido consistente que trabaje para ti todos los días.</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});
DiagnosticoSection.displayName = 'DiagnosticoSection';

/* ══════════════════════════════════════════════════════════════════════════
   S3 — BENCHMARK
   ══════════════════════════════════════════════════════════════════════════ */
const BenchmarkSection = memo(() => {
  const competitors = [
    { name: 'Trainual', ig: '77K', enfoque: 'Educativo, founder-led, con personalidad', inversion: 'Alta' },
    { name: 'Restaurant365', ig: 'Corporativo', enfoque: 'Genérico, corporativo', inversion: 'Muy alta' },
    { name: 'Toast', ig: 'Corporativo', enfoque: 'Genérico, feature-based', inversion: 'Muy alta' },
    { name: 'Restaurant Codex', ig: '960', enfoque: 'Oportunidad', inversion: 'Por definir', highlight: true },
  ];
  return (
    <section className="relative py-24 md:py-32 rc-bg">
      <div className="rc-separator w-full" />
      <div className="container mx-auto px-6 max-w-5xl relative z-10 pt-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
          <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-[#F97316]/80 uppercase mb-6 rc-body"><span className="w-8 h-px bg-[#F97316]/50" />Benchmark</motion.span>
          <motion.h2 variants={itemVariants} className="rc-heading text-4xl md:text-5xl lg:text-6xl text-[#F5F5F5] leading-[1.1] mb-16">El panorama competitivo</motion.h2>

          {/* Desktop table */}
          <motion.div variants={itemVariants} className="hidden md:block overflow-hidden rounded-xl border border-[#27272A] mb-12">
            <table className="w-full rc-body text-sm">
              <thead><tr className="border-b border-[#27272A]" style={{ backgroundColor: '#141419' }}>
                <th className="text-left p-4 text-[#A1A1AA] font-medium"></th>
                {competitors.map(c => <th key={c.name} className={`text-left p-4 font-semibold ${c.highlight ? 'text-[#F97316]' : 'text-[#F5F5F5]'}`}>{c.name}</th>)}
              </tr></thead>
              <tbody>
                <tr className="border-b border-[#27272A]/50"><td className="p-4 text-[#A1A1AA]">Instagram</td>{competitors.map(c => <td key={c.name} className={`p-4 rc-mono ${c.highlight ? 'text-[#F97316] font-bold' : 'text-[#F5F5F5]'}`}>{c.ig}</td>)}</tr>
                <tr className="border-b border-[#27272A]/50"><td className="p-4 text-[#A1A1AA]">Enfoque de contenido</td>{competitors.map(c => <td key={c.name} className={`p-4 ${c.highlight ? 'text-[#10B981] font-semibold' : 'text-[#A1A1AA]'}`}>{c.enfoque}</td>)}</tr>
                <tr><td className="p-4 text-[#A1A1AA]">Inversión estimada</td>{competitors.map(c => <td key={c.name} className={`p-4 ${c.highlight ? 'text-[#F97316]' : 'text-[#A1A1AA]'}`}>{c.inversion}</td>)}</tr>
              </tbody>
            </table>
          </motion.div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4 mb-12">
            {competitors.map((c, i) => (
              <motion.div key={i} variants={itemVariants} className={`p-5 rounded-xl border ${c.highlight ? 'border-[#F97316]/30' : 'border-[#27272A]'}`} style={{ backgroundColor: '#141419' }}>
                <p className={`font-bold mb-3 ${c.highlight ? 'text-[#F97316]' : 'text-[#F5F5F5]'} rc-body`}>{c.name}</p>
                <div className="space-y-2 text-sm rc-body">
                  <p><span className="text-[#A1A1AA]">IG: </span><span className="rc-mono text-[#F5F5F5]">{c.ig}</span></p>
                  <p><span className="text-[#A1A1AA]">Enfoque: </span><span className={c.highlight ? 'text-[#10B981]' : 'text-[#F5F5F5]'}>{c.enfoque}</span></p>
                  <p><span className="text-[#A1A1AA]">Inversión: </span><span className="text-[#F5F5F5]">{c.inversion}</span></p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="p-8 md:p-10 rounded-xl border border-[#10B981]/10 relative overflow-hidden" style={{ backgroundColor: '#141419' }}>
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#10B981] to-[#F97316]/50" />
            <p className="rc-body text-lg text-[#A1A1AA] leading-relaxed">
              Tus competidores más grandes gastan fortunas en contenido corporativo que nadie recuerda. Tu ventaja competitiva en contenido no es el presupuesto — es <span className="text-[#10B981] font-semibold">la autenticidad</span>. Un chef real que operó restaurantes en tres países hablando desde la trinchera es más poderoso que cualquier video institucional de Toast.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});
BenchmarkSection.displayName = 'BenchmarkSection';

/* ══════════════════════════════════════════════════════════════════════════
   S4 — LA VISIÓN (12 meses)
   ══════════════════════════════════════════════════════════════════════════ */
const VisionSection = memo(() => {
  const metrics = [
    { label: '@foodhub.io', value: '25K–30K', sub: 'seguidores', color: '#F97316' },
    { label: '@restaurant.codex', value: '5,000', sub: 'seguidores', color: '#10B981' },
    { label: 'Pipeline orgánico', value: 'Medible', sub: 'y atribuible', color: '#F97316' },
  ];
  return (
    <section className="relative py-24 md:py-32 rc-bg">
      <div className="rc-separator w-full" />
      <div className="container mx-auto px-6 max-w-5xl relative z-10 pt-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
          <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-[#10B981]/80 uppercase mb-6 rc-body"><span className="w-8 h-px bg-[#10B981]/50" />La Visión</motion.span>
          <motion.h2 variants={itemVariants} className="rc-heading text-4xl md:text-5xl lg:text-6xl text-[#F5F5F5] leading-[1.1] mb-12">Hacia dónde en 12 meses</motion.h2>

          <motion.div variants={itemVariants} className="p-8 md:p-12 rounded-xl border border-[#27272A] mb-12 relative overflow-hidden" style={{ backgroundColor: '#141419' }}>
            <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none" style={{ background: 'radial-gradient(circle at 100% 0%, rgba(249,115,22,0.06) 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none" style={{ background: 'radial-gradient(circle at 0% 100%, rgba(16,185,129,0.05) 0%, transparent 70%)' }} />
            <p className="rc-heading text-2xl md:text-3xl lg:text-4xl text-[#F5F5F5] leading-relaxed relative z-10">
              En 12 meses, <span className="text-[#F97316]">David Castro</span> es el nombre que aparece cuando un restaurantero busca cómo sistematizar su operación. Food Hub es el canal. <span className="text-[#10B981]">Codex es la solución.</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((m, i) => (
              <motion.div key={i} variants={itemVariants} className="rc-card-hover p-8 rounded-xl border border-[#27272A] text-center" style={{ backgroundColor: '#141419' }}>
                <p className="rc-mono text-5xl md:text-6xl font-bold mb-3" style={{ color: m.color }}>{m.value}</p>
                <p className="rc-body text-sm text-[#A1A1AA] mb-1">{m.sub}</p>
                <p className="rc-body text-xs text-[#F5F5F5] font-semibold uppercase tracking-wider">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});
VisionSection.displayName = 'VisionSection';

/* ══════════════════════════════════════════════════════════════════════════
   S5 — INFRAESTRUCTURA (Logo)
   ══════════════════════════════════════════════════════════════════════════ */
const InfraestructuraSection = memo(() => (
  <section className="relative py-24 md:py-32 rc-bg">
    <div className="rc-separator w-full" />
    <div className="container mx-auto px-6 max-w-5xl relative z-10 pt-24">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
        <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-[#F97316]/80 uppercase mb-6 rc-body"><span className="w-8 h-px bg-[#F97316]/50" />Infraestructura</motion.span>
        <motion.h2 variants={itemVariants} className="rc-heading text-4xl md:text-5xl lg:text-6xl text-[#F5F5F5] leading-[1.1] mb-12">Antes de escalar, hay que construir la base</motion.h2>

        <motion.div variants={itemVariants} className="p-8 md:p-10 rounded-xl border border-[#27272A]" style={{ backgroundColor: '#141419' }}>
          <p className="rc-body text-lg text-[#A1A1AA] leading-relaxed mb-8">
            Restaurant Codex necesita una identidad visual propia. Hoy el logo y los assets son genéricos. Antes de producir contenido a escala, necesitamos un logotipo profesional y un sistema visual mínimo que funcione en redes, en la web, y en todo lo que produzcamos.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Palette className="w-5 h-5 text-[#F97316] mt-0.5 flex-shrink-0" />
              <div>
                <p className="rc-body text-[#F5F5F5] font-medium">Entregable</p>
                <p className="rc-body text-sm text-[#A1A1AA]">Logo + sistema de identidad básico para Restaurant Codex</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-[#F97316] mt-0.5 flex-shrink-0" />
              <div>
                <p className="rc-body text-[#F5F5F5] font-medium">Incluye</p>
                <p className="rc-body text-sm text-[#A1A1AA]">Logotipo, variantes (horizontal, vertical, isotipo), paleta de color, tipografía, lineamientos de uso básicos.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-[#10B981] mt-0.5 flex-shrink-0" />
              <div>
                <p className="rc-body text-[#F5F5F5] font-medium">Inversión</p>
                <p className="rc-mono text-lg text-[#10B981] font-bold">$15,000 MXN <span className="text-[#A1A1AA] text-sm font-normal rc-body">(proyecto one-time, previo al arranque de contenido)</span></p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
));
InfraestructuraSection.displayName = 'InfraestructuraSection';

/* ══════════════════════════════════════════════════════════════════════════
   S6 — ROADMAP (4 fases)
   ══════════════════════════════════════════════════════════════════════════ */
const RoadmapSection = memo(() => {
  const phases = [
    { num: '01', title: 'Setup Operativo', period: 'Meses 1–3', icon: Target, color: '#F97316', objetivo: 'Orden, identidad visual y primeros contenidos', items: ['12 piezas/mes en @foodhub.io', '1 sesión de producción/mes (video + foto)', 'Definición de pilares de contenido', 'Homologación de bios, highlights, links', 'Logo y sistema visual de Codex'] },
    { num: '02', title: 'Autoridad & Consistencia', period: 'Meses 4–6', icon: Award, color: '#10B981', objetivo: 'Posicionar a David como referente', items: ['16 piezas/mes en @foodhub.io', 'Repurpose a @restaurant.codex y LinkedIn', '2 sesiones de producción/mes', 'Series de contenido recurrentes', 'Contenido técnico de Codex (demos, antes/después)'] },
    { num: '03', title: 'Aceleración Orgánica', period: 'Meses 7–9', icon: Rocket, color: '#F97316', objetivo: 'Crecer audiencia y generar leads orgánicos', items: ['16 piezas/mes + repurpose multiplataforma', '2 sesiones de producción/mes', 'Colaboraciones con cuentas del nicho restaurantero', 'Contenido en inglés + español', 'DM scripts para conversión'] },
    { num: '04', title: 'Consolidación & Escala', period: 'Meses 10–12', icon: TrendingUp, color: '#10B981', objetivo: 'Optimizar y documentar', items: ['16 piezas/mes + repurpose multiplataforma', '2 sesiones de producción/mes', 'Dashboard de métricas', 'Playbook documentado para internalización eventual'] },
  ];
  return (
    <section className="relative py-24 md:py-32 rc-bg">
      <div className="rc-separator w-full" />
      <div className="container mx-auto px-6 max-w-5xl relative z-10 pt-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
          <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-[#F97316]/80 uppercase mb-6 rc-body"><span className="w-8 h-px bg-[#F97316]/50" />Roadmap</motion.span>
          <motion.h2 variants={itemVariants} className="rc-heading text-4xl md:text-5xl lg:text-6xl text-[#F5F5F5] leading-[1.1] mb-16">El plan: 4 fases en 12 meses</motion.h2>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#F97316]/50 via-[#10B981]/50 to-[#F97316]/50 hidden md:block" />

            <div className="space-y-8">
              {phases.map((p, i) => (
                <motion.div key={i} variants={itemVariants} className="relative md:pl-16">
                  {/* Dot */}
                  <div className="hidden md:flex absolute left-[10px] top-8 w-6 h-6 rounded-full items-center justify-center" style={{ backgroundColor: '#0A0A0F', border: `2px solid ${p.color}` }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                  </div>

                  <div className="rc-card-hover p-6 md:p-8 rounded-xl border border-[#27272A] hover:border-white/10" style={{ backgroundColor: '#141419' }}>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="rc-mono text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: p.color }}>Fase {p.num} · {p.period}</span>
                    </div>
                    <h3 className="rc-heading text-2xl md:text-3xl text-[#F5F5F5] mb-2">{p.title}</h3>
                    <p className="rc-body text-sm text-[#A1A1AA] mb-4">Objetivo: {p.objetivo}</p>
                    <div className="space-y-2">
                      {p.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <Check className="w-4 h-4 flex-shrink-0" style={{ color: p.color }} />
                          <span className="rc-body text-sm text-[#A1A1AA]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
RoadmapSection.displayName = 'RoadmapSection';

/* ══════════════════════════════════════════════════════════════════════════
   S7 — ENTREGABLES
   ══════════════════════════════════════════════════════════════════════════ */
const EntregablesSection = memo(() => {
  const groups = [
    { title: 'Estrategia & Planeación', icon: Target, items: ['Estrategia de redes sociales con pilares de contenido', 'Calendario editorial mensual', 'Guiones y briefs por pieza para David'] },
    { title: 'Producción', icon: Camera, items: ['Sesiones de producción en Cancún (video + foto profesional)', 'Dirección creativa en cada sesión', 'Edición y post-producción de todo el material'] },
    { title: 'Publicación & Gestión', icon: Send, items: ['Publicación y scheduling en todas las cuentas activas', 'Community management (DMs, comentarios, engagement proactivo)', 'Repurpose de contenido a @restaurant.codex y LinkedIn'] },
    { title: 'Identidad Visual', icon: Palette, items: ['Logo profesional para Restaurant Codex', 'Sistema de identidad básico (one-time)'] },
    { title: 'Reporting', icon: BarChart3, items: ['Reporte mensual de métricas clave'] },
  ];
  return (
    <section className="relative py-24 md:py-32 rc-bg">
      <div className="rc-separator w-full" />
      <div className="container mx-auto px-6 max-w-5xl relative z-10 pt-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
          <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-[#F97316]/80 uppercase mb-6 rc-body"><span className="w-8 h-px bg-[#F97316]/50" />Entregables</motion.span>
          <motion.h2 variants={itemVariants} className="rc-heading text-4xl md:text-5xl lg:text-6xl text-[#F5F5F5] leading-[1.1] mb-16">Qué recibes exactamente</motion.h2>

          <div className="space-y-6">
            {groups.map((g, i) => (
              <motion.div key={i} variants={itemVariants} className="rc-card-hover p-6 rounded-xl border border-[#27272A] hover:border-white/10" style={{ backgroundColor: '#141419' }}>
                <div className="flex items-center gap-3 mb-4">
                  <g.icon className="w-5 h-5 text-[#F97316]" />
                  <h3 className="rc-body text-[#F5F5F5] font-semibold">{g.title}</h3>
                </div>
                <div className="rc-separator w-full mb-4" />
                <div className="space-y-3">
                  {g.items.map((item, j) => (
                    <p key={j} className="rc-body text-sm text-[#A1A1AA] pl-8 py-1 hover:text-[#F5F5F5] transition-colors duration-300">{item}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});
EntregablesSection.displayName = 'EntregablesSection';

/* ══════════════════════════════════════════════════════════════════════════
   S8 — METODOLOGÍA
   ══════════════════════════════════════════════════════════════════════════ */
const MetodologiaSection = memo(() => {
  const blocks = [
    { title: 'Hub & Spoke', desc: 'David es el hub — genera el conocimiento y la autoridad. FINEM es el sistema que convierte ese conocimiento en contenido que trabaja 24/7.' },
    { title: 'Sistematizar tu contenido como tú sistematizas operaciones', desc: 'Lo que Codex hace por un restaurante, nosotros lo hacemos por tu marca. Procesos claros, ejecución consistente, resultados medibles.' },
    { title: 'Resultados sobre estética', desc: 'Cada pieza tiene un objetivo. No publicamos por publicar.' },
  ];
  return (
    <section className="relative py-24 md:py-32 rc-bg">
      <div className="rc-separator w-full" />
      <div className="container mx-auto px-6 max-w-5xl relative z-10 pt-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
          <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-[#10B981]/80 uppercase mb-6 rc-body"><span className="w-8 h-px bg-[#10B981]/50" />Metodología</motion.span>
          <motion.h2 variants={itemVariants} className="rc-heading text-4xl md:text-5xl lg:text-6xl text-[#F5F5F5] leading-[1.1] mb-16">Cómo trabajamos</motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blocks.map((b, i) => (
              <motion.div key={i} variants={itemVariants} className="rc-card-hover p-6 rounded-xl border border-[#27272A] hover:border-white/10 relative overflow-hidden" style={{ backgroundColor: '#141419' }}>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/40 to-transparent" />
                <h3 className="rc-heading text-xl text-[#F5F5F5] mb-4">{b.title}</h3>
                <p className="rc-body text-sm text-[#A1A1AA] leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});
MetodologiaSection.displayName = 'MetodologiaSection';

/* ══════════════════════════════════════════════════════════════════════════
   S9 — ONBOARDING (Primeros 30 días)
   ══════════════════════════════════════════════════════════════════════════ */
const OnboardingSection = memo(() => {
  const weeks = [
    { week: 'Semana 1', desc: 'Inmersión en Restaurant Codex — entendimiento profundo del producto, ICP, y propuesta de valor', color: '#F97316' },
    { week: 'Semana 2', desc: 'Definición de pilares de contenido, calendario mes 1, homologación de cuentas', color: '#10B981' },
    { week: 'Semana 3', desc: 'Primera sesión de producción multimedia', color: '#F97316' },
    { week: 'Semana 4', desc: 'Primeras publicaciones en vivo + entrega de logo', color: '#10B981' },
  ];
  return (
    <section className="relative py-24 md:py-32 rc-bg">
      <div className="rc-separator w-full" />
      <div className="container mx-auto px-6 max-w-5xl relative z-10 pt-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
          <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-[#10B981]/80 uppercase mb-6 rc-body"><span className="w-8 h-px bg-[#10B981]/50" />Onboarding</motion.span>
          <motion.h2 variants={itemVariants} className="rc-heading text-4xl md:text-5xl lg:text-6xl text-[#F5F5F5] leading-[1.1] mb-16">Los primeros 30 días</motion.h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#F97316]/50 to-[#10B981]/50" />

            <div className="space-y-6">
              {weeks.map((w, i) => (
                <motion.div key={i} variants={itemVariants} className="relative pl-14 md:pl-16">
                  <div className="absolute left-[10px] top-5 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0A0A0F', border: `2px solid ${w.color}` }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: w.color }} />
                  </div>
                  <div className="rc-card-hover p-6 rounded-xl border border-[#27272A] hover:border-white/10" style={{ backgroundColor: '#141419' }}>
                    <p className="rc-mono text-[10px] tracking-[0.3em] uppercase font-bold mb-2" style={{ color: w.color }}>{w.week}</p>
                    <p className="rc-body text-sm text-[#A1A1AA] leading-relaxed">{w.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
OnboardingSection.displayName = 'OnboardingSection';

/* ══════════════════════════════════════════════════════════════════════════
   S10 — ROI
   ══════════════════════════════════════════════════════════════════════════ */
const ROISection = memo(() => (
  <section className="relative py-24 md:py-32 rc-bg">
    <div className="rc-separator w-full" />
    <div className="container mx-auto px-6 max-w-5xl relative z-10 pt-24">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
        <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-[#F97316]/80 uppercase mb-6 rc-body"><span className="w-8 h-px bg-[#F97316]/50" />ROI</motion.span>
        <motion.h2 variants={itemVariants} className="rc-heading text-4xl md:text-5xl lg:text-6xl text-[#F5F5F5] leading-[1.1] mb-16">Los números hablan</motion.h2>

        <div className="space-y-6">
          {/* Investment summary */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-[#27272A] rc-card-hover" style={{ backgroundColor: '#141419' }}>
              <p className="rc-body text-sm text-[#A1A1AA] mb-2">Tu inversión mensual promedio</p>
              <p className="rc-mono text-3xl text-[#F5F5F5] font-bold">~$30,000 <span className="text-lg text-[#A1A1AA] font-normal">MXN</span></p>
              <p className="rc-mono text-sm text-[#A1A1AA] mt-1">~$1,700 USD</p>
            </div>
            <div className="p-6 rounded-xl border border-[#27272A] rc-card-hover" style={{ backgroundColor: '#141419' }}>
              <p className="rc-body text-sm text-[#A1A1AA] mb-2">Tu inversión anual</p>
              <p className="rc-mono text-3xl text-[#F5F5F5] font-bold">~$360,000 <span className="text-lg text-[#A1A1AA] font-normal">MXN</span></p>
              <p className="rc-mono text-sm text-[#A1A1AA] mt-1">~$20,500 USD</p>
            </div>
          </motion.div>

          {/* Client value */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-[#10B981]/20 rc-card-hover" style={{ backgroundColor: '#141419' }}>
              <p className="rc-body text-sm text-[#A1A1AA] mb-2">Un cliente DWY de Codex</p>
              <p className="rc-mono text-3xl font-bold text-[#10B981]">$10,000 <span className="text-lg text-[#A1A1AA] font-normal">USD</span></p>
            </div>
            <div className="p-6 rounded-xl border border-[#10B981]/20 rc-card-hover" style={{ backgroundColor: '#141419' }}>
              <p className="rc-body text-sm text-[#A1A1AA] mb-2">Un cliente DFY de Codex</p>
              <p className="rc-mono text-3xl font-bold text-[#10B981]">$21,000 <span className="text-lg text-[#A1A1AA] font-normal">USD</span></p>
            </div>
          </motion.div>

          {/* The math */}
          <motion.div variants={itemVariants} className="p-8 md:p-10 rounded-xl border border-[#27272A]" style={{ backgroundColor: '#141419' }}>
            <div className="space-y-4">
              <p className="rc-body text-lg text-[#A1A1AA] leading-relaxed">
                Si el contenido genera <span className="text-[#10B981] font-semibold">2 clientes DWY</span> en el año → la inversión se paga completamente.
              </p>
              <p className="rc-body text-lg text-[#A1A1AA] leading-relaxed">
                Si genera <span className="text-[#10B981] font-semibold">1 cliente DFY</span> → la inversión se paga sola con margen.
              </p>
              <div className="rc-separator w-full my-6" />
              <p className="rc-body text-[#F5F5F5] leading-relaxed">
                Esto sin contar el valor compuesto: posicionamiento, autoridad, comunidad y pipeline orgánico que crece mes con mes.
              </p>
            </div>
          </motion.div>

          <motion.p variants={itemVariants} className="text-[11px] text-[#A1A1AA]/50 rc-body">
            Estas son estimaciones basadas en tu pricing actual. No son garantías de resultados.
          </motion.p>
        </div>
      </motion.div>
    </div>
  </section>
));
ROISection.displayName = 'ROISection';

/* ══════════════════════════════════════════════════════════════════════════
   S11 — INVERSIÓN
   ══════════════════════════════════════════════════════════════════════════ */
const InversionSection = memo(() => (
  <section id="inversion" className="relative py-24 md:py-32 rc-bg">
    <div className="rc-separator w-full" />
    <div className="container mx-auto px-6 max-w-5xl relative z-10 pt-24">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
        <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-[#F97316]/80 uppercase mb-6 rc-body"><span className="w-8 h-px bg-[#F97316]/50" />Inversión</motion.span>
        <motion.h2 variants={itemVariants} className="rc-heading text-4xl md:text-5xl lg:text-6xl text-[#F5F5F5] leading-[1.1] mb-16">La inversión</motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Card Fase 1 */}
          <motion.div variants={itemVariants} className="rc-glass rc-accent-glow p-8 rounded-xl">
            <p className="rc-mono text-[10px] tracking-[0.3em] uppercase font-bold text-[#F97316] mb-4">Fase 1 · Meses 1–3</p>
            <p className="rc-mono text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-2">$27,000</p>
            <p className="rc-body text-sm text-[#A1A1AA] mb-6">MXN/mes · ~$1,540 USD/mes</p>
            <div className="rc-separator w-full mb-6" />
            <div className="space-y-3">
              {['12 piezas de contenido/mes', '1 sesión de producción/mes', 'Estrategia, publicación, community management'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                  <span className="rc-body text-sm text-[#A1A1AA]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card Fases 2–4 */}
          <motion.div variants={itemVariants} className="rc-glass rc-accent-glow p-8 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ background: 'radial-gradient(circle at 100% 0%, rgba(249,115,22,0.08) 0%, transparent 70%)' }} />
            <p className="rc-mono text-[10px] tracking-[0.3em] uppercase font-bold text-[#10B981] mb-4">Fases 2–4 · Meses 4–12</p>
            <p className="rc-mono text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-2">$32,000</p>
            <p className="rc-body text-sm text-[#A1A1AA] mb-6">MXN/mes · ~$1,830 USD/mes</p>
            <div className="rc-separator w-full mb-6" />
            <div className="space-y-3">
              {['16 piezas de contenido/mes + repurpose multiplataforma', '2 sesiones de producción/mes', 'Estrategia, publicación, community management'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <span className="rc-body text-sm text-[#A1A1AA]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* One-time project */}
        <motion.div variants={itemVariants} className="rc-glass p-6 rounded-xl mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-[#F97316]/20 transition-colors duration-500">
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-[#F97316]" />
            <div>
              <p className="rc-body text-[#F5F5F5] font-semibold">Proyecto one-time</p>
              <p className="rc-body text-sm text-[#A1A1AA]">Logo + identidad Restaurant Codex</p>
            </div>
          </div>
          <p className="rc-mono text-2xl font-bold text-[#F97316]">$15,000 <span className="text-sm text-[#A1A1AA] font-normal rc-body">MXN</span></p>
        </motion.div>

        {/* Comparison text */}
        <motion.div variants={itemVariants} className="p-8 rounded-xl border border-[#27272A]" style={{ backgroundColor: '#141419' }}>
          <p className="rc-body text-lg text-[#A1A1AA] leading-relaxed mb-4">
            Contratarlo fragmentado (agencia de contenido + producción independiente + diseñador + consultor estratégico) costaría entre <span className="text-[#F5F5F5] font-medium">$80,000 y $110,000 MXN mensuales</span>. Con FINEM todo está integrado en un solo equipo con un solo interlocutor.
          </p>
          <p className="rc-body text-sm text-[#A1A1AA]/70">
            Nota: esta propuesta no incluye pauta publicitaria ni funnels de conversión.
          </p>
        </motion.div>
      </motion.div>
    </div>
  </section>
));
InversionSection.displayName = 'InversionSection';

/* ══════════════════════════════════════════════════════════════════════════
   S12 — CTA
   ══════════════════════════════════════════════════════════════════════════ */
const CTASection = memo(() => (
  <section className="relative py-24 md:py-32 rc-bg">
    <div className="rc-separator w-full" />
    <div className="container mx-auto px-6 max-w-5xl relative z-10 pt-24 text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
        <motion.h2 variants={itemVariants} className="rc-heading text-4xl md:text-5xl lg:text-6xl text-[#F5F5F5] leading-[1.1] mb-8">¿Arrancamos?</motion.h2>

        <motion.p variants={itemVariants} className="rc-body text-lg md:text-xl text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-12">
          El siguiente paso es una llamada de kick-off para alinear calendario y arrancar con la inmersión en Codex.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <motion.a href="https://calendly.com/jnovelo92/kick-off" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold tracking-[0.15em] text-[11px] uppercase rounded-lg transition-all duration-500 rc-body overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#F97316] via-[#F97316] to-[#10B981] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-[2px] bg-white group-hover:bg-[#0A0A0F] transition-colors duration-500 rounded-md" />
            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500"><Calendar className="w-4 h-4" />Agendar kick-off</span>
          </motion.a>
          <motion.a href="https://wa.me/529984750514" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-10 py-5 border border-white/10 bg-white/5 hover:bg-white/10 text-[#F5F5F5] font-bold tracking-[0.15em] text-[11px] uppercase rounded-lg transition-all duration-500 backdrop-blur-md rc-body">
            <MessageCircle className="w-4 h-4" />Confirmar por WhatsApp
          </motion.a>
        </motion.div>

        <motion.p variants={itemVariants} className="text-[11px] text-[#A1A1AA]/50 rc-body">
          Propuesta válida por 15 días a partir de la fecha de envío.
        </motion.p>
      </motion.div>
    </div>
  </section>
));
CTASection.displayName = 'CTASection';

/* ══════════════════════════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════════════════════════ */
const ProposalFooter = memo(() => (
  <footer className="relative py-16 rc-bg">
    <div className="rc-separator w-full" />
    <div className="container mx-auto px-6 max-w-5xl pt-16 text-center">
      <LogoFinem className="h-8 w-auto text-[#A1A1AA]/40 mx-auto mb-4" />
      <p className="rc-body text-[11px] tracking-[0.3em] text-[#A1A1AA]/40 uppercase">
        Cancún · CDMX · Mérida
      </p>
      <a href="https://finem.mx" target="_blank" rel="noopener noreferrer" className="rc-body text-[11px] text-[#A1A1AA]/30 hover:text-[#A1A1AA]/60 transition-colors mt-2 inline-block">
        finem.mx
      </a>
    </div>
  </footer>
));
ProposalFooter.displayName = 'ProposalFooter';

/* ══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════════════════ */
const RestaurantCodexProposal = () => (
  <div className="rc-bg rc-body min-h-screen text-[#F5F5F5]">
    <ProposalStyles />
    <ProposalNavbar />
    <HeroSection />
    <DiagnosticoSection />
    <BenchmarkSection />
    <VisionSection />
    <InfraestructuraSection />
    <RoadmapSection />
    <EntregablesSection />
    <MetodologiaSection />
    <OnboardingSection />
    <ROISection />
    <InversionSection />
    <CTASection />
    <ProposalFooter />
  </div>
);

export default RestaurantCodexProposal;
