// tslint:disable:no-class no-this readonly-keyword no-expression-statement

import { ExploreSection } from '../../explore/types';
import { aString, aBoolean } from '../../../application/__tests__/helpers/random_test_values';
import { TopicListItem } from '../../topics/topic_list_item';

export class TaskListItemBuilder {
    id: string = aString();
    title: string = aString();
    description: string = aString();
    isRecommended: boolean = aBoolean();
    completed: boolean = aBoolean();
    exploreSection: ExploreSection;

    constructor(exploreSection: ExploreSection) {
        this.exploreSection = exploreSection;
    }

    withexploreSection(exploreSection: ExploreSection): TaskListItemBuilder {
        this.exploreSection = exploreSection;
        return this;
    }

    build(): TopicListItem {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            isRecommended: this.isRecommended,
            completed: this.completed,
            exploreSection: this.exploreSection,
        };
    }
}
