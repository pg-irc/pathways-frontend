// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import { Notification } from '../../stores/notifications';
import { colors, values } from '../../application/styles';

export interface ExpiringNotificationProps {
    readonly notification: Notification;
    readonly notificationContent: JSX.Element;
}

export interface ExpiringNotificationActions {
    readonly removeNotification: () => void;
}

type Props = ExpiringNotificationProps & ExpiringNotificationActions;

export class ExpiringNotificationComponent extends React.Component<Props> {
    timer: number;
    onePointFiveSecondsInMilliSeconds: number = 1500;

    componentDidMount(): void {
        this.timer = setTimeout(() => {
            this.props.removeNotification();
        }, this.onePointFiveSecondsInMilliSeconds);
    }

    componentWillUnmount(): void {
        clearTimeout(this.timer);
    }

    render(): JSX.Element {
        return (
            <View style={styles.notification}>
                {this.props.notificationContent}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    notification: {
        borderRadius: values.lessRoundedBorderRadius,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightGrey2,
        flex: 1,
        position: 'absolute',
        padding: 10,
        bottom: 10,
        left: 10,
        right: 10,
        elevation: 1,
    },
});
