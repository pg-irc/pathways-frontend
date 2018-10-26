import { Task, TaskMap } from '../../stores/tasks';
import { TaxonomyTermReference } from '../../stores/taxonomies';
import { flattenOneLevel } from '../questionnaire/flatten_one_level';
import * as R from 'ramda';

export const getAllTaxonomyTermsFromTasks = (tasks: TaskMap): ReadonlyArray<TaxonomyTermReference> => (
    R.uniq(flattenOneLevel(R.map((task: Task) => task.taxonomyTerms, R.values(tasks))))
);
