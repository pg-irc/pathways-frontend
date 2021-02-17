// tslint:disable: no-expression-statement
import * as Permissions from 'expo-permissions';
import { useEffect } from 'react';
import { MY_LOCATION_MESSAGE_DESCRIPTOR } from '../partial_localization/to_location_for_query';
import { getPermission } from './search_input_component';
// tslint:disable-next-line: max-line-length
export const useAskLocationPermission = (setSearchLocationInput: (location: string) => void, saveSearchLocation: (location: string) => void, i18n: I18n): void => {
    useEffect((): void => {
        const askLocationPermission = async (): Promise<void> => {
            const status = await getPermission();
            if (status === Permissions.PermissionStatus.UNDETERMINED) {
                const permissionResponse = await Permissions.askAsync(Permissions.LOCATION);
                if (permissionResponse.status === Permissions.PermissionStatus.GRANTED) {
                    setSearchLocationInput(i18n._(MY_LOCATION_MESSAGE_DESCRIPTOR));
                    saveSearchLocation(i18n._(MY_LOCATION_MESSAGE_DESCRIPTOR));
                }
            }
        };
        askLocationPermission();
    }, []);
};