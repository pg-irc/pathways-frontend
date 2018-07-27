// tslint:disable:no-expression-statement no-let

import { findItemByLearnTaxonomyTerm } from '../details/tasks';
import { ExploreTaxonomyId, TaxonomyTermReference } from '../../stores/taxonomies';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { TaskBuilder } from '../../stores/__tests__/helpers/tasks_helpers';
import { TaskMap } from '../../stores/tasks';

describe('find task by explore taxonomy term', () => {
    let exploreTerm: TaxonomyTermReference;
    let taskId: string;
    let tasks: TaskMap;

    beforeEach(() => {
        exploreTerm = {
            taxonomyId: ExploreTaxonomyId,
            taxonomyTermId: aString(),
        };
        taskId = aString();
        tasks = {
            [taskId]: new TaskBuilder().withId(taskId).withTaxonomyTerm(exploreTerm).build(),
        };
    });

    it('should return a task tagged with the given taxonomy term', () => {
        const found = findItemByLearnTaxonomyTerm([exploreTerm], tasks);
        expect(found[0].id).toBe(taskId);
    });

    it('should not return a task tagged with a different explore taxonomy term', () => {
        const aDifferentExploreTerm = {
            taxonomyId: ExploreTaxonomyId,
            taxonomyTermId: aString(),
        };
        const found = findItemByLearnTaxonomyTerm([aDifferentExploreTerm], tasks);
        expect(found).toHaveLength(0);
    });

    it('should not return a task tagged with non-explore taxonomy term', () => {
        const aDifferentTaxonomyId = aString();
        const aNonExploreTerm = {
            taxonomyId: aDifferentTaxonomyId,
            taxonomyTermId: exploreTerm.taxonomyTermId,
        };
        tasks = {
            [taskId]: new TaskBuilder().withId(taskId).withTaxonomyTerm(aNonExploreTerm).build(),
        };
        const found = findItemByLearnTaxonomyTerm([aNonExploreTerm], tasks);
        expect(found).toHaveLength(0);
    });

    it('should not return a task when called with no expore terms', () => {
        const found = findItemByLearnTaxonomyTerm([], tasks);
        expect(found).toHaveLength(0);
    });
});
