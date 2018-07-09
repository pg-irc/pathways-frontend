// tslint:disable:no-expression-statement no-let
import * as model from '../notifications';
import { addToSavedList } from '../tasks';
import { TaskBuilder } from '../../stores/__tests__/helpers/tasks_helpers';
import { ExpiringNotificationBuilder }  from './helpers/notification_helpers';

describe('notifications store', () => {

    describe('reducer', () => {
        let aNotification: model.ExpiringNotification;
        let anotherNotification: model.ExpiringNotification;
        let store: model.Store;

        beforeEach(() => {
            aNotification = new ExpiringNotificationBuilder().withText('first').build();
            anotherNotification = new ExpiringNotificationBuilder().withText('second').build();
            store = {
                notifications: [aNotification, anotherNotification],
            };
        });

        it('creates notification when adding a task to my plan', () => {
            const task = new TaskBuilder().build();
            const finalStore = model.reducer(store, addToSavedList(task.id));
            expect(finalStore.notifications.length).toBe(3);
        });

        it ('allows for the removal of the last notificiation', () => {
            const finalStore = model.reducer(store, model.removeLastNotification());
            expect (finalStore.notifications.length).toBe(1);
        });

        it ('removal of the last notification removes expected notification', () => {
            const finalStore = model.reducer(store, model.removeLastNotification());
            expect (finalStore.notifications[0].text).toBe(anotherNotification.text);
        });
    });
});
