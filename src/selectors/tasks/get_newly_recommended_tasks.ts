import { AnswersMap } from '../../stores/questionnaire';
import { TaskMap, Task } from '../../stores/tasks';
import * as R from 'ramda';
import { getRecommendedTasks } from './get_recommended_tasks';

export const getNewlyRecommendedTasks =
    (relevantTaxonomies: ReadonlyArray<string>, oldAnswers: AnswersMap, newAnswers: AnswersMap, tasks: TaskMap): ReadonlyArray<Task> => (
        R.difference(
            getRecommendedTasks(relevantTaxonomies, newAnswers, tasks),
            getRecommendedTasks(relevantTaxonomies, oldAnswers, tasks),
        )
    );
