// tslint:disable: no-expression-statement
import { useEffect } from 'react';
import * as Location from 'expo-location';
import { isAndroid } from '../../application/helpers/is_android';
import { requestLocationPermission } from '../../application/helpers/request_location_permission';

export const useAskLocationPermission = (setLocationToMyLocation: () => void): void => {
    useEffect((): void => {
        const askLocationPermission = async (): Promise<void> => {
            const getPermissionResponse = await Location.getPermissionsAsync();
            const status = isAndroid() ? getPermissionResponse.android.scope : getPermissionResponse.ios.scope;
            const haveNeverAskedBefore = status === 'none';
            if (haveNeverAskedBefore) {
                const newStatus = await requestLocationPermission();
                const permissionNewlyGranted = newStatus !== 'none';
                if (permissionNewlyGranted) {
                    setLocationToMyLocation();
                }
            }
        };
        askLocationPermission();
    }, []);
};