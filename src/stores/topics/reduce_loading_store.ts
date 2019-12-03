import { TopicStore, ValidTopicStore, LoadingTopicStore, InValidTopicStore } from './stores';
import * as UserStateActions from '../../application/constants';
import { TopicAction } from './actions';
import { TopicMap, Id } from '../../fixtures/types/topics';
import * as R from 'ramda';

export const reduceLoadingStore = (store: LoadingTopicStore, action: TopicAction): TopicStore => {
    switch (action.type) {
        case UserStateActions.LOAD_USER_DATA_SUCCESS:
            return new ValidTopicStore({
                topicMap: store.lastValidState.topicMap,
                savedTopicsList: filterValidIds(store.lastValidState.topicMap, action.payload.savedTopics),
            });
        case UserStateActions.LOAD_USER_DATA_FAILURE:
            return new InValidTopicStore(store.lastValidState, action.payload.message);
        default:
            return store;
    }
};

const filterValidIds = (topics: TopicMap, ids: ReadonlyArray<Id>): ReadonlyArray<Id> => (
    R.filter((id: string): boolean => R.has(id, topics), ids)
);
