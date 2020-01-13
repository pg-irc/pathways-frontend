// tslint:disable:no-class no-this readonly-keyword no-expression-statement

import { ExploreSection } from '../../explore/types';
import { aString, aBoolean } from '../../../helpers/random_test_values';
import { TopicListItem } from '../../topics/types';

export class TaskListItemBuilder {
    id: string = aString();
    title: string = aString();
    description: string = aString();
    isRecommended: boolean = aBoolean();
    exploreSection: ExploreSection;

    constructor(exploreSection: ExploreSection) {
        this.exploreSection = exploreSection;
    }

    withexploreSection(exploreSection: ExploreSection): TaskListItemBuilder {
        this.exploreSection = exploreSection;
        return this;
    }

    withIsRecommended(isRecommended: boolean): TaskListItemBuilder {
        this.isRecommended = isRecommended;
        return this;
    }

    build(): TopicListItem {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            isRecommended: this.isRecommended,
            exploreSection: this.exploreSection,
        };
    }
}
