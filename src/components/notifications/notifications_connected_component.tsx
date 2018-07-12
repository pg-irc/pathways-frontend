import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../application/store';
import { NotificationsProps, NotificationsActions, NotificationsComponent } from './notifications';
import * as model from '../../stores/notifications';
import * as selector from '../../selectors/notifications';

const mapStateToProps = (store: Store): NotificationsProps => ({
    notifications: selector.selectNotifications(store),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): NotificationsActions => ({
    removeNotification: (notificationId: model.Id): model.RemoveNotificationAction => dispatch(model.removeNotification(notificationId)),
});

export const NotificationsConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(NotificationsComponent);
