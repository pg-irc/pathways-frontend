// tslint:disable:no-expression-statement

import { aString } from '../../application/__tests__/helpers/random_test_values';
import * as tasksHelpers from '../../stores/__tests__/helpers/tasks_helpers';
import * as taskStore from '../../stores/tasks';
import * as taskSelector from '../tasks';
import * as taxSelector from '../tax';
import * as R from 'ramda';
import { Locale } from '../../locale';
import { LocaleBuilder } from '../../stores/__tests__/helpers/locale_helpers';

const selectTasksByTaxonomyTerm =
    (locale: Locale, haystack: taskStore.Store, needle: taxSelector.TaxTermIdetifyingPair): ReadonlyArray<taskSelector.Task> => {

        const isMatch = (id: taxSelector.TaxTermIdetifyingPair): boolean => (
            id.taxId === needle.taxId && id.taxTermId === needle.taxTermId
        );

        const hasMatch = (task: taskStore.Task): boolean => (
            R.any(isMatch, task.taxTermIds)
        );

        const findUserTask = (task: taskStore.Task): taskStore.TaskUserSettings => (
            R.find((u: taskStore.TaskUserSettings) => u.taskId === task.id, R.values(haystack.taskUserSettingsMap))
        );

        const denormalize = (task: taskStore.Task): taskSelector.Task => (
            taskSelector.denormalizeTask(locale, task, findUserTask(task))
        );

        return R.map(denormalize, R.values(R.filter(hasMatch, haystack.taskMap)));
    };

describe('select tasks by taxonomy term', () => {
    it('should return tasks annotated with the given taxonomy term', () => {
        const locale = new LocaleBuilder().build();
        const taxId = aString();
        const taxTermId = aString();
        const taskId = aString();
        const taskBuilder = new tasksHelpers.TaskBuilder().withId(taskId).withTaxTerm(taxId, taxTermId).withLocaleCode(locale.code);
        const taskUserSettingsBuilder = new tasksHelpers.TaskUserSettingsBuilder(taskId);
        const tasksStore = tasksHelpers.buildNormalizedStore([taskBuilder], [taskUserSettingsBuilder], [], []);
        const theTasks = selectTasksByTaxonomyTerm(locale, tasksStore, { taxId, taxTermId });
        expect(theTasks[0].id).toBe(taskId);
    });
});
