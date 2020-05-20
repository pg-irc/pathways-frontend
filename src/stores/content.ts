import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';
import { Alert } from '../validation/content/types';

export type GetAlertsSuccessAction = Readonly<ReturnType<typeof getAlertsSuccess>>;
export type GetAlertsFailureAction = Readonly<ReturnType<typeof getAlertsFailure>>;

// tslint:disable-next-line:typedef
export const getAlertsSuccess = (alerts: ReadonlyArray<any>) => (
    helpers.makeAction(constants.GET_ALERTS_SUCCESS, { alerts })
);

// tslint:disable-next-line:typedef
export const getAlertsFailure = (error: string) => (
    helpers.makeAction(constants.GET_ALERTS_FAILURE, { error })
);

export interface AlertsStore {
    readonly alerts: ReadonlyArray<Alert>;
}

export const buildDefaultStore = (): AlertsStore => ({
    alerts: [],
});

export const reducer = (store: AlertsStore = buildDefaultStore(), action?: GetAlertsSuccessAction | GetAlertsFailureAction): AlertsStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.GET_ALERTS_SUCCESS:
            return { ...store, alerts: action.payload.alerts };
        default:
            return store;
    }
};