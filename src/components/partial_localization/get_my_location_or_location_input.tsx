import { t } from '@lingui/macro';
import { MY_LOCATION } from '../../application/constants';

export const LOCALIZED_MY_LOCATION = t`My Location`;

export const getMyLocationOrLocationInput = (locationInput: string, i18n: I18n): string => {
    if (isLocalizedMyLocation(locationInput, i18n)) {
        return MY_LOCATION;
    }
    return locationInput;
};

const isLocalizedMyLocation = (locationInput: string, i18n: I18n): boolean => (
    locationInput === i18n._(LOCALIZED_MY_LOCATION)
);