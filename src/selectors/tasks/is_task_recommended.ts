import { Task } from '../../stores/tasks';
import { TaxonomyTermReference } from '../../stores/taxonomies';
import { groupTermsByTaxonomy } from '../taxonomies/group_terms_by_taxonomy';
import { isTaskRecommendedToAll } from './is_task_recommended_to_all';
import * as R from 'ramda';

type Term = TaxonomyTermReference;
type TermList = ReadonlyArray<Term>;

export const isTaskRecommended = R.curry((relevantTaxonomies: ReadonlyArray<string>, chosenTermsFromQuestionnaire: TermList, task: Task): boolean => {

    if (isTaskRecommendedToAll(task)) {
        return true;
    }

    const relevantTermsFromTask = R.filter((term: Term): boolean => (R.contains(term.taxonomyId, relevantTaxonomies)), task.taxonomyTerms);

    const groupedTermsFromTask = groupTermsByTaxonomy(relevantTermsFromTask);

    if (R.isEmpty(groupedTermsFromTask)) {
        return false;
    }

    return R.all(atLeastOneTermMatches(chosenTermsFromQuestionnaire), groupedTermsFromTask);
});

const atLeastOneTermMatches = R.curry((left: TermList, right: TermList): boolean => (
    R.not(R.isEmpty(R.intersection(left, right)))
));
