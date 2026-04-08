/**
 * YouTube Helper Utilities
 * Extract video IDs and handle YouTube URL parsing
 */

/**
 * Extract YouTube video ID from various URL formats
 * @param {string} url - YouTube URL or direct video ID
 * @returns {string|null} - Video ID or null if not found
 */
export const extractYouTubeId = (url) => {
    if (!url) return null;

    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /^([a-zA-Z0-9_-]{11})$/ // Direct ID
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }

    return null;
};

/**
 * Get YouTube thumbnail URL for a video ID
 * @param {string} videoId - YouTube video ID
 * @param {string} quality - Thumbnail quality (maxresdefault, sddefault, hqdefault, mqdefault)
 * @returns {string} - Thumbnail URL
 */
export const getYouTubeThumbnailUrl = (videoId, quality = 'maxresdefault') => {
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};

/**
 * Check if a URL is a YouTube video
 * @param {string} url - URL to check
 * @returns {boolean}
 */
export const isYouTubeUrl = (url) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
};