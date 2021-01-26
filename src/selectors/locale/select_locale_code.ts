import { Store } from '../../stores';
import { pickLocaleStore } from './pick_locale_store';
import { toSelectorLocale } from './to_selector_locale';

export const selectLocaleCode = (appStore: Store): string => {
    const store = pickLocaleStore(appStore);
    return toSelectorLocale(store).code;
};
