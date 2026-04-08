/**
 * SkeletonCard Component
 * Loading skeleton for cards
 */

import React from 'react';

export const SkeletonCard = ({ variant = 'card' }) => {
    if (variant === 'calendar') {
        return (
            <div className="animate-pulse p-2 rounded-lg bg-white/5">
                <div className="h-16 bg-white/10 rounded-md mb-2" />
                <div className="h-3 bg-white/10 rounded w-3/4" />
            </div>
        );
    }

    return (
        <div className="animate-pulse bg-white/5 rounded-2xl overflow-hidden">
            {/* Media skeleton */}
            <div className="aspect-square bg-white/10" />

            {/* Content skeleton */}
            <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-white/10 rounded-lg" />
                    <div className="w-16 h-5 bg-white/10 rounded-full" />
                </div>
                <div className="h-4 bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-white/10 rounded w-full" />
                <div className="h-3 bg-white/10 rounded w-2/3" />
            </div>
        </div>
    );
};

export const SkeletonCalendar = () => {
    return (
        <div className="animate-pulse space-y-4">
            {/* Header skeleton */}
            <div className="flex justify-between items-center">
                <div className="h-8 w-40 bg-white/10 rounded" />
                <div className="flex gap-2">
                    <div className="h-8 w-8 bg-white/10 rounded" />
                    <div className="h-8 w-8 bg-white/10 rounded" />
                </div>
            </div>

            {/* Calendar grid skeleton */}
            <div className="grid grid-cols-7 gap-2">
                {/* Day headers */}
                {Array.from({ length: 7 }).map((_, i) => (
                    <div key={`header-${i}`} className="h-8 bg-white/5 rounded" />
                ))}

                {/* Calendar cells */}
                {Array.from({ length: 35 }).map((_, i) => (
                    <div key={`cell-${i}`} className="h-24 bg-white/5 rounded-lg" />
                ))}
            </div>
        </div>
    );
};

export const SkeletonFeed = () => {
    return (
        <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
};

export default SkeletonCard;
