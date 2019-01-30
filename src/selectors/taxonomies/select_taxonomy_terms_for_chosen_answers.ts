import { Store } from '../../stores';
import { TaxonomyTermReference } from '../../stores/taxonomies';
import { getTaxonomyTermsForRelevantAnswers } from './get_taxonomy_terms_for_relevant_answers';
import { pickAnswers } from '../questionnaire/pick_answers';

export const selectTaxonomyTermsForChosenAnswers = (store: Store): ReadonlyArray<TaxonomyTermReference> => (
    getTaxonomyTermsForRelevantAnswers(pickAnswers(store))
);
