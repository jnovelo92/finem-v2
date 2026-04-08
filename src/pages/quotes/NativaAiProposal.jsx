import React, { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    ArrowLeft,
    Check,
    Zap,
    Mic,
    FileText,
    Shield,
    Clock,
    ChevronDown,
    Brain,
    Stethoscope,
    Building2,
    Users,
    Database,
    Lock,
    Smartphone,
    WifiOff,
    TrendingUp,
    Sparkles,
    Pill,
    Globe,
    Server,
    Eye,
    CheckCircle2,
    AlertTriangle,
    BarChart3,
    GraduationCap,
    BookOpen,
    MessageSquare,
    ClipboardCheck,
    Package,
    Activity
} from 'lucide-react';
import {
    motion,
    useTransform,
    useScroll
} from 'framer-motion';

/* -------------------------------------------------------------------------- */
/* ESTILOS ADICIONALES (solo los específicos de esta página)                   */
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

    @keyframes waveform {
      0%, 100% { height: 8px; }
      50% { height: 28px; }
    }

    .waveform-bar {
      width: 3px;
      border-radius: 3px;
      background: linear-gradient(to top, #f97316, #fb923c);
      animation: waveform 0.8s ease-in-out infinite;
    }
  `}</style>
);

/* -------------------------------------------------------------------------- */
/* LOGO FINEM                                                                  */
/* -------------------------------------------------------------------------- */

const LogoFinem = memo(({ className }) => (
    <svg
        className={className}
        viewBox="0 0 1664.2 706.9"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
    >
        <path d="M335.7,166.9h-133.6c0-18.8-15.3-34-34.2-34s-34.2,15.2-34.2,34h-.1v506c0,18.7-15.3,33.9-34.1,33.9H0V170.4C0,79.5,71.7,2.6,163.1,0c94.9-2.6,172.6,73,172.6,166.8Z" />
        <path d="M740,504v201.4h-99.3c-18.9,0-34.2-15.3-34.2-34.1v-167.3h-.1c0-18.7-15.3-34-34.2-34s-34.2,15.3-34.2,34h-.1v35.1c0,80.5-57.3,147.6-133.5,163.4-11.1,2.3-22.6,3.5-34.4,3.5s-23.2-1.2-34.2-3.5c-74.5-15.3-130.9-79.7-133.5-157.7v-172.7h133.5v167c0,18.8,15.3,34,34.2,34s34.2-15.2,34.2-34h.1v-31.6c0-91,71.8-167.9,163.2-170.3,94.8-2.5,172.5,73.1,172.5,166.8Z" />
        <path d="M268.9,304.4c18.9,0,34.2-15.2,34.2-34s-15.3-34-34.2-34-34.2,15.2-34.2,34,15.3,34,34.2,34Z" />
        <path d="M1664.2,507.9v197.9h-99.3c-18.9,0-34.2-15.2-34.2-34v-167.4h-.1c0-18.7-15.3-34-34.2-34s-34.2,15.3-34.2,34h-.1v201.4h-133.5v-201.4h-.1c0-18.7-15.3-34-34.2-34s-34.2,15.3-34.2,34h-.1v201.4h-99.4c-18.8,0-34.1-15.2-34.1-33.9v-163.9c0-92.4,74-169.9,166.9-170.4,38.3-.2,73.7,12.4,102,33.6,28.3-21.3,63.7-33.8,102-33.6,92.9.5,166.9,78,166.9,170.4Z" />
        <path d="M1087.1,624s0,.1-.1.2c-.2.4-.5.7-.7,1.1-14.4,23.6-34.6,43.4-58.6,57.4-.7.4-1.3.9-2,1.2-.6.4-1.3.8-2,1.1-24,13.3-51.6,20.8-81,20.8-92.8,0-168-74.8-168-167.1s64.2-155.5,147-165.8h0c6.9-.9,13.8-1.3,20.9-1.3s14.1.4,20.9,1.3h0c55,6.8,101.8,40.1,127,86.6l-113.9,79-43.2,29.9-10.8,7.5h0c-8.7,6.3-14.3,16.3-14.3,27.8,0,18.8,15.3,34,34.2,34s1.8,0,2.6-.1c.9,0,1.8-.2,2.6-.3.8-.1,1.6-.3,2.4-.5h.2c.8-.2,1.6-.4,2.4-.7.8-.3,1.6-.5,2.4-.9.8-.3,1.6-.6,2.3-1,1.5-.7,3-1.5,4.3-2.5l1.6-1.1,73.5-51,2.1-1.4c10.6-6.7,24.4-7.4,36-.6,16.2,9.5,21.5,30.3,12,46.5Z" />
    </svg>
));

LogoFinem.displayName = 'LogoFinem';

/* -------------------------------------------------------------------------- */
/* ANIMATION VARIANTS (reutilizables)                                          */
/* -------------------------------------------------------------------------- */

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
    },
};

const lineReveal = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 1, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 },
    },
};

/* -------------------------------------------------------------------------- */
/* NAVBAR PROPUESTA                                                            */
/* -------------------------------------------------------------------------- */

const ProposalNavbar = memo(() => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav
            className={`fixed top-0 w-full z-[100] transition-all duration-700 ${isScrolled ? "py-4" : "py-6 md:py-8"
                }`}
        >
            <div
                className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${isScrolled ? "opacity-100" : "opacity-0"
                    }`}
                style={{
                    background: 'linear-gradient(to bottom, rgba(2, 4, 16, 0.95) 0%, rgba(2, 4, 16, 0.6) 60%, transparent 100%)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                }}
            />

            <div className="container mx-auto px-6 md:px-12 relative z-10 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link to="/" className="hover:opacity-80 transition-opacity">
                        <LogoFinem className="h-8 md:h-10 w-auto text-white" />
                    </Link>
                    <div className="hidden md:block h-8 w-px bg-white/10" />
                    <span className="hidden md:block text-[10px] tracking-[0.3em] text-slate-400 uppercase">
                        Propuesta Nativa AI 2026
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="hidden md:flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-slate-400 hover:text-white uppercase transition-colors"
                    >
                        <ArrowLeft className="w-3 h-3" />
                        Regresar
                    </Link>

                    <motion.button
                        onClick={() => scrollToSection('solucion')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-md group cursor-pointer"
                    >
                        <span className="text-[9px] font-bold tracking-[0.3em] text-white uppercase">Ver Solución</span>
                        <div className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500"></span>
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

const HeroSection = memo(() => {
    return (
        <header className="relative z-10 min-h-screen w-full flex flex-col justify-center pt-24 pb-20">
            {/* Background */}
            <div className="absolute inset-0" style={{
                background: 'linear-gradient(to bottom, #020410 0%, #020410 70%, transparent 100%)'
            }} />

            {/* Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none blur-3xl"
                style={{ transform: 'translate3d(0, 0, 0)' }}>
                <div
                    className="absolute -left-[10%] top-[5%] w-[60vw] h-[60vw] md:w-[45vw] md:h-[45vw] rounded-full animate-blob gpu-layer"
                    style={{ background: '#f97316', opacity: 0.4 }}
                />
                <div
                    className="absolute right-[-10%] top-[15%] w-[35vw] h-[35vw] md:w-[40vw] md:h-[40vw] rounded-full animate-blob-reverse gpu-layer"
                    style={{ background: '#7c3aed', opacity: 0.3 }}
                />
                <div
                    className="absolute bottom-[10%] left-[20%] w-[25vw] h-[25vw] rounded-full animate-pulse-glow gpu-layer"
                    style={{ background: '#f97316', opacity: 0.25 }}
                />
            </div>

            {/* Content */}
            <motion.div
                className="container mx-auto max-w-6xl px-6 md:px-12 relative z-30"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
                    <motion.span
                        variants={lineReveal}
                        className="w-12 md:w-16 h-[1px] bg-gradient-to-r from-orange-500 to-orange-500/0"
                    />
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-orange-200/70 font-medium">
                        Propuesta Tecnológica · Nativa SC
                    </span>
                </motion.div>

                <div className="mb-8 md:mb-12">
                    <motion.div variants={itemVariants}>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-[1.1] text-white pb-2">
                            Su Consultorio
                        </h1>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-[1.1] pb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-300 via-orange-500 via-40% to-orange-400 to-90% animate-gradient-flow">
                                Opera con la Voz.
                            </span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-orange-300 via-50% to-orange-500 animate-gradient-flow" style={{ animationDelay: '-2s' }}>
                                Sin Teclear. Sin Errores.
                            </span>
                        </h1>
                    </motion.div>
                </div>

                <motion.div variants={itemVariants} className="max-w-2xl mb-12">
                    <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                        Imagine que el doctor solo <span className="text-white font-medium">habla con su paciente</span> y la plataforma llena automáticamente todo: registro, diagnóstico, receta y cobro. <span className="text-orange-300 font-medium">Eso es Nativa AI.</span>
                    </p>
                </motion.div>

                {/* Waveform */}
                <motion.div variants={itemVariants} className="flex items-center gap-6 mb-12">
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
                        <Mic className="w-7 h-7 text-orange-400" />
                    </div>
                    <div className="flex items-end gap-[3px] h-9">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="waveform-bar" style={{ animationDelay: `${i * 0.08}s` }} />
                        ))}
                    </div>
                    <span className="hidden sm:block text-slate-500 text-sm italic">
                        "Paciente masculino, 45 años, gastroenteritis aguda..."
                    </span>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <motion.button
                        onClick={() => document.getElementById('problema')?.scrollIntoView({ behavior: 'smooth' })}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative px-10 py-5 bg-white text-black font-bold tracking-[0.15em] text-[11px] uppercase overflow-hidden transition-all duration-500 rounded-lg cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-[2px] bg-white group-hover:bg-black transition-colors duration-500 rounded-md" />
                        <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500">
                            Descubra la Transformación
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                    </motion.button>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="flex items-center gap-3 mt-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                >
                    <ChevronDown className="w-5 h-5 text-orange-500 animate-bounce" />
                    <span className="text-[10px] tracking-[0.3em] uppercase text-slate-500">Deslice para descubrir</span>
                </motion.div>
            </motion.div>
        </header>
    );
});

HeroSection.displayName = 'HeroSection';

/* -------------------------------------------------------------------------- */
/* PROBLEMA SECTION                                                            */
/* -------------------------------------------------------------------------- */

const ProblemaSection = memo(() => {
    const problems = [
        { icon: Clock, metric: "8–12 min", label: "por paciente", desc: "El doctor o recepcionista escribe manualmente más de 20 campos en cada registro." },
        { icon: AlertTriangle, metric: "Errores", label: "de transcripción", desc: "Signos vitales, nombres de medicamentos y dosis capturados con errores humanos." },
        { icon: WifiOff, metric: "Sin internet", label: "en hoteles", desc: "La aplicación actual se detiene cuando no hay conexión en las zonas hoteleras." },
        { icon: FileText, metric: "Documentos", label: "fuera de norma", desc: "Recetas y notas médicas que no cumplen todos los requisitos de la NOM." },
    ];

    return (
        <section id="problema" className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 70%)' }} />
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    {/* Left — Before / After */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        {/* HOY */}
                        <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-red-500/15">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <span className="text-red-400 font-bold text-xs uppercase tracking-[0.2em]">Hoy: Proceso Manual</span>
                            </div>
                            <div className="space-y-3">
                                {[
                                    "Paciente llega al hotel",
                                    "Recepcionista abre formulario",
                                    "Escribe 20+ campos uno por uno",
                                    "Doctor abre otro formulario",
                                    "Escribe diagnóstico, receta, signos vitales",
                                    "Genera PDF manualmente",
                                    "Total: 15–20 minutos por consulta"
                                ].map((step, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span className="text-red-500/40 text-xs font-mono w-6">{String(i + 1).padStart(2, '0')}</span>
                                        <span className={`text-sm ${i === 6 ? 'text-red-400 font-bold' : 'text-slate-400'}`}>{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CON NATIVA AI */}
                        <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-orange-500/20">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 rounded-full bg-orange-500" />
                                <span className="text-orange-400 font-bold text-xs uppercase tracking-[0.2em]">Con Nativa AI</span>
                            </div>
                            <div className="space-y-3">
                                {[
                                    "Paciente llega al hotel",
                                    "Doctor presiona un botón y habla",
                                    "La IA llena TODO automáticamente",
                                    "Doctor confirma con un toque",
                                    "PDF, receta y cobro generados al instante",
                                    "Total: 2–3 minutos por consulta"
                                ].map((step, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span className="text-orange-500/40 text-xs font-mono w-6">{String(i + 1).padStart(2, '0')}</span>
                                        <span className={`text-sm ${i === 5 ? 'text-orange-400 font-bold' : 'text-slate-300'}`}>{step}</span>
                                        {i > 0 && i < 5 && <CheckCircle2 className="w-4 h-4 text-orange-500/40 ml-auto flex-shrink-0" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right — Content */}
                    <motion.div variants={itemVariants}>
                        <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-orange-500/80 uppercase mb-6">
                            <span className="w-8 h-px bg-orange-500/50" />
                            El Diagnóstico
                        </span>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-8">
                            Su Equipo Médico<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">
                                Pierde Tiempo Escribiendo
                            </span>
                        </h2>

                        <div className="space-y-6 mb-10">
                            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                                Hoy, cada consulta requiere que el doctor deje de atender al paciente para <span className="text-orange-400 font-semibold">llenar formularios en una pantalla</span>. Es como si un cirujano tuviera que detenerse a mitad de operación para hacer papeleo.
                            </p>

                            <p className="text-slate-400 leading-relaxed">
                                Los más de 20 campos del registro de paciente, sumados a los 15+ campos del reporte médico, consumen entre 15 y 20 minutos por consulta. En una operación con cientos de turistas, eso son horas perdidas cada día.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {problems.map((p, i) => (
                                <div key={i} className="group p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-orange-500/20 transition-all duration-500">
                                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3">
                                        <p.icon className="w-5 h-5 text-orange-400" />
                                    </div>
                                    <span className="text-xl font-bold text-white block">{p.metric}</span>
                                    <span className="text-orange-400 text-xs">{p.label}</span>
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
/* SOLUCIÓN SECTION (cómo funciona — lenguaje simple)                          */
/* -------------------------------------------------------------------------- */

const SolucionSection = memo(() => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const steps = [
        {
            icon: Mic,
            title: "El Doctor Habla",
            description: "El médico conversa con el paciente de manera natural. Nada cambia en su forma de trabajar. La aplicación escucha y graba todo en segundo plano.",
            detail: "Funciona incluso sin internet — se guarda y se procesa después.",
            color: "orange",
        },
        {
            icon: Brain,
            title: "La IA Entiende",
            description: "Nuestra inteligencia artificial escucha la conversación y extrae automáticamente: nombres, síntomas, diagnósticos, medicamentos con dosis y todo lo que el doctor mencionó.",
            detail: "Como tener un asistente invisible que toma notas perfectas.",
            color: "orange",
        },
        {
            icon: Eye,
            title: "El Doctor Confirma",
            description: "Toda la información aparece organizada en pantalla. El doctor revisa que esté correcto y toca \"Confirmar\". Si algo necesita ajuste, lo edita con un toque.",
            detail: "Control total — la IA propone, el doctor decide.",
            color: "purple",
        },
        {
            icon: FileText,
            title: "Todo Se Genera Solo",
            description: "Receta médica, nota clínica, cobro al hotel, descuento de inventario de medicamentos — todo se genera automáticamente en un segundo.",
            detail: "PDFs profesionales listos para imprimir o enviar por WhatsApp al paciente.",
            color: "purple",
        },
    ];

    return (
        <section id="solucion" ref={sectionRef} className="relative py-24 md:py-32">
            {/* Background blobs */}
            <div className="absolute inset-0 overflow-visible pointer-events-none blur-[100px]"
                style={{ transform: 'translate3d(0, 0, 0)' }}>
                <motion.div
                    style={{ y: backgroundY }}
                    className="absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full gpu-layer"
                >
                    <div className="w-full h-full rounded-full" style={{ background: '#7c3aed', opacity: 0.2 }} />
                </motion.div>
                <motion.div
                    style={{ y: backgroundY }}
                    className="absolute bottom-[-15%] left-[-5%] w-[50vw] h-[50vw] rounded-full gpu-layer"
                >
                    <div className="w-full h-full rounded-full" style={{ background: '#f97316', opacity: 0.15 }} />
                </motion.div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                {/* Header */}
                <motion.div
                    className="mb-16 md:mb-20"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants}>
                        <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-orange-500/80 uppercase mb-6">
                            <span className="w-8 h-px bg-orange-500/50" />
                            Así Funciona
                        </span>
                    </motion.div>

                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
                        4 Pasos. Cero Escritura.
                    </motion.h2>

                    <motion.p variants={itemVariants} className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                        El doctor no necesita aprender nada nuevo. Solo habla como siempre lo ha hecho.
                        <span className="text-white font-medium"> La tecnología se adapta a él, no al revés.</span>
                    </motion.p>
                </motion.div>

                {/* Two columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

                    {/* LA CAPTURA */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.div variants={itemVariants} className="mb-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                                    <Mic className="w-7 h-7 text-orange-400" />
                                </div>
                                <div>
                                    <span className="text-[10px] tracking-[0.3em] text-orange-400 uppercase font-bold">Captura</span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white">La Voz del Doctor</h3>
                                </div>
                            </div>
                            <p className="text-slate-400 text-lg">
                                Todo comienza con una <span className="text-white">conversación natural</span>. Sin formularios, sin teclado.
                            </p>
                        </motion.div>

                        <div className="space-y-4">
                            {steps.slice(0, 2).map((item) => (
                                <motion.div
                                    key={item.title}
                                    variants={itemVariants}
                                    className="group p-5 rounded-xl bg-[#0a0a1a]/80 border border-white/[0.06] hover:border-orange-500/30 transition-all duration-500"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-5 h-5 text-orange-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold mb-1 group-hover:text-orange-300 transition-colors">
                                                {item.title}
                                            </h4>
                                            <p className="text-slate-500 text-sm leading-relaxed mb-2">{item.description}</p>
                                            <p className="text-orange-400 text-xs font-medium flex items-center gap-2">
                                                <Sparkles className="w-3.5 h-3.5" />
                                                {item.detail}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* LA ACCIÓN */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.div variants={itemVariants} className="mb-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                                    <Zap className="w-7 h-7 text-purple-400" />
                                </div>
                                <div>
                                    <span className="text-[10px] tracking-[0.3em] text-purple-400 uppercase font-bold">Acción</span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white">Resultado Instantáneo</h3>
                                </div>
                            </div>
                            <p className="text-slate-400 text-lg">
                                La IA hace el trabajo pesado. El doctor <span className="text-white">solo confirma y listo</span>.
                            </p>
                        </motion.div>

                        <div className="space-y-4">
                            {steps.slice(2).map((item) => (
                                <motion.div
                                    key={item.title}
                                    variants={itemVariants}
                                    className="group p-5 rounded-xl bg-[#0a0a1a]/80 border border-white/[0.06] hover:border-purple-500/30 transition-all duration-500"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold mb-1 group-hover:text-purple-300 transition-colors">
                                                {item.title}
                                            </h4>
                                            <p className="text-slate-500 text-sm leading-relaxed mb-2">{item.description}</p>
                                            <p className="text-purple-400 text-xs font-medium flex items-center gap-2">
                                                <Sparkles className="w-3.5 h-3.5" />
                                                {item.detail}
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
        { icon: WifiOff, title: "Funciona Sin Internet", desc: "La app trabaja offline en cualquier hotel. Cuando regresa la señal, todo se sincroniza automáticamente. Cero datos perdidos." },
        { icon: Shield, title: "Seguridad de Hospital", desc: "Datos protegidos con el mismo cifrado que usan los bancos. Cumplimiento total de la Ley de Protección de Datos Personales." },
        { icon: Pill, title: "Control de Inventario", desc: "Cuando el doctor prescribe un medicamento, el sistema descuenta del inventario al instante. Alertas automáticas de stock bajo." },
        { icon: Building2, title: "Multi-Sede Inteligente", desc: "Cancún, Vallarta, Los Cabos y Mazatlán en un solo sistema. Cada sede ve solo su información, usted ve todo." },
        { icon: BarChart3, title: "Dashboard en Tiempo Real", desc: "Consultas por sede, ingresos, inventario y desempeño de cada doctor. La información que necesita para decidir, al instante." },
        { icon: MessageSquare, title: "Receta por WhatsApp", desc: "El paciente recibe su receta digital directamente en su celular. Sin papel, sin complicaciones, sin pérdidas." },
    ];

    return (
        <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.06) 0%, transparent 70%)' }} />
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div
                    className="text-center mb-16 md:mb-20"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-orange-500/80 uppercase mb-6">
                        <span className="w-8 h-px bg-orange-500/50" />
                        Lo Que Gana Su Operación
                        <span className="w-8 h-px bg-orange-500/50" />
                    </motion.span>

                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
                        Más Consultas. Cero Errores.
                    </motion.h2>

                    <motion.p variants={itemVariants} className="text-slate-400 text-lg max-w-2xl mx-auto">
                        No es solo tecnología. Es <span className="text-white font-medium">más consultas por hora, menos errores y control total</span> de su negocio desde cualquier lugar.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    {benefits.map((b, i) => (
                        <motion.div
                            key={b.title}
                            variants={itemVariants}
                            className="group p-6 rounded-xl bg-[#0a0a1a]/80 border border-white/[0.06] hover:border-orange-500/20 transition-all duration-500"
                        >
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                                <b.icon className="w-6 h-6 text-orange-400" />
                            </div>
                            <h4 className="text-white font-bold text-lg mb-2 group-hover:text-orange-300 transition-colors">{b.title}</h4>
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
/* COMPLIANCE SECTION                                                          */
/* -------------------------------------------------------------------------- */

const ComplianceSection = memo(() => {
    const norms = [
        { code: "NOM-004", title: "Expediente Clínico", desc: "Genera automáticamente todos los documentos que la ley exige: historia clínica, notas de evolución, recetas con todos los datos obligatorios.", icon: ClipboardCheck },
        { code: "NOM-024", title: "Sistema Electrónico", desc: "Cumplimos los estándares de seguridad, trazabilidad e interoperabilidad que exigen las autoridades de salud para sistemas digitales.", icon: Database },
        { code: "LGPDPPP", title: "Datos Personales", desc: "Consentimiento digital firmado por el paciente, cifrado bancario, y mecanismos de acceso, rectificación y cancelación de datos.", icon: Lock },
        { code: "CIE-10", title: "Codificación Internacional", desc: "Cada diagnóstico se codifica automáticamente con el estándar internacional que usan los hospitales de todo el mundo.", icon: Globe },
    ];

    return (
        <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)' }} />
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    {/* Left — Content */}
                    <motion.div variants={itemVariants}>
                        <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-emerald-500/80 uppercase mb-6">
                            <span className="w-8 h-px bg-emerald-500/50" />
                            Cumplimiento Legal
                        </span>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-8">
                            100% Dentro<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                                de la Norma
                            </span>
                        </h2>

                        <div className="space-y-6">
                            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                                En salud, la legalidad no es opcional. <span className="text-white font-medium">Cada documento que genera Nativa AI cumple con las normas oficiales mexicanas</span> desde el primer día.
                            </p>

                            <p className="text-slate-400 leading-relaxed">
                                No tendrá que preocuparse por auditorías ni por cambios en la regulación. Nosotros mantenemos el sistema actualizado para que usted se enfoque en lo que importa: sus pacientes.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right — Norm cards */}
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

ComplianceSection.displayName = 'ComplianceSection';

/* -------------------------------------------------------------------------- */
/* ROADMAP SECTION                                                             */
/* -------------------------------------------------------------------------- */

const RoadmapSection = memo(() => {
    const phases = [
        {
            number: "01", title: "Los Cimientos", timeline: "Mes 1", icon: Server,
            gradient: "from-orange-500/20 to-orange-600/10", borderColor: "border-orange-500/30",
            iconBg: "bg-orange-500/20", iconColor: "text-orange-400",
            objetivo: "Preparar toda la infraestructura tecnológica y diseñar la experiencia del usuario.",
            entregable: "Sistema base funcionando + Diseño aprobado de todas las pantallas + Acceso seguro por roles.",
        },
        {
            number: "02", title: "La Inteligencia", timeline: "Mes 2–3", icon: Brain,
            gradient: "from-orange-500/15 to-purple-600/10", borderColor: "border-orange-500/25",
            iconBg: "bg-orange-500/20", iconColor: "text-orange-400",
            objetivo: "Construir el motor de voz que entiende al doctor y llena formularios automáticamente.",
            entregable: "El doctor dicta y ve datos extraídos automáticamente. Funciona sin internet.",
        },
        {
            number: "03", title: "La Operación", timeline: "Mes 3–4", icon: Stethoscope,
            gradient: "from-purple-500/20 to-purple-600/10", borderColor: "border-purple-500/30",
            iconBg: "bg-purple-500/20", iconColor: "text-purple-400",
            objetivo: "Todo el flujo clínico completo: registro, consulta, receta, cobro e inventario.",
            entregable: "Consulta completa por voz + Recetas PDF + Tabulador de precios + Inventario automático.",
        },
        {
            number: "04", title: "La Seguridad", timeline: "Mes 4–5", icon: Shield,
            gradient: "from-purple-500/15 to-emerald-600/10", borderColor: "border-purple-500/25",
            iconBg: "bg-purple-500/20", iconColor: "text-purple-400",
            objetivo: "Blindar la plataforma para cumplir todas las normas de salud y protección de datos.",
            entregable: "Expediente clínico NOM-004 + Consentimientos digitales + Cifrado total + Auditoría.",
        },
        {
            number: "05", title: "La Migración", timeline: "Mes 5–6", icon: Database,
            gradient: "from-blue-500/20 to-blue-600/10", borderColor: "border-blue-500/30",
            iconBg: "bg-blue-500/20", iconColor: "text-blue-400",
            objetivo: "Pasar toda la información del sistema actual al nuevo, sin perder un solo dato.",
            entregable: "Datos migrados al 100% + Operación en paralelo + Pruebas con doctores reales.",
        },
        {
            number: "06", title: "¡En Vivo!", timeline: "Mes 6", icon: Zap,
            gradient: "from-teal-500/20 to-teal-600/10", borderColor: "border-teal-500/30",
            iconBg: "bg-teal-500/20", iconColor: "text-teal-400",
            objetivo: "Encender el sistema en todas las sedes y capacitar a todo el equipo.",
            entregable: "Sistema en producción + Staff capacitado + Manuales + Soporte post-lanzamiento.",
        },
    ];

    return (
        <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.06) 0%, transparent 70%)' }} />
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div
                    className="text-center mb-16 md:mb-20"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-orange-500/80 uppercase mb-6">
                        <span className="w-8 h-px bg-orange-500/50" />
                        Plan de Trabajo
                        <span className="w-8 h-px bg-orange-500/50" />
                    </motion.span>

                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
                        6 Meses. 6 Entregas.
                    </motion.h2>

                    <motion.p variants={itemVariants} className="text-slate-400 text-lg max-w-2xl mx-auto">
                        No esperamos 6 meses para mostrar resultados. <span className="text-white font-medium">Cada mes usted ve avances concretos</span> que puede probar y validar.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="relative"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/50 via-purple-500/50 to-teal-500/50 hidden lg:block" />

                    <div className="space-y-8 lg:space-y-0">
                        {phases.map((phase, index) => (
                            <motion.div
                                key={phase.number}
                                variants={itemVariants}
                                className={`relative lg:flex lg:items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} lg:mb-16`}
                            >
                                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                                    <div className={`group p-6 md:p-8 rounded-2xl bg-gradient-to-br ${phase.gradient} border ${phase.borderColor} hover:scale-[1.02] transition-all duration-500`}>
                                        <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                                            <div className={`w-12 h-12 rounded-xl ${phase.iconBg} flex items-center justify-center`}>
                                                <phase.icon className={`w-6 h-6 ${phase.iconColor}`} />
                                            </div>
                                            <div className={index % 2 === 0 ? 'lg:text-right' : ''}>
                                                <span className={`text-[10px] tracking-[0.3em] ${phase.iconColor} uppercase font-bold`}>
                                                    Entrega {phase.number} · {phase.timeline}
                                                </span>
                                                <h3 className="text-xl md:text-2xl font-bold text-white">{phase.title}</h3>
                                            </div>
                                        </div>
                                        <div className={`space-y-3 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                                            <p className="text-slate-400"><span className="text-white font-medium">Objetivo:</span> {phase.objetivo}</p>
                                            <p className="text-slate-500 text-sm"><span className="text-slate-300 font-medium">Lo que recibe:</span> {phase.entregable}</p>
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

/* -------------------------------------------------------------------------- */
/* OFFER SECTION                                                               */
/* -------------------------------------------------------------------------- */

const OfferSection = memo(() => {
    const includes = [
        { icon: Brain, text: "Motor de Inteligencia Artificial (Voz a Texto a Acción)" },
        { icon: Smartphone, text: "Aplicación PWA que funciona sin internet en hoteles" },
        { icon: Shield, text: "Cumplimiento total de normas oficiales de salud" },
        { icon: Database, text: "Migración completa de datos del sistema actual" },
        { icon: GraduationCap, text: "Capacitación presencial a todo el equipo médico" },
        { icon: BookOpen, text: "Código fuente y documentación técnica — es 100% suyo" },
    ];

    const costs = [
        { name: "Servidores en la Nube (AWS)", range: "$150 – $300 USD" },
        { name: "Inteligencia Artificial (Whisper + LLM)", range: "$150 – $450 USD" },
        { name: "Hosting PWA + WhatsApp Business", range: "$50 – $130 USD" },
    ];

    return (
        <section className="relative py-24 md:py-32">
            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-orange-500/80 uppercase mb-6">
                        <span className="w-8 h-px bg-orange-500/50" />La Inversión<span className="w-8 h-px bg-orange-500/50" />
                    </motion.span>

                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
                        Su Activo Tecnológico
                    </motion.h2>

                    <motion.p variants={itemVariants} className="text-slate-400 text-lg max-w-2xl mx-auto mb-12">
                        No es un gasto recurrente. Es una <span className="text-white font-medium">inversión única</span> que se convierte en propiedad permanente de Nativa SC.
                    </motion.p>

                    <motion.div variants={itemVariants} className="mb-12">
                        <p className="text-slate-300 text-sm uppercase tracking-widest mb-6">Lo que incluye la inversión</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {includes.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 text-left">
                                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                                        <item.icon className="w-5 h-5 text-orange-400" />
                                    </div>
                                    <span className="text-slate-300 text-sm">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="relative p-10 md:p-12 rounded-3xl bg-gradient-to-br from-orange-500/10 via-[#0a0a1a] to-purple-500/10 border border-orange-500/20 overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                        <div className="relative z-10">
                            <p className="text-slate-400 text-sm uppercase tracking-widest mb-4">Inversión Única de Desarrollo</p>
                            <div className="flex items-baseline justify-center gap-2 mb-4">
                                <span className="text-6xl md:text-8xl font-black text-white">$925,000</span>
                                <span className="text-2xl text-slate-400 font-light">MXN</span>
                            </div>
                            <p className="text-slate-500 text-sm">(+ IVA)</p>
                            <p className="text-orange-400 text-xs mt-4 font-bold">
                                Incluye Transferencia Total de Propiedad Intelectual (Código Fuente). Nativa SC es dueña al 100%.
                            </p>
                        </div>
                    </motion.div>

                    {/* Costos operativos */}
                    <motion.div variants={itemVariants} className="mt-8 p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-left">
                        <p className="text-slate-300 text-sm font-bold uppercase tracking-widest mb-6 text-center">
                            Costos operativos mensuales (después del lanzamiento)
                        </p>
                        <div className="space-y-4">
                            {costs.map((c, i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                                    <span className="text-slate-400 text-sm">{c.name}</span>
                                    <span className="text-white text-sm font-medium">{c.range}</span>
                                </div>
                            ))}
                            <div className="flex justify-between items-center pt-3 border-t border-orange-500/20">
                                <span className="text-white text-sm font-bold">Total estimado mensual</span>
                                <span className="text-orange-400 text-sm font-bold">$350 – $880 USD/mes</span>
                            </div>
                        </div>
                        <p className="text-slate-600 text-xs text-center mt-4">
                            *Varía según volumen de consultas (200–800/mes entre las 4 sedes)
                        </p>
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
        "Aprobación de esta propuesta",
        "Firma de acuerdo y anticipo",
        "Inicio inmediato: Entrega 1 en 4 semanas"
    ];

    return (
        <section id="cta" className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 blur-3xl">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, transparent 60%)' }} />
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    <motion.div variants={itemVariants}>
                        <Sparkles className="w-12 h-12 text-orange-400 mx-auto mb-8" />
                    </motion.div>

                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
                        ¿Lista para transformar<br />la operación?
                    </motion.h2>

                    <motion.p variants={itemVariants} className="text-slate-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                        La infraestructura médica de primer nivel ya la tiene. Ahora hagamos que su tecnología esté a la misma altura.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-12">
                        {steps.map((step, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                                    <span className="text-orange-400 text-sm font-bold">{index + 1}</span>
                                </div>
                                <span className="text-slate-300 text-sm">{step}</span>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <motion.a
                            href="https://wa.me/529984750514?text=Hola%2C%20me%20interesa%20iniciar%20el%20proyecto%20Nativa%20AI%20con%20FINEM"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative inline-flex px-12 py-6 bg-white text-black font-bold tracking-[0.15em] text-sm uppercase overflow-hidden transition-all duration-500 rounded-lg cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-[2px] bg-white group-hover:bg-black transition-colors duration-500 rounded-md" />
                            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500">
                                Iniciar Transformación Ahora
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
                    <span className="text-slate-600 text-sm">Propuesta Exclusiva Nativa AI 2026</span>
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

const NativaAIProposal = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <ProposalStyles />
            <ProposalNavbar />

            <main className="relative z-10">
                <HeroSection />
                <ProblemaSection />
                <SolucionSection />
                <BeneficiosSection />
                <ComplianceSection />
                <RoadmapSection />
                <OfferSection />
                <CTASection />
            </main>

            <ProposalFooter />
        </>
    );
};

export default NativaAIProposal;