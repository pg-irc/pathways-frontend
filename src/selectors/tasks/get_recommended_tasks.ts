import { AnswersMap } from '../../stores/questionnaire';
import { TaskMap, Task } from '../../stores/tasks';
import { Id } from '../../fixtures/types/explore';
import { rejectSavedAndCompletedTasks } from './reject_saved_and_completed_tasks';
import { getTaxonomyTermsForChosenAnswers } from '../taxonomies/get_taxonomy_terms_for_chosen_answers';
import { isTaskRecommended } from './is_task_recommended';
import * as R from 'ramda';

export const getRecommendedTasks = (answers: AnswersMap, tasks: TaskMap, savedTaskIds: ReadonlyArray<Id>): ReadonlyArray<Task> => (
    rejectSavedAndCompletedTasks(savedTaskIds,
        R.filter(isTaskRecommended(getTaxonomyTermsForChosenAnswers(answers)), R.values(tasks)),
    )
);
