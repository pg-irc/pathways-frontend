import { Store } from '../../stores';
import { LocaleInfo } from '../../locale/types';
import { pickLocaleStore } from './pick_locale_store';
import { selectProvince } from '../province/select_province';
import { ProvinceCode } from '../../province/types';

export const selectAvailableLocales = (appStore: Store): ReadonlyArray<LocaleInfo> => {
    const store = pickLocaleStore(appStore);
    const province = selectProvince(appStore);
    if (province.code === ProvinceCode.MB) {
        return mbAvailableLocale;
    }
    return store.availableLocales;
};

const mbAvailableLocale: ReadonlyArray<LocaleInfo> = [
    { code: 'en', label: 'English' },
];