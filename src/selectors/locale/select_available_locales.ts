import { Store } from '../../stores';
import { LocaleWithLabel } from '../../application/locales';
import { pickRegion } from '../region/pick_region';
import { RegionCode } from '../../validation/region/types';
import { Locales } from '../../application/locales';

export const selectAvailableLocales = (appStore: Store): ReadonlyArray<LocaleWithLabel> => {
    const region = pickRegion(appStore);
    if (region === RegionCode.MB) {
        return mbAvailableLocale;
    }
    return Locales.getLocalesWithLabels();
};

const mbAvailableLocale: ReadonlyArray<LocaleWithLabel> = [
    { code: 'en', label: 'English' },
];
