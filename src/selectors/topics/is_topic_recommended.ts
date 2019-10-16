import { Topic } from '../../stores/topics';
import { TaxonomyTermReference, Id } from '../../stores/taxonomies';
import { groupTermsByTaxonomy } from '../taxonomies/group_terms_by_taxonomy';
import { isTopicRecommendedToAll } from './is_topic_recommended_to_all';
import * as R from 'ramda';

type Term = TaxonomyTermReference;
type TermList = ReadonlyArray<Term>;

export const isTopicRecommended = R.curry((relevantTaxonomyIds: ReadonlyArray<Id>, chosenTermsFromQuestionnaire: TermList, topic: Topic): boolean => {

    if (isTopicRecommendedToAll(topic)) {
        return true;
    }

    const relevantTermsFromTopics = filterTermsByTaxonomyIds(relevantTaxonomyIds, topic.taxonomyTerms);
    const groupedTermsFromTopics = groupTermsByTaxonomy(relevantTermsFromTopics);

    if (R.isEmpty(groupedTermsFromTopics)) {
        return false;
    }

    return R.all(atLeastOneTermMatches(chosenTermsFromQuestionnaire), groupedTermsFromTopics);
});

const filterTermsByTaxonomyIds = (relevantTaxonomyIds: ReadonlyArray<Id>, taxonomyTerms: TermList): TermList => (
    R.filter((term: Term): boolean => R.contains(term.taxonomyId, relevantTaxonomyIds), taxonomyTerms)
);

const atLeastOneTermMatches = R.curry((left: TermList, right: TermList): boolean => (
    R.not(R.isEmpty(R.intersection(left, right)))
));
