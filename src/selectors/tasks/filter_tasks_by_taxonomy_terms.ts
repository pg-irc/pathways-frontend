import { Task, TaskMap } from '../../stores/tasks';
import { TaxonomyTermReference } from '../taxonomies/pull_explore_taxonomy';
import { isTaskRecommended } from './is_task_recommended';
import * as R from 'ramda';

export const filterTasksByTaxonomyTerms =
    R.curry((taxonomyTerms: ReadonlyArray<TaxonomyTermReference>, tasks: TaskMap): ReadonlyArray<Task> => (
        R.filter(isTaskRecommended(taxonomyTerms), R.values(tasks))
    ));
