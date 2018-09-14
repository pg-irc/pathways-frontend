import * as model from '../../stores/questionnaire';
import * as R from 'ramda';
import { TaxonomyTermReference } from '../../stores/taxonomies';

export const getTaxonomyTermsFromAnswers = (answers: model.AnswersMap): ReadonlyArray<TaxonomyTermReference> => {
    type Terms = ReadonlyArray<TaxonomyTermReference>;
    const flatten = R.reduce((acc: Terms, val: Terms): Terms => [...acc, ...val], []);
    const pluckTaxonomyTerms = R.map<model.Answer, Terms>(R.prop('taxonomyTerms'));
    return flatten(pluckTaxonomyTerms(R.values(answers)));
};
