import { Store } from '../../stores';

export const selectDiscardFeedbackModalIsVisible = (appStore: Store): boolean => (
    appStore.services.discardFeedbackModalIsVisible
);