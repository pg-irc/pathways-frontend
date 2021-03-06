// tslint:disable:readonly-keyword no-this no-expression-statement readonly-array no-class
import * as store from '../../topics';
import { Id as TaskId } from '../../topics';
import { aString } from '../../../application/helpers/random_test_values';
import { LocalizedText } from '../../../application/locales';
import { TaxonomyTermReference } from '../../../selectors/taxonomies/pull_explore_taxonomy';

export class TopicBuilder {
    localeCode: string = aString();
    id: store.Id = aString();
    region: string = aString();
    chapter: string = aString();
    title: string = aString();
    description: string = aString();
    taxonomyTerms: TaxonomyTermReference[] = [];
    relatedTasks: ReadonlyArray<TaskId> = [aString(), aString()];
    isNewlyRecommended: boolean = false;

    withLocaleCode(localeCode: string): TopicBuilder {
        this.localeCode = localeCode;
        return this;
    }

    withId(id: string): TopicBuilder {
        this.id = id;
        return this;
    }

    withRegion(region: string): TopicBuilder {
        this.region = region;
        return this;
    }

    withChapter(chapter: string): TopicBuilder {
        this.chapter = chapter;
        return this;
    }

    withTitle(title: string): TopicBuilder {
        this.title = title;
        return this;
    }

    withDescription(description: string): TopicBuilder {
        this.description = description;
        return this;
    }

    withNewlyRecommended(isNewlyRecommended: boolean): TopicBuilder {
        this.isNewlyRecommended = isNewlyRecommended;
        return this;
    }

    withTaxonomyTerm(taxonomyTerm: TaxonomyTermReference): TopicBuilder {
        this.taxonomyTerms = [...this.taxonomyTerms, taxonomyTerm];
        return this;
    }

    withRelatedTasks(relatedTasks: ReadonlyArray<store.Id>): TopicBuilder {
        this.relatedTasks = relatedTasks;
        return this;
    }

    build(): store.Topic {
        return {
            id: this.id,
            region: this.region,
            chapter: this.chapter,
            title: this.createLocalizedText(this.title),
            description: this.createLocalizedText(this.description),
            taxonomyTerms: this.taxonomyTerms,
            relatedTopics: this.relatedTasks,
            isNewlyRecommended: this.isNewlyRecommended,
        };
    }

    private createLocalizedText(text: string): LocalizedText {
        return { [this.localeCode]: text };
    }
}

export const buildNormalizedStore = (taskBuilders: ReadonlyArray<TopicBuilder>,
    bookmarkedTasks: ReadonlyArray<store.Id>): store.ValidTopicStore => (
        {
            topicMap: buildTaskMap(taskBuilders),
            bookmarkedTopics: bookmarkedTasks,
        }
    );

const buildTaskMap = (tasks: ReadonlyArray<TopicBuilder>): store.TopicMap => {
    const buildAndMapToIds = (map: store.TopicMap, builder: TopicBuilder): store.TopicMap => {
        return { ...map, [builder.id]: builder.build() };
    };
    return tasks.reduce(buildAndMapToIds, {});
};
