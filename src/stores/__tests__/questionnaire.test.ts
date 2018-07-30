// tslint:disable:no-expression-statement no-let

import * as store from '../questionnaire';
import * as helpers from './helpers/questionnaire_helpers';
import { SELECT_ANSWER } from '../../application/constants';
import { aString, aNumber } from '../../application/__tests__/helpers/random_test_values';

describe('select answer action creator', () => {
    it('should create action with type SELECT_ANSWER', () => {
        const theAction = store.selectAnswer(aString());
        expect(theAction.type).toBe(SELECT_ANSWER);
    });

    it('should create action with page id as passed to the action creator', () => {
        const theAnswerId = aString();
        const theAction = store.selectAnswer(theAnswerId);
        expect(theAction.payload.answerId).toBe(theAnswerId);
    });
});

describe('questionnaire reducer', () => {

    let selectedAnswer: helpers.AnswerBuilder;
    let unselectedAnswer: helpers.AnswerBuilder;
    let secondSelectedAnswer: helpers.AnswerBuilder;
    let secondUnselectedAnswer: helpers.AnswerBuilder;
    let selectedAnswerToSecondQuestion: helpers.AnswerBuilder;
    let unselectedAnswerToSecondQuestion: helpers.AnswerBuilder;
    let question, secondQuestion: helpers.QuestionBuilder;
    let theStore: store.Store;
    let newStore: store.Store;

    it('should return original store if the action is undefined', () => {
        theStore = helpers.buildNormalizedQuestionnaire([new helpers.QuestionBuilder()]);
        const undefinedAction: store.SelectAnswerAction = undefined;
        newStore = store.reducer(theStore, undefinedAction);
        expect(newStore).toEqual(theStore);
    });

    it('should allow the active question to be set', () => {
        theStore = helpers.buildNormalizedQuestionnaire([new helpers.QuestionBuilder()]);
        const activeQuestionNumber = aNumber();
        newStore = store.reducer(theStore, store.setActiveQuestion(activeQuestionNumber));
        expect(newStore.activeQuestion).toEqual(activeQuestionNumber);
    });

    describe('for questions accepting at most one answer', () => {

        beforeEach(() => {
            selectedAnswer = new helpers.AnswerBuilder().withSelected(true);
            unselectedAnswer = new helpers.AnswerBuilder().withSelected(false);
            secondUnselectedAnswer = new helpers.AnswerBuilder().withSelected(false);

            question = new helpers.QuestionBuilder().
                withAnswers([selectedAnswer, unselectedAnswer, secondUnselectedAnswer]).
                withAcceptsMultipleAnswers(false);

            selectedAnswerToSecondQuestion = new helpers.AnswerBuilder().withSelected(true);
            unselectedAnswerToSecondQuestion = new helpers.AnswerBuilder().withSelected(false);
            secondQuestion = new helpers.QuestionBuilder().
                withAnswers([selectedAnswerToSecondQuestion, unselectedAnswerToSecondQuestion]).
                withAcceptsMultipleAnswers(false);

            theStore = helpers.buildNormalizedQuestionnaire([question, secondQuestion]);
        });

        describe('when selecting an unselected answer', () => {
            beforeEach(() => {
                const action = store.selectAnswer(unselectedAnswer.id);
                newStore = store.reducer(theStore, action);
            });
            it('it makes the answer selected', () => {
                expect(newStore.answers[unselectedAnswer.id].isSelected).toBe(true);
            });
            it('makes other answers to the same quenstion unselected', () => {
                expect(newStore.answers[selectedAnswer.id].isSelected).toBe(false);
            });
            it('does not change other answers to the same quenstion', () => {
                expect(newStore.answers[secondUnselectedAnswer.id].isSelected).toBe(false);
            });
            it('does not change answers to other questions', () => {
                expect(newStore.answers[unselectedAnswerToSecondQuestion.id].isSelected).toBe(false);
                expect(newStore.answers[selectedAnswerToSecondQuestion.id].isSelected).toBe(true);
            });
        });

        describe('when selecting an already selected answer', () => {
            beforeEach(() => {
                const action = store.selectAnswer(selectedAnswer.id);
                newStore = store.reducer(theStore, action);
            });
            it('it makes the answer unselected', () => {
                expect(newStore.answers[selectedAnswer.id].isSelected).toBe(false);
            });
            it('it does not change other answers to the question', () => {
                expect(newStore.answers[unselectedAnswer.id].isSelected).toBe(false);
            });
            it('does not change answers to other questions', () => {
                expect(newStore.answers[unselectedAnswerToSecondQuestion.id].isSelected).toBe(false);
                expect(newStore.answers[selectedAnswerToSecondQuestion.id].isSelected).toBe(true);
            });
        });
    });

    describe('for questions accepting more than one answer', () => {
        beforeEach(() => {
            selectedAnswer = new helpers.AnswerBuilder().withSelected(true);
            unselectedAnswer = new helpers.AnswerBuilder().withSelected(false);
            secondSelectedAnswer = new helpers.AnswerBuilder().withSelected(true);
            secondUnselectedAnswer = new helpers.AnswerBuilder().withSelected(false);

            question = new helpers.QuestionBuilder().
                withAnswers([selectedAnswer, unselectedAnswer, secondSelectedAnswer, secondUnselectedAnswer]).
                withAcceptsMultipleAnswers(true);

            selectedAnswerToSecondQuestion = new helpers.AnswerBuilder().withSelected(true);
            unselectedAnswerToSecondQuestion = new helpers.AnswerBuilder().withSelected(false);
            secondQuestion = new helpers.QuestionBuilder().
                withAnswers([selectedAnswerToSecondQuestion, unselectedAnswerToSecondQuestion]).
                withAcceptsMultipleAnswers(true);

            theStore = helpers.buildNormalizedQuestionnaire([question, secondQuestion]);
        });

        describe('when selecting an unselected answer', () => {
            beforeEach(() => {
                const action = store.selectAnswer(unselectedAnswer.id);
                newStore = store.reducer(theStore, action);
            });
            it('makes the answer selected', () => {
                expect(newStore.answers[unselectedAnswer.id].isSelected).toBe(true);
            });
            it('does not change other answers to the same questions', () => {
                expect(newStore.answers[selectedAnswer.id].isSelected).toBe(true);
                expect(newStore.answers[secondSelectedAnswer.id].isSelected).toBe(true);
                expect(newStore.answers[secondUnselectedAnswer.id].isSelected).toBe(false);
            });
            it('does not change answers to other questions', () => {
                expect(newStore.answers[unselectedAnswerToSecondQuestion.id].isSelected).toBe(false);
                expect(newStore.answers[selectedAnswerToSecondQuestion.id].isSelected).toBe(true);
            });
        });

        describe('when selecting an already selected answer', () => {
            beforeEach(() => {
                const action = store.selectAnswer(selectedAnswer.id);
                newStore = store.reducer(theStore, action);
            });
            it('makes the answer unselected', () => {
                expect(newStore.answers[selectedAnswer.id].isSelected).toBe(false);
            });
            it('does not change other answers to the same questions', () => {
                expect(newStore.answers[unselectedAnswer.id].isSelected).toBe(false);
                expect(newStore.answers[secondSelectedAnswer.id].isSelected).toBe(true);
                expect(newStore.answers[secondUnselectedAnswer.id].isSelected).toBe(false);
            });
            it('does not change answers to other questions', () => {
                expect(newStore.answers[unselectedAnswerToSecondQuestion.id].isSelected).toBe(false);
                expect(newStore.answers[selectedAnswerToSecondQuestion.id].isSelected).toBe(true);
            });
        });
    });
});
