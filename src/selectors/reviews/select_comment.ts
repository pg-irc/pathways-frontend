import { Store } from '../../stores';

export const selectComment = (appStore: Store): string => (
    appStore.reviews.comment
);
