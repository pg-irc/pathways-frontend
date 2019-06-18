import { Store } from '../../stores';
import { Locale } from '../../locale/types';
import { pickLocaleStore } from './pick_locale_store';
import { toSelectorLocale } from './to_selector_locale';

export const selectLocale = (appStore: Store): Locale => {
    const store = pickLocaleStore(appStore);
    return toSelectorLocale(store);
};
