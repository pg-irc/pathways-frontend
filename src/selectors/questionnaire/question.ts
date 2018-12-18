import * as model from '../../stores/questionnaire';
import { Answer } from './answer';

export interface Question {
    readonly id: model.Id;
    readonly text: string;
    readonly explanation?: string;
    readonly answers: ReadonlyArray<Answer>;
    readonly positionInQuestionnaire: number;
    readonly lengthOfQuestionnaire: number;
    readonly nextQuestionId: model.Id;
    readonly previousQuestionId: model.Id;
}
