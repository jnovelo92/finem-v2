import React, { useState, useEffect, useRef, lazy, Suspense, memo, useCallback, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ArrowRight, Star, Crown, Hexagon, Layers, Zap, ArrowLeft, X, ArrowUpRight, Check, Sparkles, Activity, Target, Users, Smartphone, Mail, User, AlertCircle, Quote } from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useTransform,
  useScroll
} from 'framer-motion';
import RebhinderProposal from './pages/quotes/RebhinderProposal';
import AmerimedProposal from './pages/quotes/AmerimedProposal';
import AmerimedDiscovery from './pages/quotes/AmerimedDiscovery';
import ProposalGenerator from './pages/quotes/ProposalGenerator';
import OrganicNailsContentHub from './pages/content-hub/OrganicNailsContentHub';
import ContentHubGenerator from './pages/content-hub/ContentHubGenerator';
import DynamicContentHub from './pages/content-hub/DynamicContentHub';
import Mike4VisualPage from './pages/Mike4Visual';
import NativaAiProposal from './pages/quotes/NativaAiProposal';
import LaNacionAIProposal from './pages/quotes/LaNacionAiProposal';
import LaNacionAIProposalF from './pages/quotes/LaNacionAiProposalF';
import FinemGrowth from './pages/FinemGrowth';
import ValttivaProposal from './pages/quotes/ValttivaProposal';
import FinemPoliticsProposal from './pages/quotes/FinemPoliticsProposal';
import ConectadasYSeguras from './pages/ConectadasYSeguras';
import KitDigitalConectadasSeguras from './pages/KitDigitalConectadasSeguras';

/* -------------------------------------------------------------------------- */
/* PERFORMANCE UTILITIES                                                       */
/* -------------------------------------------------------------------------- */
// Detectar Safari (una sola vez al cargar)
const isSafari = typeof navigator !== 'undefined' &&
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
// Detectar dispositivo táctil  
const isTouchDevice = typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);
// RAF throttle para eventos de mouse
const rafThrottle = (callback) => {
  let requestId = null;
  let lastArgs = null;
  const later = () => {
    requestId = null;
    callback(...lastArgs);
  };
  return (...args) => {
    lastArgs = args;
    if (requestId === null) {
      requestId = requestAnimationFrame(later);
    }
  };
};
/* -------------------------------------------------------------------------- */
/* GLOBAL STYLES (definidos una sola vez)                                     */
/* -------------------------------------------------------------------------- */
const GlobalStyles = () => (
  <style>{`
    /* ============================================================
       AWWWARDS-GRADE PERFORMANCE STYLES
       ============================================================ */
    
    /* GPU Acceleration Layer */
    .gpu-layer {
      transform: translateZ(0);
      backface-visibility: hidden;
      -webkit-perspective: 1000;
      perspective: 1000;
    }
    
    /* ============================================================
       PREMIUM BLOB GRADIENTS - 8+ stops para simular blur
       ============================================================ */
    
    .blob-orange {
      background: radial-gradient(
        circle at 30% 40%,
        rgba(249, 115, 22, 0.85) 0%,
        rgba(249, 115, 22, 0.7) 8%,
        rgba(234, 88, 12, 0.55) 16%,
        rgba(234, 88, 12, 0.4) 24%,
        rgba(194, 65, 12, 0.28) 32%,
        rgba(194, 65, 12, 0.18) 42%,
        rgba(194, 65, 12, 0.1) 52%,
        rgba(194, 65, 12, 0.04) 65%,
        transparent 80%
      );
    }
    
    .blob-purple {
      background: radial-gradient(
        circle at 60% 30%,
        rgba(124, 58, 237, 0.75) 0%,
        rgba(124, 58, 237, 0.6) 8%,
        rgba(109, 40, 217, 0.48) 16%,
        rgba(109, 40, 217, 0.36) 24%,
        rgba(76, 29, 149, 0.25) 34%,
        rgba(76, 29, 149, 0.15) 45%,
        rgba(76, 29, 149, 0.08) 58%,
        rgba(76, 29, 149, 0.03) 72%,
        transparent 88%
      );
    }
    
    .blob-teal {
      background: radial-gradient(
        circle at 50% 50%,
        rgba(20, 184, 166, 0.65) 0%,
        rgba(20, 184, 166, 0.5) 10%,
        rgba(13, 148, 136, 0.38) 20%,
        rgba(13, 148, 136, 0.26) 32%,
        rgba(13, 148, 136, 0.16) 45%,
        rgba(13, 148, 136, 0.08) 60%,
        rgba(13, 148, 136, 0.03) 75%,
        transparent 90%
      );
    }
    
    .blob-blue {
      background: radial-gradient(
        circle at 50% 50%,
        rgba(59, 130, 246, 0.7) 0%,
        rgba(59, 130, 246, 0.55) 10%,
        rgba(29, 78, 216, 0.4) 22%,
        rgba(29, 78, 216, 0.28) 35%,
        rgba(29, 78, 216, 0.16) 50%,
        rgba(29, 78, 216, 0.08) 65%,
        rgba(29, 78, 216, 0.03) 80%,
        transparent 95%
      );
    }
    
    .glow-orange {
      background: radial-gradient(
        circle at center,
        rgba(249, 115, 22, 0.2) 0%,
        rgba(249, 115, 22, 0.12) 20%,
        rgba(249, 115, 22, 0.06) 40%,
        rgba(249, 115, 22, 0.02) 60%,
        transparent 80%
      );
    }
    
    /* ============================================================
       ORGANIC ANIMATIONS - 7 keyframes para movimiento fluido
       ============================================================ */
    
    @keyframes gradient-x { 
      0% { background-position: 0% 50%; } 
      50% { background-position: 100% 50%; } 
      100% { background-position: 0% 50%; } 
    }
    
    @keyframes blob-float {
      0% { transform: translate3d(0, 0, 0) scale(1); }
      15% { transform: translate3d(1.5%, -1%, 0) scale(1.015); }
      35% { transform: translate3d(2.5%, -2.5%, 0) scale(1.025); }
      50% { transform: translate3d(1%, -1.5%, 0) scale(1.01); }
      70% { transform: translate3d(-1%, 1%, 0) scale(0.99); }
      85% { transform: translate3d(-0.5%, 0.5%, 0) scale(0.995); }
      100% { transform: translate3d(0, 0, 0) scale(1); }
    }
    
    @keyframes blob-float-reverse {
      0% { transform: translate3d(0, 0, 0) scale(1); }
      20% { transform: translate3d(-1.5%, 1%, 0) scale(0.985); }
      40% { transform: translate3d(-2%, 2%, 0) scale(0.975); }
      55% { transform: translate3d(-0.5%, 1.5%, 0) scale(0.99); }
      75% { transform: translate3d(1%, -0.5%, 0) scale(1.01); }
      90% { transform: translate3d(0.5%, -0.25%, 0) scale(1.005); }
      100% { transform: translate3d(0, 0, 0) scale(1); }
    }
    
    @keyframes pulse-glow {
      0%, 100% { opacity: var(--pulse-min, 0.25); transform: scale(1); }
      50% { opacity: var(--pulse-max, 0.45); transform: scale(1.02); }
    }
    
    @keyframes subtle-drift { 
      0% { transform: translate(0, 0) scale(1); } 
      25% { transform: translate(1.5%, -2%) scale(1.03); }
      50% { transform: translate(3%, -4%) scale(1.08); } 
      75% { transform: translate(1%, -2%) scale(1.04); }
      100% { transform: translate(0, 0) scale(1); } 
    }
    
    @keyframes shake { 
      0%, 100% { transform: translateX(0); } 
      25% { transform: translateX(-5px); } 
      75% { transform: translateX(5px); } 
    }
    
    .animate-gradient-text { 
      background-size: 200% auto; 
      animation: gradient-x 4s linear infinite; 
    }
    
    .animate-blob {
      animation: blob-float 28s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
      will-change: transform;
    }
    
    .animate-blob-reverse {
      animation: blob-float-reverse 32s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
      will-change: transform;
    }
    
    .animate-pulse-glow {
      animation: pulse-glow 5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
      will-change: opacity, transform;
    }
    
    .animate-shake { animation: shake 0.4s ease-in-out; }
    .text-balance { text-wrap: balance; }
    .writing-vertical { writing-mode: vertical-rl; text-orientation: mixed; }
    .bg-gradient-radial { background: radial-gradient(circle, var(--tw-gradient-stops)); }
    
    /* ============================================================
       INTERACTIVE FEEDBACK - Estados hover/active garantizados
       ============================================================ */
    
    .btn-interactive {
      cursor: pointer;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }
    .btn-interactive:hover { transform: translateY(-1px); }
    .btn-interactive:active { transform: translateY(0) scale(0.98); opacity: 0.9; }
    
    .card-interactive {
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .card-interactive:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
    }
    
    /* Smooth font rendering */
    * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    /* Safari optimizations */
    @supports (-webkit-touch-callout: none) {
      .animate-blob, .animate-blob-reverse { animation-duration: 45s; }
      .backdrop-blur-sm, .backdrop-blur-md, .backdrop-blur-lg {
        -webkit-backdrop-filter: blur(8px) !important;
        backdrop-filter: blur(8px) !important;
      }
      .gpu-layer {
        -webkit-transform: translateZ(0);
        -webkit-backface-visibility: hidden;
      }
    }
    
    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `}</style>
);
/* -------------------------------------------------------------------------- */
/* 1. ASSETS                                                                  */
/* -------------------------------------------------------------------------- */
const LogoFinem = memo(({ className }) => (
  <svg
    className={className}
    viewBox="0 0 1664.2 706.9"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    aria-label="Finem Logo"
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
/* 2. SHARED COMPONENTS                                                       */
/* -------------------------------------------------------------------------- */
// Componente de imagen optimizada con lazy loading
const OptimizedImage = memo(({ src, alt, className, ...props }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    loading="lazy"
    decoding="async"
    {...props}
  />
));
OptimizedImage.displayName = 'OptimizedImage';
// Grain texture reutilizable - SOLO desktop, skip en Safari para performance
const GrainTexture = memo(({ opacity = 0.06 }) => {
  // Skip en Safari y móvil
  if (isSafari || isTouchDevice) return null;
  return (
    <div
      className="absolute inset-0 pointer-events-none mix-blend-overlay hidden md:block"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
});
GrainTexture.displayName = 'GrainTexture';
// Blob mesh gradient optimizado - SIN BLUR, usa gradientes suaves
const MeshBlob = memo(({
  color = 'orange',
  position = 'top-0 left-0',
  size = '50vw',
  opacity = 0.3,
  style = {},
  animate = false,
}) => {
  // Gradientes con múltiples stops para simular blur SIN filter
  const gradients = {
    orange: 'radial-gradient(circle at 30% 40%, rgba(249,115,22,0.8) 0%, rgba(234,88,12,0.5) 15%, rgba(194,65,12,0.25) 35%, rgba(194,65,12,0.08) 55%, transparent 75%)',
    purple: 'radial-gradient(circle at 60% 30%, rgba(124,58,237,0.7) 0%, rgba(109,40,217,0.45) 15%, rgba(76,29,149,0.2) 35%, rgba(76,29,149,0.06) 55%, transparent 75%)',
    blue: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.7) 0%, rgba(29,78,216,0.4) 20%, rgba(29,78,216,0.15) 40%, transparent 65%)',
    teal: 'radial-gradient(circle at 50% 50%, rgba(20,184,166,0.6) 0%, rgba(13,148,136,0.35) 20%, rgba(13,148,136,0.12) 45%, transparent 70%)',
    amber: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.6) 0%, rgba(245,158,11,0.3) 25%, rgba(245,158,11,0.1) 45%, transparent 70%)',
  };
  return (
    <div
      className={`absolute ${position} pointer-events-none ${animate ? 'animate-blob' : ''} gpu-layer`}
      style={{ width: size, height: size, opacity, ...style }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{ background: gradients[color] || gradients.orange }}
      />
    </div>
  );
});
MeshBlob.displayName = 'MeshBlob';
// Section transition fade
const SectionFade = memo(({ position = 'bottom', height = 'h-40' }) => (
  <div
    className={`absolute ${position}-0 left-0 right-0 ${height} pointer-events-none z-20`}
    style={{
      background: position === 'bottom'
        ? 'linear-gradient(to bottom, transparent 0%, #020410 100%)'
        : 'linear-gradient(to top, transparent 0%, #020410 100%)',
    }}
  />
));
SectionFade.displayName = 'SectionFade';
/* -------------------------------------------------------------------------- */
/* 3. UI COMPONENTS                                                           */
/* -------------------------------------------------------------------------- */
const MagneticButton = memo(({ children, className = "", onClick, strength = 0.15 }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = useMemo(() => ({ stiffness: 150, damping: 15, mass: 0.1 }), []);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const scale = useSpring(1, { stiffness: 400, damping: 30 });
  const handleMouseMove = useCallback(rafThrottle((e) => {
    const el = ref.current;
    if (!el) return;
    const { height, width, left, top } = el.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) * strength);
    y.set((e.clientY - (top + height / 2)) * strength);
  }), [strength, x, y]);
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    scale.set(1.02);
  }, [scale]);
  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
    scale.set(1);
  }, [x, y, scale]);
  // Fallback para touch/Safari - CON estilos hover/active completos
  if (isTouchDevice || isSafari) {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={`${className} btn-interactive cursor-pointer active:scale-[0.98] transition-transform`}
      >
        {children}
      </button>
    );
  }
  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, scale }}
      className={`relative ${className} gpu-layer cursor-pointer`}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      {/* Glow premium - gradiente de 5 stops */}
      <div
        className={`absolute -inset-4 rounded-2xl pointer-events-none transition-opacity duration-300 -z-10 glow-orange ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />
    </motion.button>
  );
});
MagneticButton.displayName = 'MagneticButton';
const SpotlightCard = memo(({
  children,
  className = "",
  spotlightColor = "rgba(249, 115, 22, 0.12)",
  spotlightSize = 400,
  borderGlow = true,
}) => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleMouseMove = useCallback(rafThrottle((e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }), [mouseX, mouseY]);
  const spotlight = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 40%)`;
  const borderGradient = useMotionTemplate`radial-gradient(${spotlightSize * 0.8}px circle at ${mouseX}px ${mouseY}px, rgba(249,115,22,0.4), transparent 40%)`;
  // Fallback para Safari/Touch - Experiencia intencional sin spotlight
  if (isSafari || isTouchDevice) {
    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-2xl card-interactive ${className}`}
      >
        {/* Border glow estático para Safari */}
        <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(249,115,22,0.15) 0%, transparent 50%, rgba(124,58,237,0.1) 100%)',
          }}
        />
        <div className="absolute inset-[1px] rounded-2xl bg-[#0a0a14] z-0" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
        <div className="relative z-20 h-full">{children}</div>
      </div>
    );
  }
  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
    >
      {borderGlow && (
        <motion.div
          className="absolute -inset-px rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: borderGradient }}
        />
      )}
      <div className="absolute inset-[1px] rounded-2xl bg-[#0a0a14] z-0" />
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{ background: spotlight }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
});
SpotlightCard.displayName = 'SpotlightCard';
const Reveal = memo(({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 40,
  duration = 0.8,
  blur = true,
  once = true,
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const getInitialTransform = () => {
    switch (direction) {
      case "up": return { y: distance, x: 0 };
      case "down": return { y: -distance, x: 0 };
      case "left": return { x: distance, y: 0 };
      case "right": return { x: -distance, y: 0 };
      default: return { x: 0, y: 0 };
    }
  };
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);
  const initial = getInitialTransform();
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...initial,
      }}
      animate={isVisible ? {
        opacity: 1,
        x: 0,
        y: 0,
      } : {}}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={`${className} gpu-layer`}
    >
      {children}
    </motion.div>
  );
});
Reveal.displayName = 'Reveal';
const CustomCursor = memo(() => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [cursorVariant, setCursorVariant] = useState("default");
  const springConfig = useMemo(() => ({ stiffness: 500, damping: 28, mass: 0.5 }), []);
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  useEffect(() => {
    // Skip solo en touch devices
    if (isTouchDevice) return;
    const updateMouse = rafThrottle((e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    });
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setCursorVariant("hover");
      }
    };
    const handleMouseOut = () => setCursorVariant("default");
    window.addEventListener("mousemove", updateMouse, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    return () => {
      window.removeEventListener("mousemove", updateMouse);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [mouseX, mouseY]);
  // Skip render solo en touch devices
  if (isTouchDevice) return null;
  // Safari: cursor alternativo sin mix-blend-mode
  if (isSafari) {
    return (
      <>
        <style>{`
          @media (min-width: 768px) and (pointer: fine) { 
            body, a, button, input, textarea, select, [class*="cursor-pointer"] { 
              cursor: none !important; 
            } 
          }
        `}</style>
        {/* Outer ring - Safari version */}
        <motion.div
          className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none hidden md:flex items-center justify-center"

          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
            zIndex: 9999,
            transform: 'translate3d(0,0,0)',
          }}
        >
          <div
            className="w-full h-full rounded-full border-2 border-orange-500/60 transition-transform duration-200"
            style={{
              transform: cursorVariant === "hover" ? 'scale(1.5)' : 'scale(1)',
              boxShadow: '0 0 10px rgba(249, 115, 22, 0.3)',
            }}
          />
        </motion.div>
        {/* Dot - Safari version */}
        <motion.div
          className="fixed top-0 left-0 pointer-events-none hidden md:block"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
            zIndex: 10000,
            transform: 'translate3d(0,0,0)',
          }}
        >
          <div
            className="rounded-full bg-orange-500 transition-all duration-200"
            style={{
              width: cursorVariant === "hover" ? 10 : 6,
              height: cursorVariant === "hover" ? 10 : 6,
              boxShadow: '0 0 8px rgba(249, 115, 22, 0.6)',
            }}
          />
        </motion.div>
      </>
    );
  }
  // Chrome/Firefox: cursor original con mix-blend-mode
  return (
    <>
      <style>{`
        @media (min-width: 768px) and (pointer: fine) { 
          body, a, button, input, textarea, select, [class*="cursor-pointer"] { 
            cursor: none !important; 
          } 
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none mix-blend-difference hidden md:flex items-center justify-center gpu-layer"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 10000,
        }}
      >
        <div
          className="w-full h-full rounded-full border border-white/80 transition-transform duration-200"
          style={{ transform: cursorVariant === "hover" ? 'scale(1.5)' : 'scale(1)' }}
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 10001
        }}
      >
        <div
          className="rounded-full bg-orange-500 transition-all duration-200"
          style={{
            width: cursorVariant === "hover" ? 8 : 6,
            height: cursorVariant === "hover" ? 8 : 6,
          }}
        />
      </motion.div>
    </>
  );
});
CustomCursor.displayName = 'CustomCursor';
/* -------------------------------------------------------------------------- */
/* 4. NAVBAR                                                                  */
/* -------------------------------------------------------------------------- */
const Navbar = memo(({ onNavigate, currentView, onOpenWizard }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-1000 ease-in-out ${isScrolled ? "py-4 md:py-6" : "py-6 md:py-12"
        }`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${isScrolled ? "opacity-100" : "opacity-0"
          }`}
        style={{
          background: 'linear-gradient(to bottom, rgba(2, 4, 16, 0.95) 0%, rgba(2, 4, 16, 0.6) 60%, transparent 100%)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 65%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 65%, transparent 100%)'
        }}
      />
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex justify-between items-center">
        <button
          onClick={() => onNavigate('home')}
          className="cursor-pointer hover:opacity-70 transition-opacity duration-300 text-white pb-6"
          aria-label="Volver al inicio"
        >
          <LogoFinem className="h-8 md:h-12 lg:h-14 w-auto drop-shadow-2xl" />
        </button>
        <div className="flex items-center gap-8">

          {currentView === 'yamamoto' && (
            <button
              onClick={() => onNavigate('home')}
              className="text-[10px] font-bold tracking-[0.2em] text-slate-400 hover:text-white uppercase transition-colors"
              aria-label="Cerrar vista de caso de estudio"
            >
              Cerrar
            </button>
          )}
          <MagneticButton onClick={onOpenWizard}>
            <div className="flex items-center gap-3 px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-md group cursor-pointer active:scale-95">
              <span className="text-[9px] font-bold tracking-[0.3em] text-white">HABLEMOS</span>
              <div className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500"></span>
              </div>
            </div>
          </MagneticButton>
        </div>
      </div>
    </nav>
  );
});
Navbar.displayName = 'Navbar';
/* -------------------------------------------------------------------------- */
/* 5. HERO SECTION                                                            */
/* -------------------------------------------------------------------------- */
const HeroSection = memo(({ onOpenWizard }) => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const blob1X = useTransform(x, [0, 1], [-20, 20]);
  const blob1Y = useTransform(y, [0, 1], [-20, 20]);
  const blob2X = useTransform(x, [0, 1], [15, -15]);
  const blob2Y = useTransform(y, [0, 1], [10, -10]);
  const blob3X = useTransform(x, [0, 1], [-10, 10]);
  const blob3Y = useTransform(y, [0, 1], [-15, 15]);
  const flareX = useTransform(x, [0, 1], [-30, 30]);
  const flareY = useTransform(y, [0, 1], [-30, 30]);
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth);
      mouseY.set(clientY / innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  }), []);
  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
    },
  }), []);
  const lineReveal = useMemo(() => ({
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 },
    },
  }), []);
  return (
    <header
      ref={containerRef}
      className="relative z-10 h-[100dvh] w-full flex flex-col bg-transparent"
    >
      {/* Background - se desvanece hacia abajo para continuidad */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #020410 0%, #020410 70%, transparent 100%)'
        }}
      />
      {/* ==================== TÉCNICA CONTENEDOR DIFUSO ==================== */}
      {/* El blur se aplica UNA SOLA VEZ al contenedor padre, no a cada blob */}
      {/* Esto es MUCHO más eficiente para Safari */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none blur-3xl"
        style={{
          transform: 'translate3d(0, 0, 0)',
          WebkitTransform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
        }}
      >
        {/* Blob 1 - Orange - Color sólido, el blur viene del padre */}
        <div
          className="absolute -left-[10%] top-[5%] w-[60vw] h-[60vw] md:w-[45vw] md:h-[45vw] rounded-full animate-blob gpu-layer"
          style={{
            background: '#f97316',
            opacity: 0.5,
          }}
        />
        {/* Blob 2 - Purple */}
        <div
          className="absolute right-[-10%] top-[15%] md:top-[0%] w-[35vw] h-[35vw] md:w-[40vw] md:h-[40vw] rounded-full animate-blob-reverse gpu-layer"
          style={{
            background: '#7c3aed',
            opacity: 0.35,
            animationDelay: '-8s',
          }}
        />
        {/* Blob 3 - Teal */}
        <div
          className="absolute left-[25%] bottom-[-10%] w-[45vw] h-[45vw] md:w-[30vw] md:h-[30vw] rounded-full animate-pulse-glow gpu-layer"
          style={{
            background: '#14b8a6',
            opacity: 0.35,
            '--pulse-min': '0.25',
            '--pulse-max': '0.4',
          }}
        />
        {/* Small Glow - Accent */}
        <div
          className="absolute right-[15%] bottom-[25%] w-[20vw] h-[20vw] rounded-full animate-pulse-glow"
          style={{
            background: '#f97316',
            opacity: 0.3,
            '--pulse-min': '0.2',
            '--pulse-max': '0.4',
          }}
        />
      </div>
      {/* Lens Flare - Simplificado, solo desktop */}
      {!isTouchDevice && !isSafari && (
        <motion.div
          style={{ x: flareX, y: flareY }}
          className="absolute top-[15%] left-[25%] pointer-events-none hidden md:block"
        >
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="relative"
          >
            <div className="w-32 h-32 rounded-full" style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(253,186,116,0.1) 40%, transparent 70%)'
            }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/80 rounded-full" />
          </motion.div>
        </motion.div>
      )}
      {/* SVG Arcs - Static, sin animaciones pesadas de pathLength */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05] hidden md:block"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <circle cx="300" cy="540" r="400" fill="none" stroke="white" strokeWidth="1" />
        <circle cx="1620" cy="200" r="300" fill="none" stroke="white" strokeWidth="0.5" />
        <path d="M 0 800 Q 960 600 1920 750" fill="none" stroke="white" strokeWidth="0.5" />
      </svg>
      {/* Grain - con desvanecimiento hacia abajo */}
      {!isSafari && !isTouchDevice && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay hidden md:block"
          style={{
            opacity: 0.06,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
          }}
        />
      )}
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(2,4,16,0.4) 100%)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
        }}
      />
      {/* Bottom fade - removido para continuidad con Services */}
      {/* Content */}
      <motion.div
        className="container mx-auto max-w-7xl h-full flex flex-col justify-center px-6 md:px-12 pt-24 relative z-30"
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
            Agencia Creativa Digital
          </span>
        </motion.div>
        <div className="mb-8 md:mb-10">
          <motion.div variants={itemVariants}>
            <h1 className="text-[11vw] sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[1] text-white pb-2">
              No hacemos <br className="hidden md:block" /> marketing.
            </h1>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h1 className="text-[11vw] sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[1] text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-purple-400 animate-gradient-text pb-4">
              Transformamos <br className="hidden md:block" /> negocios.
            </h1>
          </motion.div>
        </div>
        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
          <motion.div variants={itemVariants} className="max-w-md">
            <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed">
              <span className="text-white font-normal">Finem existe para cambiar el rumbo.</span>
              <br className="hidden md:block" />
              {' '}Fusionamos consultoría de alto nivel con ejecución digital impecable.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <motion.button
              onClick={onOpenWizard}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 md:px-12 md:py-6 bg-white text-black font-bold tracking-[0.15em] text-[10px] md:text-xs uppercase overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-white to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-[1px] bg-white group-hover:bg-black transition-colors duration-500" />
              <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500">
                Iniciar Proyecto
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 md:bottom-12 right-8 md:right-12 hidden md:flex flex-col items-center gap-4 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[8px] tracking-[0.5em] uppercase text-white/30 font-medium writing-vertical">
          Scroll
        </span>
        <div className="relative w-[1px] h-20 bg-white/10 overflow-hidden">
          <motion.div
            animate={{ y: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-orange-500 via-orange-500 to-transparent"
          />
        </div>
      </motion.div>
    </header>
  );
});
HeroSection.displayName = 'HeroSection';
/* -------------------------------------------------------------------------- */
/* 6. SERVICES SECTION                                                        */
/* -------------------------------------------------------------------------- */
const ServicesSection = memo(() => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityBlob = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const processSteps = [
    { num: "01", title: "Diagnóstico", desc: "Analizamos tu negocio desde dentro" },
    { num: "02", title: "Estrategia", desc: "Diseñamos el plan a medida" },
    { num: "03", title: "Implementación", desc: "Ejecutamos con precisión" },
    { num: "04", title: "Acompañamiento", desc: "Hasta que los resultados lleguen" },
  ];
  const services = [
    {
      icon: Hexagon,
      title: "Consultoría Estratégica",
      description: "Nos convertimos en tu guía. Diagnóstico profundo, estrategia clara y hoja de ruta ejecutable. Detectamos fricciones y diseñamos la ruta crítica.",
      color: "orange",
      gradient: "from-orange-500/20 via-orange-500/5 to-transparent",
      borderHover: "hover:border-orange-500/40",
      iconHover: "group-hover:text-orange-400 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]",
    },
    {
      icon: Zap,
      title: "Ejecución Integral",
      description: "Tomamos el control creativo y operativo. Desarrollo web, branding, campañas de performance. Lo hacemos por ti con diseño de clase mundial.",
      color: "blue",
      gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
      borderHover: "hover:border-blue-500/40",
      iconHover: "group-hover:text-blue-400 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]",
    },
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
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 bg-[#020410]"
    >
      {/* ==================== TÉCNICA CONTENEDOR DIFUSO ==================== */}
      <div
        className="absolute inset-0 overflow-visible pointer-events-none blur-[100px]"
        style={{
          transform: 'translate3d(0, 0, 0)',
          WebkitTransform: 'translate3d(0, 0, 0)',
        }}
      >
        {/* Blue blob */}
        <motion.div
          style={{ y: backgroundY, opacity: opacityBlob }}
          className="absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full gpu-layer"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: '#3b82f6',
              opacity: 0.3,
            }}
          />
        </motion.div>
        {/* Orange blob */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute bottom-[-15%] left-[-5%] w-[50vw] h-[50vw] rounded-full gpu-layer"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: '#f97316',
              opacity: 0.25,
            }}
          />
        </motion.div>
      </div>
      {/* Content */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20 md:mb-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="lg:max-w-xl">
            <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-orange-500/80 uppercase mb-6">
              <span className="w-8 h-px bg-orange-500/50" />
              Servicios
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1] pb-2">
              Lo que<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600 animate-gradient-text">hacemos.</span>
            </h2>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-slate-400 text-lg md:text-xl max-w-md leading-relaxed font-light"
          >
            No vendemos servicios aislados. Vendemos <span className="text-white font-normal">visión, estructura y ejecución</span>.
          </motion.p>
        </motion.div>
        {/* Process Steps */}
        <motion.div
          className="mb-20 md:mb-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <div className="relative">
            <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.num}
                  variants={itemVariants}
                  className="relative group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      {/* Círculo con efecto glass */}
                      <div className="w-12 h-12 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:border-orange-500/40 group-hover:bg-white/[0.08] group-hover:shadow-[0_0_25px_rgba(249,115,22,0.25)] transition-all duration-500">
                        <span className="text-xs font-bold text-slate-500 group-hover:text-orange-400 transition-colors">{step.num}</span>
                      </div>
                      {/* Halo difuminado - más sutil en mobile */}
                      <div className="absolute inset-0 rounded-full bg-orange-500/30 scale-0 group-hover:scale-[1.8] md:group-hover:scale-[2.5] opacity-0 group-hover:opacity-100 blur-xl md:blur-2xl transition-all duration-700 -z-10" />
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                    )}
                  </div>
                  <h4 className="text-white font-semibold mb-1 group-hover:text-orange-300 transition-colors">{step.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        {/* Service Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className={`group relative p-8 md:p-10 rounded-2xl bg-[#0a0a1a]/80 border border-white/[0.06] backdrop-blur-sm overflow-hidden transition-all duration-700 hover:-translate-y-1 ${service.borderHover}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div
                  className="absolute top-0 right-0 w-64 h-64 -translate-y-1/2 translate-x-1/2"
                  style={{
                    background: service.color === 'orange'
                      ? 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
                  }}
                />
              </div>
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:border-transparent ${service.iconHover}`}>
                  <service.icon className="w-7 h-7 text-slate-400 transition-all duration-500 group-hover:rotate-12" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-8">{service.description}</p>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500 group-hover:text-white transition-colors">
                  <span>Explorar</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div
                  className="absolute bottom-0 right-0 w-full h-full"
                  style={{
                    background: service.color === 'orange'
                      ? 'linear-gradient(135deg, transparent 50%, rgba(249,115,22,0.1) 100%)'
                      : 'linear-gradient(135deg, transparent 50%, rgba(59,130,246,0.1) 100%)',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* Tagline */}
        <motion.div
          className="mt-20 md:mt-28 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-slate-500 text-lg md:text-xl font-light">
            Somos el aliado que se <span className="text-white font-normal">involucra</span>.{' '}
            <span className="text-orange-400">Que empuja. Que resuelve.</span>
          </p>
        </motion.div>
      </div>
      <SectionFade position="bottom" height="h-48" />
    </section>
  );
});
ServicesSection.displayName = 'ServicesSection';
/* -------------------------------------------------------------------------- */
/* Resto de componentes - importar desde archivos separados en producción     */
/* Por brevedad, incluyo solo la estructura del App wrapper                   */
/* -------------------------------------------------------------------------- */
// NOTA: En producción, importa CaseStudySection, FooterSection, YamamotoView, 
// ContactWizard desde archivos separados para mejor mantenimiento
// Placeholder para los componentes restantes (usar los del archivo original)
const CaseStudySection = ({ onNavigate }) => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const { scrollYProgress: imageScroll } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });
  // Parallax effects
  const imageY = useTransform(imageScroll, [0, 1], [50, -50]);
  const imageScale = useTransform(imageScroll, [0, 0.5, 1], [1.1, 1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacityBlob = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.6, 0.6, 0]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }
    }
  };
  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden bg-[#020410]"
    >
      {/* ==================== TÉCNICA CONTENEDOR DIFUSO ==================== */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none blur-3xl"
        style={{
          transform: 'translate3d(0, 0, 0)',
          WebkitTransform: 'translate3d(0, 0, 0)',
        }}
      >
        {/* Orange ambient blob */}
        <motion.div
          style={{ opacity: opacityBlob }}
          className="absolute top-[5%] left-[-15%] w-[45vw] h-[45vw] rounded-full gpu-layer"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: '#f97316',
              opacity: 0.4,
            }}
          />
        </motion.div>
        {/* Purple ambient blob */}
        <motion.div
          style={{ opacity: opacityBlob }}
          className="absolute bottom-[0%] right-[-10%] w-[35vw] h-[35vw] rounded-full gpu-layer"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: '#7c3aed',
              opacity: 0.35,
            }}
          />
        </motion.div>
      </div>
      {/* ==================== CONTENT ==================== */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Label */}
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-orange-500/80 uppercase">
            <span className="w-8 h-px bg-orange-500/50" />
            Caso de Éxito
          </span>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <motion.div
            className="lg:col-span-5 order-2 lg:order-1"
            style={{ y: textY }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {/* Category tags */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] tracking-widest text-slate-400 uppercase">
                Hospitalidad
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] tracking-widest text-amber-400 uppercase">
                Gastronomía
              </span>
            </motion.div>
            {/* Title */}
            <motion.div variants={itemVariants}>
              <h2
                onClick={() => onNavigate('yamamoto')}
                className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[1] mb-6 pb-2 cursor-pointer group"
              >
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">YAMA</span>
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-4">MOTO</span>
                <span className="text-orange-500 inline-block transition-transform duration-300 group-hover:rotate-12">.</span>
              </h2>
            </motion.div>
            {/* Subtitle */}
            <motion.h3
              variants={itemVariants}
              className="text-2xl md:text-3xl text-slate-300 font-light italic mb-10 leading-snug"
            >
              La Cultura <span className="text-white not-italic font-medium">Omotenashi</span>
            </motion.h3>
            {/* Quote */}
            <motion.div variants={itemVariants} className="mb-10">
              <blockquote className="relative">
                <span className="absolute -left-4 -top-4 text-6xl text-orange-500/20 font-serif">"</span>
                <p className="text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-[1.15] tracking-tight pb-2">
                  Rara vez tienen una mesa libre.
                </p>
              </blockquote>
              <p className="text-slate-500 leading-relaxed mt-6 max-w-md">
                De restaurante tradicional a ícono de culto digital. Una transformación basada en la autenticidad y la experiencia sensorial.
              </p>
            </motion.div>
            {/* CTA */}
            <motion.button
              variants={itemVariants}
              onClick={() => onNavigate('yamamoto')}
              className="group flex items-center gap-4"
            >
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-white border-b-2 border-white/20 pb-2 group-hover:border-orange-500 transition-colors">
                Leer Historia
              </span>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-500">
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </div>
            </motion.button>
          </motion.div>
          {/* Image */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div
              ref={imageRef}
              className="relative w-full aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer"
              onClick={() => onNavigate('yamamoto')}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            >
              {/* Image container with parallax */}
              <motion.div
                className="absolute inset-0"
                style={{ y: imageY, scale: imageScale }}
              >
                <img
                  src="case-study.jpg"
                  alt="Yamamoto Interior"
                  className="w-full h-full object-cover transition-all duration-[2s] ease-out group-hover:scale-105"
                />
              </motion.div>
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10" />
              {/* Color overlay on hover */}
              <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors duration-700 z-10" />
              {/* Badge #1 - TripAdvisor con hover effects */}
              <motion.div
                className="absolute top-6 right-6 z-20"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 backdrop-blur-md hover:bg-amber-500/30 hover:border-amber-400/50 transition-all duration-300 cursor-pointer group/badge">
                  <Crown className="w-4 h-4 text-amber-400 fill-amber-400 group-hover/badge:scale-110 group-hover/badge:rotate-12 transition-transform duration-300" />
                  <span className="text-[10px] font-bold tracking-widest text-amber-100 uppercase">#1 Tripadvisor</span>
                </div>
              </motion.div>
              {/* Stats card */}
              <motion.div
                className="absolute bottom-6 left-6 right-6 z-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-bold text-white">35</p>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-1">Años</p>
                    </div>
                    <div className="text-center border-x border-white/10">
                      <p className="text-2xl md:text-3xl font-bold text-orange-400">#1</p>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-1">Cancún</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-bold text-white">90%</p>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-1">Ocupación</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-orange-500/30 rounded-tl-2xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-orange-500/30 rounded-br-2xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </div>
        </div>
      </div>
      {/* Bottom fade for transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #020410 100%)',
        }}
      />
    </section>
  );
};
const FooterSection = ({ onOpenWizard }) => {
  const sectionRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });
  // Parallax for background elements
  const blobY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  // Mouse tracking for interactive glow
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const glowX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const glowY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  const glowLeft = useTransform(glowX, [0, 1], ['0%', '60%']);
  const glowTop = useTransform(glowY, [0, 1], ['0%', '60%']);
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };
  const letters = "HABLEMOS".split("");
  return (
    <footer
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#020410]"
    >
      {/* ==================== BACKGROUND BLOBS ==================== */}
      {/* Safari: sin blur (causa problemas de stacking) */}
      {/* Otros: con blur-3xl */}
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${isSafari ? '' : 'blur-3xl'}`}
        style={{
          zIndex: 0,
        }}
      >
        {/* Main ambient blob - Orange - centro izquierda */}
        <motion.div
          style={{ y: blobY }}
          className="absolute left-[-30%] top-[20%] w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] rounded-full"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: isSafari
                ? 'radial-gradient(circle, rgba(249,115,22,0.35) 0%, rgba(249,115,22,0.1) 50%, transparent 70%)'
                : '#f97316',
              opacity: isSafari ? 1 : 0.45,
            }}
          />
        </motion.div>
        {/* Secondary blob - Purple - centro derecha */}
        <motion.div
          style={{ y: blobY }}
          className="absolute right-[-30%] top-[30%] w-[65vw] h-[65vw] md:w-[40vw] md:h-[40vw] rounded-full"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: isSafari
                ? 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, rgba(124,58,237,0.1) 50%, transparent 70%)'
                : '#7c3aed',
              opacity: isSafari ? 1 : 0.4,
            }}
          />
        </motion.div>
        {/* Third blob - Teal - solo desktop */}
        <motion.div
          style={{ y: blobY }}
          className="absolute left-[30%] bottom-[20%] w-[30vw] h-[30vw] rounded-full hidden md:block"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: isSafari
                ? 'radial-gradient(circle, rgba(20,184,166,0.25) 0%, rgba(20,184,166,0.08) 50%, transparent 70%)'
                : '#14b8a6',
              opacity: isSafari ? 1 : 0.3,
            }}
          />
        </motion.div>
      </div>
      {/* Interactive glow that follows mouse - oculto en Safari */}
      {!isSafari && (
        <motion.div
          className="absolute w-[35vw] h-[35vw] pointer-events-none rounded-full blur-3xl z-0"
          style={{
            left: glowLeft,
            top: glowTop,
            background: '#f97316',
            opacity: 0.15,
          }}
        />
      )}
      {/* Lens flare */}
      <motion.div
        style={{ opacity }}
        className="absolute top-[15%] right-[20%] pointer-events-none"
      >
        <div className="relative">
          <div
            className="w-32 h-32 rounded-full blur-2xl"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white/80 rounded-full blur-[2px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full" />
        </div>
      </motion.div>
      {/* Decorative arc */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="960" cy="1200" r="800" fill="none" stroke="white" strokeWidth="1" />
        <circle cx="960" cy="1200" r="600" fill="none" stroke="white" strokeWidth="0.5" />
      </svg>
      {/* Grain texture - solo desktop, no Safari */}
      {!isSafari && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay hidden md:block"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      )}
      {/* ==================== CONTENT ==================== */}
      <motion.div
        style={{
          y: textY,
          transform: 'translate3d(0, 0, 1px)',
          WebkitTransform: 'translate3d(0, 0, 1px)',
        }}
        className="container mx-auto px-6 pt-20 md:pt-0 relative z-50 flex flex-col items-center text-center"      >
        {/* Pre-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-500 text-sm tracking-[0.4em] uppercase mb-8"
        >
          ¿Listo para escalar?
        </motion.p>
        {/* Main CTA - Interactive Letters */}
        <motion.button
          onClick={onOpenWizard}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center justify-center overflow-visible py-4">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                className="text-[14vw] md:text-[12vw] lg:text-[10vw] font-black tracking-tighter text-white inline-block leading-[1.1]"
                animate={{
                  y: isHovered ? [0, -10, 0] : 0,
                  color: isHovered ? '#f97316' : '#ffffff',
                }}
                transition={{
                  y: {
                    duration: 0.4,
                    delay: index * 0.03,
                    ease: [0.25, 0.4, 0.25, 1],
                  },
                  color: {
                    duration: 0.3,
                    delay: index * 0.02,
                  }
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          {/* Underline animation */}
          <motion.div
            className="absolute -bottom-4 left-0 h-[3px] bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500"
            initial={{ width: 0, left: '50%', x: '-50%' }}
            animate={{
              width: isHovered ? '100%' : 0,
              left: isHovered ? 0 : '50%',
              x: isHovered ? 0 : '-50%',
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          />
          {/* Arrow that appears on hover */}
          <motion.div
            className="absolute top-1/2 -right-8 md:-right-20 -translate-y-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -20,
            }}
            transition={{ duration: 0.4 }}
          >
            <ArrowRight className="w-10 h-10 md:w-16 md:h-16 text-orange-500" />
          </motion.div>
        </motion.button>
        {/* Contact info */}
        <motion.div
          className="flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Email */}
          <a
            href="mailto:hola@finem.mx"
            className="group flex items-center gap-3 text-xl md:text-2xl text-slate-400 hover:text-white transition-all duration-300 font-light"
          >
            <span>hola@finem.mx</span>
            <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </a>
          {/* Social links */}
          <div className="flex items-center gap-8">
            <a
              href="https://www.linkedin.com/company/finem/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-slate-600 hover:text-orange-500 uppercase transition-all duration-300"
            >
              <span>LinkedIn</span>
              <div className="w-0 group-hover:w-4 h-px bg-orange-500 transition-all duration-300" />
            </a>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <a
              href="https://www.instagram.com/finemmkt/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-slate-600 hover:text-orange-500 uppercase transition-all duration-300"
            >
              <span>Instagram</span>
              <div className="w-0 group-hover:w-4 h-px bg-orange-500 transition-all duration-300" />
            </a>
          </div>
          {/* Location */}
          <p className="text-slate-600 text-sm tracking-wider">
            Cancún <span className="text-slate-700 mx-2">|</span> CDMX
          </p>
        </motion.div>
      </motion.div>
      {/* ==================== FOOTER BAR ==================== */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 py-8 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-slate-700 text-[10px] tracking-[0.2em] uppercase">
            © 2026 Finem. Todos los derechos reservados.
          </p>
          <p className="text-slate-800 text-[10px] tracking-wider">
            Diseñado para transformar negocios.
          </p>
        </div>
      </motion.div>
      {/* ==================== STYLES ==================== */}
      <style>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </footer>
  );
};
const YamamotoView = ({ onNavigate }) => {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  // Parallax effects for hero
  const heroImageY = useTransform(heroScroll, [0, 1], [0, 150]);
  const heroImageScale = useTransform(heroScroll, [0, 1], [1.1, 1.3]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroTextY = useTransform(heroScroll, [0, 1], [0, -100]);
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
  const solutions = [
    {
      icon: Hexagon,
      title: "Estrategia",
      description: "Redefinición completa del Buyer Persona. Identificamos al comensal que valora la autenticidad sobre el espectáculo.",
      delay: 0,
    },
    {
      icon: Layers,
      title: "Comunicación",
      description: "Dirección de arte visual oscura y elegante. Fotografía que captura la esencia del Omotenashi japonés.",
      delay: 100,
    },
    {
      icon: Zap,
      title: "Operación",
      description: "Implementación de sistemas de reserva digital y optimización del customer journey completo.",
      delay: 200,
    },
  ];
  const results = [
    { value: "#1", label: "En Tripadvisor", sublabel: "Cancún" },
    { value: "35", label: "Años de Historia", sublabel: "Tradición" },
    { value: "90%", label: "Ocupación", sublabel: "Promedio" },
    { value: "4.9", label: "Rating", sublabel: "Google" },
  ];
  return (
    <div className="bg-[#020410]">
      {/* ==================== HERO ==================== */}
      <header
        ref={heroRef}
        className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center overflow-visible"      >
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroImageY }}
        >
          <motion.div
            className="w-full h-full"
            style={{
              scale: heroImageScale,
              backgroundImage: 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020410] via-[#020410]/60 to-[#020410]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020410]/80 via-transparent to-[#020410]/80" />
        </motion.div>
        {/* Ambient blobs - Técnica del contenedor difuso */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none blur-3xl"
          style={{
            transform: 'translate3d(0, 0, 0)',
            WebkitTransform: 'translate3d(0, 0, 0)',
          }}
        >
          <div className="absolute top-[15%] left-[-5%] w-[35vw] h-[35vw] rounded-full gpu-layer"
            style={{
              background: '#f97316',
              opacity: 0.35,
            }}
          />
        </div>
        {/* Content */}
        <motion.div
          className="relative z-20 max-w-5xl mx-auto px-6 pt-20 flex flex-col items-center"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-950/40 backdrop-blur-md">
              <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-amber-100 uppercase">Top #1 en Tripadvisor</span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-[11vw] md:text-[12vw] lg:text-[10vw] leading-[1.2] font-black tracking-tight mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-purple-400 animate-gradient-text">
              YAMAMOTO
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Restaurante japonés con <span className="text-white font-medium">35 años de historia</span> en el corazón de Cancún.
          </motion.p>
        </motion.div>
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">Scroll</span>
          <motion.div
            className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </header>
      {/* ==================== EL RETO ==================== */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        {/* Background blob - Técnica contenedor difuso */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none blur-3xl"
          style={{
            transform: 'translate3d(0, 0, 0)',
            WebkitTransform: 'translate3d(0, 0, 0)',
          }}
        >
          <div className="absolute top-[45%] right-[-15%] w-[45vw] h-[45vw] rounded-full"
            style={{
              background: '#7c3aed',
              opacity: 0.25,
            }}
          />
        </div>
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-amber-500/80 uppercase mb-8"
            >
              <span className="w-8 h-px bg-amber-500/50" />
              El Reto
            </motion.span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div variants={itemVariants}>
                <div className="relative">
                  <Quote className="absolute -left-4 -top-4 w-12 h-12 text-amber-500/20" />
                  <h2 className="text-3xl md:text-5xl font-bold leading-[1.15] text-white mb-8 pb-2">
                    Algunos pierden el rumbo con los años... Yamamoto tenía la tradición, pero necesitaba
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 animate-gradient-text"> renovar su conexión.</span>
                  </h2>
                </div>
                <p className="text-slate-400 text-lg leading-relaxed">
                  En un mercado saturado de opciones "fusión" y espectáculos ruidosos, la auténtica tradición japonesa estaba quedando en segundo plano. Nuestro desafío no fue cambiar su cocina, sino cambiar cómo el mundo la percibía.
                </p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img
                    src="yamamoto-view.jpg"
                    alt="Japanese cuisine"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020410] via-transparent to-transparent" />
                </div>
                {/* Floating accent */}
                <div className="absolute -bottom-6 -left-6 px-6 py-4 bg-amber-500/10 border border-amber-500/20 rounded-xl backdrop-blur-md">
                  <p className="text-amber-400 font-bold text-2xl">35+</p>
                  <p className="text-slate-400 text-sm">Años de tradición</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* ==================== LA SOLUCIÓN ==================== */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        {/* Background blob - Técnica contenedor difuso */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none blur-3xl"
          style={{
            transform: 'translate3d(0, 0, 0)',
            WebkitTransform: 'translate3d(0, 0, 0)',
          }}
        >
          <div className="absolute bottom-[15%] left-[-10%] w-[40vw] h-[40vw] rounded-full"
            style={{
              background: '#f97316',
              opacity: 0.3,
            }}
          />
        </div>
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-amber-500/80 uppercase mb-6"
            >
              <span className="w-8 h-px bg-amber-500/50" />
              La Solución
              <span className="w-8 h-px bg-amber-500/50" />
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.1] pb-2"
            >
              El Enfoque Finem
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-400 text-lg max-w-2xl mx-auto"
            >
              Un enfoque integral basado en tres pilares fundamentales que transformaron la percepción del restaurante.
            </motion.p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                variants={itemVariants}
                className="group relative p-8 md:p-10 rounded-2xl bg-[#0a0a14]/80 border border-white/[0.06] overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:border-amber-500/30"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Icon */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-500">
                  <solution.icon className="w-7 h-7 text-amber-500 transition-transform duration-500 group-hover:rotate-12" strokeWidth={1.5} />
                </div>
                {/* Content */}
                <div className="relative z-10">
                  <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-100 transition-colors">{solution.title}</h4>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{solution.description}</p>
                </div>
                {/* Number */}
                <div className="absolute top-6 right-6 text-6xl font-black text-white/[0.03] group-hover:text-amber-500/10 transition-colors">
                  0{index + 1}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* ==================== RESULTADOS ==================== */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-20">
              <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-amber-500/80 uppercase mb-6">
                <span className="w-8 h-px bg-amber-500/50" />
                Resultados
                <span className="w-8 h-px bg-amber-500/50" />
              </span>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
                El Impacto
              </h3>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                De restaurante tradicional a <span className="text-white">ícono de culto digital</span>. Una transformación basada en la autenticidad.
              </p>
            </motion.div>
            {/* Stats grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {results.map((result, index) => (
                <motion.div
                  key={result.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="relative p-8 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.06] text-center group hover:border-amber-500/30 transition-all duration-500"
                >
                  <p className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-orange-500 mb-2">
                    {result.value}
                  </p>
                  <p className="text-white font-medium mb-1">{result.label}</p>
                  <p className="text-slate-500 text-sm">{result.sublabel}</p>
                </motion.div>
              ))}
            </motion.div>
            {/* Testimonial */}
            <motion.div
              variants={itemVariants}
              className="mt-20 text-center"
            >
              <blockquote className="relative max-w-3xl mx-auto">
                <Quote className="w-12 h-12 text-amber-500/20 mx-auto mb-6" />
                <p className="text-2xl md:text-4xl text-white font-light leading-relaxed mb-8 italic">
                  "Rara vez tienen una mesa libre."
                </p>
                <footer className="text-slate-500">
                  — Resultado después de la transformación digital
                </footer>
              </blockquote>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* ==================== FOOTER / NEXT CASE ==================== */}
      <footer className="relative py-32 overflow-hidden">
        {/* Background blob - Técnica contenedor difuso */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none blur-3xl"
          style={{
            transform: 'translate3d(0, 0, 0)',
            WebkitTransform: 'translate3d(0, 0, 0)',
          }}
        >
          <div className="absolute top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full"
            style={{
              background: '#f97316',
              opacity: 0.2,
            }}
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-slate-500 text-xs tracking-[0.3em] uppercase mb-8">Continuar Explorando</p>
            <div className="relative group cursor-pointer mb-16">
              {/* Background text */}
              <span className="absolute inset-0 flex items-center justify-center text-[15vw] md:text-[12vw] font-black uppercase tracking-widest text-white/[0.02] select-none pointer-events-none transition-all duration-1000 group-hover:text-white/[0.05] group-hover:tracking-[0.2em]">
                NEXT
              </span>
              {/* Main text */}
              <h2 className="relative text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight transition-all duration-500 group-hover:text-amber-100 flex items-center justify-center gap-4 py-20">
                <span>SIGUIENTE CASO</span>
                <ArrowRight className="w-10 h-10 md:w-14 md:h-14 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
              </h2>
            </div>
            {/* Back button */}
            <motion.button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onNavigate('home');
              }}
              whileHover={{ x: -4 }}
              className="inline-flex items-center gap-3 text-slate-400 hover:text-amber-400 text-sm tracking-widest uppercase transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Volver al Inicio
            </motion.button>
          </motion.div>
        </div>
      </footer>
      {/* ==================== STYLES ==================== */}
      <style>{`
        @keyframes gradient-x { 
          0% { background-position: 0% 50%; } 
          50% { background-position: 100% 50%; } 
          100% { background-position: 0% 50%; } 
        }
        .animate-gradient-text { 
          background-size: 200% auto; 
          animation: gradient-x 4s linear infinite; 
        }
      `}</style>
    </div>
  );
};
const ContactWizard = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const inputRef = useRef(null);
  // Mouse tracking for interactive background
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investment: { label: '', score: 0 },
    complexity: { label: '', score: 0 },
    execution: { label: '', score: 0 },
    closeness: { label: '', score: 0 }
  });
  const [finalResult, setFinalResult] = useState({
    modality: '',
    subtitle: '',
    totalScore: 0
  });
  const totalSteps = 6;
  const progress = ((step) / (totalSteps - 1)) * 100;
  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => inputRef.current?.focus(), 500);
      return () => clearTimeout(timer);
    }
  }, [step]);
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
  };
  const handleSelection = (field, label, score, index) => {
    setSelectedOption(index);
    setFormData(prev => ({ ...prev, [field]: { label, score } }));
    if (errors.selection) {
      setErrors(prev => ({ ...prev, selection: null }));
    }
    setTimeout(() => {
      handleNext(true);
      setSelectedOption(null);
    }, 500);
  };
  const calculateResult = () => {
    const totalScore = formData.investment.score + formData.complexity.score + formData.execution.score + formData.closeness.score;
    let result = { totalScore };
    if (totalScore < 40) {
      result.modality = "Consultoría Estratégica";
      result.subtitle = "Tu negocio necesita claridad antes que ruido. Diseñaremos el mapa para que cada paso tenga un retorno real y escalable.";
    }
    else if (totalScore < 90) {
      result.modality = "Growth Partner";
      result.subtitle = "Tienes tracción. Ahora necesitas un sistema que trabaje por ti. Optimizaremos tu embudo para escalar con precisión quirúrgica.";
    }
    else {
      result.modality = "Agencia Integral";
      result.subtitle = "Estás listo para el siguiente nivel. Desplegaremos toda nuestra capacidad creativa y tecnológica para dominar tu mercado por completo.";
    }
    setFinalResult(result);
  };
  const validateStep = () => {
    const newErrors = {};
    let isValid = true;
    if (step === 0) {
      if (!formData.name.trim() || formData.name.length < 2) {
        newErrors.name = "Ingresa tu nombre completo.";
        isValid = false;
      }
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Correo inválido.";
        isValid = false;
      }
      if (!formData.phone.trim() || formData.phone.length < 7) {
        newErrors.phone = "Teléfono requerido.";
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };
  const handleNext = (isAuto = false) => {
    if (!isAuto && !validateStep()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    if (step === 4) calculateResult();
    setDirection(1);
    setStep(prev => prev + 1);
    setErrors({});
  };
  const handleBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(prev => prev - 1);
      setErrors({});
    }
  };
  // ------------------------------------------------------------------
  // INICIO DE MODIFICACIÓN: Integración Webhook Make.com
  // ------------------------------------------------------------------
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Preparamos el payload combinando datos del usuario y el resultado calculado
      const payload = {
        ...formData,
        calculatedResult: finalResult,
        submittedAt: new Date().toISOString()
      };
      // Envío al Webhook
      await fetch('https://hook.us2.make.com/5tlrmwckkiuofcwe2ronpyujnkcyb9qa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      // Si el envío es exitoso (o aunque falle, para no bloquear al usuario), avanzamos
      setDirection(1);
      setStep(6);
    } catch (error) {
      console.error("Error enviando formulario:", error);
      // Fallback: Avanzamos al paso final aunque falle el webhook para no bloquear UX
      setDirection(1);
      setStep(6);
    } finally {
      setIsSubmitting(false);
    }
  };
  // ------------------------------------------------------------------
  // FIN DE MODIFICACIÓN
  // ------------------------------------------------------------------
  const variants = {
    enter: (d) => ({
      x: d > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }
    },
    exit: (d) => ({
      x: d < 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }
    })
  };
  const stepQuestions = {
    1: { title: "Inversión Mensual", subtitle: "¿Cuál es tu presupuesto aproximado para marketing digital?" },
    2: { title: "Etapa del Negocio", subtitle: "¿En qué momento se encuentra tu empresa?" },
    3: { title: "Tipo de Ejecución", subtitle: "¿Qué nivel de involucramiento necesitas?" },
    4: { title: "Nivel de Cercanía", subtitle: "¿Cómo prefieres que sea nuestra colaboración?" },
  };
  const stepOptions = {
    1: [
      { l: 'Menos de $10k MXN', s: 0, icon: '💡' },
      { l: '$10k - $20k MXN', s: 30, icon: '🚀' },
      { l: 'Más de $20k MXN', s: 60, icon: '⚡' }
    ],
    2: [
      { l: 'Iniciando / Validando', s: 10, icon: '🌱' },
      { l: 'Vendiendo / Necesito Orden', s: 20, icon: '📈' },
      { l: 'Escalando / Posicionando', s: 40, icon: '🎯' }
    ],
    3: [
      { l: 'Solo Dirección', s: 0, icon: '🧭' },
      { l: 'Eficiente y Optimizada', s: 20, icon: '⚙️' },
      { l: 'Creativa y A la Medida', s: 40, icon: '✨' }
    ],
    4: [
      { l: 'Puntual', s: 0, icon: '📍' },
      { l: 'Revisiones Periódicas', s: 10, icon: '🔄' },
      { l: 'Socio Estratégico', s: 30, icon: '🤝' }
    ],
  };
  const getFieldName = (step) => {
    const fields = { 1: 'investment', 2: 'complexity', 3: 'execution', 4: 'closeness' };
    return fields[step];
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[9990] bg-[#020410] text-white font-sans flex flex-col overflow-hidden"
    >
      {/* ==================== BACKGROUND ==================== */}
      {/* Dynamic blob that follows mouse */}
      <motion.div
        className="absolute w-[70vw] h-[70vw] pointer-events-none"
        style={{
          left: useSpring(useMotionValue(0), { stiffness: 30, damping: 30 }),
          top: useSpring(useMotionValue(0), { stiffness: 30, damping: 30 }),
          x: smoothX.get() * 200 - 100,
          y: smoothY.get() * 200 - 100,
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(249,115,22,0.15) 0%, transparent 60%)',
          }}
        />
      </motion.div>
      {/* Static ambient blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] pointer-events-none">
        <div
          className="w-full h-full rounded-full animate-pulse"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.2) 0%, transparent 60%)',
            animationDuration: '8s',
          }}
        />
      </div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] pointer-events-none">
        <div
          className="w-full h-full rounded-full animate-pulse"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.15) 0%, transparent 60%)',
            animationDuration: '10s',
            animationDelay: '2s',
          }}
        />
      </div>
      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* ==================== HEADER ==================== */}
      <div className="relative z-50 px-6 py-6 md:py-8 w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Step indicator */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-2 w-2 rounded-full bg-orange-500" />
              <div className="absolute inset-0 h-2 w-2 rounded-full bg-orange-500 animate-ping opacity-75" />
            </div>
            <span className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase">
              {step < 6 ? `Diagnóstico · Paso ${step + 1}/6` : 'Completado'}
            </span>
          </div>
          {/* Close button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 text-xs font-bold tracking-widest text-slate-400 hover:text-white uppercase transition-colors"
          >
            <span className="hidden sm:inline">Cerrar</span>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
              <X className="w-4 h-4 group-hover:text-black transition-colors" />
            </div>
          </motion.button>
        </div>
        {/* Progress bar */}
        <div className="mt-6 h-[2px] bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          />
        </div>
      </div>
      {/* ==================== CONTENT ==================== */}
      <div className="flex-grow relative z-10 flex flex-col justify-center items-center px-6 w-full max-w-5xl mx-auto">
        <AnimatePresence custom={direction} mode='wait'>
          {/* Step 0: Contact Info */}
          {step === 0 && (
            <motion.div
              key="step0"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full max-w-2xl"
            >
              <div className="text-center mb-12">
                <motion.h2
                  className="text-4xl md:text-6xl font-black tracking-tighter mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="text-white">Vamos a iniciar tu</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-purple-400 animate-gradient-text">
                    transformación.
                  </span>
                </motion.h2>
              </div>
              <div className="space-y-10">
                {[
                  { name: 'name', label: 'Nombre Completo', placeholder: 'Escribe tu nombre...', type: 'text' },
                  { name: 'email', label: 'Correo Corporativo', placeholder: 'nombre@empresa.com', type: 'email' },
                  { name: 'phone', label: 'WhatsApp / Teléfono', placeholder: '+52 55 1234 5678', type: 'tel' },
                ].map((field, index) => (
                  <motion.div
                    key={field.name}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <label className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-orange-500/70 uppercase mb-3">
                      <span className="w-2 h-px bg-orange-500/50" />
                      {field.label}
                    </label>
                    <div className="relative">
                      <input
                        ref={field.name === 'name' ? inputRef : null}
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b-2 border-white/10 pb-3 text-2xl md:text-3xl text-white focus:outline-none focus:border-orange-500 font-light placeholder:text-white/20 transition-colors duration-300"
                        placeholder={field.placeholder}
                        autoComplete="off"
                      />
                      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 group-focus-within:w-full transition-all duration-500" />
                    </div>
                    {errors[field.name] && (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-orange-400 text-xs mt-2 font-medium flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-orange-400" />
                        {errors[field.name]}
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          {/* Steps 1-4: Questions */}
          {[1, 2, 3, 4].includes(step) && (
            <motion.div
              key={`step${step}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full max-w-2xl text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-3">
                  {stepQuestions[step].title}
                </h2>
                <p className="text-slate-500 text-lg">
                  {stepQuestions[step].subtitle}
                </p>
              </motion.div>
              <div className="grid grid-cols-1 gap-4">
                {stepOptions[step].map((opt, index) => (
                  <motion.button
                    key={opt.l}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    onClick={() => handleSelection(getFieldName(step), opt.l, opt.s, index)}
                    className={`group relative p-6 md:p-8 rounded-xl border text-left transition-all duration-500 overflow-hidden ${selectedOption === index
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.05]'
                      }`}
                  >
                    {/* Hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{opt.icon}</span>
                        <span className="text-lg md:text-xl font-medium text-white">{opt.l}</span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${selectedOption === index
                        ? 'border-orange-500 bg-orange-500'
                        : 'border-white/20 group-hover:border-white/40'
                        }`}>
                        {selectedOption === index && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-white"
                          />
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
          {/* Step 5: Result */}
          {step === 5 && (
            <motion.div
              key="step5"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full max-w-2xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="mb-8"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-orange-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-orange-400" />
                </div>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-white"
              >
                Tu Modalidad Ideal:
              </motion.h2>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-purple-400 animate-gradient-text mb-8 pb-2"
              >
                {finalResult.modality}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed"
              >
                {finalResult.subtitle}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={handleSubmit}
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-12 py-5 bg-white text-black rounded-lg font-bold tracking-wider overflow-hidden transition-all disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      PROCESANDO...
                    </>
                  ) : (
                    <>
                      AGENDAR DIAGNÓSTICO
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </span>
              </motion.button>
            </motion.div>
          )}
          {/* Step 6: Confirmation */}
          {step === 6 && (
            <motion.div
              key="step6"
              variants={variants}
              initial="enter"
              animate="center"
              className="w-full max-w-2xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="relative mb-10"
              >
                <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-orange-500/20 to-green-500/20 border-2 border-orange-500/50 flex items-center justify-center">
                  <Check className="w-14 h-14 text-orange-500" strokeWidth={2.5} />
                </div>
                {/* Success rings */}
                <div className="absolute inset-0 w-28 h-28 mx-auto rounded-full border border-orange-500/30 animate-ping" style={{ animationDuration: '2s' }} />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6"
              >
                ¡Solicitud Enviada!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
              >
                Gracias, <span className="text-white font-semibold">{formData.name.split(' ')[0]}</span>.
                Nuestro equipo analizará tu perfil y te contactaremos en las próximas{' '}
                <span className="text-orange-400 font-semibold">24 horas</span> vía WhatsApp.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={onClose}
                className="group text-white text-sm font-bold tracking-[0.2em] uppercase transition-all"
              >
                <span className="border-b-2 border-white/20 pb-2 group-hover:border-orange-500 transition-colors">
                  Volver al Sitio
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* ==================== FOOTER NAVIGATION ==================== */}
      <div className="relative z-50 p-6 md:p-8 w-full max-w-5xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Back button */}
          <motion.button
            onClick={handleBack}
            whileHover={{ x: -4 }}
            className={`flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-all ${step > 0 && step < 6 ? 'opacity-100 text-slate-400 hover:text-white' : 'opacity-0 pointer-events-none'
              }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Atrás
          </motion.button>
          {/* Continue button (only on step 0) */}
          {step === 0 && (
            <motion.button
              onClick={() => handleNext(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-lg font-bold tracking-wider transition-all ${shake ? 'animate-shake' : ''
                }`}
            >
              <span>CONTINUAR</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          )}
        </div>
      </div>
      {/* ==================== STYLES ==================== */}
      <style>{`
        @keyframes gradient-x { 
          0% { background-position: 0% 50%; } 
          50% { background-position: 100% 50%; } 
          100% { background-position: 0% 50%; } 
        }
        .animate-gradient-text { 
          background-size: 200% auto; 
          animation: gradient-x 4s linear infinite; 
        }
        .animate-shake { 
          animation: shake 0.4s ease-in-out; 
        }
        @keyframes shake { 
          0%, 100% { transform: translateX(0); } 
          25% { transform: translateX(-5px); } 
          75% { transform: translateX(5px); } 
        }
      `}</style>
    </motion.div>
  );
};
/* -------------------------------------------------------------------------- */
/* APP WRAPPER                                                                */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* HOME (Tu sitio actual)                                                      */
/* -------------------------------------------------------------------------- */
const Home = () => {
  const [currentView, setCurrentView] = useState('home');
  const [showWizard, setShowWizard] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);
  return (
    <>
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenWizard={() => setShowWizard(true)}
      />
      <AnimatePresence>
        {showWizard && <ContactWizard onClose={() => setShowWizard(false)} />}
      </AnimatePresence>
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="relative z-10 bg-[#020410] mb-[70vh] md:mb-[85vh] rounded-b-[2rem] md:rounded-b-[3rem] shadow-2xl pb-10 md:pb-20">
                <HeroSection onOpenWizard={() => setShowWizard(true)} />
                <ServicesSection />
                <CaseStudySection onNavigate={setCurrentView} />
              </div>
              <div className="fixed bottom-0 left-0 w-full h-[70vh] md:h-[85vh] flex flex-col justify-end bg-[#020410]" style={{ zIndex: -1 }}>
                <FooterSection onOpenWizard={() => setShowWizard(true)} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="yamamoto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative bg-[#020410]"
            >
              <YamamotoView onNavigate={setCurrentView} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};
/* -------------------------------------------------------------------------- */
/* APP WRAPPER CON ROUTER                                                      */
/* -------------------------------------------------------------------------- */

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-[#020410] min-h-screen text-slate-200 selection:bg-orange-500/30 selection:text-orange-200 font-sans overflow-x-hidden">
        <GlobalStyles />
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quotes/Rebhinder" element={<RebhinderProposal />} />
          <Route path="/quotes/Amerimed" element={<AmerimedProposal />} />
          <Route path="/quotes/AmerimedDiscovery" element={<AmerimedDiscovery />} />
          <Route path="/generator" element={<ProposalGenerator />} />
          <Route path="/2025-02/organic-nails" element={<OrganicNailsContentHub />} />
          <Route path="/multimedia" element={<Mike4VisualPage />} />
          <Route path="/quotes/Nativa" element={<NativaAiProposal />} />
          <Route path="/quotes/AgentePoliticoIA" element={<LaNacionAIProposal />} />
          <Route path="/quotes/RevistaNacion" element={<LaNacionAIProposalF />} />
          <Route path="/growth" element={<FinemGrowth />} />
          <Route path="/content-hub/generator" element={<ContentHubGenerator />} />
          <Route path="/content-hub/:clientSlug/:month" element={<DynamicContentHub />} />
          <Route path="/quotes/Valttiva" element={<ValttivaProposal />} />
          <Route path="/quotes/FinemPolitics" element={<FinemPoliticsProposal />} />
          <Route path="/conectadas-y-seguras" element={<ConectadasYSeguras />} />
          <Route path="/kit-digital-conectadas-seguras" element={<KitDigitalConectadasSeguras />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default App;
