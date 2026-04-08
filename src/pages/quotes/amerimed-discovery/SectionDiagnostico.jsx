import React, { memo } from 'react';
import { Award, Shield, Globe, Users, Stethoscope, Building2, AlertTriangle, X, Check, Smartphone, Search, MessageSquare, Eye, Palette, Languages } from 'lucide-react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, SectionLabel } from './shared';

/* -------------------------------------------------------------------------- */
/* SECTION 2: DIAGNÓSTICO — Lo que ES vs Lo que PARECE                        */
/* -------------------------------------------------------------------------- */

export const DiagnosticoSection = memo(() => {

  const esItems = [
    { icon: Building2, text: 'Red hospitalaria de Alta Especialidad (Nivel 3)' },
    { icon: Stethoscope, text: '+25 especialidades médicas y quirúrgicas' },
    { icon: Shield, text: 'UCI, neonatología, hemodinamia, resonancia magnética, cateterismo y más' },
    { icon: Users, text: 'Personal bilingüe certificado' },
    { icon: Award, text: 'Certificación del Consejo de Salubridad General' },
    { icon: Globe, text: 'Certificación Medical Tourism Association (EE.UU.)' },
    { icon: Building2, text: '7 destinos turísticos estratégicos' },
    { icon: Shield, text: '+15 años de operación continua' },
  ];

  const pareceItems = [
    { icon: Users, text: 'Instagram corporativo: 2,473 seguidores (con 1,401 posts — engagement mínimo)' },
    { icon: Globe, text: '7 dominios separados sin conexión (amerimedcancun.com, amerimedisla.com, etc.)' },
    { icon: Smartphone, text: 'Sin sistema de citas en línea funcional' },
    { icon: Search, text: 'Sin directorio médico funcional con perfiles individuales' },
    { icon: Languages, text: 'Sin versión en inglés completa (siendo turismo médico un pilar de negocio)' },
    { icon: Eye, text: 'Sin journey digital del paciente: Google → Web → Info → Agendar inexistente' },
    { icon: Palette, text: 'Identidad visual inconsistente entre sedes (7 ubicaciones = 7 voces)' },
    { icon: MessageSquare, text: 'Sin estrategia de contenido (se publica sin narrativa conectada)' },
  ];

  return (
    <section id="diagnostico" className="relative py-20 md:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-5 max-w-6xl relative z-10">
        <motion.div className="mb-14" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={containerVariants}>
          <motion.div variants={itemVariants}><SectionLabel color="teal">Diagnóstico</SectionLabel></motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
            La Brecha Que<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">Le Cuesta Pacientes</span>
          </motion.h2>
        </motion.div>

        {/* Dos paneles */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          {/* LO QUE ES */}
          <motion.div variants={itemVariants} className="p-6 md:p-8 rounded-2xl border border-teal-500/20 bg-teal-500/[0.04]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Lo Que Amerimed ES</h3>
            </div>
            <div className="space-y-3">
              {esItems.map((it, i) => (
                <div key={i} className="flex items-start gap-3">
                  <it.icon className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300 text-sm leading-relaxed">{it.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* LO QUE PARECE */}
          <motion.div variants={itemVariants} className="p-6 md:p-8 rounded-2xl border border-red-500/20 bg-red-500/[0.04]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                <X className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Lo Que Amerimed PARECE Digitalmente</h3>
            </div>
            <div className="space-y-3">
              {pareceItems.map((it, i) => (
                <div key={i} className="flex items-start gap-3">
                  <it.icon className="w-4 h-4 text-red-400/70 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-400 text-sm leading-relaxed">{it.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Barra visual de brecha */}
        <motion.div className="mb-10" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400">Infraestructura Real</span>
                <span className="text-teal-400 font-bold text-sm">90%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-400"
                  initial={{ width: 0 }} whileInView={{ width: '90%' }} viewport={{ once: true }} transition={{ duration: 1.5, ease: 'easeOut' }} />
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400">Presencia Digital</span>
                <span className="text-red-400 font-bold text-sm">20%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-red-500 to-amber-500"
                  initial={{ width: 0 }} whileInView={{ width: '20%' }} viewport={{ once: true }} transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cierre de transición */}
        <motion.div className="p-6 md:p-8 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04]"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-white font-semibold mb-2">Esta brecha no es solo un problema de imagen — es un problema de negocio.</p>
              <p className="text-slate-400 leading-relaxed text-sm">
                Cada peso invertido en campañas se diluye cuando el ecosistema digital no está preparado para convertir. Un sitio web fragmentado, una identidad inconsistente y la ausencia de herramientas digitales de conversión limitan directamente los resultados de cualquier estrategia de marketing.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
DiagnosticoSection.displayName = 'DiagnosticoSection';
