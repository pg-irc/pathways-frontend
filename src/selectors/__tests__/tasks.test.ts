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
import { filterTasksByTaxonomyTerms } from '../tasks/filter_tasks_by_taxonomy_terms';
import { rejectCompletedTasks } from '../tasks/reject_completed_tasks';
import { rejectTasksWithIdsInList } from '../tasks/reject_tasks_with_ids_in_list';
import { sortTaskList } from '../tasks/sort_task_list';
import { ViewTaskBuilder } from './helpers/task_helpers';

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
        let serviceQuery: string;

        beforeEach(() => {
            taxonomyId = aString();
            taxonomyTermId = aString();
            exploreSectionName = aString();
            serviceQuery = aString();
            task = new TaskBuilder().
                withLocaleCode(locale.code).
                withTaxonomyTerm({ taxonomyId, taxonomyTermId }).
                withServiceQuery(serviceQuery).
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

        test('service query', () => {
            expect(denormalizedTask.serviceQuery).toEqual(serviceQuery);
        });
    });

    describe('recommendation engine', () => {
        it('should not recommend tasks by default', () => {
            const task = new TaskBuilder().withLocaleCode(locale.code).build();
            const taskMap = { [task.id]: task };
            const result = filterTasksByTaxonomyTerms([], taskMap);
            expect(result).toEqual([]);
        });

        it('should recommend tasks tagged with the recommend to all taxonomy term', () => {
            const taxonomyId = TaxonomyConstants.RECOMMENDATION_TAXONOMY_ID;
            const taxonomyTermId = TaxonomyConstants.RECOMMEND_TO_ALL_TAXONOMY_TERM_ID;
            const task = new TaskBuilder().withLocaleCode(locale.code).withTaxonomyTerm({ taxonomyId, taxonomyTermId }).build();
            const taskMap = { [task.id]: task };
            const result = filterTasksByTaxonomyTerms([], taskMap);
            expect(result).toEqual([task]);
        });

        it('should recommend tasks tagged with the same taxonomy term as a selected answer', () => {
            const taxonomyTermReference = aTaxonomyTermReference();
            const selectedAnswerTaxonomyTerms: ReadonlyArray<TaxonomyTermReference> = [taxonomyTermReference];
            const task = new TaskBuilder().withLocaleCode(locale.code).withTaxonomyTerm(taxonomyTermReference).build();
            const taskMap = { [task.id]: task };
            const result = filterTasksByTaxonomyTerms(selectedAnswerTaxonomyTerms, taskMap);
            expect(result).toEqual([task]);
        });

        it('includes tasks that are not saved in my plan', () => {
            const task = new TaskBuilder().withLocaleCode(locale.code).build();
            const noSavedTaskIds: ReadonlyArray<string> = [];
            const result = rejectTasksWithIdsInList(noSavedTaskIds, [task]);
            expect(result).toEqual([task]);
        });

        it('excludes tasks that are saved in my plan', () => {
            const task = new TaskBuilder().withLocaleCode(locale.code).build();
            const savedTaskIds: ReadonlyArray<string> = [task.id];
            const result = rejectTasksWithIdsInList(savedTaskIds, [task]);
            expect(result).toEqual([]);
        });

        it('includes tasks that are not completed', () => {
            const nonCompletedTask = new TaskBuilder().withCompleted(false).withLocaleCode(locale.code).build();
            const result = rejectCompletedTasks([nonCompletedTask]);
            expect(result).toEqual([nonCompletedTask]);
        });

        it('excludes tasks that are completed', () => {
            const completedTask = new TaskBuilder().withCompleted(true).withLocaleCode(locale.code).build();
            const result = rejectCompletedTasks([completedTask]);
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
});
