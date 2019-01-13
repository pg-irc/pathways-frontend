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

    async serverVersion(): Promise<APIResponse> {
        const endpoint = 'version';
        return await this.fetch(endpoint);
    }

    async findRelatedServices(taskId: Id, location: MaybeLocation): Promise<APIResponse> {
        const parameters = buildParameters(taskId, location);
        const endpoint = 'v1/services_at_location';
        const servicesResponse = await this.fetch(endpoint, parameters);
        return servicesResponse;
    }

    // TODO this should be the only function in this class
    private async fetch(endpoint: string, query: string = undefined): Promise<APIResponse> {
        // TODO clean this up
        const url = query ? `${this.host}/${endpoint}?${query}` : `${this.host}/${endpoint}`;
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
