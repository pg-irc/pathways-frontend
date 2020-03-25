import { Store } from '../../stores';
import { HeaderMenuStore } from '../../stores/header_menu';

export const selectHeaderMenuState = (appStore: Store): HeaderMenuStore => (
    appStore.headerMenu
);