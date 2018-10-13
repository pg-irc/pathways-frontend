import { Store } from '../../stores';
import { TaxonomyTermReference } from '../../stores/taxonomies';
import { getTaxonomyTermsForChosenAnswers } from './get_taxonomy_terms_for_chosen_answers';
import { pickAnswers } from '../questionnaire/pick_answers';

export const selectTaxonomyTermsForChosenAnswers = (store: Store): ReadonlyArray<TaxonomyTermReference> => (
    getTaxonomyTermsForChosenAnswers(pickAnswers(store))
);
