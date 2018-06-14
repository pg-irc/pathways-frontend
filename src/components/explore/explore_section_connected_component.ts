import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../application/store';
import { ExploreSectionComponent, ExploreSectionProps, ExploreSectionActions } from './explore_section';

const mapStateToProps = (_: Store): ExploreSectionProps => ({
});

const mapDispatchToProps = (_: Dispatch<Store>): ExploreSectionActions => ({
});

export const ExploreAllConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ExploreSectionComponent);
