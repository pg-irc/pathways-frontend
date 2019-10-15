import * as R from 'ramda';
import * as uuid from 'uuid';
import * as constants from '../application/constants';
import { AddToSavedListAction, RemoveFromSavedListAction } from './topics';
import { UserDataPersistence } from './user_data';
import * as helpers from './helpers/make_action';
import { Id, NotificationType, Notification, NotificationStore } from '../fixtures/types/notifications';

export { Id, NotificationType, Notification, NotificationStore } from '../fixtures/types/notifications';

export type RemoveNotificationAction = Readonly<ReturnType<typeof removeNotification>>;
type NotificationAction =
    AddToSavedListAction |
    RemoveFromSavedListAction |
    UserDataPersistence.LoadSuccessAction |
    RemoveNotificationAction;

// tslint:disable-next-line:typedef
export const removeNotification = (notificationId: Id) => (
    helpers.makeAction(constants.REMOVE_NOTIFICATION, { notificationId })
);

export const buildDefaultStore = (): NotificationStore => (
    {
        notifications: {},
    }
);

export const reducer = (store: NotificationStore = buildDefaultStore(), action?: NotificationAction): NotificationStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.ADD_TOPIC_BOOKMARK:
            return addNotificationToStore(store, NotificationType.TaskAddedToPlan);
        case constants.REMOVE_TOPIC_BOOKMARK:
            return addNotificationToStore(store, NotificationType.TaskRemovedFromPlan);
        case constants.LOAD_USER_DATA_SUCCESS:
            if (R.isEmpty(action.payload.chosenAnswers)) {
                return addNotificationToStore(store, NotificationType.QuestionnaireInformation);
            }
            return store;
        case constants.REMOVE_NOTIFICATION:
            return {
                notifications: R.reject(R.propEq('id', action.payload.notificationId), store.notifications),
            };
        default:
            return store;
    }
};

const addNotificationToStore = (store: NotificationStore, notificationType: NotificationType): NotificationStore => {
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
