import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../application/store';
import { ExploreAllComponent, ExploreAllProps, ExploreAllActions } from './explore_all';
import { selectExploreSections } from '../../selectors/explore';

const mapStateToProps = (store: Store): ExploreAllProps => ({
    sections: selectExploreSections(store),
});

const mapDispatchToProps = (_: Dispatch<Store>): ExploreAllActions => ({
});

export const ExploreAllConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ExploreAllComponent);
