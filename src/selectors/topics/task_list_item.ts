import { ExploreSection } from '../explore/types';

export interface TaskListItem {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly isRecommended: boolean;
    readonly completed: boolean;
    readonly exploreSection: ExploreSection;
}
