/**
 * usePostFilters Hook
 * Applies filters to posts array
 */

import { useMemo, useCallback } from 'react';

/**
 * Hook to filter posts by platform, status, and search query
 * @param {Array} posts - Array of post objects
 * @param {Object} filters - { platforms: string[], statuses: string[], search: string }
 * @returns {{ filteredPosts: Array, matchCount: number }}
 */
export const usePostFilters = (posts, filters) => {
    const filteredPosts = useMemo(() => {
        if (!posts || !Array.isArray(posts)) return [];

        return posts.filter(post => {
            // Filter by platforms
            if (filters.platforms?.length > 0) {
                if (!filters.platforms.includes(post.platform)) return false;
            }

            // Filter by statuses
            if (filters.statuses?.length > 0) {
                if (!filters.statuses.includes(post.status)) return false;
            }

            // Filter by search query
            if (filters.search?.trim()) {
                const query = filters.search.toLowerCase().trim();
                const matchesTitle = post.title?.toLowerCase().includes(query);
                const matchesCaption = post.caption?.toLowerCase().includes(query);
                if (!matchesTitle && !matchesCaption) return false;
            }

            return true;
        });
    }, [posts, filters.platforms, filters.statuses, filters.search]);

    const matchCount = filteredPosts.length;

    return { filteredPosts, matchCount };
};

/**
 * Hook to manage filter state with debounced search
 */
export const useFilterState = () => {
    const initialFilters = {
        platforms: [],
        statuses: [],
        search: ''
    };

    return initialFilters;
};

export default usePostFilters;
