// tslint:disable no-expression-statement
import { showLocation } from 'react-native-map-link';

export const openInMapsApplication = (title: string, lat: number, lng: number): Promise<void> => (
    showLocation({
        title: title,
        latitude: lat,
        longitude: lng,
        appsWhiteList: ['apple-maps', 'google-maps'],
    }).catch((): void => alert('Supported applications include Apple or Google maps.'))
);