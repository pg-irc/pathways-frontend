import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../application/store';
import { ExploreSectionComponent, ExploreSectionProps, ExploreSectionActions } from './explore_section';
import { selectExploreSectionByPathParameter } from '../../selectors/explore';
import { selectTasksForCurrentExploreSection } from '../../selectors/tasks';
import { RouterProps } from '../../application/routing';

const mapStateToProps = (store: Store, ownProps: RouterProps): ExploreSectionProps => ({
    section: selectExploreSectionByPathParameter(store, ownProps.match.params.learnId),
    tasks: selectTasksForCurrentExploreSection(store),
});

const mapDispatchToProps = (_: Dispatch<Store>): ExploreSectionActions => ({
});

export const ExploreSectionConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ExploreSectionComponent);
