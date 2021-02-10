// tslint:disable: no-expression-statement
import { EffectCallback, useEffect } from 'react';
import { FlatList } from 'react-native';
import { HumanServiceData } from '../validation/services/types';

export const useServicesScrollToOffset = (
    flatListRef: React.MutableRefObject<FlatList>,
    offset: number,
    services: ReadonlyArray<HumanServiceData>,
    ): void => (
    useEffect((): EffectCallback | void => {
        if (services.length <= 0) {
            return;
        }
        // tslint:disable-next-line: max-line-length
        // https://stackoverflow.com/questions/60374750/flatlist-is-not-scrolling-to-desired-offset-when-scrolltooffset-is-used
        const timer = setTimeout((): void => {
            flatListRef.current.scrollToOffset({ animated: false, offset });
        }, 0);

        return (): void => clearTimeout(timer);
    }, [flatListRef, offset, services])
);