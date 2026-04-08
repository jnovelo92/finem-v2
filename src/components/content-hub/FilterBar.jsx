/**
 * FilterBar Component
 * Sticky filter bar with platform, status, and search filters
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { Listbox, Transition } from '@headlessui/react';
import { PlatformBadge, PLATFORMS, PLATFORM_LABELS } from './PlatformBadge';

const STATUS_OPTIONS = [
    { value: 'draft', label: 'Borrador' },
    { value: 'scheduled', label: 'Programado' },
    { value: 'published', label: 'Publicado' },
    { value: 'failed', label: 'Error' }
];

export const FilterBar = ({ filters, onChange, postCount = 0 }) => {
    const [searchValue, setSearchValue] = useState(filters.search || '');

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchValue !== filters.search) {
                onChange({ ...filters, search: searchValue });
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchValue]);

    const handlePlatformToggle = useCallback((platform) => {
        const newPlatforms = filters.platforms.includes(platform)
            ? filters.platforms.filter(p => p !== platform)
            : [...filters.platforms, platform];
        onChange({ ...filters, platforms: newPlatforms });
    }, [filters, onChange]);

    const handleStatusToggle = useCallback((status) => {
        const newStatuses = filters.statuses.includes(status)
            ? filters.statuses.filter(s => s !== status)
            : [...filters.statuses, status];
        onChange({ ...filters, statuses: newStatuses });
    }, [filters, onChange]);

    const clearFilters = useCallback(() => {
        setSearchValue('');
        onChange({ platforms: [], statuses: [], search: '' });
    }, [onChange]);

    const hasActiveFilters = filters.platforms.length > 0 ||
        filters.statuses.length > 0 ||
        filters.search.length > 0;

    return (
        <div className="border-t border-white/5 bg-[#020410]/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex flex-wrap items-center gap-3">
                    {/* Search input */}
                    <div className="relative flex-1 min-w-[200px] max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Buscar posts..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-colors"
                        />
                    </div>

                    {/* Platform filter */}
                    <div className="relative">
                        <Listbox>
                            {({ open }) => (
                                <>
                                    <Listbox.Button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300 hover:bg-white/10 transition-colors">
                                        <Filter className="w-4 h-4" />
                                        <span>Plataforma</span>
                                        {filters.platforms.length > 0 && (
                                            <span className="px-1.5 py-0.5 bg-orange-500 text-white text-xs rounded-full">
                                                {filters.platforms.length}
                                            </span>
                                        )}
                                        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Listbox.Options static className="absolute z-50 mt-2 w-48 bg-[#0a0d1a] border border-white/10 rounded-lg shadow-xl overflow-hidden">
                                            {PLATFORMS.map(platform => (
                                                <button
                                                    key={platform}
                                                    onClick={() => handlePlatformToggle(platform)}
                                                    className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm transition-colors ${filters.platforms.includes(platform)
                                                            ? 'bg-orange-500/20 text-white'
                                                            : 'text-slate-300 hover:bg-white/5'
                                                        }`}
                                                >
                                                    <PlatformBadge platform={platform} size="sm" />
                                                    <span>{PLATFORM_LABELS[platform]}</span>
                                                </button>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </>
                            )}
                        </Listbox>
                    </div>

                    {/* Status filter */}
                    <div className="relative">
                        <Listbox>
                            {({ open }) => (
                                <>
                                    <Listbox.Button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300 hover:bg-white/10 transition-colors">
                                        <span>Estado</span>
                                        {filters.statuses.length > 0 && (
                                            <span className="px-1.5 py-0.5 bg-orange-500 text-white text-xs rounded-full">
                                                {filters.statuses.length}
                                            </span>
                                        )}
                                        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Listbox.Options static className="absolute z-50 mt-2 w-40 bg-[#0a0d1a] border border-white/10 rounded-lg shadow-xl overflow-hidden">
                                            {STATUS_OPTIONS.map(({ value, label }) => (
                                                <button
                                                    key={value}
                                                    onClick={() => handleStatusToggle(value)}
                                                    className={`w-full px-3 py-2 text-left text-sm transition-colors ${filters.statuses.includes(value)
                                                            ? 'bg-orange-500/20 text-white'
                                                            : 'text-slate-300 hover:bg-white/5'
                                                        }`}
                                                >
                                                    {label}
                                                </button>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </>
                            )}
                        </Listbox>
                    </div>

                    {/* Clear filters */}
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-1 px-3 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                            Limpiar
                        </button>
                    )}

                    {/* Post count */}
                    <div className="ml-auto text-sm text-slate-500">
                        {postCount} post{postCount !== 1 ? 's' : ''}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
