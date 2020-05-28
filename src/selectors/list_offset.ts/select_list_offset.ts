import { Store } from '../../stores';

export const selectListOffset = (appStore: Store): number => (
    appStore.listOffset.listOffset
);