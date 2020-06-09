
// tslint:disable: no-expression-statement
import { EffectCallback, useEffect, DependencyList } from 'react';
import { BackHandler, NativeEventSubscription } from 'react-native';

export const useHardwareBackButtonPress = (onHardwareBackPress: () => boolean, dependencies: DependencyList): void => {
    useEffect((): EffectCallback => {
        const addListener = (): NativeEventSubscription => BackHandler.addEventListener('hardwareBackPress', onHardwareBackPress);
        const removeListener = (): void => BackHandler.removeEventListener('hardwareBackPress', onHardwareBackPress);

        addListener();

        return removeListener;
    }, dependencies);
};
