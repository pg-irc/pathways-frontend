import * as R from 'ramda';
import { Topic } from './topic';
import { TopicListItem } from './topic_list_item';

export type ExploreTopic = Topic | TopicListItem;

export type ExploreTopicList = ReadonlyArray<Topic> | ReadonlyArray<TopicListItem>;

export const sortTopicList = (taskList: ExploreTopicList): ExploreTopicList => {
    const compare = (a: ExploreTopic, b: ExploreTopic): number => (
        a.isRecommended === b.isRecommended ?
            a.id.localeCompare(b.id) :
            a.isRecommended ? -1 : 1
    );
    return R.sort(compare, taskList);
};