import { Store } from '../../stores';

export const selectIsLocaleSet = (appStore: Store): boolean => (
    appStore.localeInStore.isSet
);
