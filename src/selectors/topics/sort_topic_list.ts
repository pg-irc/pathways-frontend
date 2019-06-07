import { Topic } from './topic';
import * as R from 'ramda';

export const sortTopicList = (taskList: ReadonlyArray<Topic>): ReadonlyArray<Topic> => {
    const compare = (a: Topic, b: Topic): number => (
        a.isRecommended === b.isRecommended ?
            a.id.localeCompare(b.id) :
            a.isRecommended ? -1 : 1
    );
    return R.sort(compare, taskList);
};
