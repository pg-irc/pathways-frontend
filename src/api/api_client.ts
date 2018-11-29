// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import qs from 'query-string';
import { Id } from '../stores/tasks';

export interface APIResponse {
    readonly hasError: boolean;
    readonly message: string;
    readonly response?: Response;
    readonly results?: any; // tslint:disable-line:no-any
}

interface APIQuery {
    readonly [property: string]: string;
}

export class APIClient {

    private host: string;

    constructor(host: string) {
        this.host = host;
    }

    async searchServices(taskId: Id): Promise<APIResponse> {
        const endpoint = 'services_at_location';
        const servicesResponse = await this.fetch(endpoint, { related_to_task: taskId });
        return servicesResponse;
    }

    private async fetch(endpoint: string, query: APIQuery = {}): Promise<APIResponse> {
        const queryString = qs.stringify(query);
        // TODO: Should use something a bit more robust to build urls: nodejs's
        //       URL module is a good example.
        const url = `${this.host}/${endpoint}?${queryString}`;
        const response = await fetch(url);
        // TODO: Handle fetching paged results.
        return createAPIResponse(response);
    }

}

async function createAPIResponse(response: Response): Promise<APIResponse> {
    const message = `(${response.status}) ${response.statusText}`;
    if (!response.ok) {
        return { hasError: true, message, response };
    }
    const results = await response.json();
    return { hasError: false, message, response, results };
}