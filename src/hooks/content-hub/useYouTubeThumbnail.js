/**
 * useYouTubeThumbnail Hook
 * Loads YouTube thumbnails with quality fallback
 */

import { useState, useEffect } from 'react';
import { extractYouTubeId, getYouTubeThumbnailUrl } from '../../utils/content-hub/youtubeHelpers';

const THUMBNAIL_QUALITIES = [
    'maxresdefault', // 1920x1080
    'sddefault',     // 640x480
    'hqdefault',     // 480x360
    'mqdefault'      // 320x180
];

/**
 * Hook to load YouTube thumbnail with fallback through quality levels
 * @param {string} videoUrl - YouTube URL or video ID
 * @returns {{ thumbnail: string|null, isLoading: boolean, error: string|null }}
 */
export const useYouTubeThumbnail = (videoUrl) => {
    const [thumbnail, setThumbnail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const videoId = extractYouTubeId(videoUrl);

    useEffect(() => {
        if (!videoId) {
            setIsLoading(false);
            setThumbnail(null);
            return;
        }

        let cancelled = false;

        const loadThumbnail = async () => {
            setIsLoading(true);
            setError(null);

            for (const quality of THUMBNAIL_QUALITIES) {
                if (cancelled) return;

                const url = getYouTubeThumbnailUrl(videoId, quality);

                try {
                    // Check if image exists and is valid (not YouTube's placeholder)
                    const valid = await new Promise((resolve) => {
                        const img = new Image();
                        img.onload = () => {
                            // YouTube's placeholder is 120x90, valid thumbnails are larger
                            resolve(img.width > 120);
                        };
                        img.onerror = () => resolve(false);
                        img.src = url;
                    });

                    if (valid && !cancelled) {
                        setThumbnail(url);
                        setIsLoading(false);
                        return;
                    }
                } catch {
                    continue;
                }
            }

            if (!cancelled) {
                setError('No thumbnail available');
                setThumbnail(null);
                setIsLoading(false);
            }
        };

        loadThumbnail();

        return () => {
            cancelled = true;
        };
    }, [videoId]);

    return { thumbnail, isLoading, error, videoId };
};

export default useYouTubeThumbnail;
