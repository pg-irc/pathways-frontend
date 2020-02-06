// tslint:disable:no-expression-statement
import { Dispatch, MiddlewareAPI } from 'redux';
import { Store } from '../stores';
import * as R from 'ramda';
import { sendServicesCountEvent } from '../sagas/analytics/events';
import { SAVE_SERVICE, LOAD_SERVICES_SUCCESS, MEMORY_REPORT_SEND_EVERY_SERVICES_COUNT } from '../application/constants';
import { reducer as servicesReducer } from '../stores/services';
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
    const oldServicesCount = R.length(R.keys(oldStore.services));
    const newServicesCount = R.length(R.keys(newStore.services));
    const analyticsIsDisabled = store.userProfile.disableAnalytics;

    if (shouldSendServicesReport(oldServicesCount, newServicesCount, MEMORY_REPORT_SEND_EVERY_SERVICES_COUNT, analyticsIsDisabled)) {
        sendServicesCountEvent(newServicesCount);
    }
};

export const shouldSendServicesReport =
(oldServicesCount: number, newServicesCount: number, memoryReportThreshhold: number, analyticsIsDisabled: boolean): boolean => (
    !servicesCountIsLessThanThreshhold(oldServicesCount, newServicesCount, memoryReportThreshhold) && !analyticsIsDisabled
);

const servicesCountIsLessThanThreshhold = (oldServicesCount: number, newServicesCount: number, memoryReportThreshhold: number): boolean => (
    Math.floor(oldServicesCount / memoryReportThreshhold) >= Math.floor(newServicesCount / memoryReportThreshhold)
);