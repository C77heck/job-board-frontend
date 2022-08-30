import { QueryManager } from '../libs/query.manager';

export const useUrlManagerHook = () => {
    const addToUrl = (key: string, value: string) => {
        const queryString = window.location.search;

        const queryManager = new QueryManager(queryString, window.location);

        const base64Query = queryManager.addAsBase64(key, value);
        return;
        if (!base64Query) {
            return;
        }

        //  queryManager.add('base', base64Query);
    };

    const addMultiple = (object: any) => {
        const queryManager = new QueryManager(window.location.search, window.location);
        queryManager.addObj(object);
        queryManager.pushState();
    };

    return { addToUrl, addMultiple };
};
