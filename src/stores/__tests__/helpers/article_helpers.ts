// tslint:disable:readonly-keyword
// tslint:disable:no-this
// tslint:disable:no-expression-statement
// tslint:disable:readonly-array
// tslint:disable:no-class
import { aString, aBoolean } from '../../../application/__tests__/helpers/random_test_values';
import { LocalizedTextBuilder } from './locale_helpers';
import { Id, Article } from '../../articles';
import { Id as TaskId } from '../../tasks';

export class ArticleBuilder {
    localeCode: string = aString();
    id: Id = aString();
    name: string = aString();
    content: string = aString();
    relatedTasks: ReadonlyArray<TaskId> = [aString(), aString()];
    relatedArticles: ReadonlyArray<Id> = [aString(), aString()];
    isRecommendedToAllUsers: boolean = aBoolean();
    isStarred: boolean = aBoolean();

    withLocaleCode(localeCode: string): ArticleBuilder {
        this.localeCode = localeCode;
        return this;
    }

    withId(id: string): ArticleBuilder {
        this.id = id;
        return this;
    }

    withName(name: string): ArticleBuilder {
        this.name = name;
        return this;
    }

    withContent(content: string): ArticleBuilder {
        this.content = content;
        return this;
    }

    withRelatedTasks(relatedTasks: ReadonlyArray<TaskId>): ArticleBuilder {
        this.relatedTasks = relatedTasks;
        return this;
    }

    withRelatedArticles(relatedArticles: ReadonlyArray<Id>): ArticleBuilder {
        this.relatedArticles = relatedArticles;
        return this;
    }

    withIsStarred(isStarred: boolean): ArticleBuilder {
        this.isStarred = isStarred;
        return this;
    }

    build(): Article {
        return {
            id: this.id,
            name: new LocalizedTextBuilder(this.localeCode, this.name).build(),
            content: new LocalizedTextBuilder(this.localeCode, this.content).build(),
            relatedTasks: this.relatedTasks,
            relatedArticles: this.relatedArticles,
            isRecommendedToAllUsers: this.isRecommendedToAllUsers,
            isStarred: this.isStarred,
        };
    }

}
