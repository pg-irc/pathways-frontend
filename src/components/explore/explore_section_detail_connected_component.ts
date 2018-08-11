import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { ExploreSectionDetailComponent, ExploreSectionDetailProps, ExploreSectionDetailActions } from './explore_section_detail_component';
import { selectExploreSection } from '../../selectors/explore/select_explore_section';
import { selectTasksForLearn, selectSavedTasksIdList } from '../../selectors/tasks';
import { selectArticlesForExploreDetail } from '../../selectors/articles/select_articles_for_explore_detail';
import { RouterProps } from '../../application/routing';
import { addToSavedList, AddToSavedListAction, Id } from '../../stores/tasks';

const mapStateToProps = (store: Store, ownProps: RouterProps): ExploreSectionDetailProps => ({
    section: selectExploreSection(store, ownProps),
    tasks: selectTasksForLearn(store, ownProps),
    articles: selectArticlesForExploreDetail(store, ownProps),
    savedTasksIdList: selectSavedTasksIdList(store),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): ExploreSectionDetailActions => ({
    addToSavedList: (taskId: Id): AddToSavedListAction => dispatch(addToSavedList(taskId)),
});

export const ExploreSectionDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ExploreSectionDetailComponent);
