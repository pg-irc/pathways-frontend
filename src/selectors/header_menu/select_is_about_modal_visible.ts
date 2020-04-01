import { Store } from '../../stores';
import { HeaderMenuStore } from '../../stores/header_menu';

export const selectIsAboutModalVisible = (appStore: Store): boolean => (
    appStore.headerMenu === HeaderMenuStore.AboutModalIsOpen
);