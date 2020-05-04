
// tslint:disable: no-expression-statement
import { EffectCallback, useEffect } from 'react';
import { BackHandler, NativeEventSubscription } from 'react-native';

export const useHardwareBackButtonPress = (onHardwareBackPress: () => boolean): void => {
    useEffect((): EffectCallback => {
        const addListener = (): NativeEventSubscription => BackHandler.addEventListener('hardwareBackPress', onHardwareBackPress);
        const removeListener = (): void => BackHandler.removeEventListener('hardwareBackPress', onHardwareBackPress);

        addListener();

        return removeListener;
    }, []);
};