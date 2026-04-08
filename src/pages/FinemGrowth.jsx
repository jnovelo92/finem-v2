import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight, ChevronDown, Check, Star, Zap, Target, BarChart3, Users, Clock,
    TrendingUp, MessageCircle, Calendar, Sparkles, Play, ChevronRight, Instagram,
    Phone, X, Plus, Minus, Menu,
} from 'lucide-react';
import { motion, AnimatePresence, useTransform, useScroll, useMotionValue, useSpring, useInView } from 'framer-motion';

/* ========================================================================== */
/* GLOBAL STYLES + KEYFRAMES                                                   */
/* ========================================================================== */
const GrowthStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    .growth-root { scroll-behavior: smooth; }
    .growth-root * { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
    @keyframes blob-float {
      0%,100%{transform:translate(0,0) scale(1)}
      33%{transform:translate(30px,-40px) scale(1.05)}
      66%{transform:translate(-20px,20px) scale(0.95)}
    }
    @keyframes blob-float-reverse {
      0%,100%{transform:translate(0,0) scale(1)}
      33%{transform:translate(-25px,35px) scale(1.04)}
      66%{transform:translate(20px,-25px) scale(0.97)}
    }
    .blob-1{animation:blob-float 18s ease-in-out infinite;will-change:transform}
    .blob-2{animation:blob-float-reverse 22s ease-in-out infinite;will-change:transform}
    .blob-3{animation:blob-float 26s ease-in-out infinite reverse;will-change:transform}
    @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
    .shimmer-sweep::after{
      content:'';position:absolute;inset:0;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent);
      animation:shimmer 4s ease-in-out infinite;pointer-events:none;border-radius:inherit;
    }
    @keyframes pulse-ring{
      0%{transform:scale(1);opacity:.5}
      100%{transform:scale(1.6);opacity:0}
    }
    .pulse-ring{
      position:absolute;inset:-6px;border-radius:9999px;
      border:2px solid #E8845C;animation:pulse-ring 2s ease-out infinite;pointer-events:none;
    }
    .pulse-ring-2{animation-delay:0.7s}
    .pulse-ring-3{animation-delay:1.4s}
    @keyframes gradient-border{
      0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}
    }
    @keyframes float-subtle{
      0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}
    }
    .card-float:hover{animation:float-subtle 3s ease-in-out infinite}
    @media(max-width:768px){
      .blob-1,.blob-2,.blob-3{filter:blur(60px)!important}
    }
    /* Scroll progress bar */
    .scroll-progress{
      position:fixed;bottom:0;left:0;height:3px;z-index:200;
      background:linear-gradient(90deg,#E8845C,#3B7DD8);
      transform-origin:left;pointer-events:none;
    }
  `}</style>
);

/* ========================================================================== */
/* GRAIN OVERLAY                                                               */
/* ========================================================================== */
const GrainOverlay = memo(() => (
    <div className="fixed inset-0 pointer-events-none z-[1]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat', backgroundSize: '180px 180px', mixBlendMode: 'overlay', opacity: 0.22,
    }} />
));
GrainOverlay.displayName = 'GrainOverlay';

/* ========================================================================== */
/* SCROLL PROGRESS BAR                                                         */
/* ========================================================================== */
const ScrollProgress = memo(() => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    return <motion.div className="scroll-progress" style={{ scaleX }} />;
});
ScrollProgress.displayName = 'ScrollProgress';

/* ========================================================================== */
/* LOGO FINEM                                                                  */
/* ========================================================================== */
const LogoFinem = memo(({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 1664.2 706.9" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M335.7,166.9h-133.6c0-18.8-15.3-34-34.2-34s-34.2,15.2-34.2,34h-.1v506c0,18.7-15.3,33.9-34.1,33.9H0V170.4C0,79.5,71.7,2.6,163.1,0c94.9-2.6,172.6,73,172.6,166.8Z" />
        <path d="M740,504v201.4h-99.3c-18.9,0-34.2-15.3-34.2-34.1v-167.3h-.1c0-18.7-15.3-34-34.2-34s-34.2,15.3-34.2,34h-.1v35.1c0,80.5-57.3,147.6-133.5,163.4-11.1,2.3-22.6,3.5-34.4,3.5s-23.2-1.2-34.2-3.5c-74.5-15.3-130.9-79.7-133.5-157.7v-172.7h133.5v167c0,18.8,15.3,34,34.2,34s34.2-15.2,34.2-34h.1v-31.6c0-91,71.8-167.9,163.2-170.3,94.8-2.5,172.5,73.1,172.5,166.8Z" />
        <path d="M268.9,304.4c18.9,0,34.2-15.2,34.2-34s-15.3-34-34.2-34-34.2,15.2-34.2,34,15.3,34,34.2,34Z" />
        <path d="M1664.2,507.9v197.9h-99.3c-18.9,0-34.2-15.2-34.2-34v-167.4h-.1c0-18.7-15.3-34-34.2-34s-34.2,15.3-34.2,34h-.1v201.4h-133.5v-201.4h-.1c0-18.7-15.3-34-34.2-34s-34.2,15.3-34.2,34h-.1v201.4h-99.4c-18.8,0-34.1-15.2-34.1-33.9v-163.9c0-92.4,74-169.9,166.9-170.4,38.3-.2,73.7,12.4,102,33.6,28.3-21.3,63.7-33.8,102-33.6,92.9.5,166.9,78,166.9,170.4Z" />
        <path d="M1087.1,624s0,.1-.1.2c-.2.4-.5.7-.7,1.1-14.4,23.6-34.6,43.4-58.6,57.4-.7.4-1.3.9-2,1.2-.6.4-1.3.8-2,1.1-24,13.3-51.6,20.8-81,20.8-92.8,0-168-74.8-168-167.1s64.2-155.5,147-165.8h0c6.9-.9,13.8-1.3,20.9-1.3s14.1.4,20.9,1.3h0c55,6.8,101.8,40.1,127,86.6l-113.9,79-43.2,29.9-10.8,7.5h0c-8.7,6.3-14.3,16.3-14.3,27.8,0,18.8,15.3,34,34.2,34s1.8,0,2.6-.1c.9,0,1.8-.2,2.6-.3.8-.1,1.6-.3,2.4-.5h.2c.8-.2,1.6-.4,2.4-.7.8-.3,1.6-.5,2.4-.9.8-.3,1.6-.6,2.3-1,1.5-.7,3-1.5,4.3-2.5l1.6-1.1,73.5-51,2.1-1.4c10.6-6.7,24.4-7.4,36-.6,16.2,9.5,21.5,30.3,12,46.5Z" />
    </svg>
));
LogoFinem.displayName = 'LogoFinem';

/* ========================================================================== */
/* ANIMATION VARIANTS                                                          */
/* ========================================================================== */
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] } },
};
const lineReveal = {
    hidden: { scaleX: 0, originX: 0 },
    visible: { scaleX: 1, transition: { duration: 1, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 } },
};

/* ========================================================================== */
/* ANIMATED COUNTER HOOK                                                       */
/* ========================================================================== */
function useAnimatedCounter(target, duration = 1.5, isInView = false) {
    const motionVal = useMotionValue(0);
    const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });
    const [display, setDisplay] = useState('0');
    useEffect(() => {
        if (isInView) motionVal.set(target);
    }, [isInView, target, motionVal]);
    useEffect(() => {
        const unsub = spring.on('change', (v) => {
            setDisplay(Math.round(v).toLocaleString());
        });
        return unsub;
    }, [spring]);
    return display;
}

/* ========================================================================== */
/* NAVBAR + MOBILE DRAWER                                                      */
/* ========================================================================== */
const GrowthNavbar = memo(() => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        const h = () => setIsScrolled(window.scrollY > 30);
        window.addEventListener('scroll', h, { passive: true });
        return () => window.removeEventListener('scroll', h);
    }, []);

    const scrollTo = (id) => {
        setDrawerOpen(false);
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    const navLinks = [['Paquetes', 'paquetes'], ['Proceso', 'proceso'], ['FAQ', 'faq']];

    return (
        <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'}`}>
            <div className={`absolute inset-0 transition-all duration-500 pointer-events-none ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
                style={{ background: 'rgba(253,246,240,0.9)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', boxShadow: '0 1px 24px rgba(0,0,0,0.06)' }} />
            <div className="container mx-auto px-5 md:px-10 relative z-10 flex justify-between items-center max-w-6xl">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}>
                    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <LogoFinem className="h-6 md:h-7 w-auto" style={{ color: '#1A1A2E' }} />
                        <span className="text-[10px] md:text-[11px] tracking-[0.15em] uppercase" style={{ color: '#E8845C', fontWeight: 700 }}>growth</span>
                    </Link>
                </motion.div>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map(([label, id]) => (
                        <button key={id} onClick={() => scrollTo(id)}
                            className="text-sm transition-colors cursor-pointer relative group"
                            style={{ color: '#5C5C7A', fontWeight: 500 }}
                            onMouseEnter={e => e.currentTarget.style.color = '#1A1A2E'}
                            onMouseLeave={e => e.currentTarget.style.color = '#5C5C7A'}>
                            {label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E8845C] transition-all duration-300 group-hover:w-full" />
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <motion.button onClick={() => scrollTo('cta')}
                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        className="hidden sm:flex px-5 py-2.5 rounded-full text-white text-sm font-bold cursor-pointer transition-colors"
                        style={{ backgroundColor: '#E8845C' }}>
                        Agenda tu diagnóstico
                    </motion.button>
                    {/* Mobile hamburger */}
                    <button className="md:hidden p-2 cursor-pointer" onClick={() => setDrawerOpen(!drawerOpen)}>
                        <motion.div animate={{ rotate: drawerOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
                            {drawerOpen ? <X className="w-6 h-6" style={{ color: '#1A1A2E' }} /> : <Menu className="w-6 h-6" style={{ color: '#1A1A2E' }} />}
                        </motion.div>
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            <AnimatePresence>
                {drawerOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
                        className="md:hidden overflow-hidden"
                        style={{ background: 'rgba(253,246,240,0.97)', backdropFilter: 'blur(20px)' }}>
                        <div className="px-6 py-6 flex flex-col gap-4">
                            {navLinks.map(([label, id], i) => (
                                <motion.button key={id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    onClick={() => scrollTo(id)}
                                    className="text-left text-lg font-semibold cursor-pointer py-2"
                                    style={{ color: '#1A1A2E', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                                    {label}
                                </motion.button>
                            ))}
                            <motion.button
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                                onClick={() => scrollTo('cta')}
                                className="mt-2 py-3.5 rounded-full text-white text-sm font-bold cursor-pointer text-center"
                                style={{ backgroundColor: '#E8845C' }}>
                                Agenda tu diagnóstico
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
});
GrowthNavbar.displayName = 'GrowthNavbar';

/* ========================================================================== */
/* HERO SECTION — Parallax Blobs + Word Reveal                                 */
/* ========================================================================== */
const HeroSection = memo(() => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const blobY1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const blobY2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const blobY3 = useTransform(scrollYProgress, [0, 1], [0, 160]);

    const headlineWords1 = ['Tu', 'negocio', 'merece', 'más'];
    const headlineWords2 = ['que', 'publicar', 'por', 'publicar.'];

    return (
        <section ref={ref} className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 md:pb-20 overflow-hidden"
            style={{ backgroundColor: '#FDF6F0' }}>
            {/* Parallax blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div style={{ y: blobY1 }} className="blob-1 absolute -top-[15%] -left-[10%] w-[70vw] md:w-[55vw] h-[70vw] md:h-[55vw] rounded-full"
                    {...{ style: { y: blobY1, background: '#3B7DD8', opacity: 0.28, filter: 'blur(90px)' } }} />
                <motion.div style={{ y: blobY2 }} className="blob-2 absolute top-[20%] left-[25%] md:left-[35%] w-[60vw] md:w-[45vw] h-[60vw] md:h-[45vw] rounded-full"
                    {...{ style: { y: blobY2, background: '#E8845C', opacity: 0.32, filter: 'blur(100px)' } }} />
                <motion.div style={{ y: blobY3 }} className="blob-3 absolute bottom-[-5%] right-[-5%] w-[50vw] md:w-[40vw] h-[50vw] md:h-[40vw] rounded-full"
                    {...{ style: { y: blobY3, background: '#F0A07A', opacity: 0.35, filter: 'blur(80px)' } }} />
                <div className="absolute top-[40%] right-[10%] w-[35vw] md:w-[30vw] h-[35vw] md:h-[30vw] rounded-full"
                    style={{ background: '#C4A8D4', opacity: 0.2, filter: 'blur(120px)' }} />
            </div>

            <div className="container mx-auto px-5 md:px-10 max-w-6xl relative z-10">
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6 md:mb-8">
                        <span className="text-[9px] md:text-[11px] font-bold tracking-[0.25em] md:tracking-[0.35em] uppercase px-3 md:px-4 py-1.5 rounded-full"
                            style={{ color: '#E8845C', background: 'rgba(232,132,92,0.1)', border: '1px solid rgba(232,132,92,0.25)' }}>
                            Contenido Estratégico para Negocios que Quieren Crecer
                        </span>
                    </motion.div>

                    <div className="max-w-4xl mb-6 md:mb-8">
                        <h1 className="font-extrabold leading-[1.08] tracking-tight mb-5 md:mb-6"
                            style={{ fontSize: 'clamp(2rem, 8vw, 3.8rem)', color: '#1A1A2E' }}>
                            {headlineWords1.map((w, i) => (
                                <motion.span key={i} className="inline-block mr-[0.28em]"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: [0.25, 0.4, 0.25, 1] }}>
                                    {w}
                                </motion.span>
                            ))}
                            <br />
                            {headlineWords2.map((w, i) => (
                                <motion.span key={i} className="inline-block mr-[0.28em]"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.8 + i * 0.1, ease: [0.25, 0.4, 0.25, 1] }}>
                                    {w}
                                </motion.span>
                            ))}
                        </h1>

                        <motion.p variants={itemVariants}
                            className="text-base md:text-xl leading-relaxed max-w-[560px]"
                            style={{ color: '#5C5C7A' }}>
                            Estrategia, contenido y estructura digital. Todo lo que necesitas
                            para que tus redes vendan, no solo se vean bonitas.
                        </motion.p>
                    </div>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12 md:mb-16">
                        <motion.button onClick={() => document.getElementById('paquetes')?.scrollIntoView({ behavior: 'smooth' })}
                            whileHover={{ scale: 1.04, backgroundColor: '#D4703F' }} whileTap={{ scale: 0.97 }}
                            className="relative flex items-center gap-3 px-7 md:px-8 py-3.5 md:py-4 rounded-full text-white font-bold text-sm cursor-pointer transition-colors"
                            style={{ backgroundColor: '#E8845C' }}>
                            <span className="pulse-ring" /><span className="pulse-ring pulse-ring-2" />
                            Ver paquetes
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                        <button onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                            className="flex items-center gap-2 text-sm font-medium cursor-pointer transition-colors"
                            style={{ color: '#3B7DD8', textDecoration: 'underline', textUnderlineOffset: 3 }}
                            onMouseEnter={e => e.currentTarget.style.color = '#2563C8'}
                            onMouseLeave={e => e.currentTarget.style.color = '#3B7DD8'}>
                            ¿Prefieres que te expliquemos? Agenda una llamada →
                        </button>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-wrap gap-3 md:gap-6 items-center">
                        {[
                            { val: '3x', label: 'más alcance en 90 días' },
                            { val: '+45%', label: 'de interacciones' },
                            { val: '90 días', label: 'para resultados claros' },
                        ].map((m) => (
                            <motion.div key={m.val} whileHover={{ scale: 1.05, rotate: 1 }}
                                className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-xl cursor-default"
                                style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.8)' }}>
                                <span className="font-extrabold text-base md:text-lg" style={{ color: '#E8845C' }}>{m.val}</span>
                                <span className="text-[11px] md:text-xs font-medium" style={{ color: '#5C5C7A' }}>{m.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            <motion.div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
                <ChevronDown className="w-5 h-5 animate-bounce" style={{ color: '#E8845C' }} />
            </motion.div>
        </section>
    );
});
HeroSection.displayName = 'HeroSection';

/* ========================================================================== */
/* DOLOR SECTION — Gradient Border Cards                                       */
/* ========================================================================== */
const DolorSection = memo(() => {
    const dolores = [
        { icon: Calendar, text: 'Publicas cuando te acuerdas y nunca sabes qué poner.' },
        { icon: X, text: 'Contrataste a alguien barato y los resultados fueron peores que no hacer nada.' },
        { icon: TrendingUp, text: 'Tus redes se ven bien pero no te llegan clientes nuevos de ahí.' },
        { icon: Clock, text: 'No tienes tiempo para pensar en contenido, estás operando el negocio.' },
        { icon: Target, text: 'Sabes que necesitas estar en redes pero no sabes por dónde empezar con estrategia.' },
        { icon: Users, text: 'Tu competencia está creciendo en redes y tú te estás quedando atrás.' },
    ];
    return (
        <section id="dolor" className="relative py-20 md:py-32" style={{ background: 'linear-gradient(to bottom, #FDF6F0 0%, #FFF0E6 100%)' }}>
            <div className="container mx-auto px-5 md:px-10 max-w-6xl relative z-10">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={containerVariants}>
                    <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
                        <h2 className="font-bold leading-tight mb-3" style={{ fontSize: 'clamp(1.7rem, 6vw, 2.8rem)', color: '#1A1A2E' }}>
                            ¿Te suena familiar?
                        </h2>
                        <p className="text-sm md:text-base max-w-lg mx-auto" style={{ color: '#5C5C7A' }}>
                            Si tu negocio tiene producto y clientes pero tu presencia digital está abandonada, esto es para ti.
                        </p>
                    </motion.div>

                    <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-10 md:mb-12">
                        {dolores.map((d, i) => (
                            <motion.div key={i} variants={itemVariants}
                                className="relative flex items-start gap-4 p-5 md:p-6 rounded-2xl transition-all duration-300 group card-float overflow-hidden"
                                style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
                                whileHover={{ y: -4, boxShadow: '0 12px 36px rgba(232,132,92,0.12)' }}>
                                {/* Gradient border on hover */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ padding: 1, background: 'linear-gradient(135deg, #E8845C, #3B7DD8, #E8845C)', backgroundSize: '200% 200%', animation: 'gradient-border 3s ease infinite', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
                                <motion.div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'rgba(232,132,92,0.1)' }}
                                    whileHover={{ scale: 1.15, rotate: 5 }}>
                                    <d.icon className="w-5 h-5" style={{ color: '#E8845C' }} />
                                </motion.div>
                                <p className="text-sm leading-relaxed pt-1" style={{ color: '#1A1A2E' }}>{d.text}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants} className="text-center">
                        <p className="text-base md:text-lg font-semibold" style={{ color: '#E8845C' }}>
                            "Si dijiste 'sí' a al menos una, Finem Growth es para ti."
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
});
DolorSection.displayName = 'DolorSection';

/* ========================================================================== */
/* SOLUCIÓN SECTION — 3D Tilt Cards (desktop)                                  */
/* ========================================================================== */
const TiltCard = memo(({ children, className, style }) => {
    const ref = useRef(null);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
    const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

    const handleMove = useCallback((e) => {
        if (window.innerWidth < 768) return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        rotateX.set(y * -8);
        rotateY.set(x * 8);
    }, [rotateX, rotateY]);

    const handleLeave = useCallback(() => {
        rotateX.set(0);
        rotateY.set(0);
    }, [rotateX, rotateY]);

    return (
        <motion.div ref={ref} className={className} style={{ ...style, perspective: 800, rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMove} onMouseLeave={handleLeave} variants={itemVariants}>
            {children}
        </motion.div>
    );
});
TiltCard.displayName = 'TiltCard';

const SolucionSection = memo(() => {
    const pilares = [
        { num: '01', title: 'Planeación Estratégica', desc: 'Cada pieza de contenido tiene un objetivo de negocio. Sin plan, no hay producción.', icon: Target },
        { num: '02', title: 'Contenido de Alto Impacto', desc: 'Reels, flyers y textos diseñados para captar atención y convertir, no solo para verse bien.', icon: Play },
        { num: '03', title: 'Gestión Optimizada', desc: 'Programación, descripciones virales e historias que mantienen tu marca activa todos los días.', icon: Calendar },
        { num: '04', title: 'Human Power', desc: 'Consultoría humana real. Revisamos métricas, ajustamos estrategia y te explicamos todo sin tecnicismos.', icon: Users },
    ];

    return (
        <section id="solucion" className="relative py-20 md:py-32 overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #FDF6F0 0%, #FFFFFF 60%, #FFF0E6 100%)' }}>
            <div className="absolute -right-[10%] top-[10%] w-[40vw] h-[40vw] rounded-full pointer-events-none"
                style={{ background: '#E8845C', opacity: 0.1, filter: 'blur(100px)' }} />
            <div className="container mx-auto px-5 md:px-10 max-w-6xl relative z-10">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={containerVariants}>
                    <motion.div variants={itemVariants} className="mb-3 md:mb-4">
                        <span className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: '#3B7DD8' }}>Así Funciona</span>
                    </motion.div>
                    <motion.div variants={lineReveal} className="h-[2px] w-16 mb-8 md:mb-10 rounded-full" style={{ background: 'linear-gradient(90deg, #3B7DD8, #E8845C)' }} />

                    <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 mb-12 md:mb-16 items-end">
                        <div>
                            <h2 className="font-bold leading-tight mb-4 md:mb-6" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.6rem)', color: '#1A1A2E' }}>
                                No hacemos marketing.<br />Estructuramos tu negocio digital.
                            </h2>
                        </div>
                        <div>
                            <p className="text-sm md:text-lg leading-relaxed" style={{ color: '#5C5C7A', maxWidth: 480 }}>
                                Mientras otras agencias te entregan posts bonitos y se van, nosotros construimos el sistema completo: estrategia, contenido con objetivo, gestión de canales y reportes que te dicen exactamente qué está funcionando.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                        {pilares.map((p) => (
                            <TiltCard key={p.num}
                                className="relative p-6 md:p-7 rounded-2xl overflow-hidden cursor-default"
                                style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                                <span className="absolute top-3 right-4 md:top-4 md:right-5 font-extrabold pointer-events-none select-none"
                                    style={{ fontSize: 60, color: '#E8845C', opacity: 0.1, lineHeight: 1 }}>{p.num}</span>
                                <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-4 md:mb-5"
                                    style={{ background: 'rgba(232,132,92,0.1)' }}>
                                    <p.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#E8845C' }} />
                                </div>
                                <h3 className="font-bold text-base md:text-lg mb-2" style={{ color: '#1A1A2E' }}>{p.title}</h3>
                                <p className="text-xs md:text-sm leading-relaxed" style={{ color: '#5C5C7A' }}>{p.desc}</p>
                                {/* Mobile accent border */}
                                <div className="md:hidden absolute left-0 top-4 bottom-4 w-[3px] rounded-full" style={{ background: '#E8845C' }} />
                            </TiltCard>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
});
SolucionSection.displayName = 'SolucionSection';

/* ========================================================================== */
/* PAQUETES DATA                                                               */
/* ========================================================================== */
const paquetesData = [
    {
        id: 'arranca', badge: 'ARRANCA', precio: 11900, promesa: '"Deja de improvisar. Tu contenido ahora tiene estrategia."', popular: false,
        items: [
            { text: 'Onboarding completo + plan estratégico trimestral + idea creativa mensual', highlight: false },
            { text: '6 reels optimizados (TikTok, Instagram, Facebook) + 6 publicaciones estáticas', highlight: false },
            { text: 'Descripciones optimizadas para viralidad', highlight: false },
            { text: 'Historias destacadas + programación automatizada', highlight: false },
            { text: '1 sesión mensual de consultoría + reporte de métricas', highlight: false },
        ],
        bonus: ['Optimización de perfiles (Instagram, TikTok, Facebook)', 'Optimización de feed (Instagram y TikTok)', 'Guía de contenido de historias mensuales'],
    },
    {
        id: 'crece', badge: 'CRECE', precio: 15900, promesa: '"No solo publicas. Ahora apareces, convences y vendes."', popular: true,
        items: [
            { text: 'Todo lo del plan Arranca', highlight: false },
            { text: 'Configuración de Facebook Business Manager y administrador de anuncios', highlight: true },
            { text: '6 reels + 6 publicaciones estáticas + 1 reel publicitario mensual', highlight: true },
            { text: '10 tomas B-Roll de servicio/producto + 4 diseños publicitarios', highlight: true },
            { text: 'Posicionamiento en Google y gestión de reputación en TripAdvisor', highlight: true },
        ],
        bonus: ['IA entrenada en gestión estratégica y ventas (chatbot interno)', 'Plantilla de conversaciones para aumentar ventas por DM/WhatsApp'],
    },
    {
        id: 'domina', badge: 'DOMINA', precio: 21900, promesa: '"Tu negocio funciona con sistema. Vendes incluso mientras duermes."', popular: false,
        items: [
            { text: 'Todo lo del plan Crece', highlight: false },
            { text: 'Landing Page profesional de conversión', highlight: true },
            { text: 'Asistente virtual 24/7 (IA conversacional)', highlight: true },
            { text: 'Automatización de conversaciones en WhatsApp/DMs', highlight: true },
        ],
        bonus: ['Entrenamiento en ventas y administración para empleados', 'Auditoría de negocio completa', 'Estrategia de retención y fidelización de clientes'],
    },
];

/* ========================================================================== */
/* ANIMATED PRICE                                                              */
/* ========================================================================== */
const AnimatedPrice = memo(({ value }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-20px' });
    const display = useAnimatedCounter(value, 1.2, isInView);
    return <span ref={ref}>${display}</span>;
});
AnimatedPrice.displayName = 'AnimatedPrice';

/* ========================================================================== */
/* PAQUETES SECTION                                                            */
/* ========================================================================== */
const PaquetesSection = memo(() => {
    const [showTable, setShowTable] = useState(false);
    return (
        <section id="paquetes" className="relative py-20 md:py-32 overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #3B7DD8 0%, #5BA3E6 25%, #E8845C 55%, #F0A07A 78%, #F5C4A1 100%)' }} />
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="blob-1 absolute -top-[20%] -left-[15%] w-[50vw] h-[50vw] rounded-full" style={{ background: '#3B7DD8', opacity: 0.5, filter: 'blur(80px)' }} />
                <div className="blob-2 absolute top-[30%] left-[30%] w-[45vw] h-[45vw] rounded-full" style={{ background: '#E8845C', opacity: 0.5, filter: 'blur(90px)' }} />
                <div className="blob-3 absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full" style={{ background: '#C4A8D4', opacity: 0.45, filter: 'blur(100px)' }} />
                {/* Decorative arc */}
                <svg className="absolute top-[10%] right-[5%] w-[300px] h-[300px] opacity-20" viewBox="0 0 300 300"><circle cx="150" cy="150" r="140" fill="none" stroke="white" strokeWidth="1" /></svg>
                <svg className="absolute bottom-[5%] left-[8%] w-[200px] h-[200px] opacity-15" viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="none" stroke="white" strokeWidth="1" /></svg>
            </div>

            <div className="container mx-auto px-5 md:px-10 max-w-7xl relative z-10">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={containerVariants}>
                    <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
                        <span className="block text-[11px] font-bold tracking-[0.3em] uppercase text-white/70 mb-4">Elige Tu Nivel</span>
                        <h2 className="font-bold text-white leading-tight" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
                            Tres niveles. Un solo objetivo: que crezcas.
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
                        {paquetesData.map((pkg) => (
                            <motion.div key={pkg.id} variants={itemVariants}
                                className={`relative rounded-3xl overflow-hidden flex flex-col ${pkg.popular ? 'shimmer-sweep md:scale-[1.03] md:z-10' : ''}`}
                                style={{
                                    background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                                    border: pkg.popular ? '2px solid #E8845C' : '1px solid rgba(255,255,255,0.65)',
                                    boxShadow: pkg.popular ? '0 20px 60px rgba(232,132,92,0.25)' : '0 12px 40px rgba(0,0,0,0.1)',
                                }}>
                                {pkg.popular && (
                                    <div className="flex justify-center py-2.5" style={{ background: 'linear-gradient(90deg, #E8845C, #D4703F)' }}>
                                        <span className="text-white text-xs font-bold tracking-wide flex items-center gap-1.5">
                                            <Star className="w-3.5 h-3.5 fill-white" /> Más Popular
                                        </span>
                                    </div>
                                )}
                                <div className="p-6 md:p-7 flex flex-col flex-1">
                                    <div className="mb-3">
                                        <span className="inline-block px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase"
                                            style={{ background: '#FFF3EC', color: '#E8845C' }}>{pkg.badge}</span>
                                    </div>
                                    <div className="mb-1">
                                        <span className="font-extrabold" style={{ fontSize: 'clamp(32px,6vw,44px)', color: '#1A1A2E', lineHeight: 1 }}>
                                            <AnimatedPrice value={pkg.precio} />
                                        </span>
                                        <span className="text-sm md:text-base font-normal ml-1" style={{ color: '#5C5C7A' }}>/mes</span>
                                    </div>
                                    <p className="text-[11px] mb-3" style={{ color: '#5C5C7A' }}>+ IVA</p>
                                    <p className="text-xs italic leading-relaxed mb-4 pb-4" style={{ color: '#5C5C7A', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>{pkg.promesa}</p>
                                    <ul className="space-y-2.5 mb-4 flex-1">
                                        {pkg.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2.5">
                                                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                                    style={{ background: item.highlight ? 'rgba(232,132,92,0.15)' : 'rgba(76,175,80,0.15)' }}>
                                                    <Check className="w-2.5 h-2.5" style={{ color: item.highlight ? '#E8845C' : '#4CAF50' }} />
                                                </div>
                                                <span className={`text-xs leading-relaxed ${item.highlight ? 'font-semibold' : ''}`}
                                                    style={{ color: item.highlight ? '#E8845C' : '#1A1A2E' }}>{item.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="rounded-xl p-3.5 mb-5" style={{ background: '#FFF8F2' }}>
                                        <p className="text-[10px] font-bold tracking-widest uppercase mb-1.5 flex items-center gap-1.5" style={{ color: '#E8845C' }}>
                                            <Star className="w-3 h-3 fill-current" /> Bonus
                                        </p>
                                        <ul className="space-y-1">
                                            {pkg.bonus.map((b, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <ChevronRight className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: '#E8845C' }} />
                                                    <span className="text-[11px]" style={{ color: '#5C5C7A' }}>{b}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <motion.button onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                        className="w-full py-3 md:py-3.5 rounded-2xl font-bold text-sm cursor-pointer transition-all"
                                        style={pkg.popular ? { background: '#E8845C', color: '#FFF' } : { background: 'transparent', color: '#E8845C', border: '2px solid #E8845C' }}>
                                        Empezar con {pkg.badge.charAt(0) + pkg.badge.slice(1).toLowerCase()}
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Table toggle */}
                    <motion.div variants={itemVariants} className="text-center mt-8 md:mt-10">
                        <button onClick={() => setShowTable(!showTable)}
                            className="text-sm text-white/80 font-medium underline underline-offset-4 cursor-pointer hover:text-white transition-colors">
                            {showTable ? 'Ocultar tabla comparativa' : 'Ver tabla comparativa completa ↓'}
                        </button>
                    </motion.div>

                    <AnimatePresence>
                        {showTable && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }} className="overflow-hidden mt-6">
                                <div className="rounded-2xl p-4 md:p-6 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)' }}>
                                    <table className="w-full text-xs md:text-sm" style={{ color: '#1A1A2E' }}>
                                        <thead><tr style={{ borderBottom: '2px solid rgba(232,132,92,0.2)' }}>
                                            <th className="text-left py-3 pr-4 font-semibold" style={{ color: '#5C5C7A' }}>Característica</th>
                                            {paquetesData.map(p => <th key={p.id} className="text-center py-3 px-2 font-bold">{p.badge}</th>)}
                                        </tr></thead>
                                        <tbody>
                                            {['Reels mensuales', 'Plan estratégico', 'Consultoría mensual', 'Facebook Business Manager', 'B-Roll + Flyers', 'Google + TripAdvisor', 'Landing Page', 'IA Conversacional 24/7', 'Automatización WhatsApp'].map((feat, i) => (
                                                <tr key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                                                    <td className="py-2.5 pr-4">{feat}</td>
                                                    {[i < 3, i < 6, true].map((has, j) => (
                                                        <td key={j} className="text-center py-2.5">
                                                            {has ? <Check className="w-4 h-4 mx-auto" style={{ color: '#4CAF50' }} /> : <span style={{ color: '#ccc' }}>—</span>}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.p variants={itemVariants} className="text-center mt-8 text-xs md:text-sm text-white/70 font-medium">
                        Compromiso mínimo de 3 meses · Resultados reales se construyen en ciclos de 90 días
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
});
PaquetesSection.displayName = 'PaquetesSection';

/* ========================================================================== */
/* RESULTADOS — Animated Counters + Progress Rings                             */
/* ========================================================================== */
const ProgressRing = memo(({ progress, color }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const circumference = 2 * Math.PI * 20;
    return (
        <svg ref={ref} className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(232,132,92,0.12)" strokeWidth="3" />
            <motion.circle cx="24" cy="24" r="20" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
                strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }}
                animate={isInView ? { strokeDashoffset: circumference * (1 - progress) } : {}}
                transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 }}
                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
        </svg>
    );
});
ProgressRing.displayName = 'ProgressRing';

const ResultadosSection = memo(() => {
    const metricas = [
        { val: '3x', numVal: 3, label: 'más alcance en los primeros 90 días', icon: TrendingUp, progress: 0.85 },
        { val: '+45%', numVal: 45, label: 'de interacciones vs. publicar sin estrategia', icon: BarChart3, progress: 0.7 },
        { val: 'Top 5', numVal: 5, label: 'en TripAdvisor a los 6 meses', icon: Star, progress: 0.95 },
        { val: '1 sesión', numVal: 1, label: 'de grabación cubre todo el mes de contenido', icon: Play, progress: 0.6 },
    ];
    return (
        <section id="resultados" className="relative py-20 md:py-32" style={{ background: '#FDF6F0' }}>
            <div className="container mx-auto px-5 md:px-10 max-w-6xl">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={containerVariants}>
                    <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
                        <span className="text-[11px] font-bold tracking-[0.3em] uppercase block mb-4" style={{ color: '#E8845C' }}>Resultados</span>
                        <h2 className="font-bold leading-tight" style={{ fontSize: 'clamp(1.6rem,5vw,2.6rem)', color: '#1A1A2E' }}>
                            Lo que logran los negocios con estructura
                        </h2>
                    </motion.div>
                    <motion.div variants={containerVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                        {metricas.map((m, i) => (
                            <motion.div key={i} variants={itemVariants}
                                className="p-5 md:p-7 rounded-2xl text-center transition-all duration-300"
                                style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(232,132,92,0.12)', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
                                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(232,132,92,0.12)' }}>
                                <ProgressRing progress={m.progress} color="#E8845C" />
                                <p className="font-extrabold mb-1.5" style={{ fontSize: 'clamp(28px,5vw,40px)', color: '#E8845C', lineHeight: 1 }}>{m.val}</p>
                                <p className="text-[11px] md:text-xs leading-relaxed" style={{ color: '#5C5C7A' }}>{m.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
});
ResultadosSection.displayName = 'ResultadosSection';

/* ========================================================================== */
/* PROCESO — Animated Timeline                                                 */
/* ========================================================================== */
const ProcesoSection = memo(() => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-20px' });
    const pasos = [
        { num: '1', title: 'Diagnóstico Gratis', desc: 'Analizamos tu presencia digital en una videollamada de 20 min. Te decimos exactamente dónde estás y qué necesitas. Sin compromiso.' },
        { num: '2', title: 'Onboarding', desc: 'En la primera semana mapeamos tu negocio: tu cliente ideal, tu diferenciador, tus temporadas. Armamos tu plan estratégico anual.' },
        { num: '3', title: 'Producción Mensual', desc: 'Cada mes producimos tu contenido, lo programamos, optimizamos descripciones y gestionamos tus canales. Tú solo apruebas.' },
        { num: '4', title: 'Consultoría y Ajuste', desc: 'Revisamos métricas juntos, te explicamos qué funcionó y qué ajustar. Cero tecnicismos. Pura claridad.' },
    ];
    return (
        <section id="proceso" className="relative py-20 md:py-32 overflow-hidden"
            style={{ background: 'linear-gradient(to bottom, #FFFFFF 0%, #FFF0E6 100%)' }}>
            <div ref={ref} className="container mx-auto px-5 md:px-10 max-w-6xl relative z-10">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={containerVariants}>
                    <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
                        <span className="text-[11px] font-bold tracking-[0.3em] uppercase block mb-4" style={{ color: '#3B7DD8' }}>El Proceso</span>
                        <h2 className="font-bold leading-tight" style={{ fontSize: 'clamp(1.6rem,5vw,2.6rem)', color: '#1A1A2E' }}>
                            Tu camino de 0 a sistema en 4 pasos
                        </h2>
                    </motion.div>
                    <div className="relative">
                        {/* Desktop animated line */}
                        <motion.div className="hidden lg:block absolute top-8 left-[8%] right-[8%] h-[3px] rounded-full origin-left"
                            style={{ background: 'linear-gradient(to right, #E8845C, #3B7DD8)' }}
                            initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
                            transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 }} />
                        {/* Mobile vertical line */}
                        <motion.div className="lg:hidden absolute top-0 bottom-0 left-8 w-[3px] rounded-full origin-top"
                            style={{ background: 'linear-gradient(to bottom, #E8845C, #3B7DD8)' }}
                            initial={{ scaleY: 0 }} animate={isInView ? { scaleY: 1 } : {}}
                            transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 }} />

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
                            {pasos.map((p, i) => (
                                <motion.div key={p.num} variants={itemVariants}
                                    className="relative pl-16 lg:pl-0 lg:text-center"
                                    custom={i}>
                                    <motion.div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center absolute left-0 lg:static lg:mx-auto mb-4 relative z-10"
                                        style={{ background: 'linear-gradient(135deg, #E8845C, #D4703F)', boxShadow: '0 6px 24px rgba(232,132,92,0.35)' }}
                                        initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}}
                                        transition={{ duration: 0.5, delay: 0.5 + i * 0.2, ease: [0.25, 0.4, 0.25, 1] }}>
                                        <span className="text-white font-extrabold text-lg md:text-xl">{p.num}</span>
                                    </motion.div>
                                    <div className="lg:mt-5">
                                        <h3 className="font-bold text-sm md:text-base mb-1.5 md:mb-2" style={{ color: '#1A1A2E' }}>{p.title}</h3>
                                        <p className="text-xs md:text-sm leading-relaxed" style={{ color: '#5C5C7A' }}>{p.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
});
ProcesoSection.displayName = 'ProcesoSection';

/* ========================================================================== */
/* FAQ — Enhanced Accordion                                                    */
/* ========================================================================== */
const faqData = [
    { q: '¿Necesito proporcionar las fotos y videos yo?', a: 'No. Finem Growth produce el contenido. Solo necesitamos acceso a tu negocio para la sesión de grabación mensual. Nosotros nos encargamos de la producción completa.' },
    { q: '¿Cuánto tiempo tarda en verse resultados?', a: '30 días para tener presencia consistente y profesional. 90 días para métricas de crecimiento claras y medibles. Los resultados reales se construyen, no se improvisan.' },
    { q: '¿Puedo cambiar de paquete después?', a: 'Sí, con un mes de anticipación. Si tu negocio crece y necesitas más, puedes escalar a un plan superior cuando lo decidas.' },
    { q: '¿Qué pasa si no me gusta un contenido?', a: 'Todo pasa por tu aprobación antes de publicarse. Incluimos hasta 2 rondas de ajustes por pieza. Tu marca, tus estándares.' },
    { q: '¿Manejan la pauta publicitaria (ads)?', a: 'La inversión en ads es aparte y se recomienda a partir del plan Crece. Finem Growth configura todo: cuenta, audiencias y creativos. Tú solo defines el presupuesto.' },
    { q: '¿Cuál es el compromiso mínimo?', a: '3 meses. Porque los resultados reales toman al menos 90 días de trabajo consistente. Lo comunicamos desde el inicio como un ciclo de construcción, no una suscripción mes a mes.' },
    { q: '¿En qué se diferencia Finem Growth de otras agencias?', a: 'Estructura antes que cosmética. Resultados antes que likes. Socios, no proveedores. No hacemos marketing genérico; construimos el sistema digital de tu negocio con objetivos de venta claros.' },
];

const FAQSection = memo(() => {
    const [open, setOpen] = useState(null);
    return (
        <section id="faq" className="relative py-20 md:py-32" style={{ background: '#FDF6F0' }}>
            <div className="container mx-auto px-5 md:px-10 max-w-3xl">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={containerVariants}>
                    <motion.div variants={itemVariants} className="text-center mb-10 md:mb-14">
                        <h2 className="font-bold leading-tight" style={{ fontSize: 'clamp(1.6rem,5vw,2.6rem)', color: '#1A1A2E' }}>
                            Preguntas que siempre nos hacen
                        </h2>
                    </motion.div>
                    <div className="space-y-3">
                        {faqData.map((item, i) => (
                            <motion.div key={i} variants={itemVariants}
                                className="rounded-2xl overflow-hidden relative"
                                style={{ background: 'rgba(255,255,255,0.92)', border: open === i ? '1px solid rgba(232,132,92,0.3)' : '1px solid rgba(232,132,92,0.1)', boxShadow: open === i ? '0 4px 24px rgba(232,132,92,0.08)' : '0 2px 12px rgba(0,0,0,0.04)', transition: 'all 0.3s ease' }}>
                                {/* Accent border */}
                                <motion.div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
                                    style={{ background: '#E8845C' }}
                                    initial={{ scaleY: 0 }} animate={{ scaleY: open === i ? 1 : 0 }}
                                    transition={{ duration: 0.3 }} />
                                <button className="w-full flex items-center justify-between px-5 md:px-6 py-4 md:py-5 text-left cursor-pointer"
                                    onClick={() => setOpen(open === i ? null : i)}>
                                    <span className="font-semibold text-xs md:text-sm pr-4" style={{ color: '#1A1A2E' }}>{item.q}</span>
                                    <motion.div className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center"
                                        style={{ background: open === i ? '#E8845C' : 'rgba(232,132,92,0.1)' }}
                                        animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                        {open === i
                                            ? <Minus className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                                            : <Plus className="w-3 h-3 md:w-3.5 md:h-3.5" style={{ color: '#E8845C' }} />}
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {open === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}>
                                            <p className="px-5 md:px-6 pb-4 md:pb-5 text-xs md:text-sm leading-relaxed" style={{ color: '#5C5C7A' }}>{item.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
});
FAQSection.displayName = 'FAQSection';

/* ========================================================================== */
/* CTA — Magnetic Button + Pulse Rings                                         */
/* ========================================================================== */
const CTASection = memo(() => {
    const btnRef = useRef(null);
    const btnX = useMotionValue(0);
    const btnY = useMotionValue(0);
    const springBtnX = useSpring(btnX, { stiffness: 150, damping: 15 });
    const springBtnY = useSpring(btnY, { stiffness: 150, damping: 15 });

    const handleMouseMove = useCallback((e) => {
        if (window.innerWidth < 768 || !btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) { btnX.set(dx * 0.15); btnY.set(dy * 0.15); }
        else { btnX.set(0); btnY.set(0); }
    }, [btnX, btnY]);

    const handleMouseLeave = useCallback(() => { btnX.set(0); btnY.set(0); }, [btnX, btnY]);

    return (
        <section id="cta" className="relative py-24 md:py-40 overflow-hidden" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #3B7DD8 0%, #5BA3E6 30%, #E8845C 60%, #F0A07A 85%, #F5C4A1 100%)' }} />
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="blob-1 absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] rounded-full" style={{ background: '#3B7DD8', opacity: 0.5, filter: 'blur(100px)' }} />
                <div className="blob-2 absolute top-[20%] left-[35%] w-[45vw] h-[45vw] rounded-full" style={{ background: '#E8845C', opacity: 0.5, filter: 'blur(90px)' }} />
                <div className="blob-3 absolute bottom-[-15%] right-[-5%] w-[40vw] h-[40vw] rounded-full" style={{ background: '#C4A8D4', opacity: 0.4, filter: 'blur(110px)' }} />
            </div>
            <div className="container mx-auto px-5 md:px-10 max-w-4xl relative z-10 text-center">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={containerVariants}>
                    <motion.h2 variants={itemVariants} className="font-extrabold text-white leading-tight mb-5 md:mb-6"
                        style={{ fontSize: 'clamp(1.8rem,6vw,3.2rem)' }}>
                        ¿Listo para dejar de improvisar?
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-base md:text-xl mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed"
                        style={{ color: 'rgba(255,255,255,0.85)' }}>
                        Agenda tu diagnóstico gratuito. 20 minutos. Sin compromiso. Te decimos exactamente qué necesita tu negocio.
                    </motion.p>
                    <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-4">
                        <motion.a ref={btnRef}
                            href="https://wa.me/525536560439?text=Hola%2C%20quiero%20agendar%20mi%20diagn%C3%B3stico%20gratuito%20con%20Finem%20Growth"
                            target="_blank" rel="noopener noreferrer"
                            style={{ x: springBtnX, y: springBtnY, background: '#FFFFFF', color: '#E8845C', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
                            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                            className="relative flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-sm cursor-pointer w-full sm:w-auto justify-center">
                            <span className="pulse-ring" style={{ borderColor: 'rgba(255,255,255,0.5)' }} />
                            <span className="pulse-ring pulse-ring-2" style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
                            <span className="pulse-ring pulse-ring-3" style={{ borderColor: 'rgba(255,255,255,0.15)' }} />
                            Agendar diagnóstico gratuito
                            <ArrowRight className="w-4 h-4" />
                        </motion.a>
                    </motion.div>
                    <motion.a variants={itemVariants}
                        href="https://wa.me/525536560439" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-5 md:mt-6 text-sm font-medium cursor-pointer"
                        style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                        <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                            <MessageCircle className="w-4 h-4" />
                        </motion.span>
                        O escríbenos directo por WhatsApp
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
});
CTASection.displayName = 'CTASection';

/* ========================================================================== */
/* FOOTER                                                                      */
/* ========================================================================== */
const GrowthFooter = memo(() => (
    <footer className="py-10 md:py-12" style={{ backgroundColor: '#1A1A2E' }}>
        <div className="container mx-auto px-5 md:px-10 max-w-6xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6">
                <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                    <LogoFinem className="h-6 md:h-7 w-auto" style={{ color: '#FFFFFF' }} />
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: '#E8845C' }}>growth</span>
                </motion.div>
                <p className="text-[11px] md:text-xs text-center" style={{ color: 'rgba(255,255,255,0.35)' }}>Finem Growth es un producto de Finem · finem.mx</p>
                <div className="flex items-center gap-4">
                    {[{ label: 'Términos', href: '#' }, { label: 'Privacidad', href: '#' }].map(link => (
                        <a key={link.label} href={link.href} className="text-[11px] md:text-xs hover:opacity-70 transition-opacity" style={{ color: 'rgba(255,255,255,0.4)' }}>{link.label}</a>
                    ))}
                    <a href="https://www.instagram.com/finem.mx" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        <Instagram className="w-4 h-4" />
                    </a>
                </div>
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={lineReveal}
                className="mt-6 md:mt-8 h-[1px] rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="pt-6 md:pt-8 text-center">
                <p className="text-[11px] md:text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>© 2025 Finem. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
));
GrowthFooter.displayName = 'GrowthFooter';

/* ========================================================================== */
/* PAGE ROOT                                                                   */
/* ========================================================================== */
const FinemGrowth = () => (
    <div className="growth-root" style={{ backgroundColor: '#FDF6F0', overflowX: 'hidden' }}>
        <GrowthStyles />
        <GrainOverlay />
        <ScrollProgress />
        <GrowthNavbar />
        <HeroSection />
        <DolorSection />
        <SolucionSection />
        <PaquetesSection />
        <ResultadosSection />
        <ProcesoSection />
        <FAQSection />
        <CTASection />
        <GrowthFooter />
    </div>
);

export default FinemGrowth;
