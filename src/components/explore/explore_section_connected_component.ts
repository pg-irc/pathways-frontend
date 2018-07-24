import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { ExploreSectionComponent, ExploreSectionProps, ExploreSectionActions } from './explore_section';
import { selectLearn } from '../../selectors/explore';
import { selectTasksForLearn } from '../../selectors/tasks';
import { RouterProps } from '../../application/routing';
import { addToSavedList, AddToSavedListAction, Id } from '../../stores/tasks';

const mapStateToProps = (store: Store, ownProps: RouterProps): ExploreSectionProps => ({
    section: selectLearn(store, ownProps),
    tasks: selectTasksForLearn(store, ownProps),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): ExploreSectionActions => ({
    addToSavedList: (taskId: Id): AddToSavedListAction => dispatch(addToSavedList(taskId)),
});

export const ExploreSectionConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ExploreSectionComponent);
