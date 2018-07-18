import * as R from 'ramda';
import * as app from '../application/store';
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

export const selectNotifications = (store: app.Store): ReadonlyArray<Notification> => {
    const notifications = store.applicationState.notificationsInStore.notifications;
    return R.map((notificationId: model.Id) =>
        denormalizeNotification(notifications[notificationId]), R.keys(notifications));
};