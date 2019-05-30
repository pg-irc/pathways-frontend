import { LocalizedText } from '../../locale';
import { TaxonomyTermReference } from './taxonomies';

export type Id = string;

export interface Question {
    readonly id: Id;
    readonly text: string;
    readonly explanation?: LocalizedText;
    readonly acceptMultipleAnswers: boolean;
}

export interface QuestionsMap {
    readonly [key: string]: Question;
}

export interface Answer {
    readonly id: Id;
    readonly questionId: Id;
    readonly text: string;
    readonly isChosen: boolean;
    readonly isInverted: boolean;
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
}

export interface AnswersMap {
    readonly [key: string]: Answer;
}

export interface IStore {
    readonly questions: QuestionsMap;
    readonly answers: AnswersMap;
    readonly oldAnswers: AnswersMap;
    readonly activeQuestion: Id;
}

// tslint:disable:no-class no-this no-expression-statement

export class ValidQuestionnaireStore {
    constructor(parameters: IStore) {
        this.questions = parameters.questions;
        this.answers = parameters.answers;
        this.oldAnswers = parameters.oldAnswers;
        this.activeQuestion = parameters.activeQuestion;
    }
    readonly questions: QuestionsMap;
    readonly answers: AnswersMap;
    readonly oldAnswers: AnswersMap;
    readonly activeQuestion: Id;
}
