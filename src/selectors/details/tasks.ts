import { TaxonomyTermReference } from '../../stores/taxonomies';
import { Task, TaskMap } from '../../stores/tasks';
import { getExploreTaxonomyTerms } from '../taxonomies';
import * as R from 'ramda';

export const findTasksByExploreTaxonomyTerm =
    (needle: ReadonlyArray<TaxonomyTermReference>, haystack: TaskMap): ReadonlyArray<Task> => {

        const needleTerms = getExploreTaxonomyTerms(needle);

        const matchesTaxonomyTerm = (task: Task): boolean => {
            const haystackTerms = getExploreTaxonomyTerms(task.taxonomyTerms);
            const commonTerms = R.intersection(needleTerms, haystackTerms);
            return R.length(commonTerms) > 0;
        };

        const findTasks = R.compose(R.values, R.pickBy(matchesTaxonomyTerm));

        return findTasks(haystack);
    };
