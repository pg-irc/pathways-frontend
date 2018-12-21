// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import { stringify } from 'query-string';
import { Id } from '../stores/tasks';
import { Location } from 'expo';

export interface APIResponse {
    readonly hasError: boolean;
    readonly message: string;
    readonly response?: Response;
    readonly results?: any; // tslint:disable-line:no-any
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

    private async fetch(endpoint: string, query: string = ''): Promise<APIResponse> {
        const url = `${this.host}/${endpoint}?${query}`;
        const response = await fetch(url);
        return createAPIResponse(response);
    }
}

export const buildParameters = (taskId: Id, location: MaybeLocation): string => {
    const data = location ?
        {
            user_location: `${location.coords.longitude},${location.coords.latitude}`,
            related_to_task: taskId,
        }
        :
        { related_to_task: taskId };

    return stringify(data);
};

async function createAPIResponse(response: Response): Promise<APIResponse> {
    const message = `(${response.status}) ${response.statusText}`;
    if (!response.ok) {
        return { hasError: true, message, response };
    }
    const results = await response.json();
    return { hasError: false, message, response, results };
}
