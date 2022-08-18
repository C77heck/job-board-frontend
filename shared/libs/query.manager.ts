import { decode, encode } from 'js-base64';

/**
 * @description this class can manage query string as well as single layer objects
 * we can return the whole query string as an object or an object as a query string.
 */
export class QueryManager {
    query: URLSearchParams;

    constructor(queryString: string = '') {
        this.query = new URLSearchParams(queryString);
    }

    public get(prop: string): any {
        if (!this.query.has(prop)) {
            return 'This property does not exist!';
        }

        return this.query.get(prop);
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
        return `base=${this.encode(this.getQuery())}`;
    }

    public decodeBase64() {
        const query = this.getAsObject();

        const rawQuery = decode(query?.base || '');

        const queryManager = new QueryManager(rawQuery);

        return queryManager.getAsObject();
    }
}
