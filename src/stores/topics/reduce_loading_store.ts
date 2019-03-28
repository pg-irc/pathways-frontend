import { TaskStore, ValidTaskStore, LoadingTaskStore, InvalidTaskStore } from './stores';
import * as UserStateActions from '../../application/constants';
import { TaskAction } from './actions';
import { TopicMap, Id, Topic } from '../../fixtures/types/topics';
import * as R from 'ramda';

export const reduceLoadingStore = (store: LoadingTaskStore, action: TaskAction): TaskStore => {
    switch (action.type) {
        case UserStateActions.LOAD_USER_DATA_SUCCESS:
            return new ValidTaskStore({
                topicMap: R.map(setCompleted(action.payload.completedTasks), store.lastValidState.topicMap),
                savedTopicsList: filterValidIds(store.lastValidState.topicMap, action.payload.savedTasks),
            });
        case UserStateActions.LOAD_USER_DATA_FAILURE:
            return new InvalidTaskStore(store.lastValidState, action.payload.message);
        default:
            return store;
    }
};

const filterValidIds = (tasks: TopicMap, ids: ReadonlyArray<Id>): ReadonlyArray<Id> => (
    R.filter((id: string): boolean => R.has(id, tasks), ids)
);

const setCompleted = R.curry((completedTaskIds: ReadonlyArray<Id>, task: Topic): Topic => ({
    ...task,
    completed: R.contains(task.id, completedTaskIds),
}));
