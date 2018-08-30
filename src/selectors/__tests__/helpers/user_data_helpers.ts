// tslint:disable:no-class readonly-keyword readonly-array no-expression-statement no-this

import { Id } from '../../../stores/questionnaire/index';
import { PersistedUserData } from '../../user_data/persisted_user_data';

export class PersistedUserDataBuilder {
    chosenAnswers: string[] = [];

    addChosenAnswer(id: Id): PersistedUserDataBuilder {
        this.chosenAnswers.push(id);
        return this;
    }

    buildObject(): PersistedUserData {
        return {
            chosenAnswers: this.chosenAnswers,
        };
    }

    buildJson(): string {
        return JSON.stringify(this.buildObject());
    }
}
