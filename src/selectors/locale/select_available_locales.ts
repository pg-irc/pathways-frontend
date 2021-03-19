import { Store } from '../../stores';
import { LocaleInfo } from '../../locale/types';
import { pickLocaleStore } from './pick_locale_store';
import { selectRegion } from '../region/select_region';
import { RegionCode } from '../../region/types';

export const selectAvailableLocales = (appStore: Store): ReadonlyArray<LocaleInfo> => {
    const store = pickLocaleStore(appStore);
    const province = selectRegion(appStore);
    if (province.code === RegionCode.MB) {
        return mbAvailableLocale;
    }
    return store.availableLocales;
};

const mbAvailableLocale: ReadonlyArray<LocaleInfo> = [
    { code: 'en', label: 'English' },
];