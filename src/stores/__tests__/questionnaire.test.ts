// tslint:disable:no-expression-statement no-let

import * as store from '../questionnaire';
import * as helpers from './helpers/questionnaire_helpers';
import { CHOOSE_ANSWER } from '../../application/constants';
import { aString } from '../../application/__tests__/helpers/random_test_values';

describe('choose answer action creator', () => {
    it('should create action with type CHOOSE_ANSWER', () => {
        const theAction = store.chooseAnswer(aString());
        expect(theAction.type).toBe(CHOOSE_ANSWER);
    });

    it('should create action with page id as passed to the action creator', () => {
        const theAnswerId = aString();
        const theAction = store.chooseAnswer(theAnswerId);
        expect(theAction.payload.answerId).toBe(theAnswerId);
    });
});

describe('questionnaire reducer', () => {

    let chosenAnswer: helpers.AnswerBuilder;
    let nonChosenAnswer: helpers.AnswerBuilder;
    let secondChosenAnswer: helpers.AnswerBuilder;
    let secondNonChosenAnswer: helpers.AnswerBuilder;
    let chosenAnswerToSecondQuestion: helpers.AnswerBuilder;
    let nonChosenAnswerToSecondQuestion: helpers.AnswerBuilder;
    let question, secondQuestion: helpers.QuestionBuilder;
    let theStore: store.Store;
    let newStore: store.Store;

    it('should return original store if the action is undefined', () => {
        theStore = helpers.buildNormalizedQuestionnaire([new helpers.QuestionBuilder()]);
        const undefinedAction: store.ChooseAnswerAction = undefined;
        newStore = store.reducer(theStore, undefinedAction);
        expect(newStore).toEqual(theStore);
    });

    it('should allow the active question to be set', () => {
        theStore = helpers.buildNormalizedQuestionnaire([new helpers.QuestionBuilder()]);
        const activeQuestion = aString();
        newStore = store.reducer(theStore, store.setActiveQuestion(activeQuestion));
        expect(newStore.activeQuestion).toEqual(activeQuestion);
    });

    describe('for questions accepting at most one answer', () => {

        beforeEach(() => {
            chosenAnswer = new helpers.AnswerBuilder().withIsChosen(true);
            nonChosenAnswer = new helpers.AnswerBuilder().withIsChosen(false);
            secondNonChosenAnswer = new helpers.AnswerBuilder().withIsChosen(false);

            question = new helpers.QuestionBuilder().
                withAnswers([chosenAnswer, nonChosenAnswer, secondNonChosenAnswer]).
                withAcceptsMultipleAnswers(false);

            chosenAnswerToSecondQuestion = new helpers.AnswerBuilder().withIsChosen(true);
            nonChosenAnswerToSecondQuestion = new helpers.AnswerBuilder().withIsChosen(false);
            secondQuestion = new helpers.QuestionBuilder().
                withAnswers([chosenAnswerToSecondQuestion, nonChosenAnswerToSecondQuestion]).
                withAcceptsMultipleAnswers(false);

            theStore = helpers.buildNormalizedQuestionnaire([question, secondQuestion]);
        });

        describe('when choosing an non-chosen answer', () => {
            beforeEach(() => {
                const action = store.chooseAnswer(nonChosenAnswer.id);
                newStore = store.reducer(theStore, action);
            });
            it('it makes the answer chosen', () => {
                expect(newStore.answers[nonChosenAnswer.id].isChosen).toBe(true);
            });
            it('makes other answers to the same quenstion non-chosen', () => {
                expect(newStore.answers[chosenAnswer.id].isChosen).toBe(false);
            });
            it('does not change other answers to the same quenstion', () => {
                expect(newStore.answers[secondNonChosenAnswer.id].isChosen).toBe(false);
            });
            it('does not change answers to other questions', () => {
                expect(newStore.answers[nonChosenAnswerToSecondQuestion.id].isChosen).toBe(false);
                expect(newStore.answers[chosenAnswerToSecondQuestion.id].isChosen).toBe(true);
            });
        });

        describe('when choosing an already chosen answer', () => {
            beforeEach(() => {
                const action = store.chooseAnswer(chosenAnswer.id);
                newStore = store.reducer(theStore, action);
            });
            it('it makes the answer non-chosen', () => {
                expect(newStore.answers[chosenAnswer.id].isChosen).toBe(false);
            });
            it('it does not change other answers to the question', () => {
                expect(newStore.answers[nonChosenAnswer.id].isChosen).toBe(false);
            });
            it('does not change answers to other questions', () => {
                expect(newStore.answers[nonChosenAnswerToSecondQuestion.id].isChosen).toBe(false);
                expect(newStore.answers[chosenAnswerToSecondQuestion.id].isChosen).toBe(true);
            });
        });
    });

    describe('for questions accepting more than one answer', () => {
        beforeEach(() => {
            chosenAnswer = new helpers.AnswerBuilder().withIsChosen(true);
            nonChosenAnswer = new helpers.AnswerBuilder().withIsChosen(false);
            secondChosenAnswer = new helpers.AnswerBuilder().withIsChosen(true);
            secondNonChosenAnswer = new helpers.AnswerBuilder().withIsChosen(false);

            question = new helpers.QuestionBuilder().
                withAnswers([chosenAnswer, nonChosenAnswer, secondChosenAnswer, secondNonChosenAnswer]).
                withAcceptsMultipleAnswers(true);

            chosenAnswerToSecondQuestion = new helpers.AnswerBuilder().withIsChosen(true);
            nonChosenAnswerToSecondQuestion = new helpers.AnswerBuilder().withIsChosen(false);
            secondQuestion = new helpers.QuestionBuilder().
                withAnswers([chosenAnswerToSecondQuestion, nonChosenAnswerToSecondQuestion]).
                withAcceptsMultipleAnswers(true);

            theStore = helpers.buildNormalizedQuestionnaire([question, secondQuestion]);
        });

        describe('when choosing a non-chosen answer', () => {
            beforeEach(() => {
                const action = store.chooseAnswer(nonChosenAnswer.id);
                newStore = store.reducer(theStore, action);
            });
            it('makes the answer chosen', () => {
                expect(newStore.answers[nonChosenAnswer.id].isChosen).toBe(true);
            });
            it('does not change other answers to the same questions', () => {
                expect(newStore.answers[chosenAnswer.id].isChosen).toBe(true);
                expect(newStore.answers[secondChosenAnswer.id].isChosen).toBe(true);
                expect(newStore.answers[secondNonChosenAnswer.id].isChosen).toBe(false);
            });
            it('does not change answers to other questions', () => {
                expect(newStore.answers[nonChosenAnswerToSecondQuestion.id].isChosen).toBe(false);
                expect(newStore.answers[chosenAnswerToSecondQuestion.id].isChosen).toBe(true);
            });
        });

        describe('when choosing an already chosen answer', () => {
            beforeEach(() => {
                const action = store.chooseAnswer(chosenAnswer.id);
                newStore = store.reducer(theStore, action);
            });
            it('makes the answer non-chosen', () => {
                expect(newStore.answers[chosenAnswer.id].isChosen).toBe(false);
            });
            it('does not change other answers to the same questions', () => {
                expect(newStore.answers[nonChosenAnswer.id].isChosen).toBe(false);
                expect(newStore.answers[secondChosenAnswer.id].isChosen).toBe(true);
                expect(newStore.answers[secondNonChosenAnswer.id].isChosen).toBe(false);
            });
            it('does not change answers to other questions', () => {
                expect(newStore.answers[nonChosenAnswerToSecondQuestion.id].isChosen).toBe(false);
                expect(newStore.answers[chosenAnswerToSecondQuestion.id].isChosen).toBe(true);
            });
        });
    });

    describe('when loading chosen answers from persistent storage', () => {

        it('should set question with id in request to chosen', () => {
            nonChosenAnswer = new helpers.AnswerBuilder().withIsChosen(false);
            question = new helpers.QuestionBuilder().withAnswers([nonChosenAnswer]);
            theStore = helpers.buildNormalizedQuestionnaire([question]);
            const action = store.Persistence.loadSuccess([nonChosenAnswer.id]);

            newStore = store.reducer(theStore, action);

            expect(newStore.answers[nonChosenAnswer.id].isChosen).toBe(true);
        });

        it('should set question with id not in request to not chosen', () => {
            chosenAnswer = new helpers.AnswerBuilder().withIsChosen(true);
            question = new helpers.QuestionBuilder().withAnswers([chosenAnswer]);
            theStore = helpers.buildNormalizedQuestionnaire([question]);
            const action = store.Persistence.loadSuccess([]);

            newStore = store.reducer(theStore, action);

            expect(newStore.answers[chosenAnswer.id].isChosen).toBe(false);
        });
    });
});
