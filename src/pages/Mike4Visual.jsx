import {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo
}

    from "react";

import {
    Play,
    Volume2,
    VolumeX,
    ArrowRight,
    ArrowUpRight,
    Camera,
    Clapperboard,
    Palette,
    BarChart3,
    ChevronDown,
    MessageCircle,
    X,
    Check,
    Send,
    Film,
    Target,
}

    from "lucide-react";

/* ============================================================
   CONSTANTS & UTILITIES
   ============================================================ */
const GOLD = "#C8A96E";
const GOLD_LIGHT = "#D4BA85";
const DARK_BG = "#020410";
const DARK_CARD = "#0a0a1a";
const WARM_LIGHT = "#FAFAF8";
const WARM_MID = "#F5F2ED";

const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

/* ============================================================
   GLOBAL STYLES
   ============================================================ */
const PageStyles = () => (<style> {
    ` @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            box-sizing: border-box;
        }

        .m4v-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

            background: $ {
                DARK_BG
            }

            ;
            color: #e2e8f0;
            overflow-x: hidden;
        }

        /* Scroll reveal */
        .m4v-reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.9s cubic-bezier(0.25, 0.4, 0.25, 1),
            transform 0.9s cubic-bezier(0.25, 0.4, 0.25, 1);
        }

        .m4v-reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .m4v-reveal-delay-1 {
            transition-delay: 0.1s;
        }

        .m4v-reveal-delay-2 {
            transition-delay: 0.2s;
        }

        .m4v-reveal-delay-3 {
            transition-delay: 0.3s;
        }

        .m4v-reveal-delay-4 {
            transition-delay: 0.4s;
        }

        .m4v-reveal-delay-5 {
            transition-delay: 0.5s;
        }

        /* Blob animations */
        @keyframes m4v-blob-float {
            0% {
                transform: translate3d(0, 0, 0) scale(1);
            }

            15% {
                transform: translate3d(1.5%, -1%, 0) scale(1.015);
            }

            35% {
                transform: translate3d(2.5%, -2.5%, 0) scale(1.025);
            }

            50% {
                transform: translate3d(1%, -1.5%, 0) scale(1.01);
            }

            70% {
                transform: translate3d(-1%, 1%, 0) scale(0.99);
            }

            85% {
                transform: translate3d(-0.5%, 0.5%, 0) scale(0.995);
            }

            100% {
                transform: translate3d(0, 0, 0) scale(1);
            }
        }

        @keyframes m4v-blob-reverse {
            0% {
                transform: translate3d(0, 0, 0) scale(1);
            }

            20% {
                transform: translate3d(-1.5%, 1%, 0) scale(0.985);
            }

            40% {
                transform: translate3d(-2%, 2%, 0) scale(0.975);
            }

            55% {
                transform: translate3d(-0.5%, 1.5%, 0) scale(0.99);
            }

            75% {
                transform: translate3d(1%, -0.5%, 0) scale(1.01);
            }

            100% {
                transform: translate3d(0, 0, 0) scale(1);
            }
        }

        @keyframes m4v-pulse-glow {
            0%, 100% {
                opacity: 0.25; transform: scale(1);
            }

            50% {
                opacity: 0.45; transform: scale(1.02);
            }
        }

        @keyframes m4v-gradient-x {
            0% {
                background-position: 0% 50%;
            }

            50% {
                background-position: 100% 50%;
            }

            100% {
                background-position: 0% 50%;
            }
        }

        @keyframes m4v-scan {
            0% {
                transform: translateY(-100%);
            }

            100% {
                transform: translateY(100vh);
            }
        }

        @keyframes m4v-film-grain {
            0%, 100% {
                transform: translate(0, 0);
            }

            10% {
                transform: translate(-1%, -1%);
            }

            30% {
                transform: translate(1%, 2%);
            }

            50% {
                transform: translate(-2%, 1%);
            }

            70% {
                transform: translate(2%, -1%);
            }

            90% {
                transform: translate(-1%, 2%);
            }
        }

        @keyframes m4v-logo-glow {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(249,115,22,0.25)) drop-shadow(0 0 14px rgba(124,58,237,0.12)) drop-shadow(0 0 22px rgba(59,130,246,0.08)); }
            33% { filter: drop-shadow(0 0 10px rgba(249,115,22,0.35)) drop-shadow(0 0 18px rgba(59,130,246,0.15)); }
            66% { filter: drop-shadow(0 0 8px rgba(124,58,237,0.3)) drop-shadow(0 0 16px rgba(249,115,22,0.15)); }
            }

        .m4v-animate-blob {
            animation: m4v-blob-float 28s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
            will-change: transform;
        }

        .m4v-animate-blob-reverse {
            animation: m4v-blob-reverse 32s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
            will-change: transform;
        }

        .m4v-animate-pulse {
            animation: m4v-pulse-glow 5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
            will-change: opacity, transform;
        }

        .m4v-gradient-text {
            background-size: 200% auto;
            animation: m4v-gradient-x 4s linear infinite;
        }

        /* Film scan line */
        .m4v-scanline::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(200, 169, 110, 0.3), transparent);
            animation: m4v-scan 8s linear infinite;
            pointer-events: none;
        }

        /* Grain overlay */
        .m4v-grain {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
            animation: m4v-film-grain 0.5s steps(1) infinite;
        }

        /* Gold gradient text */
       .m4v-gold-text {
      background: linear-gradient(135deg, 
      #ffffff 0%,
      ${GOLD_LIGHT} 25%, 
      ${GOLD} 50%, 
      #ffffff 75%,
      ${GOLD_LIGHT} 100%)
      ;
      background-size: 300% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: m4v-gradient-x 8s linear infinite;
    }
|
        /* CTA Buttons */
        .m4v-cta-primary {
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 18px 40px;

            background: $ {
                GOLD
            }

            ;
            color: #0a0a0a;
            font-weight: 700;
            font-size: 11px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            border: none;
            cursor: pointer;
            overflow: hidden;
            transition: all 0.5s cubic-bezier(0.25, 0.4, 0.25, 1);
        }

        .m4v-cta-primary::before {
            content: '';
            position: absolute;
            inset: 0;

            background: linear-gradient(135deg, #E8D5A8, $ {
                    GOLD
                }

                , #A08550);
            opacity: 0;
            transition: opacity 0.5s;
        }

        .m4v-cta-primary:hover::before {
            opacity: 1;
        }

        .m4v-cta-primary:hover {
            transform: translateY(-2px); box-shadow: 0 20px 40px -10px rgba(200, 169, 110, 0.3);
        }

        .m4v-cta-primary:active {
            transform: translateY(0) scale(0.98);
        }

        .m4v-cta-primary span {
            position: relative; z-index: 1; display: flex; align-items: center; gap: 12px;
        }

        .m4v-cta-ghost {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 16px 32px;
            background: transparent;
            color: white;
            font-weight: 700;
            font-size: 11px;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            border: 1px solid rgba(255, 255, 255, 0.12);
            cursor: pointer;
            transition: all 0.4s;
            backdrop-filter: blur(8px);
        }

        .m4v-cta-ghost:hover {
            border-color: $ {
                GOLD
            }

            ;

            color: $ {
                GOLD
            }

            ;
            background: rgba(200, 169, 110, 0.05);
        }

        /* FAQ accordion */
        .m4v-faq-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s cubic-bezier(0.25, 0.4, 0.25, 1), padding 0.5s;
            padding: 0 24px;
        }

        .m4v-faq-content.open {
            max-height: 300px;
            padding: 0 24px 24px;
        }

        /* Custom scrollbar */
        .m4v-page::-webkit-scrollbar {
            width: 6px;
        }

        .m4v-page::-webkit-scrollbar-track {
            background: $ {
                DARK_BG
            }

            ;
        }

        .m4v-page::-webkit-scrollbar-thumb {
            background: rgba(200, 169, 110, 0.3); border-radius: 3px;
        }

        .m4v-page::-webkit-scrollbar-thumb:hover {
            background: $ {
                GOLD
            }

            ;
        }

        /* ── Awwwards-grade enhancements ── */

        /* Shimmer sweep for gold accent lines */
        @keyframes m4v-shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        .m4v-shimmer-line {
            background: linear-gradient(90deg, transparent 0%, rgba(200,169,110,0.08) 20%, rgba(200,169,110,0.25) 50%, rgba(200,169,110,0.08) 80%, transparent 100%);
            background-size: 200% 100%;
            animation: m4v-shimmer 4s ease-in-out infinite;
        }

        /* Gentle vertical float */
        @keyframes m4v-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
        }
        .m4v-float {
            animation: m4v-float 6s ease-in-out infinite;
        }

        /* Pulsing border glow for cards */
        @keyframes m4v-border-glow {
            0%, 100% { border-color: rgba(200,169,110,0.06); box-shadow: 0 0 0 rgba(200,169,110,0); }
            50% { border-color: rgba(200,169,110,0.15); box-shadow: 0 0 20px rgba(200,169,110,0.04); }
        }

        /* Scroll progress bar */
        .m4v-scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            height: 2px;
            background: linear-gradient(90deg, ${GOLD}, #f97316, ${GOLD_LIGHT});
            z-index: 9999;
            transform-origin: left;
            transition: none;
            pointer-events: none;
        }

        /* Top-edge glow line */
        .m4v-edge-glow {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 30%, rgba(200,169,110,0.12) 50%, rgba(255,255,255,0.08) 70%, transparent 100%);
            pointer-events: none;
            z-index: 10;
        }

        /* Custom cursor styles */
        @media (min-width: 768px) and (pointer: fine) {
            .m4v-page, .m4v-page *, .m4v-page a, .m4v-page button {
                cursor: none !important;
            }
        }

        /* Responsive CTAs */
        @media (max-width: 768px) {
            .m4v-cta-primary, .m4v-cta-ghost {
                width: 100%;
                justify-content: center;
            }
        }

        /* ── MOBILE AWWWARDS POLISH ── */
        @media (max-width: 767px) {
            /* Soften page-level ambient blobs — prevent claustrophobic blue edges */
            .m4v-page > .absolute.pointer-events-none > div {
                opacity: 0.55;
            }

            /* Reduce section vertical padding on mobile */
            .m4v-section-pad {
                padding-top: 56px !important;
                padding-bottom: 56px !important;
            }

            /* Improve service card mobile appearance */
            .m4v-service-card-mobile {
                padding: 24px !important;
            }

            /* Full-width CTA buttons */
            .m4v-cta-fullwidth-mobile {
                width: 100%;
                justify-content: center;
            }

            /* Process mobile line */
            .m4v-process-mobile-line {
                left: 22px !important;
            }

            /* Comparison table mobile text */
            .m4v-comparison-cell-mobile {
                font-size: 13px !important;
                padding: 14px 12px !important;
            }

            /* FAQ mobile question tap target */
            .m4v-faq-btn-mobile {
                padding: 18px 16px !important;
            }

            /* Footer text mobile */
            .m4v-footer-text-mobile {
                font-size: 10px !important;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }

        `
}

</style>);

/* ============================================================
   HOOKS
   ============================================================ */
const useReveal = (threshold = 0.1) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                el.classList.add("visible");
                observer.unobserve(el);
            }
        }

            ,
            {
                threshold, rootMargin: "0px 0px -40px 0px"
            });
        observer.observe(el);
        return () => observer.disconnect();
    }

        , [threshold]);
    return ref;
}

    ;

const Reveal = ({
    children, className = "", delay = 0, style = {}

}) => {
    const ref = useReveal();

    const delayClass = delay > 0 ? `m4v-reveal-delay-$ {
        delay
    }

    ` : "";

    return (<div ref={
        ref
    }

        className={
            `m4v-reveal $ {
                delayClass
            }

            $ {
                className
            }

            `
        }

        style={
            style
        }

    > {
            children
        }

    </div>);
}

    ;

/* ============================================================
   CUSTOM CURSOR (Enhancement 1)
   ============================================================ */
const CustomCursor = () => {
    const ringRef = useRef(null);
    const dotRef = useRef(null);

    useEffect(() => {
        if (isTouchDevice) return;
        let ringX = -100, ringY = -100, dotX = -100, dotY = -100;
        let raf;

        const onMove = (e) => {
            dotX = e.clientX;
            dotY = e.clientY;
        };

        const animate = () => {
            ringX += (dotX - ringX) * 0.15;
            ringY += (dotY - ringY) * 0.15;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
            }
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
            }
            raf = requestAnimationFrame(animate);
        };

        const onOver = (e) => {
            const t = e.target;
            if (t.tagName === "A" || t.tagName === "BUTTON" || t.closest("a") || t.closest("button") || t.classList.contains("cursor-pointer")) {
                if (ringRef.current) ringRef.current.style.width = ringRef.current.style.height = "56px";
                if (ringRef.current) ringRef.current.style.marginLeft = ringRef.current.style.marginTop = "-8px";
                if (dotRef.current) dotRef.current.style.opacity = "0.6";
            }
        };
        const onOut = () => {
            if (ringRef.current) ringRef.current.style.width = ringRef.current.style.height = "40px";
            if (ringRef.current) ringRef.current.style.marginLeft = ringRef.current.style.marginTop = "0px";
            if (dotRef.current) dotRef.current.style.opacity = "1";
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        document.addEventListener("mouseover", onOver, { passive: true });
        document.addEventListener("mouseout", onOut, { passive: true });
        raf = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseover", onOver);
            document.removeEventListener("mouseout", onOut);
            cancelAnimationFrame(raf);
        };
    }, []);

    if (isTouchDevice) return null;

    return (
        <>
            {/* Ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 pointer-events-none hidden md:block"
                style={{
                    width: 40, height: 40,
                    borderRadius: "50%",
                    border: `1.5px solid ${GOLD}55`,
                    boxShadow: `0 0 12px ${GOLD}18`,
                    transition: "width 0.25s, height 0.25s, margin 0.25s, border-color 0.3s",
                    zIndex: 99999,
                    mixBlendMode: "difference",
                }}
            />
            {/* Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 pointer-events-none hidden md:block"
                style={{
                    width: 8, height: 8,
                    borderRadius: "50%",
                    background: GOLD,
                    boxShadow: `0 0 8px ${GOLD}60`,
                    transition: "opacity 0.2s",
                    zIndex: 100000,
                }}
            />
        </>
    );
};

/* ============================================================
   SCROLL PROGRESS BAR (Enhancement 6)
   ============================================================ */
const ScrollProgressBar = () => {
    const barRef = useRef(null);

    useEffect(() => {
        const onScroll = () => {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            const p = h > 0 ? window.scrollY / h : 0;
            if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return <div ref={barRef} className="m4v-scroll-progress" />;
};

/* ============================================================
   SECTION FADE (Enhancement 2)
   ============================================================ */
const SectionFade = ({ position = "bottom", height = 120 }) => (
    <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
            [position]: 0,
            height,
            background: position === "bottom"
                ? `linear-gradient(to bottom, transparent 0%, ${DARK_BG} 100%)`
                : `linear-gradient(to top, transparent 0%, ${DARK_BG} 100%)`,
            zIndex: 20,
        }}
    />
);

/* ============================================================
   PARALLAX HOOK (Enhancement 4)
   ============================================================ */
const useParallax = (speed = 0.06) => {
    const ref = useRef(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (isTouchDevice) return;
        const el = ref.current;
        if (!el) return;

        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const rect = el.getBoundingClientRect();
                    const center = rect.top + rect.height / 2;
                    const viewCenter = window.innerHeight / 2;
                    setOffset((center - viewCenter) * speed);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, [speed]);

    return { ref, style: isTouchDevice ? {} : { transform: `translateY(${offset}px)`, transition: "transform 0.1s linear" } };
};

/* ============================================================
   FINEM × MIKE4VISUAL COLLAB LOGO
   ============================================================ */
const CollabLogo = ({ className = "", size = "default" }) => {
    const isLg = size === "large";
    return (
        <div className={`relative inline-flex items-center ${className}`}>
            {/* Ambient glow — orange/purple/blue like finem.mx */}
            <div
                className="absolute -inset-3 rounded-2xl pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at 20% 50%, rgba(249,115,22,0.12) 0%, transparent 55%), radial-gradient(ellipse at 80% 50%, rgba(124,58,237,0.08) 0%, transparent 55%)",
                    filter: "blur(8px)",
                    animation: "m4v-pulse-glow 6s ease-in-out infinite",
                }}
            />
            <img
                src="/finem-x-mike4visual-logo.png"
                alt="Finem × Mike4Visual"
                className="relative z-10"
                style={{
                    height: isLg ? 60 : 110,
                    width: "auto",
                    filter:
                        "drop-shadow(0 0 6px rgba(249,115,22,0.25)) drop-shadow(0 0 14px rgba(124,58,237,0.12)) drop-shadow(0 0 22px rgba(59,130,246,0.08))",
                    animation: "m4v-logo-glow 6s ease-in-out infinite",
                }}
            />
        </div>
    );
};
/* ============================================================
   BLOQUE 01 — HERO
   ============================================================ */
const HeroBlock = () => {
    const [muted, setMuted] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const iframeRef = useRef(null);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 400);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (isTouchDevice) return;
        const handle = (e) => {
            setMouse({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener("mousemove", handle, { passive: true });
        return () => window.removeEventListener("mousemove", handle);
    }, []);

    const toggleMute = () => {
        const iframe = iframeRef.current;
        if (iframe) {
            iframe.contentWindow.postMessage(
                JSON.stringify({ method: "setMuted", value: !muted }),
                "*"
            );
        }
        setMuted(!muted);
    };

    /* shared horizontal padding — matches nav */
    const hPad = "clamp(24px, 4vw, 48px)";

    return (
        <section
            className="relative w-full overflow-hidden"
            style={{ height: "100dvh", minHeight: 640, background: "#030306" }}
        >
            {/* ─── VIDEO ─── */}
            <div className="absolute inset-0">
                <div
                    className="absolute"
                    style={{
                        top: "50%",
                        left: "50%",
                        width: "max(177.78vh, 100vw)",
                        height: "max(56.25vw, 100vh)",
                        transform: "translate(-50%, -50%)",
                        pointerEvents: "none",
                    }}
                >
                    <iframe
                        ref={iframeRef}
                        src="https://player.vimeo.com/video/1143692702?autoplay=1&loop=1&muted=1&controls=0&autopause=0&badge=0&playsinline=1&background=1"
                        title="Ix Maa Uayec - Produccion y Direccion"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        style={{ width: "100%", height: "100%", border: "none" }}
                    />
                </div>

                {/* Cinematic grade — vignette + directional darken */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: [
                            "linear-gradient(180deg, rgba(3,3,6,0.7) 0%, rgba(3,3,6,0.2) 22%, rgba(3,3,6,0.08) 45%, rgba(3,3,6,0.15) 68%, rgba(3,3,6,0.85) 100%)",
                            "linear-gradient(90deg, rgba(3,3,6,0.55) 0%, transparent 35%, transparent 65%, rgba(3,3,6,0.35) 100%)",
                            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(3,3,6,0.4) 100%)",
                        ].join(","),
                    }}
                />

                {/* Finem ambient lights */}
                <div className="absolute pointer-events-none" style={{ width: "55vw", height: "55vh", top: "-8%", left: "-12%", background: "radial-gradient(ellipse, rgba(249,115,22,0.06) 0%, transparent 70%)", filter: "blur(60px)", animation: "m4v-blob-float 22s ease-in-out infinite" }} />
                <div className="absolute pointer-events-none" style={{ width: "45vw", height: "45vh", bottom: "-5%", right: "-8%", background: "radial-gradient(ellipse, rgba(124,58,237,0.04) 0%, transparent 70%)", filter: "blur(60px)", animation: "m4v-blob-reverse 26s ease-in-out infinite" }} />
                <div className="absolute pointer-events-none" style={{ width: "35vw", height: "35vh", top: "35%", right: "15%", background: "radial-gradient(ellipse, rgba(59,130,246,0.03) 0%, transparent 70%)", filter: "blur(80px)", animation: "m4v-blob-float 30s ease-in-out infinite reverse" }} />

                {/* Mouse glow */}
                {!isTouchDevice && (
                    <div
                        className="absolute pointer-events-none transition-all duration-[1800ms]"
                        style={{
                            width: "45vw",
                            height: "45vw",
                            borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(249,115,22,0.035) 0%, rgba(124,58,237,0.015) 45%, transparent 70%)",
                            left: `calc(50% + ${mouse.x * 2}px)`,
                            top: `calc(50% + ${mouse.y * 2}px)`,
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                )}

                {/* Grain */}
                {!isTouchDevice && (
                    <div className="absolute inset-0 m4v-grain pointer-events-none mix-blend-overlay" style={{ opacity: 0.035 }} />
                )}
            </div>

            {/* ─── LAYOUT: 3-row grid (nav-space | content | footer) ─── */}
            <div
                className="relative z-20 h-full"
                style={{
                    display: "grid",
                    gridTemplateRows: "auto 1fr auto",
                    padding: `0 ${hPad}`,
                    maxWidth: 1440,
                    margin: "0 auto",
                    width: "100%",
                }}
            >
                {/* Row 1 — nav spacer */}
                <div style={{ height: "clamp(88px, 10vh, 110px)" }} />

                {/* Row 2 — main content, self-centering */}
                <div className="flex items-center">
                    <div style={{ maxWidth: 620 }}>
                        {/* Micro-label */}
                        <div
                            className="flex items-center gap-3"
                            style={{
                                marginBottom: 28,
                                opacity: loaded ? 1 : 0,
                                transform: loaded ? "none" : "translateY(16px)",
                                transition: "all 0.7s cubic-bezier(0.25,0.4,0.25,1) 0.3s",
                            }}
                        >
                            <div style={{ width: 24, height: 1, background: "linear-gradient(to right, #f97316, transparent)" }} />
                            <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(249,115,22,0.55)" }}>
                                Producción Audiovisual Estratégica
                            </span>
                        </div>

                        {/* Heading */}
                        <h1
                            style={{
                                opacity: loaded ? 1 : 0,
                                transform: loaded ? "none" : "translateY(24px)",
                                transition: "all 0.9s cubic-bezier(0.25,0.4,0.25,1) 0.5s",
                            }}
                        >
                            <span
                                className="block m4v-gold-text"
                                style={{
                                    fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
                                    fontWeight: 900,
                                    letterSpacing: "-0.035em",
                                    lineHeight: 1.1,
                                }}
                            >
                                Tu negocio ya tiene la historia.
                            </span>
                            <span
                                className="block"
                                style={{
                                    marginTop: 6,
                                    fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
                                    fontWeight: 900,
                                    letterSpacing: "-0.035em",
                                    lineHeight: 1.1,
                                    color: "rgba(255,255,255,0.95)",
                                }}
                            >
                                Nosotros la convertimos en imagen.
                            </span>
                        </h1>

                        {/* Body */}
                        <p
                            style={{
                                marginTop: 22,
                                fontSize: "clamp(0.95rem, 1.3vw, 1rem)",
                                color: "rgba(148,163,184,0.85)",
                                maxWidth: 440,
                                lineHeight: 1.75,
                                fontWeight: 300,
                                opacity: loaded ? 1 : 0,
                                transform: loaded ? "none" : "translateY(16px)",
                                transition: "all 0.8s cubic-bezier(0.25,0.4,0.25,1) 0.75s",
                            }}
                        >
                            Producción audiovisual con dirección estratégica.{" "}
                            <span style={{ color: "rgba(255,255,255,0.88)", fontWeight: 400 }}>
                                No videos bonitos — videos que trabajan para tu marca.
                            </span>
                        </p>

                        {/* CTA */}
                        <div
                            style={{
                                marginTop: 32,
                                opacity: loaded ? 1 : 0,
                                transform: loaded ? "none" : "translateY(16px)",
                                transition: "all 0.8s cubic-bezier(0.25,0.4,0.25,1) 0.95s",
                            }}
                        >
                            <button
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 14,
                                    padding: "16px 36px",
                                    background: "transparent",
                                    color: "rgba(255,255,255,0.9)",
                                    fontWeight: 700,
                                    fontSize: 10,
                                    letterSpacing: "0.22em",
                                    textTransform: "uppercase",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    cursor: "pointer",
                                    transition: "all 0.5s cubic-bezier(0.25,0.4,0.25,1)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = GOLD;
                                    e.currentTarget.style.color = "#0a0a0a";
                                    e.currentTarget.style.background = GOLD;
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.boxShadow = "0 16px 40px -8px rgba(200,169,110,0.3)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                                    e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                                    e.currentTarget.style.background = "transparent";
                                    e.currentTarget.style.transform = "none";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                Quiero una propuesta
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Row 3 — bottom bar */}
                <div
                    className="flex items-center justify-between"
                    style={{
                        height: 56,
                        marginBottom: "clamp(16px, 2.5vh, 28px)",
                        opacity: loaded ? 1 : 0,
                        transition: "opacity 1s ease 1.3s",
                    }}
                >
                    {/* Sound */}
                    <button
                        onClick={toggleMute}
                        className="flex items-center gap-2 group"
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                    >
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-white/20"
                            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                        >
                            {muted ? (
                                <VolumeX className="w-3 h-3" style={{ color: "rgba(255,255,255,0.3)" }} />
                            ) : (
                                <Volume2 className="w-3 h-3" style={{ color: GOLD }} />
                            )}
                        </div>
                        <span style={{ fontSize: 8, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", fontWeight: 500 }}>
                            {muted ? "Sound off" : "Sound on"}
                        </span>
                    </button>

                    {/* Scroll — center */}
                    <div className="hidden md:flex flex-col items-center gap-2">
                        <span style={{ fontSize: 7, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.12)", fontWeight: 500 }}>
                            Scroll
                        </span>
                        <div className="relative w-px h-8 overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                            <div className="absolute top-0 left-0 w-full h-1/3" style={{ background: "linear-gradient(to bottom, " + GOLD + "60, transparent)", animation: "m4v-scan 2.5s ease-in-out infinite" }} />
                        </div>
                    </div>

                    {/* Showreel tag — right */}
                    <div className="hidden md:flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full" style={{ background: "#ef4444", boxShadow: "0 0 4px rgba(239,68,68,0.4)", animation: "m4v-pulse-glow 2.5s ease infinite" }} />
                        <span style={{ fontSize: 8, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", fontWeight: 500 }}>
                            Showreel 2026
                        </span>
                    </div>
                </div>
            </div>

            {/* ─── FRAME CORNERS ── inside video area, clear of nav ─── */}
            {[
                { t: "clamp(90px, 11vh, 115px)", l: hPad, r: "auto", b: "auto", bdr: "border-l border-t", mx: -1, my: -1 },
                { t: "clamp(90px, 11vh, 115px)", l: "auto", r: hPad, b: "auto", bdr: "border-r border-t", mx: 1, my: -1 },
                { t: "auto", l: hPad, r: "auto", b: "clamp(60px, 8vh, 90px)", bdr: "border-l border-b", mx: -1, my: 1 },
                { t: "auto", l: "auto", r: hPad, b: "clamp(60px, 8vh, 90px)", bdr: "border-r border-b", mx: 1, my: 1 },
            ].map((c, i) => (
                <div
                    key={i}
                    className={`absolute w-5 h-5 md:w-8 md:h-8 ${c.bdr} z-10 pointer-events-none transition-transform duration-[900ms]`}
                    style={{
                        top: c.t === "auto" ? "auto" : c.t,
                        left: c.l === "auto" ? "auto" : c.l,
                        right: c.r === "auto" ? "auto" : c.r,
                        bottom: c.b === "auto" ? "auto" : c.b,
                        borderColor: "rgba(255,255,255,0.07)",
                        transform: isTouchDevice ? "none" : `translate(${mouse.x * c.mx * 0.25}px, ${mouse.y * c.my * 0.25}px)`,
                    }}
                />
            ))}
        </section>
    );
};

/* ============================================================
   BLOQUE 02 — CONTRASTE
   ============================================================ */
const BtsVideo = () => {
    const [playing, setPlaying] = useState(false);

    return (
        <div
            className="mt-12 md:mt-28 relative overflow-hidden group"
            style={{
                borderRadius: 12,
                aspectRatio: "21/9",
                background: `linear-gradient(135deg, ${DARK_CARD}, #0d0d1a)`,
                border: "1px solid rgba(255,255,255,0.04)",
            }}
        >
            {/* Video — always loaded but overlay blocks interaction until play */}
            <iframe
                width="100%"
                height="100%"
                src={"https://www.youtube.com/embed/_LFpIurHxhA?rel=0&modestbranding=1" + (playing ? "&autoplay=1" : "")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ position: "absolute", inset: 0, borderRadius: 12, zIndex: 1 }}
            />

            {/* Interaction overlay — blocks iframe mouse capture until user clicks play */}
            {!playing && (
                <div
                    className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
                    onClick={() => setPlaying(true)}
                    style={{ background: "rgba(0,0,0,0.35)" }}
                >
                    {/* Play button */}
                    <div className="relative">
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{ border: "1px solid " + GOLD + "15", animation: "m4v-pulse-glow 3s ease infinite", width: 80, height: 80, top: -8, left: -8 }}
                        />
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                            style={{
                                background: "rgba(200,169,110,0.08)",
                                border: "1px solid " + GOLD + "25",
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                            }}
                        >
                            <Play className="w-6 h-6 ml-0.5" style={{ color: GOLD, opacity: 0.8 }} fill={GOLD + "15"} />
                        </div>
                    </div>

                    {/* Cinematic bars */}
                    <div className="absolute top-0 left-0 right-0 h-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)" }} />
                    <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />

                    {/* Frame corners */}
                    {[
                        "top-3 left-3 border-l border-t",
                        "top-3 right-3 border-r border-t",
                        "bottom-3 left-3 border-l border-b",
                        "bottom-3 right-3 border-r border-b",
                    ].map((cls, i) => (
                        <div
                            key={i}
                            className={`absolute w-4 h-4 ${cls} pointer-events-none transition-all duration-500 group-hover:w-5 group-hover:h-5`}
                            style={{ borderColor: "rgba(255,255,255,0.08)" }}
                        />
                    ))}

                    {/* Bottom glow */}
                    <div
                        className="absolute bottom-0 left-[8%] right-[8%] h-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{ background: "linear-gradient(90deg, transparent, " + GOLD + "20, rgba(249,115,22,0.1), transparent)" }}
                    />
                </div>
            )}
        </div>
    );
};

const ContrastBlock = () => {
    const sectionRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

    useEffect(() => {
        if (isTouchDevice) return;
        const handle = (e) => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            setMousePos({
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height,
            });
        };
        window.addEventListener("mousemove", handle, { passive: true });
        return () => window.removeEventListener("mousemove", handle);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden"
            style={{
                background: DARK_BG,
                padding: "clamp(80px, 12vh, 140px) 0",
            }}
        >
            {/* ── Ambient light system ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Orange top-left */}
                <div
                    className="absolute"
                    style={{
                        width: "50vw",
                        height: "50vh",
                        top: "-15%",
                        left: "-10%",
                        background: "radial-gradient(ellipse, rgba(249,115,22,0.16) 0%, transparent 65%)",
                        filter: "blur(80px)",
                        animation: "m4v-blob-float 18s ease-in-out infinite",
                    }}
                />
                {/* Purple center-right */}
                <div
                    className="absolute"
                    style={{
                        width: "40vw",
                        height: "40vh",
                        top: "20%",
                        right: "-5%",
                        background: "radial-gradient(ellipse, rgba(124,58,237,0.14) 0%, transparent 65%)",
                        filter: "blur(70px)",
                        animation: "m4v-blob-reverse 22s ease-in-out infinite",
                    }}
                />
                {/* Blue bottom */}
                <div
                    className="absolute"
                    style={{
                        width: "45vw",
                        height: "35vh",
                        bottom: "-10%",
                        left: "25%",
                        background: "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 65%)",
                        filter: "blur(70px)",
                        animation: "m4v-blob-float 25s ease-in-out infinite reverse",
                    }}
                />
                {/* Mouse-reactive glow */}
                {!isTouchDevice && (
                    <div
                        className="absolute transition-all duration-[2000ms]"
                        style={{
                            width: "35vw",
                            height: "35vw",
                            borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(200,169,110,0.1) 0%, transparent 65%)",
                            left: `${mousePos.x * 100}%`,
                            top: `${mousePos.y * 100}%`,
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                )}
                {/* Subtle grid overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
                        backgroundSize: "80px 80px",
                        maskImage: "radial-gradient(ellipse at 50% 50%, black 20%, transparent 70%)",
                        WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 20%, transparent 70%)",
                    }}
                />
            </div>

            <div
                className="relative z-10"
                style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}
            >
                {/* ── Section label ── */}
                <Reveal>
                    <div className="flex items-center gap-3 mb-16 md:mb-20">
                        <div style={{ width: 24, height: 1, background: "linear-gradient(to right, #f97316, transparent)" }} />
                        <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(249,115,22,0.8)" }}>
                            El problema y la solución
                        </span>
                    </div>
                </Reveal>

                {/* ── Two-column layout ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-0 items-center relative">
                    {/* Center divider — animated gradient line */}
                    <div
                        className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px"
                        style={{
                            background: `linear-gradient(180deg, transparent 0%, rgba(249,115,22,0.15) 20%, ${GOLD}30 50%, rgba(124,58,237,0.15) 80%, transparent 100%)`,
                        }}
                    />

                    {/* LEFT — Problem */}
                    <div className="md:pr-16 lg:pr-24">
                        <Reveal>
                            {/* Red accent bar */}
                            <div
                                className="mb-8"
                                style={{
                                    width: 36,
                                    height: 2,
                                    background: "linear-gradient(to right, #ef4444, #ef444440)",
                                    borderRadius: 1,
                                }}
                            />
                            <h3
                                style={{
                                    fontSize: "clamp(1.6rem, 3.5vw, 2.3rem)",
                                    fontWeight: 800,
                                    letterSpacing: "-0.03em",
                                    lineHeight: 1.15,
                                    color: "rgba(255,255,255,0.95)",
                                    marginBottom: 20,
                                }}
                            >
                                Tu producto es sólido.
                                <br />
                                <span style={{ color: "rgba(200,210,225,0.8)", fontWeight: 400 }}>
                                    Pero la forma en que lo muestras al mundo no le hace justicia.
                                </span>
                            </h3>
                            <p style={{ color: "rgba(200,210,225,0.8)", lineHeight: 1.75, fontSize: 14, maxWidth: 400 }}>
                                Un video sin dirección no solo no ayuda: puede hacer que tu marca se vea más pequeña de lo que es.
                            </p>
                        </Reveal>
                    </div>

                    {/* RIGHT — Solution */}
                    <div className="md:pl-16 lg:pl-24">
                        <Reveal delay={2}>
                            {/* Gold accent bar */}
                            <div
                                className="mb-8"
                                style={{
                                    width: 36,
                                    height: 2,
                                    background: `linear-gradient(to right, ${GOLD}, ${GOLD}40)`,
                                    borderRadius: 1,
                                }}
                            />
                            <h3
                                style={{
                                    fontSize: "clamp(1.6rem, 3.5vw, 2.3rem)",
                                    fontWeight: 800,
                                    letterSpacing: "-0.03em",
                                    lineHeight: 1.15,
                                    color: "rgba(255,255,255,0.95)",
                                    marginBottom: 20,
                                }}
                            >
                                Estrategia +
                                <br />
                                Cinematografía.
                                <br />
                                <span
                                    style={{
                                        background: `linear-gradient(135deg, ${GOLD}, #f97316)`,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        fontWeight: 700,
                                    }}
                                >
                                    No uno sin el otro.
                                </span>
                            </h3>
                            <p style={{ color: "rgba(200,210,225,0.8)", lineHeight: 1.75, fontSize: 14, maxWidth: 400 }}>
                                Finem pone la dirección estratégica. Mike4Visual, el ojo cinematográfico.{" "}
                                <span style={{ color: "rgba(255,255,255,0.7)" }}>
                                    Juntos: contenido con propósito y acabado impecable.
                                </span>
                            </p>
                        </Reveal>
                    </div>
                </div>

                {/* ── BTS Video ── */}
                <Reveal delay={3}>
                    <BtsVideo />
                </Reveal>
            </div>
        </section>
    );
};

/* ============================================================
   BLOQUE 03 — REEL
   ============================================================ */
const ReelBlock = () => {
    const [hovering, setHovering] = useState(false);
    const [playing, setPlaying] = useState(false);
    const containerRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

    const handleMouseMove = useCallback((e) => {
        if (!containerRef.current || isTouchDevice) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
        });
    }, []);

    return (
        <section
            className="relative overflow-hidden"
            style={{ background: DARK_BG, padding: "clamp(64px, 10vh, 120px) 0" }}
        >
            {/* ── Ambient lights ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute" style={{ width: "50vw", height: "50vh", top: "-15%", right: "-10%", background: "radial-gradient(ellipse, rgba(124,58,237,0.05) 0%, transparent 65%)", filter: "blur(60px)", animation: "m4v-blob-reverse 20s ease-in-out infinite" }} />
                <div className="absolute" style={{ width: "40vw", height: "40vh", bottom: "-10%", left: "-5%", background: "radial-gradient(ellipse, rgba(249,115,22,0.04) 0%, transparent 65%)", filter: "blur(60px)", animation: "m4v-blob-float 24s ease-in-out infinite" }} />
            </div>

            <div
                className="relative z-10"
                style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}
            >
                {/* ── Section label ── */}
                <Reveal>
                    <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
                        <div style={{ width: 32, height: 1, background: "linear-gradient(to left, rgba(249,115,22,0.3), transparent)" }} />
                        <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(249,115,22,0.45)" }}>
                            Showreel
                        </span>
                        <div style={{ width: 32, height: 1, background: "linear-gradient(to right, rgba(249,115,22,0.3), transparent)" }} />
                    </div>
                </Reveal>

                {/* ── Video container ── */}
                <Reveal>
                    <div
                        ref={containerRef}
                        className="relative overflow-hidden cursor-pointer group"
                        style={{
                            borderRadius: 16,
                            aspectRatio: "16/9",
                            background: "linear-gradient(135deg, #080812, #0e0e1e)",
                            border: "1px solid rgba(255,255,255,0.04)",
                            boxShadow: hovering
                                ? "0 40px 80px -20px rgba(0,0,0,0.6), 0 0 60px rgba(200,169,110,0.04)"
                                : "0 20px 60px -20px rgba(0,0,0,0.4)",
                            transform: hovering ? "scale(1.005)" : "scale(1)",
                            transition: "all 0.7s cubic-bezier(0.25,0.4,0.25,1)",
                        }}
                        onMouseEnter={() => setHovering(true)}
                        onMouseLeave={() => setHovering(false)}
                        onMouseMove={handleMouseMove}
                    >
                        {/* YouTube Video — always loaded, overlay blocks interaction until play */}
                        <iframe
                            width="100%"
                            height="100%"
                            src={"https://player.vimeo.com/video/1162665807?badge=0&autopause=0" + (playing ? "&autoplay=1" : "")}
                            title="Demo Reel MIke4V"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            style={{ position: "absolute", inset: 0, borderRadius: 16, zIndex: 1 }}
                        />

                        {/* Interaction overlay — blocks iframe until user clicks play */}
                        {!playing && (
                            <>
                                {/* Spotlight that follows mouse */}
                                {!isTouchDevice && (
                                    <div
                                        className="absolute pointer-events-none transition-opacity duration-500"
                                        style={{
                                            width: "60%",
                                            height: "60%",
                                            borderRadius: "50%",
                                            background: "radial-gradient(circle, rgba(200,169,110,0.06) 0%, rgba(124,58,237,0.02) 40%, transparent 70%)",
                                            left: `${mousePos.x * 100}%`,
                                            top: `${mousePos.y * 100}%`,
                                            transform: "translate(-50%, -50%)",
                                            opacity: hovering ? 1 : 0,
                                            transition: "left 1.2s cubic-bezier(0.25,0.4,0.25,1), top 1.2s cubic-bezier(0.25,0.4,0.25,1), opacity 0.5s",
                                            zIndex: 12,
                                        }}
                                    />
                                )}

                                <div
                                    className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
                                    onClick={() => setPlaying(true)}
                                    style={{ background: "rgba(0,0,0,0.45)" }}
                                >
                                    {/* Frame corners */}
                                    {[
                                        "top-4 left-4 md:top-6 md:left-6 border-l border-t",
                                        "top-4 right-4 md:top-6 md:right-6 border-r border-t",
                                        "bottom-4 left-4 md:bottom-6 md:left-6 border-l border-b",
                                        "bottom-4 right-4 md:bottom-6 md:right-6 border-r border-b",
                                    ].map((cls, i) => (
                                        <div
                                            key={i}
                                            className={`absolute w-4 h-4 md:w-6 md:h-6 ${cls} pointer-events-none transition-all duration-700`}
                                            style={{
                                                borderColor: hovering ? "rgba(200,169,110,0.15)" : "rgba(255,255,255,0.05)",
                                            }}
                                        />
                                    ))}

                                    {/* Top cinematic bar */}
                                    <div className="absolute top-0 left-0 right-0 h-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)" }} />
                                    <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)" }} />

                                    {/* Center play button */}
                                    <div className="relative flex items-center justify-center">
                                        {/* Outer ring — pulses */}
                                        <div
                                            className="absolute w-24 h-24 md:w-28 md:h-28 rounded-full"
                                            style={{
                                                border: `1px solid ${GOLD}18`,
                                                animation: "m4v-pulse-glow 3s ease infinite",
                                            }}
                                        />
                                        {/* Second ring */}
                                        <div
                                            className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full"
                                            style={{
                                                border: `1px solid ${GOLD}10`,
                                                animation: "m4v-pulse-glow 3s ease infinite 0.5s",
                                            }}
                                        />
                                        {/* Button */}
                                        <div
                                            className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-600 group-hover:scale-110"
                                            style={{
                                                background: "rgba(200,169,110,0.08)",
                                                border: `1px solid ${GOLD}25`,
                                                backdropFilter: "blur(12px)",
                                                WebkitBackdropFilter: "blur(12px)",
                                                boxShadow: hovering ? `0 0 40px rgba(200,169,110,0.1)` : "none",
                                                transition: "all 0.6s cubic-bezier(0.25,0.4,0.25,1)",
                                            }}
                                        >
                                            <Play
                                                className="w-6 h-6 md:w-7 md:h-7 ml-0.5"
                                                style={{ color: GOLD, opacity: 0.8 }}
                                                fill={GOLD + "15"}
                                            />
                                        </div>
                                    </div>

                                    {/* Bottom border glow on hover */}
                                    <div
                                        className="absolute bottom-0 left-[5%] right-[5%] h-px pointer-events-none transition-opacity duration-700"
                                        style={{
                                            background: `linear-gradient(90deg, transparent, ${GOLD}20, rgba(249,115,22,0.12), ${GOLD}20, transparent)`,
                                            opacity: hovering ? 1 : 0,
                                        }}
                                    />

                                    {/* REC indicator */}
                                    <div
                                        className="absolute top-5 right-5 md:top-7 md:right-7 flex items-center gap-2 pointer-events-none transition-opacity duration-500"
                                        style={{ opacity: hovering ? 1 : 0.4 }}
                                    >
                                        <div
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{
                                                background: "#ef4444",
                                                boxShadow: "0 0 4px rgba(239,68,68,0.4)",
                                                animation: "m4v-pulse-glow 2s ease infinite",
                                            }}
                                        />
                                        <span style={{ fontSize: 8, letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", fontWeight: 600 }}>
                                            REC
                                        </span>
                                    </div>

                                    {/* Timecode */}
                                    <div
                                        className="absolute bottom-5 left-5 md:bottom-7 md:left-7 pointer-events-none transition-opacity duration-500"
                                        style={{ opacity: hovering ? 1 : 0.3 }}
                                    >
                                        <span style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)" }}>
                                            00:00:00:00
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </Reveal>

                {/* ── Caption ── */}
                <Reveal delay={1}>
                    <p
                        className="text-center"
                        style={{
                            marginTop: 28,
                            fontSize: 14,
                            color: "rgba(200,210,225,0.75)",
                            fontStyle: "italic",
                            fontWeight: 300,
                            letterSpacing: "0.01em",
                        }}
                    >
                        Así se ve cuando estrategia y producción van de la mano.{" "}
                        <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>
                            Clientes reales. Proyectos reales.
                        </span>
                    </p>
                </Reveal>
            </div>
        </section>
    );
};

/* ============================================================
   BLOQUE 04 — SERVICIO
   ============================================================ */
const ServiceCardDark = ({ icon: Icon, title, desc, num, index }) => {
    const cardRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);

    const handleMouseMove = useCallback((e) => {
        if (!cardRef.current || isTouchDevice) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }, []);

    return (
        <Reveal delay={index + 1}>
            <div
                ref={cardRef}
                className="group relative overflow-hidden transition-all duration-600"
                style={{
                    borderRadius: 14,
                    padding: "clamp(24px, 3vw, 40px)",
                    background: "rgba(255,255,255,0.015)",
                    border: hovering ? "1px solid rgba(200,169,110,0.1)" : "1px solid rgba(255,255,255,0.04)",
                    cursor: "default",
                    transform: hovering ? "translateY(-3px)" : "none",
                    boxShadow: hovering ? "0 20px 50px -15px rgba(0,0,0,0.3), 0 0 40px rgba(200,169,110,0.03)" : "none",
                    transition: "all 0.6s cubic-bezier(0.25,0.4,0.25,1)",
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
            >
                {/* Top-edge glow line (Enhancement 5) */}
                <div className="m4v-edge-glow" style={{ borderRadius: '14px 14px 0 0' }} />

                {/* Spotlight */}
                {!isTouchDevice && (
                    <div
                        className="absolute pointer-events-none transition-opacity duration-500"
                        style={{
                            width: 280,
                            height: 280,
                            borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(200,169,110,0.05) 0%, rgba(249,115,22,0.02) 40%, transparent 70%)",
                            left: mousePos.x - 140,
                            top: mousePos.y - 140,
                            opacity: hovering ? 1 : 0,
                        }}
                    />
                )}

                {/* Number + Icon row */}
                <div className="relative z-10 flex items-center justify-between mb-6 md:mb-8">
                    <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500"
                        style={{
                            background: hovering ? "rgba(200,169,110,0.08)" : "rgba(255,255,255,0.03)",
                            border: hovering ? "1px solid rgba(200,169,110,0.12)" : "1px solid rgba(255,255,255,0.04)",
                        }}
                    >
                        <Icon className="w-4.5 h-4.5" style={{ color: hovering ? GOLD : "rgba(255,255,255,0.3)", transition: "color 0.5s", width: 18, height: 18 }} strokeWidth={1.5} />
                    </div>
                    <span
                        style={{
                            fontSize: 13,
                            fontWeight: 700,
                            fontFamily: "monospace",
                            color: hovering ? "rgba(200,169,110,0.5)" : "rgba(255,255,255,0.3)",
                            transition: "color 0.5s",
                            letterSpacing: "0.05em",
                        }}
                    >
                        {num}
                    </span>
                </div>

                {/* Title */}
                <h4
                    className="relative z-10"
                    style={{
                        fontSize: "clamp(16px, 4.5vw, 17px)",
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.9)",
                        marginBottom: 10,
                        letterSpacing: "-0.01em",
                    }}
                >
                    {title}
                </h4>

                {/* Description */}
                <p
                    className="relative z-10"
                    style={{
                        fontSize: "clamp(13px, 3.5vw, 14px)",
                        color: "rgba(200,210,225,0.85)",
                        lineHeight: 1.75,
                    }}
                >
                    {desc}
                </p>

                {/* Bottom accent line */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-600"
                    style={{
                        opacity: hovering ? 1 : 0,
                        background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.15), rgba(249,115,22,0.08), transparent)",
                    }}
                />
            </div>
        </Reveal>
    );
};

const ServiceBlock = () => {
    const parallax = useParallax(0.04);

    const services = [
        { icon: Target, title: "Dirección Estratégica", desc: "Antes de encender una cámara, definimos qué debe comunicar la pieza, a quién va dirigida y cómo se integra con tu marca.", num: "01" },
        { icon: Clapperboard, title: "Producción Cinematográfica", desc: "Rodaje profesional con equipo de cine. Iluminación, sonido, dirección de arte. Producción real, no un celular con ring light.", num: "02" },
        { icon: Palette, title: "Postproducción Completa", desc: "Edición, color grading, diseño sonoro. Entrega en los formatos que necesites: redes, web, pantallas.", num: "03" },
        { icon: BarChart3, title: "Activación Estratégica", desc: "Te decimos dónde usar cada pieza y cuándo publicarla. El video no termina en la entrega; termina cuando genera resultados.", num: "04" },
    ];

    const comparison = [
        ["Produces sin contexto de marca", "Cada pieza responde a un objetivo de negocio"],
        ["Tú defines el brief (y quizá no es el correcto)", "Diagnosticamos qué necesitas antes de grabar"],
        ["Recibes un archivo y ya", "Recibes la pieza + plan de uso + estrategia"],
        ["Si no funciona, no sabes por qué", "Medimos, ajustamos, optimizamos"],
    ];

    return (
        <section
            className="relative overflow-hidden"
            style={{ background: DARK_BG, padding: "clamp(80px, 12vh, 140px) 0" }}
        >
            {/* ── Ambient lights ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute" style={{ width: "50vw", height: "50vh", top: "-10%", right: "-5%", background: "radial-gradient(ellipse, rgba(249,115,22,0.18) 0%, transparent 65%)", filter: "blur(80px)", animation: "m4v-blob-float 20s ease-in-out infinite" }} />
                <div className="absolute" style={{ width: "45vw", height: "45vh", bottom: "10%", left: "-8%", background: "radial-gradient(ellipse, rgba(124,58,237,0.14) 0%, transparent 65%)", filter: "blur(70px)", animation: "m4v-blob-reverse 24s ease-in-out infinite" }} />
                <div className="absolute" style={{ width: "40vw", height: "35vh", top: "50%", left: "40%", background: "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 65%)", filter: "blur(70px)", animation: "m4v-blob-float 28s ease-in-out infinite reverse" }} />
            </div>

            <div className="relative z-10" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>

                {/* ── Header ── */}
                <Reveal>
                    <div ref={parallax.ref} style={parallax.style}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="m4v-shimmer-line" style={{ width: 24, height: 1 }} />
                            <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(249,115,22,0.5)" }}>Servicio</span>
                        </div>
                        <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "rgba(255,255,255,0.95)", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 56, maxWidth: 560 }}>
                            No te entregamos un archivo.{" "}
                            <span style={{ background: "linear-gradient(135deg, " + GOLD + ", #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                Te entregamos un sistema visual.
                            </span>
                        </h2>
                    </div>
                </Reveal>

                {/* ── Service cards — 2×2 ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-24 md:mb-32">
                    {services.map((s, i) => (
                        <ServiceCardDark key={s.title} icon={s.icon} title={s.title} desc={s.desc} num={s.num} index={i} />
                    ))}
                </div>

                {/* ── Comparison ── */}
                <Reveal>
                    <div className="flex items-center gap-3 mb-6">
                        <div style={{ width: 24, height: 1, background: "linear-gradient(to right, rgba(255,255,255,0.15), transparent)" }} />
                        <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>Comparativa</span>
                    </div>
                    <h3 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: 28, letterSpacing: "-0.02em" }}>
                        Y esto es lo que nos diferencia:
                    </h3>
                </Reveal>

                <Reveal delay={1}>
                    <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.04)" }}>
                        {/* Header row */}
                        <div className="grid grid-cols-2" style={{ background: "rgba(255,255,255,0.03)" }}>
                            <div className="p-3 md:p-5" style={{ fontSize: "clamp(8px, 2.2vw, 9px)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(148,163,184,0.8)" }}>Video por separado</div>
                            <div className="p-3 md:p-5 flex items-center gap-2" style={{ fontSize: "clamp(8px, 2.2vw, 9px)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                                <span style={{ background: "linear-gradient(135deg, " + GOLD + ", #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Finem × Mike4Visual</span>
                            </div>
                        </div>
                        {/* Rows */}
                        {comparison.map(([left, right], i) => (
                            <div
                                key={i}
                                className="grid grid-cols-2 group transition-colors duration-300"
                                style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent", borderTop: "1px solid rgba(255,255,255,0.03)" }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(200,169,110,0.03)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent"; }}
                            >
                                <div className="p-3 md:p-5 flex items-start gap-2" style={{ fontSize: "clamp(12px, 3.2vw, 13px)", color: "rgba(200,210,225,0.8)", lineHeight: 1.65 }}>
                                    <X className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "rgba(239,68,68,0.75)" }} />
                                    {left}
                                </div>
                                <div className="p-3 md:p-5 flex items-start gap-2" style={{ fontSize: "clamp(12px, 3.2vw, 13px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.65, fontWeight: 500 }}>
                                    <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: GOLD }} />
                                    {right}
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

/* ============================================================
   BLOQUE 05 — PROCESO
   ============================================================ */
const ProcessBlock = () => {
    const [activeStep, setActiveStep] = useState(null);
    const parallax = useParallax(0.04);

    const steps = [
        { num: "01", title: "Diagnóstico", desc: "Analizamos tu marca, tu mercado y tus objetivos antes de proponer nada.", detail: "Auditoría de marca · Análisis competitivo · Objetivos claros" },
        { num: "02", title: "Dirección Creativa", desc: "Definimos concepto, tono y mensajes. Tú apruebas la dirección antes de grabar.", detail: "Moodboard · Guión · Storyboard · Aprobación" },
        { num: "03", title: "Producción", desc: "Día de rodaje con equipo profesional. Cada detalle cuidado.", detail: "Equipo de cine · Iluminación · Sonido · Dirección de arte" },
        { num: "04", title: "Entrega + Activación", desc: "Postproducción completa + plan de uso para que cada video genere impacto real.", detail: "Edición · Color grading · Plan de distribución · Métricas", badge: true },
    ];

    return (
        <section
            className="relative overflow-hidden"
            style={{ background: DARK_BG, padding: "clamp(80px, 12vh, 140px) 0" }}
        >
            {/* ── Ambient lights ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute" style={{ width: "55vw", height: "55vh", top: "-10%", right: "-12%", background: "radial-gradient(ellipse, rgba(200,169,110,0.18) 0%, transparent 65%)", filter: "blur(80px)", animation: "m4v-blob-float 20s ease-in-out infinite" }} />
                <div className="absolute" style={{ width: "45vw", height: "45vh", bottom: "-5%", left: "-8%", background: "radial-gradient(ellipse, rgba(249,115,22,0.14) 0%, transparent 65%)", filter: "blur(70px)", animation: "m4v-blob-reverse 26s ease-in-out infinite" }} />
                <div className="absolute" style={{ width: "40vw", height: "35vh", top: "40%", left: "30%", background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 65%)", filter: "blur(70px)", animation: "m4v-blob-float 30s ease-in-out infinite reverse" }} />
            </div>

            {/* Grain */}
            {!isTouchDevice && (
                <div className="absolute inset-0 m4v-grain pointer-events-none mix-blend-overlay hidden md:block" style={{ opacity: 0.03 }} />
            )}

            <div className="relative z-10" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>

                {/* ── Header ── */}
                <Reveal>
                    <div ref={parallax.ref} style={parallax.style}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="m4v-shimmer-line" style={{ width: 24, height: 1 }} />
                            <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(249,115,22,0.5)" }}>Proceso</span>
                        </div>
                        <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "rgba(255,255,255,0.95)", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "clamp(36px, 5vh, 64px)", maxWidth: 520 }}>
                            Del diagnóstico al resultado.{" "}
                            <span style={{ color: "rgba(148,163,184,0.8)", fontWeight: 400 }}>Sin sorpresas.</span>
                        </h2>
                    </div>
                </Reveal>

                {/* ── Timeline — horizontal on desktop, vertical on mobile ── */}

                {/* Desktop connecting line */}
                <div className="hidden md:block relative mb-12">
                    <div className="absolute top-6 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04) 10%, rgba(255,255,255,0.04) 90%, transparent)" }} />
                    {/* Animated progress glow */}
                    <div className="absolute top-6 left-0 h-px" style={{ width: "100%", background: "linear-gradient(90deg, transparent 2%, rgba(249,115,22,0.12) 15%, " + GOLD + "15 50%, rgba(124,58,237,0.1) 85%, transparent 98%)" }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-6 relative">
                    {steps.map((step, i) => {
                        const isActive = activeStep === i;
                        const isLast = step.badge;
                        return (
                            <Reveal key={step.num} delay={i + 1}>
                                <div
                                    className="relative group cursor-default"
                                    style={{ padding: "0 0 clamp(28px, 4vh, 40px) 0" }}
                                    onMouseEnter={() => setActiveStep(i)}
                                    onMouseLeave={() => setActiveStep(null)}
                                >
                                    {/* Mobile vertical line */}
                                    {i < steps.length - 1 && (
                                        <div
                                            className="md:hidden absolute left-6 top-12 bottom-0 w-px"
                                            style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.04), transparent)" }}
                                        />
                                    )}

                                    {/* Number node */}
                                    <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-0">
                                        <div
                                            className="relative z-10 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-600"
                                            style={{
                                                background: isActive
                                                    ? (isLast ? "rgba(200,169,110,0.12)" : "rgba(255,255,255,0.05)")
                                                    : (isLast ? "rgba(200,169,110,0.06)" : "rgba(255,255,255,0.02)"),
                                                border: isActive
                                                    ? (isLast ? "1px solid " + GOLD + "40" : "1px solid rgba(255,255,255,0.1)")
                                                    : (isLast ? "1px solid " + GOLD + "20" : "1px solid rgba(255,255,255,0.04)"),
                                                boxShadow: isActive
                                                    ? (isLast ? "0 0 30px rgba(200,169,110,0.1)" : "0 0 20px rgba(255,255,255,0.03)")
                                                    : "none",
                                                transition: "all 0.6s cubic-bezier(0.25,0.4,0.25,1)",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 800,
                                                    fontFamily: "monospace",
                                                    color: isActive ? (isLast ? GOLD : "rgba(255,255,255,0.85)") : (isLast ? GOLD + "80" : "rgba(255,255,255,0.5)"),
                                                    transition: "color 0.5s",
                                                    letterSpacing: "-0.02em",
                                                }}
                                            >
                                                {step.num}
                                            </span>
                                            {/* Active ring */}
                                            {isActive && (
                                                <div
                                                    className="absolute inset-0 rounded-full"
                                                    style={{
                                                        border: isLast ? "1px solid " + GOLD + "15" : "1px solid rgba(255,255,255,0.03)",
                                                        animation: "m4v-pulse-glow 2.5s ease infinite",
                                                    }}
                                                />
                                            )}
                                        </div>

                                        {/* Mobile title inline */}
                                        <div className="md:hidden">
                                            <h4 style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.01em" }}>{step.title}</h4>
                                        </div>
                                    </div>

                                    {/* Content — desktop */}
                                    <div className="md:mt-7 mt-3 md:pl-0 pl-16">
                                        {/* Badge */}
                                        {isLast && (
                                            <div
                                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3"
                                                style={{
                                                    background: "rgba(200,169,110,0.06)",
                                                    border: "1px solid " + GOLD + "15",
                                                }}
                                            >
                                                <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", background: "linear-gradient(135deg, " + GOLD + ", #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                                    Exclusivo Finem
                                                </span>
                                            </div>
                                        )}

                                        {/* Desktop title */}
                                        <h4
                                            className="hidden md:block"
                                            style={{
                                                fontSize: 17,
                                                fontWeight: 700,
                                                color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)",
                                                marginBottom: 8,
                                                letterSpacing: "-0.01em",
                                                transition: "color 0.5s",
                                            }}
                                        >
                                            {step.title}
                                        </h4>

                                        {/* Description */}
                                        <p
                                            style={{
                                                fontSize: "clamp(13px, 3.5vw, 14px)",
                                                color: isActive ? "rgba(200,210,225,0.85)" : "rgba(200,210,225,0.7)",
                                                lineHeight: 1.75,
                                                transition: "color 0.5s",
                                                maxWidth: 320,
                                            }}
                                        >
                                            {step.desc}
                                        </p>

                                        {/* Detail tags — appear on hover */}
                                        <div
                                            style={{
                                                marginTop: 14,
                                                overflow: "hidden",
                                                maxHeight: isActive ? 40 : 0,
                                                opacity: isActive ? 1 : 0,
                                                transition: "all 0.5s cubic-bezier(0.25,0.4,0.25,1)",
                                            }}
                                        >
                                            <p style={{ fontSize: 10, letterSpacing: "0.05em", color: isLast ? GOLD + "70" : "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                                                {step.detail}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hover glow underneath card area */}
                                    <div
                                        className="absolute inset-0 -inset-x-2 rounded-xl pointer-events-none transition-opacity duration-600"
                                        style={{
                                            opacity: isActive ? 1 : 0,
                                            background: isLast
                                                ? "radial-gradient(ellipse at 50% 30%, rgba(200,169,110,0.03) 0%, transparent 70%)"
                                                : "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.015) 0%, transparent 70%)",
                                        }}
                                    />
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

/* ============================================================
   BLOQUE 06 — PREGUNTAS (FAQ)
   ============================================================ */
const FAQBlock = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        { q: "¿Cuánto cuesta?", a: "Cada proyecto es distinto. Lo que sí podemos decirte: esto no es un gasto, es una inversión con retorno medible. Platícanos tu proyecto y te damos una propuesta clara." },
        { q: "¿Ya tengo videógrafo, por qué cambiar?", a: "Si tus videos están moviendo la aguja de tu negocio, no cambies. Pero si sientes que falta algo, probablemente es la pieza estratégica. Eso es lo que nosotros sumamos." },
        { q: "¿Qué pasa si no sé qué tipo de video necesito?", a: "Para eso está el diagnóstico inicial: entender tu situación y proponerte lo que realmente te sirve. No lo que nosotros queramos venderte." },
    ];

    return (
        <section
            className="relative overflow-hidden"
            style={{ background: DARK_BG, padding: "clamp(80px, 12vh, 140px) 0" }}
        >
            {/* ── Ambient lights ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute" style={{ width: "50vw", height: "50vh", top: "10%", left: "-8%", background: "radial-gradient(ellipse, rgba(124,58,237,0.16) 0%, transparent 65%)", filter: "blur(70px)", animation: "m4v-blob-float 22s ease-in-out infinite" }} />
                <div className="absolute" style={{ width: "45vw", height: "45vh", bottom: "-5%", right: "-5%", background: "radial-gradient(ellipse, rgba(249,115,22,0.16) 0%, transparent 65%)", filter: "blur(70px)", animation: "m4v-blob-reverse 26s ease-in-out infinite" }} />
                {/* Extra golden glow for FAQ */}
                <div className="absolute" style={{ width: "60vw", height: "40vh", top: "20%", left: "20%", background: "radial-gradient(ellipse, rgba(200,169,110,0.1) 0%, transparent 60%)", filter: "blur(80px)" }} />
            </div>

            <div className="relative z-10" style={{ maxWidth: 720, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>

                {/* ── Header — centered ── */}
                <Reveal>
                    <div className="text-center mb-14 md:mb-16">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div style={{ width: 24, height: 1, background: "linear-gradient(to left, rgba(249,115,22,0.3), transparent)" }} />
                            <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(249,115,22,0.8)" }}>FAQ</span>
                            <div style={{ width: 24, height: 1, background: "linear-gradient(to right, rgba(249,115,22,0.3), transparent)" }} />
                        </div>
                        <h2 style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)", fontWeight: 800, color: "rgba(255,255,255,0.95)", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                            Lo que probablemente{" "}
                            <span style={{ background: "linear-gradient(135deg, " + GOLD + ", #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                estás pensando.
                            </span>
                        </h2>
                    </div>
                </Reveal>

                {/* ── Accordion ── */}
                <div className="flex flex-col gap-3">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <Reveal key={i} delay={i + 1}>
                                <div
                                    className="relative"
                                    style={{
                                        borderRadius: 14,
                                        background: isOpen ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.015)",
                                        border: isOpen ? "1px solid rgba(200,169,110,0.1)" : "1px solid rgba(255,255,255,0.04)",
                                        overflow: "hidden",
                                        transition: "all 0.5s cubic-bezier(0.25,0.4,0.25,1)",
                                        boxShadow: isOpen ? "0 8px 30px -10px rgba(200,169,110,0.06)" : "none",
                                    }}
                                >
                                    {/* Top-edge glow (Enhancement 5) */}
                                    <div className="m4v-edge-glow" style={{ borderRadius: '14px 14px 0 0' }} />
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : i)}
                                        className="w-full flex items-center justify-between text-left group"
                                        style={{
                                            cursor: "pointer",
                                            background: "none",
                                            border: "none",
                                            outline: "none",
                                            padding: "clamp(16px, 2.5vw, 24px) clamp(16px, 3vw, 28px)",
                                        }}
                                    >
                                        {/* Number + Question */}
                                        <div className="flex items-center gap-4 pr-4">
                                            <span
                                                style={{
                                                    fontSize: "clamp(12px, 3vw, 13px)",
                                                    fontWeight: 700,
                                                    fontFamily: "monospace",
                                                    color: isOpen ? GOLD + "80" : "rgba(255,255,255,0.45)",
                                                    transition: "color 0.5s",
                                                    letterSpacing: "-0.02em",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: "clamp(14px, 4vw, 16px)",
                                                    fontWeight: 600,
                                                    color: isOpen ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.9)",
                                                    letterSpacing: "-0.01em",
                                                    transition: "color 0.4s",
                                                }}
                                            >
                                                {faq.q}
                                            </span>
                                        </div>

                                        {/* Chevron with rotation */}
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500"
                                            style={{
                                                background: isOpen ? "rgba(200,169,110,0.08)" : "rgba(255,255,255,0.02)",
                                                border: isOpen ? "1px solid " + GOLD + "15" : "1px solid rgba(255,255,255,0.04)",
                                            }}
                                        >
                                            <ChevronDown
                                                className="w-4 h-4 transition-transform duration-500"
                                                style={{
                                                    color: isOpen ? GOLD : "rgba(255,255,255,0.2)",
                                                    transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                                                }}
                                            />
                                        </div>
                                    </button>

                                    {/* Answer body */}
                                    <div className={`m4v-faq-content ${isOpen ? "open" : ""}`}>
                                        <div style={{ padding: "0 clamp(20px, 3vw, 28px) clamp(18px, 2.5vw, 24px)", paddingLeft: "clamp(52px, 6vw, 72px)" }}>
                                            <p style={{ fontSize: 13, color: "rgba(200,210,225,0.85)", lineHeight: 1.8 }}>
                                                {faq.a}
                                            </p>
                                            {/* Subtle gold line at bottom of answer */}
                                            <div
                                                style={{
                                                    marginTop: 16,
                                                    width: 32,
                                                    height: 1,
                                                    background: "linear-gradient(to right, " + GOLD + "20, transparent)",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>

                {/* ── Bottom CTA nudge ── */}
                <Reveal delay={4}>
                    <div className="text-center mt-14 md:mt-16">
                        <p style={{ fontSize: 13, color: "rgba(200,210,225,0.7)", fontWeight: 300 }}>
                            ¿Tienes otra pregunta?{" "}
                            <span
                                style={{
                                    color: GOLD + "80",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    borderBottom: "1px solid " + GOLD + "20",
                                    paddingBottom: 1,
                                    transition: "all 0.3s",
                                }}
                                onMouseEnter={(e) => { e.target.style.color = GOLD; e.target.style.borderColor = GOLD + "50"; }}
                                onMouseLeave={(e) => { e.target.style.color = GOLD + "80"; e.target.style.borderColor = GOLD + "20"; }}
                            >
                                Hablemos directamente.
                            </span>
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

/* ============================================================
   BLOQUE 07 — CIERRE (CTA + FORMULARIO)
   ============================================================ */
const ClosingBlock = () => {
    const [formData, setFormData] = useState({ nombre: "", empresa: "", contacto: "", necesidad: "" });
    const [submitted, setSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const sectionRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

    useEffect(() => {
        if (isTouchDevice) return;
        const handle = (e) => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
        };
        window.addEventListener("mousemove", handle, { passive: true });
        return () => window.removeEventListener("mousemove", handle);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.nombre && formData.contacto) setSubmitted(true);
    };

    const inputStyle = (key) => ({
        width: "100%",
        padding: "14px 0",
        background: "transparent",
        border: "none",
        borderBottom: focusedField === key ? "1px solid " + GOLD + "60" : "1px solid rgba(255,255,255,0.06)",
        color: "rgba(255,255,255,0.9)",
        fontSize: 14,
        outline: "none",
        fontFamily: "inherit",
        transition: "border-color 0.4s",
    });

    const fields = [
        { key: "nombre", label: "Nombre", type: "text", placeholder: "Tu nombre" },
        { key: "empresa", label: "Empresa", type: "text", placeholder: "Nombre de tu empresa" },
        { key: "contacto", label: "Teléfono o Email", type: "text", placeholder: "¿Cómo prefieres que te contactemos?" },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden"
            style={{ background: DARK_BG, padding: "clamp(64px, 14vh, 160px) 0 0" }}
        >
            {/* ── Ambient lights ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute" style={{ width: "55vw", height: "55vh", top: "-10%", left: "20%", background: "radial-gradient(ellipse, rgba(200,169,110,0.18) 0%, transparent 60%)", filter: "blur(80px)", animation: "m4v-blob-float 20s ease-in-out infinite" }} />
                <div className="absolute" style={{ width: "45vw", height: "45vh", bottom: "10%", left: "-10%", background: "radial-gradient(ellipse, rgba(249,115,22,0.14) 0%, transparent 65%)", filter: "blur(70px)", animation: "m4v-blob-reverse 24s ease-in-out infinite" }} />
                <div className="absolute" style={{ width: "40vw", height: "40vh", top: "40%", right: "-5%", background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 65%)", filter: "blur(70px)", animation: "m4v-blob-float 28s ease-in-out infinite reverse" }} />

                {/* Mouse reactive */}
                {!isTouchDevice && (
                    <div className="absolute transition-all duration-[2000ms]" style={{ width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,169,110,0.03) 0%, transparent 65%)", left: (mousePos.x * 100) + "%", top: (mousePos.y * 100) + "%", transform: "translate(-50%, -50%)" }} />
                )}

                {/* Decorative arcs */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" style={{ opacity: 0.02 }} viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
                    <circle cx="960" cy="1200" r="800" fill="none" stroke="white" strokeWidth="1" />
                    <circle cx="960" cy="1200" r="600" fill="none" stroke="white" strokeWidth="0.5" />
                </svg>
            </div>

            {/* Grain */}
            {!isTouchDevice && <div className="absolute inset-0 m4v-grain pointer-events-none mix-blend-overlay hidden md:block" style={{ opacity: 0.03 }} />}

            <div className="relative z-10" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-start">

                    {/* ── LEFT — Copy ── */}
                    <div className="lg:sticky lg:top-32">
                        <Reveal>
                            <CollabLogo className="mb-8 md:mb-12" />
                        </Reveal>

                        <Reveal delay={1}>
                            <h2 style={{ fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)", fontWeight: 900, color: "rgba(255,255,255,0.95)", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 20 }}>
                                Deja de improvisar{" "}
                                <span style={{ background: "linear-gradient(135deg, " + GOLD + ", #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                    con tu imagen.
                                </span>
                            </h2>
                        </Reveal>

                        <Reveal delay={2}>
                            <p style={{ fontSize: "clamp(14px, 3.8vw, 15px)", color: "rgba(200,210,225,0.85)", lineHeight: 1.75, fontWeight: 300, marginBottom: "clamp(24px, 4vh, 36px)", maxWidth: 420 }}>
                                Tu negocio ya tiene la sustancia. Déjanos darle la imagen que le corresponde.
                            </p>
                        </Reveal>

                        <Reveal delay={3}>
                            <button
                                className="group flex items-center gap-3"
                                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                                onMouseEnter={(e) => e.currentTarget.querySelector("span").style.color = GOLD}
                                onMouseLeave={(e) => e.currentTarget.querySelector("span").style.color = "rgba(255,255,255,0.5)"}
                            >
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-105"
                                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                                >
                                    <MessageCircle className="w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} />
                                </div>
                                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", transition: "color 0.4s" }}>
                                    WhatsApp directo
                                </span>
                            </button>
                            <p style={{ marginTop: 14, fontSize: 11, color: "rgba(200,210,225,0.65)", fontWeight: 400 }}>
                                Respondemos en menos de 24 horas hábiles
                            </p>
                        </Reveal>
                    </div>

                    {/* ── RIGHT — Form ── */}
                    <Reveal delay={2}>
                        <div
                            className="relative overflow-hidden"
                            style={{
                                borderRadius: 20,
                                background: "rgba(255,255,255,0.02)",
                                border: "1px solid rgba(255,255,255,0.04)",
                                padding: "clamp(28px, 4vw, 44px)",
                            }}
                        >
                            {/* Form glow */}
                            <div className="absolute -top-20 -right-20 w-60 h-60 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(200,169,110,0.04) 0%, transparent 70%)", filter: "blur(40px)" }} />

                            {!submitted ? (
                                <>
                                    <div className="relative z-10 mb-8">
                                        <h3 style={{ fontSize: 17, fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: 6, letterSpacing: "-0.01em" }}>
                                            Solicitar propuesta
                                        </h3>
                                        <p style={{ fontSize: 12, color: "rgba(200,210,225,0.8)", lineHeight: 1.6 }}>
                                            Sin compromiso. Nos cuentas tu proyecto y te decimos honestamente si podemos ayudarte.
                                        </p>
                                    </div>

                                    <div className="relative z-10 flex flex-col gap-6">
                                        {fields.map((field) => (
                                            <div key={field.key}>
                                                <label style={{ display: "block", fontSize: "clamp(10px, 2.5vw, 11px)", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: focusedField === field.key ? GOLD + "90" : "rgba(200,210,225,0.75)", marginBottom: 6, transition: "color 0.4s" }}>
                                                    {field.label}
                                                </label>
                                                <input
                                                    type={field.type}
                                                    placeholder={field.placeholder}
                                                    value={formData[field.key]}
                                                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                                    style={inputStyle(field.key)}
                                                    onFocus={() => setFocusedField(field.key)}
                                                    onBlur={() => setFocusedField(null)}
                                                />
                                            </div>
                                        ))}

                                        <div>
                                            <label style={{ display: "block", fontSize: "clamp(10px, 2.5vw, 11px)", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: focusedField === "necesidad" ? GOLD + "90" : "rgba(200,210,225,0.75)", marginBottom: 6, transition: "color 0.4s" }}>
                                                ¿Qué necesitas?
                                            </label>
                                            <textarea
                                                placeholder="Cuéntanos brevemente sobre tu proyecto"
                                                value={formData.necesidad}
                                                onChange={(e) => setFormData({ ...formData, necesidad: e.target.value })}
                                                rows={3}
                                                style={{ ...inputStyle("necesidad"), resize: "vertical" }}
                                                onFocus={() => setFocusedField("necesidad")}
                                                onBlur={() => setFocusedField(null)}
                                            />
                                        </div>

                                        {/* Submit */}
                                        <button
                                            onClick={handleSubmit}
                                            className="group relative overflow-hidden w-full flex items-center justify-center gap-3"
                                            style={{
                                                marginTop: 4,
                                                padding: "clamp(14px, 3.5vw, 16px) 32px",
                                                background: "transparent",
                                                border: "1px solid rgba(255,255,255,0.08)",
                                                borderRadius: 12,
                                                cursor: "pointer",
                                                transition: "all 0.5s cubic-bezier(0.25,0.4,0.25,1)",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = GOLD;
                                                e.currentTarget.style.borderColor = GOLD;
                                                e.currentTarget.style.color = "#0a0a0a";
                                                e.currentTarget.style.boxShadow = "0 16px 40px -8px rgba(200,169,110,0.25)";
                                                e.currentTarget.style.transform = "translateY(-1px)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = "transparent";
                                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                                                e.currentTarget.style.color = "";
                                                e.currentTarget.style.boxShadow = "none";
                                                e.currentTarget.style.transform = "none";
                                            }}
                                        >
                                            <span style={{ fontSize: "clamp(10px, 2.5vw, 11px)", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "inherit", transition: "color 0.4s" }}>
                                                Solicitar propuesta
                                            </span>
                                            <Send className="w-3.5 h-3.5" style={{ color: "inherit", transition: "color 0.4s" }} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="relative z-10 text-center py-10">
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                                        style={{ background: "rgba(200,169,110,0.08)", border: "1px solid " + GOLD + "20" }}
                                    >
                                        <Check className="w-7 h-7" style={{ color: GOLD }} />
                                    </div>
                                    <h3 style={{ fontSize: 20, fontWeight: 800, color: "rgba(255,255,255,0.95)", marginBottom: 8 }}>
                                        ¡Solicitud Enviada!
                                    </h3>
                                    <p style={{ fontSize: 14, color: "rgba(200,210,225,0.8)", lineHeight: 1.7 }}>
                                        Gracias, <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{formData.nombre.split(" ")[0]}</span>.
                                        Te contactaremos en las próximas{" "}
                                        <span style={{ color: GOLD, fontWeight: 600 }}>24 horas</span>.
                                    </p>
                                </div>
                            )}
                        </div>
                    </Reveal>
                </div>

                {/* ── Footer ── */}
                <Reveal delay={4}>
                    <div
                        className="flex flex-col md:flex-row justify-between items-center gap-4"
                        style={{ marginTop: "clamp(64px, 10vh, 100px)", padding: "24px 0 clamp(24px, 4vh, 36px)", borderTop: "1px solid rgba(255,255,255,0.03)" }}
                    >
                        <p style={{ fontSize: "clamp(8px, 2.2vw, 9px)", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", textAlign: "center" }}>
                            © 2026 Finem × Mike4Visual. Todos los derechos reservados.
                        </p>
                        <div className="flex items-center gap-6">
                            {["Instagram", "LinkedIn"].map((name) => (<a key={name} href="#" style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={(e) => (e.target.style.color = GOLD)} onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.5)")}>{name}</a>))}
                        </div>
                    </div>
                </Reveal>
            </div >
        </section >
    );
};

/* ============================================================
   FLOATING NAV
   ============================================================ */

const FloatingNav = () => {
    const [scrolled, setScrolled] = useState(false);
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 60);
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(max > 0 ? window.scrollY / max : 0);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(-10px)",
                transition: "opacity 0.8s cubic-bezier(0.25,0.4,0.25,1), transform 0.8s cubic-bezier(0.25,0.4,0.25,1)",
            }}
        >
            {/* ── SCROLL PROGRESS ── gradient line with glow */}
            <div
                className="absolute top-0 left-0 h-[2px] pointer-events-none z-20"
                style={{
                    width: (progress * 100) + "%",
                    background: "linear-gradient(90deg, #f97316, " + GOLD + ", #c084fc, #3b82f6)",
                    opacity: scrolled ? 1 : 0,
                    transition: "opacity 0.8s",
                    boxShadow: "0 0 12px rgba(249,115,22,0.3), 0 0 30px rgba(200,169,110,0.12)",
                }}
            />

            {/* ── AMBIENT TOP LIGHT ── always visible, intensifies on scroll */}
            <div
                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{
                    opacity: scrolled ? 0.6 : 0.12,
                    background: "linear-gradient(90deg, transparent 3%, rgba(249,115,22,0.2) 20%, rgba(200,169,110,0.15) 45%, rgba(124,58,237,0.12) 70%, rgba(59,130,246,0.08) 85%, transparent 97%)",
                    transition: "opacity 1s",
                }}
            />

            {/* ── GLASS BACKDROP ── starts fading after logo row */}
            <div
                className="absolute left-0 right-0 pointer-events-none"
                style={{
                    top: 0,
                    height: scrolled ? 200 : 220,
                    opacity: scrolled ? 1 : 0.8,
                    background: scrolled
                        ? "linear-gradient(180deg, rgba(2,4,16,1) 0%, rgba(2,4,16,0.98) 55%, rgba(2,4,16,0.5) 78%, transparent 100%)"
                        : "linear-gradient(180deg, rgba(2,4,16,0.9) 0%, rgba(2,4,16,0.8) 50%, rgba(2,4,16,0.2) 80%, transparent 100%)",
                    backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "blur(10px)",
                    WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "blur(10px)",
                    transition: "all 0.8s cubic-bezier(0.25,0.4,0.25,1)",
                    maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
                }}
            />

            {/* ── CONTENT ROW ── */}
            <div
                className="relative z-10 flex justify-between items-center"
                style={{
                    maxWidth: 1400,
                    margin: "0 auto",
                    padding: scrolled ? "18px clamp(20px, 4vw, 40px)" : "26px clamp(20px, 4vw, 40px)",
                    transition: "padding 0.6s cubic-bezier(0.25,0.4,0.25,1)",
                }}
            >
                {/* LOGO */}
                <div
                    style={{
                        transform: scrolled ? "scale(0.88)" : "scale(1)",
                        transformOrigin: "left center",
                        transition: "transform 0.6s cubic-bezier(0.25,0.4,0.25,1)",
                    }}
                >
                    <CollabLogo />
                </div>

                {/* CTA PILL */}
                <button
                    className="group relative overflow-hidden"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: scrolled ? "9px 18px" : "10px 22px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: 100,
                        cursor: "pointer",
                        transition: "all 0.5s cubic-bezier(0.25,0.4,0.25,1)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)";
                        e.currentTarget.style.background = "rgba(249,115,22,0.06)";
                        e.currentTarget.style.boxShadow = "0 0 20px rgba(249,115,22,0.06), 0 0 60px rgba(249,115,22,0.02), inset 0 0 16px rgba(249,115,22,0.03)";
                        e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.transform = "translateY(0)";
                    }}
                >
                    {/* Inner glow */}
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.05) 0%, transparent 70%)" }} />

                    <span className="relative z-10" style={{ fontSize: "clamp(8px, 2.2vw, 9px)", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.8)", transition: "color 0.3s" }}>HABLEMOS</span>

                    {/* Pulse dot */}
                    <div className="relative z-10 flex" style={{ width: 5, height: 5 }}>
                        <span className="absolute inline-flex w-full h-full rounded-full" style={{ background: "#f97316", opacity: 0.5, animation: "m4v-pulse-glow 2.5s ease infinite" }} />
                        <span className="relative inline-flex rounded-full" style={{ width: 5, height: 5, background: "#f97316", boxShadow: "0 0 6px rgba(249,115,22,0.35)" }} />
                    </div>
                </button>
            </div>
        </nav>
    );
};

/* ============================================================
   MAIN PAGE COMPONENT
   ============================================================ */
export default function Mike4VisualPage() {
    return (
        <div className="m4v-page">
            <PageStyles />
            <CustomCursor />
            <ScrollProgressBar />
            <FloatingNav />

            {/* ── Page-level golden ambient light flares ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
                {/* Golden flare between Showreel and Services */}
                <div className="absolute" style={{ width: "70vw", height: "50vh", top: "28%", left: "10%", background: "radial-gradient(ellipse at center, rgba(200,169,110,0.15) 0%, rgba(200,169,110,0.06) 40%, transparent 70%)", filter: "blur(80px)", animation: "m4v-blob-float 25s ease-in-out infinite" }} />
                {/* Golden flare between Process and FAQ */}
                <div className="absolute" style={{ width: "65vw", height: "45vh", top: "68%", right: "5%", background: "radial-gradient(ellipse at center, rgba(200,169,110,0.12) 0%, rgba(249,115,22,0.05) 45%, transparent 70%)", filter: "blur(80px)", animation: "m4v-blob-reverse 28s ease-in-out infinite" }} />
                {/* Subtle warm vignette overlay */}
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(200,169,110,0.04) 0%, transparent 50%)" }} />
            </div>

            <div className="relative">
                <HeroBlock />
                <SectionFade position="bottom" height={160} />
            </div>

            <div className="relative">
                <SectionFade position="top" height={100} />
                <ContrastBlock />
                <SectionFade position="bottom" height={120} />
            </div>

            <div className="relative">
                <SectionFade position="top" height={100} />
                <ReelBlock />
                <SectionFade position="bottom" height={120} />
            </div>

            <div className="relative">
                <SectionFade position="top" height={100} />
                <ServiceBlock />
                <SectionFade position="bottom" height={120} />
            </div>

            <div className="relative">
                <SectionFade position="top" height={100} />
                <ProcessBlock />
                <SectionFade position="bottom" height={120} />
            </div>

            <div className="relative">
                <SectionFade position="top" height={100} />
                <FAQBlock />
                <SectionFade position="bottom" height={120} />
            </div>

            <div className="relative">
                <SectionFade position="top" height={100} />
                <ClosingBlock />
            </div>
        </div>
    );
}