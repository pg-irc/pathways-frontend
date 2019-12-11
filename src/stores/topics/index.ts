import { TopicStore, LoadingTopicStore, InValidTopicStore } from './stores';
import { buildTasksFixture } from '../../fixtures/buildFixtures';
import { TopicAction } from './actions';
import { reduceLoadingStore } from './reduce_loading_store';
import { reduceInvalidStore } from './reduce_invalid_store';
import { reduceValidStore } from './reduce_valid_store';

export { TopicStore, ValidTopicStore, LoadingTopicStore, InValidTopicStore, toValidOrThrow } from './stores';
export { Id, TopicList, TopicMap, Topic } from '../../fixtures/types/topics';
export {
    addToSavedList, AddToSavedListAction,
    removeFromSavedList, RemoveFromSavedListAction,
    expandTopicDetail, ExpandTopicDetailAction,
    reduceTopicDetail, ReduceTopicDetailAction,
} from './actions';

export const buildDefaultStore = (): TopicStore => (
    buildTasksFixture()
);

export const reducer = (store: TopicStore = buildDefaultStore(), action?: TopicAction): TopicStore => {
    if (!action) {
        return store;
    }
    if (store instanceof LoadingTopicStore) {
        return reduceLoadingStore(store, action);
    }
    if (store instanceof InValidTopicStore) {
        return reduceInvalidStore(store, action);
    }
    return reduceValidStore(store, action);
};
