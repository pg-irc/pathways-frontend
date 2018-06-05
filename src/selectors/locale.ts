import { Store as LocaleStore } from '../stores/locale';
import * as app from '../application/store';
import * as model from '../stores/locale';
import { Locale, LocalizedText } from '../application/locale';

export const selectLocaleStore = (appStore: app.Store): LocaleStore => {
    return appStore.applicationState.localeInStore;
};

export function selectLocaleCode(localeStore: model.Store): string {
    return localeStore.code;
}

export const selectLocale = (appStore: app.Store): string => {
    return selectLocaleCode(selectLocaleStore(appStore));
};

export function selectLocalizedText (locale: Locale, localizedText: LocalizedText): string {
    return localizedText[locale.code]; // TODO: handle fallback locale (eg: via something like locale.default)
}