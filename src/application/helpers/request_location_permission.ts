import * as Location from 'expo-location';
import { LocationPermissionResponse } from 'expo-location';

export const requestLocationPermission = (): Promise<Location.PermissionStatus> => {
    return Location.requestForegroundPermissionsAsync().
        then((permissionResponse: LocationPermissionResponse): Location.PermissionStatus => {
            return permissionResponse.status;
        });
};