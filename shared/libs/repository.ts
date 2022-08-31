// https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.requestinit.html
import { QueryManager } from './query.manager';

export type Methods = 'GET' | 'POST' | 'PUT' | 'OPTIONS' | 'PATCH' | 'DELETE';

export interface RequestOptions extends RequestInit {
    body?: any;
}

export class Repository {
    public baseUrl = process?.env?.NEXT_PUBLIC_API || '';
    public headers: string[][] = [['Content-Type', 'application/json']];

    public constructor(token: string | null = null, env: 'api' | 'attachment') {
        if (token) {
            this.setAuth(token);
        }
        this.baseUrl = env === 'api' ? process?.env?.NEXT_PUBLIC_API || '' : process?.env?.NEXT_PUBLIC_ATTACHMENT || '';
    }

    public setHeader(header: string, value: string) {
        this.headers.push([header, value]);
    }

    public setAuth(token: string | null) {
        this.headers.push(['Authorization', `Bearer ${token}`]);
    }

    public getRequest(path: string, method: Methods = 'GET', options: RequestOptions, query: any, abortController: AbortController) {
        switch (method) {
            case 'GET':
                return new Request(this.formatUrl(path, query), this.formatOptions(options, abortController, method));
            default:
                return new Request(this.formatUrl(path), this.formatOptions(options, abortController, method));
        }
    }

    public async fetch(path: string, method: Methods = 'GET', options: RequestOptions = {}, query: any = {}) {
        const abortController = new AbortController();
        try {
            const request = this.getRequest(path, method, options, query, abortController);
            const response: any = await fetch(request);
            const responseData = await response.json();

            if (!response.ok) {
                throw { message: responseData?.error || 'Something went wrong', code: response?.status || 500 };
            }

            return responseData;
        } catch (error: any) {
            abortController.abort();
            throw error;
        }
    }

    public formatUrl(url: string, query: any = null): string {
        if (!query) {
            return `${this.baseUrl}${url}`;
        }

        const queryManager = new QueryManager();
        console.log({ query });
        for (const prop in query) {
            console.log({ prop });
            if (query.hasOwnProperty(prop)) {
                switch (prop) {
                    case 'pagination':
                        queryManager.addNestedObject(prop, query[prop]);
                        break;
                    case 'sort':
                        queryManager.addNestedObject(prop, query[prop]);
                        break;
                    case 'filters':
                        console.log({ prop, value: query[prop] });
                        queryManager.addNestedObject(prop, query[prop]);
                        break;
                    default:
                        queryManager.add(prop, query[prop]);
                }
            }
        }

        return `${this.baseUrl}${url}?${queryManager.getQuery()}`;
    }

    public formatOptions(options: any = {}, abortController: AbortController, method: Methods) {
        options.signal = abortController.signal;
        options.method = method;
        options.headers = this.headers;

        switch (method) {
            case 'GET':
                return options;
            default:
                options.body = JSON.stringify(options.body || {}, null);
                return options;
        }
    }
}
