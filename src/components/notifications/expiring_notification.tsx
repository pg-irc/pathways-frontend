// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import { Trans } from '@lingui/react';
import { Text } from 'native-base';
import * as selector from '../../selectors/notifications';
import * as model from '../../stores/notifications';
import { colors } from '../../application/styles';

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
            <Text style={[{color: colors.white}]}>{this.renderContentForNotification(this.props.notification)}</Text>
        );
    }

    private renderContentForNotification(notification: model.Notification): JSX.Element {
        switch (notification.type) {
            default:
            case model.NotificationType.TaskAddedToPlan:
                return <Trans>Task added to plan</Trans>;
        }
    }
}
