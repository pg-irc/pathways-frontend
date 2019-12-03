import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { ExploreDetailComponent, ExploreDetailProps, ExploreDetailActions } from './explore_detail_component';
import { selectCurrentExploreSection } from '../../selectors/explore/select_current_explore_section';
import { selectTopicForCurrentExploreSection } from '../../selectors/topics/select_topic_for_current_explore_section';
import { RouterProps } from '../../application/routing';
import { addTopicToSavedList, AddTopicToSavedListAction, Id, RemoveTopicFromSavedListAction, removeTopicFromSavedList } from '../../stores/topics';
import { pickSavedTopicIds } from '../../selectors/topics/pick_saved_topic_ids';

const mapStateToProps = (store: Store, ownProps: RouterProps): ExploreDetailProps => ({
    section: selectCurrentExploreSection(store, ownProps),
    topics: selectTopicForCurrentExploreSection(store, ownProps),
    savedTopicsIdList: pickSavedTopicIds(store),
});

type DispatchActions = AddTopicToSavedListAction | RemoveTopicFromSavedListAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): ExploreDetailActions => ({
    addTopicToSavedList: (topicId: Id): AddTopicToSavedListAction => dispatch(addTopicToSavedList(topicId)),
    removeTopicFromSavedList: (topicId: Id): RemoveTopicFromSavedListAction => dispatch(removeTopicFromSavedList(topicId)),
});

export const ExploreDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ExploreDetailComponent);
