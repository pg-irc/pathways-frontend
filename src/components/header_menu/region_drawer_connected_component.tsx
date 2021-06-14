import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { pickRegion } from '../../selectors/region/pick_region';
import { closeRegionDrawer, CloseRegionDrawerAction } from '../../stores/user_experience/actions';
import { RegionDrawerActions, RegionDrawerComponent, RegionDrawerProps } from './region_drawer_component';
import { SaveRegionAction, saveRegion } from '../../stores/user_profile';
import { RegionCode } from '../../validation/region/types';

const mapStateToProps = (store: Store): RegionDrawerProps => ({
    currentRegion: pickRegion(store),
});

const mapDispatchToProps = (dispatch: Dispatch<CloseRegionDrawerAction | SaveRegionAction>): RegionDrawerActions => ({
    closeRegionDrawer: (): CloseRegionDrawerAction => dispatch(closeRegionDrawer()),
    saveRegion: (regionCode: RegionCode): SaveRegionAction => (
        dispatch(saveRegion(regionCode))
    ),
});

export const RegionDrawerConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(RegionDrawerComponent);
