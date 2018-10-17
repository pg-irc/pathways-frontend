import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { ExploreSectionDetailComponent, ExploreSectionDetailProps, ExploreSectionDetailActions } from './explore_section_detail_component';
import { selectCurrentExploreSection } from '../../selectors/explore/select_current_explore_section';
import { selectTaskForCurrentExploreSection } from '../../selectors/tasks/select_task_for_current_explore_section';
import { RouterProps } from '../../application/routing';
import { addToSavedList, AddToSavedListAction, Id } from '../../stores/tasks';
import { pickSavedTaskIds } from '../../selectors/tasks/pick_saved_task_ids';

const mapStateToProps = (store: Store, ownProps: RouterProps): ExploreSectionDetailProps => ({
    section: selectCurrentExploreSection(store, ownProps),
    tasks: selectTaskForCurrentExploreSection(store, ownProps),
    savedTasksIdList: pickSavedTaskIds(store),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): ExploreSectionDetailActions => ({
    addToSavedList: (taskId: Id): AddToSavedListAction => dispatch(addToSavedList(taskId)),
});

export const ExploreSectionDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ExploreSectionDetailComponent);
