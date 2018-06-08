// tslint:disable:no-expression-statement
import { I18nManager, AsyncStorage } from 'react-native';
import { PREFERENCES_LOCALE_CODE } from '../application/constants';
import { LocaleInfoManager } from '.';

export function needsTextDirectionChange(localeCode: string): boolean {
    const locale = LocaleInfoManager.get(localeCode);
    return I18nManager.isRTL !== locale.isRTL;
}

export function toggleTextDirection(): void {
    I18nManager.forceRTL(I18nManager.isRTL);
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
