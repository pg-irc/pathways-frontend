import { t } from '@lingui/macro';
import { MY_LOCATION } from '../../application/constants';

export const MY_LOCATION_MESSAGE_DESCRIPTOR = t`My Location`;

export const toLocationForQuery = (locationInput: string, i18n: I18n): string => {
    if (isLocalizedMyLocation(locationInput, i18n)) {
        return MY_LOCATION;
    }
    return locationInput;
};

export const isLocalizedMyLocation = (locationInput: string, i18n: I18n): boolean => (
    locationInput === i18n._(MY_LOCATION_MESSAGE_DESCRIPTOR)
);