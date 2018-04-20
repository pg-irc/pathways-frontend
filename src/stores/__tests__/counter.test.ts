import * as counter from '../counter';
import * as constants from '../../application/constants';
import * as helpers from '../../application/helpers/redux-helpers';
import { aNumber } from '../../application/test_helpers/random_test_values';

let buildStore = () => counter.reducer(undefined, undefined);

let buildStoreWithValue = (value: number) => {
    const action = helpers.makeAction(constants.SET_COUNTER, { value });
    return counter.reducer(undefined, action);
};

describe('the action for', () => {

    describe('increment', () => {

        it('should create action with type SET_COUNTER', () => {
            const theStore = buildStore();
            const theIncrementAction = counter.increment(theStore);
            expect(theIncrementAction.type).toBe(constants.SET_COUNTER);
        });

        it('should create action with payload one larger than value in the store', () => {
            const aValue = aNumber();
            const theStore = buildStoreWithValue(aValue);
            const theIncrementAction = counter.increment(theStore);
            expect(theIncrementAction.payload.value).toBe(aValue + 1);
        });
    });

    describe('decrement', () => {

        it('should create action with type SET_COUNTER', () => {
            const theStore = buildStore();
            const theDecrementAction = counter.decrement(theStore);
            expect(theDecrementAction.type).toBe(constants.SET_COUNTER);
        });

        it('should create action with payload one less than value in the store', () => {
            const aValue = aNumber();
            const theStore = buildStoreWithValue(aValue);
            const theDecrementAction = counter.decrement(theStore);
            expect(theDecrementAction.payload.value).toBe(aValue - 1);
        });
    });

    describe('reset', () => {

        it('should create action with type RESET_COUNTER', () => {
            const theDecrementAction = counter.reset();
            expect(theDecrementAction.type).toBe(constants.RESET_COUNTER);
        });
    });
});

describe('the reducer', () => {
    it('should default to build a store with value zero', () => {
        const theStore = counter.reducer();
        expect(theStore.value).toBe(0);
    });

    it('when called with SET_COUNTER should return store with value from action', () => {
        const theStore = buildStore();
        const theAction = {
            type: constants.SET_COUNTER as typeof constants.SET_COUNTER,
            payload: { value: aNumber() },
        };
        const theNewStore = counter.reducer(theStore, theAction);
        expect(theNewStore.value).toBe(theAction.payload.value);
    });

    it('when called with RESET_COUNTER should return store with value of zero', () => {
        const theStore = buildStore();
        const theAction = { type: constants.RESET_COUNTER as typeof constants.RESET_COUNTER };
        const theNewStore = counter.reducer(theStore, theAction);
        expect(theNewStore.value).toBe(0);
    });

    it('should return store unchanged if action is undefined', () => {
        const theOriginalStore = buildStoreWithValue(aNumber());
        const theNewStore = counter.reducer(theOriginalStore, undefined);
        expect(theNewStore.value).toBe(theOriginalStore.value);
    });
});
