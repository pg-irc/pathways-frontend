import { AnswersMap } from '../../stores/questionnaire';
import { TopicMap, Topic } from '../../stores/topics';
import * as R from 'ramda';
import { getRecommendedTopics } from './get_recommended_topics';

export const getNewlyRecommendedTopics =
    (oldAnswers: AnswersMap, newAnswers: AnswersMap, topics: TopicMap): ReadonlyArray<Topic> => (
        R.difference(
            getRecommendedTopics(newAnswers, topics),
            getRecommendedTopics(oldAnswers, topics),
        )
    );
