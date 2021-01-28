import { Store } from '../../stores';
import { pickLocaleStore } from './pick_locale_store';

export const selectLocaleCode = (appStore: Store): string => {
    const store = pickLocaleStore(appStore);
    return store.code;
};
