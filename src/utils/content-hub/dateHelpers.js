/**
 * Date Helper Utilities
 * Formatting and manipulation for Content Hub
 */

import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Format a month string (YYYY-MM) to human readable
 * @param {string} monthStr - Month in YYYY-MM format
 * @returns {string} - e.g., "febrero 2025"
 */
export const formatMonthYear = (monthStr) => {
    if (!monthStr) return '';
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return format(date, 'MMMM yyyy', { locale: es });
};

/**
 * Format a date to short format
 * @param {string|Date} dateStr - ISO date string or Date object
 * @returns {string} - e.g., "lun, 3 feb, 10:30"
 */
export const formatDateShort = (dateStr) => {
    if (!dateStr) return '';
    const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
    return format(date, "EEE, d MMM, HH:mm", { locale: es });
};

/**
 * Format a date to full format
 * @param {string|Date} dateStr - ISO date string or Date object
 * @returns {string} - e.g., "lunes, 3 de febrero de 2025"
 */
export const formatDateFull = (dateStr) => {
    if (!dateStr) return '';
    const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
    return format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });
};

/**
 * Get all days in a month
 * @param {string} monthStr - Month in YYYY-MM format
 * @returns {Date[]} - Array of Date objects
 */
export const getDaysInMonth = (monthStr) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return eachDayOfInterval({
        start: startOfMonth(date),
        end: endOfMonth(date)
    });
};

/**
 * Check if two dates are the same day
 * @param {Date|string} date1 
 * @param {Date|string} date2 
 * @returns {boolean}
 */
export const isSameDayHelper = (date1, date2) => {
    const d1 = typeof date1 === 'string' ? parseISO(date1) : date1;
    const d2 = typeof date2 === 'string' ? parseISO(date2) : date2;
    return isSameDay(d1, d2);
};

/**
 * Get previous month string
 * @param {string} monthStr - Month in YYYY-MM format
 * @returns {string} - Previous month in YYYY-MM format
 */
export const getPreviousMonth = (monthStr) => {
    const [year, month] = monthStr.split('-').map(Number);
    const newMonth = month === 1 ? 12 : month - 1;
    const newYear = month === 1 ? year - 1 : year;
    return `${newYear}-${String(newMonth).padStart(2, '0')}`;
};

/**
 * Get next month string
 * @param {string} monthStr - Month in YYYY-MM format
 * @returns {string} - Next month in YYYY-MM format
 */
export const getNextMonth = (monthStr) => {
    const [year, month] = monthStr.split('-').map(Number);
    const newMonth = month === 12 ? 1 : month + 1;
    const newYear = month === 12 ? year + 1 : year;
    return `${newYear}-${String(newMonth).padStart(2, '0')}`;
};

/**
 * Validate month format (YYYY-MM)
 * @param {string} monthStr 
 * @returns {boolean}
 */
export const isValidMonthFormat = (monthStr) => {
    return /^\d{4}-(0[1-9]|1[0-2])$/.test(monthStr);
};
