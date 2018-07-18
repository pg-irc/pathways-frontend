import React from 'react';
import * as R from 'ramda';
import * as model from '../../stores/notifications';
import * as selector from '../../selectors/notifications';
import { View } from 'native-base';
import { NotificationComponent } from './notification';
import { StyleSheet } from 'react-native';
import { colors } from '../../application/styles';

export interface NotificationsProps {
    readonly notifications: ReadonlyArray<selector.Notification>;
}
export interface NotificationsActions {
    readonly removeNotification: (notificationId: model.Id) => model.RemoveNotificationAction;
}
type AllNotificationsProps = NotificationsProps & NotificationsActions;

export const NotificationsComponent: React.StatelessComponent<AllNotificationsProps> = (props: AllNotificationsProps): JSX.Element => {
    // tslint:disable-next-line:no-null-keyword
    return R.keys(props.notifications).length > 0 ? renderNotifications(props) : null;
};

const renderNotifications = (props: AllNotificationsProps): JSX.Element => {
    return (
        <View>
            {R.map((notification: selector.Notification) => {
                return (
                    <View key={notification.id} style={styles.stackedNotification}>
                        {renderNotification(notification, props)}
                    </View>
                );
            }, props.notifications)}
        </View>
    );
};

const renderNotification = (notification: selector.Notification, props: AllNotificationsProps): JSX.Element => {
    switch (notification.type) {
        default:
        case model.NotificationType.TaskAddedToPlan:
            return (
                <NotificationComponent
                    notification={notification}
                    timeInSeconds={1}
                    timeElapsedCallback={(): model.RemoveNotificationAction => props.removeNotification(notification.id)}
                />
            );
    }
};

const styles = StyleSheet.create({
    stackedNotification: {
        backgroundColor: colors.darkGrey,
        position: 'absolute',
        padding: 10,
        bottom: 20,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
