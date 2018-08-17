import * as R from 'ramda';
import * as store from '../../stores/tasks';
import { TaxonomyTermReference } from '../taxonomies/pull_explore_taxonomy';
import { filterTasksByTaxonomyTerms } from './filter_tasks_by_taxonomy_terms';

export const isTaskRecommended = (termsFromQuestionnaire: ReadonlyArray<TaxonomyTermReference>, task: store.Task): boolean => {
    const taskMapWithTask = { [task.id]: task };
    const filtered = filterTasksByTaxonomyTerms(termsFromQuestionnaire, taskMapWithTask);
    return !R.isEmpty(filtered);
};
