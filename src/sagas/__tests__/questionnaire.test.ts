// tslint:disable:no-expression-statement
import { call } from 'redux-saga/effects';
import { loadActiveQuestions, Effects } from '../questionnaire';

describe('the loadCurrentRoute saga', () => {
    it('should dispatch a call effect for loadCurrentRoute()', () => {
        const saga = loadActiveQuestions();
        const value = saga.next().value;
        expect(value).toEqual(call(Effects.loadActiveQuestionsFromAsyncStorage));
    });
});
