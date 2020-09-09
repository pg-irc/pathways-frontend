import { Store } from '../../stores';

export const selectTopicDetailScrollOffset = (appStore: Store): number => (
    appStore.userExperience.topicDetailScrollOffset
);
