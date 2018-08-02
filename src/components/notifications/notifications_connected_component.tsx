import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { NotificationsProps, NotificationsActions, NotificationsComponent } from './notifications';
import { Id, RemoveNotificationAction, removeNotification } from '../../stores/notifications';
import { selectNotifications } from '../../selectors/notifications';
import { selectRecommendedTasks } from '../../selectors/tasks';

const mapStateToProps = (store: Store): NotificationsProps => ({
    notifications: selectNotifications(store),
    notificationParameters: {
        recommendedTasks: selectRecommendedTasks(store),
    },
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): NotificationsActions => ({
    removeNotification: (notificationId: Id): RemoveNotificationAction => dispatch(removeNotification(notificationId)),
});

export const NotificationsConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(NotificationsComponent);
