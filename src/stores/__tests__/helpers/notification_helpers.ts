// tslint:disable:readonly-keyword no-this no-expression-statement readonly-array no-class no-let
import { aString, aNumber } from '../../../application/__tests__/helpers/random_test_values';
import { ExpiringNotification } from '../../notifications';

export class ExpiringNotificationBuilder {
    text: string = aString();
    expirationInSeconds: number = aNumber();

    withText(text: string): ExpiringNotificationBuilder {
        this.text = text;
        return this;
    }

    build(): ExpiringNotification {
        return {
            text: this.text,
            expirationInSeconds: this.expirationInSeconds,
        };
    }
}
