import { Store, LoadingStore, InvalidStore } from './stores';
import { buildTasksFixture } from '../../fixtures/buildFixtures';
import { TaskAction } from './actions';
import { reduceLoadingStore } from './reduce_loading_store';
import { reduceInvalidStore } from './reduce_invalid_store';
import { reduceValidStore } from './reduce_valid_store';

export { Store, ValidStore, LoadingStore, InvalidStore, toValidOrThrow } from './stores';
export { Id, TaskList, TaskMap, Task } from '../../fixtures/types/tasks';
export {
    addToSavedList, AddToSavedListAction, removeFromSavedList,
    RemoveFromSavedListAction, toggleCompleted, ToggleCompletedAction,
} from './actions';

export const buildDefaultStore = (): Store => (
    buildTasksFixture()
);

export const reducer = (store: Store = buildDefaultStore(), action?: TaskAction): Store => {
    if (!action) {
        return store;
    }
    if (store instanceof LoadingStore) {
        return reduceLoadingStore(store, action);
    }
    if (store instanceof InvalidStore) {
        return reduceInvalidStore(store, action);
    }
    return reduceValidStore(store, action);
};
