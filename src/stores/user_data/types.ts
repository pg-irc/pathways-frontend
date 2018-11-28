import { Id as AnswerId } from '../questionnaire';
import { Id as TaskId } from '../tasks';

export interface PersistedUserData {
    readonly chosenAnswers: ReadonlyArray<AnswerId>;
    readonly savedTasks: ReadonlyArray<TaskId>;
    readonly completedTasks: ReadonlyArray<TaskId>;
}
