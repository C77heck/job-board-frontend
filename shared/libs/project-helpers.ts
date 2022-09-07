import Parser from 'html-react-parser';
import moment from 'moment';
import { priceFormat } from './helpers';

export const getFreshnesByDate = (date: string) => {
    const getDateOptions = () => {
        return {
            '24': moment().add(1, 'day'),
            '72': moment().add(3, 'day'),
            '168': moment().add(1, 'week'),
            '336': moment().add(2, 'week'),
        };
    };

    const createdAt = moment(date);
    const dateOptions = getDateOptions();

    if (dateOptions['336'].isAfter(createdAt)) {
        return 'Posted 2 weeks ago';
    } else if (dateOptions['168'].isAfter(createdAt)) {
        return 'Posted a week ago';
    } else if (dateOptions['72'].isAfter(createdAt)) {
        return 'Posted recently';
    } else if (dateOptions['24'].isAfter(createdAt)) {
        return 'Posted recently';
    }
};

export const parseSalary = (salary?: string) => {
    if (!salary) {
        return ' - ';
    }

    const parsedToNumber = +salary;

    if (parsedToNumber !== NaN) {
        return priceFormat(parsedToNumber);
    }

    return salary;
};

export const htmlParser = (htmlToParse?: string) => {
    if (!htmlToParse) {
        return ' - ';
    }

    return Parser(htmlToParse);
};
