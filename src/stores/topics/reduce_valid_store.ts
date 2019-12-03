import { TopicStore, ValidTopicStore, LoadingTopicStore } from './stores';
import { Id, TopicList, Topic } from '../../fixtures/types/topics';
import * as constants from '../../application/constants';
import { TopicAction } from './actions';
import * as R from 'ramda';

export const reduceValidStore = (store: ValidTopicStore, action: TopicAction): TopicStore => {
    switch (action.type) {
        case constants.ADD_BOOKMARK:
            return addToTopicList(store, 'savedTopicsList', store.savedTopicsList, action.payload.topicId);

        case constants.REMOVE_BOOKMARK:
            return removeFromTopicList(store, 'savedTopicsList', store.savedTopicsList, action.payload.topicId);

        case constants.CLOSE_QUESTIONNAIRE:
            return new ValidTopicStore({
                ...store,
                topicMap: R.map((topic: Topic): Topic => (
                    {
                        ...topic,
                        newlyRecommended: R.contains(topic.id, action.payload.newlyRecommendedTopics),
                    }
                ), store.topicMap),
            });

        case constants.LOAD_USER_DATA_REQUEST:
            return new LoadingTopicStore(store);

        case constants.CLEAR_ALL_USER_DATA:
            return new ValidTopicStore({
                ...store,
                topicMap: R.map((topic: Topic): Topic => ({ ...topic, completed: false }), store.topicMap),
                savedTopicsList: [],
            });

        default:
            return store;
    }
};

const addToTopicList = (store: ValidTopicStore, property: keyof (ValidTopicStore), topicList: TopicList, value: Id): ValidTopicStore => {
    if (topicList.indexOf(value) !== -1) {
        return store;
    }
    return new ValidTopicStore({ ...store, [property]: [...topicList, value] });
};

const removeFromTopicList = (store: ValidTopicStore, property: keyof (ValidTopicStore), topicList: TopicList, value: Id): ValidTopicStore => {
    if (topicList.indexOf(value) === -1) {
        return store;
    }
    return new ValidTopicStore({ ...store, [property]: topicList.filter((id: Id) => id !== value) });
};
