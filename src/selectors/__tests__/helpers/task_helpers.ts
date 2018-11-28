// tslint:disable:readonly-keyword no-this no-expression-statement readonly-array no-class

import { aString, aBoolean } from '../../../application/__tests__/helpers/random_test_values';
import { TaxonomyTermReference } from '../../../stores/taxonomies';
import { ExploreSection } from '../../explore/types';
import { Task } from '../../tasks/task';
import { TaskListItem } from '../../tasks/task_list_item';

export class ViewTaskBuilder {
    id: string = aString();
    title: string = aString();
    description: string = aString();
    taxonomyTerms: Array<TaxonomyTermReference>;
    exploreSection: ExploreSection;
    isRecommended: boolean = aBoolean();
    relatedTasks: Array<TaskListItem> = [];
    completed: boolean = aBoolean();

    withId(id: string): ViewTaskBuilder {
        this.id = id;
        return this;
    }

    withIsRecommended(isRecommended: boolean): ViewTaskBuilder {
        this.isRecommended = isRecommended;
        return this;
    }

    build(): Task {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            taxonomyTerms: this.taxonomyTerms,
            exploreSection: this.exploreSection,
            isRecommended: this.isRecommended,
            relatedTasks: this.relatedTasks,
            completed: this.completed,
        };
    }
}
