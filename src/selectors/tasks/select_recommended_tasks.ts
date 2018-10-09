import * as R from 'ramda';
import { Store } from '../../stores';
import * as store from '../../stores/tasks';
import { selectLocale } from '../locale/select_locale';
import { Task } from './task';
import { toSelectorTaskWithoutRelatedEntities } from './to_selector_task_without_related_entities';
import { rejectTasksWithIdsInList } from './reject_tasks_with_ids_in_list';
import { selectExploreSectionFromTask } from './select_explore_section_from_task';
import { filterTasksByTaxonomyTerms } from './filter_tasks_by_taxonomy_terms';
import { rejectCompletedTasks } from './reject_completed_tasks';
import { pickSavedTaskIds } from './pick_saved_task_ids';
import { pickTasks } from './pick_tasks';
import { getTaxonomyTermsForChosenAnswers } from '../taxonomies/get_taxonomy_terms_for_chosen_answers';
import { AnswersMap } from '../../stores/questionnaire';
import { pullQuestionnaire } from '../questionnaire/pull_questionnaire';

export const selectRecommendedTasks = (appStore: Store): ReadonlyArray<Task> => {
    const answers = pullQuestionnaire(appStore).answers;
    const allTasks = pickTasks(appStore);

    const taxonomyTerms = getTaxonomyTermsForChosenAnswers(answers);
    const matchingTasks = filterTasksByTaxonomyTerms(taxonomyTerms, allTasks);

    const savedTaskIds = pickSavedTaskIds(appStore);
    const rejectSavedTasks = rejectTasksWithIdsInList(savedTaskIds);

    const nonSavedTasks = rejectSavedTasks(matchingTasks);
    const nonCompletedTasks = rejectCompletedTasks(nonSavedTasks);

    const locale = selectLocale(appStore);
    const buildSelectorTask = (task: store.Task): Task => {
        const exploreSection = selectExploreSectionFromTask(appStore, task);
        const isRecommended = true;
        return toSelectorTaskWithoutRelatedEntities(locale, task, exploreSection, isRecommended);
    };

    return R.map(buildSelectorTask, nonCompletedTasks);
};

export const newRecommendedTasks = (answers: AnswersMap, allTasks: store.TaskMap): ReadonlyArray<store.Task> => {
    const taxonomyTerms = getTaxonomyTermsForChosenAnswers(answers);
    const filterTasks = filterTasksByTaxonomyTerms(taxonomyTerms);
    return filterTasks(allTasks);
};
