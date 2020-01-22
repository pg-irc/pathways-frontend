import { Store } from '../../stores';

export const selectShowPartialLocalizationMessage = (appStore: Store): boolean => (
    appStore.userProfile.showPartialLocalizationMessage
);
