import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { ExploreDetailComponent, ExploreDetailProps, ExploreDetailActions } from './explore_detail_component';
import { selectCurrentExploreSection } from '../../selectors/explore/select_current_explore_section';
import { selectTopicForCurrentExploreSection } from '../../selectors/topics/select_topic_for_current_explore_section';
import { RouterProps } from '../../application/routing';
import { addToSavedList, AddToSavedListAction, Id, RemoveFromSavedListAction, removeFromSavedList } from '../../stores/topics';
import { pickSavedTaskIds } from '../../selectors/topics/pick_saved_task_ids';

const mapStateToProps = (store: Store, ownProps: RouterProps): ExploreDetailProps => ({
    section: selectCurrentExploreSection(store, ownProps),
    topics: selectTopicForCurrentExploreSection(store, ownProps),
    savedTopicsIdList: pickSavedTaskIds(store),
});

type DispatchActions = AddToSavedListAction | RemoveFromSavedListAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): ExploreDetailActions => ({
    addToSavedList: (topicId: Id): AddToSavedListAction => dispatch(addToSavedList(topicId)),
    removeFromSavedList: (topicId: Id): RemoveFromSavedListAction => dispatch(removeFromSavedList(topicId)),
});

export const ExploreDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ExploreDetailComponent);
