import * as R from 'ramda';
import { Store } from '../../stores';
import * as store from '../../stores/tasks';
import { selectLocale } from '../locale/select_locale';
import { Task } from './task';
import { toSelectorTaskWithoutRelatedEntities } from './to_selector_task_without_related_entities';
import { selectExploreSectionFromTask } from './select_explore_section_from_task';
import { pickSavedTaskIds } from './pick_saved_task_ids';
import { pickTasks } from './pick_tasks';
import { pickAnswers } from '../questionnaire/pick_answers';
import { rejectSavedAndCompletedTasks } from './reject_saved_and_completed_tasks';
import { getRecommendedTasksFromSelectedAnswers } from './get_recommended_tasks_from_selected_answers';

export const selectRecommendedTasks = (appStore: Store): ReadonlyArray<Task> => (
    R.map(
        buildSelectorTask(appStore),
        rejectSavedAndCompletedTasks(
            pickSavedTaskIds(appStore),
            getRecommendedTasksFromSelectedAnswers(pickAnswers(appStore), pickTasks(appStore)),
        ),
    )
);

const buildSelectorTask = R.curry((appStore: Store, task: store.Task): Task => {
    const locale = selectLocale(appStore);
    const exploreSection = selectExploreSectionFromTask(appStore, task);
    const isRecommended = true;
    return toSelectorTaskWithoutRelatedEntities(locale, task, exploreSection, isRecommended);
});
