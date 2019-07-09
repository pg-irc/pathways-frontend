import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { HeaderProps, HeaderActions, HeaderComponent } from './header_component';
import { selectLocale } from '../../selectors/locale/select_locale';
import {
    Id as TopicId, RemoveFromSavedListAction, AddToSavedListAction,
    addToSavedList, removeFromSavedList,
} from '../../stores/topics';
import { pickSavedTopicIds } from '../../selectors/topics/pick_saved_topic_ids';

const mapStateToProps = (store: Store): HeaderProps => ({
    currentLocale: selectLocale(store),
    savedTasksIdList: pickSavedTopicIds(store),
});

type DispatchActions = AddToSavedListAction | RemoveFromSavedListAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): HeaderActions => ({
    addBookmark: (topicId: TopicId): AddToSavedListAction => dispatch(addToSavedList(topicId)),
    removeBookmark: (topicId: TopicId): RemoveFromSavedListAction => dispatch(removeFromSavedList(topicId)),
});

export const HeaderConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
