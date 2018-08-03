import React from 'react';
import * as R from 'ramda';
import { Id, RemoveNotificationAction } from '../../stores/notifications';
import { Notification, NotificationList }from '../../selectors/notifications';
import { View } from 'native-base';
import { NotificationComponent } from './notification';
import { EmptyComponent } from '../empty_component/empty_component';

export interface NotificationsProps {
    readonly notifications: NotificationList;
}
export interface NotificationsActions {
    readonly removeNotification: (notificationId: Id) => RemoveNotificationAction;
}
type Props = NotificationsProps & NotificationsActions;

export const NotificationsComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    return R.keys(props.notifications).length > 0 ? <Notifications {...props} /> : <EmptyComponent />;
};

const Notifications: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    return (
        <View>
            {R.map((notification: Notification) => {
                const timeElapsedCallback = (): RemoveNotificationAction => props.removeNotification(notification.id);
                return (
                    <View key={notification.id}>
                        <NotificationComponent
                            notification={notification}
                            timeElapsedCallback={timeElapsedCallback} />
                    </View>
                );
            }, props.notifications)}
        </View>
    );
};
