/**
 * ContentHubGenerator
 * Panel público para generar calendarios editoriales.
 * Genera una página idéntica a OrganicNailsContentHub a partir de datos ingresados.
 */

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Trash2, ArrowLeft, Sparkles, Calendar, Link,
    Type, AlignLeft, Tag, ChevronDown, AlertCircle, CheckCircle2
} from 'lucide-react';

// ── Helpers ──────────────────────────────────────────────────────────────────

const slugify = (str) =>
    str
        .toLowerCase()
        .trim()
        .replace(/[áàä]/g, 'a')
        .replace(/[éèë]/g, 'e')
        .replace(/[íìï]/g, 'i')
        .replace(/[óòö]/g, 'o')
        .replace(/[úùü]/g, 'u')
        .replace(/ñ/g, 'n')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

const POST_TYPES = [
    { value: 'video', label: 'Video', emoji: '🎬' },
    { value: 'image', label: 'Imagen', emoji: '🖼️' },
    { value: 'carousel', label: 'Carrusel', emoji: '🎠' },
    { value: 'reel', label: 'Reel', emoji: '📽️' },
];

const EMPTY_POST = {
    title: '',
    caption: '',
    mediaUrl: '',
    type: 'video',
    scheduledAt: '',
};

// ── Sub-components ────────────────────────────────────────────────────────────

const FieldLabel = ({ icon: Icon, children, required }) => (
    <label className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">
        {Icon && <Icon className="w-3.5 h-3.5 text-orange-400/80" />}
        {children}
        {required && <span className="text-orange-400 ml-0.5">*</span>}
    </label>
);

const InputField = ({ ...props }) => (
    <input
        {...props}
        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-orange-500/60 focus:bg-white/[0.07] transition-all duration-200"
    />
);

const TextareaField = ({ ...props }) => (
    <textarea
        {...props}
        rows={5}
        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-orange-500/60 focus:bg-white/[0.07] transition-all duration-200 resize-none leading-relaxed"
    />
);

const SelectField = ({ value, onChange, options }) => (
    <div className="relative">
        <select
            value={value}
            onChange={onChange}
            className="w-full appearance-none bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/60 transition-all duration-200 cursor-pointer pr-10"
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#0a0d1a]">
                    {opt.emoji} {opt.label}
                </option>
            ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
    </div>
);

// ── Post Card ─────────────────────────────────────────────────────────────────

const PostCard = ({ post, index, onChange, onRemove, total }) => {
    const updateField = useCallback(
        (field, val) => onChange(index, { ...post, [field]: val }),
        [index, onChange, post]
    );

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 group hover:border-white/[0.12] transition-colors duration-300"
        >
            {/* Post header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm">
                        {index + 1}
                    </div>
                    <span className="text-slate-400 text-sm font-medium">
                        {post.title || 'Post sin título'}
                    </span>
                </div>
                {total > 1 && (
                    <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="p-2 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                        title="Eliminar post"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Título */}
                <div className="md:col-span-2">
                    <FieldLabel icon={Type} required>Título</FieldLabel>
                    <InputField
                        type="text"
                        placeholder="Ej. Ritual de Amor Propio"
                        value={post.title}
                        onChange={(e) => updateField('title', e.target.value)}
                    />
                </div>

                {/* URL del Video */}
                <div className="md:col-span-2">
                    <FieldLabel icon={Link}>URL del Video</FieldLabel>
                    <InputField
                        type="url"
                        placeholder="https://youtube.com/shorts/..."
                        value={post.mediaUrl}
                        onChange={(e) => updateField('mediaUrl', e.target.value)}
                    />
                </div>

                {/* Tipo */}
                <div>
                    <FieldLabel icon={Tag}>Tipo de Publicación</FieldLabel>
                    <SelectField
                        value={post.type}
                        onChange={(e) => updateField('type', e.target.value)}
                        options={POST_TYPES}
                    />
                </div>

                {/* Fecha */}
                <div>
                    <FieldLabel icon={Calendar} required>Fecha de Publicación</FieldLabel>
                    <input
                        type="datetime-local"
                        value={post.scheduledAt}
                        onChange={(e) => updateField('scheduledAt', e.target.value)}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/60 focus:bg-white/[0.07] transition-all duration-200 [color-scheme:dark]"
                    />
                </div>

                {/* Caption */}
                <div className="md:col-span-2">
                    <FieldLabel icon={AlignLeft}>Caption</FieldLabel>
                    <TextareaField
                        placeholder={`Escribe el caption aquí...\n\nSoporta emojis 🎀 y saltos de línea.\n\n#Hashtags #Caption`}
                        value={post.caption}
                        onChange={(e) => updateField('caption', e.target.value)}
                    />
                </div>
            </div>
        </motion.div>
    );
};

// ── Main Component ────────────────────────────────────────────────────────────

const ContentHubGenerator = () => {
    const navigate = useNavigate();

    const [clientName, setClientName] = useState('');
    const [month, setMonth] = useState('');
    const [location, setLocation] = useState('');
    const [posts, setPosts] = useState([{ ...EMPTY_POST }]);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // ── Post mutations ──
    const handlePostChange = useCallback((index, updated) => {
        setPosts((prev) => prev.map((p, i) => (i === index ? updated : p)));
    }, []);

    const addPost = useCallback(() => {
        setPosts((prev) => [...prev, { ...EMPTY_POST }]);
    }, []);

    const removePost = useCallback((index) => {
        setPosts((prev) => prev.filter((_, i) => i !== index));
    }, []);

    // ── Validation ──
    const validate = () => {
        const errs = {};
        if (!clientName.trim()) errs.clientName = 'El nombre del cliente es obligatorio.';
        if (!month) errs.month = 'Elige el mes del calendario.';

        posts.forEach((p, i) => {
            if (!p.title.trim()) errs[`post_${i}_title`] = 'Título requerido.';
            if (!p.scheduledAt) errs[`post_${i}_date`] = 'Fecha requerida.';
        });

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    // ── Submit ──
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        setSubmitting(true);

        const clientSlug = slugify(clientName);
        const [year, mon] = month.split('-');
        const monthSlug = `${year}-${mon}`;

        const postsData = posts.map((p, i) => ({
            id: `${clientSlug}-${String(i + 1).padStart(3, '0')}`,
            title: p.title,
            type: p.type,
            platform: 'instagram',
            status: 'scheduled',
            scheduledAt: p.scheduledAt ? new Date(p.scheduledAt).toISOString() : null,
            publishedAt: null,
            mediaUrl: p.mediaUrl,
            caption: p.caption,
            feedback: { hasFeedback: false, lastComment: null },
        }));

        const calendarData = {
            clientData: {
                clientName: clientName.trim(),
                month: monthSlug,
                location: location.trim() || '',
            },
            postsData,
        };

        // Encode as Base64 so the URL is self-contained and shareable from any device
        const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(calendarData))));

        // Also keep localStorage as a quick local fallback
        try {
            localStorage.setItem(`ch-${clientSlug}-${monthSlug}`, JSON.stringify(calendarData));
        } catch (_) { /* quota exceeded – ignore */ }

        // Navigate – the ?data= param makes the URL publicly shareable
        navigate(`/content-hub/${clientSlug}/${monthSlug}?data=${encoded}`, {
            state: calendarData,
        });
    };

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <div className="min-h-screen bg-[#020410]">
            {/* Ambient glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute -top-1/3 -left-1/4 w-[60vw] h-[60vw] rounded-full opacity-[0.07]"
                    style={{
                        background:
                            'radial-gradient(circle at 40% 40%, rgba(249,115,22,0.9) 0%, rgba(234,88,12,0.4) 30%, transparent 70%)',
                    }}
                />
                <div
                    className="absolute -bottom-1/3 -right-1/4 w-[50vw] h-[50vw] rounded-full opacity-[0.05]"
                    style={{
                        background:
                            'radial-gradient(circle at 60% 60%, rgba(124,58,237,0.9) 0%, transparent 70%)',
                    }}
                />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-40 bg-[#020410]/90 backdrop-blur-xl border-b border-white/[0.06]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-400 hover:text-white"
                        aria-label="Volver al inicio"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold text-white flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-orange-400" />
                            Generador de Calendario Editorial
                        </h1>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Completa los datos y genera un calendario idéntico al formato Finem
                        </p>
                    </div>
                </div>
            </header>

            {/* Form */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
                <form onSubmit={handleSubmit} noValidate>

                    {/* ── Validation Banner ── */}
                    <AnimatePresence>
                        {hasErrors && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-start gap-3"
                            >
                                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-red-400 font-semibold text-sm">Corrige los campos marcados antes de continuar.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── Section: Datos del Cliente ── */}
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px flex-1 bg-white/[0.06]" />
                            <span className="text-xs font-bold tracking-[0.2em] text-orange-400 uppercase">
                                Datos del Cliente
                            </span>
                            <div className="h-px flex-1 bg-white/[0.06]" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
                            <div className="md:col-span-2">
                                <FieldLabel icon={Type} required>Nombre del Cliente</FieldLabel>
                                <InputField
                                    type="text"
                                    placeholder="Ej. Organic Nails"
                                    value={clientName}
                                    onChange={(e) => { setClientName(e.target.value); setErrors((prev) => { const e2 = { ...prev }; delete e2.clientName; return e2; }); }}
                                />
                                {errors.clientName && (
                                    <p className="mt-1.5 text-xs text-red-400">{errors.clientName}</p>
                                )}
                            </div>

                            <div>
                                <FieldLabel icon={Calendar} required>Mes del Calendario</FieldLabel>
                                <input
                                    type="month"
                                    value={month}
                                    onChange={(e) => { setMonth(e.target.value); setErrors((prev) => { const e2 = { ...prev }; delete e2.month; return e2; }); }}
                                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/60 transition-all duration-200 [color-scheme:dark]"
                                />
                                {errors.month && (
                                    <p className="mt-1.5 text-xs text-red-400">{errors.month}</p>
                                )}
                            </div>

                            <div className="md:col-span-3">
                                <FieldLabel>Ciudad / Ubicación</FieldLabel>
                                <InputField
                                    type="text"
                                    placeholder="Ej. Cancún"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                        </div>
                    </section>

                    {/* ── Section: Posts ── */}
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px flex-1 bg-white/[0.06]" />
                            <span className="text-xs font-bold tracking-[0.2em] text-orange-400 uppercase">
                                Posts del Calendario
                            </span>
                            <div className="h-px flex-1 bg-white/[0.06]" />
                        </div>

                        <div className="space-y-4">
                            <AnimatePresence initial={false}>
                                {posts.map((post, index) => (
                                    <PostCard
                                        key={index}
                                        post={post}
                                        index={index}
                                        total={posts.length}
                                        onChange={handlePostChange}
                                        onRemove={removePost}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Post validation errors summary */}
                        {posts.some((_, i) => errors[`post_${i}_title`] || errors[`post_${i}_date`]) && (
                            <p className="mt-3 text-xs text-red-400 flex items-center gap-1.5">
                                <AlertCircle className="w-3.5 h-3.5" />
                                Algunos posts tienen campos obligatorios incompletos (título y fecha).
                            </p>
                        )}

                        {/* Add Post Button */}
                        <motion.button
                            type="button"
                            onClick={addPost}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-4 w-full py-4 border border-dashed border-white/15 rounded-2xl text-slate-500 hover:text-orange-400 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
                        >
                            <Plus className="w-4 h-4" />
                            Añadir otro post
                        </motion.button>
                    </section>

                    {/* ── Submit ── */}
                    <div className="flex flex-col items-center gap-4 pt-2 pb-16">
                        <motion.button
                            type="submit"
                            disabled={submitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="relative px-12 py-4 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-2xl text-sm tracking-wider shadow-lg shadow-orange-500/25 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-3"
                        >
                            {submitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Generando…
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="w-5 h-5" />
                                    Generar Calendario
                                </>
                            )}
                            {/* Glow */}
                            <div className="absolute inset-0 rounded-2xl bg-orange-400/20 blur-xl -z-10" />
                        </motion.button>

                        <p className="text-xs text-slate-600 text-center max-w-xs">
                            Se generará una página pública compartible con el calendario editorial completo.
                        </p>
                    </div>

                </form>
            </main>
        </div>
    );
};

export default ContentHubGenerator;
