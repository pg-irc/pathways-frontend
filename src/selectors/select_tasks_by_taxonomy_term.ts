import { TaxonomyTermReference } from './taxonomies';
import { Task, TaskMap } from '../stores/tasks';
import * as R from 'ramda';

export const filterTasksByTaxonomyTerm = (tasks: TaskMap, needle: TaxonomyTermReference): TaskMap => {

    const matchesNeedle = (id: TaxonomyTermReference): boolean => (
        id.taxonomyId === needle.taxonomyId && id.taxonomyTermId === needle.taxonomyTermId
    );

    const hasMatch = (task: Task): boolean => (
        R.any(matchesNeedle, task.taxonomyTerms)
    );

    return R.filter(hasMatch, tasks);
};
