// tslint:disable:no-expression-statement
// tslint:disable:no-let

import {
    TaskBuilder,
    TaskUserSettingsBuilder,
    buildNormalizedStore ,
} from './helpers/tasks_helpers';
import * as stores from '../../stores/tasks';
import { aString, aBoolean, aNumber } from '../../application/__tests__/helpers/random_test_values';
import { LocaleBuilder, LocalizedTextBuilder } from './helpers/locale_helpers';

describe('tasks test helpers', () => {

    describe('building the task', () => {
        let locale = new LocaleBuilder().build();

        test('id property', () => {
            const id = aString();
            const task = new TaskBuilder(locale.code).withId(id).build();
            expect(task.id).toBe(id);
        });

        test('title property', () => {
            const title = new LocalizedTextBuilder(locale.code, aString()).build();
            const task = new TaskBuilder(locale.code).withTitle(title).build();
            expect(task.title).toBe(title);
        });

        test('description property', () => {
            const description = new LocalizedTextBuilder(locale.code, aString()).build();
            const task = new TaskBuilder(locale.code).withDescription(description).build();
            expect(task.description).toBe(description);
        });

        test('tags property', () => {
            const tags: ReadonlyArray<string> = [aString(), aString()];
            const task = new TaskBuilder(locale.code).withTags(tags).build();
            expect(task.tags).toBe(tags);
        });

        test('category property', () => {
            const category = aString();
            const task = new TaskBuilder(locale.code).withCategory(category).build();
            expect(task.category).toBe(category);
        });

        test('importance property', () => {
            const importance = aNumber();
            const task = new TaskBuilder(locale.code).withImportance(importance).build();
            expect(task.importance).toBe(importance);
        });
    });

    describe('building the task user settings', () => {

        describe('with properties', () => {
            let taskId: string;

            beforeEach(() => {
               taskId = aString();
            });

            test('task id property', () => {
                const taskUserSettings = new TaskUserSettingsBuilder(taskId).build();
                expect(taskUserSettings.taskId).toBe(taskId);
            });

            test('id property', () => {
                const id = aString();
                const taskUserSettings = new TaskUserSettingsBuilder(taskId).withId(id).build();
                expect(taskUserSettings.id).toBe(id);
            });

            test('starred property', () => {
                const starred = aBoolean();
                const taskUserSettings = new TaskUserSettingsBuilder(taskId).withStarred(starred).build();
                expect(taskUserSettings.starred).toBe(starred);
            });

            test('completed property', () => {
                const completed = aBoolean();
                const taskUserSettings = new TaskUserSettingsBuilder(taskId).withCompleted(completed).build();
                expect(taskUserSettings.completed).toBe(completed);
            });
        });
    });

    describe('the store', () => {

        describe('building a normalized store', () => {
            let locale = new LocaleBuilder().build();
            let firstTaskBuilder: TaskBuilder;
            let secondTaskBuilder: TaskBuilder;
            let firstTaskUserSettingsBuilder: TaskUserSettingsBuilder;
            let secondTaskUserSettingsBuilder: TaskUserSettingsBuilder;
            let store: stores.Store;

            beforeEach(() => {
                firstTaskBuilder = new TaskBuilder(locale.code);
                secondTaskBuilder = new TaskBuilder(locale.code);
                firstTaskUserSettingsBuilder = new TaskUserSettingsBuilder(firstTaskBuilder.build().id);
                secondTaskUserSettingsBuilder = new TaskUserSettingsBuilder(secondTaskBuilder.build().id);
                store = buildNormalizedStore(
                    [firstTaskBuilder, secondTaskBuilder],
                    [firstTaskUserSettingsBuilder, secondTaskUserSettingsBuilder],
                    [firstTaskBuilder.build().id],
                    [secondTaskBuilder.build().id],
                );
            });

            test('task map property', () => {
                expect(store).toHaveProperty('taskMap');
            });

            test('task user settings map property', () => {
                expect(store).toHaveProperty('taskUserSettingsMap');
            });

            test('saved tasks list property', () => {
                expect(store).toHaveProperty('savedTasksList');
            });

            test('suggested tasks list property', () => {
                expect(store).toHaveProperty('suggestedTasksList');
            });

            test('tasks map keys are expected task ids', () => {
                expect(Object.keys(store.taskMap)).toEqual([firstTaskBuilder.build().id, secondTaskBuilder.build().id]);
            });

            test('task user settings map keys are expected task user settings ids', () => {
                const expectedIds: ReadonlyArray<stores.Id> = [
                    firstTaskUserSettingsBuilder.build().id,
                    secondTaskUserSettingsBuilder.build().id,
                ];
                expect(Object.keys(store.taskUserSettingsMap)).toEqual(expectedIds);
            });
        });
    });
});
