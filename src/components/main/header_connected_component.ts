import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { HeaderProps, HeaderActions, HeaderComponent } from './header_component';
import { selectLocale } from '../../selectors/locale/select_locale';
import {
    Id as TopicId, RemoveTopicFromSavedListAction, AddTopicToSavedListAction,
    addTopicToSavedList, removeTopicFromSavedList,
} from '../../stores/topics';
import { pickSavedTopicIds } from '../../selectors/topics/pick_saved_topic_ids';

const mapStateToProps = (store: Store): HeaderProps => ({
    currentLocale: selectLocale(store),
    savedTasksIdList: pickSavedTopicIds(store),
});

type DispatchActions = AddTopicToSavedListAction | RemoveTopicFromSavedListAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): HeaderActions => ({
    addBookmark: (topicId: TopicId): AddTopicToSavedListAction => dispatch(addTopicToSavedList(topicId)),
    removeBookmark: (topicId: TopicId): RemoveTopicFromSavedListAction => dispatch(removeTopicFromSavedList(topicId)),
});

export const HeaderConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
