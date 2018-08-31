// tslint:disable:readonly-keyword no-this no-expression-statement readonly-array no-class
import * as store from '../../tasks';
import { Id as ArticleId } from '../../articles';
import { aString, aBoolean } from '../../../application/__tests__/helpers/random_test_values';
import { LocalizedText } from '../../../locale';
import { LocalizedTextBuilder } from './locale_helpers';
import { TaxonomyTermReference } from '../../../selectors/taxonomies/pull_explore_taxonomy';

export class TaskBuilder {
    localeCode: string = aString();
    id: store.Id = aString();
    chapter: string = aString();
    title: string = aString();
    description: string = aString();
    taxonomyTerms: TaxonomyTermReference[] = [];
    relatedTasks: ReadonlyArray<ArticleId> = [aString(), aString()];
    relatedArticles: ReadonlyArray<store.Id> = [aString(), aString()];
    serviceQuery: string = aString();
    completed: boolean = aBoolean();

    withLocaleCode(localeCode: string): TaskBuilder {
        this.localeCode = localeCode;
        return this;
    }

    withId(id: string): TaskBuilder {
        this.id = id;
        return this;
    }

    withChapter(chapter: string): TaskBuilder {
        this.chapter = chapter;
        return this;
    }

    withTitle(title: string): TaskBuilder {
        this.title = title;
        return this;
    }

    withDescription(description: string): TaskBuilder {
        this.description = description;
        return this;
    }

    withCompleted(completed: boolean): TaskBuilder {
        this.completed = completed;
        return this;
    }

    withTaxonomyTerm(taxonomyTerm: TaxonomyTermReference): TaskBuilder {
        this.taxonomyTerms = [...this.taxonomyTerms, taxonomyTerm];
        return this;
    }

    withRelatedTasks(relatedTasks: ReadonlyArray<store.Id>): TaskBuilder {
        this.relatedTasks = relatedTasks;
        return this;
    }

    withRelatedArticles(relatedArticles: ReadonlyArray<ArticleId>): TaskBuilder {
        this.relatedArticles = relatedArticles;
        return this;
    }

    withServiceQuery(query: string): TaskBuilder {
        this.serviceQuery = query;
        return this;
    }

    build(): store.Task {
        return {
            id: this.id,
            chapter: this.chapter,
            title: this.createLocalizedText(this.title),
            description: this.createLocalizedText(this.description),
            taxonomyTerms: this.taxonomyTerms,
            relatedArticles: this.relatedArticles,
            relatedTasks: this.relatedArticles,
            serviceQuery: this.serviceQuery,
            completed: this.completed,
        };
    }

    private createLocalizedText(text: string): LocalizedText {
        return new LocalizedTextBuilder().addLocalizedText(this.localeCode, text).build();
    }
}

export const buildNormalizedStore = (taskBuilders: ReadonlyArray<TaskBuilder>,
    savedTasks: ReadonlyArray<store.Id>): store.ValidTaskStore => (
        {
            taskMap: buildTaskMap(taskBuilders),
            savedTasksList: savedTasks,
        }
    );

const buildTaskMap = (tasks: ReadonlyArray<TaskBuilder>): store.TaskMap => {
    const buildAndMapToIds = (map: store.TaskMap, builder: TaskBuilder): store.TaskMap => {
        return { ...map, [builder.id]: builder.build() };
    };
    return tasks.reduce(buildAndMapToIds, {});
};
