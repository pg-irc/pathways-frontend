import * as stores from '../../stores/tasks';
import { SetTaskDetailPageAction } from '../../stores/page_switcher';

export interface TaskActions {
    readonly goToTaskDetail: (taskId: stores.Id) => SetTaskDetailPageAction;
    readonly addToSavedList?: (taskId: stores.Id) => stores.AddToSavedListAction;
    readonly removeFromSavedList?: (taskId: stores.Id) => stores.RemoveFromSavedListAction;
    readonly toggleCompleted?: (taskUserSettingsId: stores.Id) => stores.ToggleCompletedAction;
    readonly toggleStarred?: (taskUserSettingsId: stores.Id) => stores.ToggleStarredAction;
    readonly shareTask?: () => stores.ShareAction;
}
