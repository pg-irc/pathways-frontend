// tslint:disable: no-expression-statement
import * as Permissions from 'expo-permissions';
import { useEffect } from 'react';
import { MY_LOCATION_MESSAGE_DESCRIPTOR } from '../partial_localization/to_location_for_query';
import { getPermission } from './search_input_component';

type LocationSetter = (location: string) => void;

export const useAskLocationPermission = (setLocationInput: LocationSetter, saveLocation: LocationSetter, i18n: I18n): void => {
    useEffect((): void => {
        const askLocationPermission = async (): Promise<void> => {
            const status = await getPermission();
            if (status === Permissions.PermissionStatus.UNDETERMINED) {
                const permissionResponse = await Permissions.askAsync(Permissions.LOCATION);
                if (permissionResponse.status === Permissions.PermissionStatus.GRANTED) {
                    setLocationInput(i18n._(MY_LOCATION_MESSAGE_DESCRIPTOR));
                    saveLocation(i18n._(MY_LOCATION_MESSAGE_DESCRIPTOR));
                }
            }
        };
        askLocationPermission();
    }, []);
};