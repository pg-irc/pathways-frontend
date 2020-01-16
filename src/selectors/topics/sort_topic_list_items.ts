import * as R from 'ramda';
import { TopicListItem } from './types';

export const sortTopicListItems = (taskList: ReadonlyArray<TopicListItem>): ReadonlyArray<TopicListItem> => {
    const compare = (a: TopicListItem, b: TopicListItem): number => (
        a.isRecommended === b.isRecommended ?
            a.id.localeCompare(b.id) :
            a.isRecommended ? -1 : 1
    );
    return R.sort(compare, taskList);
};