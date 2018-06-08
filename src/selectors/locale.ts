import * as app from '../application/store';
import { LocalizedText } from '../locale';
import { Locale, LocaleInfo } from '../locale/types';

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

export function selectLocalizedText (locale: Locale, localizedText: LocalizedText): string {
    if (localizedText[locale.code]) {
        return localizedText[locale.code];
    } else if (localizedText[locale.fallback]) {
        return localizedText[locale.fallback];
    } else {
        // TODO: Should this be fatal or just return a empty string?
        // return '';
        throw new Error(`Missing text for locale: ${locale.code} or fallback ${locale.fallback}`);
    }
}