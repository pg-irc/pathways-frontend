import { Answer, AnswersMap } from '../../stores/questionnaire';
import { Id, TaxonomyTermReference } from '../../stores/taxonomies';
import * as R from 'ramda';

export const getAllTaxonomyIdsFromAnswers = (answers: AnswersMap): ReadonlyArray<Id> => (
    R.uniq(collectTaxonomyIdsFromAnswerMap(answers))
);

const collectTaxonomyIdsFromAnswerMap = (answers: AnswersMap): ReadonlyArray<Id> => (
    R.reduce(
        (accumulator: ReadonlyArray<Id>, element: Answer): ReadonlyArray<Id> => (
            [...accumulator, ...collectTaxonomyIdsFromAnswer(element)]
        ),
        [],
        R.values(answers),
    )
);

const collectTaxonomyIdsFromAnswer = (answer: Answer): ReadonlyArray<Id> => (
    R.map((term: TaxonomyTermReference): Id => term.taxonomyId, answer.taxonomyTerms)
);
