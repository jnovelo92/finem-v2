import React, { useState, memo } from 'react';
import { Users, Shield, Target, BarChart3, Camera, Palette, Briefcase, Search, MessageSquare, Megaphone, ChevronDown, Crosshair, Layers, Zap, ClipboardList, Handshake, Rocket, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { containerVariants, itemVariants, SectionLabel } from './shared';

/* -------------------------------------------------------------------------- */
/* SECTION 7: ENTREGABLES DETALLADOS                                           */
/* -------------------------------------------------------------------------- */

export const EntregablesSection = memo(() => {
  const [openIdx, setOpenIdx] = useState(0);

  const categories = [
    {
      icon: MessageSquare, title: 'Redes Sociales', color: 'teal',
      items: [
        'Plataformas: Instagram + Facebook para las 7 sedes, LinkedIn corporativo',
        'Contenido: De 12 a 40 piezas originales/mes (crecimiento progresivo)',
        'Formatos: Posts estáticos, carruseles educativos, reels/videos cortos, stories',
        'Community Management: Gestión de comentarios y mensajes en todas las cuentas',
        'Reportes mensuales de métricas por sede',
      ]
    },
    {
      icon: Camera, title: 'Producción Audiovisual', color: 'blue',
      items: [
        'De 1 a 3 días de shooting profesional/mes (crecimiento por fase)',
        'Por día: 15-20 fotos editadas + 3-4 videos cortos',
        'Contenido: Retratos de doctores, instalaciones, tecnología, testimoniales',
        'Rotación entre sedes según calendario estratégico',
        'Viáticos fuera de Cancún: los cubre Amerimed',
      ]
    },
    {
      icon: Target, title: 'Estrategia y Dirección', color: 'purple',
      items: [
        'Director de cuenta FINEM dedicado',
        'Planificación mensual alineada al plan comercial Amerimed',
        'Calendario editorial basado en temporadas, especialidades y objetivos',
        'Juntas de seguimiento y revisión de resultados',
      ]
    },
    {
      icon: Search, title: 'SEO y Posicionamiento', color: 'teal',
      items: [
        'Optimización on-page por especialidad médica',
        'Google My Business optimizado para las 7 sedes',
        'Landing pages por especialidad optimizadas para búsqueda',
      ]
    },
    {
      icon: Megaphone, title: 'Publicidad Digital (Paid Media)', color: 'blue',
      items: [
        'Estrategia y administración: Google Ads + Meta Ads',
        'Segmentación: paciente local, turismo médico, B2B',
        'Campañas en español e inglés',
        'Fee de administración: 15% sobre inversión publicitaria',
        'Presupuesto de pauta: lo invierte Amerimed directamente (no incluido en iguala)',
        'Reportes de rendimiento con métricas de conversión',
      ]
    },
    {
      icon: Shield, title: 'Reputación Online', color: 'purple',
      items: [
        'Monitoreo de reviews en Google y Facebook',
        'Protocolo de respuesta en menos de 2 horas',
        'Gestión proactiva de reputación digital',
      ]
    },
  ];

  const colorMap = {
    teal: { text: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
    blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    purple: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  };

  return (
    <section id="entregables" className="relative py-20 md:py-32">
      <div className="container mx-auto px-5 max-w-4xl relative z-10">
        <motion.div className="mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <motion.div variants={itemVariants}><SectionLabel color="teal">Entregables</SectionLabel></motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
            ¿Qué Recibe Amerimed<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">Cada Mes?</span>
          </motion.h2>
        </motion.div>

        <motion.div className="space-y-3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          {categories.map((cat, i) => {
            const c = colorMap[cat.color];
            const isOpen = openIdx === i;
            return (
              <motion.div key={i} variants={itemVariants}>
                <button onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className={`w-full flex items-center justify-between p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isOpen ? `${c.bg} ${c.border}` : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center`}>
                      <cat.icon className={`w-5 h-5 ${c.text}`} />
                    </div>
                    <span className="text-white font-semibold text-left">{cat.title}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="px-5 pb-5 pt-3 space-y-2">
                        {cat.items.map((item, j) => (
                          <div key={j} className="flex items-start gap-2.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${c.text.replace('text-', 'bg-')} mt-1.5 flex-shrink-0`} />
                            <span className="text-slate-400 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
});
EntregablesSection.displayName = 'EntregablesSection';

/* -------------------------------------------------------------------------- */
/* SECTION 8: METODOLOGÍA FINEM                                                */
/* -------------------------------------------------------------------------- */

export const MetodologiaSection = memo(() => {
  const principios = [
    { icon: Layers, title: 'Hub & Spoke', desc: 'Una narrativa central de marca (corporativo) con ejecuciones tácticas locales (por sede). Centralización estratégica con relevancia local.' },
    { icon: Crosshair, title: 'Torre de Control', desc: 'Un solo equipo con visión completa de las 7 sedes. No 7 freelancers descoordinados. Elimina duplicidad, inconsistencias y "ruido" de marca.' },
    { icon: Zap, title: 'Resultados sobre estética', desc: 'Cada pieza tiene un objetivo medible. No publicamos por publicar. Si no cumple un objetivo del plan comercial, no se produce.' },
  ];

  return (
    <section id="metodologia" className="relative py-20 md:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none blur-3xl" style={{ transform: 'translate3d(0,0,0)' }}>
        <div className="absolute top-[30%] left-[-5%] w-[35vw] h-[35vw] rounded-full gpu-layer" style={{ background: '#14b8a6', opacity: 0.08 }} />
      </div>
      <div className="container mx-auto px-5 max-w-6xl relative z-10">
        <motion.div className="mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <motion.div variants={itemVariants}><SectionLabel>Metodología</SectionLabel></motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold tracking-tighter text-white leading-[1.1] mb-4">
            No Hacemos Marketing.
          </motion.h2>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.1] mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">Construimos Ecosistemas.</span>
          </motion.h2>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          {principios.map((p, i) => (
            <motion.div key={i} variants={itemVariants}
              className="group p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-teal-500/15 hover:border-teal-500/30 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-teal-500/50 to-transparent" />
              <div className="w-14 h-14 rounded-xl bg-teal-500/15 flex items-center justify-center mb-6">
                <p.icon className="w-7 h-7 text-teal-400" />
              </div>
              <span className="text-[10px] tracking-[0.3em] text-teal-400 uppercase font-bold">0{i + 1}</span>
              <h3 className="text-xl font-bold text-white mt-2 mb-3">{p.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});
MetodologiaSection.displayName = 'MetodologiaSection';

/* -------------------------------------------------------------------------- */
/* SECTION 9: ONBOARDING — Primeros 30 Días                                    */
/* -------------------------------------------------------------------------- */

export const OnboardingSection = memo(() => {
  const weeks = [
    { week: 'Semana 1', title: 'Inmersión', icon: Briefcase, items: [
        'Reunión con directivos y responsables de cada sede',
        'Revisión del plan anual de negocio y plan comercial',
        'Identificación de servicios prioritarios por temporada y sede',
        'Auditoría completa de presencia digital actual',
      ]},
    { week: 'Semana 2', title: 'Diagnóstico y KPIs', icon: BarChart3, items: [
        'Definición de KPIs alineados a objetivos comerciales (no métricas vanidosas)',
        'Benchmark detallado por sede vs. competencia local',
        'Mapeo de audiencias por sede y servicio',
        'Identificación de quick wins (oportunidades inmediatas)',
      ]},
    { week: 'Semana 3', title: 'Estrategia', icon: ClipboardList, items: [
        'Presentación del plan estratégico anual',
        'Calendario editorial alineado a temporadas y plan comercial',
        'Definición de pilares de contenido por sede',
        'Protocolos de comunicación y crisis',
      ]},
    { week: 'Semana 4', title: 'Ejecución', icon: Rocket, items: [
        'Homologación de perfiles (bios, portadas, contacto)',
        'Primer shooting de producción audiovisual',
        'Primeras publicaciones bajo la nueva estrategia',
        'Activación del manual de uso digital',
      ]},
  ];

  return (
    <section id="onboarding" className="relative py-20 md:py-32">
      <div className="container mx-auto px-5 max-w-5xl relative z-10">
        <motion.div className="mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <motion.div variants={itemVariants}><SectionLabel color="blue">Arranque</SectionLabel></motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
            Los Primeros 30 Días:<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Inmersión Total</span>
          </motion.h2>
        </motion.div>

        <motion.div className="relative" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-teal-500/50 to-teal-500/20" />

          <div className="space-y-8">
            {weeks.map((w, i) => (
              <motion.div key={i} variants={itemVariants} className="relative pl-16 md:pl-20">
                <div className="absolute left-4 md:left-6 top-6 w-4 h-4 rounded-full bg-[#020410] border-2 border-teal-500 z-10">
                  <div className="absolute inset-0 rounded-full pulse-ring border-2 border-teal-500/30" />
                </div>
                <div className="p-5 md:p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-teal-500/20 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/15 flex items-center justify-center">
                      <w.icon className="w-4.5 h-4.5 text-blue-400" />
                    </div>
                    <div>
                      <span className="text-[10px] tracking-[0.2em] text-blue-400 uppercase font-bold">{w.week}</span>
                      <h4 className="text-lg font-bold text-white">{w.title}</h4>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {w.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                        <span className="text-slate-400 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="mt-10 p-5 md:p-6 rounded-xl bg-teal-500/[0.06] border border-teal-500/20"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
          <p className="text-teal-300 font-medium text-sm leading-relaxed">
            "No arrancamos con un post bonito. Arrancamos con tu plan de negocio en la mano. Cada decisión creativa tiene un fundamento comercial."
          </p>
        </motion.div>
      </div>
    </section>
  );
});
OnboardingSection.displayName = 'OnboardingSection';
