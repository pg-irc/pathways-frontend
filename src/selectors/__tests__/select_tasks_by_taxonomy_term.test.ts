// tslint:disable:no-expression-statement

import * as helpers from '../../stores/__tests__/helpers/tasks_helpers';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { filterTasksByTaxonomyTerm } from '../select_tasks_by_taxonomy_term';

describe('select tasks by taxonomy term', () => {
    const taxonomyId = aString();
    const taxonomyTermId = aString();
    const taskId = aString();
    const taskBuilder = new helpers.TaskBuilder().
        withId(taskId).
        withTaxonomyTerm({ taxonomyId, taxonomyTermId });
    const theTask = taskBuilder.build();
    const theTaskMap = {
        [taskId]: theTask,
    };

    it('should return tasks annotated with the given taxonomy term', () => {
        const theTasks = filterTasksByTaxonomyTerm(theTaskMap, { taxonomyId, taxonomyTermId });
        expect(theTasks[taskId]).toBe(theTask);
    });

    it('should not return task if only taxonomy id matches', () => {
        const theTasks = filterTasksByTaxonomyTerm(theTaskMap, { taxonomyId, taxonomyTermId: aString() });
        expect(theTasks).toEqual({});
    });

    it('should not return task if only taxonomy term id matches', () => {
        const theTasks = filterTasksByTaxonomyTerm(theTaskMap, { taxonomyId: aString(), taxonomyTermId });
        expect(theTasks).toEqual({});
    });
});
