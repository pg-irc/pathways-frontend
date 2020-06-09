import { Store } from '../../stores';
import { HeaderMenu } from '../../stores/user_experience';

export const selectIsHeaderMenuVisible = (appStore: Store): boolean => (
    appStore.userExperience.headerMenu !== HeaderMenu.HeaderMenuIsClosed
);