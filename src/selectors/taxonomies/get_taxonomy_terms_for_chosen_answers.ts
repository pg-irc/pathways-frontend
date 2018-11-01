import * as model from '../../stores/questionnaire';
import { TaxonomyTermReference } from '../../stores/taxonomies';
import { isChosen } from '../questionnaire/is_chosen';
import { getTaxonomyTermsFromAnswers } from './get_taxonomy_terms_from_answers';
import * as R from 'ramda';

export const getTaxonomyTermsForChosenAnswers = (answers: model.AnswersMap): ReadonlyArray<TaxonomyTermReference> => (
    getTaxonomyTermsFromAnswers(R.filter(isChosen, answers))
);
