/**
 * FeedPostCard Component
 * Fix: Extracción nativa de thumbnails y reemplazo de MediaContainer
 */

import React from 'react';
import { Calendar, MessageSquare, Play, Image as ImageIcon } from 'lucide-react';
// import { MediaContainer } from './MediaContainer'; // Lo reemplazamos por implementación directa
import { PlatformBadge } from './PlatformBadge';
import { StatusBadge } from './StatusBadge';
import { formatDateShort } from '../../../../utils/content-hub/dateHelpers';

// Helper: Extrae la miniatura de alta calidad de YouTube
const getYouTubeThumbnail = (url) => {
    if (!url) return null;
    // Regex que detecta Shorts, Videos normales y youtu.be
    const match = url.match(/(?:shorts\/|v=|youtu\.be\/|\/embed\/)([\w-]{11})/);
    // Retorna la imagen hqdefault (Alta calidad)
    if (match && match[1]) {
        return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
    return url; // Fallback si es una imagen normal
};

export const FeedPostCard = ({ post, onClick }) => {
    const isVideo = post.type === 'video';
    const thumbnailUrl = getYouTubeThumbnail(post.mediaUrl);

    return (
        <div
            onClick={() => onClick?.(post)}
            className="bg-[#0a0d1a] rounded-2xl overflow-hidden border border-white/5 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all cursor-pointer group flex flex-col h-full"
        >
            {/* ZONA DE MEDIA (Reemplazo de MediaContainer) */}
            <div className="relative aspect-video w-full bg-black overflow-hidden">
                {thumbnailUrl ? (
                    <img
                        src={thumbnailUrl}
                        alt={post.title}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        onError={(e) => {
                            e.target.style.display = 'none'; // Ocultar si falla la carga
                            e.target.nextSibling.style.display = 'flex'; // Mostrar placeholder
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                        <ImageIcon className="w-8 h-8 text-slate-700" />
                    </div>
                )}

                {/* Overlay del botón Play (Solo visual) */}
                {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300 shadow-lg">
                            <Play className="w-4 h-4 text-white fill-current ml-0.5" />
                        </div>
                    </div>
                )}
            </div>

            {/* CONTENIDO DE TEXTO */}
            <div className="p-4 space-y-3 flex-1 flex flex-col">
                {/* Header with platform and status */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <PlatformBadge platform={post.platform} size="md" />
                        <StatusBadge status={post.status} size="md" />
                    </div>

                    {/* Feedback indicator */}
                    {post.feedback?.hasFeedback && (
                        <div className="flex items-center gap-1 text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded text-xs font-medium border border-orange-500/20">
                            <MessageSquare className="w-3 h-3" />
                            <span>Feedback</span>
                        </div>
                    )}
                </div>

                {/* Title */}
                <h3 className="font-medium text-white group-hover:text-orange-400 transition-colors line-clamp-1 text-lg">
                    {post.title}
                </h3>

                {/* Caption preview */}
                <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed flex-1">
                    {post.caption}
                </p>

                {/* Date Footer */}
                <div className="pt-3 mt-auto border-t border-white/5 flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDateShort(post.scheduledAt)}</span>
                </div>
            </div>
        </div>
    );
};

export default FeedPostCard;