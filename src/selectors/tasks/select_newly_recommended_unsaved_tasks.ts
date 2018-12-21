import { Store } from '../../stores';
import { pickSavedTaskIds } from './pick_saved_task_ids';
import { pickTasks } from './pick_tasks';
import { pickQuestionnaire } from '../questionnaire/pick_questionnaire';
import { pickAnswers } from '../questionnaire/pick_answers';
import { getNewlyRecommendedTasks } from './get_newly_recommended_tasks';
import { rejectTaskIds } from './reject_task_ids';
import { buildSelectorTask } from './build_selector_task';
import { Task } from './task';
import R from 'ramda';

export const selectNewlyRecommendedUnsavedTasks = (appStore: Store): ReadonlyArray<Task> => {
    const oldAnswers = pickQuestionnaire(appStore).oldAnswers;
    const newAnswers = pickAnswers(appStore);
    const tasks = pickTasks(appStore);
    const newlyRecommendedTasks = getNewlyRecommendedTasks(oldAnswers, newAnswers, tasks);
    const newlyRecommendedUnsaveTasks = rejectTaskIds(newlyRecommendedTasks, pickSavedTaskIds(appStore));

    return R.map(buildSelectorTask(appStore), newlyRecommendedUnsaveTasks);
};
