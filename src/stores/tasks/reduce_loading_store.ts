import { Store, ValidStore, LoadingStore, InvalidStore } from './stores';
import * as UserStateActions from '../../application/constants';
import { TaskAction } from './actions';

export const reduceLoadingStore = (store: LoadingStore, action: TaskAction): Store => {
    switch (action.type) {
        case UserStateActions.LOAD_USER_DATA_SUCCESS:
            return new ValidStore({
                taskMap: store.lastValidState.taskMap,
                // TODO add validation on task ids from action
                savedTasksList: action.payload.savedTasks,
            });
        case UserStateActions.LOAD_USER_DATA_FAILURE:
            return new InvalidStore(store.lastValidState, action.payload.message);
        default:
            return store;
    }
};
