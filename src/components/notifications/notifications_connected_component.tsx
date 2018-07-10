import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../application/store';
import { NotificationsActions, NotificationsComponent } from './notifications';
import { Store as NotificationsStore, Id, RemoveNotificationAction, removeNotification } from '../../stores/notifications';

const mapStateToProps = (store: Store): NotificationsStore => ({
    notifications: store.applicationState.notificationsInStore.notifications,
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): NotificationsActions => ({
    removeNotification: (notificationId: Id): RemoveNotificationAction => dispatch(removeNotification(notificationId)),
});

export const NotificationsConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(NotificationsComponent);
