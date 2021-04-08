// tslint:disable: no-expression-statement no-var-requires
const BuildUrl = require('build-url');
import { Id } from '../stores/topics';
import { fetch } from 'cross-fetch';
import { Locale } from '../locale';

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

export async function putPushNotificationToken(token: string, locale: Locale, api_key: string): Promise<APIResponse> {
    const url = createPushNotificationTokenUrl(baseUrl, token);
    const response = await fetch(url,
        {
            method: 'PUT',
            headers: [
                ['Content-Type', 'application/json'],
            ],
            body: JSON.stringify({
                'locale': locale,
                'api_key': api_key,
            }),
        },
    );
    return createAPIResponse(response);
}

export const createPushNotificationTokenUrl = (url: string, token: string): string => (
    BuildUrl(url, { path: `v1/push_notifications/tokens/${token}/` })
);

export async function getAlerts(locale: string): Promise<APIResponse> {
    const url = createGetAlertUrl(baseUrl, locale);
    const response = await fetch(url);
    return createAPIResponse(response);
}

export const createGetAlertUrl = (url: string, locale: string): string => (
    BuildUrl(url, { path: `v1/content/alerts/${locale}/` })
);

export async function getOrganization(organizationId: string): Promise<APIResponse> {
    const url = createGetOrganizationtUrl(baseUrl, organizationId);
    const response = await fetch(url);
    return createAPIResponse(response);
}

export const createGetOrganizationtUrl = (url: string, organizationId: string): string => (
    BuildUrl(url, { path: `v1/organizations/${organizationId}/` })
);
