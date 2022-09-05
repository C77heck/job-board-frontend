import moment from 'moment';

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
