// https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.requestinit.html
import { HttpError } from './http-error';
import { QueryManager } from './query.manager';

export class Repository {
    public baseUrl = process.env.REACT_APP_BASE_URL;
    public headers: string[][] = [['Content-Type', 'application/json']];

    public constructor(token: string | null = null) {
        if (token) {
            this.setAuth(token);
        }
    }

    public setHeader(header: string, value: string) {
        this.headers.push([header, value]);
    }

    public setAuth(token: string | null) {
        this.headers.push(['Authorization', `Bearer ${token}`]);
    }

    public async fetch(path: string, method: string, options: RequestInit, query: any) {
        const abortController = new AbortController();
        try {
            const request = new Request(this.formatUrl(path, query), this.formatOptions(options, abortController, method));
            const response: any = await fetch(request);
            const responseData = await response.json();

            if (!response.ok) {
                throw new HttpError(responseData?.message, responseData?.statusCode);
            }

            return responseData;
        } catch (error: any) {
            console.log(error);
            abortController.abort();
            throw new HttpError(error?.message, error?.code);
        }
    }

    public formatUrl(url: string, query: any = null): string {
        if (!query) {
            return `${this.baseUrl}${url}`;
        }

        const queryManager = new QueryManager();

        for (const prop in query) {
            if (query.hasOwnProperty(prop)) {
                queryManager.add(prop, query[prop]);
            }
        }

        return `${this.baseUrl}${url}?${queryManager.getQuery()}`;
    }

    public formatOptions(options: any = {}, abortController: AbortController, method: string) {
        options.signal = abortController.signal;
        options.method = method;
        options.headers = this.headers;

        switch (method) {
            case 'get':
                return options;
            default:
                options.body = JSON.stringify(options.body || {}, null);
                return options;
        }
    }
}
