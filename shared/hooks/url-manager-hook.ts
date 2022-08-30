import { QueryManager } from '../libs/query.manager';

export const useUrlManagerHook = () => {
    const addToUrl = (key: string, value: string) => {
        const queryManager = new QueryManager(window.location.search, window.location);

        queryManager.addAsBase64(key, value);
    };

    const addMultiple = (object: any) => {
        const queryManager = new QueryManager(window.location.search, window.location);
        queryManager.addMultipleAsBase64(object);
    };

    return { addToUrl, addMultiple };
};
