import * as R from 'ramda';
import * as model from '../../stores/questionnaire';
import { TaxonomyTermReference } from '../../stores/taxonomies';

export const getTaxonomyTermsFromAnswers = (answers: model.AnswersMap): ReadonlyArray<TaxonomyTermReference> => {
    type Terms = ReadonlyArray<TaxonomyTermReference>;
    const flatten = R.reduce((acc: Terms, val: Terms): Terms => [...acc, ...val], []);

    return flatten(R.pluck('taxonomyTerms', R.values(answers)));
};
