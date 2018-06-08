// tslint:disable:no-expression-statement
import { I18nManager, AsyncStorage } from 'react-native';
import { PREFERENCES_LOCALE_CODE } from '../application/constants';
import { LocaleInfoManager } from '.';

export function setTextDirection(localeCode: string): boolean {
    const locale = LocaleInfoManager.get(localeCode);
    const reloadNeeded = I18nManager.isRTL !== locale.isRTL;
    I18nManager.forceRTL(locale.isRTL);
    return reloadNeeded;
}

export function reload(): void {
    Expo.Updates.reloadFromCache();
}

export async function saveCurrentLocaleCode(code: string): Promise<void> {
    return await AsyncStorage.setItem(PREFERENCES_LOCALE_CODE, code);
}

export async function loadCurrentLocaleCode(): Promise<string> {
    return await AsyncStorage.getItem(PREFERENCES_LOCALE_CODE);
}
