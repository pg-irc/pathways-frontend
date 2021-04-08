import { Store } from '../../stores';
import { LocaleCode } from '../../application/locales';
import { pickLocaleStore } from './pick_locale_store';
import { toSelectorLocale } from './to_selector_locale';

export const selectLocale = (appStore: Store): LocaleCode => {
    const store = pickLocaleStore(appStore);
    return toSelectorLocale(store);
};
