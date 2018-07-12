// tslint:disable:no-let no-expression-statement
import * as selector from '../notifications';
import * as model from '../../stores/notifications';
import { NotificationBuilder } from '../../stores/__tests__/helpers/notification_helpers';

describe('articles selector', () => {

    describe('denormalization', () => {
        let notification: model.Notification;
        let denormalizedNotification: selector.Notification;

        beforeEach(() => {
            notification = new NotificationBuilder().build();
            denormalizedNotification = selector.denormalizeNotification(notification);
        });

        test('id property', () => {
            expect(denormalizedNotification.id).toBe(notification.id);
        });

        test('type property', () => {
            expect(denormalizedNotification.type).toBe(notification.type);
        });

        test('text property', () => {
            expect(denormalizedNotification.text).toBe(notification.text);
        });

    });

});