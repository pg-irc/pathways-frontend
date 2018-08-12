import { Store } from '../../stores';
import * as model from '../../stores/questionnaire';
import { TaxonomyTermReference } from '../../stores/taxonomies';
import { pullQuestionnaire } from '../questionnaire/pull_questionnaire';
import { filterChosenAnswers } from '../questionnaire/filter_chosen_answers';
import { getTaxonomyTermsFromAnswers } from './get_taxonomy_terms_from_answers';

export const selectTaxonomyTermsForChosenAnswers = (store: Store): ReadonlyArray<TaxonomyTermReference> => (
    filterTaxonomyTermsForChosenAnswers(pullQuestionnaire(store).answers)
);

export const filterTaxonomyTermsForChosenAnswers = (answers: model.AnswersMap): ReadonlyArray<TaxonomyTermReference> => (
    getTaxonomyTermsFromAnswers(filterChosenAnswers(answers))
);
