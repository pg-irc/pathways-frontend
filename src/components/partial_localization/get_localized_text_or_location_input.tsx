import { MY_LOCATION } from '../../application/constants';

export const getLocalizedTextOrLocationInput = (locationInput: string, localizedMyLocation: TemplateStringsArray, i18n: I18n): string => (
    locationInput === i18n._(localizedMyLocation) ? MY_LOCATION : locationInput
);