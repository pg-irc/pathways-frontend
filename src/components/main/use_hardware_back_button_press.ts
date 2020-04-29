import { EffectCallback, useEffect } from 'react';
import { BackHandler } from 'react-native';

export const useHardwareBackButtonPress = (onHardwareBackPress: () => boolean): void => {
    useEffect((): EffectCallback => {
        // tslint:disable-next-line: no-expression-statement
        const backHandler = BackHandler.addEventListener('hardwareBackPress', onHardwareBackPress);

        return backHandler.remove;
    }, []);
};