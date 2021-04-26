import { LocaleCode } from '../../application/locales';
import { LocaleStore } from '../../stores/locale';

export const toSelectorLocale = (store: LocaleStore): LocaleCode => store.code;
