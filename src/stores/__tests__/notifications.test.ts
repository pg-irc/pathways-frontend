// tslint:disable:no-expression-statement no-let
import * as model from '../notifications';
import * as R from 'ramda';
import { addToSavedList } from '../tasks';
import { TaskBuilder } from '../../stores/__tests__/helpers/tasks_helpers';
import { NotificationBuilder }  from './helpers/notification_helpers';

describe('notifications store', () => {

    describe('reducer', () => {
        let aNotification: model.Notification;
        let anotherNotification: model.Notification;
        let store: model.Store;

        beforeEach(() => {
            aNotification = new NotificationBuilder().withText('a notification').build();
            anotherNotification = new NotificationBuilder().withText('another notification').build();
            store = {
                notifications: {
                    [aNotification.id]: aNotification,
                    [anotherNotification.id]: anotherNotification,
                },
            };
        });

        it('creates notification of type "expiring" when adding a task to my plan', () => {
            const task = new TaskBuilder().build();
            const finalStore = model.reducer(store, addToSavedList(task.id));
            const lastKey = R.keys(finalStore.notifications)[2];
            expect(finalStore.notifications[lastKey].type).toBe(model.NotificationType.Expiring);
        });

        it ('allows for the removal of a notificiation', () => {
            const finalStore = model.reducer(store, model.removeNotification(aNotification.id));
            expect (R.keys(finalStore.notifications).length).toBe(1);
        });

    });

    describe('create notification helper', () => {
        const notification = model.createNotification(model.NotificationType.Expiring, 'a notification');

        it('creates a notification with a generated id', () => {
            expect (notification).toHaveProperty('id');
        });

        it('creates a notification with expected type', () => {
            expect (notification.type).toBe(model.NotificationType.Expiring);
        });

        it('creates a notification with expected text', () => {
            expect (notification.text).toBe('a notification');
        });
    });
});
