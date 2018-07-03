// tslint:disable:no-expression-statement no-let

import * as helpers from './helpers/questionnaire_helpers';
import { aString, aBoolean } from '../../application/__tests__/helpers/random_test_values';
import { Answer, Question } from '../questionnaire';

describe('questionnaire test helper for', () => {

    let localeCode = aString();

    describe('building questions', () => {

        let id: string;
        let text: string;
        let question: Question;

        beforeEach(() => {
            id = aString();
            text = aString();
            question = new helpers.QuestionBuilder().
                withId(id).
                withLocaleCode(localeCode).
                withText(text).
                build();
        });

        it('with given question id', () => {
            expect(question.id).toBe(id);
        });

        it('with given question text', () => {
            expect(question.text[localeCode]).toBe(text);
        });

        it('defaults to three answers', () => {
            const aQuestion = new helpers.QuestionBuilder();
            expect(aQuestion.answers).toHaveLength(3);
        });
    });
    describe('building answers', () => {

        describe('with properties', () => {
            let id: string;
            let questionId: string;
            let text: string;
            let taxonomyId: string;
            let taxonomyTermId: string;
            let isSelected: boolean;
            let answer: Answer;

            beforeEach(() => {
                id = aString();
                questionId = aString();
                text = aString();
                taxonomyId = aString();
                taxonomyTermId = aString();
                isSelected = aBoolean();
                answer = new helpers.AnswerBuilder().
                    withLocaleCode(localeCode).
                    withId(id).
                    withQuestionId(questionId).
                    withText(text).
                    withSelected(isSelected).
                    withTaxonomyTerm({ taxonomyId, taxonomyTermId }).
                    build();
            });

            it('answer id', () => {
                expect(answer.id).toBe(id);
            });

            it('can build an answer with text', () => {
                expect(answer.text[localeCode]).toBe(text);
            });

            it('can build an answer with question id', () => {
                expect(answer.questionId).toBe(questionId);
            });

            it('can build an answer with selected flag', () => {
                expect(answer.isSelected).toBe(isSelected);
            });

            it('can build an answer with taxonomy id', () => {
                expect(answer.taxonomyTerms[0].taxonomyId).toBe(taxonomyId);
            });

            it('can build an answer with taxonomy term id', () => {
                expect(answer.taxonomyTerms[0].taxonomyTermId).toBe(taxonomyTermId);
            });
        });
    });

    describe('building the store', () => {

        it('adds questions keyed on their ids', () => {
            const questionId = aString();
            const builder = new helpers.QuestionBuilder().
                withId(questionId);

            const store = helpers.buildNormalizedQuestionnaire([builder]);

            expect(store.questions[questionId]).toHaveProperty('id', questionId);
        });

        it('adds answers keyed on their ids', () => {
            const answerId = aString();
            const answerBuilder = new helpers.AnswerBuilder().
                withId(answerId);
            const questionBuilder = new helpers.QuestionBuilder().
                withAnswers([answerBuilder]);

            const store = helpers.buildNormalizedQuestionnaire([questionBuilder]);

            expect(store.answers[answerId]).toHaveProperty('id', answerId);
        });

        it('sets question id on answers', () => {
            const answerId = aString();
            const answerBuilder = new helpers.AnswerBuilder().
                withId(answerId);
            const questionId = aString();
            const questionBuilder = new helpers.QuestionBuilder().
                withId(questionId).
                withAnswers([answerBuilder]);

            const store = helpers.buildNormalizedQuestionnaire([questionBuilder]);

            expect(store.answers[answerId].questionId).toBe(questionId);
        });
    });
});
