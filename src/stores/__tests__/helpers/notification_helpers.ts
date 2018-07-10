// tslint:disable:readonly-keyword no-this no-expression-statement readonly-array no-class no-let
import { aString } from '../../../application/__tests__/helpers/random_test_values';
import { NotificationType, Notification } from '../../notifications';

export class NotificationBuilder {
    id: string = aString();
    type: NotificationType = NotificationType.Expiring;
    text: string = aString();

    withId(id: string): NotificationBuilder {
        this.id = id;
        return this;
    }

    withType(type: NotificationType): NotificationBuilder {
        this.type = type;
        return this;
    }

    withText(text: string): NotificationBuilder {
        this.text = text;
        return this;
    }

    build(): Notification {
        return {
            id: this.id,
            type: this.type,
            text: this.text,
        };
    }
}
