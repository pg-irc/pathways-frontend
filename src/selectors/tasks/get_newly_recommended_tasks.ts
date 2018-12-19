import { AnswersMap } from '../../stores/questionnaire';
import { TaskMap, Task } from '../../stores/tasks';
import { Id } from '../../fixtures/types/explore';
import * as R from 'ramda';
import { getRecommendedTasks } from './get_recommended_tasks';

export const getNewlyRecommendedTasks =
    (oldAnswers: AnswersMap, newAnswers: AnswersMap, tasks: TaskMap, savedTaskIds: ReadonlyArray<Id>): ReadonlyArray<Task> => {
        const newTasksFromAnswers = R.difference(
            getRecommendedTasks(newAnswers, tasks),
            getRecommendedTasks(oldAnswers, tasks),
        );
        const taskIsNotSaved = (task: Task): boolean => R.not(R.contains(task.id, savedTaskIds));
        return R.filter(taskIsNotSaved, newTasksFromAnswers);
    };
