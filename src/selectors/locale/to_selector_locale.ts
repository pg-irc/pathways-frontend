import { LocaleCode } from '../../locale/types';
import { LocaleStore } from '../../stores/locale';

export const toSelectorLocale = (store: LocaleStore): LocaleCode => store.code;
