export enum TaskStates {
    CompletedInPlan,
    CompletedNotInPlan,
    InProgress,
    Available,
}

interface TaskStatus {
    readonly inPlan: boolean;
    readonly completed: boolean;
}

export const getTaskState = (taskStatus: TaskStatus): TaskStates => {
    const { inPlan, completed }: TaskStatus = taskStatus;
    if (inPlan && completed) {
        return TaskStates.CompletedInPlan;
    } else if (!inPlan && completed) {
        return TaskStates.CompletedNotInPlan;
    } else if (inPlan && !completed) {
        return TaskStates.InProgress;
    }
    return TaskStates.Available;
};
