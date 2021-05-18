import { isAndroid } from './is_android';
import * as Location from 'expo-location';
import { LocationPermissionResponse } from 'expo-location';

export const requestLocationPermission = (): Promise<string> => {
    return Location.requestPermissionsAsync().
        then((permissionResponse: LocationPermissionResponse): string => {
            return isAndroid() ? permissionResponse.android.scope : permissionResponse.ios.scope;
        });
};