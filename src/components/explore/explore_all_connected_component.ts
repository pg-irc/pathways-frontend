import { connect } from 'react-redux';
import { Store } from '../../stores';
import { ExploreAllComponent, ExploreAllProps } from './explore_all';
import { selectLearnSections } from '../../selectors/explore';

const mapStateToProps = (store: Store): ExploreAllProps => ({
    sections: selectLearnSections(store),
});

export const ExploreAllConnectedComponent = connect(mapStateToProps, {})(ExploreAllComponent);
