import { Store } from '../../stores';
import { LocaleStore } from '../../stores/locale';

export const pickLocaleStore = (appStore: Store): LocaleStore => (
    appStore.locale
);
