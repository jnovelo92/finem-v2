/**
 * CalendarView Component
 * Desktop calendar grid view using react-big-calendar
 */

import React, { useMemo, useCallback } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, FileX } from 'lucide-react';
import { CalendarEventCard } from './CalendarEventCard';
import { SkeletonCalendar } from './SkeletonCard';
import { usePostFilters } from '../../hooks/content-hub/usePostFilters';
import { getPreviousMonth, getNextMonth, formatMonthYear } from '../../utils/content-hub/dateHelpers';

// react-big-calendar localizer setup
const locales = { es };
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { locale: es }),
    getDay,
    locales,
});

// Custom toolbar for navigation
const CustomToolbar = ({ label, onNavigate, onPrevMonth, onNextMonth }) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white capitalize">{label}</h2>
            <div className="flex items-center gap-2">
                <button
                    onClick={onPrevMonth}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                    aria-label="Mes anterior"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={() => onNavigate('TODAY')}
                    className="px-3 py-1.5 text-sm bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-slate-300"
                >
                    Hoy
                </button>
                <button
                    onClick={onNextMonth}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                    aria-label="Siguiente mes"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

// Custom day cell
const CustomDateCellWrapper = ({ children, value, posts, onPostClick }) => {
    const dayPosts = posts.filter(post => {
        const postDate = parseISO(post.scheduledAt);
        return format(postDate, 'yyyy-MM-dd') === format(value, 'yyyy-MM-dd');
    });

    const displayPosts = dayPosts.slice(0, 2);
    const moreCount = dayPosts.length - 2;

    return (
        <div className="h-full min-h-[100px] p-1 bg-white/[0.02] border border-white/5 rounded-lg">
            <div className="text-xs text-slate-500 mb-1 px-1">
                {format(value, 'd')}
            </div>
            <div className="space-y-1">
                {displayPosts.map(post => (
                    <CalendarEventCard
                        key={post.id}
                        post={post}
                        onClick={onPostClick}
                    />
                ))}
                {moreCount > 0 && (
                    <button className="w-full text-xs text-orange-400 hover:text-orange-300 py-1 transition-colors">
                        +{moreCount} más
                    </button>
                )}
            </div>
        </div>
    );
};

export const CalendarView = ({
    posts,
    filters,
    currentMonth,
    onPostClick,
    onMonthChange,
    isLoading
}) => {
    const { filteredPosts } = usePostFilters(posts, filters);

    // Parse current month to Date
    const currentDate = useMemo(() => {
        const [year, month] = currentMonth.split('-').map(Number);
        return new Date(year, month - 1, 1);
    }, [currentMonth]);

    // Convert posts to calendar events
    const events = useMemo(() => {
        return filteredPosts.map(post => ({
            id: post.id,
            title: post.title,
            start: parseISO(post.scheduledAt),
            end: parseISO(post.scheduledAt),
            resource: post,
        }));
    }, [filteredPosts]);

    const handlePrevMonth = useCallback(() => {
        onMonthChange(getPreviousMonth(currentMonth));
    }, [currentMonth, onMonthChange]);

    const handleNextMonth = useCallback(() => {
        onMonthChange(getNextMonth(currentMonth));
    }, [currentMonth, onMonthChange]);

    if (isLoading) {
        return <SkeletonCalendar />;
    }

    if (posts.length === 0) {
        return (
            <div>
                <CustomToolbar
                    label={formatMonthYear(currentMonth)}
                    onNavigate={() => { }}
                    onPrevMonth={handlePrevMonth}
                    onNextMonth={handleNextMonth}
                />
                <div className="flex flex-col items-center justify-center py-20 text-center border border-white/5 rounded-xl bg-white/[0.02]">
                    <FileX className="w-16 h-16 text-slate-600 mb-4" />
                    <h3 className="text-lg font-medium text-slate-400 mb-2">
                        No hay posts
                    </h3>
                    <p className="text-sm text-slate-500 max-w-sm">
                        No hay contenido programado para este mes.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="content-hub-calendar">
            <CustomToolbar
                label={formatMonthYear(currentMonth)}
                onNavigate={() => { }}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
            />

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
                    <div key={day} className="text-center text-xs font-medium text-slate-500 py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid - custom implementation */}
            <div className="grid grid-cols-7 gap-2">
                {(() => {
                    const year = currentDate.getFullYear();
                    const month = currentDate.getMonth();
                    const firstDay = new Date(year, month, 1);
                    const lastDay = new Date(year, month + 1, 0);

                    // Get day of week (0 = Sunday, we want Monday as 0)
                    let startDayOfWeek = firstDay.getDay() - 1;
                    if (startDayOfWeek < 0) startDayOfWeek = 6;

                    const days = [];

                    // Empty cells for days before month starts
                    for (let i = 0; i < startDayOfWeek; i++) {
                        days.push(
                            <div key={`empty-${i}`} className="min-h-[100px] bg-white/[0.01] border border-white/5 rounded-lg opacity-30" />
                        );
                    }

                    // Days of the month
                    for (let day = 1; day <= lastDay.getDate(); day++) {
                        const date = new Date(year, month, day);
                        const dayPosts = filteredPosts.filter(post => {
                            const postDate = parseISO(post.scheduledAt);
                            return format(postDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
                        });

                        const displayPosts = dayPosts.slice(0, 2);
                        const moreCount = dayPosts.length - 2;

                        days.push(
                            <div
                                key={day}
                                className="min-h-[100px] p-2 bg-white/[0.02] border border-white/5 rounded-lg hover:border-white/10 transition-colors"
                            >
                                <div className="text-xs text-slate-500 mb-2 font-medium">
                                    {day}
                                </div>
                                <div className="space-y-1">
                                    {displayPosts.map(post => (
                                        <CalendarEventCard
                                            key={post.id}
                                            post={post}
                                            onClick={onPostClick}
                                        />
                                    ))}
                                    {moreCount > 0 && (
                                        <button
                                            className="w-full text-xs text-orange-400 hover:text-orange-300 py-1 transition-colors"
                                            onClick={() => {
                                                // Could open a day modal showing all posts
                                                if (dayPosts.length > 0) onPostClick(dayPosts[2]);
                                            }}
                                        >
                                            +{moreCount} más
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    }

                    return days;
                })()}
            </div>
        </div>
    );
};

export default CalendarView;
