import { Locale } from '../../locale/types';
import { LocaleStore } from '../../stores/locale';

export const toSelectorLocale = (store: LocaleStore): Locale => (
    {
        code: store.code,
        fallback: store.fallback,
    }
);
