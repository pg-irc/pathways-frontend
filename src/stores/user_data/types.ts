import { Id as AnswerId } from '../questionnaire';
import { Id as TaskId } from '../tasks';

export const CURRENT_USER_DATA_VERSION = 'version 1.0';

export interface PersistedUserData {
    readonly version: 'version 1.0';
    readonly chosenAnswers: ReadonlyArray<AnswerId>;
    readonly savedTasks: ReadonlyArray<TaskId>;
    readonly completedTasks: ReadonlyArray<TaskId>;
}
