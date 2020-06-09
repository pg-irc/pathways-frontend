import { Store } from '../../stores';
import { HeaderMenu } from '../../stores/user_experience';

export const selectIsAboutModalVisible = (appStore: Store): boolean => (
    appStore.userExperience.headerMenu === HeaderMenu.AboutModalIsOpen
);