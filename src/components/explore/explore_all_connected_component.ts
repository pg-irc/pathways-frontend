import { connect } from 'react-redux';
import { Store } from '../../application/store';
import { ExploreAllComponent, ExploreAllProps } from './explore_all';
import { selectExploreSections } from '../../selectors/explore';

const mapStateToProps = (store: Store): ExploreAllProps => ({
    sections: selectExploreSections(store),
});

export const ExploreAllConnectedComponent = connect(mapStateToProps, {})(ExploreAllComponent);
