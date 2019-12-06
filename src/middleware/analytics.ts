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

    if (action.type === SAVE_SERVICE || action.type === LOAD_SERVICES_SUCCESS) {
        sendServicesCountReport(state, action);
    }

    return next(action);
});

type UpdateServicesActions = SaveServiceAction | BuildServicesSuccessAction;

const sendServicesCountReport = (store: Store, action: UpdateServicesActions): void => {
    const oldStore = store.services;
    const newStore = servicesReducer(store.services, action);
    const servicesAdded = computeNumberOfServicesAdded(oldStore, newStore);
    const newServiceCount = R.length(R.keys(newStore.services));

    if (servicesAdded > 0 && newServiceCount % MEMORY_REPORT_SEND_EVERY_SERVICES_COUNT === 0) {
        sendServicesCountEvent(newServiceCount);
    }
};

export const computeNumberOfServicesAdded = (oldStore: ServiceStore, newStore: ServiceStore): number => (
    R.length(
        R.difference(
            R.keys(newStore.services),
            R.keys(oldStore.services),
        ),
    )
);
