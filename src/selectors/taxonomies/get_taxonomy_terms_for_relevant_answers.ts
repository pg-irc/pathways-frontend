import * as model from '../../stores/questionnaire';
import { TaxonomyTermReference } from '../../stores/taxonomies';
import { isEitherChosenOrInverted } from '../questionnaire/is_either_chosen_or_inverted';
import { getTaxonomyTermsFromAnswers } from './get_taxonomy_terms_from_answers';
import * as R from 'ramda';

export const getTaxonomyTermsForRelevantAnswers = (answers: model.AnswersMap): ReadonlyArray<TaxonomyTermReference> => (
    getTaxonomyTermsFromAnswers(R.filter(isEitherChosenOrInverted, answers))
);
