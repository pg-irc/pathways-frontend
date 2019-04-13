// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import { stringify } from 'query-string';
import { Id } from '../stores/topics';

export interface APIResponse {
    readonly hasError: boolean;
    readonly message: string;
    readonly response?: Response;
    readonly results?: any; // tslint:disable-line:no-any
}

export type MaybeLocation = LocationData | undefined;

// tslint:disable-next-line:no-let
let host = '';

export const setHost = (url: string): void => {
    host = url;
};

export async function searchServices(topicId: Id, location: MaybeLocation): Promise<APIResponse> {
    const parameters = stringify(buildParameters(topicId, location));
    const endpoint = 'services_at_location';
    const servicesResponse = await fooFetch(endpoint, parameters);
    return servicesResponse;
}

async function fooFetch(endpoint: string, query: string): Promise<APIResponse> {
    const version = 'v1';
    const url = `${host}/${version}/${endpoint}?${query}`;
    const response = await fetch(url);
    return createAPIResponse(response);
}

interface Parameters {
    related_to_task: Id;
    proximity?: string;
    user_location?: string;
}

export const buildParameters = (topicId: Id, location: MaybeLocation): Parameters => {
    if (!location) {
        return { related_to_task: topicId };
    }
    const user_location = `${location.coords.longitude},${location.coords.latitude}`;
    return {
        user_location: user_location,
        proximity: user_location,
        related_to_task: topicId,
    };
};

async function createAPIResponse(response: Response): Promise<APIResponse> {
    const message = `(${response.status}) ${response.statusText}`;
    if (!response.ok) {
        return { hasError: true, message, response };
    }
    const results = await response.json();
    return { hasError: false, message, response, results };
}
