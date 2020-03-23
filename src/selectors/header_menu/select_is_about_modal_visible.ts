import { Store } from '../../stores';

export const selectIsAboutModalVisible = (appStore: Store): boolean => (
    appStore.headerMenu.isAboutModalVisible
);