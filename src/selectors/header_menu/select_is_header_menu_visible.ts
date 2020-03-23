import { Store } from '../../stores';

export const selectIsHeaderMenuVisible = (appStore: Store): boolean => (
    appStore.headerMenu.isHeaderMenuVisible
);