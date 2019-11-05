import { Dispatch } from 'redux';
import { Location, History } from 'history';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { HeaderProps, HeaderActions, HeaderComponent } from './header_component';
import { selectLocale } from '../../selectors/locale/select_locale';
import {
    Id as TopicId, RemoveFromSavedListAction, AddToSavedListAction,
    addToSavedList, removeFromSavedList,
} from '../../stores/topics';
import { pickSavedTopicIds } from '../../selectors/topics/pick_saved_topic_ids';

type OwnProps = {
    readonly history: History,
    readonly location: Location,
    readonly onHeaderMenuButtonPress: () => void;
};

const mapStateToProps = (store: Store, ownProps: OwnProps): HeaderProps => ({
    currentLocale: selectLocale(store),
    savedTasksIdList: pickSavedTopicIds(store),
    history: ownProps.history,
    location: ownProps.location,
});

type DispatchActions = AddToSavedListAction | RemoveFromSavedListAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>, ownProps: OwnProps): HeaderActions => ({
    addBookmark: (topicId: TopicId): AddToSavedListAction => dispatch(addToSavedList(topicId)),
    removeBookmark: (topicId: TopicId): RemoveFromSavedListAction => dispatch(removeFromSavedList(topicId)),
    onHeaderMenuButtonPress: ownProps.onHeaderMenuButtonPress,
});

export const HeaderConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
