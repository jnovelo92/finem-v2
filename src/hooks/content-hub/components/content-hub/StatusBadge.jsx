/**
 * StatusBadge Component
 * Visual indicator for post status
 */

import React from 'react';

const STATUS_CONFIG = {
    draft: {
        label: 'Borrador',
        className: 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    },
    scheduled: {
        label: 'Programado',
        className: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    },
    published: {
        label: 'Publicado',
        className: 'bg-green-500/20 text-green-400 border-green-500/30'
    },
    failed: {
        label: 'Error',
        className: 'bg-red-500/20 text-red-400 border-red-500/30'
    }
};

const SIZE_CLASSES = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-3 py-1.5'
};

export const StatusBadge = ({ status, size = 'md' }) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.draft;

    return (
        <span className={`
      inline-flex items-center font-medium rounded-full border
      ${config.className}
      ${SIZE_CLASSES[size]}
    `}>
            {config.label}
        </span>
    );
};

export default StatusBadge;
