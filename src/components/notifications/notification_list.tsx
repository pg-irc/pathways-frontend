import React from 'react';
import * as R from 'ramda';
import { Id, RemoveNotificationAction } from '../../stores/notifications';
import { Notification }from '../../stores/notifications';
import { View } from 'native-base';
import { NotificationComponent } from './notification';
import { EmptyComponent } from '../empty_component/empty_component';

export interface NotificationsProps {
    readonly notifications: ReadonlyArray<Notification>;
}
export interface NotificationsActions {
    readonly removeNotification: (notificationId: Id) => RemoveNotificationAction;
}
type Props = NotificationsProps & NotificationsActions;

export const NotificationListComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    return R.empty(props.notifications) ? <EmptyComponent /> :
        (<View>
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
        </View>);
};
