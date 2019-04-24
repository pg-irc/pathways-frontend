import { APIResponse } from '.';

export const isResponseError = (response: APIResponse): boolean => (
    response.hasError
);
