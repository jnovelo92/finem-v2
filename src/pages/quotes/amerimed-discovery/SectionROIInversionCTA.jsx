import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles, TrendingUp, Shield, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { LogoFinem, containerVariants, itemVariants, SectionLabel } from './shared';

/* -------------------------------------------------------------------------- */
/* SECTION 10: SIMULADOR DE ROI                                                */
/* -------------------------------------------------------------------------- */

export const ROISection = memo(() => {
  const [inversion, setInversion] = useState(30000);

  const CPM = 45;
  const CTR = 0.018;
  const CONV = 0.05;

  const impresiones = Math.round((inversion / CPM) * 1000);
  const clicks = Math.round(impresiones * CTR);
  const leads = Math.round(clicks * CONV);
  const costoPorLead = leads > 0 ? Math.round(inversion / leads) : 0;

  const formatNum = (n) => n.toLocaleString('es-MX');

  return (
    <section id="roi" className="relative py-20 md:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-5 max-w-4xl relative z-10">
        <motion.div className="mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <motion.div variants={itemVariants}><SectionLabel color="teal">Simulador</SectionLabel></motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
            Proyección de<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">Resultados</span>
          </motion.h2>
        </motion.div>

        <motion.div className="p-6 md:p-10 rounded-2xl border border-teal-500/20 bg-white/[0.03]"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          
          {/* Slider */}
          <div className="mb-10">
            <label className="flex justify-between items-center mb-4">
              <span className="text-sm text-slate-400 uppercase tracking-wider">Inversión mensual en pauta</span>
              <span className="text-2xl md:text-3xl font-black text-white">${formatNum(inversion)} <span className="text-sm font-normal text-slate-400">MXN</span></span>
            </label>
            <input type="range" min={10000} max={100000} step={5000} value={inversion}
              onChange={(e) => setInversion(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #14b8a6 ${((inversion - 10000) / 90000) * 100}%, rgba(255,255,255,0.1) ${((inversion - 10000) / 90000) * 100}%)`,
              }}
            />
            <div className="flex justify-between mt-2 text-xs text-slate-600">
              <span>$10,000</span><span>$50,000</span><span>$100,000</span>
            </div>
          </div>

          {/* Resultados */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Impresiones/mes', value: formatNum(impresiones), color: 'text-teal-400' },
              { label: 'Clicks/mes', value: formatNum(clicks), color: 'text-blue-400' },
              { label: 'Leads/mes', value: formatNum(leads), color: 'text-emerald-400' },
              { label: 'Costo por lead', value: `$${formatNum(costoPorLead)}`, color: 'text-amber-400' },
            ].map((m, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                <p className={`text-2xl md:text-3xl font-black ${m.color} counter-anim`}>{m.value}</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Barra visual simple */}
          <div className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex items-end gap-1 h-20 justify-center">
              {[
                { h: `${Math.min(100, (impresiones / 2500000) * 100)}%`, color: 'bg-teal-500/60', label: 'Impresiones' },
                { h: `${Math.min(100, (clicks / 50000) * 100)}%`, color: 'bg-blue-500/60', label: 'Clicks' },
                { h: `${Math.min(100, (leads / 2500) * 100)}%`, color: 'bg-emerald-500/60', label: 'Leads' },
              ].map((bar, i) => (
                <div key={i} className="flex flex-col items-center gap-1 flex-1 max-w-[80px]">
                  <div className={`w-full rounded-t-md ${bar.color} transition-all duration-500`} style={{ height: bar.h, minHeight: '4px' }} />
                  <span className="text-[8px] text-slate-600 uppercase">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-[11px] text-slate-600 mt-6 leading-relaxed">
            *Estas proyecciones son estimaciones basadas en benchmarks promedio del sector salud en México y campañas similares administradas por FINEM. Los resultados reales varían según temporada, competencia, calidad del contenido y múltiples factores externos. No constituyen una garantía de resultados.
          </p>
        </motion.div>
      </div>
    </section>
  );
});
ROISection.displayName = 'ROISection';

/* -------------------------------------------------------------------------- */
/* SECTION 11: INVERSIÓN                                                       */
/* -------------------------------------------------------------------------- */

export const InversionSection = memo(() => {
  const fases = [
    { num: 'F1', title: 'Estandarización', periodo: 'Meses 1-3', precio: '$95,000', icon: Shield, color: 'teal' },
    { num: 'F2', title: 'Humanización', periodo: 'Meses 4-6', precio: '$105,000', icon: Target, color: 'blue' },
    { num: 'F3', title: 'Adquisición', periodo: 'Meses 7-9', precio: '$120,000', icon: Zap, color: 'purple' },
    { num: 'F4', title: 'Expansión', periodo: 'Meses 10-12', precio: '$120,000', icon: TrendingUp, color: 'orange' },
  ];

  const colorMap = {
    teal: { text: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
    blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    purple: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    orange: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  };

  return (
    <section id="inversion" className="relative py-20 md:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none blur-3xl" style={{ transform: 'translate3d(0,0,0)' }}>
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full" style={{ background: '#14b8a6', opacity: 0.08 }} />
        <div className="absolute bottom-[10%] left-[-5%] w-[35vw] h-[35vw] rounded-full" style={{ background: '#3b82f6', opacity: 0.06 }} />
      </div>

      <div className="container mx-auto px-5 max-w-6xl relative z-10">
        <motion.div className="mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <motion.div variants={itemVariants}><SectionLabel color="teal">Inversión</SectionLabel></motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
            Inversión<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">Estratégica</span>
          </motion.h2>
        </motion.div>

        {/* Iguala mensual - 4 cards */}
        <motion.div className="mb-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <motion.h3 variants={itemVariants} className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-5">Iguala Mensual</motion.h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {fases.map((f, i) => {
              const c = colorMap[f.color];
              return (
                <motion.div key={i} variants={itemVariants}
                  className={`p-5 rounded-xl ${c.bg} border ${c.border} text-center hover:scale-[1.02] transition-transform`}>
                  <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center mx-auto mb-3`}>
                    <f.icon className={`w-5 h-5 ${c.text}`} />
                  </div>
                  <span className={`text-[10px] tracking-[0.2em] ${c.text} uppercase font-bold`}>{f.num}: {f.title}</span>
                  <p className="text-2xl md:text-3xl font-black text-white mt-1">{f.precio}</p>
                  <p className="text-xs text-slate-500 mt-1">MXN + IVA/mes</p>
                  <p className="text-[10px] text-slate-600 mt-0.5">{f.periodo}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Totales iguala */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Inversión anual en iguala</p>
            <p className="text-3xl font-black text-white">$1,320,000 <span className="text-sm font-normal text-slate-400">MXN + IVA</span></p>
          </div>
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Promedio mensual</p>
            <p className="text-3xl font-black text-teal-400">$110,000 <span className="text-sm font-normal text-slate-400">MXN + IVA</span></p>
          </div>
        </motion.div>

        {/* Infraestructura */}
        <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-5">Inversión en Infraestructura Digital</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-teal-500/[0.06] border border-teal-500/20">
              <p className="text-xs text-teal-400 uppercase tracking-widest font-bold mb-2">Plataforma Web Unificada</p>
              <p className="text-2xl font-black text-white mb-1">$320,000 <span className="text-sm font-normal text-slate-400">MXN + IVA</span></p>
              <p className="text-xs text-slate-500">Pagadero en 3 parcialidades (meses 1, 3 y 5)</p>
            </div>
            <div className="p-5 rounded-xl bg-teal-500/[0.06] border border-teal-500/20">
              <p className="text-xs text-teal-400 uppercase tracking-widest font-bold mb-2">Manual de Identidad Avanzado</p>
              <p className="text-2xl font-black text-white mb-1">$150,000 <span className="text-sm font-normal text-slate-400">MXN + IVA</span></p>
              <p className="text-xs text-slate-500">Pagadero en 2 parcialidades (meses 1 y 3)</p>
            </div>
          </div>
        </motion.div>

        {/* Total Año 1 */}
        <motion.div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-teal-500/[0.1] to-blue-500/[0.06] border-2 border-teal-500/30 text-center"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.45 }}>
          <p className="text-xs text-teal-400 uppercase tracking-widest font-bold mb-2">Inversión Total Año 1</p>
          <p className="text-4xl md:text-5xl font-black text-white">$1,790,000 <span className="text-base font-normal text-slate-400">MXN + IVA</span></p>
          <p className="text-sm text-slate-500 mt-2">Iguala ($1,320,000) + Web ($320,000) + Manual de Identidad ($150,000)</p>
        </motion.div>

        {/* Comparativo de valor */}
        <motion.div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/10"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Comparativa de Valor</h3>
          
          <div className="space-y-4 mb-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-300">Servicios equivalentes fragmentados (7 agencias + SEO + Paid + Productora + Dev + Director)</span>
                <span className="text-red-400 font-bold">$224,000/mes</span>
              </div>
              <div className="w-full h-4 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-red-500/60 to-red-400/60" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-300">Con FINEM: todo integrado y coordinado</span>
                <span className="text-teal-400 font-bold">$110,000/mes</span>
              </div>
              <div className="w-full h-4 rounded-full bg-white/5 overflow-hidden">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-400"
                  initial={{ width: 0 }} whileInView={{ width: '49%' }} viewport={{ once: true }} transition={{ duration: 1.5 }} />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500/15 border border-teal-500/30">
            <span className="text-teal-400 font-black text-lg">51%</span>
            <span className="text-teal-300 text-sm font-medium">de ahorro con calidad centralizada y visión estratégica unificada</span>
          </div>

          {/* Notas */}
          <div className="mt-6 space-y-1.5 text-xs text-slate-600">
            <p>• La inversión en pauta publicitaria (Google Ads, Meta Ads) NO está incluida. Amerimed la invierte directamente. FINEM administra con fee del 15%.</p>
            <p>• Viáticos de producción audiovisual fuera de Cancún los cubre Amerimed.</p>
            <p>• Precios en pesos mexicanos antes de IVA.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
InversionSection.displayName = 'InversionSection';

/* -------------------------------------------------------------------------- */
/* SECTION 12: CTA FINAL                                                       */
/* -------------------------------------------------------------------------- */

export const CTASection = memo(() => (
  <section id="cta" className="relative py-24 md:py-40">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 blur-3xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 60%)' }} />
      </div>
    </div>

    <div className="container mx-auto px-5 max-w-3xl relative z-10">
      <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <Sparkles className="w-12 h-12 text-orange-400 mx-auto mb-8" />
        </motion.div>

        <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
          El Siguiente Paso
        </motion.h2>

        <motion.p variants={itemVariants} className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          Agenda una reunión para revisar esta propuesta en detalle y definir juntos las fechas de arranque.
        </motion.p>

        <motion.div variants={itemVariants}>
          <motion.a
            href="https://wa.me/529984750514?text=Hola%2C%20me%20interesa%20agendar%20una%20reuni%C3%B3n%20para%20revisar%20la%20propuesta%20Amerimed"
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="group relative inline-flex px-12 py-6 bg-orange-500 text-white font-bold tracking-[0.15em] text-sm uppercase overflow-hidden transition-all duration-500 rounded-lg cursor-pointer hover:bg-orange-400">
            <span className="relative z-10 flex items-center gap-3">
              Agendar Reunión
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </motion.a>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10 space-y-1.5">
          <p className="text-slate-500 text-sm">hola@finem.mx · finem.mx</p>
          <p className="text-slate-600 text-xs">Cancún · CDMX · Mérida</p>
        </motion.div>
      </motion.div>
    </div>
  </section>
));
CTASection.displayName = 'CTASection';

/* -------------------------------------------------------------------------- */
/* FOOTER                                                                      */
/* -------------------------------------------------------------------------- */

export const DiscoveryFooter = memo(() => (
  <footer className="relative py-10 border-t border-white/5" style={{ background: '#010208' }}>
    <div className="container mx-auto px-5 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <LogoFinem className="h-7 w-auto text-orange-500/60" />
          <span className="text-slate-700 text-sm">Propuesta Confidencial · Amerimed 2026</span>
        </div>
        <p className="text-slate-700 text-sm">© {new Date().getFullYear()} FINEM. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
));
DiscoveryFooter.displayName = 'DiscoveryFooter';
