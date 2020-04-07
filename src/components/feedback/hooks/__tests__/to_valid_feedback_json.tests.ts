// tslint:disable:no-expression-statement typedef no-let
import { toValidFeedbackJSON, getEmptyFeedback, ServiceFeedback } from '../use_send_feedback';
import { aString, aBoolean } from '../../../../helpers/random_test_values';

describe('toValidFeedbackJSON', () => {

    it('Throws when missing a bc211Id field', () => {
        expect(() => toValidFeedbackJSON(getEmptyFeedback())).toThrow();
    });

    it('Throws when providing feedback with no fields set to "should send"', () => {
        expect(() => toValidFeedbackJSON(getEmptyFeedback(false))).toThrow();
    });

    it('Throws when providing a bc211Id field but no other fields', () => {
        const feedback: ServiceFeedback = {
            ...getEmptyFeedback(),
            bc211Id: {
                value: aString(),
                shouldSend: aBoolean(),
            },
        };
        expect(() => toValidFeedbackJSON(feedback)).toThrow();
    });

    it('Returns expected JSON when providing a bc211Id and at least one other field', () => {
        const emptyFeedback = getEmptyFeedback();
        const bc211IdValue = aString();
        const nameValue = aString();
        const feedback: ServiceFeedback = {
            ...emptyFeedback,
            bc211Id: {
                ...emptyFeedback.bc211Id,
                value: bc211IdValue,
            },
            name: {
                ...emptyFeedback.name,
                value: nameValue,
            },
        };
        const expectedJSON = `{"fields":{"bc211Id":"${bc211IdValue}","name":"${nameValue}"}}`;

        expect(toValidFeedbackJSON(feedback)).toEqual(expectedJSON);
    });

});
