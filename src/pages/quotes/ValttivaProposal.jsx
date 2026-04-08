import React, { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight, ArrowLeft, Check, Zap, Target, Shield, Sparkles, ChevronDown,
    Globe, Palette, Rocket, Plus, Smartphone, CreditCard, MapPin, Mail,
    Activity, CalendarCheck, FileSignature, FileCheck, FileDown,
    LayoutDashboard, ClipboardList, CalendarCog, BellRing
} from 'lucide-react';
import { motion, useTransform, useScroll } from 'framer-motion';

/* ── STYLES ──────────────────────────────────────────────────────────────── */
const ProposalStyles = () => (
    <style>{`
    @keyframes gradient-flow {
      0% { background-position: 0% 50%; }
      25% { background-position: 50% 100%; }
      50% { background-position: 100% 50%; }
      75% { background-position: 50% 0%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradient-flow { background-size: 300% 300%; animation: gradient-flow 6s ease infinite; }
  `}</style>
);

/* ── LOGO ─────────────────────────────────────────────────────────────────── */
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

/* ── SHARED VARIANTS ──────────────────────────────────────────────────────── */
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] } }
};

/* ── NAVBAR ───────────────────────────────────────────────────────────────── */
const ProposalNavbar = memo(() => {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const h = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', h, { passive: true });
        return () => window.removeEventListener('scroll', h);
    }, []);
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    return (
        <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${isScrolled ? "py-4" : "py-6 md:py-8"}`}>
            <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${isScrolled ? "opacity-100" : "opacity-0"}`}
                style={{ background: 'linear-gradient(to bottom, rgba(2,4,16,0.95) 0%, rgba(2,4,16,0.6) 60%, transparent 100%)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }} />
            <div className="container mx-auto px-6 md:px-12 relative z-10 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link to="/" className="hover:opacity-80 transition-opacity"><LogoFinem className="h-8 md:h-10 w-auto text-white" /></Link>
                    <div className="hidden md:block h-8 w-px bg-white/10" />
                    <span className="hidden md:block text-[10px] tracking-[0.3em] text-slate-400 uppercase">Propuesta Valttiva 2026</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/" className="hidden md:flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-slate-400 hover:text-white uppercase transition-colors"><ArrowLeft className="w-3 h-3" />Regresar</Link>
                    <motion.button onClick={() => scrollTo('oportunidad')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-md group cursor-pointer">
                        <span className="text-[9px] font-bold tracking-[0.3em] text-white uppercase">Ver la Plataforma</span>
                        <div className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500" /></div>
                    </motion.button>
                </div>
            </div>
        </nav>
    );
});
ProposalNavbar.displayName = 'ProposalNavbar';

/* ── HERO ─────────────────────────────────────────────────────────────────── */
const HeroSection = memo(() => {
    const lineReveal = { hidden: { scaleX: 0, originX: 0 }, visible: { scaleX: 1, transition: { duration: 1, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 } } };
    return (
        <header className="relative z-10 min-h-screen w-full flex flex-col justify-center pt-24 pb-20">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #020410 0%, #020410 70%, transparent 100%)' }} />
            <div className="absolute inset-0 overflow-hidden pointer-events-none blur-3xl" style={{ transform: 'translate3d(0,0,0)' }}>
                <div className="absolute -left-[10%] top-[5%] w-[60vw] h-[60vw] md:w-[45vw] md:h-[45vw] rounded-full animate-blob gpu-layer" style={{ background: '#f97316', opacity: 0.4 }} />
                <div className="absolute right-[-10%] top-[15%] w-[35vw] h-[35vw] md:w-[40vw] md:h-[40vw] rounded-full animate-blob-reverse gpu-layer" style={{ background: '#7c3aed', opacity: 0.3 }} />
                <div className="absolute bottom-[10%] left-[20%] w-[25vw] h-[25vw] rounded-full animate-pulse-glow gpu-layer" style={{ background: '#f97316', opacity: 0.25 }} />
            </div>
            <motion.div className="container mx-auto max-w-6xl px-6 md:px-12 relative z-30" variants={containerVariants} initial="hidden" animate="visible">
                <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
                    <motion.span variants={lineReveal} className="w-12 md:w-16 h-[1px] bg-gradient-to-r from-orange-500 to-orange-500/0" />
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-orange-200/70 font-medium">Propuesta Plataforma Digital</span>
                </motion.div>
                <div className="mb-8 md:mb-12">
                    <motion.div variants={itemVariants}><h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-[1.1] text-white pb-2">Valttiva:</h1></motion.div>
                    <motion.div variants={itemVariants}>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-[1.1] pb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-300 via-orange-500 via-40% to-orange-400 to-90% animate-gradient-flow">Tu Servicio de Sueros</span><br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-orange-300 via-50% to-orange-500 animate-gradient-flow" style={{ animationDelay: '-2s' }}>Reservado en 3 Minutos.</span>
                        </h1>
                    </motion.div>
                </div>
                <motion.div variants={itemVariants} className="max-w-2xl mb-12">
                    <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                        Una plataforma donde tus pacientes eligen su tratamiento, agendan la visita a domicilio, firman digitalmente y pagan — todo desde su celular. Y del otro lado, <span className="text-white font-medium">tu equipo recibe cada orden con el expediente firmado listo</span>, sin perseguir a nadie.
                    </p>
                </motion.div>
                <motion.div variants={itemVariants}>
                    <motion.button onClick={() => document.getElementById('oportunidad')?.scrollIntoView({ behavior: 'smooth' })} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="group relative px-10 py-5 bg-white text-black font-bold tracking-[0.15em] text-[11px] uppercase overflow-hidden transition-all duration-500 rounded-lg cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-[2px] bg-white group-hover:bg-black transition-colors duration-500 rounded-md" />
                        <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500">Ver la Plataforma<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" /></span>
                    </motion.button>
                </motion.div>
                <motion.div className="flex items-center gap-3 mt-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}>
                    <ChevronDown className="w-5 h-5 text-orange-500 animate-bounce" /><span className="text-[10px] tracking-[0.3em] uppercase text-slate-500">Deslice para descubrir</span>
                </motion.div>
            </motion.div>
        </header>
    );
});
HeroSection.displayName = 'HeroSection';

/* ── OPORTUNIDAD ──────────────────────────────────────────────────────────── */
const OportunidadSection = memo(() => (
    <section id="oportunidad" className="relative py-24 md:py-32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)' }} /></div>
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
                <motion.div variants={itemVariants} className="relative">
                    <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-orange-500/10 via-[#0a0a1a] to-purple-500/10 border border-white/10 overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center"><div className="text-center p-8"><div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-500/20 flex items-center justify-center"><Activity className="w-10 h-10 text-orange-400" /></div><p className="text-slate-400 text-sm">Servicio de sueros IV a domicilio</p></div></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020410]/60 via-transparent to-transparent" />
                        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 backdrop-blur-sm"><span className="text-orange-400 text-xs font-bold">Nuevo Servicio</span></div>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants}>
                    <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-orange-500/80 uppercase mb-6"><span className="w-8 h-px bg-orange-500/50" />La Oportunidad</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-8">El Paciente Moderno<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">No Quiere Llamar</span></h2>
                    <div className="space-y-6 mb-10">
                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed">Hoy, agendar un servicio de sueros a domicilio depende de mensajes de WhatsApp, llamadas y coordinación manual. Esto limita cuántas citas puedes atender por día y genera fricción: el paciente que no recibe respuesta inmediata, <span className="text-orange-400 font-semibold">simplemente busca otra opción.</span></p>
                        <p className="text-slate-400 leading-relaxed">El mercado de bienestar IV en México está creciendo rápido, pero los negocios que lo dominan son los que permiten <span className="text-white">reservar al instante</span> y operan sin caos interno. Si tu paciente puede agendar solo pero tu equipo no recibe la orden a tiempo o no tiene el documento firmado antes de la cita, el servicio se rompe. Necesitas que ambos lados funcionen.</p>
                    </div>
                    <div className="p-6 rounded-xl bg-white/[0.03] border border-orange-500/20">
                        <p className="text-orange-400 font-semibold mb-2">La Solución:</p>
                        <p className="text-white leading-relaxed">Una plataforma que cierra el ciclo completo: tu paciente entra, elige, agenda, firma y paga desde su celular. Tu equipo recibe la orden al instante con el expediente firmado, controla la disponibilidad y confirma — todo desde un panel privado.</p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    </section>
));
OportunidadSection.displayName = 'OportunidadSection';

/* ── PLATAFORMA ───────────────────────────────────────────────────────────── */
const PlataformaSection = memo(() => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const pacienteItems = [
        { icon: Sparkles, title: "Catálogo de Tratamientos", description: "Página de inicio con todos tus sueros: nombre, beneficios, precio. El paciente elige con un toque y avanza." },
        { icon: CalendarCheck, title: "Agenda Inteligente", description: "Calendario con fechas y horarios disponibles. Sin ida y vuelta de mensajes — el paciente elige cuándo." },
        { icon: MapPin, title: "Ubicación Automática", description: "Detecta la dirección del paciente con GPS o le permite buscarla con autocompletado. Menos escritura, menos errores." },
        { icon: FileSignature, title: "Firma Digital + Historial", description: "Formulario de salud, términos y condiciones, y espacio para firma digital — todo legal y sin papel." },
    ];
    const cobroItems = [
        { phase: "Stripe", title: "Pasarela de Pago Segura", icon: Shield, detail: "Acepta tarjeta de crédito/débito al instante. Tu paciente paga y tú recibes — así de directo." },
        { phase: "Automático", title: "Doble Notificación por Correo", icon: Mail, detail: "Al confirmar el pago se disparan dos correos: uno al paciente con su recibo e instrucciones, y otro al equipo operativo de Valttiva con todos los datos de la cita y el expediente firmado adjunto en PDF." },
        { phase: "Legal", title: "Expediente PDF Automático", icon: FileCheck, detail: "Al completar la reserva, el sistema genera un PDF con los datos del paciente, cuestionario de salud, términos aceptados y firma digital incrustada — listo para que el doctor lo revise antes de la visita." },
        { phase: "Extras", title: "Complementos y Upselling", icon: Plus, detail: "Antes de pagar, el paciente puede agregar vitaminas extra o paquetes. Más ticket promedio, sin esfuerzo." },
    ];
    return (
        <section id="plataforma" ref={sectionRef} className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-visible pointer-events-none blur-[100px]" style={{ transform: 'translate3d(0,0,0)' }}>
                <motion.div style={{ y: backgroundY }} className="absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full gpu-layer"><div className="w-full h-full rounded-full" style={{ background: '#3b82f6', opacity: 0.2 }} /></motion.div>
                <motion.div style={{ y: backgroundY }} className="absolute bottom-[-15%] left-[-5%] w-[50vw] h-[50vw] rounded-full gpu-layer"><div className="w-full h-full rounded-full" style={{ background: '#f97316', opacity: 0.15 }} /></motion.div>
            </div>
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div className="mb-16 md:mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
                    <motion.div variants={itemVariants}><span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-orange-500/80 uppercase mb-6"><span className="w-8 h-px bg-orange-500/50" />La Plataforma</span></motion.div>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">Qué Incluye Tu Plataforma</motion.h2>
                    <motion.p variants={itemVariants} className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">No es solo una página bonita. Es un sistema de dos caras: la experiencia que ve tu paciente y el panel que usa tu equipo. <span className="text-white font-medium">Ambos conectados en tiempo real.</span></motion.p>
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center"><Smartphone className="w-7 h-7 text-orange-400" /></div>
                                <div><span className="text-[10px] tracking-[0.3em] text-orange-400 uppercase font-bold">01</span><h3 className="text-2xl md:text-3xl font-bold text-white">La Experiencia del Paciente</h3></div>
                            </div>
                            <p className="text-slate-400 text-lg">Todo lo que tu paciente ve y hace. Diseñado para que reservar sea tan fácil como <span className="text-white">pedir comida a domicilio.</span></p>
                        </motion.div>
                        <div className="space-y-4">
                            {pacienteItems.map((item) => (
                                <motion.div key={item.title} variants={itemVariants} className="group p-5 rounded-xl bg-[#0a0a1a]/80 border border-white/[0.06] hover:border-orange-500/30 transition-all duration-500">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0"><item.icon className="w-5 h-5 text-orange-400" /></div>
                                        <div><h4 className="text-white font-semibold mb-1 group-hover:text-orange-300 transition-colors">{item.title}</h4><p className="text-slate-500 text-sm leading-relaxed">{item.description}</p></div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center"><CreditCard className="w-7 h-7 text-purple-400" /></div>
                                <div><span className="text-[10px] tracking-[0.3em] text-purple-400 uppercase font-bold">02</span><h3 className="text-2xl md:text-3xl font-bold text-white">El Motor de Cobro</h3></div>
                            </div>
                            <p className="text-slate-400 text-lg">Lo que hace que cada reserva sea una venta cerrada. <span className="text-white">Sin perseguir pagos ni manejar efectivo.</span></p>
                        </motion.div>
                        <div className="space-y-4">
                            {cobroItems.map((item) => (
                                <motion.div key={item.phase} variants={itemVariants} className="group p-5 rounded-xl bg-[#0a0a1a]/80 border border-white/[0.06] hover:border-purple-500/30 transition-all duration-500">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0"><item.icon className="w-5 h-5 text-purple-400" /></div>
                                        <div><span className="text-[10px] tracking-[0.2em] text-purple-400 uppercase font-bold">{item.phase}</span><h4 className="text-white font-semibold group-hover:text-purple-300 transition-colors">{item.title}</h4><p className="text-slate-500 text-sm leading-relaxed mt-1">{item.detail}</p></div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
});
PlataformaSection.displayName = 'PlataformaSection';

/* ── PANEL ADMIN (nueva) ──────────────────────────────────────────────────── */
const PanelSection = memo(() => {
    const panelFeatures = [
        { icon: ClipboardList, title: "Ver todas las reservas", detail: "Lista en tiempo real de cada cita agendada: paciente, tratamiento, fecha, hora, dirección y estatus de pago. Filtrable por fecha y estado." },
        { icon: FileDown, title: "Descargar expedientes firmados", detail: "Cada reserva tiene su PDF con los datos del paciente, cuestionario de salud, términos aceptados y firma digital. Descargable con un clic — listo para que el doctor lo revise antes de salir a domicilio." },
        { icon: CalendarCog, title: "Controlar disponibilidad", detail: "Activar o bloquear fechas y horarios desde el panel. Si un día se llena o el equipo no está disponible, lo cierran y el paciente ya no lo ve en el calendario." },
        { icon: BellRing, title: "Notificación inmediata por correo", detail: "Cada vez que un paciente completa una reserva y paga, el equipo operativo recibe un correo con el resumen completo de la cita y el PDF firmado como adjunto. Sin tener que revisar el panel constantemente." },
    ];
    return (
        <section id="panel" className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)' }} /></div>
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
                    {/* Left — Content */}
                    <motion.div variants={itemVariants}>
                        <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-purple-400/80 uppercase mb-6"><span className="w-8 h-px bg-purple-500/50" />Tu Centro de Control</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-8">Todo lo que Pasa,<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">Lo Ves Aquí</span></h2>
                        <div className="space-y-6 mb-10">
                            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">No basta con que el paciente pueda reservar. Tu equipo necesita ver cada orden que entra, revisar los documentos firmados, y controlar qué días y horarios están disponibles — <span className="text-purple-400 font-semibold">sin depender de Excel ni de grupos de WhatsApp.</span></p>
                            <p className="text-slate-400 leading-relaxed">La plataforma incluye un <span className="text-white">panel privado</span> para el equipo operativo de Valttiva. Es simple, directo, y resuelve lo esencial desde el día uno.</p>
                        </div>
                        <div className="p-6 rounded-xl bg-white/[0.03] border border-purple-500/20">
                            <p className="text-purple-400 font-semibold mb-4">¿Qué puede hacer tu equipo desde el panel?</p>
                            <div className="space-y-4">
                                {panelFeatures.map((feat) => (
                                    <div key={feat.title} className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0"><feat.icon className="w-5 h-5 text-purple-400" /></div>
                                        <div><h4 className="text-white font-semibold text-sm">{feat.title}</h4><p className="text-slate-500 text-sm leading-relaxed">{feat.detail}</p></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                    {/* Right — Visual */}
                    <motion.div variants={itemVariants} className="relative">
                        <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-purple-500/10 via-[#0a0a1a] to-orange-500/10 border border-white/10 overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center"><div className="text-center p-8"><div className="w-20 h-20 mx-auto mb-6 rounded-full bg-purple-500/20 flex items-center justify-center"><LayoutDashboard className="w-10 h-10 text-purple-400" /></div><p className="text-slate-400 text-sm">Panel de administración Valttiva</p></div></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020410]/60 via-transparent to-transparent" />
                            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 backdrop-blur-sm"><span className="text-purple-400 text-xs font-bold">Incluido</span></div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
});
PanelSection.displayName = 'PanelSection';

/* ── ROADMAP ──────────────────────────────────────────────────────────────── */
const RoadmapSection = memo(() => {
    const phases = [
        { number: "01", title: "Diseño y Estrategia", timeline: "Días 1-3", icon: Palette, gradient: "from-orange-500/20 to-orange-600/10", borderColor: "border-orange-500/30", iconBg: "bg-orange-500/20", iconColor: "text-orange-400", objetivo: "Definir cómo se ve y cómo se siente la plataforma. Mobile-first, alineada a tu marca.", entregable: "Wireframes del flujo completo + diseño del panel admin + alta fidelidad aprobada por Valttiva." },
        { number: "02", title: "Landing + Catálogo", timeline: "Días 3-5", icon: Globe, gradient: "from-blue-500/20 to-blue-600/10", borderColor: "border-blue-500/30", iconBg: "bg-blue-500/20", iconColor: "text-blue-400", objetivo: "Construir la vitrina. Que tu página de inicio venda antes de que el paciente llegue al formulario.", entregable: "Página de inicio completa con catálogo de tratamientos, sección de beneficios, FAQ y footer." },
        { number: "03", title: "Flujo de Reserva + Documentos", timeline: "Días 5-10", icon: Target, gradient: "from-purple-500/20 to-purple-600/10", borderColor: "border-purple-500/30", iconBg: "bg-purple-500/20", iconColor: "text-purple-400", objetivo: "El corazón de la plataforma. Cada paso del wizard optimizado para que nadie abandone, y cada reserva genere su expediente PDF firmado automáticamente.", entregable: "Wizard completo (9 pasos) + generación automática de PDF con datos, cuestionario de salud y firma + integración de Stripe + correos al paciente y al equipo operativo." },
        { number: "04", title: "Panel de Administración", timeline: "Días 10-14", icon: LayoutDashboard, gradient: "from-orange-500/20 to-orange-600/10", borderColor: "border-orange-500/30", iconBg: "bg-orange-500/20", iconColor: "text-orange-400", objetivo: "Darle a tu equipo el control total: ver órdenes, descargar expedientes firmados y gestionar la disponibilidad del calendario.", entregable: "Panel admin con login, vista de reservas, descarga de PDFs firmados, gestión de disponibilidad de fechas/horarios, y notificaciones por correo al operativo." },
        { number: "05", title: "Pruebas y Lanzamiento", timeline: "Días 14-18", icon: Rocket, gradient: "from-teal-500/20 to-teal-600/10", borderColor: "border-teal-500/30", iconBg: "bg-teal-500/20", iconColor: "text-teal-400", objetivo: "Asegurar que todo funcione perfecto — tanto el flujo del paciente como el panel del equipo — en celulares y computadoras reales.", entregable: "Testing integral en iOS/Android/Desktop, pruebas de pago en Stripe, verificación de generación de PDFs, optimización de velocidad y deploy en producción." },
    ];
    const roadmapItemVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] } } };
    return (
        <section id="roadmap" className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)' }} /></div>
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div className="text-center mb-16 md:mb-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-orange-500/80 uppercase mb-6"><span className="w-8 h-px bg-orange-500/50" />Plan de Trabajo<span className="w-8 h-px bg-orange-500/50" /></motion.span>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">Lista en 18 Días</motion.h2>
                    <motion.p variants={itemVariants} className="text-slate-400 text-lg max-w-2xl mx-auto">No hay meses de espera. En <span className="text-white">menos de tres semanas</span> tu plataforma estará en línea — pacientes reservando y tu equipo operando desde el panel.</motion.p>
                </motion.div>
                <motion.div className="relative" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/50 via-purple-500/50 to-teal-500/50 hidden lg:block" />
                    <div className="space-y-8 lg:space-y-0">
                        {phases.map((phase, index) => (
                            <motion.div key={phase.number} variants={roadmapItemVariants} className={`relative lg:flex lg:items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} lg:mb-16`}>
                                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                                    <div className={`group p-6 md:p-8 rounded-2xl bg-gradient-to-br ${phase.gradient} border ${phase.borderColor} hover:scale-[1.02] transition-all duration-500`}>
                                        <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                                            <div className={`w-12 h-12 rounded-xl ${phase.iconBg} flex items-center justify-center`}><phase.icon className={`w-6 h-6 ${phase.iconColor}`} /></div>
                                            <div className={index % 2 === 0 ? 'lg:text-right' : ''}><span className={`text-[10px] tracking-[0.3em] ${phase.iconColor} uppercase font-bold`}>Fase {phase.number} · {phase.timeline}</span><h3 className="text-xl md:text-2xl font-bold text-white">{phase.title}</h3></div>
                                        </div>
                                        <div className={`space-y-3 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                                            <p className="text-slate-400"><span className="text-white font-medium">Objetivo:</span> {phase.objetivo}</p>
                                            <p className="text-slate-500 text-sm"><span className="text-slate-300 font-medium">Entregable:</span> {phase.entregable}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#020410] border-2 border-orange-500 z-10" />
                                <div className="hidden lg:block lg:w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
});
RoadmapSection.displayName = 'RoadmapSection';

/* ── TECNOLOGÍA ────────────────────────────────────────────────────────────── */
const TecnologiaSection = memo(() => {
    const [activeScenario, setActiveScenario] = useState('A');
    const scenarios = {
        A: {
            icon: Zap, title: "Rendimiento y Velocidad", subtitle: "(La Experiencia)", color: "orange",
            description: "La plataforma está optimizada para que cargue en menos de 2 segundos en cualquier celular. Cada segundo cuenta: por cada segundo extra de carga, pierdes hasta un 20% de conversión.",
            items: ["Next.js: La tecnología que usan Uber, TikTok y Nike para sus sitios web.", "Mobile-First: Diseñada primero para celular, donde están el 85% de tus pacientes.", "Optimización automática de imágenes, fuentes y código para máxima velocidad."],
            resultado: "Tu paciente nunca espera. La plataforma responde al instante y se siente como una app nativa.",
        },
        B: {
            icon: Shield, title: "Seguridad y Confianza", subtitle: "(La Tranquilidad)", color: "purple",
            description: "Manejas datos de salud y pagos. La plataforma está blindada con los estándares más altos de seguridad para que ni tú ni tus pacientes tengan que preocuparse.",
            items: ["Stripe como pasarela de pago: la misma que usan Amazon y Shopify. Certificación PCI-DSS.", "Datos de salud encriptados. Firma digital con valor legal almacenada de forma segura.", "Hosting en Vercel con SSL incluido y respaldos automáticos."],
            highlight: "DATOS PROTEGIDOS SIEMPRE",
            resultado: "Tus pacientes confían al compartir su información porque la plataforma se siente profesional y segura.",
        }
    };
    return (
        <section id="tecnologia" className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none blur-3xl">
                <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full" style={{ background: '#f97316', opacity: 0.12 }} />
                <div className="absolute bottom-[10%] left-[-5%] w-[35vw] h-[35vw] rounded-full" style={{ background: '#7c3aed', opacity: 0.1 }} />
            </div>
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div className="mb-16 md:mb-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-orange-500/80 uppercase mb-6"><span className="w-8 h-px bg-orange-500/50" />Bajo el Capó</motion.span>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">Tecnología de<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">Nivel Profesional</span></motion.h2>
                    <motion.p variants={itemVariants} className="text-slate-400 text-lg max-w-2xl">Tu plataforma no es una plantilla de WordPress. Está construida con la misma tecnología que usan startups de Silicon Valley — pero adaptada a tu negocio.</motion.p>
                </motion.div>
                <motion.div className="mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                    <div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/10">
                        <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">Desarrollar esta plataforma con panel admin, generación de documentos y pasarela de pago usando un equipo freelance o agencia web genérica</p>
                        <p className="text-3xl md:text-4xl font-bold text-white">$250,000+ <span className="text-lg text-slate-400 font-normal">MXN</span></p>
                        <p className="text-slate-500 text-sm mt-1">y 2-3 meses de desarrollo</p>
                    </div>
                </motion.div>
                <motion.div className="flex flex-col sm:flex-row gap-4 mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    {Object.entries(scenarios).map(([key, s]) => (
                        <button key={key} onClick={() => setActiveScenario(key)}
                            className={`flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-300 flex-1 cursor-pointer ${activeScenario === key
                                ? s.color === 'orange' ? 'bg-orange-500/20 border-orange-500/50 text-white' : 'bg-purple-500/20 border-purple-500/50 text-white'
                                : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}>
                            <s.icon className={`w-5 h-5 ${activeScenario === key ? (s.color === 'orange' ? 'text-orange-400' : 'text-purple-400') : ''}`} />
                            <div className="text-left"><span className="block text-sm font-bold">Escenario {key}: {s.title}</span><span className="block text-xs opacity-70">{s.subtitle}</span></div>
                        </button>
                    ))}
                </motion.div>
                <motion.div key={activeScenario} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className={`p-8 md:p-10 rounded-2xl border ${scenarios[activeScenario].color === 'orange' ? 'bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20' : 'bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20'}`}>
                    <p className="text-slate-300 text-lg leading-relaxed mb-6">{scenarios[activeScenario].description}</p>
                    <ul className="space-y-3 mb-6">
                        {scenarios[activeScenario].items.map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${scenarios[activeScenario].color === 'orange' ? 'bg-orange-500/20' : 'bg-purple-500/20'}`}>
                                    <Check className={`w-3.5 h-3.5 ${scenarios[activeScenario].color === 'orange' ? 'text-orange-400' : 'text-purple-400'}`} />
                                </div>
                                <span className="text-white font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                    {scenarios[activeScenario].highlight && (
                        <div className={`inline-block px-4 py-2 rounded-lg mb-4 ${scenarios[activeScenario].color === 'orange' ? 'bg-orange-500/20 border border-orange-500/30' : 'bg-purple-500/20 border border-purple-500/30'}`}>
                            <p className={`font-bold text-xl ${scenarios[activeScenario].color === 'orange' ? 'text-orange-400' : 'text-purple-400'}`}>{scenarios[activeScenario].highlight}</p>
                        </div>
                    )}
                    <div className={`p-4 rounded-xl mt-4 ${scenarios[activeScenario].color === 'orange' ? 'bg-orange-500/5' : 'bg-purple-500/5'}`}>
                        <p className="text-white font-medium"><span className="text-slate-400">Resultado:</span> {scenarios[activeScenario].resultado}</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
});
TecnologiaSection.displayName = 'TecnologiaSection';

/* ── OFERTA ────────────────────────────────────────────────────────────────── */
const OfertaSection = memo(() => {
    const includes = [
        { icon: Globe, text: "Página de inicio profesional con catálogo de tratamientos" },
        { icon: Smartphone, text: "Flujo de reserva completo (9 pasos optimizados para celular)" },
        { icon: MapPin, text: "Detección de ubicación + mapa interactivo" },
        { icon: FileSignature, text: "Cuestionario de salud + firma digital legal" },
        { icon: CreditCard, text: "Pasarela de pago Stripe (tarjeta, OXXO opcional)" },
        { icon: FileDown, text: "Generación automática de PDF con expediente firmado" },
        { icon: LayoutDashboard, text: "Panel de administración (reservas, disponibilidad, documentos)" },
        { icon: Mail, text: "Correos automáticos al paciente y al equipo operativo" },
    ];
    const opcionales = [
        { nombre: "Panel admin avanzado (reportes, métricas, historial de pacientes)", rango: "$25,000 – $35,000" },
        { nombre: "Recordatorios por WhatsApp (API Business)", rango: "$15,000 – $20,000" },
        { nombre: "Sistema de cupones y descuentos", rango: "$8,000 – $12,000" },
        { nombre: "Blog / contenido educativo sobre bienestar", rango: "$10,000 – $15,000" },
    ];
    return (
        <section id="oferta" className="relative py-24 md:py-32">
            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-orange-500/80 uppercase mb-6"><span className="w-8 h-px bg-orange-500/50" />La Inversión<span className="w-8 h-px bg-orange-500/50" /></motion.span>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">Todo Incluido, Sin Sorpresas</motion.h2>
                    <motion.p variants={itemVariants} className="text-slate-400 text-lg max-w-2xl mx-auto mb-12">Un solo pago cubre diseño, desarrollo, panel de administración, integración de pagos, generación de documentos, pruebas y puesta en línea. Tú solo pones el contenido médico.</motion.p>
                    <motion.div variants={itemVariants} className="mb-12">
                        <p className="text-slate-300 text-sm uppercase tracking-widest mb-6">Lo que recibes</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {includes.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 text-left">
                                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0"><item.icon className="w-5 h-5 text-orange-400" /></div>
                                    <span className="text-slate-300 text-sm">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="relative p-10 md:p-12 rounded-3xl bg-gradient-to-br from-orange-500/10 via-[#0a0a1a] to-purple-500/10 border border-orange-500/20 overflow-hidden mb-12">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                        <div className="relative z-10">
                            <p className="text-slate-400 text-sm uppercase tracking-widest mb-4">Inversión Total del Proyecto</p>
                            <div className="flex items-baseline justify-center gap-2 mb-4"><span className="text-6xl md:text-8xl font-black text-white">$148,000</span><span className="text-2xl text-slate-400 font-light">MXN</span></div>
                            <p className="text-slate-500 text-sm">(+ IVA)</p>
                            <p className="text-orange-400 text-xs mt-2 font-bold">*Incluye diseño, desarrollo, panel admin, generación de documentos PDF, integración de pagos, pruebas y deploy. No incluye contenido médico, cuenta de Stripe ni dominio.</p>
                        </div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="mb-12 text-left">
                        <h3 className="text-xl font-bold text-white mb-6 text-center">Crece cuando estés listo</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {opcionales.map((op, i) => (
                                <div key={i} className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.15] transition-colors">
                                    <p className="text-white font-medium text-sm mb-1">{op.nombre}</p>
                                    <p className="text-orange-400 text-sm font-bold">{op.rango}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="text-left p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <div className="space-y-3 text-sm">
                            <p className="text-slate-300"><span className="text-white font-semibold">Forma de pago:</span> 50% al inicio · 50% contra entrega a producción.</p>
                            <p className="text-slate-300"><span className="text-white font-semibold">Incluye:</span> 1 ronda de ajustes menores post-lanzamiento (5 días hábiles).</p>
                            <p className="text-slate-300"><span className="text-white font-semibold">No incluye:</span> Contenido médico (textos, fotografía), cuenta de Stripe, dominio, hosting recurrente, APIs de terceros (Google Maps).</p>
                            <p className="text-slate-300"><span className="text-white font-semibold">Panel admin incluye:</span> Vista de reservas, descarga de PDFs firmados, gestión de disponibilidad, notificaciones por correo al equipo operativo.</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
});
OfertaSection.displayName = 'OfertaSection';

/* ── CTA ──────────────────────────────────────────────────────────────────── */
const CTASection = memo(() => {
    const steps = ["Aprobación de la propuesta", "Kickoff y definición de contenido", "Lanzamiento en 18 días"];
    return (
        <section id="cta" className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute inset-0 blur-3xl"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 60%)' }} /></div></div>
            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    <motion.div variants={itemVariants}><Sparkles className="w-12 h-12 text-orange-400 mx-auto mb-8" /></motion.div>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">¿Listo para Recibir Reservas?</motion.h2>
                    <motion.p variants={itemVariants} className="text-slate-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">En 18 días tu plataforma estará en línea. Tus pacientes podrán elegir su suero, agendar, firmar y pagar. Tu equipo recibirá cada orden con el expediente listo — sin que nadie persiga a nadie.</motion.p>
                    <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-12">
                        {steps.map((step, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center"><span className="text-orange-400 text-sm font-bold">{i + 1}</span></div>
                                <span className="text-slate-300 text-sm">{step}</span>
                            </div>
                        ))}
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <motion.a href="https://wa.me/529984750514?text=Hola%2C%20me%20interesa%20la%20plataforma%20de%20sueros%20para%20Valttiva" target="_blank" rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            className="group relative inline-flex px-12 py-6 bg-white text-black font-bold tracking-[0.15em] text-sm uppercase overflow-hidden transition-all duration-500 rounded-lg cursor-pointer">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-[2px] bg-white group-hover:bg-black transition-colors duration-500 rounded-md" />
                            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500">Iniciar Proyecto Ahora<ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" /></span>
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
});
CTASection.displayName = 'CTASection';

/* ── FOOTER ───────────────────────────────────────────────────────────────── */
const ProposalFooter = memo(() => (
    <footer className="relative py-12 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                    <Link to="/"><LogoFinem className="h-8 w-auto text-white/50 hover:text-white/70 transition-colors" /></Link>
                    <span className="text-slate-600 text-sm">Propuesta Exclusiva Valttiva 2026</span>
                </div>
                <p className="text-slate-600 text-sm">© {new Date().getFullYear()} FINEM. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
));
ProposalFooter.displayName = 'ProposalFooter';

/* ── MAIN COMPONENT ───────────────────────────────────────────────────────── */
const ValttivaProposal = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    return (
        <>
            <ProposalStyles />
            <ProposalNavbar />
            <main className="relative z-10">
                <HeroSection />
                <OportunidadSection />
                <PlataformaSection />
                <PanelSection />
                <RoadmapSection />
                <TecnologiaSection />
                <OfertaSection />
                <CTASection />
            </main>
            <ProposalFooter />
        </>
    );
};

export default ValttivaProposal;
