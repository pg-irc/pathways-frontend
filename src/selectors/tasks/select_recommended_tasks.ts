import * as R from 'ramda';
import { Store } from '../../stores';
import { Task } from './task';
import { pickSavedTaskIds } from './pick_saved_task_ids';
import { pickTasks } from './pick_tasks';
import { pickAnswers } from '../questionnaire/pick_answers';
import { rejectSavedAndCompletedTasks } from './reject_saved_and_completed_tasks';
import { getRecommendedTasksFromSelectedAnswers } from './get_recommended_tasks_from_selected_answers';
import { buildSelectorTask } from './build_selector_task';

export const selectRecommendedTasks = (appStore: Store): ReadonlyArray<Task> => (
    R.map(
        buildSelectorTask(appStore),
        rejectSavedAndCompletedTasks(
            pickSavedTaskIds(appStore),
            getRecommendedTasksFromSelectedAnswers(pickAnswers(appStore), pickTasks(appStore)),
        ),
    )
);
