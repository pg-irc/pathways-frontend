// tslint:disable:no-expression-statement no-let
import { call, CallEffect, PutEffect, put, select, SelectEffect } from 'redux-saga/effects';
import { loadChosenQuestions, saveChosenQuestions, loadChosenQuestionsAsync, saveChosenQuestionsAsync } from '../questionnaire';
import { LocalStorage } from '../../stores/questionnaire';
import { aString, anError } from '../../application/__tests__/helpers/random_test_values';
import { selectIdsOfChosenAnswers } from '../../selectors/questionnaire/select_ids_of_chosen_questions';

describe('the loadChosenQuestions saga', () => {

    it('should dispatch a call effect for loadChosenQuestions()', () => {
        const saga = loadChosenQuestions();

        const result = saga.next().value;

        expect(result).toEqual(call(loadChosenQuestionsAsync));
    });

    describe('after requesting the chosen questions', () => {
        let saga: IterableIterator<CallEffect | PutEffect<LocalStorage.LoadSuccessAction | LocalStorage.LoadFailureAction>>;

        beforeEach(() => {
            saga = loadChosenQuestions();
            saga.next();
        });

        it('should dispatch a success action on success', () => {
            const questionId = aString();

            const result = saga.next(questionId).value;

            expect(result).toEqual(put(LocalStorage.loadSuccess([questionId])));
        });

        it('should return zero ids when there is no data in persistent storage', () => {
            const questionId: string = undefined;

            const result = saga.next(questionId).value;

            expect(result).toEqual(put(LocalStorage.loadSuccess([])));
        });

        it('should split the data on comma', () => {
            const firstQuestionId = aString();
            const secondQuestionId = aString();
            const argument = firstQuestionId + ',' + secondQuestionId;

            const result = saga.next(argument).value;

            expect(result).toEqual(put(LocalStorage.loadSuccess([firstQuestionId, secondQuestionId])));
        });

        it('should dispatch a put effect with a failure action on error', () => {
            const error = anError();

            const result = saga.throw(error).value;

            expect(result).toEqual(put(LocalStorage.loadFailure(error.message)));
        });

        // TODO add test for handling no persistent data
    });
});

describe('the saveChosenQuestions saga', () => {

    it('should dispatch select effect to get chosen answer ids from the store', () => {
        const saga = saveChosenQuestions();

        const result = saga.next().value;

        expect(result).toEqual(select(selectIdsOfChosenAnswers));
    });

    describe('after selecting chosen answer ids from store', () => {
        let saga: IterableIterator<SelectEffect | CallEffect | PutEffect<LocalStorage.SaveSuccessAction | LocalStorage.SaveFailureAction>>;

        beforeEach(() => {
            saga = saveChosenQuestions();
            saga.next();
        });

        it('should dispatch call effect to save question ids', () => {
            const result = saga.next([]).value;

            expect(result).toEqual(call(saveChosenQuestionsAsync, ''));
        });

        it('should save question ids as comma-separated string', () => {
            const firstId = aString();
            const secondId = aString();

            const result = saga.next([firstId, secondId]).value;

            expect(result).toEqual(call(saveChosenQuestionsAsync, firstId + ',' + secondId));
        });

        it('should dispatch a put effect with a failure action on error', () => {
            const error = anError();

            const result = saga.throw(error).value;

            expect(result).toEqual(put(LocalStorage.saveFailure(error.message)));
        });

        describe('after successfully saving ids', () => {

            beforeEach(() => {
                saga.next([]);
            });

            it('should dispatch a put effect with a success action', () => {
                const result = saga.next().value;

                expect(result).toEqual(put(LocalStorage.saveSuccess()));
            });
        });
    });
});
