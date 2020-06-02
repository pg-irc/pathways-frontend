import { Store } from '../../stores';

export const selectSearchOffset = (appStore: Store): number => (
    appStore.listOffset.searchOffset
);