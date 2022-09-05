import moment from 'moment';
import { handleErrors } from './handle-errors';
import { Storage } from './storage';

export const objectToArray = (object: any) => {
    const arr = [];
    for (const prop in object) {
        if (object.hasOwnProperty(prop)) {
            arr.push(object[prop]);
        }
    }

    return arr;
};

export const priceFormat = (amount: number, decimal = 1, currency: string = 'eur') => {
    const val = !!amount ? amount : 0;
    const price = round(val, decimal);

    return Intl
        .NumberFormat('hu-HU', {
            style: 'currency', currency: (currency || '')
                .toUpperCase()
        })
        .format(price)
        .replace(/\D00(?=\D*$)/, '')
        .replace(/hun/i, 'Ft');
};

export const round = (num: number, decimal = 100) => {
    return Math.round(num * decimal) / decimal;
};

export const getClasses = (isTrue: boolean, classIfTrue: string, classIfFalse = '') => {
    return isTrue ? classIfTrue : classIfFalse;
};

export const numArray = (number: number, value: any = false) => {
    if (!value) {
        return Array.from({ length: number }, (i, index) => (index + 1));
    }
    return Array.from({ length: number }, (i, index) => value || index);
};

export const redirect = (location: string, inSite: boolean = true) => {
    if (inSite) {
        const baseUrl = window.location.origin;

        window.location.href = `${baseUrl}${location}`;
    } else {
        window.location.href = location;
    }
};

export const getUniqueId = () => {
    return (Math.random() * 1000).toString(16).replace('.', '');
};

export const unique = (items: any[], propBy = ''): any[] => {
    if (!propBy) {
        return Array.from(new Set(items));
    }

    const uniqueItems = [];
    const usedProps: any[] = [];
    for (const item of items) {
        if (!usedProps.includes(item[propBy])) {
            usedProps.push(item[propBy]);
            uniqueItems.push(item);
        }
    }

    return uniqueItems;
};

export const sort = (collection: any[], direction: 'asc' | 'desc' = 'asc', by = ''): any[] => {
    if (!by) {
        return collection.sort((a, b) => a - b);
    }
    return collection.sort((a, b) => a[by].localeCompare(b[by]));
};

/**
 * make the datepicker value compatible with safari and firefox
 * @param dateString
 */
export const formatLongText = (text?: string, maxLength?: number) => {
    if (!text || !maxLength) {
        return {
            formattedText: '',
            isFormatted: false
        };
    }

    const isShortEnough = text.length <= maxLength;

    return {
        formattedText: isShortEnough ? text : `${text.slice(0, maxLength)}...`,
        isFormatted: !isShortEnough
    };
};

export const saveLogs = (data: any) => {
    const storage = new Storage('error-logs');

    try {
        const existingData: { log: string; created_at: string }[] = storage.get();

        if (!existingData) {
            storage.set([{ log: data, created_at: moment().toString() }]);
        }

        existingData.push({ log: data, created_at: moment().toString() });

        storage.set(existingData);
    } catch (e: any) {
        storage.set([{ log: e.toString(), reated_at: moment().toString() }]);

        handleErrors({ log_saving_failed: e });
    }
};

export const extractFilters = (query: any) => {
    const filters: any = {};
    for (const prop in query) {
        switch (prop) {
            case 'page':
                break;
            case 'limit':
                break;
            case 'total':
                break;
            default:
                filters[prop] = query[prop];
                break;
        }
    }

    return filters;
};
