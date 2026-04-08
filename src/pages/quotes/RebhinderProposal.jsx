import React, { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft,
  Check, 
  Zap, 
  Layers,
  Camera,
  Target,
  Users,
  ShoppingBag,
  Rocket,
  Heart,
  Shield,
  TrendingUp,
  Sparkles,
  Award,
  ChevronDown,
  Instagram,
  Globe,
  PlayCircle,
  Palette
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
    <path d="M335.7,166.9h-133.6c0-18.8-15.3-34-34.2-34s-34.2,15.2-34.2,34h-.1v506c0,18.7-15.3,33.9-34.1,33.9H0V170.4C0,79.5,71.7,2.6,163.1,0c94.9-2.6,172.6,73,172.6,166.8Z"/>
    <path d="M740,504v201.4h-99.3c-18.9,0-34.2-15.3-34.2-34.1v-167.3h-.1c0-18.7-15.3-34-34.2-34s-34.2,15.3-34.2,34h-.1v35.1c0,80.5-57.3,147.6-133.5,163.4-11.1,2.3-22.6,3.5-34.4,3.5s-23.2-1.2-34.2-3.5c-74.5-15.3-130.9-79.7-133.5-157.7v-172.7h133.5v167c0,18.8,15.3,34,34.2,34s34.2-15.2,34.2-34h.1v-31.6c0-91,71.8-167.9,163.2-170.3,94.8-2.5,172.5,73.1,172.5,166.8Z"/>
    <path d="M268.9,304.4c18.9,0,34.2-15.2,34.2-34s-15.3-34-34.2-34-34.2,15.2-34.2,34,15.3,34,34.2,34Z"/>
    <path d="M1664.2,507.9v197.9h-99.3c-18.9,0-34.2-15.2-34.2-34v-167.4h-.1c0-18.7-15.3-34-34.2-34s-34.2,15.3-34.2,34h-.1v201.4h-133.5v-201.4h-.1c0-18.7-15.3-34-34.2-34s-34.2,15.3-34.2,34h-.1v201.4h-99.4c-18.8,0-34.1-15.2-34.1-33.9v-163.9c0-92.4,74-169.9,166.9-170.4,38.3-.2,73.7,12.4,102,33.6,28.3-21.3,63.7-33.8,102-33.6,92.9.5,166.9,78,166.9,170.4Z"/>
    <path d="M1087.1,624s0,.1-.1.2c-.2.4-.5.7-.7,1.1-14.4,23.6-34.6,43.4-58.6,57.4-.7.4-1.3.9-2,1.2-.6.4-1.3.8-2,1.1-24,13.3-51.6,20.8-81,20.8-92.8,0-168-74.8-168-167.1s64.2-155.5,147-165.8h0c6.9-.9,13.8-1.3,20.9-1.3s14.1.4,20.9,1.3h0c55,6.8,101.8,40.1,127,86.6l-113.9,79-43.2,29.9-10.8,7.5h0c-8.7,6.3-14.3,16.3-14.3,27.8,0,18.8,15.3,34,34.2,34s1.8,0,2.6-.1c.9,0,1.8-.2,2.6-.3.8-.1,1.6-.3,2.4-.5h.2c.8-.2,1.6-.4,2.4-.7.8-.3,1.6-.5,2.4-.9.8-.3,1.6-.6,2.3-1,1.5-.7,3-1.5,4.3-2.5l1.6-1.1,73.5-51,2.1-1.4c10.6-6.7,24.4-7.4,36-.6,16.2,9.5,21.5,30.3,12,46.5Z"/>
  </svg>
));

LogoFinem.displayName = 'LogoFinem';

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
      className={`fixed top-0 w-full z-[100] transition-all duration-700 ${
        isScrolled ? "py-4" : "py-6 md:py-8" 
      }`}
    >
      <div 
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          isScrolled ? "opacity-100" : "opacity-0"
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
            Propuesta Rebhinder 2025
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/"
            className="hidden md:flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-slate-400 hover:text-white uppercase transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            Volver
          </Link>
          
          <motion.button
            onClick={() => scrollToSection('diagnostico')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-md group cursor-pointer"
          >
            <span className="text-[9px] font-bold tracking-[0.3em] text-white uppercase">Ver Estrategia</span>
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
            Propuesta Exclusiva 2025
          </span>
        </motion.div>

        <div className="mb-8 md:mb-12">
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-[1.1] text-white pb-2">
              Rebhinder:
            </h1>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-[1.1] pb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-300 via-orange-500 via-40% to-orange-400 to-90% animate-gradient-flow">
                Donde la Maestría Artesanal
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-orange-300 via-50% to-orange-500 animate-gradient-flow" style={{ animationDelay: '-2s' }}>
                Encuentra su Voz Digital.
              </span>
            </h1>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="max-w-2xl mb-12">
          <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
            No construimos campañas. Construimos un <span className="text-white font-medium">legado de marca</span> a la altura de tu producto.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.button
            onClick={() => document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-5 bg-white text-black font-bold tracking-[0.15em] text-[11px] uppercase overflow-hidden transition-all duration-500 rounded-lg cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-[2px] bg-white group-hover:bg-black transition-colors duration-500 rounded-md" />
            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500">
              Ver la Estrategia
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
          <span className="text-[10px] tracking-[0.3em] uppercase text-slate-500">Scroll para descubrir</span>
        </motion.div>
      </motion.div>
    </header>
  );
});

HeroSection.displayName = 'HeroSection';

/* -------------------------------------------------------------------------- */
/* DIAGNOSTICO SECTION                                                         */
/* -------------------------------------------------------------------------- */

const DiagnosticoSection = memo(() => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }
    }
  };

  return (
    <section id="diagnostico" className="relative py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Left - Image */}
          <motion.div variants={itemVariants} className="relative">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-orange-500/10 via-[#0a0a1a] to-purple-500/10 border border-white/10 overflow-hidden">
              <img 
                src="/carpinteria.jpg" 
                alt="Mueble artesanal Rebhinder"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="absolute inset-0 hidden items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Award className="w-10 h-10 text-orange-400" />
                  </div>
                  <p className="text-slate-400 text-sm">Foto de mueble Rebhinder</p>
                </div>
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020410]/60 via-transparent to-transparent" />
              {/* Badge */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 backdrop-blur-sm">
                <span className="text-orange-400 text-xs font-bold">10/10</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-orange-500/80 uppercase mb-6">
              <span className="w-8 h-px bg-orange-500/50" />
              El Diagnóstico
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-8">
              La Realidad<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">
                Actual
              </span>
            </h2>
            
            <div className="space-y-6 mb-10">
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                Tienes un <span className="text-orange-400 font-semibold">producto 10/10</span>. Tu calidad rivaliza con estándares internacionales. Sin embargo, tus activos digitales actuales son un <span className="text-slate-500 font-semibold">6/10</span>.
              </p>
              
              <p className="text-slate-400 leading-relaxed">
                La brecha entre lo que <em>eres</em> y lo que <em>pareces</em> te está costando clientes de alto valor. El mercado High-Ticket no compra solo madera; compra <span className="text-white">certeza</span>, <span className="text-white">estatus</span> y <span className="text-white">experiencia</span>.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.03] border border-orange-500/20">
              <p className="text-orange-400 font-semibold mb-2">Nuestra Misión:</p>
              <p className="text-white leading-relaxed">
                Elevar la percepción digital para que sea un espejo fiel de la excelencia de tu taller. Pasaremos de vender "muebles" a comercializar <span className="text-orange-400">"piezas de autor"</span>.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

DiagnosticoSection.displayName = 'DiagnosticoSection';

/* -------------------------------------------------------------------------- */
/* METHOD SECTION                                                              */
/* -------------------------------------------------------------------------- */

const MethodSection = memo(() => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const motorItems = [
    {
      icon: Camera,
      title: "Shooting Mensual In-Situ",
      description: "Dirección de arte para lograr esa estética \"Pinterest/Architectural Digest\".",
    },
    {
      icon: Instagram,
      title: "Distribución Multicanal",
      description: "Instagram, Facebook y Pinterest (Vital para deco).",
    },
    {
      icon: Target,
      title: "Ads Management",
      description: "Tráfico calificado para B2B y B2C.",
    },
    {
      icon: Users,
      title: "Gestión Comercial",
      description: "Filtramos curiosos para entregarte prospectos reales.",
    },
  ];

  const fabricaItems = [
    { phase: "Mes 1-2", title: "Branding Refinado & Landing Page", icon: Palette },
    { phase: "Mes 3-4", title: "E-commerce & Catálogos B2B", icon: ShoppingBag },
    { phase: "Mes 5", title: "Lanzamiento Oficial & Google Ads", icon: Rocket },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }
    }
  };

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-visible pointer-events-none blur-[100px]"
        style={{ transform: 'translate3d(0, 0, 0)' }}>
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full gpu-layer"
        >
          <div className="w-full h-full rounded-full" style={{ background: '#3b82f6', opacity: 0.2 }} />
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
              El Modelo
            </span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
            Partner de Crecimiento
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Olvida el modelo tradicional de agencia. No venimos a venderte un "paquete de posts". 
            Integramos <span className="text-white font-medium">dos fuerzas</span> en una sola ejecución mensual:
          </motion.p>
        </motion.div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* EL MOTOR */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                  <Zap className="w-7 h-7 text-orange-400" />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.3em] text-orange-400 uppercase font-bold">01</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">El Motor de Ventas</h3>
                </div>
              </div>
              <p className="text-slate-400 text-lg">
                La maquinaria que <span className="text-white">nunca se apaga</span>. Garantiza que siempre haya ojos en la marca.
              </p>
            </motion.div>

            <div className="space-y-4">
              {motorItems.map((item) => (
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
                      <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* LA FÁBRICA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Layers className="w-7 h-7 text-purple-400" />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.3em] text-purple-400 uppercase font-bold">02</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">La Fábrica de Activos</h3>
                </div>
              </div>
              <p className="text-slate-400 text-lg">
                Mientras el motor corre, construimos tu infraestructura digital mes a mes, <span className="text-white">sin descapitalizarte</span>.
              </p>
            </motion.div>

            <div className="space-y-4">
              {fabricaItems.map((item) => (
                <motion.div
                  key={item.phase}
                  variants={itemVariants}
                  className="group p-5 rounded-xl bg-[#0a0a1a]/80 border border-white/[0.06] hover:border-purple-500/30 transition-all duration-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <span className="text-[10px] tracking-[0.2em] text-purple-400 uppercase font-bold">{item.phase}</span>
                      <h4 className="text-white font-semibold group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </h4>
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

MethodSection.displayName = 'MethodSection';

/* -------------------------------------------------------------------------- */
/* ROADMAP SECTION                                                             */
/* -------------------------------------------------------------------------- */

const RoadmapSection = memo(() => {
  const phases = [
    {
      number: "01", title: "Cimientos", timeline: "Mes 1-2", icon: Heart,
      gradient: "from-orange-500/20 to-orange-600/10", borderColor: "border-orange-500/30",
      iconBg: "bg-orange-500/20", iconColor: "text-orange-400",
      objetivo: "Preparar el terreno y facturar rápido en San Valentín.",
      entregable: "Renovación Visual + Landing Page + Campaña Táctica Accesorios.",
    },
    {
      number: "02", title: "Pre-Lanzamiento", timeline: "Mes 3-4", icon: ShoppingBag,
      gradient: "from-blue-500/20 to-blue-600/10", borderColor: "border-blue-500/30",
      iconBg: "bg-blue-500/20", iconColor: "text-blue-400",
      objetivo: "Infraestructura profesional.",
      entregable: "E-commerce completo (Shopify) + Catálogos de Venta (Sales Enablement).",
    },
    {
      number: "03", title: "Go Live", timeline: "Mes 5-6", icon: Rocket,
      gradient: "from-purple-500/20 to-purple-600/10", borderColor: "border-purple-500/30",
      iconBg: "bg-purple-500/20", iconColor: "text-purple-400",
      objetivo: "Tracción masiva.",
      entregable: "Lanzamiento de Marca \"Lujo Accesible\" + Activación agresiva en Google Search.",
    },
    {
      number: "04", title: "Continuidad", timeline: "Mes 7-12", icon: TrendingUp,
      gradient: "from-teal-500/20 to-teal-600/10", borderColor: "border-teal-500/30",
      iconBg: "bg-teal-500/20", iconColor: "text-teal-400",
      objetivo: "Retención y LTV.",
      entregable: "Email Marketing + Campañas de Temporada (Buen Fin/Navidad).",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] } }
  };

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
            Roadmap 2025
            <span className="w-8 h-px bg-orange-500/50" />
          </motion.span>
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
            Tu Ruta al Éxito
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-slate-400 text-lg max-w-2xl mx-auto">
            No improvisamos. Ejecutamos un <span className="text-white">Plan Maestro de 4 Fases</span> diseñado para flujo de caja y posicionamiento.
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
                          Fase {phase.number} · {phase.timeline}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-white">{phase.title}</h3>
                      </div>
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

/* -------------------------------------------------------------------------- */
/* INVESTMENT SECTION                                                          */
/* -------------------------------------------------------------------------- */

const InvestmentSection = memo(() => {
  const [activeScenario, setActiveScenario] = useState('A');
  
  const scenarios = {
    A: {
      icon: Shield, title: "Estabilidad", subtitle: "(La Meta Mínima)", color: "orange",
      description: "Para cubrir el 100% de la inversión y generar utilidad, solo necesitamos vender:",
      items: ["15 Accesorios (Tablas/Bowls) al mes", "4 Muebles (Sillas/Credenzas) al mes"],
      resultado: "Con solo 1.5 ventas cada dos días, tu marketing sale \"gratis\" y generas utilidad.",
    },
    B: {
      icon: Rocket, title: "Expansión", subtitle: "(El Objetivo Real)", color: "purple",
      description: "Mantenemos la venta de accesorios y sumamos 1 Proyecto de Interiorismo/Cocina al trimestre.",
      items: ["Utilidad Operativa B2C: $58,000", "Utilidad Proyecto B2B (Prorrateado): $466,666"],
      highlight: "ROI PROYECTADO: 8.6x",
      resultado: "Por cada $1 peso invertido en FINEM, el ecosistema genera $8.6 pesos de utilidad neta.",
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] } }
  };

  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none blur-3xl">
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full" style={{ background: '#f97316', opacity: 0.12 }} />
        <div className="absolute bottom-[10%] left-[-5%] w-[35vw] h-[35vw] rounded-full" style={{ background: '#7c3aed', opacity: 0.1 }} />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div className="mb-16 md:mb-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-orange-500/80 uppercase mb-6">
            <span className="w-8 h-px bg-orange-500/50" />
            Análisis Financiero
          </motion.span>
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
            ¿Cómo se paga<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">esta inversión?</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-slate-400 text-lg max-w-2xl">
            La pregunta no es el costo, sino el <span className="text-white">retorno</span>. Hemos diseñado dos escenarios matemáticos para tu tranquilidad.
          </motion.p>
        </motion.div>

        <motion.div className="mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/10">
            <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">Tu Costo Operativo Total (Agencia + Ads Promedio)</p>
            <p className="text-3xl md:text-4xl font-bold text-white">$54,500 <span className="text-lg text-slate-400 font-normal">MXN/mes</span></p>
          </div>
        </motion.div>

        <motion.div className="flex flex-col sm:flex-row gap-4 mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {Object.entries(scenarios).map(([key, scenario]) => (
            <button
              key={key}
              onClick={() => setActiveScenario(key)}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-300 flex-1 cursor-pointer ${
                activeScenario === key
                  ? scenario.color === 'orange' ? 'bg-orange-500/20 border-orange-500/50 text-white' : 'bg-purple-500/20 border-purple-500/50 text-white'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
              }`}
            >
              <scenario.icon className={`w-5 h-5 ${activeScenario === key ? (scenario.color === 'orange' ? 'text-orange-400' : 'text-purple-400') : ''}`} />
              <div className="text-left">
                <span className="block text-sm font-bold">Escenario {key}: {scenario.title}</span>
                <span className="block text-xs opacity-70">{scenario.subtitle}</span>
              </div>
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeScenario}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`p-8 md:p-10 rounded-2xl border ${
            scenarios[activeScenario].color === 'orange'
              ? 'bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20'
              : 'bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20'
          }`}
        >
          <p className="text-slate-300 text-lg leading-relaxed mb-6">{scenarios[activeScenario].description}</p>
          
          <ul className="space-y-3 mb-6">
            {scenarios[activeScenario].items.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
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

InvestmentSection.displayName = 'InvestmentSection';

/* -------------------------------------------------------------------------- */
/* OFFER SECTION                                                               */
/* -------------------------------------------------------------------------- */

const OfferSection = memo(() => {
  const includes = [
    { icon: Users, text: "Equipo Completo (Estratega, Filmmaker, Trafficker, Diseñador)" },
    { icon: Globe, text: "Desarrollo de E-commerce y Web (Valorado en $50k+)" },
    { icon: PlayCircle, text: "Producción Audiovisual Mensual" },
    { icon: Target, text: "Gestión de Ads y Embudos de Venta" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] } }
  };

  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-orange-500/80 uppercase mb-6">
            <span className="w-8 h-px bg-orange-500/50" />La Oferta<span className="w-8 h-px bg-orange-500/50" />
          </motion.span>
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
            Tu Inversión Inteligente
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-slate-400 text-lg max-w-2xl mx-auto mb-12">
            Si contrataras estos servicios por separado (Desarrollo Web, Branding, Producción, Agencia), el desembolso inicial superaría los <span className="text-white font-semibold">$150,000 MXN</span>.
          </motion.p>

          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-slate-300 text-sm uppercase tracking-widest mb-6">Lo que recibes</p>
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
              <p className="text-slate-400 text-sm uppercase tracking-widest mb-4">Tu Inversión Mensual</p>
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="text-6xl md:text-8xl font-black text-white">$42,500</span>
                <span className="text-2xl text-slate-400 font-light">MXN</span>
              </div>
              <p className="text-slate-500 text-sm">(+ IVA · Contrato Anual para garantizar entrega de activos)</p>
            </div>
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
  const steps = ["Aprobación de Roadmap", "Firma de Acuerdo", "Kick-off Inmediato: Auditoría de Marca (Semana 1)"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] } }
  };

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
            ¿Listo para elevar el estándar?
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-slate-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            La madera ya es perfecta. Ahora hagamos que el mundo lo vea.
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
              href="https://wa.me/529984750514?text=Hola%2C%20me%20interesa%20iniciar%20el%20proyecto%20con%20FINEM"
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
          <span className="text-slate-600 text-sm">Propuesta Exclusiva Rebhinder 2025</span>
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

const RebhinderProposal = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ProposalStyles />
      <ProposalNavbar />
      
      <main className="relative z-10">
        <HeroSection />
        <DiagnosticoSection />
        <MethodSection />
        <RoadmapSection />
        <InvestmentSection />
        <OfferSection />
        <CTASection />
      </main>
      
      <ProposalFooter />
    </>
  );
};

export default RebhinderProposal;