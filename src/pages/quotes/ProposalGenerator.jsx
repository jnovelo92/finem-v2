import React, { useState, useMemo, useCallback, memo } from 'react';
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
    ChevronUp,
    Instagram,
    Globe,
    PlayCircle,
    Palette,
    Calculator,
    Settings,
    DollarSign,
    BarChart,
    AlertCircle,
    FileText,
    Copy,
    Download,
    RefreshCw,
    Info,
    Percent,
    Package,
    Building
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* CONSTANTES DE CONFIGURACIÓN                                                 */
/* -------------------------------------------------------------------------- */

const PRICING_CONFIG = {
    // Niveles de Marketing (Base Fee)
    marketingLevels: [
        { id: 'presence', name: 'Presencia', value: 12500, description: 'Mantenimiento básico, 1 plataforma' },
        { id: 'traction', name: 'Tracción', value: 22000, description: '2-3 plataformas, estrategia activa' },
        { id: 'expansion', name: 'Expansión', value: 35000, description: 'Multicanal, escalamiento agresivo' },
        { id: 'dominance', name: 'Dominación', value: 55000, description: 'Full-stack, omnicanalidad total' },
    ],

    // Multiplicadores de Complejidad (Account Management)
    complexityLevels: [
        { id: 'start', name: 'Start', multiplier: 1.0, description: '1 Sucursal / Operación simple' },
        { id: 'growth', name: 'Growth', multiplier: 1.3, description: '2-4 Sucursales / Multi-ubicación' },
        { id: 'corp', name: 'Corp', multiplier: 1.6, description: '5-10 Sucursales / Corporativo' },
        { id: 'enterprise', name: 'Enterprise', multiplier: 2.2, description: '+10 Sucursales / Franquicia' },
    ],

    // Producción (Shooting)
    productionTypes: [
        { id: 'remote', name: 'Remoto / Stock', value: 0, description: 'Sin producción física' },
        { id: 'run_gun', name: 'Run & Gun', value: 4500, description: '1 día, equipo ligero' },
        { id: 'pro', name: 'Shooting Pro', value: 9500, description: '1-2 días, producción completa' },
        { id: 'premium', name: 'Producción Premium', value: 18000, description: 'Multicámara, styling, locación' },
    ],

    // Edición (Post-producción)
    editingPacks: [
        { id: 'basic', name: 'Pack Básico', value: 6000, deliverables: '8 piezas/mes', description: 'Edición estándar' },
        { id: 'standard', name: 'Pack Estándar', value: 10500, deliverables: '16 piezas/mes', description: 'Motion graphics incluido' },
        { id: 'power', name: 'Pack Power', value: 18000, deliverables: '30 piezas/mes', description: 'Full post-producción' },
        { id: 'unlimited', name: 'Pack Ilimitado', value: 28000, deliverables: 'Sin límite', description: 'Contenido a demanda' },
    ],

    // Proyectos One-Shot (CapEx)
    projectTypes: {
        web: [
            { id: 'landing', name: 'Landing Page', value: 15000 },
            { id: 'corporate', name: 'Sitio Corporativo', value: 35000 },
            { id: 'ecommerce', name: 'E-commerce', value: 55000 },
            { id: 'webapp', name: 'Web App Custom', value: 85000 },
        ],
        branding: [
            { id: 'refresh', name: 'Refresh Visual', value: 15000 },
            { id: 'rebrand', name: 'Rebranding Completo', value: 35000 },
            { id: 'identity', name: 'Sistema de Identidad', value: 55000 },
        ],
        other: [
            { id: 'photography', name: 'Sesión Fotográfica Pro', value: 12000 },
            { id: 'video_brand', name: 'Video Institucional', value: 25000 },
            { id: 'catalog', name: 'Catálogo Digital', value: 18000 },
        ],
    },

    // Configuración de ROI
    defaultMargins: {
        retail: 0.35,
        services: 0.50,
        luxury: 0.60,
        industrial: 0.25,
    },
};

/* -------------------------------------------------------------------------- */
/* UTILIDADES DE CÁLCULO FINANCIERO                                           */
/* -------------------------------------------------------------------------- */

const calculateFinancials = (inputs) => {
    // 1. Fee de Marketing ajustado por complejidad
    const marketingBase = inputs.marketingLevel;
    const complexityMultiplier = inputs.complexityMultiplier;
    const adjustedMarketingFee = marketingBase * complexityMultiplier;

    // 2. Costo Multimedia (Producción + Edición)
    const multimediaFee = inputs.productionCost + inputs.editingCost;

    // 3. Proyectos One-Shot (CapEx)
    const projectsTotal = inputs.projects.reduce((sum, p) => sum + p.value, 0);

    // 4. Amortización mensual (si aplica contrato anual)
    const amortizationMonthly = inputs.amortizeProjects ? (projectsTotal / 12) : 0;

    // 5. Totales
    const agencyFeeMonthly = adjustedMarketingFee + multimediaFee + amortizationMonthly;
    const totalOperativo = agencyFeeMonthly + inputs.adsBudget;

    // 6. Break-Even Analysis
    const marginRate = inputs.marginRate;
    const profitPerUnitLow = inputs.ticketLow * marginRate;
    const profitPerUnitHigh = inputs.ticketHigh * marginRate;

    const breakEvenUnitsLow = profitPerUnitLow > 0 ? Math.ceil(totalOperativo / profitPerUnitLow) : 0;
    const breakEvenUnitsHigh = profitPerUnitHigh > 0 ? Math.ceil(totalOperativo / profitPerUnitHigh) : 0;

    // 7. ROI Proyections (Escenarios)
    const scenarios = calculateScenarios(inputs, totalOperativo);

    // 8. Punto de equilibrio en días (asumiendo mes de 30 días)
    const avgTicket = (inputs.ticketLow + inputs.ticketHigh) / 2;
    const avgProfit = avgTicket * marginRate;
    const unitsPerDay = avgProfit > 0 ? (totalOperativo / avgProfit) / 30 : 0;

    return {
        // Desglose
        marketingBase,
        complexityMultiplier,
        marketingAdjusted: adjustedMarketingFee,
        multimedia: multimediaFee,
        productionCost: inputs.productionCost,
        editingCost: inputs.editingCost,
        projectsTotal,
        amortizationMonthly,

        // Totales
        agencyFeeMonthly,
        totalOperativo,
        adsBudget: inputs.adsBudget,

        // Break-Even
        breakEvenUnitsLow,
        breakEvenUnitsHigh,
        unitsPerDay: unitsPerDay.toFixed(1),

        // Tickets
        ticketLow: inputs.ticketLow,
        ticketHigh: inputs.ticketHigh,
        avgTicket,
        marginRate,

        // Escenarios ROI
        scenarios,

        // Anualizado
        annualInvestment: totalOperativo * 12,
        projectsUpfront: inputs.amortizeProjects ? 0 : projectsTotal,
    };
};

const calculateScenarios = (inputs, totalOperativo) => {
    const marginRate = inputs.marginRate;

    // Escenario A: Break-Even (Meta Mínima)
    const scenarioA = {
        id: 'A',
        name: 'Estabilidad',
        subtitle: 'Meta Mínima',
        icon: 'Shield',
        color: 'orange',
        salesLow: Math.ceil(totalOperativo / (inputs.ticketLow * marginRate)),
        salesHigh: Math.ceil(totalOperativo / (inputs.ticketHigh * marginRate)),
        revenue: totalOperativo / marginRate,
        profit: 0,
        roi: 1,
        description: 'Punto de equilibrio donde la inversión se cubre completamente.',
    };

    // Escenario B: Crecimiento Moderado (+50% sobre break-even)
    const targetRevenueB = (totalOperativo / marginRate) * 1.5;
    const profitB = (targetRevenueB * marginRate) - totalOperativo;
    const scenarioB = {
        id: 'B',
        name: 'Crecimiento',
        subtitle: 'Objetivo Realista',
        icon: 'TrendingUp',
        color: 'blue',
        salesLow: Math.ceil(targetRevenueB / inputs.ticketLow),
        salesHigh: Math.ceil(targetRevenueB / inputs.ticketHigh),
        revenue: targetRevenueB,
        profit: profitB,
        roi: (profitB + totalOperativo) / totalOperativo,
        description: 'Crecimiento sostenible con utilidad neta positiva.',
    };

    // Escenario C: Expansión Agresiva (Incluye B2B/Proyectos grandes)
    const b2bProjectValue = inputs.b2bProjectValue || 0;
    const b2bProjectMargin = inputs.b2bProjectMargin || 0.40;
    const b2bProfitMonthly = (b2bProjectValue * b2bProjectMargin) / 3; // Prorrateado trimestral
    const targetRevenueC = targetRevenueB + (b2bProjectValue / 3);
    const profitC = profitB + b2bProfitMonthly;
    const scenarioC = {
        id: 'C',
        name: 'Expansión',
        subtitle: 'Alto Impacto',
        icon: 'Rocket',
        color: 'purple',
        salesLow: scenarioB.salesLow,
        salesHigh: scenarioB.salesHigh,
        b2bProjects: 1,
        b2bValue: b2bProjectValue,
        revenue: targetRevenueC,
        profit: profitC,
        roi: profitC > 0 ? (profitC + totalOperativo) / totalOperativo : 1,
        description: 'Combina B2C recurrente con proyectos B2B de alto valor.',
    };

    return { A: scenarioA, B: scenarioB, C: scenarioC };
};

/* -------------------------------------------------------------------------- */
/* COMPONENTES DE UI                                                           */
/* -------------------------------------------------------------------------- */

// Componente de Input genérico
const InputField = memo(({ label, name, value, onChange, type = 'text', prefix, suffix, hint, disabled }) => (
    <div className="space-y-1.5">
        <label className="block text-xs font-medium text-slate-400">{label}</label>
        <div className="relative">
            {prefix && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">{prefix}</span>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`w-full bg-[#0a0a14] border border-slate-700/50 rounded-lg py-2.5 text-sm text-white 
          focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50 outline-none transition-all
          disabled:opacity-50 disabled:cursor-not-allowed
          ${prefix ? 'pl-8' : 'px-3'} ${suffix ? 'pr-12' : 'px-3'}`}
            />
            {suffix && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">{suffix}</span>
            )}
        </div>
        {hint && <p className="text-[10px] text-slate-600">{hint}</p>}
    </div>
));

InputField.displayName = 'InputField';

// Componente de Select
const SelectField = memo(({ label, name, value, onChange, options, hint }) => (
    <div className="space-y-1.5">
        <label className="block text-xs font-medium text-slate-400">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-[#0a0a14] border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white 
        focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50 outline-none transition-all
        appearance-none cursor-pointer"
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
        >
            {options.map(opt => (
                <option key={opt.id || opt.value} value={opt.value || opt.multiplier || opt.id}>
                    {opt.name} {opt.value !== undefined && `($${opt.value.toLocaleString()})`}
                    {opt.multiplier !== undefined && ` - x${opt.multiplier}`}
                </option>
            ))}
        </select>
        {hint && <p className="text-[10px] text-slate-600">{hint}</p>}
    </div>
));

SelectField.displayName = 'SelectField';

// Badge de sección
const SectionBadge = memo(({ icon: Icon, label, color = 'orange' }) => {
    const colors = {
        orange: 'text-orange-500 border-orange-500/30 bg-orange-500/10',
        blue: 'text-blue-500 border-blue-500/30 bg-blue-500/10',
        purple: 'text-purple-500 border-purple-500/30 bg-purple-500/10',
        green: 'text-green-500 border-green-500/30 bg-green-500/10',
        slate: 'text-slate-400 border-slate-500/30 bg-slate-500/10',
    };

    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${colors[color]}`}>
            {Icon && <Icon size={12} />}
            {label}
        </div>
    );
});

SectionBadge.displayName = 'SectionBadge';

// Card de Stat
const StatCard = memo(({ label, value, prefix = '', suffix = '', size = 'md', color = 'white', hint }) => {
    const sizes = {
        sm: 'text-xl',
        md: 'text-2xl',
        lg: 'text-3xl',
        xl: 'text-4xl',
    };

    const colors = {
        white: 'text-white',
        orange: 'text-orange-400',
        green: 'text-green-400',
        blue: 'text-blue-400',
        purple: 'text-purple-400',
    };

    return (
        <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-slate-500">{label}</p>
            <p className={`font-bold ${sizes[size]} ${colors[color]}`}>
                {prefix}{typeof value === 'number' ? value.toLocaleString('es-MX', { maximumFractionDigits: 0 }) : value}{suffix}
            </p>
            {hint && <p className="text-[10px] text-slate-600">{hint}</p>}
        </div>
    );
});

StatCard.displayName = 'StatCard';

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
/* COMPONENTE PRINCIPAL                                                        */
/* -------------------------------------------------------------------------- */

const ProposalGenerator = () => {
    // Estado inicial con valores de Rebhinder como ejemplo
    const [inputs, setInputs] = useState({
        // Información del Cliente
        clientName: 'Rebhinder',
        clientSlogan: 'Donde la Maestría Artesanal Encuentra su Voz Digital',
        clientIndustry: 'luxury',

        // Diagnóstico
        productScore: 10,
        digitalScore: 6,
        mainPain: 'La brecha entre lo que eres y lo que pareces te está costando clientes de alto valor.',
        mission: 'Elevar la percepción digital para que sea un espejo fiel de la excelencia de tu taller.',

        // Configuración de Servicios
        marketingLevel: 22000,
        complexityMultiplier: 1.3,
        productionCost: 9500,
        editingCost: 10500,

        // Proyectos One-Shot
        projects: [
            { id: 'ecommerce', name: 'E-commerce', value: 45000 },
            { id: 'refresh', name: 'Refresh Visual', value: 15000 },
        ],
        amortizeProjects: true,

        // Ads & ROI
        adsBudget: 12000,
        ticketLow: 1800,
        ticketHigh: 8500,
        marginRate: 0.40,

        // B2B (para escenario C)
        b2bProjectValue: 350000,
        b2bProjectMargin: 0.40,
    });

    const [showAdvanced, setShowAdvanced] = useState(false);
    const [activePanel, setActivePanel] = useState('config'); // config | preview | export

    // Cálculos financieros memorizados
    const financials = useMemo(() => calculateFinancials(inputs), [inputs]);

    // Handlers
    const handleInputChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) || 0 : value
        }));
    }, []);

    const handleAddProject = useCallback((project) => {
        setInputs(prev => ({
            ...prev,
            projects: [...prev.projects, project]
        }));
    }, []);

    const handleRemoveProject = useCallback((projectId) => {
        setInputs(prev => ({
            ...prev,
            projects: prev.projects.filter(p => p.id !== projectId)
        }));
    }, []);

    const handleMarginPreset = useCallback((industry) => {
        setInputs(prev => ({
            ...prev,
            clientIndustry: industry,
            marginRate: PRICING_CONFIG.defaultMargins[industry]
        }));
    }, []);

    const resetToDefaults = useCallback(() => {
        setInputs({
            clientName: '',
            clientSlogan: '',
            clientIndustry: 'retail',
            productScore: 7,
            digitalScore: 5,
            mainPain: '',
            mission: '',
            marketingLevel: 22000,
            complexityMultiplier: 1.0,
            productionCost: 9500,
            editingCost: 10500,
            projects: [],
            amortizeProjects: true,
            adsBudget: 10000,
            ticketLow: 1000,
            ticketHigh: 5000,
            marginRate: 0.35,
            b2bProjectValue: 0,
            b2bProjectMargin: 0.40,
        });
    }, []);

    // Generar JSON de propuesta
    const generateProposalData = useCallback(() => {
        return {
            meta: {
                generatedAt: new Date().toISOString(),
                version: '2.0',
            },
            client: {
                name: inputs.clientName,
                slogan: inputs.clientSlogan,
                industry: inputs.clientIndustry,
                diagnosis: {
                    productScore: inputs.productScore,
                    digitalScore: inputs.digitalScore,
                    gap: inputs.productScore - inputs.digitalScore,
                    mainPain: inputs.mainPain,
                    mission: inputs.mission,
                },
            },
            services: {
                marketing: {
                    level: PRICING_CONFIG.marketingLevels.find(l => l.value === inputs.marketingLevel),
                    baseFee: inputs.marketingLevel,
                    complexity: PRICING_CONFIG.complexityLevels.find(l => l.multiplier === inputs.complexityMultiplier),
                    adjustedFee: financials.marketingAdjusted,
                },
                multimedia: {
                    production: PRICING_CONFIG.productionTypes.find(p => p.value === inputs.productionCost),
                    editing: PRICING_CONFIG.editingPacks.find(e => e.value === inputs.editingCost),
                    totalFee: financials.multimedia,
                },
                projects: {
                    items: inputs.projects,
                    total: financials.projectsTotal,
                    amortized: inputs.amortizeProjects,
                    monthlyAmortization: financials.amortizationMonthly,
                },
            },
            financials: {
                agencyFeeMonthly: financials.agencyFeeMonthly,
                adsBudget: inputs.adsBudget,
                totalOperativo: financials.totalOperativo,
                annualInvestment: financials.annualInvestment,
                breakEven: {
                    unitsLow: financials.breakEvenUnitsLow,
                    unitsHigh: financials.breakEvenUnitsHigh,
                    unitsPerDay: financials.unitsPerDay,
                },
                tickets: {
                    low: inputs.ticketLow,
                    high: inputs.ticketHigh,
                    average: financials.avgTicket,
                },
                marginRate: inputs.marginRate,
                scenarios: financials.scenarios,
            },
        };
    }, [inputs, financials]);

    return (
        <div className="min-h-screen bg-[#020410] text-slate-200 font-sans">

            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-[#020410]/90 backdrop-blur-xl">
                <div className="container mx-auto px-4 md:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <LogoFinem className="h-7 md:h-8 w-auto text-white" />
                            <div className="hidden md:block h-6 w-px bg-slate-800" />
                            <div className="hidden md:block">
                                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Generador de Propuestas</p>
                                <p className="text-xs text-slate-400">v2.0 Interstellar</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={resetToDefaults}
                                className="p-2 rounded-lg border border-slate-700/50 hover:border-slate-600 text-slate-400 hover:text-white transition-all"
                                title="Resetear"
                            >
                                <RefreshCw size={16} />
                            </button>

                            <button
                                onClick={() => {
                                    const data = generateProposalData();
                                    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
                                }}
                                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700/50 hover:border-orange-500/50 text-slate-400 hover:text-orange-400 transition-all text-xs"
                            >
                                <Copy size={14} />
                                Copiar JSON
                            </button>

                            <button
                                onClick={() => {
                                    const data = generateProposalData();
                                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = `propuesta-${inputs.clientName || 'cliente'}-${new Date().toISOString().split('T')[0]}.json`;
                                    a.click();
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white transition-all text-xs font-medium"
                            >
                                <Download size={14} />
                                <span className="hidden md:inline">Exportar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <div className="flex flex-col lg:flex-row min-h-[calc(100vh-73px)]">

                {/* Panel de Configuración */}
                <aside className="lg:w-[420px] xl:w-[480px] border-r border-slate-800/50 overflow-y-auto">
                    <div className="p-4 md:p-6 space-y-8">

                        {/* Sección: Identidad del Cliente */}
                        <section>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                                    <Target size={18} className="text-orange-400" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-semibold text-white">Identidad del Cliente</h2>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Diagnóstico Inicial</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <InputField
                                    label="Nombre de la Marca"
                                    name="clientName"
                                    value={inputs.clientName}
                                    onChange={handleInputChange}
                                />

                                <InputField
                                    label="Slogan / Promesa de Valor"
                                    name="clientSlogan"
                                    value={inputs.clientSlogan}
                                    onChange={handleInputChange}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Score Producto"
                                        name="productScore"
                                        type="number"
                                        value={inputs.productScore}
                                        onChange={handleInputChange}
                                        suffix="/10"
                                        hint="Calidad real del producto"
                                    />
                                    <InputField
                                        label="Score Digital"
                                        name="digitalScore"
                                        type="number"
                                        value={inputs.digitalScore}
                                        onChange={handleInputChange}
                                        suffix="/10"
                                        hint="Percepción digital actual"
                                    />
                                </div>

                                {/* Gap Indicator */}
                                {inputs.productScore - inputs.digitalScore > 2 && (
                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                        <div className="flex items-start gap-2">
                                            <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-red-400 font-medium">Brecha Crítica Detectada</p>
                                                <p className="text-[10px] text-red-400/70">
                                                    Diferencia de {inputs.productScore - inputs.digitalScore} puntos entre producto y digital
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-medium text-slate-400">Dolor Principal</label>
                                    <textarea
                                        name="mainPain"
                                        value={inputs.mainPain}
                                        onChange={handleInputChange}
                                        rows="2"
                                        className="w-full bg-[#0a0a14] border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:ring-1 focus:ring-orange-500/50 outline-none resize-none"
                                        placeholder="¿Cuál es el problema principal que resolvemos?"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-medium text-slate-400">Misión FINEM</label>
                                    <textarea
                                        name="mission"
                                        value={inputs.mission}
                                        onChange={handleInputChange}
                                        rows="2"
                                        className="w-full bg-[#0a0a14] border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:ring-1 focus:ring-orange-500/50 outline-none resize-none"
                                        placeholder="¿Qué lograremos para este cliente?"
                                    />
                                </div>
                            </div>
                        </section>

                        <hr className="border-slate-800/50" />

                        {/* Sección: Calibración de Servicios */}
                        <section>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                    <Calculator size={18} className="text-blue-400" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-semibold text-white">Calibración de Servicios</h2>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Motor de Ventas</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <SelectField
                                    label="Nivel de Marketing"
                                    name="marketingLevel"
                                    value={inputs.marketingLevel}
                                    onChange={handleInputChange}
                                    options={PRICING_CONFIG.marketingLevels}
                                    hint={PRICING_CONFIG.marketingLevels.find(l => l.value === inputs.marketingLevel)?.description}
                                />

                                <SelectField
                                    label="Complejidad Operativa"
                                    name="complexityMultiplier"
                                    value={inputs.complexityMultiplier}
                                    onChange={handleInputChange}
                                    options={PRICING_CONFIG.complexityLevels}
                                    hint={PRICING_CONFIG.complexityLevels.find(l => l.multiplier === inputs.complexityMultiplier)?.description}
                                />

                                <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-slate-400">Fee Marketing Ajustado</span>
                                        <span className="text-sm font-semibold text-blue-400">
                                            ${financials.marketingAdjusted.toLocaleString('es-MX')}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-slate-600 mt-1">
                                        ${inputs.marketingLevel.toLocaleString()} × {inputs.complexityMultiplier}
                                    </p>
                                </div>

                                <SelectField
                                    label="Producción (Shooting)"
                                    name="productionCost"
                                    value={inputs.productionCost}
                                    onChange={handleInputChange}
                                    options={PRICING_CONFIG.productionTypes}
                                />

                                <SelectField
                                    label="Edición (Post-producción)"
                                    name="editingCost"
                                    value={inputs.editingCost}
                                    onChange={handleInputChange}
                                    options={PRICING_CONFIG.editingPacks}
                                    hint={PRICING_CONFIG.editingPacks.find(e => e.value === inputs.editingCost)?.deliverables}
                                />
                            </div>
                        </section>

                        <hr className="border-slate-800/50" />

                        {/* Sección: Proyectos One-Shot */}
                        <section>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                    <Layers size={18} className="text-purple-400" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-semibold text-white">Fábrica de Activos</h2>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Proyectos CapEx</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {/* Proyectos seleccionados */}
                                {inputs.projects.length > 0 && (
                                    <div className="space-y-2">
                                        {inputs.projects.map(project => (
                                            <div
                                                key={project.id}
                                                className="flex items-center justify-between p-3 rounded-lg bg-purple-500/5 border border-purple-500/20"
                                            >
                                                <div>
                                                    <p className="text-sm text-white">{project.name}</p>
                                                    <p className="text-xs text-slate-500">${project.value.toLocaleString()}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveProject(project.id)}
                                                    className="p-1.5 rounded hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Selector de proyectos */}
                                <div className="space-y-2">
                                    <p className="text-[10px] uppercase tracking-wider text-slate-500">Agregar Proyecto</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[...PRICING_CONFIG.projectTypes.web, ...PRICING_CONFIG.projectTypes.branding].map(project => {
                                            const isSelected = inputs.projects.some(p => p.id === project.id);
                                            return (
                                                <button
                                                    key={project.id}
                                                    onClick={() => !isSelected && handleAddProject(project)}
                                                    disabled={isSelected}
                                                    className={`p-2.5 rounded-lg border text-left transition-all ${isSelected
                                                        ? 'bg-purple-500/10 border-purple-500/30 opacity-50 cursor-not-allowed'
                                                        : 'bg-slate-800/30 border-slate-700/50 hover:border-purple-500/50 cursor-pointer'
                                                        }`}
                                                >
                                                    <p className="text-xs text-white truncate">{project.name}</p>
                                                    <p className="text-[10px] text-slate-500">${project.value.toLocaleString()}</p>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Toggle amortización */}
                                <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 cursor-pointer hover:border-purple-500/30 transition-all">
                                    <input
                                        type="checkbox"
                                        name="amortizeProjects"
                                        checked={inputs.amortizeProjects}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-purple-500 focus:ring-purple-500/50"
                                    />
                                    <div>
                                        <p className="text-sm text-white">Amortizar a 12 meses</p>
                                        <p className="text-[10px] text-slate-500">Incluir en fee mensual (contrato anual)</p>
                                    </div>
                                </label>

                                {/* Resumen proyectos */}
                                {financials.projectsTotal > 0 && (
                                    <div className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/10">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs text-slate-400">Total Proyectos</span>
                                            <span className="text-sm font-semibold text-purple-400">
                                                ${financials.projectsTotal.toLocaleString('es-MX')}
                                            </span>
                                        </div>
                                        {inputs.amortizeProjects && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] text-slate-500">Amortización mensual</span>
                                                <span className="text-xs text-purple-300">
                                                    +${financials.amortizationMonthly.toLocaleString('es-MX')}/mes
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </section>

                        <hr className="border-slate-800/50" />

                        {/* Sección: Configuración ROI */}
                        <section>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                                    <TrendingUp size={18} className="text-green-400" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-semibold text-white">Proyección ROI</h2>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Variables Financieras</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <InputField
                                    label="Presupuesto Ads (Mensual)"
                                    name="adsBudget"
                                    type="number"
                                    value={inputs.adsBudget}
                                    onChange={handleInputChange}
                                    prefix="$"
                                    hint="Inversión en pauta digital"
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Ticket Bajo"
                                        name="ticketLow"
                                        type="number"
                                        value={inputs.ticketLow}
                                        onChange={handleInputChange}
                                        prefix="$"
                                        hint="Ej: Accesorios"
                                    />
                                    <InputField
                                        label="Ticket Alto"
                                        name="ticketHigh"
                                        type="number"
                                        value={inputs.ticketHigh}
                                        onChange={handleInputChange}
                                        prefix="$"
                                        hint="Ej: Muebles"
                                    />
                                </div>

                                {/* Presets de margen */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-medium text-slate-400">Margen de Contribución</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {Object.entries(PRICING_CONFIG.defaultMargins).map(([industry, margin]) => (
                                            <button
                                                key={industry}
                                                onClick={() => handleMarginPreset(industry)}
                                                className={`p-2 rounded-lg border text-center transition-all ${inputs.clientIndustry === industry
                                                    ? 'bg-green-500/20 border-green-500/50 text-green-400'
                                                    : 'bg-slate-800/30 border-slate-700/50 text-slate-400 hover:border-green-500/30'
                                                    }`}
                                            >
                                                <p className="text-[10px] capitalize">{industry}</p>
                                                <p className="text-xs font-semibold">{(margin * 100).toFixed(0)}%</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <InputField
                                    label="Margen Personalizado"
                                    name="marginRate"
                                    type="number"
                                    value={inputs.marginRate}
                                    onChange={handleInputChange}
                                    suffix="%"
                                    hint="Como decimal (0.40 = 40%)"
                                />

                                {/* Toggle avanzado */}
                                <button
                                    onClick={() => setShowAdvanced(!showAdvanced)}
                                    className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                    Opciones B2B Avanzadas
                                </button>

                                {showAdvanced && (
                                    <div className="space-y-4 p-4 rounded-lg bg-slate-800/20 border border-slate-700/30">
                                        <InputField
                                            label="Valor Proyecto B2B (trimestral)"
                                            name="b2bProjectValue"
                                            type="number"
                                            value={inputs.b2bProjectValue}
                                            onChange={handleInputChange}
                                            prefix="$"
                                            hint="Ej: Proyecto de interiorismo"
                                        />
                                        <InputField
                                            label="Margen Proyecto B2B"
                                            name="b2bProjectMargin"
                                            type="number"
                                            value={inputs.b2bProjectMargin}
                                            onChange={handleInputChange}
                                            suffix="%"
                                        />
                                    </div>
                                )}
                            </div>
                        </section>

                    </div>
                </aside>

                {/* Panel de Resultados */}
                <main className="flex-1 overflow-y-auto bg-[#030412]">
                    <div className="p-4 md:p-8 lg:p-12 space-y-8">

                        {/* Header de Resumen */}
                        <div className="text-center space-y-4">
                            <SectionBadge icon={Sparkles} label="Resumen Financiero" color="orange" />
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                                Propuesta {inputs.clientName || 'Cliente'}
                            </h1>
                            {inputs.clientSlogan && (
                                <p className="text-lg text-slate-400 max-w-2xl mx-auto">{inputs.clientSlogan}</p>
                            )}
                        </div>

                        {/* Cards de Totales */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20">
                                <StatCard
                                    label="Fee Agencia Mensual"
                                    value={financials.agencyFeeMonthly}
                                    prefix="$"
                                    suffix=" MXN"
                                    size="lg"
                                    color="orange"
                                />
                                <p className="text-[10px] text-slate-500 mt-2">
                                    Marketing (${financials.marketingAdjusted.toLocaleString()}) +
                                    Multimedia (${financials.multimedia.toLocaleString()})
                                    {inputs.amortizeProjects && financials.amortizationMonthly > 0 &&
                                        ` + Amort (${financials.amortizationMonthly.toLocaleString()})`}
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
                                <StatCard
                                    label="Costo Operativo Total"
                                    value={financials.totalOperativo}
                                    prefix="$"
                                    suffix=" MXN"
                                    size="lg"
                                    color="blue"
                                />
                                <p className="text-[10px] text-slate-500 mt-2">
                                    Agencia + Ads (${inputs.adsBudget.toLocaleString()})
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20">
                                <StatCard
                                    label="Break-Even Mensual"
                                    value={`${financials.breakEvenUnitsLow} - ${financials.breakEvenUnitsHigh}`}
                                    suffix=" unidades"
                                    size="lg"
                                    color="green"
                                />
                                <p className="text-[10px] text-slate-500 mt-2">
                                    ~{financials.unitsPerDay} ventas/día promedio
                                </p>
                            </div>
                        </div>

                        {/* Desglose Detallado */}
                        <div className="p-6 rounded-2xl bg-slate-800/20 border border-slate-700/30">
                            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                                <FileText size={16} className="text-slate-400" />
                                Desglose de Inversión
                            </h3>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
                                    <span className="text-sm text-slate-400">Marketing Base</span>
                                    <span className="text-sm text-white">${inputs.marketingLevel.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-700/30 pl-4">
                                    <span className="text-xs text-slate-500">× Complejidad ({inputs.complexityMultiplier}x)</span>
                                    <span className="text-sm text-blue-400">${financials.marketingAdjusted.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
                                    <span className="text-sm text-slate-400">Producción</span>
                                    <span className="text-sm text-white">${inputs.productionCost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
                                    <span className="text-sm text-slate-400">Edición</span>
                                    <span className="text-sm text-white">${inputs.editingCost.toLocaleString()}</span>
                                </div>
                                {inputs.amortizeProjects && financials.amortizationMonthly > 0 && (
                                    <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
                                        <span className="text-sm text-slate-400">Amortización Proyectos</span>
                                        <span className="text-sm text-purple-400">${financials.amortizationMonthly.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
                                    <span className="text-sm text-slate-400">Pauta Digital</span>
                                    <span className="text-sm text-white">${inputs.adsBudget.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 bg-slate-800/30 rounded-lg px-3 -mx-3">
                                    <span className="text-sm font-semibold text-white">TOTAL MENSUAL</span>
                                    <span className="text-lg font-bold text-orange-400">${financials.totalOperativo.toLocaleString()} MXN</span>
                                </div>
                            </div>

                            {!inputs.amortizeProjects && financials.projectsTotal > 0 && (
                                <div className="mt-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-purple-300">Inversión Inicial (Proyectos)</span>
                                        <span className="text-lg font-bold text-purple-400">${financials.projectsTotal.toLocaleString()} MXN</span>
                                    </div>
                                    <p className="text-[10px] text-purple-400/60 mt-1">Pago único al inicio del contrato</p>
                                </div>
                            )}
                        </div>

                        {/* Escenarios ROI */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                <BarChart size={16} className="text-slate-400" />
                                Escenarios de Retorno
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {Object.entries(financials.scenarios).map(([key, scenario]) => {
                                    const IconComponent = scenario.icon === 'Shield' ? Shield : scenario.icon === 'TrendingUp' ? TrendingUp : Rocket;
                                    const colorClasses = {
                                        orange: 'from-orange-500/10 to-transparent border-orange-500/20 text-orange-400',
                                        blue: 'from-blue-500/10 to-transparent border-blue-500/20 text-blue-400',
                                        purple: 'from-purple-500/10 to-transparent border-purple-500/20 text-purple-400',
                                    };

                                    return (
                                        <div
                                            key={key}
                                            className={`p-5 rounded-2xl bg-gradient-to-br border ${colorClasses[scenario.color]}`}
                                        >
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className={`p-2 rounded-lg bg-${scenario.color}-500/20`}>
                                                    <IconComponent size={18} className={colorClasses[scenario.color].split(' ').pop()} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500">Escenario {scenario.id}</p>
                                                    <p className="text-sm font-semibold text-white">{scenario.name}</p>
                                                </div>
                                            </div>

                                            <p className="text-xs text-slate-400 mb-4">{scenario.description}</p>

                                            <div className="space-y-2">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-slate-500">Ventas requeridas</span>
                                                    <span className="text-white">{scenario.salesLow} - {scenario.salesHigh}/mes</span>
                                                </div>
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-slate-500">Revenue estimado</span>
                                                    <span className="text-white">${scenario.revenue.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</span>
                                                </div>
                                                {scenario.profit > 0 && (
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-slate-500">Utilidad neta</span>
                                                        <span className="text-green-400">${scenario.profit.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between text-sm pt-2 border-t border-slate-700/30">
                                                    <span className="text-slate-400">ROI</span>
                                                    <span className={`font-bold ${colorClasses[scenario.color].split(' ').pop()}`}>
                                                        {scenario.roi.toFixed(1)}x
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="text-center pt-8">
                            <p className="text-slate-500 text-sm mb-4">¿Listo para generar la propuesta visual?</p>
                            <button className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold transition-all">
                                <Rocket size={18} />
                                Generar Propuesta Completa
                                <ArrowRight size={18} />
                            </button>
                        </div>

                    </div>
                </main>

            </div>

            {/* Footer Sticky con Totales */}
            <footer className="sticky bottom-0 z-40 border-t border-slate-800/50 bg-[#020410]/95 backdrop-blur-xl lg:hidden">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-slate-500">Fee Mensual</p>
                            <p className="text-lg font-bold text-orange-400">
                                ${financials.agencyFeeMonthly.toLocaleString('es-MX')} MXN
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase tracking-wider text-slate-500">Total Operativo</p>
                            <p className="text-lg font-bold text-white">
                                ${financials.totalOperativo.toLocaleString('es-MX')} MXN
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default ProposalGenerator;