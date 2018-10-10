import { AnswersMap } from '../../stores/questionnaire';
import { TaskMap, Task } from '../../stores/tasks';
import { Id } from '../../fixtures/types/explore';
import R from 'ramda';
import { getRecommendedTasks } from './get_recommended_tasks';

// TODO write tests
export const getNewlyRecommendedTasks =
    (oldAnswers: AnswersMap, newAnswers: AnswersMap, tasks: TaskMap, savedTaskIds: ReadonlyArray<Id>): ReadonlyArray<Task> => (
        R.difference(
            getRecommendedTasks(newAnswers, tasks, savedTaskIds),
            getRecommendedTasks(oldAnswers, tasks, savedTaskIds),
        )
    );
