import { Id as AnswerId } from '../../questionnaire';
import { Id as TaskId } from '../../tasks';
import { PersistedUserData } from '../types';

export interface PersistedUserDataVersion1 {
    readonly version: 'version 0.1';
    readonly chosenAnswers: ReadonlyArray<AnswerId>;
}

export interface PersistedUserDataVersion2 {
    readonly version: 'version 0.2';
    readonly chosenAnswers: ReadonlyArray<AnswerId>;
    readonly savedTasks: ReadonlyArray<TaskId>;
}

export const migrateFromVersion_0_1 = (data: PersistedUserDataVersion1): PersistedUserDataVersion2 => (
    {
        ...data,
        savedTasks: [],
        version: 'version 0.2',
    }
);

export const migrateFromVersion_0_2 = (data: PersistedUserDataVersion2): PersistedUserData => (
    {
        ...data,
        completedTasks: [],
        version: 'version 1.0',
    }
);
