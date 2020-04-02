import { Errors } from './types';
import { NoLocationPermissionErrorAction, LocationFetchTimeoutErrorAction } from '../../application/get_device_location';
import { APIResponse } from '../../api';

export const isBadResponseError = (response: APIResponse): boolean => (
    response.hasError
);

export const isNoLocationPermissionError = (maybeLocation: DeviceLocationData | NoLocationPermissionErrorAction):
    maybeLocation is NoLocationPermissionErrorAction => (
        (maybeLocation as NoLocationPermissionErrorAction).type === Errors.NoLocationPermission
    );

export const isLocationFetchTimeoutError = (maybeLocation: DeviceLocationData | LocationFetchTimeoutErrorAction):
    maybeLocation is LocationFetchTimeoutErrorAction => (
        (maybeLocation as LocationFetchTimeoutErrorAction).type === Errors.LocationFetchTimeout
    );
