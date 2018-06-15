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
            R.any(matchesNeedle, task.taxonomyTermReferences)
        );

        const findUserTask = (task: StoreTask): StoreUserTask => (
            R.find((u: StoreUserTask) => u.taskId === task.id, R.values(taskStore.taskUserSettingsMap))
        );

        const denormalize = (task: StoreTask): SelectorTask => (
            denormalizeTask(locale, task, findUserTask(task))
        );

        return R.map(denormalize, R.values(R.filter(hasMatch, taskStore.taskMap)));
    };
