import { Store } from '../../stores';
import { pickTopics } from '../topics/pick_topics';
import { pickAnswers } from './pick_answers';
import { Answer } from '../../stores/questionnaire';
import { getAllTaxonomyTermsFromTasks } from '../topics/get_all_taxonomy_terms_from_tasks';
import { getAllAnswersWithTaxonomyTermsNotIn } from './get_all_answers_with_taxonomy_terms_not_in';

export const selectInvalidAnswers = (appStore: Store): ReadonlyArray<Answer> => {
    const tasks = pickTopics(appStore);
    const answers = pickAnswers(appStore);
    const validTaxonomyTerms = getAllTaxonomyTermsFromTasks(tasks);
    return getAllAnswersWithTaxonomyTermsNotIn(validTaxonomyTerms, answers);
};
