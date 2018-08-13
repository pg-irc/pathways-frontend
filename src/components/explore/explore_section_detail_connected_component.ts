import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { ExploreSectionDetailComponent, ExploreSectionDetailProps, ExploreSectionDetailActions } from './explore_section_detail_component';
import { selectExploreSection } from '../../selectors/explore/select_explore_section';
import { selectTaskForCurrentExploreSection } from '../../selectors/tasks/select_task_for_current_explore_section';
import { selectArticlesForExploreDetail } from '../../selectors/articles/select_articles_for_explore_detail';
import { RouterProps } from '../../application/routing';
import { addToSavedList, AddToSavedListAction, Id } from '../../stores/tasks';
import { pickSavedTaskIds } from '../../selectors/tasks/pick_saved_task_ids';

const mapStateToProps = (store: Store, ownProps: RouterProps): ExploreSectionDetailProps => ({
    section: selectExploreSection(store, ownProps),
    tasks: selectTaskForCurrentExploreSection(store, ownProps),
    articles: selectArticlesForExploreDetail(store, ownProps),
    savedTasksIdList: pickSavedTaskIds(store),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): ExploreSectionDetailActions => ({
    addToSavedList: (taskId: Id): AddToSavedListAction => dispatch(addToSavedList(taskId)),
});

export const ExploreSectionDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ExploreSectionDetailComponent);
