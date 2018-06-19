// tslint:disable:no-expression-statement no-let

import { findTasksByExploreTaxonomyTerm } from '../tasks';
import { ExploreTaxonomyId, TaxonomyTermReference } from '../../stores/taxonomies';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { TaskBuilder, TaskUserSettingsBuilder } from '../../stores/__tests__/helpers/tasks_helpers';
import { TaskMap, TaskUserSettingsMap } from '../../stores/tasks';
import { LocaleBuilder } from '../../stores/__tests__/helpers/locale_helpers';

describe('find task by explore taxonomy term', () => {
    let exploreTerm: TaxonomyTermReference;
    let taskId: string;
    let tasks: TaskMap;
    let userTasks: TaskUserSettingsMap;
    const locale = new LocaleBuilder().build();

    beforeEach(() => {
        exploreTerm = {
            taxonomyId: ExploreTaxonomyId,
            taxonomyTermId: aString(),
        };
        taskId = aString();
        tasks = {
            [taskId]: new TaskBuilder().withId(taskId).withTaxonomyTerm(exploreTerm).build(),
        };
        const userTaskId = aString();
        userTasks = {
            [userTaskId]: new TaskUserSettingsBuilder(taskId).withId(userTaskId).build(),
        };
    });

    it('should return a task tagged with the given taxonomy term', () => {
        const found = findTasksByExploreTaxonomyTerm(locale, [exploreTerm], tasks, userTasks);
        expect(found[0].id).toBe(taskId);
    });

    it('should not return a task tagged with a different explore taxonomy term', () => {
        const aDifferentExploreTerm = {
            taxonomyId: ExploreTaxonomyId,
            taxonomyTermId: aString(),
        };
        const found = findTasksByExploreTaxonomyTerm(locale, [aDifferentExploreTerm], tasks, userTasks);
        expect(found).toHaveLength(0);
    });

    it('should not return a task tagged with non-explore taxonomy term', () => {
        const aNonExploreTerm = {
            taxonomyId: aString(),
            taxonomyTermId: aString(),
        };
        tasks = {
            [taskId]: new TaskBuilder().withId(taskId).withTaxonomyTerm(aNonExploreTerm).build(),
        };
        const found = findTasksByExploreTaxonomyTerm(locale, [aNonExploreTerm], tasks, userTasks);
        expect(found).toHaveLength(0);
    });

    it('should not return a task when called with no expore terms', () => {
        const found = findTasksByExploreTaxonomyTerm(locale, [], tasks, userTasks);
        expect(found).toHaveLength(0);
    });
});
