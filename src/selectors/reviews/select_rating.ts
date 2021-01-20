import { Store } from '../../stores';
import { Rating } from '../../stores/reviews';

export const selectRating = (appStore: Store): Rating => (
    appStore.reviews.rating
);
