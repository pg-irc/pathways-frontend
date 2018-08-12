import { Store } from '../../stores';
import { LocaleInfo } from '../../locale/types';

export const pullAvailableLocales = (appStore: Store): ReadonlyArray<LocaleInfo> => (
    appStore.localeInStore.availableLocales
);
