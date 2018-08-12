import * as R from 'ramda';
import { Store } from '../../stores';
import * as model from '../../stores/questionnaire';
import { TaxonomyTermReference } from '../../stores/taxonomies';
import { toValidOrThrow } from '../../stores/questionnaire/stores';

export const selectTaxonomyTermsForSelectedAnswers = (store: Store): ReadonlyArray<TaxonomyTermReference> => (
    filterTaxonomyTermsForChosenAnswers(toValidOrThrow(store.questionnaireInStore).answers)
);

export const filterTaxonomyTermsForChosenAnswers = (answers: model.AnswersMap): ReadonlyArray<TaxonomyTermReference> => {
    type ReferenceArray = ReadonlyArray<TaxonomyTermReference>;
    const flatten = R.reduce((acc: ReferenceArray, val: ReferenceArray): ReferenceArray => [...acc, ...val], []);

    return flatten(R.pluck('taxonomyTerms', R.filter(R.propEq('isChosen', true), R.values(answers))));
};
