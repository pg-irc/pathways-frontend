// tslint:disable no-class no-this no-expression-statement
import { sendLinkPressedEvent } from '../../sagas/analytics/events';
import { showLocation } from 'react-native-map-link';

export const openInMapsApplication = (title: string, lat: number, lng: number, currentPathForAnalytics: string, linkContextForAnalytics: string):
() => Promise<void> => (
    (): Promise<void> => {
        const linkType = 'Button';
        const linkValue = 'Open in maps';
        sendLinkPressedEvent(currentPathForAnalytics, linkContextForAnalytics, linkType, linkValue);
        return (
            showLocation({
                title: title,
                latitude: lat,
                longitude: lng,
                appsWhiteList: ['apple-maps', 'google-maps'],
            }).catch((): void => alert('Supported applications include Apple or Google maps.'))
        );
    }
);
