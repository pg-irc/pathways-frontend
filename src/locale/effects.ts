import { I18nManager, AsyncStorage } from 'react-native';
import { Locale } from './types';
import { PREFERENCES_LOCALE_CODE } from '../application/constants';

export function isReloadNeeded(locale: Locale): boolean {
    return I18nManager.isRTL !== locale.isRTL;
}

export function reloadRTL(setRTL: boolean): void {
    I18nManager.forceRTL(setRTL); // tslint:disable-line:no-expression-statement
    Expo.Updates.reloadFromCache(); // tslint:disable-line:no-expression-statement
}

export async function saveCurrentLocaleCode(code: string): Promise<void> {
    return await AsyncStorage.setItem(PREFERENCES_LOCALE_CODE, code);
}

export async function loadCurrentLocaleCode(): Promise<string> {
    return await AsyncStorage.getItem(PREFERENCES_LOCALE_CODE);
}
