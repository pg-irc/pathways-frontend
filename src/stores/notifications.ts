import * as R from 'ramda';
import * as constants from '../application/constants';
import { AddToSavedListAction } from './tasks';
import * as helpers from './helpers/make_action';

interface Notification {
    readonly text: string;
}

export interface ExpiringNotification extends Notification {
    readonly expirationInSeconds: number;
}

export interface Store {
    readonly notifications: ReadonlyArray<Notification>;
}

export type DestroyNotificationAction = Readonly<ReturnType<typeof removeLastNotification>>;
type NotificationAction = AddToSavedListAction | DestroyNotificationAction;

// tslint:disable-next-line:typedef
export const removeLastNotification = () => (
    helpers.makeAction(constants.REMOVE_LAST_NOTIFICATION)
);

export const buildDefaultStore = (): Store => (
    {
        notifications: [],
    }
);

export const reducer = (store: Store = buildDefaultStore(), action?: NotificationAction): Store => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.Task.ADD_TO_SAVED_LIST:
            return {
                notifications: [...store.notifications, action.payload.notification],
            };
        case constants.REMOVE_LAST_NOTIFICATION:
            return {
                notifications: R.drop(1, store.notifications),
            };
        default:
            return store;
    }
};
