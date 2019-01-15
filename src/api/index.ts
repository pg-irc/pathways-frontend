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

    export function configure(theHost: string): void {
        console.log(`Using URL: ${theHost}`);
        host = theHost;
    }

    export async function getServerVersion(): Promise<APIResponse> {
        const endpoint = 'version';
        const response = await fetchFromHost(endpoint);
        return await handleTextResponse(response);
    }

    export async function findRelatedServices(taskId: Id, location?: Location.LocationData): Promise<APIResponse> {
        const parameters = relatedServicesParameters(taskId, location);
        const endpoint = 'v1/services_at_location';
        const response = await fetchFromHost(endpoint, parameters);
        return await handleJsonResponse(response);
    }

    export function relatedServicesParameters(taskId: Id, location?: Location.LocationData): string {
        const data = location ?
            {
                user_location: `${location.coords.longitude},${location.coords.latitude}`,
                related_to_task: taskId,
            }
            :
            { related_to_task: taskId };

        return stringify(data);
    }

    async function fetchFromHost(endpoint: string, query: string = undefined): Promise<Response> {
        if (!host) {
            throw new Error('APIClient initialized, API.configure(...) must be called first');
        }
        // TODO clean this up
        const url = query ? `${host}/${endpoint}?${query}` : `${host}/${endpoint}`;
        return await fetch(url);
    }

    async function handleJsonResponse(response: Response): Promise<APIResponse> {
        return response.ok ? buildApiResponseFromJson(response) : buildApiErrorResponse(response);
    }

    async function handleTextResponse(response: Response): Promise<APIResponse> {
        return response.ok ? buildApiResponseFromText(response) : buildApiErrorResponse(response);
    }

    async function buildApiErrorResponse(response: Response): Promise<APIResponse> {
        const message = buildMessage(response);
        return { hasError: true, message, response };
    }

    async function buildApiResponseFromJson(response: Response): Promise<APIResponse> {
        const results = await response.json();
        const message = buildMessage(response);
        return { results, hasError: false, message, response };
    }

    async function buildApiResponseFromText(response: Response): Promise<APIResponse> {
        const results = await response.text();
        const message = buildMessage(response);
        return { results, hasError: false, message, response };
    }

    function buildMessage(response: Response): string {
        return `(${response.status}) ${response.statusText}`;
    }
}
