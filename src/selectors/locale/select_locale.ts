import { Store } from '../../stores';
import { Locale } from '../../locale/types';

export const selectLocale = (appStore: Store): Locale => {
    const store = appStore.localeInStore;
    return {
        code: store.code,
        fallback: store.fallback,
    };
};
