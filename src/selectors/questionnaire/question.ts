import * as model from '../../stores/questionnaire';
import { Answer } from './answer';

export interface Question {
    readonly id: model.Id;
    readonly number: number;
    readonly text: string;
    readonly explanation?: string;
    readonly answers: ReadonlyArray<Answer>;
}
