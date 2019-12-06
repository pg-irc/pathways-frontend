// tslint:disable:no-expression-statement
import { Dispatch, MiddlewareAPI } from 'redux';
import { Store } from '../stores';
import * as R from 'ramda';
import { sendServicesCountEvent } from '../sagas/analytics/events';
import { SAVE_SERVICE, LOAD_SERVICES_SUCCESS, MEMORY_REPORT_SEND_EVERY_SERVICES_COUNT } from '../application/constants';
import { reducer as servicesReducer, ServiceStore } from '../stores/services';
import { SaveServiceAction, BuildServicesSuccessAction } from '../stores/services/actions';

// tslint:disable-next-line:no-any
export const middleware = R.curry((store: MiddlewareAPI<Dispatch, Store>, next: Dispatch, action: any) => {
    const state = store.getState();

    if  (action.type === SAVE_SERVICE || action.type === LOAD_SERVICES_SUCCESS) {
        sendServicesCountReport(state, action);
    }

    return next(action);
});

export const serviceWasAdded = (oldStore: ServiceStore, newStore: ServiceStore): boolean => (
    R.difference(
        Object.keys(newStore.services),
        Object.keys(oldStore.services),
    ).length > 0
);

export const isDivisable = (dividend: number, divisor: number): boolean => {
    const numbersAreValid = dividend > 0 && divisor > 0;
    const numbersAreDivisable = dividend % divisor === 0;
    return numbersAreValid && numbersAreDivisable;
};

type UpdateServicesActions = SaveServiceAction | BuildServicesSuccessAction;

const sendServicesCountReport = (state: Store, action: UpdateServicesActions): void => {
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
