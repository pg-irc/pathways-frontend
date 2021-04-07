import { Locale } from '../../locale/types';
import { LocaleStore } from '../../stores/locale';

export const toSelectorLocale = (store: LocaleStore): Locale => store.code;
