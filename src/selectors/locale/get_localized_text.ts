import { LocalizedText } from '../../locale';
import { Locale } from '../../locale/types';

export { Locale, LocaleInfo } from '../../locale/types';

export const getLocalizedText = (locale: Locale, localizedText: LocalizedText): string => {
    const placeholder = `missing in ${locale.code}&${locale.fallback}`;
    return getLocalizedTextOrDefault(placeholder, locale, localizedText);
};

export const getLocalizedTextOrDefault = (theDefault: string, locale: Locale, localizedText: LocalizedText): string => {
    if (localizedText[locale.code]) {
        return localizedText[locale.code];
    }
    if (localizedText[locale.fallback]) {
        return localizedText[locale.fallback];
    }
    return theDefault;
};
