// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import qs from 'query-string';

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

    async searchServices(query: string): Promise<ReadonlyArray<ServiceData>> {
        const response = await this.fetch('services', { search: query });
        return response.json();
    }

    private fetch(endpoint: string, query: Query = {}): Promise<Response> {
        const queryString = qs.stringify(query);
        return fetch(`${this.host}/${endpoint}?${queryString}`);
    }

}