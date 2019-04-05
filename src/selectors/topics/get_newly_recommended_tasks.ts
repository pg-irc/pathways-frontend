import { AnswersMap } from '../../stores/questionnaire';
import { TopicMap, Topic } from '../../stores/topics';
import * as R from 'ramda';
import { getRecommendedTasks } from './get_recommended_tasks';

export const getNewlyRecommendedTasks =
    (oldAnswers: AnswersMap, newAnswers: AnswersMap, topics: TopicMap): ReadonlyArray<Topic> => (
        R.difference(
            getRecommendedTasks(newAnswers, topics),
            getRecommendedTasks(oldAnswers, topics),
        )
    );
