import { TaskStore, LoadingTaskStore, InvalidTaskStore } from './stores';
import { buildTasksFixture } from '../../fixtures/buildFixtures';
import { TaskAction } from './actions';
import { reduceLoadingStore } from './reduce_loading_store';
import { reduceInvalidStore } from './reduce_invalid_store';
import { reduceValidStore } from './reduce_valid_store';

export { TaskStore, ValidTaskStore, LoadingTaskStore, InvalidTaskStore, toValidOrThrow } from './stores';
export { Id, TaskList, TaskMap, Task } from '../../fixtures/types/tasks';
export {
    addToSavedList, AddToSavedListAction, removeFromSavedList,
    RemoveFromSavedListAction, toggleCompleted, ToggleCompletedAction,
} from './actions';

export const buildDefaultStore = (): TaskStore => (
    buildTasksFixture()
);

export const reducer = (store: TaskStore = buildDefaultStore(), action?: TaskAction): TaskStore => {
    if (!action) {
        return store;
    }
    if (store instanceof LoadingTaskStore) {
        return reduceLoadingStore(store, action);
    }
    if (store instanceof InvalidTaskStore) {
        return reduceInvalidStore(store, action);
    }
    return reduceValidStore(store, action);
};
