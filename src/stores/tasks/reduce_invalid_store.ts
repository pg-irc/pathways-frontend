import { Store, InvalidStore } from './stores';
import { CLEAR_ERROR_STATE } from '../../application/constants';
import { TaskAction } from './actions';

export const reduceInvalidStore = (store: InvalidStore, action: TaskAction): Store => {
    if (action.type === CLEAR_ERROR_STATE) {
        return store.lastValidState;
    }
    return store;
};
