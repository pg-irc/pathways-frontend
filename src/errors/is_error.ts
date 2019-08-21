import { Errors } from './types';
import { NoLocationPermissionError, LocationFetchTimeoutError } from '../async/location';
import { APIResponse } from '../api';
import { ValidationResult } from '../stores/services/validation';

export const isBadResponseError = (response: APIResponse): boolean => (
    response.hasError
);

export const isInvalidResponseData = (validator: ValidationResult): boolean => (
    !validator.isValid
);

export const isNoLocationPermissionError = (maybeLocation: LocationData | NoLocationPermissionError):
    maybeLocation is NoLocationPermissionError => (
        (maybeLocation as NoLocationPermissionError).type === Errors.NoLocationPermission
    );

export const isLocationFetchTimeoutError = (maybeLocation: LocationData | LocationFetchTimeoutError):
    maybeLocation is LocationFetchTimeoutError => (
        (maybeLocation as LocationFetchTimeoutError).type === Errors.LocationFetchTimeout
    );
