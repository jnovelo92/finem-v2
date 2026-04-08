/**
 * MediaContainer Component
 * Aspect-ratio media display with YouTube thumbnail support
 */

import React from 'react';
import { Play } from 'lucide-react';
import { useYouTubeThumbnail } from '../../hooks/content-hub/useYouTubeThumbnail';
import { isYouTubeUrl } from '../../utils/content-hub/youtubeHelpers';
import StatusBadge from './StatusBadge';

const ASPECT_RATIOS = {
    '1:1': 'aspect-square',
    '4:5': 'aspect-[4/5]',
    '9:16': 'aspect-[9/16]',
    '16:9': 'aspect-video'
};

export const MediaContainer = ({
    post,
    className = '',
    onClick,
    showStatus = true,
    showPlayButton = true
}) => {
    const isVideo = post?.type === 'video';
    const isYouTube = isYouTubeUrl(post?.mediaUrl);
    const { thumbnail, isLoading } = useYouTubeThumbnail(isYouTube ? post.mediaUrl : null);

    // Determine the image source
    const imageSrc = post?.thumbnailOverride || (isYouTube ? thumbnail : post?.mediaUrl);

    if (isLoading && isYouTube) {
        return (
            <div className={`
        animate-pulse bg-gradient-to-br from-white/5 to-white/10
        ${ASPECT_RATIOS[post?.aspectRatio] || 'aspect-video'}
        ${className}
        rounded-lg
      `} />
        );
    }

    return (
        <div
            className={`
        relative overflow-hidden rounded-lg cursor-pointer group
        ${ASPECT_RATIOS[post?.aspectRatio] || 'aspect-video'}
        ${className}
      `}
            onClick={onClick}
        >
            {imageSrc ? (
                <img
                    src={imageSrc}
                    alt={post?.title || 'Post media'}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                    <span className="text-slate-500 text-sm">Sin imagen</span>
                </div>
            )}

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Play icon for videos */}
            {isVideo && showPlayButton && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </div>
                </div>
            )}

            {/* Status badge */}
            {showStatus && post?.status && (
                <div className="absolute top-2 right-2">
                    <StatusBadge status={post.status} size="sm" />
                </div>
            )}
        </div>
    );
};

export default MediaContainer;
