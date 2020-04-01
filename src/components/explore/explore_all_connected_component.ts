import { connect } from 'react-redux';
import { Store } from '../../stores';
import { ExploreAllComponent, ExploreAllProps, ExploreAllActions } from './explore_all_component';
import { selectExploreSectionList } from '../../selectors/explore/select_explore_section_list';
import { OpenHeaderMenuAction, openHeaderMenu } from '../../stores/header_menu';
import { Dispatch } from 'redux';

const mapStateToProps = (store: Store): ExploreAllProps => ({
    sections: selectExploreSectionList(store),
});

const mapDispatchToProps = (dispatch: Dispatch<OpenHeaderMenuAction>): ExploreAllActions => ({
    openHeaderMenu: (): OpenHeaderMenuAction => dispatch(openHeaderMenu()),
});

export const ExploreAllConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ExploreAllComponent);
