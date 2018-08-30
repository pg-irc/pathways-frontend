import { Id } from '../../stores/questionnaire';

export interface PersistedUserData {
    readonly chosenAnswers: ReadonlyArray<Id>;
}
