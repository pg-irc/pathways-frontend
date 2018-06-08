// tslint:disable:readonly-keyword
// tslint:disable:no-this
// tslint:disable:no-expression-statement
// tslint:disable:readonly-array
// tslint:disable:no-class
// tslint:disable:no-let

import * as store from '../../questionnaire';
import { aString, aBoolean } from '../../../application/__tests__/helpers/random_test_values';
import { LocalizedText } from '../../../locale';
import { LocalizedTextBuilder } from './locale_helpers';

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
    localeCode: string = aString();
    id: string = aString();
    text: string = aString();
    acceptMultipleAnswers: boolean = true;
    answers: Array<AnswerBuilder> = Array<AnswerBuilder>(3);

    withLocaleCode(localeCode: string): QuestionBuilder {
        this.localeCode = localeCode;
        return this;
    }

    withId(id: string): QuestionBuilder {
        this.id = id;
        return this;
    }

    withText(text: string): QuestionBuilder {
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
            text: this.createLocalizedText(this.text),
            acceptMultipleAnswers: this.acceptMultipleAnswers,
        };
    }

    private createLocalizedText(text: string): LocalizedText {
        return new LocalizedTextBuilder(this.localeCode, text).build();
    }
}

export class AnswerBuilder {
    localeCode: string = aString();
    id: string = aString();
    questionId: string = aString();
    text: string = aString();
    isSelected: boolean = aBoolean();

    withLocaleCode(localeCode: string): AnswerBuilder {
        this.localeCode = localeCode;
        return this;
    }

    withId(id: string): AnswerBuilder {
        this.id = id;
        return this;
    }

    withQuestionId(questionId: string): AnswerBuilder {
        this.questionId = questionId;
        return this;
    }

    withText(text: string): AnswerBuilder {
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
            text: this.createLocalizedText(this.text),
            isSelected: this.isSelected,
        };
    }

    private createLocalizedText(text: string): LocalizedText {
        return new LocalizedTextBuilder(this.localeCode, text).build();
    }
}
