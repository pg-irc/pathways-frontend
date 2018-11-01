import { AnswersMap } from '../../stores/questionnaire';
import { getTaxonomyTerms } from '../questionnaire/get_taxonomy_terms';
import { TaxonomyTermReference } from '../../stores/taxonomies';
import { flattenOneLevel } from '../questionnaire/flatten_one_level';
import * as R from 'ramda';

export const getTaxonomyTermsFromAnswers = (answers: AnswersMap): ReadonlyArray<TaxonomyTermReference> => (
    flattenOneLevel(R.map(getTaxonomyTerms, R.values(answers)))
);
