// tslint:disable:no-expression-statement no-let
import { call, CallEffect, PutEffect, put, select, SelectEffect } from 'redux-saga/effects';
import { loadActiveQuestions, saveActiveQuestions, loadActiveQuestionsAsync, saveActiveQuestionsAsync } from '../questionnaire';
import { Persistence } from '../../stores/questionnaire';
import { aString, anError } from '../../application/__tests__/helpers/random_test_values';
import { selectIdsOfActiveQuestions } from '../../selectors/select_ids_of_active_questions';

describe('the loadActiveQuestions saga', () => {

    it('should dispatch a call effect for loadActiveQuestionsFromStorage()', () => {
        const saga = loadActiveQuestions();

        const result = saga.next().value;

        expect(result).toEqual(call(loadActiveQuestionsAsync));
    });

    describe('after requesting the selected questions', () => {
        let saga: IterableIterator<CallEffect | PutEffect<Persistence.LoadSuccessAction | Persistence.LoadFailureAction>>;

        beforeEach(() => {
            saga = loadActiveQuestions();
            saga.next();
        });

        it('should dispatch a success action on success', () => {
            const questionId = aString();

            const result = saga.next(questionId).value;

            expect(result).toEqual(put(Persistence.loadSuccess([questionId])));
        });

        it('should return zero ids when there is no data in persistent storage', () => {
            const questionId: string = undefined;

            const result = saga.next(questionId).value;

            expect(result).toEqual(put(Persistence.loadSuccess([])));
        });

        it('should split the data on comma', () => {
            const firstQuestionId = aString();
            const secondQuestionId = aString();
            const argument = firstQuestionId + ',' + secondQuestionId;

            const result = saga.next(argument).value;

            expect(result).toEqual(put(Persistence.loadSuccess([firstQuestionId, secondQuestionId])));
        });

        it('should dispatch a put effect with a failure action on error', () => {
            const error = anError();

            const result = saga.throw(error).value;

            expect(result).toEqual(put(Persistence.loadFailure(error.message)));
        });

        // TODO add test for handling no persistent data
    });
});

describe('the saveActiveQuestions saga', () => {

    it('should dispatch select effect to get active question ids from the store', () => {
        const saga = saveActiveQuestions();

        const result = saga.next().value;

        expect(result).toEqual(select(selectIdsOfActiveQuestions));
    });

    describe('after selectig active question ids from store', () => {
        let saga: IterableIterator<SelectEffect | CallEffect | PutEffect<Persistence.SaveSuccessAction | Persistence.SaveFailureAction>>;

        beforeEach(() => {
            saga = saveActiveQuestions();
            saga.next();
        });

        it('should dispatch call effect to save question ids', () => {
            const result = saga.next([]).value;

            expect(result).toEqual(call(saveActiveQuestionsAsync, ''));
        });

        it('should save question ids as comma-separated string', () => {
            const firstId = aString();
            const secondId = aString();

            const result = saga.next([firstId, secondId]).value;

            expect(result).toEqual(call(saveActiveQuestionsAsync, firstId + ',' + secondId));
        });

        it('should dispatch a put effect with a failure action on error', () => {
            const error = anError();

            const result = saga.throw(error).value;

            expect(result).toEqual(put(Persistence.saveFailure(error.message)));
        });

        describe('after successfully saving ids', () => {

            beforeEach(() => {
                saga.next([]);
            });

            it('should dispatch a put effect with a success action', () => {
                const result = saga.next().value;

                expect(result).toEqual(put(Persistence.saveSuccess()));
            });
        });
    });
});
