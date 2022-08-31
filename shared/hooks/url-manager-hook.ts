import { QueryManager } from '../libs/query.manager';

export const useUrlManagerHook = () => {
    const getQueryAsObject = () => {
        return QueryManager.decodeBase64(window.location.search);
    };

    const getIsInQuery = (property: string, value: string) => {
        const query = getQueryAsObject();
        return property in query ? query[property] === value : false;
    };

    const addToUrl = (key: string, value: string) => {
        const queryManager = new QueryManager(window.location.search, window.location);
        if (getIsInQuery(key, value)) {
            return queryManager.addAsBase64(key, '');
        }
        return queryManager.addAsBase64(key, value);
    };

    const addMultiple = (object: any) => {
        const queryManager = new QueryManager(window.location.search, window.location);
        queryManager.addMultipleAsBase64(object);
    };

    return { addToUrl, addMultiple, getIsInQuery, getQueryAsObject };
};
