// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import { stringify } from 'query-string';
import { Id } from '../stores/topics';
import { fetch } from 'cross-fetch';

export interface APIResponse {
    readonly hasError: boolean;
    readonly message: string;
    readonly response?: Response;
    readonly results?: any; // tslint:disable-line:no-any
}

export type MaybeLocation = LocationData | undefined;

// tslint:disable-next-line:no-let
let baseUrl = '';

export const setUrl = (url: string): void => {
    baseUrl = validateUrl(url);
};

const validateUrl = (url: string): string => {
    if (!url.startsWith('https://')) {
        throw new Error('URL must start with https://');
    }
    if (url.endsWith('/')) {
        throw new Error('URL must not end with /');
    }
    return url;
};

export async function searchServices(topicId: Id, location: MaybeLocation): Promise<APIResponse> {
    try {
        const endpoint = 'services_at_location';
        const parameters = buildParameters(topicId, location);
        const parameterString = stringify(parameters);
        const url = buildUrl(endpoint, parameterString);
        console.log(url);
        const response = await fetch(url);
        console.log(response ? 'OK in foobar: ' + JSON.stringify(response) : 'Error in foobar');
        return createAPIResponse(response);
    } catch (error) {
        console.log('Error in foobar: ' + error.message);
        throw error;
    }
}

export const buildParameters = (topicId: Id, location: MaybeLocation): Parameters => {
    if (!location) {
        return { related_to_topic: topicId };
    }
    const user_location = `${location.coords.longitude},${location.coords.latitude}`;
    return {
        user_location: user_location,
        proximity: user_location,
        related_to_topic: topicId,
    };
};

interface Parameters {
    related_to_topic: Id;
    proximity?: string;
    user_location?: string;
}

const buildUrl = (endpoint: string, query: string): string => {
    const version = 'v1';
    return `${baseUrl}/${version}/${endpoint}?${query}`;
};

async function createAPIResponse(response: Response): Promise<APIResponse> {
    const message = `(${response.status}) ${response.statusText}`;
    if (!response.ok) {
        return { hasError: true, message, response };
    }
    const results = await response.json();
    return { hasError: false, message, response, results };
}
