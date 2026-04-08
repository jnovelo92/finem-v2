import React, { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight, ArrowLeft, Check, Zap, FileText, Shield, Clock, ChevronDown,
    Lock, TrendingUp, Sparkles, Eye, CheckCircle2, AlertTriangle, MessageSquare,
    ClipboardCheck, Target, Search, Compass, BarChart3, LineChart, Palette, Bot,
    Mail, Monitor, Newspaper, Megaphone, MessageCircle, Database, Send, Globe,

} from 'lucide-react';
import { motion, useTransform, useScroll } from 'framer-motion';

/* -------------------------------------------------------------------------- */
/* ESTILOS                                                                     */
/* -------------------------------------------------------------------------- */

const ProposalStyles = () => (
    <style>{`
    @keyframes gradient-flow {
      0% { background-position: 0% 50%; }
      25% { background-position: 50% 100%; }
      50% { background-position: 100% 50%; }
      75% { background-position: 50% 0%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradient-flow {
      background-size: 300% 300%;
      animation: gradient-flow 6s ease infinite;
    }
    @keyframes typing-dot {
      0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
      40% { opacity: 1; transform: scale(1); }
    }
    .typing-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: #C8A84E;
      animation: typing-dot 1.4s ease-in-out infinite;
    }
    @keyframes agent-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(200,168,78,0.4); }
      50% { box-shadow: 0 0 0 12px rgba(200,168,78,0); }
    }
    .agent-pulse { animation: agent-pulse 2s ease-in-out infinite; }
    @keyframes blob-float {
      0% { transform: translate3d(0,0,0) scale(1); }
      35% { transform: translate3d(2.5%,-2.5%,0) scale(1.025); }
      70% { transform: translate3d(-1%,1%,0) scale(0.99); }
      100% { transform: translate3d(0,0,0) scale(1); }
    }
    @keyframes blob-float-reverse {
      0% { transform: translate3d(0,0,0) scale(1); }
      40% { transform: translate3d(-2%,2%,0) scale(0.975); }
      75% { transform: translate3d(1%,-0.5%,0) scale(1.01); }
      100% { transform: translate3d(0,0,0) scale(1); }
    }
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 0.4; }
    }
    .animate-blob { animation: blob-float 28s cubic-bezier(0.45,0.05,0.55,0.95) infinite; will-change: transform; }
    .animate-blob-reverse { animation: blob-float-reverse 32s cubic-bezier(0.45,0.05,0.55,0.95) infinite; will-change: transform; }
    .animate-pulse-glow { animation: pulse-glow 5s ease-in-out infinite; }
    .gpu-layer { transform: translateZ(0); backface-visibility: hidden; }
  `}</style>
);

/* -------------------------------------------------------------------------- */
/* ANIMATION VARIANTS                                                          */
/* -------------------------------------------------------------------------- */

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] } },
};
const lineReveal = {
    hidden: { scaleX: 0, originX: 0 },
    visible: { scaleX: 1, transition: { duration: 1, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 } },
};

/* -------------------------------------------------------------------------- */
/* NAVBAR                                                                      */
/* -------------------------------------------------------------------------- */

const ProposalNavbar = memo(() => {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${isScrolled ? 'py-4' : 'py-6 md:py-8'}`}>
            <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
                style={{ background: 'linear-gradient(to bottom, rgba(2,4,16,0.95) 0%, rgba(2,4,16,0.6) 60%, transparent 100%)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
            />
            <div className="container mx-auto px-6 md:px-12 relative z-10 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link to="/" className="hover:opacity-80 transition-opacity">
                        <img src="/Finem-Politics-white.png" alt="Finem Politics" className="h-8 md:h-10 w-auto" />
                    </Link>
                    <div className="hidden md:block h-8 w-px bg-white/10" />
                    <span className="hidden md:block text-[10px] tracking-[0.3em] text-slate-400 uppercase">
                        Propuesta · Presidencia Municipal 2026
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/" className="hidden md:flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-slate-400 hover:text-white uppercase transition-colors">
                        <ArrowLeft className="w-3 h-3" /> Regresar
                    </Link>
                    <motion.button
                        onClick={() => scrollToSection('servicios')}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-md group cursor-pointer"
                    >
                        <span className="text-[9px] font-bold tracking-[0.3em] text-white uppercase">Ver Servicios</span>
                        <div className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#C8A84E' }} />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: '#C8A84E' }} />
                        </div>
                    </motion.button>
                </div>
            </div>
        </nav>
    );
});
ProposalNavbar.displayName = 'ProposalNavbar';

/* -------------------------------------------------------------------------- */
/* HERO SECTION                                                                */
/* -------------------------------------------------------------------------- */

const HeroSection = memo(() => (
    <header className="relative z-10 min-h-screen w-full flex flex-col justify-center pt-24 pb-20">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #020410 0%, #020410 70%, transparent 100%)' }} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none blur-3xl" style={{ transform: 'translate3d(0,0,0)' }}>
            <div className="absolute -left-[10%] top-[5%] w-[60vw] h-[60vw] md:w-[45vw] md:h-[45vw] rounded-full animate-blob gpu-layer" style={{ background: '#C8A84E', opacity: 0.35 }} />
            <div className="absolute right-[-10%] top-[15%] w-[35vw] h-[35vw] md:w-[40vw] md:h-[40vw] rounded-full animate-blob-reverse gpu-layer" style={{ background: '#7c3aed', opacity: 0.3 }} />
            <div className="absolute bottom-[10%] left-[20%] w-[25vw] h-[25vw] rounded-full animate-pulse-glow gpu-layer" style={{ background: '#C8A84E', opacity: 0.2 }} />
        </div>

        <motion.div className="container mx-auto max-w-6xl px-6 md:px-12 relative z-30" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
                <motion.span variants={lineReveal} className="w-12 md:w-16 h-[1px]" style={{ background: 'linear-gradient(to right, #C8A84E, transparent)' }} />
                <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium" style={{ color: 'rgba(200,168,78,0.7)' }}>
                    Finem Politics · Gobierno Municipal
                </span>
            </motion.div>

            <div className="mb-8 md:mb-12">
                <motion.div variants={itemVariants}>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-[1.1] text-white pb-2">
                        Su Gobierno Merece un Sistema,
                    </h1>
                </motion.div>
                <motion.div variants={itemVariants}>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-[1.1] pb-4">
                        <span className="text-transparent bg-clip-text animate-gradient-flow" style={{ backgroundImage: 'linear-gradient(135deg, #e8cc7e, #C8A84E, #a8842e, #C8A84E)' }}>
                            No Improvisación.
                        </span>
                    </h1>
                </motion.div>
            </div>

            <motion.div variants={itemVariants} className="max-w-2xl mb-12">
                <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                    Hoy la comunicación municipal depende de una persona, un teléfono y buena voluntad. Cuando esa persona se satura o no está, todo se detiene.{' '}
                    <span style={{ color: '#C8A84E' }} className="font-medium">No es falta de esfuerzo. Es falta de estructura.</span>
                </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-12">
                <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 agent-pulse" style={{ background: 'rgba(200,168,78,0.15)', border: '1px solid rgba(200,168,78,0.3)' }}>
                        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: '#C8A84E' }} />
                    </div>
                    <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-full" style={{ background: 'rgba(200,168,78,0.08)', border: '1px solid rgba(200,168,78,0.15)' }}>
                        <div className="typing-dot" style={{ animationDelay: '0s' }} />
                        <div className="typing-dot" style={{ animationDelay: '0.2s' }} />
                        <div className="typing-dot" style={{ animationDelay: '0.4s' }} />
                    </div>
                </div>
                <span className="text-slate-500 text-xs sm:text-sm italic leading-relaxed pl-1 sm:pl-0">
                    "Buen día, su solicitud sobre la pavimentación en Col. Centro fue registrada y turnada al área correspondiente..."
                </span>
            </motion.div>

            <motion.div variants={itemVariants}>
                <motion.button
                    onClick={() => document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' })}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="group relative px-10 py-5 bg-white text-black font-bold tracking-[0.15em] text-[11px] uppercase overflow-hidden transition-all duration-500 rounded-lg cursor-pointer"
                >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to right, #C8A84E, #e8cc7e, #C8A84E)' }} />
                    <div className="absolute inset-[2px] bg-white group-hover:bg-black transition-colors duration-500 rounded-md" />
                    <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500">
                        Descubra Cómo Funciona
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                </motion.button>
            </motion.div>

            <motion.div className="flex items-center gap-3 mt-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}>
                <ChevronDown className="w-5 h-5 animate-bounce" style={{ color: '#C8A84E' }} />
                <span className="text-[10px] tracking-[0.3em] uppercase text-slate-500">Deslice para descubrir</span>
            </motion.div>
        </motion.div>
    </header>
));
HeroSection.displayName = 'HeroSection';

/* -------------------------------------------------------------------------- */
/* DIAGNÓSTICO SECTION                                                         */
/* -------------------------------------------------------------------------- */

const DiagnosticoSection = memo(() => {
    const problems = [
        { icon: Clock, title: "Mensajes sin respuesta", desc: "Ciudadanos que escriben por WhatsApp esperando horas o días por información básica." },
        { icon: AlertTriangle, title: "Redes sin constancia", desc: "Días enteros sin publicaciones porque el encargado está en campo o saturado." },
        { icon: FileText, title: "Compromisos perdidos", desc: "Promesas hechas en giras y audiencias que nadie les da seguimiento." },
        { icon: TrendingUp, title: "Sin termómetro", desc: "No hay forma de saber qué opina la ciudadanía hasta que el problema ya creció." },
    ];

    const todaySteps = [
        "La ciudadanía escribe y no recibe respuesta",
        "Las redes se publican cuando hay tiempo",
        "Los compromisos se anotan en libretas",
        "Las crisis crecen sin que nadie las detecte a tiempo",
        "La imagen depende de la improvisación",
        "Total: oportunidades perdidas cada día",
    ];

    const finemSteps = [
        "La ciudadanía recibe respuestas inmediatas 24/7",
        "Cada solicitud queda registrada y tiene seguimiento",
        "Sus redes publican con estrategia y constancia",
        "Sus compromisos se registran y generan alertas",
        "Sabes qué se dice de su gobierno antes de que sea un problema",
        "La comunicación deja de improvisarse y empieza a dirigirse",
    ];

    return (
        <section id="diagnostico" className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(200,168,78,0.07) 0%, transparent 70%)' }} />
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>

                    <motion.div variants={itemVariants} className="space-y-6">
                        <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-red-500/15">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <span className="text-red-400 font-bold text-xs uppercase tracking-[0.2em]">Hoy: Sin Estructura</span>
                            </div>
                            <div className="space-y-3">
                                {todaySteps.map((step, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span className="text-red-500/40 text-xs font-mono w-6">{String(i + 1).padStart(2, '0')}</span>
                                        <span className={`text-sm ${i === 5 ? 'text-red-400 font-bold' : 'text-slate-400'}`}>{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02]" style={{ border: '1px solid rgba(200,168,78,0.2)' }}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#C8A84E' }} />
                                <span className="font-bold text-xs uppercase tracking-[0.2em]" style={{ color: '#C8A84E' }}>Con Finem Politics</span>
                            </div>
                            <div className="space-y-3">
                                {finemSteps.map((step, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span className="text-xs font-mono w-6" style={{ color: 'rgba(200,168,78,0.4)' }}>{String(i + 1).padStart(2, '0')}</span>
                                        <span className={`text-sm ${i === 5 ? 'font-bold' : 'text-slate-300'}`} style={i === 5 ? { color: '#C8A84E' } : {}}>
                                            {step}
                                        </span>
                                        {i > 0 && i < 5 && <CheckCircle2 className="w-4 h-4 ml-auto flex-shrink-0" style={{ color: 'rgba(200,168,78,0.5)' }} />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(200,168,78,0.8)' }}>
                            <span className="w-8 h-px" style={{ background: 'rgba(200,168,78,0.5)' }} />
                            El Diagnóstico
                        </span>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
                            Su Equipo No Da Abasto.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">
                                No Es Culpa de Ellos.
                            </span>
                        </h2>

                        <div className="space-y-4 mb-10">
                            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                                La mayoría de administraciones depende de 1 o 2 personas para todo: redes, WhatsApp, diseño. Cuando esa persona falta, todo se detiene.
                            </p>
                            <p className="text-slate-400 leading-relaxed">
                                Los cientos de mensajes diarios, las publicaciones que nunca se hacen, los compromisos que se pierden — son horas desperdiciadas y ciudadanos ignorados cada día.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {problems.map((p, i) => (
                                <div key={i} className="group p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-all duration-500"
                                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,168,78,0.2)'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}>
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(200,168,78,0.1)' }}>
                                        <p.icon className="w-5 h-5" style={{ color: '#C8A84E' }} />
                                    </div>
                                    <span className="text-white font-bold text-sm block">{p.title}</span>
                                    <p className="text-slate-500 text-xs leading-relaxed mt-2">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
});
DiagnosticoSection.displayName = 'DiagnosticoSection';

/* -------------------------------------------------------------------------- */
/* SOLUCIÓN SECTION                                                            */
/* -------------------------------------------------------------------------- */

const SolucionSection = memo(() => {
    const checks = [
        "La ciudadanía recibe respuestas inmediatas 24/7",
        "Cada solicitud queda registrada y tiene seguimiento",
        "Sus redes publican con estrategia y constancia",
        "Sus compromisos se registran y generan alertas",
        "Sabes qué se dice de su gobierno antes de que sea problema",
        "La comunicación deja de improvisarse y empieza a dirigirse",
    ];

    return (
        <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(200,168,78,0.08) 0%, transparent 70%)' }} />
            </div>
            <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    <motion.div variants={itemVariants}>
                        <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(200,168,78,0.8)' }}>
                            <span className="w-8 h-px" style={{ background: 'rgba(200,168,78,0.5)' }} />
                            La Solución
                            <span className="w-8 h-px" style={{ background: 'rgba(200,168,78,0.5)' }} />
                        </span>
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-4">
                        Instalamos el Sistema Completo
                    </motion.h2>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] mb-8">
                        <span className="text-transparent bg-clip-text animate-gradient-flow" style={{ backgroundImage: 'linear-gradient(135deg, #e8cc7e, #C8A84E, #a8842e, #C8A84E)' }}>
                            de Comunicación para su Gobierno.
                        </span>
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                        Estrategia. Contenido. Tecnología. Medición. Creamos una estructura profesional que trabaja todos los días, aunque estés en gira o el equipo esté en campo.
                    </motion.p>
                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        {checks.map((c, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 rounded-xl text-left" style={{ background: 'rgba(200,168,78,0.05)', border: '1px solid rgba(200,168,78,0.1)' }}>
                                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(200,168,78,0.15)' }}>
                                    <Check className="w-3.5 h-3.5" style={{ color: '#C8A84E' }} />
                                </div>
                                <span className="text-slate-300 text-sm">{c}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
});
SolucionSection.displayName = 'SolucionSection';

/* -------------------------------------------------------------------------- */
/* SERVICIOS SECTION                                                           */
/* -------------------------------------------------------------------------- */

const ServiciosSection = memo(() => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const areas = [
        {
            label: "Área 1 · Dirección Estratégica",
            title: "Dirección Estratégica",
            desc: "Definimos cómo debe percibirse su gobierno.",
            color: '#C8A84E',
            colorRgb: '200,168,78',
            icon: Target,
            services: [
                { icon: Search, name: "Diagnóstico de comunicación", desc: "Evaluación de percepción pública, presencia digital y estructura actual de comunicación." },
                { icon: Compass, name: "Estrategia de comunicación", desc: "Diseño de narrativa de gobierno, pilares de mensaje y calendario estratégico alineado a obras y programas." },
                { icon: BarChart3, name: "Monitoreo de medios y conversación pública", desc: "Seguimiento de menciones, percepción y comparación con otros actores políticos." },
                { icon: LineChart, name: "Reportes y optimización continua", desc: "Informes periódicos de resultados, métricas y ajustes estratégicos." },
            ],
        },
        {
            label: "Área 2 · Producción de Contenido",
            title: "Producción Profesional de Contenido",
            desc: "Cada publicación responde a un objetivo. Nada se publica por ocurrencia.",
            color: '#C8A84E',
            colorRgb: '200,168,78',
            icon: Sparkles,
            services: [
                { icon: Palette, name: "Producción mensual de contenido", desc: "Diseño gráfico, videos, reels, campañas temáticas e identidad visual institucional." },
                { icon: Bot, name: "Generador de contenido asistido", desc: "Producción automática de borradores para publicaciones basadas en actividades diarias." },
                { icon: Mail, name: "Boletines por correo electrónico", desc: "Comunicación directa segmentada a bases de datos ciudadanas." },
            ],
        },
        {
            label: "Área 3 · Presencia Digital y Alcance",
            title: "Presencia Digital y Alcance",
            desc: "Su gobierno visible, accesible y profesional.",
            color: '#7c3aed',
            colorRgb: '124,58,237',
            icon: Globe,
            services: [
                { icon: Monitor, name: "Desarrollo de sitio web institucional", desc: "Sitio oficial con transparencia, directorio, galería de obras, atención ciudadana y páginas para programas sociales." },
                { icon: Newspaper, name: "Portales informativos digitales", desc: "Creación de medios digitales para posicionamiento en buscadores y narrativa institucional." },
                { icon: Megaphone, name: "Campañas de publicidad digital segmentadas", desc: "Anuncios dirigidos por colonia, edad e intereses." },
            ],
        },
        {
            label: "Área 4 · Atención y Seguimiento",
            title: "Sistema Digital de Atención y Seguimiento",
            desc: "Nunca más compromisos perdidos. Nunca más mensajes sin respuesta.",
            color: '#3b82f6',
            colorRgb: '59,130,246',
            icon: MessageSquare,
            services: [
                { icon: MessageCircle, name: "Sistema de atención ciudadana 24/7", desc: "Asistente digital conectado a WhatsApp, Facebook e Instagram para responder consultas y canalizar solicitudes." },
                { icon: ClipboardCheck, name: "Registro y seguimiento de compromisos", desc: "Sistema digital para registrar promesas hechas en giras y audiencias, con responsables, fechas límite y alertas." },
                { icon: Database, name: "Base de datos ciudadana unificada", desc: "Registro centralizado de conversaciones, solicitudes, colonias e historial de atención." },
                { icon: Send, name: "Segmentación y envío de comunicaciones dirigidas", desc: "Mensajes personalizados por zona o perfil ciudadano." },
            ],
        },
    ];

    const integrations = ["WhatsApp", "Facebook e Instagram", "Google"];

    return (
        <section id="servicios" ref={sectionRef} className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-visible pointer-events-none blur-[100px]" style={{ transform: 'translate3d(0,0,0)' }}>
                <motion.div style={{ y: backgroundY }} className="absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full gpu-layer">
                    <div className="w-full h-full rounded-full" style={{ background: '#7c3aed', opacity: 0.18 }} />
                </motion.div>
                <motion.div style={{ y: backgroundY }} className="absolute bottom-[-15%] left-[-5%] w-[50vw] h-[50vw] rounded-full gpu-layer">
                    <div className="w-full h-full rounded-full" style={{ background: '#C8A84E', opacity: 0.1 }} />
                </motion.div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div className="mb-16 md:mb-20 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
                    <motion.div variants={itemVariants}>
                        <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(200,168,78,0.8)' }}>
                            <span className="w-8 h-px" style={{ background: 'rgba(200,168,78,0.5)' }} />
                            Nuestros Servicios
                            <span className="w-8 h-px" style={{ background: 'rgba(200,168,78,0.5)' }} />
                        </span>
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-3">
                        4 Áreas. Un Solo Objetivo:
                    </motion.h2>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] mb-6">
                        <span className="text-transparent bg-clip-text animate-gradient-flow" style={{ backgroundImage: 'linear-gradient(135deg, #e8cc7e, #C8A84E, #a8842e, #C8A84E)' }}>
                            Orden y Resultados.
                        </span>
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Cada servicio puede contratarse por separado o como parte de un plan integral.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {areas.map((area) => (
                        <motion.div key={area.title}
                            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={containerVariants}
                            className="p-6 md:p-8 rounded-2xl bg-[#0a0a1a]/80 border border-white/[0.06] transition-all duration-500"
                            onMouseEnter={e => e.currentTarget.style.borderColor = `rgba(${area.colorRgb},0.25)`}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                        >
                            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: `rgba(${area.colorRgb},0.15)`, border: `1px solid rgba(${area.colorRgb},0.3)` }}>
                                    <area.icon className="w-7 h-7" style={{ color: area.color }} />
                                </div>
                                <div>
                                    <span className="text-[10px] tracking-[0.3em] uppercase font-bold block" style={{ color: area.color }}>{area.label}</span>
                                    <p className="text-slate-400 text-sm">{area.desc}</p>
                                </div>
                            </motion.div>
                            <div className="space-y-4">
                                {area.services.map((s) => (
                                    <motion.div key={s.name} variants={itemVariants} className="flex items-start gap-3 p-3 rounded-xl transition-all duration-300"
                                        style={{ background: 'rgba(255,255,255,0.02)' }}>
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                                            style={{ background: `rgba(${area.colorRgb},0.1)` }}>
                                            <s.icon className="w-4 h-4" style={{ color: area.color }} />
                                        </div>
                                        <div>
                                            <span className="text-white font-semibold text-sm block mb-1">{s.name}</span>
                                            <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div className="mt-12 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    <motion.p variants={itemVariants} className="text-slate-500 text-sm mb-4">Conectado con las plataformas que ya usa su equipo</motion.p>
                    <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
                        {integrations.map((name) => (
                            <span key={name} className="px-4 py-2 rounded-full text-xs font-medium border"
                                style={{ color: '#C8A84E', borderColor: 'rgba(200,168,78,0.2)', background: 'rgba(200,168,78,0.05)' }}>
                                {name}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
});
ServiciosSection.displayName = 'ServiciosSection';

/* -------------------------------------------------------------------------- */
/* CRECIMIENTO ORGÁNICO SECTION                                                */
/* -------------------------------------------------------------------------- */

const CrecimientoOrganicoSection = memo(() => {
    const points = [
        { icon: TrendingUp, title: "Más alcance sin pauta", desc: "Las publicaciones llegan a más personas de forma natural." },
        { icon: MessageSquare, title: "Más interacción real", desc: "Comentarios, compartidos y reacciones genuinas." },
        { icon: BarChart3, title: "Medible y comprobable", desc: "Reportes comparativos antes y después." },
    ];

    return (
        <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,168,78,0.04) 0%, transparent 50%, rgba(200,168,78,0.02) 100%)' }} />
            </div>
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <motion.div className="p-8 md:p-12 rounded-3xl" style={{ background: 'rgba(200,168,78,0.03)', border: '1px solid rgba(200,168,78,0.15)' }}
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    <motion.div variants={itemVariants} className="text-center mb-8">
                        <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(200,168,78,0.8)' }}>
                            <span className="w-8 h-px" style={{ background: 'rgba(200,168,78,0.5)' }} />
                            Servicio Especial
                            <span className="w-8 h-px" style={{ background: 'rgba(200,168,78,0.5)' }} />
                        </span>
                        <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6 block" style={{ color: '#C8A84E', background: 'rgba(200,168,78,0.1)', border: '1px solid rgba(200,168,78,0.2)' }}>
                            Independiente · Se contrata por separado
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
                            Más Alcance. Más Interacción. Más Presencia.
                        </h2>
                        <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
                            Programa especializado para aumentar el alcance e interacción de sus publicaciones sin depender exclusivamente de publicidad pagada. Más visibilidad. Más conversación. Más posicionamiento.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {points.map((point) => (
                            <div key={point.title} className="text-center p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(200,168,78,0.1)' }}>
                                    <point.icon className="w-5 h-5" style={{ color: '#C8A84E' }} />
                                </div>
                                <h4 className="font-bold text-white mb-2">{point.title}</h4>
                                <p className="text-slate-400 text-sm">{point.desc}</p>
                            </div>
                        ))}
                    </motion.div>

                    <motion.p variants={itemVariants} className="text-center text-slate-500 text-xs leading-relaxed max-w-2xl mx-auto">
                        Este servicio es completamente independiente. Funciona como acelerador de un plan integral o para administraciones que ya cuentan con equipo propio.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
});
CrecimientoOrganicoSection.displayName = 'CrecimientoOrganicoSection';

/* -------------------------------------------------------------------------- */
/* PROCESO SECTION                                                             */
/* -------------------------------------------------------------------------- */

const ProcesoSection = memo(() => {
    const phases = [
        {
            number: "01", title: "Diagnóstico", subtitle: "Evaluamos la situación actual", timeline: "Semanas 1-2",
            gradient: "from-yellow-500/20 to-yellow-600/10", borderColor: "border-yellow-600/30",
            iconBg: "bg-yellow-600/20", iconColor: "text-yellow-500", icon: Search,
            que: "Evaluamos cómo se percibe su gobierno, qué funciona en su comunicación y qué necesita atención inmediata.",
            recibe: "Documento de hallazgos + Mapa de oportunidades + Prioridades claras.",
        },
        {
            number: "02", title: "Estrategia", subtitle: "Definimos el plan a seguir", timeline: "Semanas 3-4",
            gradient: "from-yellow-500/15 to-purple-600/10", borderColor: "border-yellow-600/25",
            iconBg: "bg-yellow-600/20", iconColor: "text-yellow-500", icon: Compass,
            que: "Diseñamos la narrativa de gobierno, los mensajes clave y la hoja de ruta alineada a su calendario de obras y programas.",
            recibe: "Narrativa central + Calendario estratégico + Protocolos de crisis.",
        },
        {
            number: "03", title: "Implementación", subtitle: "Activamos y ejecutamos", timeline: "Meses 2-3",
            gradient: "from-purple-500/20 to-purple-600/10", borderColor: "border-purple-500/30",
            iconBg: "bg-purple-500/20", iconColor: "text-purple-400", icon: Zap,
            que: "Ponemos en marcha los servicios contratados: contenido, web, herramientas digitales, campañas. Todo empieza a funcionar.",
            recibe: "Servicios activos + Primeros entregables + Métricas iniciales.",
        },
        {
            number: "04", title: "Sistema Digital 24/7", subtitle: "Responde, Registra y Difunde", timeline: "Mes 3 en adelante",
            gradient: "from-blue-500/20 to-blue-600/10", borderColor: "border-blue-500/30",
            iconBg: "bg-blue-500/20", iconColor: "text-blue-400", icon: Bot,
            que: "Su sistema de atención ciudadana y seguimiento de compromisos opera las 24 horas. Las herramientas digitales trabajan mientras su equipo descansa.",
            recibe: "Atención automática activa + Compromisos registrados + Contenido asistido funcionando.",
        },
        {
            number: "05", title: "Resultados y Control", subtitle: "Medimos y optimizamos", timeline: "Permanente",
            gradient: "from-teal-500/20 to-teal-600/10", borderColor: "border-teal-500/30",
            iconBg: "bg-teal-500/20", iconColor: "text-teal-400", icon: LineChart,
            que: "Medimos todo: alcance, respuestas, compromisos cumplidos, percepción. Ajustamos la estrategia con datos reales.",
            recibe: "Reportes periódicos + Sesiones de revisión + Ajustes continuos.",
        },
    ];

    const resultados = [
        "Orden y Respuestas",
        "Compromisos Cumplidos",
        "Imagen Fuerte",
    ];

    return (
        <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(200,168,78,0.05) 0%, transparent 70%)' }} />
            </div>
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div className="text-center mb-16 md:mb-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(200,168,78,0.8)' }}>
                        <span className="w-8 h-px" style={{ background: 'rgba(200,168,78,0.5)' }} />
                        Cómo Trabajamos
                        <span className="w-8 h-px" style={{ background: 'rgba(200,168,78,0.5)' }} />
                    </motion.span>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
                        5 pasos. Resultados reales.
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Ves avances desde el primer mes.{' '}
                        <span className="text-white font-medium">Cada paso entrega resultados concretos.</span>
                    </motion.p>
                </motion.div>

                <motion.div className="relative" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-yellow-500/50 via-purple-500/50 to-teal-500/50 hidden lg:block" />
                    <div className="space-y-8 lg:space-y-0">
                        {phases.map((phase, index) => (
                            <motion.div key={phase.number} variants={itemVariants}
                                className={`relative lg:flex lg:items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} lg:mb-16`}>
                                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                                    <div className={`group p-6 md:p-8 rounded-2xl bg-gradient-to-br ${phase.gradient} border ${phase.borderColor} hover:scale-[1.02] transition-all duration-500`}>
                                        <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                                            <div className={`w-12 h-12 rounded-xl ${phase.iconBg} flex items-center justify-center flex-shrink-0`}>
                                                <phase.icon className={`w-6 h-6 ${phase.iconColor}`} />
                                            </div>
                                            <div className={index % 2 === 0 ? 'lg:text-right' : ''}>
                                                <span className={`text-[10px] tracking-[0.3em] ${phase.iconColor} uppercase font-bold`}>
                                                </span>
                                                <h3 className="text-xl md:text-2xl font-bold text-white">{phase.title}</h3>
                                                <p className="text-slate-400 text-sm">{phase.subtitle}</p>
                                            </div>
                                        </div>
                                        <div className={`space-y-3 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                                            <p className="text-slate-400">{phase.que}</p>
                                            <p className="text-slate-500 text-sm"><span className="text-slate-300 font-medium">Lo que recibe: </span>{phase.recibe}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#020410] border-2 z-10" style={{ borderColor: '#C8A84E' }} />
                                <div className="hidden lg:block lg:w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div className="mt-16 flex flex-col md:flex-row justify-center gap-6 md:gap-12"
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    {resultados.map((r) => (
                        <motion.div key={r} variants={itemVariants} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(200,168,78,0.2)', border: '1px solid rgba(200,168,78,0.4)' }}>
                                <Check className="w-3.5 h-3.5" style={{ color: '#C8A84E' }} />
                            </div>
                            <span className="text-white font-bold text-lg">{r}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
});
ProcesoSection.displayName = 'ProcesoSection';

/* -------------------------------------------------------------------------- */
/* CONFIANZA SECTION                                                           */
/* -------------------------------------------------------------------------- */

const ConfianzaSection = memo(() => {
    const cards = [
        { title: "Información Protegida", desc: "Toda la información de su administración está completamente separada y protegida. Nadie más puede acceder a sus datos ni a sus conversaciones.", icon: Lock },
        { title: "Todo Queda Registrado", desc: "Cada acción, cada respuesta, cada publicación queda documentada. Puede auditar cualquier actividad en cualquier momento.", icon: ClipboardCheck },
        { title: "Filtros de Supervisión", desc: "Ninguna herramienta puede publicar ni responder algo inapropiado. Todo pasa por filtros de control antes de llegar a la ciudadanía.", icon: Shield },
        { title: "Monitoreo Permanente", desc: "Supervisamos el funcionamiento de cada herramienta. Si algo se desvía, lo detectamos y corregimos antes de que impacte.", icon: Eye },
    ];

    return (
        <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />
            </div>
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
                    <motion.div variants={itemVariants}>
                        <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-emerald-500/80 uppercase mb-6">
                            <span className="w-8 h-px bg-emerald-500/50" />
                            Control y Seguridad
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-8">
                            En Política, Un Error<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                                Cuesta Caro.
                            </span>
                        </h2>
                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                            Todo está diseñado para proteger su imagen y su administración. Cada herramienta, cada mensaje, cada publicación pasa por controles que garantizan que nada salga sin supervisión.
                        </p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="space-y-4">
                        {cards.map((n) => (
                            <div key={n.title} className="group p-5 rounded-xl bg-[#0a0a1a]/80 border border-white/[0.06] transition-all duration-500"
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                        <n.icon className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <div>
                                        <span className="text-white font-semibold group-hover:text-emerald-100 transition-colors block mb-1">{n.title}</span>
                                        <p className="text-slate-500 text-sm leading-relaxed">{n.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
});
ConfianzaSection.displayName = 'ConfianzaSection';

/* -------------------------------------------------------------------------- */
/* FRASE SECTION                                                               */
/* -------------------------------------------------------------------------- */

const FraseSection = memo(() => (
    <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(200,168,78,0.06) 0%, transparent 70%)' }} />
        </div>
        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                <motion.p variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-relaxed mb-12">
                    Convertimos la comunicación municipal en un sistema profesional que responde 24 horas, registra compromisos, publica estratégicamente y mide resultados.
                </motion.p>
                <motion.div variants={itemVariants} className="space-y-4">
                    {[
                        "Su gobierno trabaja con orden.",
                        "Su ciudadanía recibe respuestas.",
                        "Su imagen se fortalece.",
                    ].map((line) => (
                        <p key={line} className="text-lg font-semibold" style={{ color: '#C8A84E' }}>{line}</p>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    </section>
));
FraseSection.displayName = 'FraseSection';

/* -------------------------------------------------------------------------- */
/* CTA SECTION                                                                 */
/* -------------------------------------------------------------------------- */

const CTASection = memo(() => {
    const steps = [
        "Agende una reunión con nosotros",
        "Diseñamos su plan a medida",
        "Implementamos y ves los resultados",
    ];

    return (
        <section id="cta" className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 blur-3xl">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(200,168,78,0.1) 0%, transparent 60%)' }} />
                </div>
            </div>
            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    <motion.div variants={itemVariants}>
                        <Sparkles className="w-12 h-12 mx-auto mb-8" style={{ color: '#C8A84E' }} />
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
                        ¿Listo para instalar el sistema?
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-slate-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                        Su administración merece una estructura que trabaje todos los días. Sus ciudadanos merecen respuestas inmediatas. Su imagen merece constancia y dirección profesional.
                    </motion.p>
                    <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-12">
                        {steps.map((step, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'rgba(200,168,78,0.2)', border: '1px solid rgba(200,168,78,0.3)' }}>
                                    <span className="text-sm font-bold" style={{ color: '#C8A84E' }}>{index + 1}</span>
                                </div>
                                <span className="text-slate-300 text-sm">{step}</span>
                            </div>
                        ))}
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <motion.a
                            href="https://wa.me/529984750514?text=Hola%2C%20me%20interesa%20la%20propuesta%20de%20Finem%20Politics%20para%20mi%20administración%20municipal"
                            target="_blank" rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            className="group relative inline-flex px-12 py-6 bg-white text-black font-bold tracking-[0.15em] text-sm uppercase overflow-hidden transition-all duration-500 rounded-lg cursor-pointer"
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: 'linear-gradient(to right, #C8A84E, #e8cc7e, #C8A84E)' }} />
                            <div className="absolute inset-[2px] bg-white group-hover:bg-black transition-colors duration-500 rounded-md" />
                            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500">
                                Agendar Reunión
                                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
});
CTASection.displayName = 'CTASection';

/* -------------------------------------------------------------------------- */
/* FOOTER                                                                      */
/* -------------------------------------------------------------------------- */

const ProposalFooter = memo(() => (
    <footer className="relative py-12 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                    <Link to="/">
                        <img src="/Finem-Politics-white.png" alt="Finem Politics" className="h-8 w-auto opacity-50 hover:opacity-70 transition-opacity" />
                    </Link>
                    <span className="text-slate-600 text-sm">Propuesta Exclusiva · Finem Politics · Presidencia Municipal 2026</span>
                </div>
                <p className="text-slate-600 text-sm">
                    © {new Date().getFullYear()} FINEM. Todos los derechos reservados.
                </p>
            </div>
        </div>
    </footer>
));
ProposalFooter.displayName = 'ProposalFooter';

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                              */
/* -------------------------------------------------------------------------- */

const FinemPoliticsProposal = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <>
            <ProposalStyles />
            <ProposalNavbar />
            <main className="relative z-10" style={{ backgroundColor: '#020410', minHeight: '100vh' }}>
                <HeroSection />
                <DiagnosticoSection />
                <SolucionSection />
                <ServiciosSection />
                <CrecimientoOrganicoSection />
                <ProcesoSection />
                <ConfianzaSection />
                <FraseSection />
                <CTASection />
            </main>
            <div style={{ backgroundColor: '#020410' }}>
                <ProposalFooter />
            </div>
        </>
    );
};

export default FinemPoliticsProposal;
