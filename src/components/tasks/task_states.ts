export enum TaskStates {
    CompletedInPlan,
    CompletedNotInPlan,
    InProgress,
    Available,
}

export const getTaskState = (inPlan: boolean, completed: boolean): TaskStates => {
    if (inPlan && completed) {
        return TaskStates.CompletedInPlan;
    } else if (!inPlan && completed) {
        return TaskStates.CompletedNotInPlan;
    } else if (inPlan && !completed) {
        return TaskStates.InProgress;
    }
    return TaskStates.Available;
};