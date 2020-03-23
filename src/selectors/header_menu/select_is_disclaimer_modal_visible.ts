import { Store } from '../../stores';

export const selectIsDisclaimerModalVisible = (appStore: Store): boolean => (
    appStore.headerMenu.isDisclaimerModalVisible
);