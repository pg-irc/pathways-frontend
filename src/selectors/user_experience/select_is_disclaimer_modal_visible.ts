import { Store } from '../../stores';
import { HeaderMenu } from '../../stores/user_experience';

export const selectIsDisclaimerModalVisible = (appStore: Store): boolean => (
    appStore.userExperience.headerMenu === HeaderMenu.DisclaimerModalIsOpen
);