/**
 * FeedView Component
 * Mobile chronological list view of posts
 */

import React from 'react';
import { FeedPostCard } from './FeedPostCard';
import { SkeletonFeed } from './SkeletonCard';
import { usePostFilters } from '../../hooks/content-hub/usePostFilters';
import { FileX } from 'lucide-react';

export const FeedView = ({ posts, filters, onPostClick, isLoading }) => {
    const { filteredPosts } = usePostFilters(posts, filters);

    if (isLoading) {
        return <SkeletonFeed />;
    }

    if (filteredPosts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <FileX className="w-16 h-16 text-slate-600 mb-4" />
                <h3 className="text-lg font-medium text-slate-400 mb-2">
                    No hay posts
                </h3>
                <p className="text-sm text-slate-500 max-w-sm">
                    {posts.length === 0
                        ? 'No hay contenido programado para este mes.'
                        : 'No hay resultados que coincidan con los filtros aplicados.'}
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredPosts.map(post => (
                <FeedPostCard
                    key={post.id}
                    post={post}
                    onClick={onPostClick}
                />
            ))}
        </div>
    );
};

export default FeedView;
