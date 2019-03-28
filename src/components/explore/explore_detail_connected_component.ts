import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { ExploreDetailComponent, ExploreDetailProps, ExploreDetailActions } from './explore_detail_component';
import { selectCurrentExploreSection } from '../../selectors/explore/select_current_explore_section';
import { selectTaskForCurrentExploreSection } from '../../selectors/topics/select_task_for_current_explore_section';
import { RouterProps } from '../../application/routing';
import { addToSavedList, AddToSavedListAction, Id, RemoveFromSavedListAction, removeFromSavedList } from '../../stores/topics';
import { pickSavedTaskIds } from '../../selectors/topics/pick_saved_task_ids';

const mapStateToProps = (store: Store, ownProps: RouterProps): ExploreDetailProps => ({
    section: selectCurrentExploreSection(store, ownProps),
    tasks: selectTaskForCurrentExploreSection(store, ownProps),
    savedTasksIdList: pickSavedTaskIds(store),
});

type DispatchActions = AddToSavedListAction | RemoveFromSavedListAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): ExploreDetailActions => ({
    addToSavedList: (taskId: Id): AddToSavedListAction => dispatch(addToSavedList(taskId)),
    removeFromSavedList: (taskId: Id): RemoveFromSavedListAction => dispatch(removeFromSavedList(taskId)),
});

export const ExploreDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ExploreDetailComponent);
