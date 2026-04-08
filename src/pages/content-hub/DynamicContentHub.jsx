/**
 * DynamicContentHub
 * Página de calendario editorial generada dinámicamente.
 * Reutiliza exactamente los mismos componentes que OrganicNailsContentHub.
 * Los datos llegan via React Router state o localStorage.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, List, AlertTriangle } from 'lucide-react';
import { CalendarView } from '../../components/content-hub/CalendarView';
import { FeedView } from '../../components/content-hub/FeedView';
import { FilterBar } from '../../components/content-hub/FilterBar';
import { PostModal } from '../../components/content-hub/PostModal';

// ── Helpers ───────────────────────────────────────────────────────────────────

const MONTH_NAMES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const formatMonthYear = (monthStr) => {
    if (!monthStr) return '';
    const [year, mon] = monthStr.split('-');
    return `${MONTH_NAMES[parseInt(mon, 10) - 1]} ${year}`;
};

// ── Empty State ───────────────────────────────────────────────────────────────

const EmptyState = ({ onBack }) => (
    <div className="min-h-screen bg-[#020410] flex flex-col items-center justify-center px-4 text-center">
        <AlertTriangle className="w-14 h-14 text-orange-400/50 mb-6" />
        <h2 className="text-2xl font-bold text-white mb-3">Calendario no encontrado</h2>
        <p className="text-slate-500 max-w-sm mb-8 text-sm leading-relaxed">
            No se encontraron datos para este calendario. Puede que el enlace haya expirado
            o que el calendario no haya sido generado todavía.
        </p>
        <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 rounded-xl text-sm font-semibold transition-all"
        >
            <ArrowLeft className="w-4 h-4" />
            Crear un calendario
        </button>
    </div>
);

// ── Main Component ────────────────────────────────────────────────────────────

const DynamicContentHub = () => {
    const navigate = useNavigate();
    const { clientSlug, month } = useParams();
    const location = useLocation();

    const [viewMode, setViewMode] = useState('calendar');
    const [selectedPost, setSelectedPost] = useState(null);
    const [filters, setFilters] = useState({ platforms: [], statuses: [], search: '' });
    const [searchParams] = useSearchParams();

    // ── Load calendar data (URL param > state > localStorage) ──
    const calendarData = useMemo(() => {
        // 1. ?data= query param — fully self-contained, works from ANY device (shared link)
        const encoded = searchParams.get('data');
        if (encoded) {
            try {
                return JSON.parse(decodeURIComponent(escape(atob(encoded))));
            } catch (_) { /* corrupt param – fall through */ }
        }
        // 2. React Router state (just navigated from generator on same device)
        if (location.state?.clientData && location.state?.postsData) {
            return location.state;
        }
        // 3. localStorage fallback (same device, refresh without ?data=)
        try {
            const raw = localStorage.getItem(`ch-${clientSlug}-${month}`);
            if (raw) return JSON.parse(raw);
        } catch (_) { }
        return null;
    }, [searchParams, location.state, clientSlug, month]);

    // ── Mobile auto-switch ──
    useEffect(() => {
        const check = () => setViewMode(window.innerWidth < 768 ? 'feed' : 'calendar');
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    if (!calendarData) {
        return <EmptyState onBack={() => navigate('/content-hub/generator')} />;
    }

    const { clientData, postsData } = calendarData;

    return (
        <div className="min-h-screen bg-[#020410]">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-[#020410]/90 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        {/* Back + Título */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/content-hub/generator')}
                                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                                aria-label="Volver al generador"
                            >
                                <ArrowLeft className="w-5 h-5 text-slate-400" />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-white">
                                    {clientData.clientName}
                                </h1>
                                <p className="text-sm text-slate-500">
                                    Calendario Editorial •{' '}
                                    <span className="capitalize text-orange-400">
                                        {formatMonthYear(clientData.month)}
                                    </span>
                                    {clientData.location && (
                                        <span className="text-slate-600"> • {clientData.location}</span>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Toggle Vista (solo desktop) */}
                        <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('calendar')}
                                className={`p-2 rounded-md transition-colors ${viewMode === 'calendar'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                                aria-label="Vista calendario"
                            >
                                <Calendar className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('feed')}
                                className={`p-2 rounded-md transition-colors ${viewMode === 'feed'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                                aria-label="Vista lista"
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Barra de Filtros */}
                <FilterBar
                    filters={filters}
                    onChange={setFilters}
                    postCount={postsData.length}
                />
            </header>

            {/* Contenido Principal */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <AnimatePresence mode="wait">
                    {viewMode === 'calendar' ? (
                        <motion.div
                            key="calendar"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CalendarView
                                posts={postsData}
                                filters={filters}
                                currentMonth={clientData.month}
                                onPostClick={setSelectedPost}
                                onMonthChange={() => { }}
                                isLoading={false}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="feed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FeedView
                                posts={postsData}
                                filters={filters}
                                onPostClick={setSelectedPost}
                                isLoading={false}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Modal de Detalle del Post */}
            <PostModal
                post={selectedPost}
                isOpen={!!selectedPost}
                onClose={() => setSelectedPost(null)}
            />
        </div>
    );
};

export default DynamicContentHub;
