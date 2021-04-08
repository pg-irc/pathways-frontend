import { Store } from '../../stores';
import { LocaleWithLabel } from '../../locale';
import { pickRegion } from '../region/pick_region';
import { RegionCode } from '../../validation/region/types';
import { LocaleInfoManager } from '../../locale';

export const selectAvailableLocales = (appStore: Store): ReadonlyArray<LocaleWithLabel> => {
    const region = pickRegion(appStore);
    if (region === RegionCode.MB) {
        return mbAvailableLocale;
    }
    return LocaleInfoManager.getLocalesWithLabels();
};

const mbAvailableLocale: ReadonlyArray<LocaleWithLabel> = [
    { code: 'en', label: 'English' },
];
