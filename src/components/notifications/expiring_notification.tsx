// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import { StyleSheet } from 'react-native';
import { Trans } from '@lingui/react';
import { Text, View } from 'native-base';
import { Notification, NotificationType } from '../../stores/notifications';
import { colors } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';

export interface ExpiringNotificationProps {
    readonly notification: Notification;
}

export interface ExpiringNotificationActions {
    readonly removeNotification: () => void;
}

type Props = ExpiringNotificationProps & ExpiringNotificationActions;

export class ExpiringNotificationComponent extends React.Component<Props> {
    timer: number;
    removeInMillis: number = 1500;

    componentDidMount(): void {
        this.timer = setTimeout(() => {
            this.props.removeNotification();
        }, this.removeInMillis);
    }

    componentWillUnmount(): void {
        clearTimeout(this.timer);
    }

    render(): JSX.Element {
        return (
            <View style={styles.notification}>
                {this.getComponentForContent()}
            </View>
        );
    }

    private getComponentForContent(): JSX.Element {
        if (this.props.notification.type === NotificationType.TaskAddedToPlan) {
            return this.getContentForTaskAddedToPlan();
        }
        return <EmptyComponent />;
    }

    private getContentForTaskAddedToPlan(): JSX.Element {
        return (
            <Text style={styles.notificationContent}>
                <Trans>Task added to plan</Trans>
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    notification: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.darkGrey,
        flex: 1,
        position: 'absolute',
        padding: 10,
        bottom: 20,
        left: 0,
        right: 0,
    },
    notificationContent: {
        color: colors.white,
        fontWeight: 'bold',
    },
});
