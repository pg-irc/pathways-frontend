import React from 'react';
import * as R from 'ramda';
import { View } from 'native-base';
import { Id, Store, Notification, NotificationType, RemoveNotificationAction } from '../../stores/notifications';
import { ExpiringNotificationComponent } from './expiring_notification';
import { StyleSheet } from 'react-native';
import { colors } from '../../application/styles';

export interface NotificationsActions {
    readonly removeNotification: (notificationId: Id) => RemoveNotificationAction;
}
type AllNotificationsProps = Store & NotificationsActions;

export const NotificationsComponent: React.StatelessComponent<AllNotificationsProps> = (props: AllNotificationsProps): JSX.Element => {
    // tslint:disable-next-line:no-null-keyword
    return R.keys(props.notifications).length > 0 ? renderNotifications(props) : null;
};

const renderNotifications = (props: AllNotificationsProps): JSX.Element => {
    return (
        <View>
            {R.map((notificationId: Id) => {
                return (
                    <View key={notificationId} style={styles.stackedNotification}>
                        {renderNotification(props.notifications[notificationId], props)}
                    </View>
                );
            }, R.keys(props.notifications))}
        </View>
    );
};

const renderNotification = (notification: Notification, props: AllNotificationsProps): JSX.Element => {
    switch (notification.type) {
        default:
        case NotificationType.Expiring:
            return (
                <ExpiringNotificationComponent
                    notification={notification}
                    timeInSeconds={1}
                    timeElapsedCallback={(): RemoveNotificationAction => props.removeNotification(notification.id)}
                />
            );
    }
};

const styles = StyleSheet.create({
    stackedNotification: {
        backgroundColor: colors.lighterGrey,
        position: 'absolute',
        padding: 10,
        bottom: 20,
        left: 5,
        right: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
