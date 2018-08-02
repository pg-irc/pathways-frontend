/*
Task states:

Recommended: False Saved: False Completed: False Text: TASK              Buttons: addToPlanButton
Recommended: False Saved: False Completed: True  Text: COMPLETED TASK    Buttons: notDoneButton
Recommended: False Saved: True  Completed: False Text: TASK I PLAN TO DO Buttons: removeFromPlanButton, doneButton
Recommended: False Saved: True  Completed: True  Text: COMPLETED TASK    Buttons: notDoneButton
Recommended: True  Saved: False Completed: False Text: RECOMMENDED TASK  Buttons: addToPlanButton
Recommended: True  Saved: False Completed: True  Text: COMPLETED TASK    Buttons: notDoneButton
Recommended: True  Saved: True  Completed: False Text: TASK I PLAN TO DO Buttons: removeFromPlanButton, doneButton
Recommended: True  Saved: True  Completed: True  Text: COMPLETED TASK    Buttons: notDoneButton

Text:
    if (Completed) return COMPLETED TASK
    else if (Saved) return TASK I PLAN TO DO
    else if (Recommended) return RECOMMENDED TASK
    else return TASK

Buttons:
    if (Completed) show notDoneButton
    else if (Saved) show removeFromPlanButton, doneButton
    else show addToPlanButton
*/

export interface TaskState {
    readonly isRecommended: boolean;
    readonly isSaved: boolean;
    readonly isCompleted: boolean;
}

export enum TaskStateLabel {
    CompletedTask,
    TaskIPlanToDo,
    RecommendedTask,
    None,
}

export enum TaskStateButton {
    NotDoneButton,
    RemoveFromPlanButton,
    DoneButton,
    AddToPlanButton,
}

export enum TaskStateListItemIcon {
    Checked,
    UnChecked,
    Add,
}

export const computeStateLabel = (state: TaskState): TaskStateLabel => {
    if (state.isCompleted) {
        return TaskStateLabel.CompletedTask;
    }
    if (state.isSaved) {
        return TaskStateLabel.TaskIPlanToDo;
    }
    if (state.isRecommended) {
        return TaskStateLabel.RecommendedTask;
    }
    return TaskStateLabel.None;
};

export const computeStateButtons = (state: TaskState): ReadonlyArray<TaskStateButton> => {
    if (state.isCompleted) {
        return [TaskStateButton.NotDoneButton];
    }
    if (state.isSaved) {
        return [TaskStateButton.RemoveFromPlanButton, TaskStateButton.DoneButton];
    }
    return [TaskStateButton.AddToPlanButton];
};

export const computeStateListItemIcon = (state: TaskState): TaskStateListItemIcon => {
    if (state.isCompleted) {
        return TaskStateListItemIcon.Checked;
    }
    if (state.isSaved) {
        return TaskStateListItemIcon.UnChecked;
    }
    return TaskStateListItemIcon.Add;
};
