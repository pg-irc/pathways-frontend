import { Store } from '../../stores';
import { selectTopicsForCurrentRegion } from '../topics/select_topics_for_current_region';
import { pickAnswers } from './pick_answers';
import { Answer } from '../../stores/questionnaire';
import { getAllTaxonomyTermsFromTopics } from '../topics/get_all_taxonomy_terms_from_topics';
import { getAllAnswersWithTaxonomyTermsNotIn } from './get_all_answers_with_taxonomy_terms_not_in';

export const selectInvalidAnswers = (appStore: Store): ReadonlyArray<Answer> => {
    const topics = selectTopicsForCurrentRegion(appStore);
    const answers = pickAnswers(appStore);
    const validTaxonomyTerms = getAllTaxonomyTermsFromTopics(topics);
    return getAllAnswersWithTaxonomyTermsNotIn(validTaxonomyTerms, answers);
};
