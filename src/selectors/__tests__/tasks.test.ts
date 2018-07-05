// tslint:disable:no-expression-statement no-let no-any

import { TaskBuilder, TaskUserSettingsBuilder, buildNormalizedStore }
    from '../../stores/__tests__/helpers/tasks_helpers';
import { LocaleBuilder } from '../../stores/__tests__/helpers/locale_helpers';
import * as selector from '../tasks';
import * as stores from '../../stores/tasks';
import { Taxonomies as TaxonomyConstants } from '../../application/constants';
import { Locale } from '../../locale/types';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { TaxonomyTermReference } from '../../stores/taxonomies';

let locale: Locale = undefined;

const aTaxonomyTermReference = (): TaxonomyTermReference => (
    { taxonomyId: aString(), taxonomyTermId: aString() }
);

beforeEach(() => {
    locale = new LocaleBuilder().build();
});

describe('tasks selector', () => {

    describe('denormalization', () => {
        let task: stores.Task;
        let taxonomyId: string;
        let taxonomyTermId: string;
        let taskUserSettings: stores.TaskUserSettings;
        let denormalizedTask: selector.Task;

        beforeEach(() => {
            taxonomyId = aString();
            taxonomyTermId = aString();
            task = new TaskBuilder().withLocaleCode(locale.code).withTaxonomyTerm({ taxonomyId, taxonomyTermId }).build();
            taskUserSettings = new TaskUserSettingsBuilder(task.id).build();
            denormalizedTask = selector.denormalizeTask(locale, task, taskUserSettings, [], []);
        });

        test('id property', () => {
            expect(denormalizedTask.id).toBe(task.id);
        });

        test('completed property', () => {
            expect(denormalizedTask.completed).toBe(taskUserSettings.completed);
        });

        test('starred property', () => {
            expect(denormalizedTask.starred).toBe(taskUserSettings.starred);
        });

        test('title property', () => {
            expect(denormalizedTask.title).toBe(task.title[locale.code]);
        });

        test('description property', () => {
            expect(denormalizedTask.description).toBe(task.description[locale.code]);
        });

        test('category property', () => {
            expect(denormalizedTask.category).toBe(task.category);
        });

        test('importance property', () => {
            expect(denormalizedTask.importance).toBe(task.importance);
        });

        test('taxonomy term reference', () => {
            expect(denormalizedTask.taxonomyTerms).toEqual([{ taxonomyId, taxonomyTermId }]);
        });

    });

    describe('recommendation engine', () => {
        it('should not recommend tasks by default', () => {
            const task = new TaskBuilder().withLocaleCode(locale.code).build();
            const taskMap = { [task.id]: task };
            const result = selector.filterTasksByTaxonomyTerms([], taskMap);
            expect(result).toEqual([]);
        });

        it('should recommend tasks tagged with the recommend to all taxonomy term', () => {
            const taxonomyId = TaxonomyConstants.RECOMMENDATION_TAXONOMY_ID;
            const taxonomyTermId = TaxonomyConstants.RECOMMEND_TO_ALL_TAXONOMY_TERM_ID;
            const task = new TaskBuilder().withLocaleCode(locale.code).withTaxonomyTerm({ taxonomyId, taxonomyTermId }).build();
            const taskMap = { [task.id]: task };
            const result = selector.filterTasksByTaxonomyTerms([], taskMap);
            expect(result).toEqual([task]);
        });

        it('should recommend tasks tagged with the same taxonomy term as a selected answer', () => {
            const taxonomyTermReference = aTaxonomyTermReference();
            const selectedAnswerTaxonomyTerms: ReadonlyArray<TaxonomyTermReference> = [taxonomyTermReference];
            const task = new TaskBuilder().withLocaleCode(locale.code).withTaxonomyTerm(taxonomyTermReference).build();
            const taskMap = { [task.id]: task };
            const result = selector.filterTasksByTaxonomyTerms(selectedAnswerTaxonomyTerms, taskMap);
            expect(result).toEqual([task]);
        });

    });

    describe('selected data', () => {
        let store: stores.Store;

        beforeEach(() => {
            const taskBuilder = new TaskBuilder().withLocaleCode(locale.code);
            const taskUserSettingsBuilder = new TaskUserSettingsBuilder(taskBuilder.build().id);
            store = buildNormalizedStore(
                [taskBuilder],
                [taskUserSettingsBuilder],
                [taskBuilder.build().id],
            );
        });

        test('throws when select task user settings by id parameter is invalid', () => {
            expect(() => selector.findTaskUserSettingsByTaskId(store.taskUserSettingsMap, aString())).toThrow();
        });

    });
});
