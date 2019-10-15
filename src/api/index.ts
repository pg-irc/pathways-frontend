// tslint:disable: no-expression-statement no-var-requires
const BuildUrl = require('build-url');
import { Id } from '../stores/topics';
import { fetch } from 'cross-fetch';

export interface APIResponse {
    readonly hasError: boolean;
    readonly message: string;
    readonly response?: Response;
    readonly results?: any; // tslint:disable-line:no-any
}

export type MaybeLocation = DeviceLocationData | undefined;

// tslint:disable-next-line:no-let
let baseUrl = '';

export const setUrl = (url: string): void => {
    baseUrl = validateUrl(url);
};

const validateUrl = (url: string): string => {
    if (!url.startsWith('http')) {
        throw new Error('URL must start with http or https');
    }
    if (url.endsWith('/')) {
        throw new Error('URL must not end with /');
    }
    return url;
};

export async function searchServices(topicId: Id, location: MaybeLocation): Promise<APIResponse> {
    const endpoint = 'v1/services_at_location';
    const url = buildUrl(endpoint, location, topicId);
    const response = await fetch(url);
    return createAPIResponse(response);
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

type Parameters = { readonly [name: string]: string };

const buildUrl = (path: string, location: MaybeLocation, topicId: string): string => (
    BuildUrl(baseUrl, {
        path: path,
        queryParams: buildParameters(topicId, location),
    })
);

async function createAPIResponse(response: Response): Promise<APIResponse> {
    const message = `(${response.status}) ${response.statusText}`;
    if (!response.ok) {
        return { hasError: true, message, response };
    }
    const results = await response.json();
    return { hasError: false, message, response, results };
}
