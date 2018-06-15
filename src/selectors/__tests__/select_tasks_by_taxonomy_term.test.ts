// tslint:disable:no-expression-statement

import { LocaleBuilder } from '../../stores/__tests__/helpers/locale_helpers';
import * as helpers from '../../stores/__tests__/helpers/tasks_helpers';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { selectTasksByTaxonomyTerm } from '../select_tasks_by_taxonomy_term';

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
