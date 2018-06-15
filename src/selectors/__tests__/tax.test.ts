// tslint:disable:no-expression-statement

import { Locale } from '../../locale';
import { LocaleBuilder } from '../../stores/__tests__/helpers/locale_helpers';
import { TaxonomyTermReference } from '../tax';
import * as store from '../../stores/tasks';
import * as selector from '../tasks';
import * as helpers from '../../stores/__tests__/helpers/tasks_helpers';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import * as R from 'ramda';

// TODO move to selector file in tasks
const selectTasksByTaxonomyTerm =
    (locale: Locale, taskStore: store.Store, needle: TaxonomyTermReference): ReadonlyArray<selector.Task> => {

        const matchesNeedle = (id: TaxonomyTermReference): boolean => (
            id.taxonomyId === needle.taxonomyId && id.taxonomyTermId === needle.taxonomyTermId
        );

        const hasMatch = (task: store.Task): boolean => (
            R.any(matchesNeedle, task.taxonomyTermReferences)
        );

        const findUserTask = (task: store.Task): store.TaskUserSettings => (
            R.find((u: store.TaskUserSettings) => u.taskId === task.id, R.values(taskStore.taskUserSettingsMap))
        );

        const denormalize = (task: store.Task): selector.Task => (
            selector.denormalizeTask(locale, task, findUserTask(task))
        );

        return R.map(denormalize, R.values(R.filter(hasMatch, taskStore.taskMap)));
    };

describe('select tasks by taxonomy term', () => {
    it('should return tasks annotated with the given taxonomy term', () => {
        const locale = new LocaleBuilder().build();
        const taxonomyId = aString();
        const taxonomyTermId = aString();
        const taskId = aString();
        const taskBuilder = new helpers.TaskBuilder().
            withId(taskId).
            withTaxonomyTerm({ taxonomyId, taxonomyTermId }).
            withLocaleCode(locale.code);
        const taskUserSettingsBuilder = new helpers.TaskUserSettingsBuilder(taskId);
        const tasksStore = helpers.buildNormalizedStore([taskBuilder], [taskUserSettingsBuilder], [], []);

        const theTasks = selectTasksByTaxonomyTerm(locale, tasksStore, { taxonomyId, taxonomyTermId });

        expect(theTasks[0].id).toBe(taskId);
    });
});
