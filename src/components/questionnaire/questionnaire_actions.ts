import * as model from '../../stores/questionnaire';

export interface QuestionnaireActions {
    readonly selectAnswer: (answerId: model.Id) => model.SelectAnswerAction;
}
