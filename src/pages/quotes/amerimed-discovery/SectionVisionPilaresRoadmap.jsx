import React, { useState, memo } from 'react';
import { Globe, Users, Shield, Target, Stethoscope, BarChart3, Eye, Building2, Palette, Smartphone, Languages, Sparkles, Check, ArrowRight, Rocket, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, SectionLabel } from './shared';

/* -------------------------------------------------------------------------- */
/* SECTION 4: LA VISIÓN — El futuro a 12 meses                                */
/* -------------------------------------------------------------------------- */

export const VisionSection = memo(() => {
  const futureItems = [
    { icon: Globe, text: 'Un sitio web unificado, bilingüe, con directorio médico y sistema de citas en línea' },
    { icon: Palette, text: 'Identidad visual consistente en las 7 sedes' },
    { icon: Target, text: 'Presencia activa y estratégica en redes sociales con contenido de autoridad médica' },
    { icon: Users, text: 'Campañas de captación segmentadas (local, turismo médico USA/Canadá, B2B aseguradoras)' },
    { icon: Shield, text: 'Gestión de reputación online (reviews Google/Facebook < 2 horas respuesta)' },
    { icon: BarChart3, text: 'Dashboard de inteligencia por plaza y servicio' },
    { icon: Stethoscope, text: 'Especialistas posicionados como referentes en su área' },
  ];

  return (
    <section id="vision" className="relative py-20 md:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none blur-3xl" style={{ transform: 'translate3d(0,0,0)' }}>
        <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full gpu-layer" style={{ background: '#14b8a6', opacity: 0.1 }} />
      </div>

      <div className="container mx-auto px-5 max-w-6xl relative z-10">
        <motion.div className="mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <motion.div variants={itemVariants}><SectionLabel color="teal">La Visión</SectionLabel></motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
            Amerimed en<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">12 Meses</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-slate-400 text-lg max-w-2xl">
            Así se verá Amerimed después de un año de trabajo estratégico conjunto.
          </motion.p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          {futureItems.map((item, i) => (
            <motion.div key={i} variants={itemVariants}
              className="group p-5 rounded-xl bg-white/[0.03] border border-teal-500/10 hover:border-teal-500/30 transition-all duration-500">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4.5 h-4.5 text-teal-400" />
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});
VisionSection.displayName = 'VisionSection';

/* -------------------------------------------------------------------------- */
/* SECTION 5: PILARES DE INFRAESTRUCTURA                                       */
/* -------------------------------------------------------------------------- */

export const PilaresSection = memo(() => (
  <section id="pilares" className="relative py-20 md:py-32">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%)' }} />
    </div>

    <div className="container mx-auto px-5 max-w-6xl relative z-10">
      <motion.div className="mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
        <motion.div variants={itemVariants}><SectionLabel color="teal">Pilares de Infraestructura</SectionLabel></motion.div>
        <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
          Los Cimientos<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">Necesarios</span>
        </motion.h2>
        <motion.p variants={itemVariants} className="text-slate-400 text-lg max-w-3xl">
          Para que las 4 fases de trabajo generen el impacto proyectado, necesitamos construir dos pilares fundamentales.
        </motion.p>
      </motion.div>

      <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
        {/* Pilar 1: Web */}
        <motion.div variants={itemVariants} className="p-6 md:p-8 rounded-2xl border-2 border-teal-500/30 bg-gradient-to-br from-teal-500/[0.06] to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-teal-500 to-transparent" />
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[9px] tracking-[0.3em] text-teal-400 uppercase font-bold px-2 py-1 rounded bg-teal-500/15">Confirmado</span>
          </div>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-xl bg-teal-500/20 flex items-center justify-center"><Globe className="w-7 h-7 text-teal-400" /></div>
            <div>
              <span className="text-[10px] tracking-[0.3em] text-teal-400 uppercase font-bold">Pilar 1</span>
              <h3 className="text-xl md:text-2xl font-bold text-white">Plataforma Digital Unificada</h3>
            </div>
          </div>
          <ul className="space-y-2.5">
            {[
              'Un solo ecosistema bajo amerimedhospitals.com con secciones por sede',
              'Directorio médico con perfiles individuales (+100 especialistas)',
              'Sistema de citas en línea integrado',
              '~25-30 landing pages optimizadas por especialidad (SEO + conversión)',
              'Versión completa en inglés para turismo médico',
              'Arquitectura moderna, rápida, responsive, preparada para escalar',
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-sm">{t}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Pilar 2: Manual de Identidad Avanzado */}
        <motion.div variants={itemVariants} className="p-6 md:p-8 rounded-2xl border-2 border-teal-500/30 bg-gradient-to-br from-teal-500/[0.06] to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-teal-500 to-transparent" />
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[9px] tracking-[0.3em] text-teal-400 uppercase font-bold px-2 py-1 rounded bg-teal-500/15">Confirmado</span>
          </div>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-xl bg-teal-500/20 flex items-center justify-center"><Palette className="w-7 h-7 text-teal-400" /></div>
            <div>
              <span className="text-[10px] tracking-[0.3em] text-teal-400 uppercase font-bold">Pilar 2</span>
              <h3 className="text-xl md:text-2xl font-bold text-white">Manual de Identidad Avanzado</h3>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">
            Una red de 7 hospitales necesita un sistema de identidad visual que garantice consistencia en cada punto de contacto. Desde la señalética de cada sede hasta el último post en redes, Amerimed debe verse y sentirse como una sola marca.
          </p>
          <ul className="space-y-2.5">
            {[
              'Sistema de identidad visual unificado para las 7 sedes',
              'Manual de marca exhaustivo con lineamientos de aplicación',
              'Aplicaciones en todos los touchpoints digitales y físicos',
              'Templates y guías de uso para equipos internos',
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-sm">{t}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  </section>
));
PilaresSection.displayName = 'PilaresSection';

/* -------------------------------------------------------------------------- */
/* SECTION 6: ROADMAP — Plan de Acción a 12 Meses                             */
/* -------------------------------------------------------------------------- */

export const RoadmapSection = memo(() => {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      number: '01', title: 'Estandarización', timeline: 'Meses 1-3', subtitle: 'Orden, unidad y base sólida',
      icon: Shield, color: 'teal', borderColor: 'border-teal-500/30', bg: 'bg-teal-500/10',
      entregables: [
        'Manual de uso digital (tono, paleta, tipografía, templates)',
        'Homologación de perfiles de las 7 sedes en IG + FB',
        'LinkedIn corporativo configurado',
        'Protocolo de respuesta a comentarios y mensajes',
        'Protocolo de crisis y gestión de reputación',
        '12 piezas de contenido originales/mes',
        '8-10 stories/mes por cuenta',
        '1 día de producción audiovisual/mes en Cancún',
        'Inicio del desarrollo web (arquitectura, wireframes, UI/UX)',
      ],
      stats: { piezas: '12/mes', shooting: '1 día/mes', plataformas: 'IG+FB (7) + LI' },
    },
    {
      number: '02', title: 'Humanización', timeline: 'Meses 4-6', subtitle: 'Confianza a través de rostros y tecnología',
      icon: Users, color: 'blue', borderColor: 'border-blue-500/30', bg: 'bg-blue-500/10',
      entregables: [
        '20 piezas originales/mes (12 corporativas + 4 locales + extras)',
        '12-15 stories/mes por cuenta',
        '2 días de producción/mes (Cancún + rotativo CDMX/Mérida/Playa)',
        'Testimoniales de pacientes en video (1-2 por sesión)',
        'Desarrollo web: sedes completas, directorio médico, sistema de citas',
        'Inicio de versión en inglés',
        'SEO: optimización on-page, Google My Business para 7 sedes',
        'Paid Media: arranque campañas (check-ups + urgencias turísticas)',
        'Fee de administración de pauta: 15%',
      ],
      stats: { piezas: '20/mes', shooting: '2 días/mes', plataformas: 'Igual + Paid Media' },
    },
    {
      number: '03', title: 'Adquisición', timeline: 'Meses 7-9', subtitle: 'De defensa a ataque',
      icon: Target, color: 'purple', borderColor: 'border-violet-500/30', bg: 'bg-violet-500/10',
      entregables: [
        'Contenido local: Mérida y Playa del Carmen',
        '28 piezas originales/mes',
        '2-3 días de producción/mes (rotativo entre sedes)',
        'Versión en inglés del sitio web completa',
        'Funnels de conversión por servicio high-ticket',
        'Campañas de turismo médico en inglés (USA/Canadá)',
        'Retargeting web activo',
        'Gestión de reviews Google/Facebook (respuesta < 2 hrs)',
        '1 refuerzo de marketing (medio tiempo)',
      ],
      stats: { piezas: '28/mes', shooting: '2-3 días/mes', plataformas: '+ Campañas EN' },
    },
    {
      number: '04', title: 'Expansión', timeline: 'Meses 10-12', subtitle: 'Cobertura total y optimización',
      icon: TrendingUp, color: 'orange', borderColor: 'border-orange-500/30', bg: 'bg-orange-500/10',
      entregables: [
        'Contenido local en las 7 sedes',
        '40 piezas originales/mes',
        '3 días de producción/mes (incluye sedes menores)',
        'Evaluación de TikTok con banco de video generado',
        'Optimización continua, A/B testing en funnels',
        'Dashboard de leads por sede y servicio',
        'Integración CRM custom para filtrado de leads',
      ],
      stats: { piezas: '40/mes', shooting: '3 días/mes', plataformas: '+ TikTok (eval.)' },
    },
  ];

  const colorMap = {
    teal: { text: 'text-teal-400', bg: 'bg-teal-500/10', activeBg: 'bg-teal-500/20', border: 'border-teal-500/30' },
    blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', activeBg: 'bg-blue-500/20', border: 'border-blue-500/30' },
    purple: { text: 'text-violet-400', bg: 'bg-violet-500/10', activeBg: 'bg-violet-500/20', border: 'border-violet-500/30' },
    orange: { text: 'text-orange-400', bg: 'bg-orange-500/10', activeBg: 'bg-orange-500/20', border: 'border-orange-500/30' },
  };

  const active = phases[activePhase];
  const c = colorMap[active.color];

  return (
    <section id="roadmap" className="relative py-20 md:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-5 max-w-6xl relative z-10">
        <motion.div className="mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <motion.div variants={itemVariants}><SectionLabel color="teal">Roadmap 2026</SectionLabel></motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
            Plan de Acción<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">12 Meses</span>
          </motion.h2>
        </motion.div>

        {/* Phase selector */}
        <motion.div className="flex flex-wrap gap-3 mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {phases.map((p, i) => {
            const pc = colorMap[p.color];
            return (
              <button key={i} onClick={() => setActivePhase(i)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                  activePhase === i ? `${pc.activeBg} ${pc.border} text-white` : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                }`}>
                <p.icon className={`w-4 h-4 ${activePhase === i ? pc.text : ''}`} />
                <div className="text-left">
                  <span className="block text-sm font-bold">{p.title}</span>
                  <span className="block text-[10px] opacity-60">{p.timeline}</span>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Phase detail */}
        <motion.div key={activePhase} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className={`p-6 md:p-8 rounded-2xl border ${c.border} ${c.bg}`}>
          <div className="flex items-center gap-4 mb-5">
            <div className={`w-12 h-12 rounded-xl ${c.activeBg} flex items-center justify-center`}>
              <active.icon className={`w-6 h-6 ${c.text}`} />
            </div>
            <div>
              <span className={`text-[10px] tracking-[0.3em] ${c.text} uppercase font-bold`}>Fase {active.number} · {active.timeline}</span>
              <h3 className="text-xl md:text-2xl font-bold text-white">{active.title}</h3>
              <p className="text-slate-400 text-sm">{active.subtitle}</p>
            </div>
          </div>

          {/* Stats pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(active.stats).map(([k, v]) => (
              <span key={k} className={`px-3 py-1.5 rounded-full text-xs font-medium ${c.bg} ${c.text} border ${c.border}`}>
                {k === 'piezas' ? '📝' : k === 'shooting' ? '📸' : '📱'} {v}
              </span>
            ))}
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {active.entregables.map((e, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Check className={`w-4 h-4 ${c.text} mt-0.5 flex-shrink-0`} />
                <span className="text-slate-300 text-sm">{e}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Tabla resumen */}
        <motion.div className="mt-8 hidden md:block" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Resumen Escalamiento</h4>
          <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.02]">
            <div className="grid grid-cols-5 gap-0 border-b border-white/10 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
              <div className="p-3">Concepto</div>
              {phases.map((p, i) => <div key={i} className="p-3 border-l border-white/5">F{p.number}</div>)}
            </div>
            {[
              { label: 'Piezas/mes', vals: ['12', '20', '28', '40'] },
              { label: 'Producción/mes', vals: ['1 día', '2 días', '2-3 días', '3 días'] },
              { label: 'Web', vals: ['Diseño', 'Dev + Citas', 'Inglés + Funnels', 'Optimización'] },
              { label: 'Paid Media', vals: ['—', 'Arranque', 'EN + Retargeting', 'Full'] },
            ].map((row, ri) => (
              <div key={ri} className={`grid grid-cols-5 gap-0 ${ri < 3 ? 'border-b border-white/5' : ''}`}>
                <div className="p-3 text-xs text-slate-400 font-medium">{row.label}</div>
                {row.vals.map((v, vi) => <div key={vi} className="p-3 text-xs text-slate-300 border-l border-white/5">{v}</div>)}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});
RoadmapSection.displayName = 'RoadmapSection';
