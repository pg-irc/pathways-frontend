import { LocalizedText } from '../../locale';
import { LocaleCode } from '../../locale/types';

export { LocaleCode } from '../../locale/types';

export const getLocalizedText = (locale: LocaleCode, localizedText: LocalizedText): string => {
    const fallback = 'en';
    const placeholder = `missing in ${locale}&${fallback}`;
    return getLocalizedTextOrDefault(placeholder, locale, fallback, localizedText);
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
