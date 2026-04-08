/**
 * useContentPosts Hook
 * Fetches content posts for a client and month
 */

import { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://api.finem.agency';

// Client slug to ID mapping (temporary until real API)
const CLIENT_SLUGS = {
    'rebhinder': { id: 'client_001', name: 'Rebhinder' },
    'otro-cliente': { id: 'client_002', name: 'Otro Cliente' }
};

/**
 * Generate mock posts for development
 */
const generateMockPosts = (clientId, month) => {
    const [year, monthNum] = month.split('-').map(Number);
    const daysInMonth = new Date(year, monthNum, 0).getDate();

    const platforms = ['instagram', 'tiktok', 'linkedin', 'facebook'];
    const types = ['video', 'image', 'carousel'];
    const statuses = ['draft', 'scheduled', 'published'];
    const aspectRatios = ['1:1', '4:5', '9:16', '16:9'];

    const mockPosts = [];

    // Generate 15-25 posts for the month
    const postCount = Math.floor(Math.random() * 10) + 15;

    for (let i = 0; i < postCount; i++) {
        const day = Math.floor(Math.random() * daysInMonth) + 1;
        const hour = Math.floor(Math.random() * 12) + 8;
        const platform = platforms[Math.floor(Math.random() * platforms.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];

        mockPosts.push({
            id: `post_${i + 1}`,
            clientId,
            title: `Post ${i + 1} - ${platform.charAt(0).toUpperCase() + platform.slice(1)}`,
            caption: `Este es el contenido del post ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. #marketing #contenido #${platform}`,
            scheduledAt: new Date(year, monthNum - 1, day, hour, 0).toISOString(),
            publishedAt: status === 'published'
                ? new Date(year, monthNum - 1, day, hour, 5).toISOString()
                : null,
            platform,
            type,
            aspectRatio: type === 'video' && platform === 'tiktok'
                ? '9:16'
                : aspectRatios[Math.floor(Math.random() * aspectRatios.length)],
            mediaUrl: type === 'video'
                ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                : `https://picsum.photos/seed/${i}/800/800`,
            thumbnailOverride: null,
            status,
            feedback: Math.random() > 0.7 ? {
                hasFeedback: true,
                lastComment: 'Por favor ajustar el copy del CTA final.'
            } : { hasFeedback: false, lastComment: null },
            createdBy: 'Finem Team'
        });
    }

    // Sort by scheduled date
    return mockPosts.sort((a, b) =>
        new Date(a.scheduledAt) - new Date(b.scheduledAt)
    );
};

/**
 * Hook to fetch content posts
 * @param {string} clientSlug - Client URL slug
 * @param {string} month - Month in YYYY-MM format
 * @returns {{ posts: Array, isLoading: boolean, error: string|null, clientName: string }}
 */
export const useContentPosts = (clientSlug, month) => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const clientData = CLIENT_SLUGS[clientSlug?.toLowerCase()];

    useEffect(() => {
        let cancelled = false;

        const fetchPosts = async () => {
            if (!clientData || !month) {
                setError('Cliente o mes no válido');
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                // In production, uncomment this:
                // const response = await fetch(
                //   `${API_BASE}/content?clientId=${clientData.id}&month=${month}`
                // );
                // if (!response.ok) throw new Error('Error fetching posts');
                // const data = await response.json();

                // Mock data for development
                const mockPosts = generateMockPosts(clientData.id, month);

                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 600));

                if (!cancelled) {
                    setPosts(mockPosts);
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message);
                    setPosts([]);
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        };

        fetchPosts();

        return () => {
            cancelled = true;
        };
    }, [clientSlug, month, clientData]);

    return {
        posts,
        isLoading,
        error,
        clientName: clientData?.name || clientSlug,
        clientId: clientData?.id
    };
};

export default useContentPosts;
