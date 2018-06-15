import * as app from '../application/store';
import { LocalizedText } from '../locale';
import { Locale, LocaleInfo } from '../locale/types';

export { Locale, LocaleInfo } from '../locale/types';

export function selectLocale(appStore: app.Store): Locale {
    const store = appStore.applicationState.localeInStore;
    return {
        code: store.code,
        fallback: store.fallback,
    };
}

export function selectAvailableLocales(appStore: app.Store): ReadonlyArray<LocaleInfo> {
    return appStore.applicationState.localeInStore.availableLocales;
}

export function selectLocalizedText(locale: Locale, localizedText: LocalizedText): string {
    if (localizedText[locale.code]) {
        return localizedText[locale.code];
    }
    if (localizedText[locale.fallback]) {
        return localizedText[locale.fallback];
    }
    return `missing in ${locale.code}&${locale.fallback}`;
}