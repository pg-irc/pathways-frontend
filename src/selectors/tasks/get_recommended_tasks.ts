import { AnswersMap } from '../../stores/questionnaire';
import { TaskMap, Task } from '../../stores/tasks';
import { Id } from '../../fixtures/types/explore';
import { rejectSavedAndCompletedTasks } from './reject_saved_and_completed_tasks';
import { filterTasksByTaxonomyTerms } from './filter_tasks_by_taxonomy_terms';
import { getTaxonomyTermsForChosenAnswers } from '../taxonomies/get_taxonomy_terms_for_chosen_answers';

export const getRecommendedTasks = (answers: AnswersMap, tasks: TaskMap, savedTaskIds: ReadonlyArray<Id>): ReadonlyArray<Task> => (
    rejectSavedAndCompletedTasks(savedTaskIds,
        filterTasksByTaxonomyTerms(
            getTaxonomyTermsForChosenAnswers(answers),
            tasks,
        ),
    )
);
