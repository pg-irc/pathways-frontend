// tslint:disable:no-expression-statement no-let
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { TaskBuilder } from '../../stores/__tests__/helpers/tasks_helpers';
import { createRelatedServicesQueryFromTask } from '../services/create_related_services_query_from_task';

describe('get service query from task', () => {
    it('should return the query from the task if the query is defined', () => {
        const query = aString();
        const task = new TaskBuilder().withServiceQuery(query).build();
        const result = createRelatedServicesQueryFromTask(task);
        expect(result).toBe(query);
    });

    it('should return the three first words of the title in English if the query is not defined', () => {
        const title = 'Foo bar baz fuzz';
        const englishLocale = 'en';
        const task = new TaskBuilder().
            withServiceQuery('').
            withLocaleCode(englishLocale).
            withTitle(title).
            build();
        const result = createRelatedServicesQueryFromTask(task);
        expect(result).toBe('Foo,bar,baz');
    });
});
