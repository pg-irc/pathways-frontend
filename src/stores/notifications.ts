import * as R from 'ramda';
import * as uuid from 'uuid';
import * as constants from '../application/constants';
import { AddToSavedListAction } from './tasks';
import * as helpers from './helpers/make_action';
import { Id, NotificationType, Notification, Store } from '../fixtures/types/notifications';

export { Id, NotificationType, Notification, Store } from '../fixtures/types/notifications';

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
        case constants.ADD_TO_SAVED_TASKS:
            return addNotificationToStore(store, NotificationType.TaskAddedToPlan);
        case constants.REMOVE_NOTIFICATION:
            return {
                notifications: R.reject(R.propEq('id', action.payload.notificationId), store.notifications),
            };
        default:
            return store;
    }
};

const addNotificationToStore = (store: Store, notificationType: NotificationType): Store => {
    const notification = createNotification(notificationType);
    return {
        notifications: {
            ...store.notifications,
            [notification.id]: notification,
        },
    };
};

export const createNotification = (type: NotificationType): Notification => {
    return {
        id: uuid.v1(),
        type: type,
    };
};
