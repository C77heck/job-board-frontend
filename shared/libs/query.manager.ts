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

    public testPushState(window: any) {
        const url = new URL(window?.location);
        url.searchParams.set('key', "value");

        window.history.pushState(null, '', url.toString());
    }

    public pushState() {
        window.history.pushState(null, '', `${this.url}?${this.getQuery()}`);
    }

    public addNestedObject<T>(parent: string, obj: T) {
        const keys = Object.keys(obj || {});

        for (const key of keys) {
            this.add(`${parent}[${key}]`, `${obj?.[key as keyof T]}`);
        }
    }

    public addObj<T>(obj: T) {
        const keys = Object.keys(obj || {});

        for (const key of keys) {
            this.add(key, `${obj[key as keyof T]}`);
        }
    }

    public add(prop: string, value: string) {
        this.query.set(prop, value);
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

    public encodeBase64() {
        return `base=${this.encode(this.getAsObject())}`;
    }

    public decode(base64: string) {
        const decodedString = decode(base64);

        return JSON.parse(decodedString);
    }

    public static decodeBase64(queryString: string) {
        try {
            const manager = new QueryManager(queryString);

            const query = manager.getAsObject();

            const queryAsObject = manager.decode(query?.base || '');

            return queryAsObject;
        } catch (e) {
            return null;
        }
    }
}
