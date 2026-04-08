import React, { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    ArrowLeft,
    Check,
    Zap,
    FileText,
    Shield,
    Clock,
    ChevronDown,
    Brain,
    Users,
    Database,
    Lock,
    Smartphone,
    TrendingUp,
    Sparkles,
    Server,
    Eye,
    CheckCircle2,
    AlertTriangle,
    MessageSquare,
    ClipboardCheck,
    Bot
} from 'lucide-react';
import {
    motion,
    useTransform,
    useScroll
} from 'framer-motion';

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
  `}</style>
);

/* -------------------------------------------------------------------------- */
/* LOGO FINEM                                                                  */
/* -------------------------------------------------------------------------- */

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
                style={{ background: 'linear-gradient(to bottom, rgba(2, 4, 16, 0.95) 0%, rgba(2, 4, 16, 0.6) 60%, transparent 100%)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
            />
            <div className="container mx-auto px-6 md:px-12 relative z-10 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link to="/" className="hover:opacity-80 transition-opacity">
                        <LogoFinem className="h-8 md:h-10 w-auto text-white" />
                    </Link>
                    <div className="hidden md:block h-8 w-px bg-white/10" />
                    <span className="hidden md:block text-[10px] tracking-[0.3em] text-slate-400 uppercase">
                        Propuesta Finem Agents 2026
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/" className="hidden md:flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-slate-400 hover:text-white uppercase transition-colors">
                        <ArrowLeft className="w-3 h-3" /> Regresar
                    </Link>
                    <motion.button
                        onClick={() => scrollToSection('solucion')}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-md group cursor-pointer"
                    >
                        <span className="text-[9px] font-bold tracking-[0.3em] text-white uppercase">Ver Solución</span>
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
                    Propuesta Tecnológica · Líderes Políticos
                </span>
            </motion.div>

            <div className="mb-8 md:mb-12">
                <motion.div variants={itemVariants}>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-[1.1] text-white pb-2">
                        Su Equipo Político
                    </h1>
                </motion.div>
                <motion.div variants={itemVariants}>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-[1.1] pb-4">
                        <span className="text-transparent bg-clip-text animate-gradient-flow" style={{ backgroundImage: 'linear-gradient(135deg, #e8cc7e, #C8A84E, #a8842e, #C8A84E)' }}>
                            Opera las 24 Horas.
                        </span>
                        <br />
                        <span className="text-transparent bg-clip-text animate-gradient-flow" style={{ backgroundImage: 'linear-gradient(135deg, #C8A84E, #e8cc7e, #C8A84E)', animationDelay: '-2s' }}>
                            Sin Pausa. Sin Errores.
                        </span>
                    </h1>
                </motion.div>
            </div>

            <motion.div variants={itemVariants} className="max-w-2xl mb-12">
                <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                    Imagine que cada ciudadano que escribe por WhatsApp recibe respuesta inmediata, su agenda se organiza sola, sus redes publican contenido estratégico todos los días, y usted recibe un resumen ejecutivo cada mañana.{' '}
                    <span style={{ color: '#C8A84E' }} className="font-medium">Eso son los Agentes de IA de Finem.</span>
                </p>
            </motion.div>

            {/* Agent typing indicator */}
            <motion.div variants={itemVariants} className="flex items-center gap-6 mb-12">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 agent-pulse" style={{ background: 'rgba(200,168,78,0.15)', border: '1px solid rgba(200,168,78,0.3)' }}>
                    <Bot className="w-7 h-7" style={{ color: '#C8A84E' }} />
                </div>
                <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-full" style={{ background: 'rgba(200,168,78,0.08)', border: '1px solid rgba(200,168,78,0.15)' }}>
                    <div className="typing-dot" style={{ animationDelay: '0s' }} />
                    <div className="typing-dot" style={{ animationDelay: '0.2s' }} />
                    <div className="typing-dot" style={{ animationDelay: '0.4s' }} />
                </div>
                <span className="hidden sm:block text-slate-500 text-sm italic">
                    "Agente Ciudadano respondiendo: Buen día, su solicitud sobre el bache en Av. Tulum fue turnada a Obras Públicas..."
                </span>
            </motion.div>

            <motion.div variants={itemVariants}>
                <motion.button
                    onClick={() => document.getElementById('problema')?.scrollIntoView({ behavior: 'smooth' })}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="group relative px-10 py-5 bg-white text-black font-bold tracking-[0.15em] text-[11px] uppercase overflow-hidden transition-all duration-500 rounded-lg cursor-pointer"
                >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to right, #C8A84E, #e8cc7e, #C8A84E)' }} />
                    <div className="absolute inset-[2px] bg-white group-hover:bg-black transition-colors duration-500 rounded-md" />
                    <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500">
                        Descubra la Transformación
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
/* PROBLEMA SECTION                                                            */
/* -------------------------------------------------------------------------- */

const ProblemaSection = memo(() => {
    const problems = [
        { icon: Clock, metric: "200+", label: "mensajes/día sin responder", desc: "Ciudadanos que escriben por WhatsApp y redes esperando horas o días por una respuesta." },
        { icon: AlertTriangle, metric: "0 posts", label: "en días sin CM", desc: "Cuando el community manager falta o está saturado, las redes del político se detienen." },
        { icon: TrendingUp, metric: "Sin monitoreo", label: "de percepción", desc: "No hay forma de saber qué se dice del político en medios y redes hasta que es demasiado tarde." },
        { icon: FileText, metric: "Compromisos", label: "sin seguimiento", desc: "Promesas hechas en eventos y reuniones que se pierden porque nadie les da seguimiento sistemático." },
    ];

    const todaySteps = [
        "Ciudadano escribe por WhatsApp",
        "Nadie responde hasta que alguien revise el teléfono",
        "El equipo busca la información para responder",
        "Community manager crea contenido cuando puede",
        "Reportes de percepción se hacen cada trimestre (si acaso)",
        "La agenda se gestiona entre 3 personas con errores",
        "Total: horas perdidas cada día, ciudadanos ignorados",
    ];

    const finemSteps = [
        "Ciudadano escribe por WhatsApp",
        "Agente IA responde en segundos, 24/7",
        "Petición registrada y clasificada automáticamente",
        "Contenido de redes generado y publicado cada día",
        "Alertas de percepción pública en tiempo real",
        "Total: 0 mensajes sin responder, 24/7 operando",
    ];

    return (
        <section id="problema" className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(200,168,78,0.07) 0%, transparent 70%)' }} />
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>

                    {/* Left — Before / After */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        {/* HOY */}
                        <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-red-500/15">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <span className="text-red-400 font-bold text-xs uppercase tracking-[0.2em]">Hoy: Operación Manual</span>
                            </div>
                            <div className="space-y-3">
                                {todaySteps.map((step, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span className="text-red-500/40 text-xs font-mono w-6">{String(i + 1).padStart(2, '0')}</span>
                                        <span className={`text-sm ${i === 6 ? 'text-red-400 font-bold' : 'text-slate-400'}`}>{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CON FINEM AGENTS */}
                        <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02]" style={{ border: '1px solid rgba(200,168,78,0.2)' }}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#C8A84E' }} />
                                <span className="font-bold text-xs uppercase tracking-[0.2em]" style={{ color: '#C8A84E' }}>Con Finem Agents</span>
                            </div>
                            <div className="space-y-3">
                                {finemSteps.map((step, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span className="text-xs font-mono w-6" style={{ color: 'rgba(200,168,78,0.4)' }}>{String(i + 1).padStart(2, '0')}</span>
                                        <span className={`text-sm ${i === 5 ? 'font-bold' : 'text-slate-300'}`} style={i === 5 ? { color: '#C8A84E' } : {}}>{step}</span>
                                        {i > 0 && i < 5 && <CheckCircle2 className="w-4 h-4 ml-auto flex-shrink-0" style={{ color: 'rgba(200,168,78,0.5)' }} />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right — Narrative */}
                    <motion.div variants={itemVariants}>
                        <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(200,168,78,0.8)' }}>
                            <span className="w-8 h-px" style={{ background: 'rgba(200,168,78,0.5)' }} />
                            El Diagnóstico
                        </span>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-8">
                            Su Equipo Político<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">
                                No Da Abasto
                            </span>
                        </h2>

                        <div className="space-y-6 mb-10">
                            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                                Hoy, cada mensaje ciudadano requiere que alguien de su equipo deje de hacer lo que está haciendo para responder manualmente. Es como si un cirujano tuviera que detenerse a mitad de operación para contestar el teléfono.
                            </p>
                            <p className="text-slate-400 leading-relaxed">
                                Los cientos de mensajes diarios en WhatsApp, las publicaciones en redes que nunca se hacen, los compromisos que se pierden en libretas, y la falta de monitoreo de lo que se dice del político en medios — todo eso son horas perdidas y oportunidades desperdiciadas cada día.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {problems.map((p, i) => (
                                <div key={i} className="group p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-all duration-500" style={{ ':hover': { borderColor: 'rgba(200,168,78,0.2)' } }}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,168,78,0.2)'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}>
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(200,168,78,0.1)' }}>
                                        <p.icon className="w-5 h-5" style={{ color: '#C8A84E' }} />
                                    </div>
                                    <span className="text-xl font-bold text-white block">{p.metric}</span>
                                    <span className="text-xs" style={{ color: '#C8A84E' }}>{p.label}</span>
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
ProblemaSection.displayName = 'ProblemaSection';

/* -------------------------------------------------------------------------- */
/* SOLUCIÓN SECTION                                                            */
/* -------------------------------------------------------------------------- */

const SolucionSection = memo(() => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const leftCards = [
        {
            icon: MessageSquare,
            title: "Agente Ciudadano",
            description: "Responde automáticamente por WhatsApp a consultas ciudadanas: horarios de atención, estado de peticiones, información sobre programas. Registra solicitudes, clasifica urgencias y escala a equipo humano cuando detecta temas sensibles.",
            detail: "Como tener un asistente que nunca duerme y conoce toda su gestión.",
        },
        {
            icon: Sparkles,
            title: "Agente de Comunicación",
            description: "Genera contenido diario para Instagram, Facebook y X adaptado al tono del político. Crea imágenes, mantiene un calendario editorial, y publica automáticamente en los horarios óptimos de cada plataforma.",
            detail: "Su community manager con IA que nunca falta y siempre publica.",
        },
    ];

    const rightCards = [
        {
            icon: Brain,
            title: "Asistente Estratégico",
            description: "Hub central del político vía WhatsApp. Gestiona agenda en Google Calendar, resume correos prioritarios, delega tareas a otros agentes, y envía cada mañana un resumen ejecutivo: peticiones nuevas, métricas de redes, menciones en medios.",
            detail: "Su jefe de staff digital que coordina todo.",
        },
        {
            icon: Eye,
            title: "Agente de Percepción",
            description: "Monitorea en tiempo real lo que se dice del político en redes y medios. Clasifica por sentimiento, detecta crisis reputacionales antes de que escalen, e identifica oportunidades de posicionamiento.",
            detail: "Alertas instantáneas — nunca más enterarse tarde.",
        },
    ];

    return (
        <section id="solucion" ref={sectionRef} className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-visible pointer-events-none blur-[100px]" style={{ transform: 'translate3d(0,0,0)' }}>
                <motion.div style={{ y: backgroundY }} className="absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full gpu-layer">
                    <div className="w-full h-full rounded-full" style={{ background: '#7c3aed', opacity: 0.2 }} />
                </motion.div>
                <motion.div style={{ y: backgroundY }} className="absolute bottom-[-15%] left-[-5%] w-[50vw] h-[50vw] rounded-full gpu-layer">
                    <div className="w-full h-full rounded-full" style={{ background: '#C8A84E', opacity: 0.1 }} />
                </motion.div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div className="mb-16 md:mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
                    <motion.div variants={itemVariants}>
                        <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(200,168,78,0.8)' }}>
                            <span className="w-8 h-px" style={{ background: 'rgba(200,168,78,0.5)' }} />
                            Así Funciona
                        </span>
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
                        6 Agentes. Cero Desgaste.
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                        Su equipo no necesita aprender tecnología. Los agentes trabajan en segundo plano, las 24 horas, ejecutando lo que hoy requiere 5-8 personas.{' '}
                        <span className="text-white font-medium">La tecnología se adapta al político, no al revés.</span>
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {/* LA ATENCIÓN */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: 'rgba(200,168,78,0.2)', border: '1px solid rgba(200,168,78,0.3)' }}>
                                    <Users className="w-7 h-7" style={{ color: '#C8A84E' }} />
                                </div>
                                <div>
                                    <span className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: '#C8A84E' }}>Atención</span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white">El Ciudadano Siempre Atendido</h3>
                                </div>
                            </div>
                            <p className="text-slate-400 text-lg">
                                Todo comienza con el ciudadano. Cada mensaje, cada llamada, cada solicitud —{' '}
                                <span className="text-white">atendida al instante.</span>
                            </p>
                        </motion.div>
                        <div className="space-y-4">
                            {leftCards.map((item) => (
                                <motion.div key={item.title} variants={itemVariants}
                                    className="group p-5 rounded-xl bg-[#0a0a1a]/80 border border-white/[0.06] transition-all duration-500"
                                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,168,78,0.3)'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(200,168,78,0.1)' }}>
                                            <item.icon className="w-5 h-5" style={{ color: '#C8A84E' }} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold mb-1 transition-colors" style={{}} onMouseEnter={e => e.currentTarget.style.color = '#e8cc7e'} onMouseLeave={e => e.currentTarget.style.color = 'white'}>{item.title}</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed mb-2">{item.description}</p>
                                            <p className="text-xs font-medium flex items-center gap-2" style={{ color: '#C8A84E' }}>
                                                <Sparkles className="w-3.5 h-3.5" />{item.detail}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* LA ESTRATEGIA */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-purple-500/20 border border-purple-500/30">
                                    <Zap className="w-7 h-7 text-purple-400" />
                                </div>
                                <div>
                                    <span className="text-[10px] tracking-[0.3em] text-purple-400 uppercase font-bold">Estrategia</span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white">Decisiones con Inteligencia</h3>
                                </div>
                            </div>
                            <p className="text-slate-400 text-lg">
                                Los agentes no solo ejecutan — analizan, resumen y alertan.{' '}
                                <span className="text-white">El político decide con información, no con intuición.</span>
                            </p>
                        </motion.div>
                        <div className="space-y-4">
                            {rightCards.map((item) => (
                                <motion.div key={item.title} variants={itemVariants}
                                    className="group p-5 rounded-xl bg-[#0a0a1a]/80 border border-white/[0.06] hover:border-purple-500/30 transition-all duration-500">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold mb-1 group-hover:text-purple-300 transition-colors">{item.title}</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed mb-2">{item.description}</p>
                                            <p className="text-purple-400 text-xs font-medium flex items-center gap-2">
                                                <Sparkles className="w-3.5 h-3.5" />{item.detail}
                                            </p>
                                        </div>
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
SolucionSection.displayName = 'SolucionSection';

/* -------------------------------------------------------------------------- */
/* BENEFICIOS SECTION                                                          */
/* -------------------------------------------------------------------------- */

const BeneficiosSection = memo(() => {
    const benefits = [
        { icon: Clock, title: "24/7 Sin Interrupción", desc: "Los agentes trabajan mientras su equipo descansa. Cada mensaje ciudadano se responde, cada publicación se programa, cada alerta se genera — las 24 horas del día, los 365 días del año." },
        { icon: Shield, title: "Aislamiento Total de Datos", desc: "Cada político tiene sus datos completamente aislados. Ni siquiera un error de programación podría filtrar información entre cuentas. Seguridad a nivel de base de datos." },
        { icon: Users, title: "CRM Político Integrado", desc: "Directorio inteligente de ciudadanos, líderes comunitarios y aliados. Se alimenta automáticamente con cada interacción. Seguimiento de compromisos y reuniones." },
        { icon: TrendingUp, title: "Dashboard en Tiempo Real", desc: "Mensajes procesados, engagement en redes, percepción pública, peticiones por colonia — la información que necesita para decidir, actualizada al instante." },
        { icon: Smartphone, title: "WhatsApp como Canal Principal", desc: "El canal que ya usan sus ciudadanos. Sin apps que descargar, sin registros complicados. El ciudadano escribe como siempre y recibe respuesta inteligente." },
        { icon: Brain, title: "IA Multi-Modelo Inteligente", desc: "No dependemos de un solo proveedor. Usamos Claude, GPT y Gemini según la tarea, con fallback automático. Si un modelo falla, otro toma su lugar sin que nadie lo note." },
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
                        Lo Que Gana Su Operación
                        <span className="w-8 h-px" style={{ background: 'rgba(200,168,78,0.5)' }} />
                    </motion.span>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
                        Más Alcance. Cero Desgaste.
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-slate-400 text-lg max-w-2xl mx-auto">
                        No es solo tecnología. Es <span className="text-white font-medium">más ciudadanos atendidos, mejor imagen pública y control total</span> de su operación política desde cualquier lugar.
                    </motion.p>
                </motion.div>

                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    {benefits.map((b) => (
                        <motion.div key={b.title} variants={itemVariants}
                            className="group p-6 rounded-xl bg-[#0a0a1a]/80 border border-white/[0.06] transition-all duration-500"
                            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,168,78,0.2)'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors" style={{ background: 'rgba(200,168,78,0.1)' }}>
                                <b.icon className="w-6 h-6" style={{ color: '#C8A84E' }} />
                            </div>
                            <h4 className="text-white font-bold text-lg mb-2">{b.title}</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
});
BeneficiosSection.displayName = 'BeneficiosSection';

/* -------------------------------------------------------------------------- */
/* SEGURIDAD SECTION                                                           */
/* -------------------------------------------------------------------------- */

const SeguridadSection = memo(() => {
    const norms = [
        { code: "AISLAMIENTO", title: "Multi-Tenancy Blindado", desc: "Row-Level Security en PostgreSQL. Cada político ve solo sus datos. Incluso los embeddings vectoriales están segregados por tenant. Imposible acceder a información ajena.", icon: Lock },
        { code: "TRAZABILIDAD", title: "Auditoría Completa", desc: "Cada acción de cada agente queda registrada: quién hizo qué, cuándo, con qué modelo, cuánto costó. Registro inmutable para rendición de cuentas.", icon: ClipboardCheck },
        { code: "GUARDRAILS", title: "Control de Contenido", desc: "Los agentes no pueden generar contenido electoral ilegal, revelar datos de otros políticos, ni ejecutar acciones destructivas sin confirmación. Validación pre y post respuesta.", icon: Shield },
        { code: "OBSERVABILIDAD", title: "Monitoreo LLM con Langfuse", desc: "Cada llamada a inteligencia artificial queda registrada con tokens consumidos, costo, latencia y calidad. Detección temprana de agentes ineficientes o comportamiento anómalo.", icon: Eye },
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
                    {/* Left */}
                    <motion.div variants={itemVariants}>
                        <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-emerald-500/80 uppercase mb-6">
                            <span className="w-8 h-px bg-emerald-500/50" />
                            Seguridad y Confianza
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-8">
                            Diseñado para<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                                la Política en México
                            </span>
                        </h2>
                        <div className="space-y-6">
                            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                                En política, una filtración de datos o una respuesta inapropiada puede destruir una carrera. <span className="text-white font-medium">Cada agente opera bajo guardrails estrictos que garantizan seguridad, trazabilidad y control total.</span>
                            </p>
                            <p className="text-slate-400 leading-relaxed">
                                No tendrá que preocuparse por respuestas fuera de tono ni por datos comprometidos. Nosotros diseñamos cada guardrail pensando en el contexto político mexicano.
                            </p>
                        </div>
                    </motion.div>
                    {/* Right */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        {norms.map((n) => (
                            <div key={n.code} className="group p-5 rounded-xl bg-[#0a0a1a]/80 border border-white/[0.06] hover:border-emerald-500/30 transition-all duration-500">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                        <n.icon className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] tracking-[0.2em] text-emerald-400 uppercase font-bold">{n.code}</span>
                                            <span className="text-white/20">·</span>
                                            <span className="text-white font-semibold group-hover:text-emerald-100 transition-colors">{n.title}</span>
                                        </div>
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
SeguridadSection.displayName = 'SeguridadSection';

/* -------------------------------------------------------------------------- */
/* ROADMAP SECTION                                                             */
/* -------------------------------------------------------------------------- */

const RoadmapSection = memo(() => {
    const phases = [
        {
            number: "00", title: "Los Cimientos", timeline: "Semanas 1–4", icon: Server,
            gradient: "from-yellow-500/20 to-yellow-600/10", borderColor: "border-yellow-600/30",
            iconBg: "bg-yellow-600/20", iconColor: "text-yellow-500",
            objetivo: "Infraestructura completa: autenticación, base de datos multi-tenant, pagos con Stripe, y el motor base de agentes funcionando.",
            entregable: "Monorepo desplegado + Auth con Magic Link + BD con Row-Level Security + Dashboard base + Stripe integrado + Motor de agentes Python conectado.",
        },
        {
            number: "01", title: "Primer Agente en Vivo", timeline: "Semanas 5–8", icon: MessageSquare,
            gradient: "from-yellow-500/15 to-purple-600/10", borderColor: "border-yellow-600/25",
            iconBg: "bg-yellow-600/20", iconColor: "text-yellow-500",
            objetivo: "El Agente Ciudadano respondiendo en WhatsApp con la knowledge base del político. RAG funcionando, métricas visibles.",
            entregable: "Agente Ciudadano en WhatsApp real + Knowledge Base con documentos del político + Panel de métricas + Escalamiento a equipo humano.",
        },
        {
            number: "02", title: "Comunicación y Estrategia", timeline: "Semanas 9–14", icon: Sparkles,
            gradient: "from-purple-500/20 to-purple-600/10", borderColor: "border-purple-500/30",
            iconBg: "bg-purple-500/20", iconColor: "text-purple-400",
            objetivo: "Agente de Comunicación publicando en redes + Asistente Estratégico como hub central del político.",
            entregable: "Posts auto-generados en IG/FB + Calendario editorial + Google Calendar integrado + Resúmenes ejecutivos diarios + Delegación inter-agentes.",
        },
        {
            number: "03", title: "Expansión y CRM", timeline: "Meses 4–6", icon: Users,
            gradient: "from-purple-500/15 to-blue-600/10", borderColor: "border-purple-500/25",
            iconBg: "bg-purple-500/20", iconColor: "text-purple-400",
            objetivo: "Agentes de Vinculación y Percepción activos. Mini-CRM político integrado con directorio de actores clave.",
            entregable: "Agente de Vinculación + Agente de Percepción + CRM con contactos categorizados + Alertas de crisis reputacional + Analytics avanzado.",
        },
        {
            number: "04", title: "Landing y Lanzamiento", timeline: "Mes 5–6", icon: Zap,
            gradient: "from-blue-500/20 to-blue-600/10", borderColor: "border-blue-500/30",
            iconBg: "bg-blue-500/20", iconColor: "text-blue-400",
            objetivo: "Sitio público listo, onboarding automatizado y primeros clientes pagando.",
            entregable: "Landing con pricing + Flujo de onboarding completo + Documentación para el político + Primeros beta testers activos.",
        },
        {
            number: "05", title: "Plataforma de Orquestación", timeline: "Mes 7+", icon: Brain,
            gradient: "from-teal-500/20 to-teal-600/10", borderColor: "border-teal-500/30",
            iconBg: "bg-teal-500/20", iconColor: "text-teal-400",
            objetivo: "Evolución a Fase 2: el político puede personalizar, crear y coordinar agentes propios.",
            entregable: "Agent Builder no-code + Diagnóstico IA + Knowledge Chat para todo el equipo + Orquestación visible en dashboard + Trazabilidad total.",
        },
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
                        Plan de Trabajo
                        <span className="w-8 h-px" style={{ background: 'rgba(200,168,78,0.5)' }} />
                    </motion.span>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
                        6 Fases. Resultados Desde el Mes 2.
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-slate-400 text-lg max-w-2xl mx-auto">
                        No esperamos 6 meses para mostrar resultados. <span className="text-white font-medium">Cada fase entrega algo funcional</span> que usted puede probar y validar con ciudadanos reales.
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
                                            <div className={`w-12 h-12 rounded-xl ${phase.iconBg} flex items-center justify-center`}>
                                                <phase.icon className={`w-6 h-6 ${phase.iconColor}`} />
                                            </div>
                                            <div className={index % 2 === 0 ? 'lg:text-right' : ''}>
                                                <span className={`text-[10px] tracking-[0.3em] ${phase.iconColor} uppercase font-bold`}>
                                                    Fase {phase.number} · {phase.timeline}
                                                </span>
                                                <h3 className="text-xl md:text-2xl font-bold text-white">{phase.title}</h3>
                                            </div>
                                        </div>
                                        <div className={`space-y-3 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                                            <p className="text-slate-400"><span className="text-white font-medium">Objetivo: </span>{phase.objetivo}</p>
                                            <p className="text-slate-500 text-sm"><span className="text-slate-300 font-medium">Lo que recibe: </span>{phase.entregable}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#020410] border-2 z-10" style={{ borderColor: '#C8A84E' }} />
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

/* -------------------------------------------------------------------------- */
/* OFFER SECTION                                                               */
/* -------------------------------------------------------------------------- */

const OfferSection = memo(() => {
    const includes = [
        { icon: Brain, text: "6 Agentes IA especializados para política" },
        { icon: MessageSquare, text: "WhatsApp Business como canal principal de atención ciudadana" },
        { icon: Shield, text: "Aislamiento total de datos con Row-Level Security" },
        { icon: TrendingUp, text: "Dashboard con métricas en tiempo real" },
        { icon: Database, text: "Knowledge Base con documentos del político (RAG)" },
        { icon: Eye, text: "Monitoreo de percepción pública y alertas de crisis" },
    ];

    const plans = [
        {
            label: "Distrital",
            subtitle: "Para regidores y líderes locales",
            price: "$9,500",
            currency: "MXN/mes",
            features: ["2 agentes activos", "WhatsApp + 1 red social", "1 usuario del equipo", "10 documentos en Knowledge Base", "CRM básico (500 contactos)", "Reportes mensuales", "Soporte por email (48h)", "Trial gratuito de 7 días"],
            highlighted: false,
        },
        {
            label: "Legislador",
            badge: "Recomendado",
            subtitle: "Para diputados, senadores y alcaldes",
            price: "$14,500",
            currency: "MXN/mes",
            features: ["5 agentes activos", "Todas las integraciones estándar", "3 usuarios del equipo", "50 documentos en Knowledge Base", "CRM completo (5,000 contactos)", "Reportes semanales + alertas", "Soporte prioritario (24h)", "Trial gratuito de 7 días"],
            highlighted: true,
        },
        {
            label: "Gobernanza",
            subtitle: "Para gobernadores y líderes de alto nivel",
            price: "desde $27,000",
            currency: "MXN/mes",
            features: ["Todos los agentes + custom", "Todas las integraciones + custom", "Usuarios ilimitados", "Knowledge Base ilimitada", "CRM ilimitado", "Dashboard en tiempo real", "Soporte dedicado + onboarding personalizado", "Demo personalizada (sin trial)"],
            highlighted: false,
        },
    ];

    const costs = [
        { name: "Inteligencia Artificial (Claude, GPT, Gemini)", range: "Incluido" },
        { name: "WhatsApp Business API", range: "Incluido" },
        { name: "Generación de imágenes (DALL-E)", range: "Incluido" },
        { name: "Hosting e infraestructura", range: "Incluido" },
    ];

    const comparison = [
        { role: "Community Manager", human: "$18,000 MXN" },
        { role: "Asistente personal / agenda", human: "$15,000 MXN" },
        { role: "Atención ciudadana", human: "$12,000 MXN" },
        { role: "Monitoreo de medios", human: "$8,000 MXN" },
        { role: "Diseñador de contenido", human: "$12,000 MXN" },
    ];

    return (
        <section className="relative py-24 md:py-32">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    <motion.div variants={itemVariants} className="text-center mb-12">
                        <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(200,168,78,0.8)' }}>
                            <span className="w-8 h-px" style={{ background: 'rgba(200,168,78,0.5)' }} />
                            La Inversión
                            <span className="w-8 h-px" style={{ background: 'rgba(200,168,78,0.5)' }} />
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
                            Planes Para Cada Nivel Político
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            No es un gasto — es multiplicar la capacidad de su equipo político por una fracción del costo de contratar personal. <span className="text-white font-medium">Su equipo humano equivalente le costaría $65,000+ MXN/mes.</span>
                        </p>
                    </motion.div>

                    {/* "Lo que incluye" */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <p className="text-slate-300 text-sm uppercase tracking-widest mb-6 text-center">Lo que incluye cada plan</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {includes.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 text-left">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(200,168,78,0.1)' }}>
                                        <item.icon className="w-5 h-5" style={{ color: '#C8A84E' }} />
                                    </div>
                                    <span className="text-slate-300 text-sm">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Pricing cards */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {plans.map((plan) => (
                            <div key={plan.label}
                                className="relative p-8 rounded-2xl flex flex-col transition-all duration-500"
                                style={plan.highlighted
                                    ? { background: 'linear-gradient(135deg, rgba(200,168,78,0.12), #0a0a1a, rgba(124,58,237,0.08))', border: '1px solid rgba(200,168,78,0.35)', transform: 'scale(1.03)' }
                                    : { background: 'rgba(10,10,26,0.8)', border: '1px solid rgba(255,255,255,0.06)' }
                                }>
                                {plan.badge && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-black" style={{ background: '#C8A84E' }}>
                                        {plan.badge}
                                    </div>
                                )}
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-white mb-1">{plan.label}</h3>
                                    <p className="text-slate-500 text-sm">{plan.subtitle}</p>
                                </div>
                                <div className="mb-6">
                                    <span className="text-4xl font-black text-white">{plan.price}</span>
                                    <span className="text-slate-400 text-sm ml-2">{plan.currency}</span>
                                </div>
                                <ul className="space-y-3 mb-8 flex-1">
                                    {plan.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                                            <div className="w-4 h-4 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0" style={{ background: 'rgba(200,168,78,0.15)' }}>
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C8A84E' }} />
                                            </div>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <a href="https://wa.me/529984750514?text=Hola%2C%20me%20interesa%20una%20demo%20de%20Finem%20Agents%20para%20mi%20operación%20política"
                                    target="_blank" rel="noopener noreferrer"
                                    className="block text-center py-3 px-6 rounded-xl text-sm font-bold tracking-wide transition-all duration-300"
                                    style={plan.highlighted
                                        ? { background: '#C8A84E', color: '#000' }
                                        : { background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
                                    }>
                                    {plan.label === 'Gobernanza' ? 'Solicitar Demo' : 'Comenzar Trial'}
                                </a>
                            </div>
                        ))}
                    </motion.div>

                    {/* Costos operativos */}
                    <motion.div variants={itemVariants} className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-8 text-left">
                        <p className="text-slate-300 text-sm font-bold uppercase tracking-widest mb-6 text-center">
                            Costos operativos incluidos en el precio del plan
                        </p>
                        <div className="space-y-4">
                            {costs.map((c, i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                                    <span className="text-slate-400 text-sm">{c.name}</span>
                                    <span className="text-sm font-medium" style={{ color: '#C8A84E' }}>{c.range}</span>
                                </div>
                            ))}
                            <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: 'rgba(200,168,78,0.2)' }}>
                                <span className="text-white text-sm font-bold">Flat-rate. Sin sorpresas.</span>
                                <span className="text-sm font-bold" style={{ color: '#C8A84E' }}>Sin cobros por token.</span>
                            </div>
                        </div>
                        <p className="text-slate-600 text-xs text-center mt-4">
                            *Uso razonable incluido en cada plan. Si su operación excede 3x el promedio, lo contactamos para upgrade.
                        </p>
                    </motion.div>

                    {/* Comparativa */}
                    <motion.div variants={itemVariants} className="p-6 md:p-8 rounded-2xl" style={{ background: 'rgba(200,168,78,0.05)', border: '1px solid rgba(200,168,78,0.2)' }}>
                        <h3 className="text-white font-bold text-xl mb-6 text-center">Comparativa: Su Equipo Humano vs. Finem Agents</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                                        <th className="text-left text-slate-400 font-medium pb-3">Función</th>
                                        <th className="text-center text-slate-400 font-medium pb-3">Costo Humano/Mes</th>
                                        <th className="text-center text-slate-400 font-medium pb-3">Plan Legislador</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparison.map((row, i) => (
                                        <tr key={i} className="border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                                            <td className="text-slate-300 py-3">{row.role}</td>
                                            <td className="text-center text-slate-400 py-3">{row.human}</td>
                                            <td className="text-center py-3">
                                                <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ color: '#C8A84E', background: 'rgba(200,168,78,0.1)' }}>✓ Incluido</span>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td className="text-white font-bold py-3">Total</td>
                                        <td className="text-center text-slate-300 font-bold py-3">$65,000 MXN</td>
                                        <td className="text-center py-3 font-black text-lg" style={{ color: '#C8A84E' }}>$9,500 MXN</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-center mt-4 font-bold" style={{ color: '#C8A84E' }}>Ahorro del 85% vs. equipo humano equivalente.</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
});
OfferSection.displayName = 'OfferSection';

/* -------------------------------------------------------------------------- */
/* CTA SECTION                                                                 */
/* -------------------------------------------------------------------------- */

const CTASection = memo(() => {
    const steps = [
        "Agenda una demo personalizada",
        "Conectamos sus canales en 48 horas",
        "Su primer agente responde esta semana",
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
                        ¿Listo para multiplicar<br />su equipo político?
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-slate-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                        El liderazgo político del futuro opera con inteligencia artificial. Sus ciudadanos merecen respuestas inmediatas. Su imagen merece contenido constante. Su equipo merece herramientas que multipliquen su capacidad.
                    </motion.p>
                    <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-12">
                        {steps.map((step, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(200,168,78,0.2)', border: '1px solid rgba(200,168,78,0.3)' }}>
                                    <span className="text-sm font-bold" style={{ color: '#C8A84E' }}>{index + 1}</span>
                                </div>
                                <span className="text-slate-300 text-sm">{step}</span>
                            </div>
                        ))}
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <motion.a
                            href="https://wa.me/529984750514?text=Hola%2C%20me%20interesa%20una%20demo%20de%20Finem%20Agents%20para%20mi%20operación%20política"
                            target="_blank" rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            className="group relative inline-flex px-12 py-6 bg-white text-black font-bold tracking-[0.15em] text-sm uppercase overflow-hidden transition-all duration-500 rounded-lg cursor-pointer"
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to right, #C8A84E, #e8cc7e, #C8A84E)' }} />
                            <div className="absolute inset-[2px] bg-white group-hover:bg-black transition-colors duration-500 rounded-md" />
                            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500">
                                Agendar Demo Ahora
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
                        <LogoFinem className="h-8 w-auto text-white/50 hover:text-white/70 transition-colors" />
                    </Link>
                    <span className="text-slate-600 text-sm">Propuesta Exclusiva Finem Agents 2026</span>
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

const LaNacionAIProposal = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <ProposalStyles />
            <ProposalNavbar />
            <main
                className="relative z-10"
                style={{ backgroundColor: '#020410', minHeight: '100vh' }}
            >
                <HeroSection />
                <ProblemaSection />
                <SolucionSection />
                <BeneficiosSection />
                <SeguridadSection />
                <RoadmapSection />
                <OfferSection />
                <CTASection />
            </main>
            <div style={{ backgroundColor: '#020410' }}>
                <ProposalFooter />
            </div>
        </>
    );
};

export default LaNacionAIProposal;