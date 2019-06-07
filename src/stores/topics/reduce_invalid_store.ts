import { TopicStore, InValidTopicStore } from './stores';
import { CLEAR_ERROR_STATE } from '../../application/constants';
import { TopicAction } from './actions';

export const reduceInvalidStore = (store: InValidTopicStore, action: TopicAction): TopicStore => {
    if (action.type === CLEAR_ERROR_STATE) {
        return store.lastValidState;
    }
    return store;
};
