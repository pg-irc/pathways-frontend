import { Store } from '../../stores';

export const selectRating = (appStore: Store): number => (
    appStore.reviews.rating
);
