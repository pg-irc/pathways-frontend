// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import qs from 'query-string';
import { APIError } from './errors';

export interface ServiceData {
    readonly [property: string]: boolean | number | string | object;
}

interface Query {
    readonly [property: string]: string;
}

export class APIClient {

    private host: string;

    constructor(host: string) {
        this.host = host;
    }

    async searchServices(query: string): Promise<APIResponse<ServiceData>> {
        const endpoint = 'services';
        const servicesResponse = await this.fetch(endpoint, { search: query });
        console.log('[APIClient#searchServices()]', servicesResponse);
        return servicesResponse;
    }

    private async fetch(endpoint: string, query: Query = {}): Promise<APIResponse> {
        const queryString = qs.stringify(query);
        // TODO: Should use something a bit more robust to build urls.
        const url = `${this.host}/${endpoint}?${queryString}`;
        console.log('[ApiClient#fetch()]', url);
        const response = await fetch(url);
        return APIResponse.fromResponse(response);
    }

}

export class APIResponse<Data = {}, Results extends ReadonlyArray<Data> = ReadonlyArray<Data>> {

    static async fromResponse(response: Response): Promise<APIResponse> {
        const message = `(${response.status}) ${response.statusText}`;
        if (response.ok) {
            const results = await response.json();
            return new APIResponse({ results, message });
        } else {
            const error = new APIError(message);
            return new APIResponse({ error, message: error.message });
        }
    }

    constructor({ results, error, message}: { results?: Results, error?: Error, message?: string }) {
        this.message = message;
        this.results = results;
        this.error = error;
    }

    readonly message: string;

    readonly error: APIError = undefined;

    readonly results: Results = undefined;

    get ok(): boolean {
        return this.error === undefined;
    }

    get hasError(): boolean {
        return !this.ok;
    }

}