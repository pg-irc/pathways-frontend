import { APIResponse } from './api_client';

export const isResponseError = (response: APIResponse): boolean => (
    response.hasError
);
