import { Store } from '../../stores';
import { LocaleInfo } from '../../locale/types';
import { pickLocaleStore } from './pick_locale_store';

export const selectAvailableLocales = (appStore: Store): ReadonlyArray<LocaleInfo> => {
    const store = pickLocaleStore(appStore);
    return store.availableLocales;
};
