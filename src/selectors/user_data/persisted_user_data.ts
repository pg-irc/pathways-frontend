import { Id as QuestionId } from '../../stores/questionnaire';
import { Id as TaskId } from '../../stores/tasks';

export interface PersistedUserData {
    readonly chosenAnswers: ReadonlyArray<QuestionId>;
    readonly savedTasks: ReadonlyArray<TaskId>;
}
