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
    const numberOfRecordsToGet = '100';

    const parametersWithoutLocation = {
        related_to_topic: topicId,
        per_page: numberOfRecordsToGet,
    };

    if (!location) {
        return parametersWithoutLocation;
    }

    const user_location = `${location.coords.longitude},${location.coords.latitude}`;
    return {
        ...parametersWithoutLocation,
        user_location: user_location,
        proximity: user_location,
    };
};

type Parameters = { readonly [name: string]: string };

const buildUrl = (endpoint: string, location: MaybeLocation, topicId: string): string => (
    BuildUrl(baseUrl, {
        path: endpoint,
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

export async function postPushNotificationToken(expoTokenString: string): Promise<APIResponse> {
    const url = createPushNotificationTokenUrl(baseUrl);
    console.log(`posting to ${url}`);
    const token = parseExpoTokenString(expoTokenString);
    const response = await fetch(url,
        {
            method: 'post',
            headers: [
                ['Content-Type', 'application/json'],
            ],
            body: JSON.stringify({ id: token }),
        },
    );
    return createAPIResponse(response);
}

export const parseExpoTokenString = (token: string): string => {
    const start = token.indexOf('[');
    const end = token.indexOf(']');
    return token.substr(start + 1, end - start - 1);
};


export const createPushNotificationTokenUrl = (url: string): string => (
    BuildUrl(url, { path: 'v1/push_notifications/tokens/' })
);
