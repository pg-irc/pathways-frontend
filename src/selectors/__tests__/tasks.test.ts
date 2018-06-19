// tslint:disable:no-expression-statement no-let no-any

import { TaskBuilder, TaskUserSettingsBuilder, buildNormalizedStore }
    from '../../stores/__tests__/helpers/tasks_helpers';
import { LocaleBuilder } from '../../stores/__tests__/helpers/locale_helpers';
import * as selector from '../tasks';
import * as stores from '../../stores/tasks';
import { Locale } from '../../locale/types';
import { aString } from '../../application/__tests__/helpers/random_test_values';

describe('tasks selector', () => {

    describe('denormalization', () => {
        let locale: Locale;
        let task: stores.Task;
        let taxonomyId: string;
        let taxonomyTermId: string;
        let taskUserSettings: stores.TaskUserSettings;
        let denormalizedTask: selector.Task;

        beforeEach(() => {
            taxonomyId = aString();
            taxonomyTermId = aString();
            locale = new LocaleBuilder().build();
            task = new TaskBuilder().withLocaleCode(locale.code).withTaxonomyTerm({ taxonomyId, taxonomyTermId }).build();
            taskUserSettings = new TaskUserSettingsBuilder(task.id).build();
            denormalizedTask = selector.denormalizeTask(locale, task, taskUserSettings);
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

        test('tags property', () => {
            expect(denormalizedTask.tags).toBe(task.tags);
        });
        test('taxonomy term reference', () => {
            expect(denormalizedTask.taxonomyTermReferences).toEqual([{ taxonomyId, taxonomyTermId }]);
        });
    });

    describe('data retrieval', () => {
        let store: stores.Store;
        let locale: Locale;

        beforeEach(() => {
            locale = new LocaleBuilder().build();
            const taskBuilder = new TaskBuilder().withLocaleCode(locale.code);
            const taskUserSettingsBuilder = new TaskUserSettingsBuilder(taskBuilder.build().id);
            store = buildNormalizedStore(
                [taskBuilder],
                [taskUserSettingsBuilder],
                [taskBuilder.build().id],
                [taskBuilder.build().id],
            );
        });

        test('returns all saved tasks', () => {
            expect(Object.keys(selector.selectAllSavedTasks(locale, store))).toHaveLength(1);
        });

        test('returns all suggested tasks', () => {
            expect(Object.keys(selector.selectAllSuggestedTasks(locale, store))).toHaveLength(1);
        });

        test('returns task by id', () => {
            const id = Object.keys(store.taskMap)[0];
            const task = selector.selectTaskById(locale, store, id);
            expect(task.id).toEqual(id);
        });

        test('throws when select task by id parameter is invalid', () => {
            expect(() => selector.selectTaskById(locale, store, aString())).toThrow();
        });

        test('throws when select task user settings by id parameter is invalid', () => {
            expect(() => selector.selectTaskUserSettingsByTaskId(store.taskUserSettingsMap, aString())).toThrow();
        });

    });
});
