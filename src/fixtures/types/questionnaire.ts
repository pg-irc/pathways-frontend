import { LocalizedText } from '../../locale';
import { TaxonomyTermReference } from './taxonomies';

export type Id = string;

export interface Question {
    readonly id: Id;
    readonly text: LocalizedText;
    readonly explanation?: LocalizedText;
    readonly acceptMultipleAnswers: boolean;
}

export interface QuestionsMap {
    readonly [key: string]: Question;
}

export interface Answer {
    readonly id: Id;
    readonly questionId: Id;
    readonly text: LocalizedText;
    // TODO fix terminology, use chose and isChosen throughout,
    // replacing both selected and active
    readonly isSelected: boolean;
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
}

export interface AnswersMap {
    readonly [key: string]: Answer;
}

export interface Store {
    readonly questions: QuestionsMap;
    readonly answers: AnswersMap;
    readonly activeQuestion: Id;
}
