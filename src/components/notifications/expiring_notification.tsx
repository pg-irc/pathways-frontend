// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import { Trans } from '@lingui/react';
import { Text } from 'native-base';
import * as selector from '../../selectors/notifications';

export interface ExpiringNotificationProps {
    readonly notification: selector.Notification;
    readonly timeInSeconds: number;
}
export interface ExpiringNotificationActions {
    readonly timeElapsedCallback: () => void;
}
type AllExpiringNotificationProps = ExpiringNotificationProps & ExpiringNotificationActions;

export class ExpiringNotificationComponent extends React.Component<AllExpiringNotificationProps> {
    timer: number;

    componentDidMount(): void {
        this.timer = setTimeout(() => {
            this.props.timeElapsedCallback();
        }, this.props.timeInSeconds * 1000);
    }

    componentWillUnmount(): void {
        clearTimeout(this.timer);
    }

    render(): JSX.Element {
        return(
            <Text><Trans>{this.props.notification.text}</Trans></Text>
        );
    }
}
