import * as R from 'ramda';
import { ExploreTopicList, ExploreTopic } from './types';

export const sortTopicList = (taskList: ExploreTopicList): ExploreTopicList => {
    const compare = (a: ExploreTopic, b: ExploreTopic): number => (
        a.isRecommended === b.isRecommended ?
            a.id.localeCompare(b.id) :
            a.isRecommended ? -1 : 1
    );
    return R.sort(compare, taskList);
};