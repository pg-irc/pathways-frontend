// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import { colors } from '../../application/styles';

export interface ExpiringNotificationProps {
    readonly notificationContent: JSX.Element;
}

export interface ExpiringNotificationActions {
    readonly removeNotification: () => void;
}

type Props = ExpiringNotificationProps & ExpiringNotificationActions;

export class ExpiringNotificationComponent extends React.Component<Props> {
    // tslint:disable-next-line:no-any
    timer: any;
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.teal,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 1,
    },
});
