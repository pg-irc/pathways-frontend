import { Store } from '../../stores';

export const selectTopicServicesOffset = (appStore: Store): number => (
    appStore.listOffset.topicServicesOffset
);