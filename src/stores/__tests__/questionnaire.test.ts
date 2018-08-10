// tslint:disable:no-expression-statement no-let

import * as store from '../questionnaire';
import * as helpers from './helpers/questionnaire_helpers';
import { CHOOSE_ANSWER } from '../../application/constants';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { toValidOrThrow, LoadingStore, InvalidStore } from '../questionnaire/tagged_stores';

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
    let theStore: store.AnyTaggedStore;
    let newStore: store.AnyTaggedStore;

    it('should return original store if the action is undefined', () => {
        theStore = helpers.buildValidStore([new helpers.QuestionBuilder()]);
        const undefinedAction: store.ChooseAnswerAction = undefined;
        newStore = store.reducer(theStore, undefinedAction);
        expect(newStore).toEqual(theStore);
    });

    it('should allow the active question to be set', () => {
        theStore = helpers.buildValidStore([new helpers.QuestionBuilder()]);
        const activeQuestion = aString();
        newStore = store.reducer(theStore, store.setActiveQuestion(activeQuestion));
        expect(toValidOrThrow(newStore).activeQuestion).toEqual(activeQuestion);
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

            theStore = helpers.buildValidStore([question, secondQuestion]);
        });

        describe('when choosing an non-chosen answer', () => {
            beforeEach(() => {
                const action = store.chooseAnswer(nonChosenAnswer.id);
                newStore = store.reducer(theStore, action);
            });
            it('it makes the answer chosen', () => {
                expect(toValidOrThrow(newStore).answers[nonChosenAnswer.id].isChosen).toBe(true);
            });
            it('makes other answers to the same quenstion non-chosen', () => {
                expect(toValidOrThrow(newStore).answers[chosenAnswer.id].isChosen).toBe(false);
            });
            it('does not change other answers to the same quenstion', () => {
                expect(toValidOrThrow(newStore).answers[secondNonChosenAnswer.id].isChosen).toBe(false);
            });
            it('does not change answers to other questions', () => {
                expect(toValidOrThrow(newStore).answers[nonChosenAnswerToSecondQuestion.id].isChosen).toBe(false);
                expect(toValidOrThrow(newStore).answers[chosenAnswerToSecondQuestion.id].isChosen).toBe(true);
            });
        });

        describe('when choosing an already chosen answer', () => {
            beforeEach(() => {
                const action = store.chooseAnswer(chosenAnswer.id);
                newStore = store.reducer(theStore, action);
            });
            it('it makes the answer non-chosen', () => {
                expect(toValidOrThrow(newStore).answers[chosenAnswer.id].isChosen).toBe(false);
            });
            it('it does not change other answers to the question', () => {
                expect(toValidOrThrow(newStore).answers[nonChosenAnswer.id].isChosen).toBe(false);
            });
            it('does not change answers to other questions', () => {
                expect(toValidOrThrow(newStore).answers[nonChosenAnswerToSecondQuestion.id].isChosen).toBe(false);
                expect(toValidOrThrow(newStore).answers[chosenAnswerToSecondQuestion.id].isChosen).toBe(true);
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

            theStore = helpers.buildValidStore([question, secondQuestion]);
        });

        describe('when choosing a non-chosen answer', () => {
            beforeEach(() => {
                const action = store.chooseAnswer(nonChosenAnswer.id);
                newStore = store.reducer(theStore, action);
            });
            it('makes the answer chosen', () => {
                expect(toValidOrThrow(newStore).answers[nonChosenAnswer.id].isChosen).toBe(true);
            });
            it('does not change other answers to the same questions', () => {
                expect(toValidOrThrow(newStore).answers[chosenAnswer.id].isChosen).toBe(true);
                expect(toValidOrThrow(newStore).answers[secondChosenAnswer.id].isChosen).toBe(true);
                expect(toValidOrThrow(newStore).answers[secondNonChosenAnswer.id].isChosen).toBe(false);
            });
            it('does not change answers to other questions', () => {
                expect(toValidOrThrow(newStore).answers[nonChosenAnswerToSecondQuestion.id].isChosen).toBe(false);
                expect(toValidOrThrow(newStore).answers[chosenAnswerToSecondQuestion.id].isChosen).toBe(true);
            });
        });

        describe('when choosing an already chosen answer', () => {
            beforeEach(() => {
                const action = store.chooseAnswer(chosenAnswer.id);
                newStore = store.reducer(theStore, action);
            });
            it('makes the answer non-chosen', () => {
                expect(toValidOrThrow(newStore).answers[chosenAnswer.id].isChosen).toBe(false);
            });
            it('does not change other answers to the same questions', () => {
                expect(toValidOrThrow(newStore).answers[nonChosenAnswer.id].isChosen).toBe(false);
                expect(toValidOrThrow(newStore).answers[secondChosenAnswer.id].isChosen).toBe(true);
                expect(toValidOrThrow(newStore).answers[secondNonChosenAnswer.id].isChosen).toBe(false);
            });
            it('does not change answers to other questions', () => {
                expect(toValidOrThrow(newStore).answers[nonChosenAnswerToSecondQuestion.id].isChosen).toBe(false);
                expect(toValidOrThrow(newStore).answers[chosenAnswerToSecondQuestion.id].isChosen).toBe(true);
            });
        });
    });

    describe('when loading chosen answers from persistent storage', () => {

        it('should set question with id in request to chosen', () => {
            nonChosenAnswer = new helpers.AnswerBuilder().withIsChosen(false);
            question = new helpers.QuestionBuilder().withAnswers([nonChosenAnswer]);
            theStore = helpers.buildLoadingStore([question]);
            const action = store.LocalStorage.loadSuccess([nonChosenAnswer.id]);

            newStore = store.reducer(theStore, action);

            expect(toValidOrThrow(newStore).answers[nonChosenAnswer.id].isChosen).toBe(true);
        });

        it('should set question with id not in request to not chosen', () => {
            chosenAnswer = new helpers.AnswerBuilder().withIsChosen(true);
            question = new helpers.QuestionBuilder().withAnswers([chosenAnswer]);
            theStore = helpers.buildLoadingStore([question]);
            const action = store.LocalStorage.loadSuccess([]);

            newStore = store.reducer(theStore, action);

            expect(toValidOrThrow(newStore).answers[chosenAnswer.id].isChosen).toBe(false);
        });

        describe('when handling a load request', () => {

            beforeEach(() => {
                const answer = new helpers.AnswerBuilder();
                question = new helpers.QuestionBuilder().withAnswers([answer]);
                theStore = helpers.buildValidStore([question]);
                const action = store.LocalStorage.loadRequest();

                newStore = store.reducer(theStore, action);
            });

            it('should return a store tagged as loading', () => {
                expect(newStore instanceof LoadingStore).toBeTruthy();
            });

            it('should return a store containing the last known valid state', () => {
                if (newStore instanceof LoadingStore) {
                    expect(newStore.lastValidStore).toBe(theStore);
                }
            });
        });

        describe('when handling a load error', () => {

            it('should return a store tagged as invalid', () => {
                chosenAnswer = new helpers.AnswerBuilder().withIsChosen(true);
                question = new helpers.QuestionBuilder().withAnswers([chosenAnswer]);
                theStore = helpers.buildLoadingStore([question]);
                const action = store.LocalStorage.loadFailure('error');

                newStore = store.reducer(theStore, action);

                expect(newStore instanceof InvalidStore).toBeTruthy();
            });

            it('should return store state unchanged from before error', () => {
                chosenAnswer = new helpers.AnswerBuilder().withIsChosen(true);
                question = new helpers.QuestionBuilder().withAnswers([chosenAnswer]);
                theStore = helpers.buildValidStore([question]);
                const action = store.LocalStorage.loadFailure('error');

                newStore = store.reducer(theStore, action);

                expect(newStore).toBe(theStore);
            });
        });
    });
});
