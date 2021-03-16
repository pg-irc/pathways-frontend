import { Store } from '../../stores';

export const selectIsRTL = (appStore: Store): boolean => (
    appStore.locale.isRTL
);
