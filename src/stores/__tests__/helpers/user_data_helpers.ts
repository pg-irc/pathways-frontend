// tslint:disable:no-class readonly-keyword readonly-array no-expression-statement no-this
import { Id as AnswerId } from '../../questionnaire';
import { Id as TaskId } from '../../topics';
import { PersistedUserData } from '../../user_data';

export class PersistedUserDataBuilder {
    chosenAnswers: AnswerId[] = [];
    savedTasks: TaskId[] = [];
    completedTasks: TaskId[] = [];
    showOnboarding: boolean = true;

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

    addShowOnboarding(showOnboarding: boolean): PersistedUserDataBuilder {
        this.showOnboarding = showOnboarding;
        return this;
    }

    buildObject(): PersistedUserData {
        return {
            chosenAnswers: this.chosenAnswers,
            savedTasks: this.savedTasks,
            completedTasks: this.completedTasks,
            showOnboarding: this.showOnboarding,
        };
    }

    buildJson(): string {
        return JSON.stringify(this.buildObject());
    }
}
