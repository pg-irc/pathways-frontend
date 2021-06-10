import { Store } from '../../stores';
import { LanguageDrawer } from '../../stores/user_experience';

export const selectIsLanguageDrawerVisible = (appStore: Store): boolean => (
    appStore.userExperience.languageDrawer !== LanguageDrawer.LanguageDrawerIsClosed
);