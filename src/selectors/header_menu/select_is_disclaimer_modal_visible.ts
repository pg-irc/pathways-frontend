import { Store } from '../../stores';
import { HeaderMenuStore } from '../../stores/header_menu';

export const selectIsDisclaimerModalVisible = (appStore: Store): boolean => (
    appStore.headerMenu === HeaderMenuStore.DisclaimerModalIsOpen
);