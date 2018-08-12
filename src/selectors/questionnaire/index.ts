import * as R from 'ramda';
import { Store } from '../../stores';
import * as model from '../../stores/questionnaire';
import { TaxonomyTermReference } from '../../stores/taxonomies';
import { toValidOrThrow } from '../../stores/questionnaire/stores';

export type Questionnaire = ReadonlyArray<Question>;

export interface Question {
    readonly id: model.Id;
    readonly number: number;
    readonly text: string;
    readonly explanation?: string;
    readonly answers: ReadonlyArray<Answer>;
}

export interface Answer {
    readonly id: model.Id;
    readonly text: string;
    readonly isChosen: boolean;
    readonly acceptMultipleAnswers: boolean;
}

export const selectTaxonomyTermsForSelectedAnswers = (store: Store): ReadonlyArray<TaxonomyTermReference> => (
    filterTaxonomyTermsForChosenAnswers(toValidOrThrow(store.questionnaireInStore).answers)
);

export const filterTaxonomyTermsForChosenAnswers = (answers: model.AnswersMap): ReadonlyArray<TaxonomyTermReference> => {
    type ReferenceArray = ReadonlyArray<TaxonomyTermReference>;
    const flatten = R.reduce((acc: ReferenceArray, val: ReferenceArray): ReferenceArray => [...acc, ...val], []);

    return flatten(R.pluck('taxonomyTerms', R.filter(R.propEq('isChosen', true), R.values(answers))));
};
