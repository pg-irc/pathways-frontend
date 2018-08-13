import { connect } from 'react-redux';
import { Store } from '../../stores';
import { ExploreAllComponent, ExploreAllProps } from './explore_all';
import { selectExploreSectionList } from '../../selectors/explore/select_explore_section_list';

const mapStateToProps = (store: Store): ExploreAllProps => ({
    sections: selectExploreSectionList(store),
});

export const ExploreAllConnectedComponent = connect(mapStateToProps, {})(ExploreAllComponent);
