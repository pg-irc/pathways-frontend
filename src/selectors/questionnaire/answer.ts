import * as model from '../../stores/questionnaire';

export interface Answer {
    readonly id: model.Id;
    readonly text: string;
    readonly isChosen: boolean;
    readonly acceptMultipleAnswers: boolean;
}
