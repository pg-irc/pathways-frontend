// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import qs from 'query-string';
import { Id } from '../stores/tasks';
import { Location } from 'expo';

export interface APIResponse {
    readonly hasError: boolean;
    readonly message: string;
    readonly response?: Response;
    readonly results?: any; // tslint:disable-line:no-any
}

interface APIQuery {
    readonly [property: string]: string;
}

export type MaybeLocation = Location.LocationData | undefined;

export class APIClient {

    private host: string;

    constructor(host: string) {
        this.host = host;
    }

    async searchServices(taskId: Id, location: MaybeLocation): Promise<APIResponse> {
        const parameters = buildParameters(taskId, location);
        const endpoint = 'services_at_location';
        const servicesResponse = await this.fetch(endpoint, parameters);
        return servicesResponse;
    }

    private async fetch(endpoint: string, query: APIQuery = {}): Promise<APIResponse> {
        const queryString = qs.stringify(query);
        const url = `${this.host}/${endpoint}?${queryString}`;
        const response = await fetch(url);
        return createAPIResponse(response);
    }
}

const buildParameters = (taskId: Id, location: MaybeLocation): APIQuery => (
    location ?
        {
            user_location: `${location.coords.latitude},${location.coords.longitude}`,
            related_to_task: taskId,
        }
        :
        { related_to_task: taskId }
);

async function createAPIResponse(response: Response): Promise<APIResponse> {
    const message = `(${response.status}) ${response.statusText}`;
    if (!response.ok) {
        return { hasError: true, message, response };
    }
    const results = await response.json();
    return { hasError: false, message, response, results };
}
