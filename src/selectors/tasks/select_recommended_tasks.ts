import * as R from 'ramda';
import { Store } from '../../stores';
import { buildSelectorTaskListItem } from './build_selector_task_list_item';
import { pickAnswers } from '../questionnaire/pick_answers';
import { pickTasks } from './pick_tasks';
import { getRecommendedTasks } from './get_recommended_tasks';
import { TaskListItem } from './task_list_item';

export const selectRecommendedTasks = (appStore: Store): ReadonlyArray<TaskListItem> => {
    const tasks = pickTasks(appStore);
    const answers = pickAnswers(appStore);
    const recommendedTasks = getRecommendedTasks(answers, tasks);
    return R.map(buildSelectorTaskListItem(appStore), R.pluck('id', recommendedTasks));
};
