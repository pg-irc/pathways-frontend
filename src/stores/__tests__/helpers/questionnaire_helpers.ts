// tslint:disable:readonly-keyword
// tslint:disable:no-this
// tslint:disable:no-expression-statement
// tslint:disable:readonly-array
// tslint:disable:no-class
// tslint:disable:no-let

import * as store from '../../questionnaire';
import { aString, aBoolean } from '../../../application/__tests__/helpers/random_test_values';
import { LocalizedText } from '../../../locale';

export const buildNormalizedQuestionnaire = (questions: ReadonlyArray<QuestionBuilder>): store.Store => (
    {
        questions: buildQuestionMap(questions),
        answers: buildAnswerMap(questions),
    }
);

const buildQuestionMap = (questions: ReadonlyArray<QuestionBuilder>): store.QuestionsMap => {
    const buildAndMapToIds = (map: store.QuestionsMap, builder: QuestionBuilder): store.QuestionsMap => {
        return { ...map, [builder.id]: builder.build() };
    };
    return questions.reduce(buildAndMapToIds, {});
};

const buildAnswerMap = (questions: ReadonlyArray<QuestionBuilder>): store.AnswersMap => {
    let result: WritableAnswersMap = {};
    questions.forEach((questionBuilder: QuestionBuilder) => {
        const answers = questionBuilder.answers;
        answers.forEach((answerBuilder: AnswerBuilder) => {
            result[answerBuilder.id] = answerBuilder.withQuestionId(questionBuilder.id).build();
        });
    });
    return result;
};

interface WritableAnswersMap {
    [key: string]: store.Answer;
}

export class QuestionBuilder {
    defaultLocaleCode: string;
    id: string = aString();
    text: LocalizedText;
    acceptMultipleAnswers: boolean = true;
    answers: Array<AnswerBuilder> = Array<AnswerBuilder>(3);

    constructor(defaultLocaleCode: string) {
        this.defaultLocaleCode = defaultLocaleCode;
        this.text = { [this.defaultLocaleCode]: aString() };
    }

    withId(id: string): QuestionBuilder {
        this.id = id;
        return this;
    }

    withText(text: LocalizedText): QuestionBuilder {
        this.text = text;
        return this;
    }

    withAnswers(answers: Array<AnswerBuilder>): QuestionBuilder {
        this.answers = answers;
        return this;
    }

    withAcceptsMultipleAnswers(acceptMultipleAnswers: boolean): QuestionBuilder {
        this.acceptMultipleAnswers = acceptMultipleAnswers;
        return this;
    }

    build(): store.Question {
        return {
            id: this.id,
            text: this.text,
            acceptMultipleAnswers: this.acceptMultipleAnswers,
        };
    }
}

export class AnswerBuilder {
    defaultLocaleCode: string;
    id: string = aString();
    questionId: string = aString();
    text: LocalizedText;
    isSelected: boolean = aBoolean();

    constructor(defaultLocaleCode: string) {
        this.defaultLocaleCode = defaultLocaleCode;
        this.text = { [this.defaultLocaleCode]: aString() };
    }

    withId(id: string): AnswerBuilder {
        this.id = id;
        return this;
    }

    withQuestionId(questionId: string): AnswerBuilder {
        this.questionId = questionId;
        return this;
    }

    withText(text: LocalizedText): AnswerBuilder {
        this.text = text;
        return this;
    }

    withSelected(isSelected: boolean): AnswerBuilder {
        this.isSelected = isSelected;
        return this;
    }

    build(): store.Answer {
        return {
            id: this.id,
            questionId: this.questionId,
            text: this.text,
            isSelected: this.isSelected,
        };
    }
}
