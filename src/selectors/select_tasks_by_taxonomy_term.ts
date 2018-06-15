import { Locale } from '../locale';
import { TaxonomyTermReference } from './taxonomies';
import { Store, Task as StoreTask, TaskUserSettings as StoreUserTask } from '../stores/tasks';
import { denormalizeTask, Task as SelectorTask } from './tasks';
import * as R from 'ramda';

export const selectTasksByTaxonomyTerm =
    (locale: Locale, taskStore: Store, needle: TaxonomyTermReference): ReadonlyArray<SelectorTask> => {

        const matchesNeedle = (id: TaxonomyTermReference): boolean => (
            id.taxonomyId === needle.taxonomyId && id.taxonomyTermId === needle.taxonomyTermId
        );

        const hasMatch = (task: StoreTask): boolean => (
            R.any(matchesNeedle, task.taxonomyTerms)
        );

        const findUserTask = (task: StoreTask): StoreUserTask => {
            const getUserTasks = R.compose(R.values, R.pickBy(R.propEq('taskId', task.id)));
            const userTasks = getUserTasks(taskStore.taskUserSettingsMap);
            return validateUserTaskResult(userTasks, task.id);
        };

        const validateUserTaskResult = (userTasks: ReadonlyArray<StoreUserTask>, taskId: string): StoreUserTask => {
            if (userTasks.length !== 1) {
                throw new Error(`Could not find TaskUserSettings for task id: ${taskId}`);
            }
            return userTasks[0];
        };

        const denormalize = (task: StoreTask): SelectorTask => (
            denormalizeTask(locale, task, findUserTask(task))
        );

        return R.map(denormalize, R.values(R.filter(hasMatch, taskStore.taskMap)));
    };
