// tslint:disable:no-expression-statement
// tslint:disable:no-let

import * as helpers from './helpers/questionnaire_helpers';
import { aString, aBoolean } from '../../application/__tests__/helpers/random_test_values';
import { Answer, Question } from '../questionnaire';
import { LocaleBuilder, LocalizedTextBuilder } from './helpers/locale_helpers';
import { LocalizedText } from '../../locale';

describe('questionnaire test helper for', () => {

    let locale = new LocaleBuilder().build();

    describe('building questions', () => {

        let id: string;
        let text: LocalizedText;
        let question: Question;

        beforeEach(() => {
            id = aString();
            text = new LocalizedTextBuilder(locale.code, aString()).build();
            question = new helpers.QuestionBuilder(locale.code).
                withId(id).
                withText(text).
                build();
        });

        it('with given question id', () => {
            expect(question.id).toBe(id);
        });

        it('with given question text', () => {
            expect(question.text).toBe(text);
        });

        it('defaults to three answers', () => {
            const aQuestion = new helpers.QuestionBuilder(locale.code);
            expect(aQuestion.answers).toHaveLength(3);
        });
    });
    describe('building answers', () => {

        describe('with properties', () => {
            let id: string;
            let questionId: string;
            let text: LocalizedText;
            let isSelected: boolean;
            let answer: Answer;

            beforeEach(() => {
                id = aString();
                questionId = aString();
                text = new LocalizedTextBuilder(locale.code, aString()).build();
                isSelected = aBoolean();
                answer = new helpers.AnswerBuilder(locale.code).
                    withId(id).
                    withQuestionId(questionId).
                    withText(text).
                    withSelected(isSelected).
                    build();
            });

            it('answer id', () => {
                expect(answer.id).toBe(id);
            });

            it('can build an answer', () => {
                expect(answer.text).toBe(text);
            });

            it('can build an answer', () => {
                expect(answer.questionId).toBe(questionId);
            });

            it('can build an answer', () => {
                expect(answer.isSelected).toBe(isSelected);
            });
        });
    });

    describe('building the store', () => {

        it('adds questions keyed on their ids', () => {
            const questionId = aString();
            const builder = new helpers.QuestionBuilder(locale.code).
                withId(questionId);

            const store = helpers.buildNormalizedQuestionnaire([builder]);

            expect(store.questions[questionId]).toHaveProperty('id', questionId);
        });

        it('adds answers keyed on their ids', () => {
            const answerId = aString();
            const answerBuilder = new helpers.AnswerBuilder(locale.code).
                withId(answerId);
            const questionBuilder = new helpers.QuestionBuilder(locale.code).
                withAnswers([answerBuilder]);

            const store = helpers.buildNormalizedQuestionnaire([questionBuilder]);

            expect(store.answers[answerId]).toHaveProperty('id', answerId);
        });

        it('sets question id on answers', () => {
            const answerId = aString();
            const answerBuilder = new helpers.AnswerBuilder(locale.code).
                withId(answerId);
            const questionId = aString();
            const questionBuilder = new helpers.QuestionBuilder(locale.code).
                withId(questionId).
                withAnswers([answerBuilder]);

            const store = helpers.buildNormalizedQuestionnaire([questionBuilder]);

            expect(store.answers[answerId].questionId).toBe(questionId);
        });
    });
});
