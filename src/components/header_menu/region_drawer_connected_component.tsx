import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { pickRegion } from '../../selectors/region/pick_region';
import { closeRegionDrawer, CloseRegionDrawerAction } from '../../stores/user_experience/actions';
import { RegionDrawerActions, RegionDrawerComponent, RegionDrawerProps } from './region_drawer_component';

const mapStateToProps = (store: Store): RegionDrawerProps => ({
    currentRegion: pickRegion(store),
});

const mapDispatchToProps = (dispatch: Dispatch<CloseRegionDrawerAction>): RegionDrawerActions => ({
    closeRegionDrawer: (): CloseRegionDrawerAction => dispatch(closeRegionDrawer()),
});

export const RegionDrawerConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(RegionDrawerComponent);
