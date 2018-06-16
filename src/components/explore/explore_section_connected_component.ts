import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../application/store';
import { ExploreSectionComponent, ExploreSectionProps, ExploreSectionActions } from './explore_section';
import { selectCurrentExploreSection } from '../../selectors/explore';
import { selectTasksForCurrentExploreSection } from '../../selectors/tasks';

const mapStateToProps = (store: Store): ExploreSectionProps => ({
    section: selectCurrentExploreSection(store),
    tasks: selectTasksForCurrentExploreSection(store),
});

const mapDispatchToProps = (_: Dispatch<Store>): ExploreSectionActions => ({
});

export const ExploreSectionConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ExploreSectionComponent);
