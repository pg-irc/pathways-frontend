// tslint:disable: no-expression-statement
import { EffectCallback, MutableRefObject, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export const useScrollViewToOffset = (scrollViewRef: MutableRefObject<ScrollView>, offset: number): void => (
    useEffect((): EffectCallback | void => {
        if (!scrollViewRef.current) {
            return;
        }

        const timer = setTimeout((): void => {
            scrollViewRef.current.scrollTo({ y: offset, animated: false });
        }, 0);

        return (): void => clearTimeout(timer);
    }, [scrollViewRef, offset])
);