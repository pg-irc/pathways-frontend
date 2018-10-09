import { Store } from '../../stores';
import { TaxonomyTermReference } from '../../stores/taxonomies';
import { pullQuestionnaire } from '../questionnaire/pull_questionnaire';
import { getTaxonomyTermsForChosenAnswers } from './get_taxonomy_terms_for_chosen_answers';

// TODO remove this function?
export const selectTaxonomyTermsForChosenAnswers = (store: Store): ReadonlyArray<TaxonomyTermReference> => (
    getTaxonomyTermsForChosenAnswers(pullQuestionnaire(store).answers)
);
