import * as R from 'ramda';
import * as uuid from 'uuid';
import * as constants from '../application/constants';
import { AddToSavedListAction } from './tasks';
import * as helpers from './helpers/make_action';

export type Id = string;

export enum NotificationType {
    Expiring,
}

export interface Notification {
    readonly id: Id;
    readonly type: NotificationType;
    readonly text: string;
}

export interface NotificationMap {
    readonly [property: string]: Notification;
}

export interface Store {
    readonly notifications: NotificationMap;
}

export type RemoveNotificationAction = Readonly<ReturnType<typeof removeNotification>>;

type NotificationAction = AddToSavedListAction |
    RemoveNotificationAction;

// tslint:disable-next-line:typedef
export const removeNotification = (notificationId: Id) => (
    helpers.makeAction(constants.REMOVE_NOTIFICATION, { notificationId })
);

export const buildDefaultStore = (): Store => (
    {
        notifications: {},
    }
);

export const reducer = (store: Store = buildDefaultStore(), action?: NotificationAction): Store => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.Task.ADD_TO_SAVED_LIST:
            return {
                notifications: {
                    ...store.notifications,
                    [action.payload.notification.id]: action.payload.notification,
                },
            };
        case constants.REMOVE_NOTIFICATION:
            const isNotActionNotification = (notification: Notification): boolean =>
                notification.id !== action.payload.notificationId;
            return {
                notifications: R.pickBy(isNotActionNotification, store.notifications),
            };
        default:
            return store;
    }
};

export const createNotification = (type: NotificationType, text: string): Notification => {
    return {
        id: uuid.v1(),
        type: type,
        text: text,
    };
};
