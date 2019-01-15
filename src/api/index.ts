// tslint:disable:no-expression-statement
import { Location } from 'expo';
import { Id } from '../stores/tasks';
import { stringify } from 'query-string';

export interface APIResponse {
    readonly hasError: boolean;
    readonly message: string;
    readonly response?: Response;
    // tslint:disable-next-line:no-any
    readonly results?: any;
}

export namespace API {

    // tslint:disable-next-line:no-let
    let host: string = undefined;

    export const configure = (theHost: string): void => {
        console.log(`Using URL: ${theHost}`);
        host = theHost;
    };

    export async function getServerVersion(): Promise<APIResponse> {
        if (!host) {
            throw new Error('APIClient initialized, API.configure(...) must be called first');
        }
        const endpoint = 'version';
        const url = `${host}/${endpoint}`;
        const response = await fetch(url);

        const message = `(${response.status}) ${response.statusText}`;
        if (!response.ok) {
            return { hasError: true, message, response };
        }
        const results = await response.text();
        return { hasError: false, message, response, results };
    }

    export async function findRelatedServices(taskId: Id, location?: Location.LocationData): Promise<APIResponse> {
        const parameters = buildParameters(taskId, location);
        const endpoint = 'v1/services_at_location';
        return await fetchFromHost(endpoint, parameters);
    }

    export const buildParameters = (taskId: Id, location?: Location.LocationData): string => {
        const data = location ?
            {
                user_location: `${location.coords.longitude},${location.coords.latitude}`,
                related_to_task: taskId,
            }
            :
            { related_to_task: taskId };

        return stringify(data);
    };

    async function fetchFromHost(endpoint: string, query: string = undefined): Promise<APIResponse> {
        if (!host) {
            throw new Error('APIClient initialized, API.configure(...) must be called first');
        }
        // TODO clean this up
        const url = query ? `${host}/${endpoint}?${query}` : `${host}/${endpoint}`;
        const response = await fetch(url);
        return createAPIResponse(response);
    }

    async function createAPIResponse(response: Response): Promise<APIResponse> {
        const message = `(${response.status}) ${response.statusText}`;
        if (!response.ok) {
            return { hasError: true, message, response };
        }
        const results = await response.json();
        return { hasError: false, message, response, results };
    }
}
