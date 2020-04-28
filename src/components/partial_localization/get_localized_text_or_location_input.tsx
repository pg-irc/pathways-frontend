import { t } from '@lingui/macro';
import { MY_LOCATION } from '../../application/constants';

export const LOCALIZED_MY_LOCATION = t`My Location`;

export const getLocalizedTextOrLocationInput = (locationInput: string, i18n: I18n): string => (
    locationInput === i18n._(LOCALIZED_MY_LOCATION) ? MY_LOCATION : locationInput
);