import { Store } from '../../stores';

export const selectShowDiscardChangesModal = (appStore: Store): boolean => (
    appStore.reviews.showDiscardChangesModal
);
