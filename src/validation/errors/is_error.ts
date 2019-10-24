import { Errors } from './types';
import { NoLocationPermissionErrorAction, LocationFetchTimeoutErrorAction } from '../../async/location';
import { APIResponse } from '../../api';
import { ValidationResult } from '../services';

export const isBadResponseError = (response: APIResponse): boolean => (
    response.hasError
);

export const isInvalidResponseData = (validator: ValidationResult): boolean => (
    !validator.isValid
);

export const isNoLocationPermissionError = (maybeLocation: DeviceLocationData | NoLocationPermissionErrorAction):
    maybeLocation is NoLocationPermissionErrorAction => (
        (maybeLocation as NoLocationPermissionErrorAction).type === Errors.NoLocationPermission
    );

export const isLocationFetchTimeoutError = (maybeLocation: DeviceLocationData | LocationFetchTimeoutErrorAction):
    maybeLocation is LocationFetchTimeoutErrorAction => (
        (maybeLocation as LocationFetchTimeoutErrorAction).type === Errors.LocationFetchTimeout
    );
