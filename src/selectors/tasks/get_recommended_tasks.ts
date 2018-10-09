import { Store } from '../../stores';
import { Task } from '../../stores/tasks';
import { rejectSavedAndCompletedTasks } from './reject_saved_and_completed_tasks';
import { pickSavedTaskIds } from './pick_saved_task_ids';
import { getRecommendedTasksFromSelectedAnswers } from './get_recommended_tasks_from_selected_answers';
import { pickAnswers } from '../questionnaire/pick_answers';
import { pickTasks } from './pick_tasks';

export const getRecommendedTasks = (appStore: Store): ReadonlyArray<Task> => (
    rejectSavedAndCompletedTasks(
        pickSavedTaskIds(appStore),
        getRecommendedTasksFromSelectedAnswers(pickAnswers(appStore), pickTasks(appStore)),
    )
);
