import { connect } from 'react-redux';
import { Store } from '../../stores';
import { ExploreAllComponent, ExploreAllProps, ExploreAllActions } from './explore_all_component';
import { selectExploreSectionList } from '../../selectors/explore/select_explore_section_list';
import { OpenHeaderMenuAction, openHeaderMenu } from '../../stores/user_experience/actions';
import { Dispatch } from 'redux';
import { pickRegion } from '../../selectors/region/pick_region';

const mapStateToProps = (store: Store): ExploreAllProps => ({
    sections: selectExploreSectionList(store),
    region: pickRegion(store),
});

const mapDispatchToProps = (dispatch: Dispatch<OpenHeaderMenuAction>): ExploreAllActions => ({
    openHeaderMenu: (): OpenHeaderMenuAction => dispatch(openHeaderMenu()),
});

export const ExploreAllConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ExploreAllComponent);
