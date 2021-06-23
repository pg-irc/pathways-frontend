import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { pickRegion } from '../../selectors/region/pick_region';
import { closeRegionDrawer, CloseRegionDrawerAction, OpenLanguageDrawerAction } from '../../stores/user_experience/actions';
import { RegionDrawerActions, RegionDrawerComponent, RegionDrawerProps } from './region_drawer_component';
import { SaveRegionAction, saveRegion } from '../../stores/user_profile';
import { RegionCode } from '../../validation/region/types';
import { selectLocale } from '../../selectors/locale/select_locale';
import { saveLocaleRequest, SaveLocaleRequestAction } from '../../stores/locale/actions';

const mapStateToProps = (store: Store): RegionDrawerProps => ({
    currentLocale: selectLocale(store),
    currentRegion: pickRegion(store),
});

type Actions = CloseRegionDrawerAction | SaveRegionAction | OpenLanguageDrawerAction | SaveLocaleRequestAction;
const mapDispatchToProps = (dispatch: Dispatch<Actions>): RegionDrawerActions => ({
    closeRegionDrawer: (): CloseRegionDrawerAction => dispatch(closeRegionDrawer()),
    saveLocale: (localeCode: string, flipOrientation: boolean): SaveLocaleRequestAction => dispatch(saveLocaleRequest(localeCode, flipOrientation)),
    saveRegion: (regionCode: RegionCode): SaveRegionAction => (dispatch(saveRegion(regionCode))),
});

export const RegionDrawerConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(RegionDrawerComponent);
