import * as R from 'ramda';
import { Store } from '../../stores';
import { buildSelectorTaskListItem } from './build_selector_task_list_item';
import { pickAnswers } from '../questionnaire/pick_answers';
import { pickTopics } from './pick_topics';
import { getRecommendedTasks } from './get_recommended_tasks';
import { TopicListItem } from './topic_list_item';

export const selectRecommendedTopics = (appStore: Store): ReadonlyArray<TopicListItem> => {
    const tasks = pickTopics(appStore);
    const answers = pickAnswers(appStore);
    const recommendedTasks = getRecommendedTasks(answers, tasks);
    return R.map(buildSelectorTaskListItem(appStore), R.pluck('id', recommendedTasks));
};
