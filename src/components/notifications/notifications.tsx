// tslint:disable:no-expression-statement
import React from 'react';
import * as R from 'ramda';
import { Id, RemoveNotificationAction, NotificationType } from '../../stores/notifications';
import { Notification } from '../../stores/notifications';
import { View } from 'native-base';
import { ExpiringNotificationComponent } from './expiring_notification';
import { EmptyComponent } from '../empty_component/empty_component';
import { RouterProps } from '../../application/routing';
import { topicAddedNotification, topicRemovedNotification } from './notification_content';

export interface NotificationsProps {
    readonly notifications: ReadonlyArray<Notification>;
}

export interface NotificationsActions {
    readonly removeNotification: (notificationId: Id) => RemoveNotificationAction;
}

type Props = NotificationsProps & NotificationsActions & RouterProps;

export const NotificationsComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    return R.isEmpty(props.notifications) ? <EmptyComponent /> :
        (<View>
            {R.map((notification: Notification) => {
                const notificationComponent = getComponentForNotification(notification, props);
                return <View key={notification.id}>{notificationComponent}</View>;
            }, props.notifications)}
        </View>);
};

const getComponentForNotification = (notification: Notification, props: Props): JSX.Element => {
    const removeNotification = (): RemoveNotificationAction => props.removeNotification(notification.id);
    if (notification.type === NotificationType.TopicAddedToPlan) {
        return buildExpiringNotification(topicAddedNotification(), removeNotification);
    }
    if (notification.type === NotificationType.TopicRemovedFromPlan) {
        return buildExpiringNotification(topicRemovedNotification(), removeNotification);
    }
    return <EmptyComponent />;
};

const buildExpiringNotification = (notificationContent: JSX.Element, removeNotification: () => RemoveNotificationAction): JSX.Element => {
    const notificationProps = { notificationContent, removeNotification };
    return <ExpiringNotificationComponent {...notificationProps} />;
};
