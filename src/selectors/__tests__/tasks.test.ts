// tslint:disable:no-expression-statement no-let no-any

import { TaskBuilder } from '../../stores/__tests__/helpers/tasks_helpers';
import { aLocale } from '../../stores/__tests__/helpers/locale_helpers';
import * as stores from '../../stores/tasks';
import { Taxonomies as TaxonomyConstants } from '../../application/constants';
import { Locale } from '../../locale/types';
import { aString, aBoolean } from '../../application/__tests__/helpers/random_test_values';
import { TaxonomyTermReference } from '../../stores/taxonomies';
import { ExploreSectionBuilder } from './helpers/explore_section_helpers';
import { ExploreSection } from '../explore/types';
import { toSelectorTask } from '../tasks/to_selector_task';
import { Task } from '../tasks/task';
import { isTaskRecommended } from '../tasks/is_task_recommended';
import { sortTaskList } from '../tasks/sort_task_list';
import { ViewTaskBuilder } from './helpers/task_helpers';
import { getRecommendedTasks } from '../tasks/get_recommended_tasks';
import { rejectTasksWithIds } from '../tasks/reject_tasks_with_ids';
import { AnswerBuilder } from '../../stores/__tests__/helpers/questionnaire_helpers';
import { getNewlyRecommendedTasks } from '../tasks/get_newly_recommended_tasks';
import { AnswersMap } from '../../stores/questionnaire';
import { getAllTaxonomyTermsFromTasks } from '../tasks/get_all_taxonomy_terms_from_tasks';
import { getIdsOfCompletedTasks } from '../tasks/get_ids_of_completed_tasks';

let locale: Locale = undefined;

const aTaxonomyTermReference = (): TaxonomyTermReference => (
    { taxonomyId: aString(), taxonomyTermId: aString() }
);

beforeEach(() => {
    locale = aLocale();
});

describe('tasks selector', () => {

    describe('denormalization', () => {
        let task: stores.Task;
        let taxonomyId: string;
        let taxonomyTermId: string;
        let exploreSectionName: string;
        let isRecommended: boolean;
        let exploreSection: ExploreSection;
        let denormalizedTask: Task;

        beforeEach(() => {
            taxonomyId = aString();
            taxonomyTermId = aString();
            exploreSectionName = aString();
            task = new TaskBuilder().
                withLocaleCode(locale.code).
                withTaxonomyTerm({ taxonomyId, taxonomyTermId }).
                build();
            exploreSection = new ExploreSectionBuilder().withName(exploreSectionName).build();
            isRecommended = aBoolean();
            denormalizedTask = toSelectorTask(locale, task, exploreSection, isRecommended, []);
        });

        test('id property', () => {
            expect(denormalizedTask.id).toBe(task.id);
        });

        test('completed property', () => {
            expect(denormalizedTask.completed).toBe(task.completed);
        });

        test('title property', () => {
            expect(denormalizedTask.title).toBe(task.title[locale.code]);
        });

        test('description property', () => {
            expect(denormalizedTask.description).toBe(task.description[locale.code]);
        });

        test('taxonomy term reference', () => {
            expect(denormalizedTask.taxonomyTerms).toEqual([{ taxonomyId, taxonomyTermId }]);
        });

        test('explore section', () => {
            expect(denormalizedTask.exploreSection.name).toEqual(exploreSectionName);
        });

        test('is recommended flag', () => {
            expect(denormalizedTask.isRecommended).toEqual(isRecommended);
        });
    });

    describe('getting recommended tasks', () => {

        it('should not recommend tasks by default', () => {
            const aTaxonomyTerm = aTaxonomyTermReference();
            const aNonChosenAnswer = new AnswerBuilder().withIsChosen(false).withTaxonomyTerm(aTaxonomyTerm).build();
            const anIncompleteTask = new TaskBuilder().withCompleted(false).build();

            const result = getRecommendedTasks({ [aNonChosenAnswer.id]: aNonChosenAnswer }, { [anIncompleteTask.id]: anIncompleteTask });

            expect(result).toEqual([]);
        });

        it('should recommend tasks tagged with the recommend to all taxonomy term', () => {
            const recommendedToAllTaxonomyTerm = {
                taxonomyId: TaxonomyConstants.RECOMMENDATION_TAXONOMY_ID,
                taxonomyTermId: TaxonomyConstants.RECOMMEND_TO_ALL_TAXONOMY_TERM_ID,
            };
            const aTaskRecommendedToAll = new TaskBuilder().withTaxonomyTerm(recommendedToAllTaxonomyTerm).withCompleted(false).build();
            const aNonChosenAnswer = new AnswerBuilder().withIsChosen(false).build();

            const result = getRecommendedTasks({ [aNonChosenAnswer.id]: aNonChosenAnswer }, { [aTaskRecommendedToAll.id]: aTaskRecommendedToAll });

            expect(result).toEqual([aTaskRecommendedToAll]);
        });

        it('should recommend tasks tagged with the same taxonomy term as a chosen answer', () => {
            const aTaxonomyTerm = aTaxonomyTermReference();
            const aChosenAnswer = new AnswerBuilder().withTaxonomyTerm(aTaxonomyTerm).withIsChosen(true).withIsInverted(false).build();
            const anIncompleteTask = new TaskBuilder().withTaxonomyTerm(aTaxonomyTerm).withCompleted(false).build();

            const result = getRecommendedTasks({ [aChosenAnswer.id]: aChosenAnswer }, { [anIncompleteTask.id]: anIncompleteTask });

            expect(result).toEqual([anIncompleteTask]);
        });

        it('should not recommend a completed task', () => {
            const aTaxonomyTerm = aTaxonomyTermReference();
            const aChosenAnswer = new AnswerBuilder().withTaxonomyTerm(aTaxonomyTerm).withIsChosen(true).build();
            const aCompleteTask = new TaskBuilder().withCompleted(true).withTaxonomyTerm(aTaxonomyTerm).build();

            const result = getRecommendedTasks({ [aChosenAnswer.id]: aChosenAnswer }, { [aCompleteTask.id]: aCompleteTask });

            expect(result).toEqual([]);
        });

    });

    describe('getting newly recommended tasks', () => {

        let chosenAnswers: AnswersMap = undefined;
        let nonChosenAnswers: AnswersMap = undefined;
        let incompleteTask: stores.Task = undefined;
        let incompleteTasks: stores.TaskMap = undefined;

        beforeEach(() => {
            const aTaxonomyTerm = aTaxonomyTermReference();

            const notChosenAnswer = new AnswerBuilder().withTaxonomyTerm(aTaxonomyTerm).withIsChosen(false).withIsInverted(false).build();
            nonChosenAnswers = { [notChosenAnswer.id]: notChosenAnswer };

            const chosenAnswer = new AnswerBuilder().withTaxonomyTerm(aTaxonomyTerm).withIsChosen(true).withIsInverted(false).build();
            chosenAnswers = { [chosenAnswer.id]: chosenAnswer };

            incompleteTask = new TaskBuilder().withTaxonomyTerm(aTaxonomyTerm).withCompleted(false).build();
            incompleteTasks = { [incompleteTask.id]: incompleteTask };
        });

        it('should include a task that was not previously recommended but is now recommended', () => {
            const oldNonChosenAnswers = nonChosenAnswers;
            const newChosenAnswers = chosenAnswers;

            const result = getNewlyRecommendedTasks(oldNonChosenAnswers, newChosenAnswers, incompleteTasks);

            expect(result).toEqual([incompleteTask]);
        });

        it('should not include a tasks that was previously recommended and is still recommended', () => {
            const oldChosenAnswers = chosenAnswers;
            const newChosenAnswers = chosenAnswers;

            const result = getNewlyRecommendedTasks(oldChosenAnswers, newChosenAnswers, incompleteTasks);

            expect(result).toEqual([]);
        });

        it('should not include a tasks that was not previously recommended and is still not recommended', () => {
            const oldNonChosenAnswers = nonChosenAnswers;
            const newNonChosenAnswers = nonChosenAnswers;

            const result = getNewlyRecommendedTasks(oldNonChosenAnswers, newNonChosenAnswers, incompleteTasks);

            expect(result).toEqual([]);
        });

        it('should not include a tasks that was previously recommended and is no longer recommended', () => {
            const oldChosenAnswers = chosenAnswers;
            const newNonChosenAnswers = nonChosenAnswers;

            const result = getNewlyRecommendedTasks(oldChosenAnswers, newNonChosenAnswers, incompleteTasks);

            expect(result).toEqual([]);
        });
    });

    describe('is task recommended', () => {

        it('returns false by default', () => {
            const task = new TaskBuilder().build();
            const noTaxonomyTermsFromQuestionnaire: ReadonlyArray<TaxonomyTermReference> = [];

            const result = isTaskRecommended(noTaxonomyTermsFromQuestionnaire, task);

            expect(result).toBe(false);
        });

        it('returns true if task is recommended to all', () => {
            const taxonomyId = TaxonomyConstants.RECOMMENDATION_TAXONOMY_ID;
            const taxonomyTermId = TaxonomyConstants.RECOMMEND_TO_ALL_TAXONOMY_TERM_ID;
            const task = new TaskBuilder().withTaxonomyTerm({ taxonomyId, taxonomyTermId }).build();
            const noTaxonomyTermsFromQuestionnaire: ReadonlyArray<TaxonomyTermReference> = [];

            const result = isTaskRecommended(noTaxonomyTermsFromQuestionnaire, task);

            expect(result).toBe(true);
        });

        it('returns true if tasks is tagged with the same taxonomy term as a selected answer', () => {
            const taxonomyId = aString();
            const taxonomyTermId = aString();
            const task = new TaskBuilder().withTaxonomyTerm({ taxonomyId, taxonomyTermId }).build();
            const taxonomyTermsFromQuestionnaire: ReadonlyArray<TaxonomyTermReference> = [{ taxonomyId, taxonomyTermId }];

            const result = isTaskRecommended(taxonomyTermsFromQuestionnaire, task);

            expect(result).toBe(true);
        });

        it('returns true for a completed task', () => {
            const taxonomyId = aString();
            const taxonomyTermId = aString();
            const task = new TaskBuilder().withCompleted(true).withTaxonomyTerm({ taxonomyId, taxonomyTermId }).build();
            const taxonomyTermsFromQuestionnaire: ReadonlyArray<TaxonomyTermReference> = [{ taxonomyId, taxonomyTermId }];

            const result = isTaskRecommended(taxonomyTermsFromQuestionnaire, task);

            expect(result).toBe(true);
        });
        // TODO should also return true for a saved task (for once we refactor tasks to have a saved flag)
    });

    describe('sorting', () => {
        it('sorts recommended tasks before non-recommended tasks', () => {
            const theId = aString();
            const firstByRecommended = new ViewTaskBuilder().withId(theId).withIsRecommended(true).build();
            const lastByRecommended = new ViewTaskBuilder().withId(theId).withIsRecommended(false).build();
            const sorted = sortTaskList([lastByRecommended, firstByRecommended]);
            expect(sorted[0]).toBe(firstByRecommended);
            expect(sorted[1]).toBe(lastByRecommended);
        });

        it('sorts by id if both have the same recommended state', () => {
            const isRecommended = aBoolean();
            const firstById = new ViewTaskBuilder().withId('aaa').withIsRecommended(isRecommended).build();
            const lastById = new ViewTaskBuilder().withId('bbb').withIsRecommended(isRecommended).build();
            const sorted = sortTaskList([lastById, firstById]);
            expect(sorted[0]).toBe(firstById);
            expect(sorted[1]).toBe(lastById);
        });

        it('sorts by recommended flag if they have different ids', () => {
            const firstByIdLastByRecommended = new ViewTaskBuilder().withId('aaa').withIsRecommended(false).build();
            const lastByIdFirstByRecommended = new ViewTaskBuilder().withId('bbb').withIsRecommended(true).build();
            const sorted = sortTaskList([firstByIdLastByRecommended, lastByIdFirstByRecommended]);
            expect(sorted[0]).toBe(lastByIdFirstByRecommended);
            expect(sorted[1]).toBe(firstByIdLastByRecommended);
        });
    });

    describe('getting taxonomy terms from tasks', () => {
        const aTaxonomyTerm = aTaxonomyTermReference();

        it('should return taxonomy term', () => {
            const aTask = new TaskBuilder().withTaxonomyTerm(aTaxonomyTerm).withId('id').build();

            const result = getAllTaxonomyTermsFromTasks({ 'id': aTask });

            expect(result).toEqual([aTaxonomyTerm]);
        });

        it('should return terms without duplicates', () => {
            const aTask = new TaskBuilder().withTaxonomyTerm(aTaxonomyTerm).withId('id1').build();
            const aSecondTaskWithSameTaxonomyTerm = new TaskBuilder().withTaxonomyTerm(aTaxonomyTerm).withId('id2').build();

            const result = getAllTaxonomyTermsFromTasks({ 'id1': aTask, 'id2': aSecondTaskWithSameTaxonomyTerm });

            expect(result).toEqual([aTaxonomyTerm]);
        });
    });

    describe('get ids of completed tasks', () => {
        it('includes the id of a completed task', () => {
            const theId = aString();
            const aTask = new TaskBuilder().withCompleted(true).withId(theId).build();

            const result = getIdsOfCompletedTasks({ [theId]: aTask });

            expect(result).toEqual([theId]);
        });
        it('does not include the id of a non-completed task', () => {
            const theId = aString();
            const aTask = new TaskBuilder().withCompleted(false).withId(theId).build();

            const result = getIdsOfCompletedTasks({ [theId]: aTask });

            expect(result).toEqual([]);
        });
    });

    describe('rejecting task ids', () => {

        it('excludes rejected task ids', () => {
            const aTaskIdToReject = aString();
            const aTaskWithRejectedId = new TaskBuilder().withId(aTaskIdToReject).build();
            expect(rejectTasksWithIds([aTaskWithRejectedId], [aTaskIdToReject])).toHaveLength(0);
        });

        it('includes non rejected task ids', () => {
            const aTaskIdToReject = aString();
            const aTaskWithRejectedId = new TaskBuilder().withId(aTaskIdToReject).build();
            const aTaskToInclude = new TaskBuilder().build();
            expect(rejectTasksWithIds([aTaskWithRejectedId, aTaskToInclude], [aTaskIdToReject])).toHaveLength(1);
        });
    });
});
