import { Id as AnswerId } from '../../questionnaire';
import { Id as TaskId } from '../../tasks';
import { PersistedUserData } from '../types';

export interface PersistedUserDataVersion1 {
    readonly version: 'version1';
    readonly chosenAnswers: ReadonlyArray<AnswerId>;
    readonly savedTasks: ReadonlyArray<TaskId>;
    readonly completedTasks: ReadonlyArray<TaskId>;
}

export interface PersistedUserDataVersion2 {
    readonly version: 'version2';
    readonly chosenAnswers: ReadonlyArray<AnswerId>;
    readonly savedTasks: ReadonlyArray<TaskId>;
    readonly completedTasks: ReadonlyArray<TaskId>;
    readonly newProp: boolean;
}

export const migrateFromVersion1 = (data: PersistedUserDataVersion1): PersistedUserDataVersion2 => (
    {
        ...data,
        version: 'version2',
        newProp: false,
    }
);

export const migrateFromVersion2 = (data: PersistedUserDataVersion2): PersistedUserData => (
    {
        ...data,
        version: 'version3',
        secondNewProp: false,
    }
);
