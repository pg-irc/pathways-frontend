import { Store, ValidStore, LoadingStore, InvalidStore } from './stores';
import * as UserStateActions from '../../application/constants';
import { TaskAction } from './actions';
import { TaskMap, Id } from '../../fixtures/types/tasks';
import R from 'ramda';

export const reduceLoadingStore = (store: LoadingStore, action: TaskAction): Store => {
    switch (action.type) {
        case UserStateActions.LOAD_USER_DATA_SUCCESS:
            return new ValidStore({
                taskMap: store.lastValidState.taskMap,
                savedTasksList: filterValidIds(store.lastValidState.taskMap, action.payload.savedTasks),
            });
        case UserStateActions.LOAD_USER_DATA_FAILURE:
            return new InvalidStore(store.lastValidState, action.payload.message);
        default:
            return store;
    }
};

const filterValidIds = (tasks: TaskMap, ids: ReadonlyArray<Id>): ReadonlyArray<Id> => (
    R.filter((id: string): boolean => R.has(id, tasks), ids)
);
