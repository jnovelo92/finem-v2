/**
 * PlatformBadge Component
 * Platform icon badges for social media
 */

import React from 'react';
import { Instagram, Linkedin, Facebook } from 'lucide-react';

// TikTok SVG icon (not in lucide-react)
const TikTokIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
);

const PLATFORM_CONFIG = {
    instagram: {
        icon: Instagram,
        className: 'bg-gradient-to-br from-purple-500 to-pink-500',
        label: 'Instagram'
    },
    tiktok: {
        icon: TikTokIcon,
        className: 'bg-black border border-white/20',
        label: 'TikTok'
    },
    linkedin: {
        icon: Linkedin,
        className: 'bg-[#0077B5]',
        label: 'LinkedIn'
    },
    facebook: {
        icon: Facebook,
        className: 'bg-[#1877F2]',
        label: 'Facebook'
    }
};

const SIZE_CLASSES = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9'
};

const ICON_SIZE_CLASSES = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
};

export const PlatformBadge = ({ platform, size = 'md', showLabel = false }) => {
    const config = PLATFORM_CONFIG[platform];
    if (!config) return null;

    const Icon = config.icon;

    return (
        <div className="flex items-center gap-2">
            <div
                className={`${SIZE_CLASSES[size]} ${config.className} rounded-lg flex items-center justify-center text-white`}
                title={config.label}
            >
                <Icon className={ICON_SIZE_CLASSES[size]} />
            </div>
            {showLabel && (
                <span className="text-sm text-slate-300">{config.label}</span>
            )}
        </div>
    );
};

// Export for filter usage
export const PLATFORMS = Object.keys(PLATFORM_CONFIG);
export const PLATFORM_LABELS = Object.fromEntries(
    Object.entries(PLATFORM_CONFIG).map(([key, val]) => [key, val.label])
);

export default PlatformBadge;
