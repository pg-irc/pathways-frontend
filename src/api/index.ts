// tslint:disable:no-expression-statement
import { Location } from 'expo';
import { Id } from '../stores/tasks';
import { stringify } from 'query-string';

export interface APIResponse {
    readonly hasError: boolean;
    readonly message: string;
    readonly response?: Response;
    readonly results?: any; // tslint:disable-line:no-any
}

// TODO every function should call client().fetch()
export namespace API {

    // tslint:disable-next-line:no-let
    let host: string = undefined;

    export const configure = (url: string): void => {
        console.log(`Using URL: ${url}`);
        host = url;
    };

    export async function getServerVersion(): Promise<APIResponse> {
        const endpoint = 'version';
        return await fetchXX(endpoint);
    }

    export type MaybeLocation = Location.LocationData | undefined;

    export async function findRelatedServices(taskId: Id, location: MaybeLocation): Promise<APIResponse> {
        const parameters = buildParameters(taskId, location);
        const endpoint = 'v1/services_at_location';
        const servicesResponse = await fetchXX(endpoint, parameters);
        return servicesResponse;
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

    export async function fetchXX(endpoint: string, query: string = undefined): Promise<APIResponse> {
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
