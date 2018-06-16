import { Locale } from '../locale';
import { TaxonomyTermReference } from './taxonomies';
import { Store, Task as StoreTask } from '../stores/tasks';
import { denormalizeTask, Task as SelectorTask, selectTaskUserSettingsByTaskId } from './tasks';
import * as R from 'ramda';

export const selectTasksByTaxonomyTerm =
    (locale: Locale, taskStore: Store, needle: TaxonomyTermReference): ReadonlyArray<SelectorTask> => {

        const matchesNeedle = (id: TaxonomyTermReference): boolean => (
            id.taxonomyId === needle.taxonomyId && id.taxonomyTermId === needle.taxonomyTermId
        );

        const hasMatch = (task: StoreTask): boolean => (
            R.any(matchesNeedle, task.taxonomyTerms)
        );

        const denormalize = (task: StoreTask): SelectorTask => (
            denormalizeTask(locale, task, selectTaskUserSettingsByTaskId(taskStore, task.id))
        );

        return R.map(denormalize, R.values(R.filter(hasMatch, taskStore.taskMap)));
    };
