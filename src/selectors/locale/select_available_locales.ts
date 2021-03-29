import { Store } from '../../stores';
import { LocaleInfo } from '../../locale/types';
import { pickLocaleStore } from './pick_locale_store';
import { pickRegion } from '../region/pick_region';
import { RegionCode } from '../../validation/region/types';

export const selectAvailableLocales = (appStore: Store): ReadonlyArray<LocaleInfo> => {
    const store = pickLocaleStore(appStore);
    const region = pickRegion(appStore);
    if (region === RegionCode.MB) {
        return mbAvailableLocale;
    }
    return store.availableLocales;
};

const mbAvailableLocale: ReadonlyArray<LocaleInfo> = [
    { code: 'en', label: 'English' },
];
