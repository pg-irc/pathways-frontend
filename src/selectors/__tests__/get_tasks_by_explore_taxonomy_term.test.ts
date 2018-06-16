// tslint:disable:no-expression-statement
// tslint:disable:no-let

import { findTasksByExploreTaxonomyTerm } from '../tasks';
import { ExploreTaxonomyId, TaxonomyTermReference } from '../../stores/taxonomies';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { TaskBuilder } from '../../stores/__tests__/helpers/tasks_helpers';
import { TaskMap } from '../../stores/tasks';

describe('find task by explore taxonomy term', () => {
    let exploreTerm: TaxonomyTermReference;
    let taskId: string;
    let taskMap: TaskMap;

    beforeEach(() => {
        exploreTerm = {
            taxonomyId: ExploreTaxonomyId,
            taxonomyTermId: aString(),
        };
        taskId = aString();
        taskMap = {
            [taskId]: new TaskBuilder().withId(taskId).withTaxonomyTerm(exploreTerm).build(),
        };
    });

    it('should return a task tagged with the given taxonomy term', () => {
        const found = findTasksByExploreTaxonomyTerm([exploreTerm], taskMap);
        expect(found[0].id).toBe(taskId);
    });

    it('should not return a task tagged with a different explore taxonomy term', () => {
        const aDifferentExploreTerm = {
            taxonomyId: ExploreTaxonomyId,
            taxonomyTermId: aString(),
        };
        const found = findTasksByExploreTaxonomyTerm([aDifferentExploreTerm], taskMap);
        expect(found).toHaveLength(0);
    });

    it('should not return a task tagged with non-explore taxonomy term', () => {
        const aNonExploreTerm = {
            taxonomyId: aString(),
            taxonomyTermId: aString(),
        };
        taskMap = {
            [taskId]: new TaskBuilder().withId(taskId).withTaxonomyTerm(aNonExploreTerm).build(),
        };
        const found = findTasksByExploreTaxonomyTerm([aNonExploreTerm], taskMap);
        expect(found).toHaveLength(0);
    });

    it('should not return a task when called with no expore terms', () => {
        const found = findTasksByExploreTaxonomyTerm([], taskMap);
        expect(found).toHaveLength(0);
    });
});
