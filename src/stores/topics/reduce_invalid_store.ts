import { TaskStore, InValidTopicStore } from './stores';
import { CLEAR_ERROR_STATE } from '../../application/constants';
import { TaskAction } from './actions';

export const reduceInvalidStore = (store: InValidTopicStore, action: TaskAction): TaskStore => {
    if (action.type === CLEAR_ERROR_STATE) {
        return store.lastValidState;
    }
    return store;
};
