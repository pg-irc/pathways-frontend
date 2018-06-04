import * as stores from '../../stores/tasks';
import * as pageSwitcher from '../../stores/page_switcher';

export interface TaskActions {
    readonly addToSavedList?: (taskId: stores.Id) => stores.AddToSavedListAction;
    readonly removeFromSavedList?: (taskId: stores.Id) => stores.RemoveFromSavedListAction;
    readonly addToSuggestedList?: (taskId: stores.Id) => stores.AddToSuggestedListAction;
    readonly removeFromSuggestedList?: (taskId: stores.Id) => stores.RemoveFromSuggestedListAction;
    readonly toggleCompleted?: (taskUserSettingsId: stores.Id) => stores.ToggleCompletedAction;
    readonly toggleStarred?: (taskUserSettingsId: stores.Id) => stores.ToggleStarredAction;
    readonly shareTask?: () => stores.ShareAction;
    readonly goToTaskDetail?: (taskId: stores.Id) => pageSwitcher.SetMainPageAction;
}
