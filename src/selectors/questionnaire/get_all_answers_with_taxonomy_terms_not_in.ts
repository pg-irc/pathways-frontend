import { Answer, AnswersMap } from '../../stores/questionnaire';
import { TaxonomyTermReference } from '../../stores/taxonomies';
import * as R from 'ramda';

export const getAllAnswersWithTaxonomyTermsNotIn =
    (validTaxonomyTerms: ReadonlyArray<TaxonomyTermReference>, answers: AnswersMap): ReadonlyArray<Answer> => (
        R.filter(
            (answer: Answer) =>
                R.and(
                    R.not(R.isEmpty(answer.taxonomyTerms)),
                    R.isEmpty(R.intersection(answer.taxonomyTerms, validTaxonomyTerms)),
                ),
            R.values(answers),
        )
    );
