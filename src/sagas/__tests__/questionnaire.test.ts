// tslint:disable:no-expression-statement no-let
import { call, CallEffect, PutEffect, put, select, SelectEffect } from 'redux-saga/effects';
import { loadUserData, saveUserData, loadUserDataAsync, saveUserDataAsync } from '../questionnaire';
import { UserData } from '../../stores/questionnaire';
import { aString, anError } from '../../application/__tests__/helpers/random_test_values';
import { selectUserDataForLocalPersistence } from '../../selectors/questionnaire/select_ids_of_chosen_questions';

describe('the load user data saga', () => {

    it('should dispatch a call effect for loadUserDataAsync()', () => {
        const saga = loadUserData();

        const result = saga.next().value;

        expect(result).toEqual(call(loadUserDataAsync));
    });

    describe('after requesting the user data', () => {
        let saga: IterableIterator<
            CallEffect |
            PutEffect<UserData.LoadSuccessAction | UserData.LoadFailureAction>
            >;

        beforeEach(() => {
            saga = loadUserData();
            saga.next();
        });

        it('should dispatch a success action on success', () => {
            const questionId = aString(); // TODO rename

            const result = saga.next(questionId).value;

            expect(result).toEqual(put(UserData.loadSuccess([questionId])));
        });

        it('should return zero ids when there is no data in persistent storage', () => {
            const questionId: string = undefined;

            const result = saga.next(questionId).value;

            expect(result).toEqual(put(UserData.loadSuccess([])));
        });

        it('should split the data on comma', () => {
            const firstQuestionId = aString();
            const secondQuestionId = aString();
            const argument = firstQuestionId + ',' + secondQuestionId;

            const result = saga.next(argument).value;

            expect(result).toEqual(put(UserData.loadSuccess([firstQuestionId, secondQuestionId])));
        });

        it('should dispatch a put effect with a failure action on error', () => {
            const error = anError();

            const result = saga.throw(error).value;

            expect(result).toEqual(put(UserData.loadFailure(error.message)));
        });

        // TODO add test for handling no persistent data
    });
});

describe('the save user data saga', () => {

    it('should dispatch select effect to get user data from the store', () => {
        const saga = saveUserData();

        const result = saga.next().value;

        expect(result).toEqual(select(selectUserDataForLocalPersistence));
    });

    describe('after selecting user data from store', () => {
        let saga: IterableIterator<
            SelectEffect |
            CallEffect |
            PutEffect<UserData.SaveSuccessAction | UserData.SaveFailureAction>
            >;

        beforeEach(() => {
            saga = saveUserData();
            saga.next();
        });

        it('should dispatch call effect to save user state', () => {
            const result = saga.next([]).value;

            expect(result).toEqual(call(saveUserDataAsync, ''));
        });

        it('should save question ids as comma-separated string', () => {
            const firstId = aString();
            const secondId = aString();

            const result = saga.next([firstId, secondId]).value;

            expect(result).toEqual(call(saveUserDataAsync, firstId + ',' + secondId));
        });

        it('should dispatch a put effect with a failure action on error', () => {
            const error = anError();

            const result = saga.throw(error).value;

            expect(result).toEqual(put(UserData.saveFailure(error.message)));
        });

        describe('after successfully saving user data', () => {

            beforeEach(() => {
                saga.next([]);
            });

            it('should dispatch a put effect with a success action', () => {
                const result = saga.next().value;

                expect(result).toEqual(put(UserData.saveSuccess()));
            });
        });
    });
});
