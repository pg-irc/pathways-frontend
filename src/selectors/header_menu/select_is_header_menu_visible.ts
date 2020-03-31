import { Store } from '../../stores';
import { HeaderMenuStore } from '../../stores/header_menu';

export const selectIsHeaderMenuVisible = (appStore: Store): boolean => (
    appStore.headerMenu !== HeaderMenuStore.HeaderMenuIsClosed
);