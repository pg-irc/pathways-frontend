import { Id as AnswerId } from '../questionnaire';
import { Id as TaskId } from '../tasks';

export const CURRENT_USER_DATA_VERSION = 'version3';

export interface PersistedUserData {
    readonly version: 'version3';
    readonly chosenAnswers: ReadonlyArray<AnswerId>;
    readonly savedTasks: ReadonlyArray<TaskId>;
    readonly completedTasks: ReadonlyArray<TaskId>;
    readonly newProp: boolean;
    readonly secondNewProp: boolean;
}
