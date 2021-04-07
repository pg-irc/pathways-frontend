import { LocalizedText } from '../../locale';
import { Locale } from '../../locale/types';

export { Locale } from '../../locale/types';

export const getLocalizedText = (locale: Locale, localizedText: LocalizedText): string => {
    const fallback = 'en';
    const placeholder = `missing in ${locale.code}&${fallback}`;
    return getLocalizedTextOrDefault(placeholder, locale.code, fallback, localizedText);
};

export const getLocalizedTextOrDefault = (theDefault: string, locale: string, fallback: string, localizedText: LocalizedText): string => {
    if (localizedText[locale]) {
        return localizedText[locale];
    }
    if (localizedText[fallback]) {
        return localizedText[fallback];
    }
    return theDefault;
};
