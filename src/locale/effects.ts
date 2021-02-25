// tslint:disable:no-expression-statement
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { PREFERENCES_LOCALE_CODE } from '../application/constants';
import * as Updates from 'expo-updates';

export function needsTextDirectionChange(localeCode: string): boolean {
    return I18nManager.isRTL !== isRTL(localeCode);
}

export function setTextDirection(localeCode: string): void {
    const forceRTLAsync = new Promise((resolve: (value: unknown) => void): void => {
        setTimeout((): void => {
            resolve(I18nManager.forceRTL(isRTL(localeCode)));
        }, 1000);
      });
    forceRTLAsync.then((): void => {
        reload();
    });
}

export const isRTL = (localeCode: string): boolean => (localeCode === 'ar');

export function reload(): void {
    Updates.reloadAsync();
}

export async function saveCurrentLocaleCode(code: string): Promise<void> {
    return await AsyncStorage.setItem(PREFERENCES_LOCALE_CODE, code);
}

export async function loadCurrentLocaleCode(): Promise<string> {
    return await AsyncStorage.getItem(PREFERENCES_LOCALE_CODE);
}
