import { decode, encode } from 'js-base64';

/**
 * @description this class can manage query string as well as single layer objects
 * we can return the whole query string as an object or an object as a query string.
 */
export class QueryManager {
    public query: URLSearchParams;
    public url?: string;

    constructor(queryString: string = '', location?: Location) {
        this.query = new URLSearchParams(queryString);

        if (location) {
            const origin = location?.origin || '';
            const pathname = location?.pathname || '';

            this.url = `${origin}${pathname}`;
        }
    }

    public get(prop: string): any {
        if (!this.query.has(prop)) {
            return 'This property does not exist!';
        }

        return this.query.get(prop);
    }

    public pushState() {
        window.history.pushState(null, '', `${this.url}?${this.getQuery()}`);
    }

    public addNestedObject<T>(parent: string, obj: T) {
        const keys = Object.keys(obj || {});

        for (const key of keys) {
            this.query.set(`${parent}[${key}]`, `${obj?.[key as keyof T]}`);
        }
    }

    public addObj<T>(obj: T) {
        const keys = Object.keys(obj || {});

        for (const key of keys) {
            this.query.set(key, `${obj[key as keyof T]}`);
        }
    }

    public add(prop: string, value: string) {
        this.query.set(prop, value);

        if (this.url) {
            this.pushState();
        }
    }

    public has(prop: string): boolean {
        return this.query.has(prop);
    }

    public remove(prop: string): string {
        this.query.delete(prop);

        return 'successfully removed';
    }

    public getAsObject() {
        const queryObject: any = {};
        this.query.forEach((value, key) => {
            queryObject[key] = value;
        });

        return queryObject;
    }

    public getQuery() {
        return this.query.toString();
    }

    public encode(data: any) {
        if (typeof data === 'string') {
            return encode(data);
        }

        return encode(JSON.stringify(data));
    }

    public decode(base64: string) {
        if (!base64) {
            return base64;
        }

        const decodedString = decode(base64);

        return JSON.parse(decodedString);
    }

    public addAsBase64(key: string, value: string) {
        try {
            const decodedQuery = QueryManager.decodeBase64(this.getQuery());

            const secondaryManager = new QueryManager(decodedQuery);

            secondaryManager.addObj({ ...decodedQuery, [key]: value });

            this.add('base', this.encode(secondaryManager.getQuery()));
        } catch (e) {
            return null;
        }
    }

    public static decodeBase64(queryString: string) {
        try {
            const manager = new QueryManager(queryString);

            const query = manager.getAsObject();

            const queryAsObject = manager.decode(query?.base || '');

            return !!queryAsObject ? queryAsObject : {};
        } catch (e) {
            return null;
        }
    }
}
