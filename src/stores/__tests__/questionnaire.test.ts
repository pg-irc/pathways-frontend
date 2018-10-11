// tslint:disable:no-expression-statement no-let

import * as store from '../questionnaire';
import { ValidStoreBuilder, QuestionBuilder, AnswerBuilder, buildLoadingStore } from './helpers/questionnaire_helpers';
import { CHOOSE_ANSWER } from '../../application/constants';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { toValidOrThrow, LoadingQuestionnaireStore, InvalidQuestionnaireStore } from '../questionnaire/stores';
import { PersistedUserDataBuilder } from './helpers/user_data_helpers';
import { UserDataPersistence } from '../user_data';
import { routeChanged, RouteChangedAction } from '../router_actions';
import { QuestionnaireRouteState } from '../../fixtures/types/questionnaire';
import { dismissNewlyAddedTasksPopup } from '../questionnaire/actions';
import { saveTheseTasksToMyPlan } from '../tasks/actions';

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

    let chosenAnswer: AnswerBuilder;
    let nonChosenAnswer: AnswerBuilder;
    let secondChosenAnswer: AnswerBuilder;
    let secondNonChosenAnswer: AnswerBuilder;
    let chosenAnswerToSecondQuestion: AnswerBuilder;
    let nonChosenAnswerToSecondQuestion: AnswerBuilder;
    let question, secondQuestion: QuestionBuilder;
    let theStore: store.QuestionnaireStore;
    let newStore: store.QuestionnaireStore;

    it('should return original store if the action is undefined', () => {
        theStore = new ValidStoreBuilder().withQuestions([new QuestionBuilder()]).build();
        const undefinedAction: store.ChooseAnswerAction = undefined;
        newStore = store.reducer(theStore, undefinedAction);
        expect(newStore).toEqual(theStore);
    });

    it('should allow the active question to be set', () => {
        theStore = new ValidStoreBuilder().withQuestions([new QuestionBuilder()]).build();
        const activeQuestion = aString();
        newStore = store.reducer(theStore, store.setActiveQuestion(activeQuestion));
        expect(toValidOrThrow(newStore).activeQuestion).toEqual(activeQuestion);
    });

    describe('for questions accepting at most one answer', () => {

        beforeEach(() => {
            chosenAnswer = new AnswerBuilder().withIsChosen(true);
            nonChosenAnswer = new AnswerBuilder().withIsChosen(false);
            secondNonChosenAnswer = new AnswerBuilder().withIsChosen(false);

            question = new QuestionBuilder().
                withAnswers([chosenAnswer, nonChosenAnswer, secondNonChosenAnswer]).
                withAcceptsMultipleAnswers(false);

            chosenAnswerToSecondQuestion = new AnswerBuilder().withIsChosen(true);
            nonChosenAnswerToSecondQuestion = new AnswerBuilder().withIsChosen(false);
            secondQuestion = new QuestionBuilder().
                withAnswers([chosenAnswerToSecondQuestion, nonChosenAnswerToSecondQuestion]).
                withAcceptsMultipleAnswers(false);

            theStore = new ValidStoreBuilder().withQuestions([question, secondQuestion]).build();
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
            chosenAnswer = new AnswerBuilder().withIsChosen(true);
            nonChosenAnswer = new AnswerBuilder().withIsChosen(false);
            secondChosenAnswer = new AnswerBuilder().withIsChosen(true);
            secondNonChosenAnswer = new AnswerBuilder().withIsChosen(false);

            question = new QuestionBuilder().
                withAnswers([chosenAnswer, nonChosenAnswer, secondChosenAnswer, secondNonChosenAnswer]).
                withAcceptsMultipleAnswers(true);

            chosenAnswerToSecondQuestion = new AnswerBuilder().withIsChosen(true);
            nonChosenAnswerToSecondQuestion = new AnswerBuilder().withIsChosen(false);
            secondQuestion = new QuestionBuilder().
                withAnswers([chosenAnswerToSecondQuestion, nonChosenAnswerToSecondQuestion]).
                withAcceptsMultipleAnswers(true);

            theStore = new ValidStoreBuilder().withQuestions([question, secondQuestion]).build();
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

    const makeRouteAction = (pathname: string): RouteChangedAction => (
        routeChanged({ pathname, search: '', state: '', hash: '' })
    );

    describe('when routing', () => {
        const enterQuestionnaire = makeRouteAction('/questionnaire');
        const leaveQuestionnaire = makeRouteAction('/home');

        describe('from non-questionnaire route', () => {
            const storeOutsideQuestionnaire = new ValidStoreBuilder().
                withState(QuestionnaireRouteState.NotInQuestionnairePage).
                withOldAnswers({ 'id': new AnswerBuilder().withId('id').build() }).
                build();

            describe('to non-questionnaire route', () => {
                it('sets the state to NotInQuestionnaire', () => {
                    newStore = store.reducer(storeOutsideQuestionnaire, leaveQuestionnaire);
                    expect(toValidOrThrow(newStore).questionnaireRouteState).toBe(QuestionnaireRouteState.NotInQuestionnairePage);
                });
                it('leaves old answers unchanged', () => {
                    newStore = store.reducer(storeOutsideQuestionnaire, leaveQuestionnaire);
                    expect(toValidOrThrow(newStore).oldAnswers).toBe(storeOutsideQuestionnaire.oldAnswers);
                });
            });

            describe('to questionnaire route', () => {
                it('sets the state to InQuestionnaire', () => {
                    newStore = store.reducer(storeOutsideQuestionnaire, enterQuestionnaire);
                    expect(toValidOrThrow(newStore).questionnaireRouteState).toBe(QuestionnaireRouteState.InQuestionnairePage);
                });
                it('stores the current state of answers for later', () => {
                    newStore = store.reducer(storeOutsideQuestionnaire, enterQuestionnaire);
                    expect(toValidOrThrow(newStore).oldAnswers).toBe(storeOutsideQuestionnaire.answers);
                });
            });
        });

        describe('from questionnaire route', () => {
            const storeInQuestionnaire = new ValidStoreBuilder().
                withState(QuestionnaireRouteState.InQuestionnairePage).
                withOldAnswers({ 'id': new AnswerBuilder().withId('id').build() }).
                build();

            describe('to non-questionnaire route', () => {
                it('sets the state to PopupNeeded', () => {
                    newStore = store.reducer(storeInQuestionnaire, leaveQuestionnaire);
                    expect(toValidOrThrow(newStore).questionnaireRouteState).toBe(QuestionnaireRouteState.ShowQuestionnairePopup);
                });
                it('leaves old answers unchanged', () => {
                    newStore = store.reducer(storeInQuestionnaire, leaveQuestionnaire);
                    expect(toValidOrThrow(newStore).oldAnswers).toBe(storeInQuestionnaire.oldAnswers);
                });
            });

            describe('to questionnaire route', () => {
                it('sets the state to InQuestionnaire', () => {
                    newStore = store.reducer(storeInQuestionnaire, enterQuestionnaire);
                    expect(toValidOrThrow(newStore).questionnaireRouteState).toBe(QuestionnaireRouteState.InQuestionnairePage);
                });
                it('leaves old answers unchanged', () => {
                    newStore = store.reducer(storeInQuestionnaire, enterQuestionnaire);
                    expect(toValidOrThrow(newStore).oldAnswers).toBe(storeInQuestionnaire.oldAnswers);
                });
            });
        });

        describe('when showing the new tasks popup', () => {
            it('should set the state to NotInQuestionnairePage when dismissing popup', () => {
                const storeWithPopupNeeded = new ValidStoreBuilder().withState(QuestionnaireRouteState.ShowQuestionnairePopup).build();
                newStore = store.reducer(storeWithPopupNeeded, dismissNewlyAddedTasksPopup());
                expect(toValidOrThrow(newStore).questionnaireRouteState).toBe(QuestionnaireRouteState.NotInQuestionnairePage);
            });
            it('should set the state to NotInQuestionnaire when saving all tasks', () => {
                const storeWithPopupNeeded = new ValidStoreBuilder().withState(QuestionnaireRouteState.ShowQuestionnairePopup).build();
                newStore = store.reducer(storeWithPopupNeeded, saveTheseTasksToMyPlan([]));
                expect(toValidOrThrow(newStore).questionnaireRouteState).toBe(QuestionnaireRouteState.NotInQuestionnairePage);
            });
        });
    });

    describe('when loading chosen answers from persistent storage', () => {

        let loadingStore: store.QuestionnaireStore = undefined;

        it('should set question with id in request to chosen', () => {
            nonChosenAnswer = new AnswerBuilder().withIsChosen(false);
            question = new QuestionBuilder().withAnswers([nonChosenAnswer]);
            loadingStore = buildLoadingStore([question]);
            const persistedData = new PersistedUserDataBuilder().addChosenAnswer(nonChosenAnswer.id).buildObject();
            const action = UserDataPersistence.loadSuccess(persistedData);

            newStore = store.reducer(loadingStore, action);

            expect(toValidOrThrow(newStore).answers[nonChosenAnswer.id].isChosen).toBe(true);
        });

        it('should set question with id not in request to not chosen', () => {
            chosenAnswer = new AnswerBuilder().withIsChosen(true);
            question = new QuestionBuilder().withAnswers([chosenAnswer]);
            loadingStore = buildLoadingStore([question]);
            const persistedData = new PersistedUserDataBuilder().buildObject();
            const action = UserDataPersistence.loadSuccess(persistedData);

            newStore = store.reducer(loadingStore, action);

            expect(toValidOrThrow(newStore).answers[chosenAnswer.id].isChosen).toBe(false);
        });

        describe('when handling a load request', () => {

            beforeEach(() => {
                const answer = new AnswerBuilder();
                question = new QuestionBuilder().withAnswers([answer]);
                theStore = new ValidStoreBuilder().withQuestions([question]).build();
                const action = UserDataPersistence.loadRequest();

                newStore = store.reducer(theStore, action);
            });

            it('should return a loading store', () => {
                expect(newStore).toBeInstanceOf(LoadingQuestionnaireStore);
            });

            it('should return a store containing the last known valid state', () => {
                if (newStore instanceof LoadingQuestionnaireStore) {
                    expect(newStore.lastValidState).toBe(theStore);
                } else {
                    fail();
                }
            });
        });

        describe('when handling a load error', () => {

            let theError: string = aString();
            beforeEach(() => {
                chosenAnswer = new AnswerBuilder().withIsChosen(true);
                question = new QuestionBuilder().withAnswers([chosenAnswer]);
                loadingStore = buildLoadingStore([question]);
                const action = UserDataPersistence.loadFailure(theError);

                newStore = store.reducer(loadingStore, action);
            });

            it('should return an invalid store', () => {
                expect(newStore).toBeInstanceOf(InvalidQuestionnaireStore);
            });

            it('should return store state unchanged from before error', () => {
                if (loadingStore instanceof LoadingQuestionnaireStore && newStore instanceof InvalidQuestionnaireStore) {
                    expect(newStore.lastValidState).toBe(loadingStore.lastValidState);
                } else {
                    fail();
                }
            });

            it('should return store state with error message', () => {
                if (newStore instanceof InvalidQuestionnaireStore) {
                    expect(newStore.error).toBe(theError);
                } else {
                    fail();
                }
            });
        });
    });
});
