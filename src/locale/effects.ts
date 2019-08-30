// tslint:disable:no-expression-statement
import { I18nManager, AsyncStorage } from 'react-native';
import { PREFERENCES_LOCALE_CODE } from '../application/constants';

export async function needsTextDirectionChange(localeCode: string): Promise<boolean> {
    return await I18nManager.isRTL !== isRTL(localeCode);
}

export async function setTextDirection(localeCode: string): Promise<void> {
    await I18nManager.forceRTL(isRTL(localeCode));
    await reload();
}

export const isRTL = (localeCode: string): boolean => (localeCode === 'ar');

export async function reload(): Promise<void> {
    console.log('reload being called');
    await Expo.Updates.reloadFromCache();
}

export async function saveCurrentLocaleCode(code: string): Promise<void> {
    return await AsyncStorage.setItem(PREFERENCES_LOCALE_CODE, code);
}

export async function loadCurrentLocaleCode(): Promise<string> {
    return await AsyncStorage.getItem(PREFERENCES_LOCALE_CODE);
}
