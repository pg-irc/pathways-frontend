import { AsyncErrors } from './errors';
import { NoLocationPermissionError, LocationFetchTimeoutError } from './location';
import { APIResponse } from '../api';
import { ValidatorResponse } from '../json_schemas/validators';

export const isBadServerResponseError = (response: APIResponse): boolean => (
    response.hasError
);

export const isInvalidServerDataError = (validator: ValidatorResponse): boolean => (
    !validator.isValid
);

export const isNoLocationPermissionError = (maybeLocation: LocationData | NoLocationPermissionError):
    maybeLocation is NoLocationPermissionError => (
        (<NoLocationPermissionError>maybeLocation).type === AsyncErrors.NoLocationPermission
    );

export const isLocationFetchTimeoutError = (maybeLocation: LocationData | LocationFetchTimeoutError):
    maybeLocation is LocationFetchTimeoutError => (
        (<LocationFetchTimeoutError>maybeLocation).type === AsyncErrors.LocationFetchTimeout
    );
