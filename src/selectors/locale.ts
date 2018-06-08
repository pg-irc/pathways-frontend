// import { Store as LocaleStore } from '../stores/locale';
import * as app from '../application/store';
// import * as model from '../stores/locale';
import { LocalizedText } from '../locale';
import { LocaleInfo } from '../locale/types';

// export const selectLocaleStore = (appStore: app.Store): LocaleStore => {
//     return appStore.applicationState.localeInStore;
// };

// export function selectLocaleCode(localeStore: model.Store): string {
//     return localeStore.code;
// }

export const selectLocale = (appStore: app.Store): LocaleInfo => {
    const store = appStore.applicationState.localeInStore;
    return {
        code: store.code,
        fallback: store.fallback,
    };
};

export function selectLocalizedText (locale: LocaleInfo, localizedText: LocalizedText): string {
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