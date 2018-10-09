import { AnswersMap } from '../../stores/questionnaire';
import { TaskMap, Task } from '../../stores/tasks';
import { getTaxonomyTermsForChosenAnswers } from '../taxonomies/get_taxonomy_terms_for_chosen_answers';
import { filterTasksByTaxonomyTerms } from './filter_tasks_by_taxonomy_terms';

export const getRecommendedTasksFromSelectedAnswers = (answers: AnswersMap, tasks: TaskMap): ReadonlyArray<Task> => (
    filterTasksByTaxonomyTerms(getTaxonomyTermsForChosenAnswers(answers), tasks)
);
