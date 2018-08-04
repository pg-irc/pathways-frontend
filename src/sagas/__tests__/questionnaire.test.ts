// tslint:disable:no-expression-statement no-let
import { call, CallEffect, PutEffect, put } from 'redux-saga/effects';
import { loadActiveQuestions, Async, saveActiveQuestions } from '../questionnaire';
import { Persistence } from '../../stores/questionnaire';
import { aString, anError } from '../../application/__tests__/helpers/random_test_values';

describe('the loadActiveQuestions saga', () => {

    it('should dispatch a call effect for loadActiveQuestionsFromStorage()', () => {
        const saga = loadActiveQuestions();
        const value = saga.next().value;
        expect(value).toEqual(call(Async.loadActiveQuestionsFromStorage));
    });

    describe('after requesting the selected questions', () => {
        let saga: IterableIterator<CallEffect | PutEffect<Persistence.LoadSuccess | Persistence.LoadFailure>>;

        beforeEach(() => {
            saga = loadActiveQuestions();
            saga.next();
        });

        it('should dispatch a success action on success', () => {
            const questionId = aString();
            const value = saga.next(questionId).value;
            expect(value).toEqual(put(Persistence.loadSuccess([questionId])));
        });

        it('should split the data on comma', () => {
            const firstQuestionId = aString();
            const secondQuestionId = aString();
            const argument = firstQuestionId + ',' + secondQuestionId;
            const value = saga.next(argument).value;
            expect(value).toEqual(put(Persistence.loadSuccess([firstQuestionId, secondQuestionId])));
        });

        it('should dispatch a put effect with a failure action on error', () => {
            const error = anError();
            const value = saga.throw(error).value;
            expect(value).toEqual(put(Persistence.loadFailure(error.message)));
        });
    });
});

describe('the saveActiveQuestions saga', () => {

    it('should dispatch a call effect for saveActiveQuestionsToStorage', () => {
        const request = Persistence.saveRequest([]);
        const saga = saveActiveQuestions(request);
        expect(saga.next().value).toEqual(call(Async.saveActiveQuestionsToStorage, ''));
    });

    it('should pass in serialized ids', () => {
        const firstId = aString();
        const secondId = aString();
        const request = Persistence.saveRequest([firstId, secondId]);
        const saga = saveActiveQuestions(request);
        expect(saga.next().value).toEqual(call(Async.saveActiveQuestionsToStorage, firstId + ',' + secondId));
    });

    describe('after requesting the ids to be saved', () => {

        let saga: IterableIterator<CallEffect | PutEffect<Persistence.SaveSuccess | Persistence.SaveFailure>>;
        beforeEach(() => {
            const request = Persistence.saveRequest([]);
            saga = saveActiveQuestions(request);
            saga.next();
        });

        it('should dispatch a put effect with a success action', () => {
            expect(saga.next().value).toEqual(put(Persistence.saveSuccess()));
        });

        it('should dispatch a put effect with a failure action on error', () => {
            const error = anError();
            const value = saga.throw(error).value;
            expect(value).toEqual(put(Persistence.saveFailure(error.message)));
        });
    });
});
