import React, { memo } from 'react';
import { Check, X, Minus, Globe, Star, Users, Camera, BarChart3, MapPin, Stethoscope, Award, Languages, Plane } from 'lucide-react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, SectionLabel } from './shared';

/* -------------------------------------------------------------------------- */
/* SECTION 3: BENCHMARK COMPETITIVO — 3 Niveles de Impacto                     */
/* -------------------------------------------------------------------------- */

export const BenchmarkSection = memo(() => {

  /* ── NIVEL 1: Checklist de capacidades ── */
  const capabilities = [
    { label: 'Sitio web unificado',     amerimed: '7 dominios separados sin conexión', hospiten: 'hospiten.com con todas las sedes', galenia: 'hospitalgalenia.com',     amOk: false, hoOk: true, gaOk: true },
    { label: 'Citas en línea',          amerimed: 'No disponible',                     hospiten: 'Desde web y app',                 galenia: 'Parcial',                 amOk: false, hoOk: true, gaOk: 'partial' },
    { label: 'App propia para pacientes', amerimed: 'No existe',                       hospiten: 'Citas, documentos, gestión familiar', galenia: 'No existe',            amOk: false, hoOk: true, gaOk: false },
    { label: 'Blog / contenido autoridad', amerimed: 'Sin blog activo',                hospiten: 'Artículos por sede y especialidad', galenia: 'Podcast "Actitud Saludable"', amOk: false, hoOk: true, gaOk: true },
    { label: 'Sitio en inglés completo', amerimed: 'Solo algunas páginas',             hospiten: 'Completo',                         galenia: 'Completo',                amOk: false, hoOk: true, gaOk: true },
    { label: 'Identidad visual unificada', amerimed: 'Inconsistente entre sedes',      hospiten: 'Consistente globalmente',          galenia: 'Consistente',             amOk: false, hoOk: true, gaOk: true },
  ];

  const StatusBadge = ({ ok }) => {
    if (ok === true)     return <span className="inline-flex items-center gap-1 text-teal-400"><Check className="w-3.5 h-3.5" /> SÍ</span>;
    if (ok === 'partial') return <span className="inline-flex items-center gap-1 text-amber-400"><Minus className="w-3.5 h-3.5" /> Parcial</span>;
    return <span className="inline-flex items-center gap-1 text-red-400"><X className="w-3.5 h-3.5" /> NO</span>;
  };

  /* ── NIVEL 2: Radar de brecha ── */
  const brechaData = [
    { dimension: 'Cobertura geográfica', infra: 5, digital: 1, infraLabel: '7 sedes',                   digitalLabel: 'Fragmentada' },
    { dimension: 'Especialidades médicas', infra: 5, digital: 2, infraLabel: '+25',                      digitalLabel: 'Sin visibilidad' },
    { dimension: 'Certificaciones',       infra: 4, digital: 1, infraLabel: 'CSG + MTA',                 digitalLabel: 'No comunicadas' },
    { dimension: 'Turismo médico',        infra: 5, digital: 1, infraLabel: 'Ubicación estratégica',     digitalLabel: 'Sin journey en inglés' },
    { dimension: 'Personal bilingüe',     infra: 5, digital: 1, infraLabel: 'Certificado',               digitalLabel: 'No posicionado' },
  ];

  /* ── NIVEL 1: Stat cards de impacto ── */
  const impactStats = [
    { value: '3.1', unit: '★', label: 'Google Maps Cancún', sublabel: '238 reseñas — sin gestión de reputación', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    { value: '2,473', unit: 'seg.', label: 'Instagram Amerimed', sublabel: '1,401 posts — años publicando sin resultados', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { value: '25,301', unit: 'seg.', label: 'Galenia Facebook (1 hospital)', sublabel: 'Supera a Amerimed Cancún (20,184) con una sola sede', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
    { value: '7,854', unit: 'seg.', label: 'Hospiten México IG', sublabel: '3x más que Amerimed con presencia en menos destinos', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  ];

  return (
    <section id="benchmark" className="relative py-20 md:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-5 max-w-6xl relative z-10">

        {/* Header */}
        <motion.div className="mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <motion.div variants={itemVariants}><SectionLabel color="blue">Benchmark Competitivo</SectionLabel></motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
            El Mercado Ya<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Se Está Moviendo</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-slate-400 text-lg max-w-3xl">
            Amerimed tiene la infraestructura para liderar. Sus competidores lo están haciendo con <span className="text-white font-medium">menos recursos pero con una estrategia digital coherente</span>.
          </motion.p>
        </motion.div>

        {/* ─────── NIVEL 1: Checklist de capacidades ─────── */}
        <motion.div className="mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <span className="text-[10px] font-bold tracking-[0.3em] text-blue-400/60 uppercase mb-4 block">Nivel 1 — Capacidades Digitales</span>
          </motion.div>

          {/* Desktop table */}
          <motion.div variants={itemVariants} className="hidden md:block rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]">
            <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-0 border-b border-white/10">
              <div className="p-4 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Capacidad</div>
              <div className="p-4 text-[10px] uppercase tracking-widest text-amber-400 font-bold border-l border-white/5">Amerimed <span className="text-slate-600">(7 hospitales)</span></div>
              <div className="p-4 text-[10px] uppercase tracking-widest text-teal-400 font-bold border-l border-white/5">Hospiten <span className="text-slate-600">(20 hospitales)</span></div>
              <div className="p-4 text-[10px] uppercase tracking-widest text-teal-400 font-bold border-l border-white/5">Galenia <span className="text-slate-600">(1 hospital)</span></div>
            </div>
            {capabilities.map((row, i) => (
              <div key={i} className={`grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-0 ${i < capabilities.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/[0.02] transition-colors`}>
                <div className="p-4 text-sm text-slate-300 font-medium">{row.label}</div>
                <div className="p-4 text-sm border-l border-white/5">
                  <div className="flex items-start gap-2"><StatusBadge ok={row.amOk} /><span className="text-slate-500 text-xs">{row.amerimed}</span></div>
                </div>
                <div className="p-4 text-sm border-l border-white/5">
                  <div className="flex items-start gap-2"><StatusBadge ok={row.hoOk} /><span className="text-slate-500 text-xs">{row.hospiten}</span></div>
                </div>
                <div className="p-4 text-sm border-l border-white/5">
                  <div className="flex items-start gap-2"><StatusBadge ok={row.gaOk} /><span className="text-slate-500 text-xs">{row.galenia}</span></div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Mobile cards */}
          <motion.div variants={itemVariants} className="md:hidden space-y-3">
            {capabilities.map((row, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <p className="text-xs uppercase tracking-wider text-slate-500 mb-3 font-bold">{row.label}</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-slate-500">Amerimed</span><div className="flex items-center gap-1"><StatusBadge ok={row.amOk} /></div></div>
                  <div className="flex justify-between"><span className="text-slate-500">Hospiten</span><div className="flex items-center gap-1"><StatusBadge ok={row.hoOk} /></div></div>
                  <div className="flex justify-between"><span className="text-slate-500">Galenia</span><div className="flex items-center gap-1"><StatusBadge ok={row.gaOk} /></div></div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Stat cards de impacto */}
        <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          {impactStats.map((stat, i) => (
            <motion.div key={i} variants={itemVariants}
              className={`p-5 rounded-xl ${stat.bg} border ${stat.border} text-center`}>
              <p className={`text-3xl md:text-4xl font-black ${stat.color}`}>
                {stat.value}<span className="text-lg font-medium ml-1">{stat.unit}</span>
              </p>
              <p className="text-white font-semibold text-xs mt-1">{stat.label}</p>
              <p className="text-slate-500 text-[10px] mt-1 leading-tight">{stat.sublabel}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ─────── NIVEL 2: Brecha de percepción ─────── */}
        <motion.div className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <span className="text-[10px] font-bold tracking-[0.3em] text-blue-400/60 uppercase mb-5 block">Nivel 2 — Brecha de Percepción</span>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-8">Lo que Amerimed <span className="text-teal-400">ES</span> vs. lo que Amerimed <span className="text-red-400">PARECE</span></h3>
          </motion.div>

          <div className="space-y-5">
            {brechaData.map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="p-4 md:p-5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-full md:w-44 flex-shrink-0">
                    <p className="text-sm text-white font-semibold">{item.dimension}</p>
                  </div>

                  <div className="flex-1 space-y-2.5">
                    {/* Infra bar */}
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] uppercase tracking-widest text-teal-400 w-16 flex-shrink-0 font-bold">Real</span>
                      <div className="flex-1 h-4 rounded-full bg-white/5 overflow-hidden">
                        <motion.div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-400"
                          initial={{ width: 0 }} whileInView={{ width: `${(item.infra / 5) * 100}%` }} viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.1 * i, ease: 'easeOut' }} />
                      </div>
                      <span className="text-xs text-teal-400 font-bold w-24 flex-shrink-0 text-right">{item.infraLabel}</span>
                    </div>

                    {/* Digital bar */}
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] uppercase tracking-widest text-red-400 w-16 flex-shrink-0 font-bold">Digital</span>
                      <div className="flex-1 h-4 rounded-full bg-white/5 overflow-hidden">
                        <motion.div className="h-full rounded-full bg-gradient-to-r from-red-500 to-amber-500"
                          initial={{ width: 0 }} whileInView={{ width: `${(item.digital / 5) * 100}%` }} viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.1 * i + 0.2, ease: 'easeOut' }} />
                      </div>
                      <span className="text-xs text-red-400/70 w-24 flex-shrink-0 text-right">{item.digitalLabel}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─────── NIVEL 3: Referentes aspiracionales ─────── */}
        <motion.div className="mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <span className="text-[10px] font-bold tracking-[0.3em] text-blue-400/60 uppercase mb-5 block">Nivel 3 — Referentes Aspiracionales</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-white/[0.03] border border-blue-500/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center"><Globe className="w-5 h-5 text-blue-400" /></div>
                <div><h4 className="text-white font-bold">Hospiten</h4><span className="text-xs text-slate-500">Benchmark directo</span></div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                20 hospitales en 5 países. +55 años de operación. App propia, citas online, blog activo e identidad visual unificada. Son el benchmark directo de lo que Amerimed puede lograr.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-white/[0.03] border border-blue-500/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center"><Award className="w-5 h-5 text-blue-400" /></div>
                <div><h4 className="text-white font-bold">Hospital Galenia</h4><span className="text-xs text-slate-500">Referente local</span></div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Ranking #40 de mejores hospitales de LatAm 2025 (IntelLat). Único hospital de Quintana Roo reconocido internacionalmente. 4 certificaciones internacionales. Con 1 hospital logró el posicionamiento que una red de 7 no tiene.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Cierre de sección */}
        <motion.div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-teal-500/[0.08] to-blue-500/[0.04] border border-teal-500/20"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="text-white text-base md:text-lg font-semibold leading-relaxed">
            Amerimed no tiene un problema de capacidad médica. Tiene un problema de visibilidad.
          </p>
          <p className="text-teal-300/80 text-sm md:text-base mt-2 leading-relaxed">
            Sus competidores no son mejores hospitales — tienen mejor comunicación. Y eso se puede resolver.
          </p>
        </motion.div>
      </div>
    </section>
  );
});
BenchmarkSection.displayName = 'BenchmarkSection';
