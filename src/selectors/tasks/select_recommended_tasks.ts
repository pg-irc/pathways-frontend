import * as R from 'ramda';
import { Store } from '../../stores';
import { Task } from './task';
import { buildSelectorTask } from './build_selector_task';
import { pickAnswers } from '../questionnaire/pick_answers';
import { pickTasks } from './pick_tasks';
import { getRecommendedTasks } from './get_recommended_tasks';
import { getAllTaxonomyIdsFromAnswers } from '../questionnaire/get_all_taxonomy_ids_from_questionnaire';

export const selectRecommendedTasks = (appStore: Store): ReadonlyArray<Task> => {
    const tasks = pickTasks(appStore);
    const answers = pickAnswers(appStore);
    const relevantTaxonomies = getAllTaxonomyIdsFromAnswers(answers);

    return R.map(buildSelectorTask(appStore), getRecommendedTasks(relevantTaxonomies, answers, tasks));
};
