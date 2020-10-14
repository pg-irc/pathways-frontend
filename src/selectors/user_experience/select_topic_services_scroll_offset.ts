import { Store } from '../../stores';

export const selectTopicServicesScrollOffset = (appStore: Store): number => (
    appStore.userExperience.topicServicesScrollOffset
);
