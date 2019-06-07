import * as R from 'ramda';
import { Store } from '../../stores';
import { buildSelectorTaskListItem } from './build_selector_task_list_item';
import { pickAnswers } from '../questionnaire/pick_answers';
import { pickTopics } from './pick_topics';
import { getRecommendedTopics } from './get_recommended_topics';
import { TopicListItem } from './topic_list_item';

export const selectRecommendedTopics = (appStore: Store): ReadonlyArray<TopicListItem> => {
    const tasks = pickTopics(appStore);
    const answers = pickAnswers(appStore);
    const recommendedTasks = getRecommendedTopics(answers, tasks);
    return R.map(buildSelectorTaskListItem(appStore), R.pluck('id', recommendedTasks));
};
