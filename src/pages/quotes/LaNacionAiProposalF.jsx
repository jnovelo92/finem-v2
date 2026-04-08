import React, { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    ArrowLeft,
    ChevronDown,
    Search,
    Newspaper,
    FileText,
    Shield,
    Clock,
    Brain,
    Users,
    Database,
    Lock,
    Smartphone,
    TrendingUp,
    Sparkles,
    Globe,
    Server,
    Eye,
    CheckCircle2,
    AlertTriangle,
    BookOpen,
    Code,
    Zap,
    Monitor,
    Layers,
    PanelTop,
} from 'lucide-react';
import {
    motion,
    useTransform,
    useScroll,
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
    @keyframes typing-cursor {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .typing-cursor {
      animation: typing-cursor 1s step-end infinite;
    }
    @keyframes search-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.3); }
      50% { box-shadow: 0 0 0 10px rgba(201,168,76,0); }
    }
    .search-pulse { animation: search-pulse 2.5s ease-in-out infinite; }
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
/* TYPING SEARCH ANIMATION                                                     */
/* -------------------------------------------------------------------------- */

const TypingSearch = memo(() => {
    const queries = [
        '¿Qué publicó La Nación sobre la crisis del 94?',
        'Artículos de opinión sobre reforma energética',
        'Ediciones de 1965 sobre política exterior',
    ];
    const [queryIndex, setQueryIndex] = useState(0);
    const [displayed, setDisplayed] = useState('');
    const [phase, setPhase] = useState('typing'); // typing | pause | deleting

    useEffect(() => {
        const target = queries[queryIndex];
        let timeout;
        if (phase === 'typing') {
            if (displayed.length < target.length) {
                timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 40);
            } else {
                timeout = setTimeout(() => setPhase('pause'), 1800);
            }
        } else if (phase === 'pause') {
            timeout = setTimeout(() => setPhase('deleting'), 400);
        } else if (phase === 'deleting') {
            if (displayed.length > 0) {
                timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 20);
            } else {
                setQueryIndex((i) => (i + 1) % queries.length);
                setPhase('typing');
            }
        }
        return () => clearTimeout(timeout);
    }, [displayed, phase, queryIndex]);

    return (
        <div
            className="flex items-center gap-3 px-5 py-4 rounded-xl search-pulse"
            style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', maxWidth: 520 }}
        >
            <Search className="w-5 h-5 flex-shrink-0" style={{ color: '#C9A84C' }} />
            <span className="text-slate-300 text-sm md:text-base font-light flex-1 min-h-[1.4em]">
                {displayed}
                <span className="typing-cursor text-amber-400 ml-0.5">|</span>
            </span>
        </div>
    );
});
TypingSearch.displayName = 'TypingSearch';

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
            <div
                className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
                style={{ background: 'linear-gradient(to bottom, rgba(2,4,16,0.95) 0%, rgba(2,4,16,0.6) 60%, transparent 100%)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
            />
            <div className="container mx-auto px-6 md:px-12 relative z-10 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link to="/" className="hover:opacity-80 transition-opacity">
                        <LogoFinem className="h-8 md:h-10 w-auto text-white" />
                    </Link>
                    <div className="hidden md:block h-8 w-px bg-white/10" />
                    <span className="hidden md:block text-[10px] tracking-[0.3em] text-slate-400 uppercase">
                        Propuesta Revista La Nación 2026
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
                        <span className="text-[9px] font-bold tracking-[0.3em] text-white uppercase">Ver Propuesta</span>
                        <div className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#C9A84C' }} />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: '#C9A84C' }} />
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
        {/* Blobs — navy/gold palette */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none blur-3xl" style={{ transform: 'translate3d(0,0,0)' }}>
            <div className="absolute -left-[10%] top-[5%] w-[60vw] h-[60vw] md:w-[45vw] md:h-[45vw] rounded-full animate-blob gpu-layer" style={{ background: '#1B3A5C', opacity: 0.6 }} />
            <div className="absolute right-[-10%] top-[15%] w-[35vw] h-[35vw] md:w-[40vw] md:h-[40vw] rounded-full animate-blob-reverse gpu-layer" style={{ background: '#C9A84C', opacity: 0.25 }} />
            <div className="absolute bottom-[10%] left-[20%] w-[25vw] h-[25vw] rounded-full animate-pulse-glow gpu-layer" style={{ background: '#4A7FB5', opacity: 0.18 }} />
        </div>

        <motion.div className="container mx-auto max-w-6xl px-6 md:px-12 relative z-30" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
                <motion.span variants={lineReveal} className="w-12 md:w-16 h-[1px]" style={{ background: 'linear-gradient(to right, #C9A84C, transparent)' }} />
                <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium" style={{ color: 'rgba(201,168,76,0.7)' }}>
                    Propuesta Tecnológica · Revista La Nación
                </span>
            </motion.div>

            <div className="mb-8 md:mb-12">
                <motion.div variants={itemVariants}>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-[1.1] text-white pb-2">
                        Su Archivo Histórico
                    </h1>
                </motion.div>
                <motion.div variants={itemVariants}>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-[1.1] pb-4">
                        <span className="text-transparent bg-clip-text animate-gradient-flow" style={{ backgroundImage: 'linear-gradient(135deg, #e8cc7e, #C9A84C, #a8842e, #C9A84C)' }}>
                            Cobra Vida Digital.
                        </span>
                        <br />
                        <span className="text-transparent bg-clip-text animate-gradient-flow" style={{ backgroundImage: 'linear-gradient(135deg, #C9A84C, #e8cc7e, #C9A84C)', animationDelay: '-2s' }}>
                            Desde 1941. Para Siempre.
                        </span>
                    </h1>
                </motion.div>
            </div>

            <motion.div variants={itemVariants} className="max-w-2xl mb-10">
                <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                    Imagine un portal donde cualquier persona pueda buscar «reforma energética en los 90» y encontrar al instante cada artículo que La Nación publicó sobre el tema. Con búsqueda inteligente, seguridad de primer nivel y un CMS que su equipo editorial dominará en minutos.{' '}
                    <span style={{ color: '#C9A84C' }} className="font-medium">Eso es lo que construiremos.</span>
                </p>
            </motion.div>

            {/* Typing search animation */}
            <motion.div variants={itemVariants} className="mb-12">
                <TypingSearch />
            </motion.div>

            <motion.div variants={itemVariants}>
                <motion.button
                    onClick={() => document.getElementById('problema')?.scrollIntoView({ behavior: 'smooth' })}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="group relative px-10 py-5 bg-white text-black font-bold tracking-[0.15em] text-[11px] uppercase overflow-hidden transition-all duration-500 rounded-lg cursor-pointer"
                >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to right, #C9A84C, #e8cc7e, #C9A84C)' }} />
                    <div className="absolute inset-[2px] bg-white group-hover:bg-black transition-colors duration-500 rounded-md" />
                    <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500">
                        Descubra la Transformación
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                </motion.button>
            </motion.div>

            <motion.div className="flex items-center gap-3 mt-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}>
                <ChevronDown className="w-5 h-5 animate-bounce" style={{ color: '#C9A84C' }} />
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
        { icon: Clock, metric: 'Lento', label: 'Tiempos de carga', desc: 'Un sitio lento pierde lectores. Google penaliza portales que tardan más de 3 segundos.' },
        { icon: AlertTriangle, metric: 'Invisible', label: 'para buscadores', desc: 'Sin SEO moderno (SSR, JSON-LD, sitemap dinámico), el contenido no aparece en Google.' },
        { icon: FileText, metric: '+80 años', label: 'de PDFs sin indexar', desc: 'Miles de ediciones históricas que nadie puede buscar, consultar ni descubrir.' },
        { icon: Shield, metric: 'Vulnerable', label: 'seguridad básica', desc: 'Un portal político sin WAF, sin 2FA y sin protección DDoS es un blanco fácil.' },
    ];

    const todaySteps = [
        'Visitante llega al portal actual',
        'Navegación confusa, diseño obsoleto',
        'Busca un artículo histórico — no lo encuentra',
        'Hemeroteca en PDFs sin indexar',
        'SEO deficiente, Google no posiciona',
        'Seguridad básica en un portal político',
        'Resultado: lectores perdidos, archivo invisible',
    ];

    const finemSteps = [
        'Visitante llega al nuevo portal',
        'Diseño editorial moderno, navegación intuitiva',
        'Busca cualquier tema — resultados instantáneos',
        'Hemeroteca completa con OCR y búsqueda',
        'SEO de primer nivel, Google posiciona todo',
        'Resultado: más lectores, archivo vivo, medio fortalecido',
    ];

    return (
        <section id="problema" className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(74,127,181,0.08) 0%, transparent 70%)' }} />
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={containerVariants}>

                    {/* Left — Before/After */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        {/* HOY */}
                        <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-red-500/15">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <span className="text-red-400 font-bold text-xs uppercase tracking-[0.2em]">Hoy: Sitio Desactualizado</span>
                            </div>
                            <div className="space-y-3">
                                {todaySteps.map((step, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className="text-red-500/40 text-xs font-mono w-6 flex-shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                                        <span className={`text-sm ${i === 6 ? 'text-red-400 font-bold' : 'text-slate-400'}`}>{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CON FINEM */}
                        <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02]" style={{ border: '1px solid rgba(201,168,76,0.2)' }}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#C9A84C' }} />
                                <span className="font-bold text-xs uppercase tracking-[0.2em]" style={{ color: '#C9A84C' }}>Con el Nuevo Portal</span>
                            </div>
                            <div className="space-y-3">
                                {finemSteps.map((step, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span className="text-xs font-mono w-6 flex-shrink-0" style={{ color: 'rgba(201,168,76,0.4)' }}>{String(i + 1).padStart(2, '0')}</span>
                                        <span className={`text-sm flex-1 ${i === 5 ? 'font-bold' : 'text-slate-300'}`} style={i === 5 ? { color: '#C9A84C' } : {}}>
                                            {step}
                                        </span>
                                        {i > 0 && i < 5 && <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(201,168,76,0.5)' }} />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right — Narrative */}
                    <motion.div variants={itemVariants}>
                        <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(201,168,76,0.8)' }}>
                            <span className="w-8 h-px" style={{ background: 'rgba(201,168,76,0.5)' }} />
                            El Diagnóstico
                        </span>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-8">
                            Un Archivo de 80+ Años<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">
                                Invisible para el Mundo
                            </span>
                        </h2>

                        <div className="space-y-6 mb-10">
                            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                                Revista La Nación tiene un tesoro editorial: más de 80 años de cobertura política de México. Pero hoy, ese archivo está atrapado en PDFs sin indexar, en un sitio que no refleja la autoridad del medio.
                            </p>
                            <p className="text-slate-400 leading-relaxed">
                                Un portal político necesita velocidad, seguridad y presencia digital impecable. Cada día sin un sitio moderno es visibilidad perdida, lectores que no regresan y un archivo histórico que nadie puede consultar.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {problems.map((p, i) => (
                                <div key={i} className="group p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-all duration-500"
                                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}>
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(201,168,76,0.1)' }}>
                                        <p.icon className="w-5 h-5" style={{ color: '#C9A84C' }} />
                                    </div>
                                    <span className="text-xl font-bold text-white block">{p.metric}</span>
                                    <span className="text-xs" style={{ color: '#C9A84C' }}>{p.label}</span>
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
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const leftCards = [
        {
            icon: Monitor,
            title: 'Next.js + React + TypeScript',
            description: 'El sitio carga en menos de 2 segundos. Cada artículo se renderiza del lado del servidor para SEO perfecto. 10 secciones completas: Portada, Opinión, Actualidad, Cultura, Multimedia, Podcast, Hemeroteca, Contacto, Novedades, Colaboradores.',
            detail: 'El mismo stack que usan The Verge, Washington Post y medios de primer nivel.',
        },
        {
            icon: PanelTop,
            title: 'Payload CMS — Panel Editorial',
            description: 'Su equipo publica artículos, programa contenido, gestiona autores y categorías desde un panel intuitivo. Flujo de aprobación editorial incluido: redactor → editor → publicación.',
            detail: 'Open-source, TypeScript nativo, sin dependencia de WordPress ni terceros.',
        },
    ];

    const rightCards = [
        {
            icon: Search,
            title: 'OCR + Búsqueda Instantánea',
            description: 'Cada PDF histórico se procesa con OCR, el texto se extrae y se indexa en un motor de búsqueda instantáneo. El usuario escribe y obtiene resultados en milisegundos con tolerancia a errores tipográficos.',
            detail: 'Filtros por fecha, autor, sección y palabras clave.',
        },
        {
            icon: Brain,
            title: 'Inteligencia Artificial (Fase 2)',
            description: 'Búsqueda semántica con lenguaje natural: «¿Qué publicó La Nación sobre la reforma energética?». Resúmenes automáticos por edición. Artículos históricos vinculados con contenido actual.',
            detail: 'Se activa sobre la misma infraestructura. Sin retrabajo.',
        },
    ];

    return (
        <section id="solucion" ref={sectionRef} className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-visible pointer-events-none blur-[100px]" style={{ transform: 'translate3d(0,0,0)' }}>
                <motion.div style={{ y: backgroundY }} className="absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full gpu-layer">
                    <div className="w-full h-full rounded-full" style={{ background: '#4A7FB5', opacity: 0.2 }} />
                </motion.div>
                <motion.div style={{ y: backgroundY }} className="absolute bottom-[-15%] left-[-5%] w-[50vw] h-[50vw] rounded-full gpu-layer">
                    <div className="w-full h-full rounded-full" style={{ background: '#C9A84C', opacity: 0.1 }} />
                </motion.div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div className="mb-16 md:mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={containerVariants}>
                    <motion.div variants={itemVariants}>
                        <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(201,168,76,0.8)' }}>
                            <span className="w-8 h-px" style={{ background: 'rgba(201,168,76,0.5)' }} />
                            Así Se Construye
                        </span>
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
                        Stack Moderno. Cero Compromisos.
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                        No se necesita aprender tecnología nueva. Su equipo editorial usa un panel intuitivo para publicar. Nosotros nos encargamos de que todo lo demás funcione perfecto.{' '}
                        <span className="text-white font-medium">La tecnología se adapta a la revista, no al revés.</span>
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {/* Columna Izquierda — La Base */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.3)' }}>
                                    <Layers className="w-7 h-7" style={{ color: '#C9A84C' }} />
                                </div>
                                <div>
                                    <span className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: '#C9A84C' }}>Fundación</span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white">Tecnología Editorial</h3>
                                </div>
                            </div>
                            <p className="text-slate-400 text-lg">
                                Todo comienza con un stack moderno, seguro y rápido.{' '}
                                <span className="text-white">Sin dependencias frágiles.</span>
                            </p>
                        </motion.div>
                        <div className="space-y-4">
                            {leftCards.map((item) => (
                                <motion.div key={item.title} variants={itemVariants}
                                    className="group p-5 rounded-xl bg-[#0a0a1a]/80 border border-white/[0.06] transition-all duration-500"
                                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201,168,76,0.1)' }}>
                                            <item.icon className="w-5 h-5" style={{ color: '#C9A84C' }} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed mb-2">{item.description}</p>
                                            <p className="text-xs font-medium flex items-center gap-2" style={{ color: '#C9A84C' }}>
                                                <Sparkles className="w-3.5 h-3.5" />{item.detail}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Columna Derecha — La Inteligencia */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-blue-500/20 border border-blue-500/30">
                                    <Zap className="w-7 h-7 text-blue-400" />
                                </div>
                                <div>
                                    <span className="text-[10px] tracking-[0.3em] text-blue-400 uppercase font-bold">Diferenciador</span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white">Hemeroteca + Búsqueda</h3>
                                </div>
                            </div>
                            <p className="text-slate-400 text-lg">
                                El archivo histórico deja de ser un almacén de PDFs.{' '}
                                <span className="text-white">Se convierte en un activo consultable.</span>
                            </p>
                        </motion.div>
                        <div className="space-y-4">
                            {rightCards.map((item) => (
                                <motion.div key={item.title} variants={itemVariants}
                                    className="group p-5 rounded-xl bg-[#0a0a1a]/80 border border-white/[0.06] hover:border-blue-500/30 transition-all duration-500">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold mb-1 group-hover:text-blue-300 transition-colors">{item.title}</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed mb-2">{item.description}</p>
                                            <p className="text-blue-400 text-xs font-medium flex items-center gap-2">
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
        { icon: Zap, title: 'Carga en < 2 Segundos', desc: 'Next.js con ISR + CDN global de Cloudflare. Cada artículo se genera estáticamente y se distribuye en servidores de todo el mundo. Google lo premia con mejor posicionamiento.' },
        { icon: Shield, title: 'Seguridad de Medio Político', desc: 'WAF, protección DDoS, 2FA obligatorio, Cloudflare Access en el panel admin, backups diarios automáticos y cifrado AES-256. Nadie accede sin autorización.' },
        { icon: Search, title: 'Hemeroteca Consultable', desc: '80+ años de archivo político mexicano, procesado con OCR, indexado y buscable al instante. De PDFs olvidados a un activo editorial vivo.' },
        { icon: TrendingUp, title: 'SEO de Primer Nivel', desc: 'Server-side rendering, JSON-LD automático (Article, NewsArticle), sitemap dinámico, Open Graph por artículo. Google indexa todo, todo posiciona.' },
        { icon: Smartphone, title: '100% Responsive', desc: 'Diseñado mobile-first. La experiencia de lectura es impecable en cualquier dispositivo. Tipografía editorial profesional que invita a leer.' },
        { icon: Users, title: 'Equipo Editorial Autónomo', desc: 'Payload CMS con flujo de aprobación, programación de publicaciones, gestión de autores y categorías. Su equipo publica sin depender de un desarrollador.' },
    ];

    return (
        <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />
            </div>
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div className="text-center mb-16 md:mb-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(201,168,76,0.8)' }}>
                        <span className="w-8 h-px" style={{ background: 'rgba(201,168,76,0.5)' }} />
                        Lo Que Gana La Nación
                        <span className="w-8 h-px" style={{ background: 'rgba(201,168,76,0.5)' }} />
                    </motion.span>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
                        Más Lectores. Más Autoridad.
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-slate-400 text-lg max-w-2xl mx-auto">
                        No es solo un sitio web. Es la plataforma que posiciona a Revista La Nación como el medio político digital de referencia.{' '}
                        <span className="text-white font-medium">Más alcance, más seguridad y control total de su contenido.</span>
                    </motion.p>
                </motion.div>

                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    {benefits.map((b) => (
                        <motion.div key={b.title} variants={itemVariants}
                            className="group p-6 rounded-xl bg-[#0a0a1a]/80 border border-white/[0.06] transition-all duration-500"
                            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors" style={{ background: 'rgba(201,168,76,0.1)' }}>
                                <b.icon className="w-6 h-6" style={{ color: '#C9A84C' }} />
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
/* COMPLIANCE / SEGURIDAD SECTION                                              */
/* -------------------------------------------------------------------------- */

const ComplianceSection = memo(() => {
    const norms = [
        { code: 'CLOUDFLARE PRO', title: 'WAF + DDoS + CDN', desc: 'Firewall de aplicaciones web con reglas OWASP, protección DDoS ilimitada, CDN global y SSL gestionado. La primera línea de defensa contra cualquier ataque.', icon: Shield },
        { code: 'ACCESO ZERO TRUST', title: 'Panel Admin Invisible', desc: 'Cloudflare Access protege el /admin. Un atacante ni siquiera ve el formulario de login. Solo personas autorizadas por email/SSO pueden acceder.', icon: Lock },
        { code: '2FA + ROLES', title: 'Autenticación Robusta', desc: 'Doble factor obligatorio para administradores. Sistema de roles granular: redactor, editor, admin, super admin. Cada acción queda registrada con IP y timestamp.', icon: Eye },
        { code: 'BACKUPS + CIFRADO', title: 'Datos Protegidos', desc: 'Backups diarios automáticos a Cloudflare R2 con retención de 30 días. Base de datos y archivos cifrados con AES-256 en reposo. Recuperación garantizada.', icon: Database },
    ];

    return (
        <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />
            </div>
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={containerVariants}>
                    {/* Left */}
                    <motion.div variants={itemVariants}>
                        <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-emerald-500/80 uppercase mb-6">
                            <span className="w-8 h-px bg-emerald-500/50" />
                            Seguridad Integral
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-8">
                            Blindado Contra<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                                Cualquier Amenaza
                            </span>
                        </h2>
                        <div className="space-y-6">
                            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                                Un portal político es un blanco. Ataques DDoS, intentos de defacement, filtraciones de contenido pre-publicación. La seguridad no es opcional, es la prioridad.{' '}
                                <span className="text-white font-medium">Cada capa del sistema está diseñada para resistir.</span>
                            </p>
                            <p className="text-slate-400 leading-relaxed">
                                Desde Cloudflare Pro como primera línea hasta cifrado en reposo en la base de datos, pasando por autenticación de doble factor y un panel admin invisible para atacantes.
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
ComplianceSection.displayName = 'ComplianceSection';

/* -------------------------------------------------------------------------- */
/* ROADMAP SECTION                                                             */
/* -------------------------------------------------------------------------- */

const RoadmapSection = memo(() => {
    const phases = [
        {
            number: '01', title: 'Los Cimientos', timeline: 'Semana 1', icon: Server,
            gradient: 'from-amber-500/20 to-amber-600/10', borderColor: 'border-amber-500/30',
            iconBg: 'bg-amber-500/20', iconColor: 'text-amber-400',
            objetivo: 'Repositorio, CI/CD, Docker, configuración de Payload CMS, esquema de base de datos y wireframes de UI.',
            entregable: 'Entorno de desarrollo funcionando + Diseño de wireframes aprobado + Base de datos lista.',
        },
        {
            number: '02', title: 'CMS + Frontend', timeline: 'Semanas 2–5', icon: PanelTop,
            gradient: 'from-amber-500/15 to-blue-600/10', borderColor: 'border-amber-500/25',
            iconBg: 'bg-amber-500/20', iconColor: 'text-amber-400',
            objetivo: 'Panel editorial completo con Payload CMS y las 10 secciones del frontend en React + TypeScript.',
            entregable: 'CMS con flujo editorial + 10 secciones responsive + Roles y 2FA + Multimedia y podcast embeds.',
        },
        {
            number: '03', title: 'Integración + Hemeroteca', timeline: 'Semanas 5–8', icon: Search,
            gradient: 'from-blue-500/20 to-blue-600/10', borderColor: 'border-blue-500/30',
            iconBg: 'bg-blue-500/20', iconColor: 'text-blue-400',
            objetivo: 'Conectar frontend con CMS, implementar hemeroteca con OCR y búsqueda full-text.',
            entregable: 'Sitio integrado con ISR + Pipeline OCR Tesseract + Meilisearch full-text + Filtros avanzados.',
        },
        {
            number: '04', title: 'SEO + Seguridad + Lanzamiento', timeline: 'Semanas 8–12', icon: Shield,
            gradient: 'from-blue-500/15 to-emerald-600/10', borderColor: 'border-blue-500/25',
            iconBg: 'bg-blue-500/20', iconColor: 'text-blue-400',
            objetivo: 'SEO completo, seguridad Cloudflare, testing, migración de contenido y lanzamiento.',
            entregable: 'Sitemap + JSON-LD + Cloudflare Pro + WAF + Backups + Capacitación editorial + Sitio en producción.',
        },
        {
            number: '05', title: 'Inteligencia Artificial', timeline: 'Semanas 13–17 (Fase 2)', icon: Brain,
            gradient: 'from-purple-500/20 to-purple-600/10', borderColor: 'border-purple-500/30',
            iconBg: 'bg-purple-500/20', iconColor: 'text-purple-400',
            objetivo: 'Activar búsqueda semántica, resúmenes automáticos, relación inteligente de artículos y SEO con IA.',
            entregable: 'Embeddings + pgvector + Búsqueda por lenguaje natural + Resúmenes Claude Haiku + Interlinking automático.',
        },
        {
            number: '06', title: '¡En Vivo con IA!', timeline: 'Semana 17', icon: Zap,
            gradient: 'from-teal-500/20 to-teal-600/10', borderColor: 'border-teal-500/30',
            iconBg: 'bg-teal-500/20', iconColor: 'text-teal-400',
            objetivo: 'QA final de Fase 2, upgrade OCR para documentos degradados, activación completa en producción.',
            entregable: 'Búsqueda semántica activa + Resúmenes por edición + Azure AI OCR + Proyecto completo entregado.',
        },
    ];

    return (
        <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />
            </div>
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div className="text-center mb-16 md:mb-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(201,168,76,0.8)' }}>
                        <span className="w-8 h-px" style={{ background: 'rgba(201,168,76,0.5)' }} />
                        Plan de Trabajo
                        <span className="w-8 h-px" style={{ background: 'rgba(201,168,76,0.5)' }} />
                    </motion.span>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
                        2 Fases. Entregas Constantes.
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-slate-400 text-lg max-w-2xl mx-auto">
                        No esperamos meses para mostrar resultados.{' '}
                        <span className="text-white font-medium">Cada sprint usted ve avances concretos que puede probar y validar.</span>
                    </motion.p>
                </motion.div>

                <motion.div className="relative" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/50 via-blue-500/50 to-teal-500/50 hidden lg:block" />
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
                                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#020410] border-2 z-10" style={{ borderColor: '#C9A84C' }} />
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
        { icon: Monitor, text: 'Portal completo: Next.js + React + TypeScript (10 secciones)' },
        { icon: PanelTop, text: 'CMS editorial: Payload CMS con flujo de aprobación y roles' },
        { icon: Search, text: 'Hemeroteca con OCR, búsqueda instantánea y filtros avanzados' },
        { icon: Brain, text: 'Fase 2: Búsqueda semántica con IA, resúmenes automáticos' },
        { icon: Shield, text: 'Seguridad completa: Cloudflare Pro, WAF, 2FA, backups, cifrado' },
        { icon: BookOpen, text: 'Código fuente, documentación técnica y video-tutoriales — es 100% suyo' },
    ];

    const costs = [
        { name: 'VPS Hetzner (principal + staging)', range: '$675 MXN' },
        { name: 'Cloudflare Pro (WAF + CDN + SSL)', range: '$350 MXN' },
        { name: 'Storage Cloudflare R2', range: '$90 – $175 MXN' },
        { name: 'APIs de IA (solo después de Fase 2)', range: '$175 – $350 MXN' },
    ];

    const payments = [
        { numero: '1', momento: 'Firma de contrato y arranque', monto: '$110,000' },
        { numero: '2', momento: 'Lanzamiento Fase 1 — portal en producción (Sem. 12)', monto: '$65,000' },
        { numero: '3', momento: 'Entrega Fase 2 — IA activa y cierre de proyecto', monto: '$44,000' },
    ];

    return (
        <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />
            </div>
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(201,168,76,0.8)' }}>
                        <span className="w-8 h-px" style={{ background: 'rgba(201,168,76,0.5)' }} />
                        Inversión
                        <span className="w-8 h-px" style={{ background: 'rgba(201,168,76,0.5)' }} />
                    </motion.span>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
                        Lo Que Incluye la Inversión
                    </motion.h2>
                </motion.div>

                {/* Includes grid */}
                <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                    {includes.map((item, i) => (
                        <motion.div key={i} variants={itemVariants} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201,168,76,0.1)' }}>
                                <item.icon className="w-5 h-5" style={{ color: '#C9A84C' }} />
                            </div>
                            <span className="text-slate-300 text-sm leading-relaxed pt-2">{item.text}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Big price card */}
                <motion.div className="relative p-8 md:p-12 rounded-3xl overflow-hidden mb-8"
                    style={{ background: 'linear-gradient(135deg, rgba(27,58,92,0.6) 0%, rgba(10,22,40,0.8) 50%, rgba(27,58,92,0.4) 100%)', border: '1px solid rgba(201,168,76,0.25)' }}
                    initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                    {/* blobs */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: '#C9A84C', opacity: 0.12 }} />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: '#4A7FB5', opacity: 0.15 }} />

                    <div className="relative z-10 text-center mb-8">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-slate-400 mb-4">Inversión Total del Proyecto (Fase 1 + Fase 2)</p>
                        <div className="flex items-end justify-center gap-3 mb-2">
                            <span className="text-6xl md:text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text"
                                style={{ backgroundImage: 'linear-gradient(135deg, #e8cc7e, #C9A84C, #e8cc7e)' }}>
                                $219,000
                            </span>
                            <span className="text-2xl font-bold text-slate-400 pb-3">MXN</span>
                        </div>
                        <p className="text-slate-500 text-sm">(+ IVA)</p>
                    </div>

                    {/* Desglose de fases */}
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}>
                            <p className="text-[10px] tracking-[0.2em] uppercase text-amber-400/80 mb-1">Fase 1 — Portal Completo</p>
                            <p className="text-2xl font-bold text-white">$145,000 <span className="text-slate-400 text-base font-normal">MXN</span></p>
                        </div>
                        <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(74,127,181,0.08)', border: '1px solid rgba(74,127,181,0.2)' }}>
                            <p className="text-[10px] tracking-[0.2em] uppercase text-blue-400/80 mb-1">Fase 2 — Inteligencia Artificial</p>
                            <p className="text-2xl font-bold text-white">$72,000 <span className="text-slate-400 text-base font-normal">MXN</span></p>
                        </div>
                    </div>

                    <div className="relative z-10 p-4 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <p className="text-slate-400 text-sm">
                            Incluye{' '}
                            <span className="text-white font-medium">Transferencia Total de Propiedad Intelectual (Código Fuente)</span>.{' '}
                            Revista La Nación es dueña al 100%.
                        </p>
                    </div>
                </motion.div>

                {/* Costos operativos */}
                <motion.div className="p-6 md:p-8 rounded-2xl mb-8 border border-white/[0.06] bg-white/[0.02]"
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
                    <h3 className="text-white font-bold text-lg mb-6">Costos operativos mensuales <span className="text-slate-500 font-normal text-sm">(después del lanzamiento)</span></h3>
                    <div className="space-y-3 mb-6">
                        {costs.map((c, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.05]">
                                <span className="text-slate-400 text-sm">{c.name}</span>
                                <span className="text-white font-semibold text-sm">{c.range}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}>
                        <span className="font-bold text-white">Total estimado mensual</span>
                        <span className="font-bold text-xl" style={{ color: '#C9A84C' }}>$1,290 – $1,550 MXN/mes</span>
                    </div>
                    <p className="text-slate-500 text-xs mt-3">*Sin IA activa (solo Fase 1): $1,115 – $1,200 MXN/mes</p>
                </motion.div>

                {/* Esquema de pagos */}
                <motion.div className="p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
                    <h3 className="text-white font-bold text-lg mb-6">Esquema de Pagos</h3>
                    <div className="space-y-3">
                        {payments.map((p) => (
                            <div key={p.numero} className="flex items-center gap-4 py-3 border-b border-white/[0.05]">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}>
                                    {p.numero}
                                </div>
                                <span className="text-slate-400 text-sm flex-1">{p.momento}</span>
                                <span className="text-white font-bold">{p.monto} <span className="text-slate-500 font-normal text-xs">MXN</span></span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
});
OfferSection.displayName = 'OfferSection';

/* -------------------------------------------------------------------------- */
/* CTA SECTION                                                                 */
/* -------------------------------------------------------------------------- */

const CTASection = memo(() => (
    <section className="relative py-24 md:py-36">
        <div className="absolute inset-0 overflow-hidden pointer-events-none blur-3xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)' }} />
        </div>
        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                <motion.div variants={itemVariants} className="inline-flex w-20 h-20 rounded-2xl items-center justify-center mb-8 mx-auto"
                    style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)' }}>
                    <Sparkles className="w-10 h-10" style={{ color: '#C9A84C' }} />
                </motion.div>

                <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
                    ¿Listos para darle a La Nación<br />
                    <span className="text-transparent bg-clip-text animate-gradient-flow" style={{ backgroundImage: 'linear-gradient(135deg, #e8cc7e, #C9A84C, #a8842e, #C9A84C)' }}>
                        el portal que merece?
                    </span>
                </motion.h2>

                <motion.p variants={itemVariants} className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                    80 años de historia política de México merecen una plataforma a la altura.{' '}
                    <span className="text-white">Construyámosla juntos.</span>
                </motion.p>

                {/* Steps */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                    {['Aprobación de esta propuesta', 'Firma de acuerdo y anticipo', 'Inicio inmediato: primera entrega en 5 semanas'].map((step, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                                style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}>
                                {i + 1}
                            </div>
                            <span className="text-slate-400 text-sm text-left">{step}</span>
                            {i < 2 && <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:block flex-shrink-0" />}
                        </div>
                    ))}
                </motion.div>

                <motion.div variants={itemVariants}>
                    <motion.a
                        href="https://wa.me/529984750514?text=Hola%2C%20me%20interesa%20iniciar%20el%20proyecto%20del%20nuevo%20portal%20de%20Revista%20La%20Naci%C3%B3n%20con%20FINEM"
                        target="_blank" rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-4 px-12 py-6 rounded-xl font-bold tracking-[0.15em] text-sm uppercase transition-all duration-500 text-black"
                        style={{ background: 'linear-gradient(135deg, #e8cc7e 0%, #C9A84C 50%, #a8842e 100%)' }}
                    >
                        Iniciar Proyecto Ahora
                        <ArrowRight className="w-5 h-5" />
                    </motion.a>
                </motion.div>
            </motion.div>
        </div>
    </section>
));
CTASection.displayName = 'CTASection';

/* -------------------------------------------------------------------------- */
/* FOOTER                                                                      */
/* -------------------------------------------------------------------------- */

const ProposalFooter = memo(() => (
    <footer className="border-t border-white/[0.06] py-12">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <LogoFinem className="h-8 w-auto text-white opacity-60" />
                <span className="text-slate-500 text-xs tracking-[0.2em] uppercase">
                    Propuesta Exclusiva Revista La Nación 2026
                </span>
            </div>
            <p className="text-slate-600 text-xs">© 2026 FINEM. Todos los derechos reservados.</p>
        </div>
    </footer>
));
ProposalFooter.displayName = 'ProposalFooter';

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                              */
/* -------------------------------------------------------------------------- */

const LaNacionAIProposalF = () => {
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
                <ComplianceSection />
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

export default LaNacionAIProposalF;