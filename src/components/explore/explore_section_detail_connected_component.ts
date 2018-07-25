import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { ExploreSectionDetailComponent, ExploreSectionDetailProps, ExploreSectionDetailActions } from './explore_section_detail_component';
import { selectLearn } from '../../selectors/explore';
import { selectTasksForLearn } from '../../selectors/tasks';
import { selectArticlesForLearnDetail } from '../../selectors/articles';
import { RouterProps } from '../../application/routing';
import { addToSavedList, AddToSavedListAction, Id } from '../../stores/tasks';

const mapStateToProps = (store: Store, ownProps: RouterProps): ExploreSectionDetailProps => ({
    section: selectLearn(store, ownProps),
    tasks: selectTasksForLearn(store, ownProps),
    articles: selectArticlesForLearnDetail(store, ownProps),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): ExploreSectionDetailActions => ({
    addToSavedList: (taskId: Id): AddToSavedListAction => dispatch(addToSavedList(taskId)),
});

export const ExploreSectionDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ExploreSectionDetailComponent);
