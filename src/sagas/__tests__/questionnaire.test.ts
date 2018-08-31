// tslint:disable:no-expression-statement no-let
import { call, CallEffect, PutEffect, put, select, SelectEffect } from 'redux-saga/effects';
import { loadUserData, saveUserData, loadUserDataAsync, saveUserDataAsync } from '../user_data';
import { UserData } from '../../stores/user_data';
import { aString, anError } from '../../application/__tests__/helpers/random_test_values';
import { selectUserDataForLocalPersistence } from '../../selectors/user_data/select_user_data_for_local_persistence';
import { PersistedUserDataBuilder } from '../../stores/__tests__/helpers/user_data_helpers';

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
            const questionId = aString();
            const dataBuilder = new PersistedUserDataBuilder().addChosenAnswer(questionId);

            const result = saga.next(dataBuilder.buildJson()).value;

            expect(result).toEqual(put(UserData.loadSuccess(dataBuilder.buildObject())));
        });

        it('should return zero ids when there is no data in persistent storage', () => {
            const questionId: string = undefined;
            const expectedPersistedData = new PersistedUserDataBuilder().buildObject();

            const result = saga.next(questionId).value;

            expect(result).toEqual(put(UserData.loadSuccess(expectedPersistedData)));
        });

        it('should split the data on comma', () => {
            const firstQuestionId = aString();
            const secondQuestionId = aString();
            const dataBuilder = new PersistedUserDataBuilder().
                addChosenAnswer(firstQuestionId).
                addChosenAnswer(secondQuestionId);

            const result = saga.next(dataBuilder.buildJson()).value;

            expect(result).toEqual(put(UserData.loadSuccess(dataBuilder.buildObject())));
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
            const persistedData = new PersistedUserDataBuilder().buildObject();
            const expectedResult = new PersistedUserDataBuilder().buildJson();

            const result = saga.next(persistedData).value;

            expect(result).toEqual(call(saveUserDataAsync, expectedResult));
        });

        it('should save question ids as comma-separated string', () => {
            const firstId = aString();
            const secondId = aString();
            const dataBuilder = new PersistedUserDataBuilder().
                addChosenAnswer(firstId).
                addChosenAnswer(secondId);

            const result = saga.next(dataBuilder.buildObject()).value;

            expect(result).toEqual(call(saveUserDataAsync, dataBuilder.buildJson()));
        });

        it('should dispatch a put effect with a failure action on error', () => {
            const error = anError();

            const result = saga.throw(error).value;

            expect(result).toEqual(put(UserData.saveFailure(error.message)));
        });

        describe('after successfully saving user data', () => {

            beforeEach(() => {
                const persistedData = new PersistedUserDataBuilder().buildObject();
                saga.next(persistedData);
            });

            it('should dispatch a put effect with a success action', () => {
                const result = saga.next().value;

                expect(result).toEqual(put(UserData.saveSuccess()));
            });
        });
    });
});
