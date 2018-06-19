import { TaxonomyTermReference } from '../../stores/taxonomies';
import { Task, TaskMap } from '../../stores/tasks';
import { getExploreTaxonomyTerms } from '../taxonomies';
import * as R from 'ramda';

// TODO take taxonomy id as argument, don't assume one return value
export const findTasksByExploreTaxonomyTerm =
    (needle: ReadonlyArray<TaxonomyTermReference>, tasks: TaskMap): ReadonlyArray<Task> => {

        const needleTerms = getExploreTaxonomyTerms(needle);

        const matchesTaxonomyTerm = (task: Task): boolean => {
            const haystackTerms = getExploreTaxonomyTerms(task.taxonomyTerms);
            const commonTerms = R.intersection(needleTerms, haystackTerms);
            return R.length(commonTerms) > 0;
        };

        const findTasks = R.compose(R.values, R.pickBy(matchesTaxonomyTerm));

        return findTasks(tasks);
    };
