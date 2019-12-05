// tslint:disable:no-expression-statement
import { Dispatch, MiddlewareAPI, AnyAction } from 'redux';
import { Store } from '../stores';
import * as R from 'ramda';
import { sendServicesCountEvent } from '../sagas/analytics/events';
import { SAVE_SERVICE, LOAD_SERVICES_SUCCESS, MEMORY_REPORT_SEND_EVERY_SERVICES_COUNT } from '../application/constants';

export const GoogleAnalytics = {
    MemoryReportMiddleware: R.curry((
        store: MiddlewareAPI<Dispatch, Store>,
        next: Dispatch,
        action: AnyAction) => {
        const state = store.getState();
        const newServicesCount = countNewServicesToBeCreatedByAction(action, state);
        const totalServicesCount = countTotalServicesAfterActionFinishes(newServicesCount, state);

        if (shouldSendServicesCountReport(newServicesCount, totalServicesCount, MEMORY_REPORT_SEND_EVERY_SERVICES_COUNT)) {
            sendServicesCountEvent(totalServicesCount);
        }

        return next(action);
    }),
};

export const countNewServicesToBeCreatedByAction = (action: AnyAction, store: Store): number => {
    const type = action.type;
    const storeServices = R.values(store.services.services);

    if (type === SAVE_SERVICE) {
        return R.difference([action.payload.service], storeServices).length;
    }

    if (type === LOAD_SERVICES_SUCCESS) {
        return R.difference(action.payload.services, storeServices).length;
    }

    return 0;
};

export const countTotalServicesAfterActionFinishes = (newServicesCount: number, store: Store): number => (
    newServicesCount + R.values(store.services.services).length
);

export const shouldSendServicesCountReport = (
    newServicesCount: number,
    totalServicesCount: number,
    sendEveryServicesCount: number,
    ): boolean => (
        R.not(R.equals(newServicesCount, 0)) && isDivisable(totalServicesCount, sendEveryServicesCount)
    );

const isDivisable = (
    dividend: number,
    divisor: number): boolean => {
    const numbersAreValid = dividend > 0 && divisor > 0;
    const numbersAreDivisable = dividend % divisor === 0;
    return numbersAreValid && numbersAreDivisable;
};