import { AnswersMap } from '../../stores/questionnaire';
import { TaskMap, Task } from '../../stores/tasks';
import * as R from 'ramda';
import { getRecommendedTasks } from './get_recommended_tasks';

export const getNewlyRecommendedTasks =
    (oldAnswers: AnswersMap, newAnswers: AnswersMap, tasks: TaskMap): ReadonlyArray<Task> => (
        R.difference(
            getRecommendedTasks(newAnswers, tasks),
            getRecommendedTasks(oldAnswers, tasks),
        )
    );
