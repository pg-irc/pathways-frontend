// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import { Text } from 'native-base';
import { Notification } from '../../stores/notifications';

export interface ExpiringNotificationProps {
    readonly notification: Notification;
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
            <Text>{this.props.notification.text}</Text>
        );
    }
}
