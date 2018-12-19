// tslint:disable:no-expression-statement no-let
import * as model from '../notifications';
import * as R from 'ramda';
import { addToSavedList, removeFromSavedList } from '../tasks';
import { TaskBuilder } from './helpers/tasks_helpers';
import { NotificationBuilder }  from './helpers/notification_helpers';

describe('notifications store', () => {

    describe('reducer', () => {
        let aNotification: model.Notification;
        let store: model.NotificationStore;

        beforeEach(() => {
            aNotification = new NotificationBuilder().withType(model.NotificationType.TaskAddedToPlan).build();
            store = {
                notifications: {
                    [aNotification.id]: aNotification,
                },
            };
        });

        it('creates notification of type "TaskAddedToPlan" when adding a task to my plan', () => {
            const task = new TaskBuilder().build();
            const finalStore = model.reducer(store, addToSavedList(task.id));
            const lastKey = R.keys(finalStore.notifications)[1];
            expect(finalStore.notifications[lastKey].type).toBe(model.NotificationType.TaskAddedToPlan);
        });

        it('creates notification of type "TaskRemovedFromPlan" when removing a task from my plan', () => {
            const task = new TaskBuilder().build();
            const finalStore = model.reducer(store, removeFromSavedList(task.id));
            const lastKey = R.keys(finalStore.notifications)[1];
            expect(finalStore.notifications[lastKey].type).toBe(model.NotificationType.TaskRemovedFromPlan);
        });

        it ('allows for the removal of a notification', () => {
            const finalStore = model.reducer(store, model.removeNotification(aNotification.id));
            expect (R.keys(finalStore.notifications).length).toBe(0);
        });

    });

    describe('create notification helper', () => {
        const notification = model.createNotification(model.NotificationType.TaskAddedToPlan);

        it('creates a notification with a generated id', () => {
            expect (notification).toHaveProperty('id');
        });

        it('creates a notification with expected type', () => {
            expect (notification.type).toBe(model.NotificationType.TaskAddedToPlan);
        });

    });
});
