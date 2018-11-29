// tslint:disable:no-class readonly-keyword readonly-array no-expression-statement no-this
import { Id as AnswerId } from '../../questionnaire';
import { Id as TaskId } from '../../tasks';
import { PersistedUserData } from '../../user_data';
import { CURRENT_USER_DATA_VERSION } from '../../user_data';

export class PersistedUserDataBuilder {
    chosenAnswers: AnswerId[] = [];
    savedTasks: TaskId[] = [];
    completedTasks: TaskId[] = [];

    addChosenAnswer(id: AnswerId): PersistedUserDataBuilder {
        this.chosenAnswers.push(id);
        return this;
    }

    addSavedTask(id: TaskId): PersistedUserDataBuilder {
        this.savedTasks.push(id);
        return this;
    }

    addCompletedTask(id: TaskId): PersistedUserDataBuilder {
        this.completedTasks.push(id);
        return this;
    }

    buildObject(): PersistedUserData {
        return {
            version: CURRENT_USER_DATA_VERSION,
            chosenAnswers: this.chosenAnswers,
            savedTasks: this.savedTasks,
            completedTasks: this.completedTasks,
            newProp: false,
            secondNewProp: false,
        };
    }

    buildJson(): string {
        return JSON.stringify(this.buildObject());
    }
}
