// tslint:disable:no-expression-statement no-let
import { call, CallEffect, PutEffect, put } from 'redux-saga/effects';
import { loadActiveQuestions, Effects } from '../questionnaire';
import { Persistence } from '../../stores/questionnaire';
import { aString } from '../../application/__tests__/helpers/random_test_values';

describe('the loadActiveQuestions saga', () => {

    it('should dispatch a call effect for loadActiveQuestionsFromAsyncStorage()', () => {
        const saga = loadActiveQuestions();
        const value = saga.next().value;
        expect(value).toEqual(call(Effects.loadActiveQuestionsFromAsyncStorage));
    });

    describe('after requesting the selected questions', () => {
        let saga: IterableIterator<CallEffect | PutEffect<Persistence.Success>>;

        beforeEach(() => {
            saga = loadActiveQuestions();
            saga.next();
        });

        it('dispatch a success action', () => {
            const questionId = aString();
            const value = saga.next(questionId).value;
            expect(value).toEqual(put(Persistence.success([questionId])));
        });
    });
});
