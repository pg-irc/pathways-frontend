import { Store } from '../../stores';

export const selectExploreDetailScrollOffset = (appStore: Store): number => (
    appStore.userExperience.exploreDetailScrollOffset
);
