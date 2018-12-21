import { AnswersMap } from '../../stores/questionnaire';
import { TaskMap, Task } from '../../stores/tasks';
import { getTaxonomyTermsForChosenAnswers } from '../taxonomies/get_taxonomy_terms_for_chosen_answers';
import { isTaskRecommended } from './is_task_recommended';
import { isCompleted } from './is_completed';
import * as R from 'ramda';

export const getRecommendedTasks = (answers: AnswersMap, tasks: TaskMap): ReadonlyArray<Task> => {
    const chosenTaxonomyTerms = getTaxonomyTermsForChosenAnswers(answers);
    const isRecommended = isTaskRecommended(chosenTaxonomyTerms);

    const isInRecommendedList = (task: Task): boolean => (
        R.not(isCompleted(task)) && isRecommended(task)
    );

    return R.filter(isInRecommendedList, R.values(tasks));
};
