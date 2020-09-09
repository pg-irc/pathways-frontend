import { Store } from '../../stores';

export const selectHomePageScrollOffset = (appStore: Store): number => (
    appStore.userExperience.homepageScrollOffset
);
