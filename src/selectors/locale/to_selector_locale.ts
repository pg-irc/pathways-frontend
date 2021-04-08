import { LocaleCode } from '../../locale';
import { LocaleStore } from '../../stores/locale';

export const toSelectorLocale = (store: LocaleStore): LocaleCode => store.code;
