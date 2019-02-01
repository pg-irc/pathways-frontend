import { Store } from '../../stores';
import { pickSavedTaskIds } from './pick_saved_task_ids';
import { pickTasks } from './pick_tasks';
import { pickQuestionnaire } from '../questionnaire/pick_questionnaire';
import { pickAnswers } from '../questionnaire/pick_answers';
import { getAllTaxonomyIdsFromAnswers } from '../questionnaire/get_all_taxonomy_ids_from_questionnaire';
import { getNewlyRecommendedTasks } from './get_newly_recommended_tasks';
import { rejectTasksWithIds } from './reject_tasks_with_ids';
import { buildSelectorTask } from './build_selector_task';
import { Task } from './task';
import R from 'ramda';

export const computeNewlyRecommendedUnsavedTasks = (appStore: Store): ReadonlyArray<Task> => {
    const oldAnswers = pickQuestionnaire(appStore).oldAnswers;
    const newAnswers = pickAnswers(appStore);
    const tasks = pickTasks(appStore);
    const relevantTaxonomies = getAllTaxonomyIdsFromAnswers(newAnswers);
    const newlyRecommendedTasks = getNewlyRecommendedTasks(relevantTaxonomies, oldAnswers, newAnswers, tasks);
    const newlyRecommendedUnsaveTasks = rejectTasksWithIds(newlyRecommendedTasks, pickSavedTaskIds(appStore));

    return R.map(buildSelectorTask(appStore), newlyRecommendedUnsaveTasks);
};
