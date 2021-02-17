// tslint:disable: no-expression-statement
import * as Permissions from 'expo-permissions';
import { useEffect } from 'react';

export const useAskLocationPermission = (setLocationToMyLocation: () => void): void => {
    useEffect((): void => {
        const askLocationPermission = async (): Promise<void> => {
            const getPermissionResponse = await Permissions.getAsync(Permissions.LOCATION);
            const haveNeverAskedBefore = getPermissionResponse.status === Permissions.PermissionStatus.UNDETERMINED;
            if (haveNeverAskedBefore) {
                const askPermissionResponse = await Permissions.askAsync(Permissions.LOCATION);
                const permissionNewlyGranted = askPermissionResponse.status === Permissions.PermissionStatus.GRANTED;
                if (permissionNewlyGranted) {
                    setLocationToMyLocation();
                }
            }
        };
        askLocationPermission();
    }, []);
};