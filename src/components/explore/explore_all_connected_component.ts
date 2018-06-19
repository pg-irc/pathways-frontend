import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../application/store';
import { ExploreAllComponent, ExploreAllProps, ExploreAllActions } from './explore_all';
import { selectExploreSections } from '../../selectors/explore';
import * as stores from '../../stores/explore';
import { SetExploreSectionPageAction, setExploreSectionPage } from '../../stores/page_switcher';

const mapStateToProps = (store: Store): ExploreAllProps => ({
    sections: selectExploreSections(store),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): ExploreAllActions => ({
    goToExploreSection: (sectionId: stores.Id): SetExploreSectionPageAction => dispatch(setExploreSectionPage(sectionId)),
});

export const ExploreAllConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ExploreAllComponent);
