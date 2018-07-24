import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { ExploreSectionComponent, ExploreSectionProps, ExploreSectionActions } from './explore_section';
import { selectLearnByPathParameter } from '../../selectors/explore';
import { selectTasksForLearnDetail } from '../../selectors/tasks';
import { RouterProps } from '../../application/routing';

const mapStateToProps = (store: Store, ownProps: RouterProps): ExploreSectionProps => ({
    section: selectLearnByPathParameter(store, ownProps.match.params.learnId),
    tasks: selectTasksForLearnDetail(store, ownProps.match.params.learnId),
});

const mapDispatchToProps = (_: Dispatch<Store>): ExploreSectionActions => ({
});

export const ExploreSectionConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ExploreSectionComponent);
