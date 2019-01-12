// tslint:disable:no-expression-statement

import { GetServerVersionAsync, reducer, StoreState } from '../server_version';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { GET_SERVER_VERSION_SUCCESS, GET_SERVER_VERSION_FAILURE } from '../../application/constants';
import { buildDefaultStore } from '../server_version';

describe('server version store', () => {

    describe('success action', () => {
        it('should create action with type GET_SERVER_VERSION_SUCCESS', () => {
            const theVersion = aString();
            const theAction = GetServerVersionAsync.success(theVersion);
            expect(theAction.type).toBe(GET_SERVER_VERSION_SUCCESS);
        });

        it('should create action with server versio as passed to the action creator', () => {
            const theVersion = aString();
            const theAction = GetServerVersionAsync.success(theVersion);
            expect(theAction.payload.version).toBe(theVersion);
        });
    });

    describe('failure action', () => {
        it('should create action with type GET_SERVER_VERSION_SUCCESS', () => {
            const theError = aString();
            const theAction = GetServerVersionAsync.failure(theError);
            expect(theAction.type).toBe(GET_SERVER_VERSION_FAILURE);
        });

        it('should create action with server versio as passed to the action creator', () => {
            const theError = aString();
            const theAction = GetServerVersionAsync.failure(theError);
            expect(theAction.payload.message).toBe(theError);
        });
    });

    describe('the reducer', () => {
        describe('when called with a success action', () => {
            it('should set the version string from the action', () => {
                const theStore = buildDefaultStore();
                const theVersion = aString();
                const theAction = GetServerVersionAsync.success(theVersion);
                const theNewStore = reducer(theStore, theAction);
                expect(theNewStore.serverVersion).toBe(theVersion);
            });
            it('should set the store state to valid', () => {
                const theStore = buildDefaultStore();
                const theVersion = aString();
                const theAction = GetServerVersionAsync.success(theVersion);
                const theNewStore = reducer(theStore, theAction);
                expect(theNewStore.state).toBe(StoreState.Valid);
            });
        });

        describe('when called with a failure action', () => {
            it('should set the version string to ""', () => {
                const theStore = buildDefaultStore();
                const theError = aString();
                const theAction = GetServerVersionAsync.failure(theError);
                const theNewStore = reducer(theStore, theAction);
                expect(theNewStore.serverVersion).toBe('');
            });
            it('should set the store state to invalid', () => {
                const theStore = buildDefaultStore();
                const theError = aString();
                const theAction = GetServerVersionAsync.failure(theError);
                const theNewStore = reducer(theStore, theAction);
                expect(theNewStore.state).toBe(StoreState.Invalid);
            });
        });
    });
});
