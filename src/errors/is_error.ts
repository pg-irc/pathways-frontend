import { Errors } from './types';
import { NoLocationPermissionError, LocationFetchTimeoutError } from '../async/location';
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
        (<NoLocationPermissionError>maybeLocation).type === Errors.NoLocationPermission
    );

export const isLocationFetchTimeoutError = (maybeLocation: LocationData | LocationFetchTimeoutError):
    maybeLocation is LocationFetchTimeoutError => (
        (<LocationFetchTimeoutError>maybeLocation).type === Errors.LocationFetchTimeout
    );
