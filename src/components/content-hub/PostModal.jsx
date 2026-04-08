/**
 * PostModal Component
 * Solución final: Uso de iframe nativo para garantizar compatibilidad absoluta
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MessageSquare, ExternalLink } from 'lucide-react';
import { PlatformBadge } from './PlatformBadge';
import { StatusBadge } from './StatusBadge';
import { formatDateShort } from '../../utils/content-hub/dateHelpers';

// Helper: Extrae el ID del video de cualquier formato de URL de YouTube
const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;

    // Regex poderosa para sacar el ID (funciona con shorts, watch, youtu.be)
    const match = url.match(/(?:shorts\/|v=|youtu\.be\/|\/embed\/)([\w-]{11})/);
    const videoId = match ? match[1] : null;

    if (videoId) {
        // Retornamos la URL de embed directa
        // ?autoplay=1 -> Reproduce automático (opcional)
        // &rel=0 -> No muestra videos relacionados de otros canales
        // &modestbranding=1 -> Menos logos de YouTube
        return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&playsinline=1`;
    }
    return null;
};

export const PostModal = ({ post, isOpen, onClose }) => {
    // Detección de video y tipo
    const isVideo = post?.type === 'video';
    const isVertical = post?.mediaUrl?.includes('/shorts/') || post?.platform === 'tiktok' || post?.platform === 'instagram';

    // Obtenemos la URL de embed
    const embedUrl = getYoutubeEmbedUrl(post?.mediaUrl);

    // Cerrar con ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Bloquear scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!post) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
                    />

                    {/* Modal Contenedor */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-6xl md:w-[95vw] md:h-[85vh] bg-[#0a0d1a] rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col md:flex-row border border-white/10"
                    >
                        {/* SECCIÓN MULTIMEDIA (Izquierda) */}
                        <div className="relative w-full md:w-3/5 bg-black flex items-center justify-center min-h-[300px] md:h-full overflow-hidden group">

                            {/* Botón cerrar flotante (Móvil) */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 md:hidden p-2 bg-black/50 rounded-full text-white z-20"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {isVideo && embedUrl ? (
                                <div
                                    className="relative flex items-center justify-center"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    {/* IFRAME NATIVO - ESTO NO FALLA */}
                                    <iframe
                                        src={embedUrl}
                                        title={post.title}
                                        className="rounded-lg shadow-xl"
                                        style={{
                                            // Ajuste dinámico de tamaño según si es Short o Video normal
                                            width: isVertical ? 'auto' : '100%',
                                            height: isVertical ? '95%' : 'auto',
                                            aspectRatio: isVertical ? '9/16' : '16/9',
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            border: 'none'
                                        }}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            ) : (
                                <img
                                    src={post?.mediaUrl}
                                    alt={post?.title}
                                    className="w-full h-full object-contain"
                                />
                            )}
                        </div>

                        {/* SECCIÓN INFORMACIÓN (Derecha) */}
                        <div className="w-full md:w-2/5 flex flex-col h-full bg-[#0a0d1a] border-l border-white/5">
                            {/* Header */}
                            <div className="p-6 border-b border-white/5 flex justify-between items-start shrink-0">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <PlatformBadge platform={post.platform} size="sm" />
                                        <StatusBadge status={post.status} size="sm" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white line-clamp-2">{post.title}</h3>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="hidden md:flex p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                                <div className="prose prose-invert prose-sm max-w-none">
                                    <p className="text-slate-300 whitespace-pre-wrap font-light leading-relaxed text-sm">
                                        {post.caption}
                                    </p>
                                </div>
                                {/* Metadata */}
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5 grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Programado</p>
                                        <div className="flex items-center gap-2 text-slate-300 text-sm">
                                            <Calendar className="w-4 h-4" />
                                            {formatDateShort(post.scheduledAt)}
                                        </div>
                                    </div>
                                    {post.publishedAt && (
                                        <div>
                                            <p className="text-xs text-green-500/70 uppercase font-bold mb-1">Publicado</p>
                                            <div className="flex items-center gap-2 text-green-400 text-sm">
                                                <Clock className="w-4 h-4" />
                                                {formatDateShort(post.publishedAt)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* Feedback */}
                                {post.feedback?.hasFeedback && (
                                    <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                                        <p className="text-orange-400 text-xs font-bold mb-2 flex items-center gap-2">
                                            <MessageSquare className="w-3 h-3" /> FEEDBACK
                                        </p>
                                        <p className="text-slate-300 text-sm italic">"{post.feedback.lastComment}"</p>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {isVideo && (
                                <div className="p-4 border-t border-white/5 bg-[#080a14] shrink-0">
                                    <a
                                        href={post.mediaUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg transition-all text-sm font-medium border border-white/5 hover:border-white/10"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Abrir en YouTube
                                    </a>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default PostModal;