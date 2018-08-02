import * as R from 'ramda';
import { Store } from '../stores';
import * as model from '../stores/notifications';

export type Notification = model.Notification;
export type NotificationList = ReadonlyArray<Notification>;

export const denormalizeNotification = (notification: model.Notification): Notification => (
    {
        id: notification.id,
        type: notification.type,
    }
);

export const selectNotifications = (store: Store): NotificationList => {
    const notifications = store.notificationsInStore.notifications;
    return R.map((notificationId: model.Id) =>
        denormalizeNotification(notifications[notificationId]), R.keys(notifications));
};
