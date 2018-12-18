// tslint:disable:class-name
import { Id as AnswerId } from '../../questionnaire';
import { Id as TaskId } from '../../tasks';
import { PersistedUserData } from '../types';

export interface PersistedUserData_v0_1 {
    readonly version: 'version 0.1';
    readonly chosenAnswers: ReadonlyArray<AnswerId>;
}

export interface PersistedUserData_v0_2 {
    readonly version: 'version 0.2';
    readonly chosenAnswers: ReadonlyArray<AnswerId>;
    readonly savedTasks: ReadonlyArray<TaskId>;
}

export const migrateFrom_v0_1 = (data: PersistedUserData_v0_1): PersistedUserData_v0_2 => (
    {
        ...data,
        savedTasks: [],
        version: 'version 0.2',
    }
);

export const migrateFrom_v0_2 = (data: PersistedUserData_v0_2): PersistedUserData => (
    {
        ...data,
        completedTasks: [],
        version: 'version 1.0',
    }
);
