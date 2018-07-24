import * as R from 'ramda';
import { Store } from '../stores';
import * as model from '../stores/notifications';

export interface Notification {
    readonly id: model.Id;
    readonly type: model.NotificationType;
}

export const denormalizeNotification = (notification: model.Notification): Notification => (
    {
        id: notification.id,
        type: notification.type,
    }
);

export const selectNotifications = (store: Store): ReadonlyArray<Notification> => {
    const notifications = store.notificationsInStore.notifications;
    return R.map((notificationId: model.Id) =>
        denormalizeNotification(notifications[notificationId]), R.keys(notifications));
};