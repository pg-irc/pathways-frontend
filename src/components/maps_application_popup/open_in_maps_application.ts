// tslint:disable no-expression-statement
import { showLocation } from 'react-native-map-link';
import { LatLong } from '../../validation/latlong/types';

export const openInMapsApplication = (title: string, latLong: LatLong): Promise<void | string> => (
    showLocation({
        title: title,
        latitude: latLong.lat,
        longitude: latLong.lng,
        appsWhiteList: ['apple-maps', 'google-maps'],
    }).catch((): void => alert('Supported applications include Apple or Google maps.'))
);