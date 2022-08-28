import { QueryManager } from '../libs/query.manager';

export const useUrlManagerHook = () => {
    const addToUrl = (key: string, value: string | number) => {
        const queryManager = new QueryManager(window.location.search, window.location);
        queryManager.add(key, value.toString());
        queryManager.pushState();
    };

    const addMultiple = (object: any) => {
        const queryManager = new QueryManager(window.location.search, window.location);
        queryManager.addObj(object);
        queryManager.pushState();
    };

    return { addToUrl, addMultiple };
};
