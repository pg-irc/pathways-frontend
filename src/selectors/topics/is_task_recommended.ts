import { Task } from '../../stores/topics';
import { TaxonomyTermReference, Id } from '../../stores/taxonomies';
import { groupTermsByTaxonomy } from '../taxonomies/group_terms_by_taxonomy';
import { isTaskRecommendedToAll } from './is_task_recommended_to_all';
import * as R from 'ramda';

type Term = TaxonomyTermReference;
type TermList = ReadonlyArray<Term>;

export const isTaskRecommended = R.curry((relevantTaxonomyIds: ReadonlyArray<Id>, chosenTermsFromQuestionnaire: TermList, task: Task): boolean => {

    if (isTaskRecommendedToAll(task)) {
        return true;
    }

    const relevantTermsFromTask = filterTermsByTaxonomyIds(relevantTaxonomyIds, task.taxonomyTerms);
    const groupedTermsFromTask = groupTermsByTaxonomy(relevantTermsFromTask);

    if (R.isEmpty(groupedTermsFromTask)) {
        return false;
    }

    return R.all(atLeastOneTermMatches(chosenTermsFromQuestionnaire), groupedTermsFromTask);
});

const filterTermsByTaxonomyIds = (relevantTaxonomyIds: ReadonlyArray<Id>, taxonomyTerms: TermList): TermList => (
    R.filter((term: Term): boolean => R.contains(term.taxonomyId, relevantTaxonomyIds), taxonomyTerms)
);

const atLeastOneTermMatches = R.curry((left: TermList, right: TermList): boolean => (
    R.not(R.isEmpty(R.intersection(left, right)))
));
