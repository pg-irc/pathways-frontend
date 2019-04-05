import * as R from 'ramda';
import { Topic } from '../../stores/topics';
import { Id } from '../../fixtures/types/explore';

export const rejectTasksWithIds = (topics: ReadonlyArray<Topic>, topicIds: ReadonlyArray<Id>): ReadonlyArray<Topic> => {
    const taskIsBlacklisted = (topic: Topic): boolean => R.contains(topic.id, topicIds);
    return R.reject(taskIsBlacklisted, topics);
};
