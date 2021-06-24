import { Store } from '../../stores';
import { LanguageDrawer } from '../../stores/user_experience';

export const selectIsLanguageDrawerOpen = (appStore: Store): boolean => (
    appStore.userExperience.languageDrawer === LanguageDrawer.LanguageDrawerIsOpen
);