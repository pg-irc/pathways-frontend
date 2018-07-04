import * as stores from '../../stores/tasks';
import { SetTaskDetailPageAction } from '../../stores/page_switcher';

export interface TaskActions {
    readonly goToTaskDetail: (taskId: stores.Id) => SetTaskDetailPageAction;
    readonly toggleCompleted: (taskId: stores.Id) => stores.ToggleCompletedAction;
    readonly addToSavedList: (taskId: stores.Id) => stores.AddToSavedListAction;
    readonly removeFromSavedList: (taskId: stores.Id) => stores.RemoveFromSavedListAction;
    readonly addToSuggestedList?: (taskId: stores.Id) => stores.AddToSuggestedListAction;
    readonly removeFromSuggestedList?: (taskId: stores.Id) => stores.RemoveFromSuggestedListAction;
    readonly toggleStarred?: (taskId: stores.Id) => stores.ToggleStarredAction;
    readonly shareTask?: () => stores.ShareAction;
}
