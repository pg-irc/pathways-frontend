import * as R from 'ramda';
import * as store from '../../stores/notifications';
import { Store } from '../../stores';

export const selectNotifications = (appStore: Store): ReadonlyArray<store.Notification> => (
    R.values(appStore.notificationsInStore.notifications)
);
