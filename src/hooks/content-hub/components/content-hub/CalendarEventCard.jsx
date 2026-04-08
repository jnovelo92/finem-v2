/**
 * CalendarEventCard Component
 * Compact card for calendar cell display
 */

import React from 'react';
import { PlatformBadge } from './PlatformBadge';
import { StatusBadge } from './StatusBadge';

export const CalendarEventCard = ({ post, onClick }) => {
    return (
        <button
            onClick={() => onClick?.(post)}
            className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
        >
            <div className="flex items-center gap-2 mb-1">
                <PlatformBadge platform={post.platform} size="sm" />
                <StatusBadge status={post.status} size="sm" />
            </div>
            <p className="text-xs text-slate-300 truncate group-hover:text-white transition-colors">
                {post.title}
            </p>
        </button>
    );
};

export default CalendarEventCard;
