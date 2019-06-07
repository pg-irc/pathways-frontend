import { TopicMap, Id } from '../../stores/topics';
import { isCompleted } from './is_completed';
import { getId } from './get_id';
import * as R from 'ramda';

export const getIdsOfCompletedTopics = (tasks: TopicMap): ReadonlyArray<Id> => (
    R.map(getId, R.filter(isCompleted, R.values(tasks)))
);
