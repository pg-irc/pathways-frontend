// tslint:disable:readonly-array no-let no-expression-statement
import * as model from '../../stores/questionnaire';
import { TaxonomyTermReference } from '../../stores/taxonomies';

export const getTaxonomyTermsFromAnswers = (answers: model.AnswersMap): ReadonlyArray<TaxonomyTermReference> => {
    let resultingTerms: TaxonomyTermReference[] = [];

    for (let answerId in answers) {
        if (answers.hasOwnProperty(answerId)) {
            const taxonomyTerms = answers[answerId].taxonomyTerms;
            for (let term of taxonomyTerms) {
                resultingTerms.push(term);
            }
        }
    }

    return resultingTerms;
};
