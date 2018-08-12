import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { NotificationsProps, NotificationsActions, NotificationListComponent } from './notification_list';
import { Id, RemoveNotificationAction, removeNotification } from '../../stores/notifications';
import { selectNotifications } from '../../selectors/select_notifications';

const mapStateToProps = (store: Store): NotificationsProps => ({
    notifications: selectNotifications(store),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): NotificationsActions => ({
    removeNotification: (notificationId: Id): RemoveNotificationAction => dispatch(removeNotification(notificationId)),
});

export const NotificationsConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(NotificationListComponent);
