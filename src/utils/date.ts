import { formatDistanceToNow, format } from 'date-fns';

const getDateToDateToNow = (date: Date | null): string => {
    if (!date) return '';
    try {
        return formatDistanceToNow(date);
    } catch (_) {
        return '';
    }
};

const formatDate = (date: Date | null): string => {
    if (!date) return '';
    try {
        return format(date, 'MMMM dd, yyyy');
    } catch (_) {
        return '';
    }
};

export {
    getDateToDateToNow,
    formatDate

}