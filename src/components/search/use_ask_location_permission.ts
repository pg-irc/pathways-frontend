// tslint:disable: no-expression-statement
import { useEffect } from 'react';
import * as Location from 'expo-location';
import { requestLocationPermission } from '../../application/helpers/request_location_permission';

export const useAskLocationPermission = (setLocationToMyLocation: () => void): void => {
    useEffect((): void => {
        const askLocationPermission = async (): Promise<void> => {
            const getPermissionResponse = await Location.getForegroundPermissionsAsync();
            const status = getPermissionResponse.status;
            const haveNeverAskedBefore = status === Location.PermissionStatus.UNDETERMINED;
            if (haveNeverAskedBefore) {
                const newStatus = await requestLocationPermission();
                const permissionNewlyGranted = newStatus === Location.PermissionStatus.GRANTED;
                if (permissionNewlyGranted) {
                    setLocationToMyLocation();
                }
            }
        };
        askLocationPermission();
    }, []);
};