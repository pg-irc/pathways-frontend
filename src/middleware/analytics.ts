// tslint:disable:no-expression-statement
import { Dispatch, MiddlewareAPI, AnyAction } from 'redux';
import { Store } from '../stores';
import * as R from 'ramda';
import { sendServicesCountEvent } from '../sagas/analytics/events';
import { SAVE_SERVICE, LOAD_SERVICES_SUCCESS, MEMORY_REPORT_SEND_EVERY_SERVICES_COUNT } from '../application/constants';
import { reducer as servicesReducer, ServiceStore } from '../stores/services';
import { ServicesAction } from '../stores/services/actions';

export const analytics = {
    middleware: R.curry((
        store: MiddlewareAPI<Dispatch, Store>,
        next: Dispatch,
        action: AnyAction) => {
        const state = store.getState();

        if (actionUpdatesServices(action)) {
            sendServicesCountReport(state, <ServicesAction> action);
        }

        return next(action);
    }),
};

export const serviceWasAdded = (currentServiceState: ServiceStore, nextServiceState: ServiceStore):
    boolean => (
        R.difference(
            Object.keys(nextServiceState.services),
            Object.keys(currentServiceState.services),
        ).length > 0
    );

export const isDivisable = (
    dividend: number,
    divisor: number): boolean => {
    const numbersAreValid = dividend > 0 && divisor > 0;
    const numbersAreDivisable = dividend % divisor === 0;
    return numbersAreValid && numbersAreDivisable;
};

export const actionUpdatesServices = (action: AnyAction): boolean => (
    action.type === SAVE_SERVICE || action.type === LOAD_SERVICES_SUCCESS
);

const sendServicesCountReport = (
    state: Store,
    action: ServicesAction,
    ): void => {
        const currentServiceState = state.services;
        const nextServicesState = servicesReducer(state.services, action);
        const nextServicesCount = Object.keys(nextServicesState.services).length;

        if (!serviceWasAdded(currentServiceState, nextServicesState)) {
            return;
        }

        if (!isDivisable(nextServicesCount, MEMORY_REPORT_SEND_EVERY_SERVICES_COUNT)) {
            return;
        }

        sendServicesCountEvent(nextServicesCount);
    };
