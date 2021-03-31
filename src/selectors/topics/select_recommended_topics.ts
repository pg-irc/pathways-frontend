import * as R from 'ramda';
import { Store } from '../../stores';
import { buildSelectorTopicListItem } from './build_selector_topic_list_item';
import { pickAnswers } from '../questionnaire/pick_answers';
import { selectTopicsForCurrentRegion } from './select_topics_for_current_region';
import { getRecommendedTopics } from './get_recommended_topics';
import { TopicListItem } from './types';

export const selectRecommendedTopics = (appStore: Store): ReadonlyArray<TopicListItem> => {
    const tasks = selectTopicsForCurrentRegion(appStore);
    const answers = pickAnswers(appStore);
    const recommendedTasks = getRecommendedTopics(answers, tasks);
    return R.map(buildSelectorTopicListItem(appStore), R.pluck('id', recommendedTasks));
};
