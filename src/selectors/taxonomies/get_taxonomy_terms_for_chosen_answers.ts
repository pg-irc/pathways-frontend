import * as model from '../../stores/questionnaire';
import { TaxonomyTermReference } from '../../stores/taxonomies';
import { filterChosenAnswers } from '../questionnaire/filter_chosen_answers';
import { getTaxonomyTermsFromAnswers } from './get_taxonomy_terms_from_answers';

export const getTaxonomyTermsForChosenAnswers = (answers: model.AnswersMap): ReadonlyArray<TaxonomyTermReference> => (
    getTaxonomyTermsFromAnswers(filterChosenAnswers(answers))
);
