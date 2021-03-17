// tslint:disable:no-expression-statement
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { PREFERENCES_LOCALE_CODE, PREFERENCES_IS_RTL } from '../application/constants';
import * as Updates from 'expo-updates';

export const needsTextDirectionChange = async (localeCode: string): Promise<boolean> => {
    const _isRTL = await loadIsRTLBoolean();
    return _isRTL !== isRTL(localeCode);
};

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

export const saveIsRTLBoolean = async (_isRTL: boolean): Promise<void> => (
    await AsyncStorage.setItem(PREFERENCES_IS_RTL, JSON.stringify(_isRTL))
);

export const loadIsRTLBoolean = async (): Promise<boolean> => {
    const _isRTL = await AsyncStorage.getItem(PREFERENCES_IS_RTL);
    return JSON.parse(_isRTL);
};