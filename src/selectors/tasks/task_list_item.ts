export interface TaskListItem {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly isRecommended: boolean;
    readonly completed: boolean;
}
