// tslint:disable:no-expression-statement no-let

import { ValidStoreBuilder, AnswerBuilder, QuestionBuilder } from './helpers/questionnaire_helpers';
import { aString, aBoolean } from '../../application/helpers/random_test_values';
import { Answer, Question } from '../questionnaire';
import { toValidOrThrow } from '../questionnaire/stores';

describe('questionnaire test helper for', () => {

    let localeCode = aString();

    describe('building questions', () => {

        let id: string;
        let text: string;
        let question: Question;

        beforeEach(() => {
            id = aString();
            text = aString();
            question = new QuestionBuilder().
                withId(id).
                withLocaleCode(localeCode).
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
            const aQuestion = new QuestionBuilder();
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
            let isChosen: boolean;
            let answer: Answer;

            beforeEach(() => {
                id = aString();
                questionId = aString();
                text = aString();
                taxonomyId = aString();
                taxonomyTermId = aString();
                isChosen = aBoolean();
                answer = new AnswerBuilder().
                    withLocaleCode(localeCode).
                    withId(id).
                    withQuestionId(questionId).
                    withText(text).
                    withIsChosen(isChosen).
                    withTaxonomyTerm({ taxonomyId, taxonomyTermId }).
                    build();
            });

            it('answer id', () => {
                expect(answer.id).toBe(id);
            });

            it('can build an answer with text', () => {
                expect(answer.text).toBe(text);
            });

            it('can build an answer with question id', () => {
                expect(answer.questionId).toBe(questionId);
            });

            it('can build an answer with selected flag', () => {
                expect(answer.isChosen).toBe(isChosen);
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
            const builder = new QuestionBuilder().
                withId(questionId);

            const store = new ValidStoreBuilder().withQuestions([builder]).build();

            expect(toValidOrThrow(store).questions[questionId]).toHaveProperty('id', questionId);
        });

        it('adds answers keyed on their ids', () => {
            const answerId = aString();
            const answerBuilder = new AnswerBuilder().
                withId(answerId);
            const questionBuilder = new QuestionBuilder().
                withAnswers([answerBuilder]);

            const store = new ValidStoreBuilder().withQuestions([questionBuilder]).build();

            expect(toValidOrThrow(store).answers[answerId]).toHaveProperty('id', answerId);
        });

        it('sets question id on answers', () => {
            const answerId = aString();
            const answerBuilder = new AnswerBuilder().
                withId(answerId);
            const questionId = aString();
            const questionBuilder = new QuestionBuilder().
                withId(questionId).
                withAnswers([answerBuilder]);

            const store = new ValidStoreBuilder().withQuestions([questionBuilder]).build();

            expect(toValidOrThrow(store).answers[answerId].questionId).toBe(questionId);
        });
    });
});
