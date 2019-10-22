import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { HelpComponentActions, HelpComponent, HelpComponentProps } from './help_component';
import { clearAllUserData, ClearAllUserDataAction } from '../../stores/questionnaire/actions';
import { RouterProps } from '../../application/routing';
import {
    ClearManualUserLocationAction,
    clearManualUserLocation,
    SetManualUserLocationAction,
    setManualUserLocation,
} from '../../stores/manual_user_location';
import { selectManualUserLocation } from '../../selectors/services/select_manual_user_location';
import { LatLong } from '../../validation/search/types';

const mapStateToProps = (store: Store, ownProps: RouterProps): HelpComponentProps => ({
    history: ownProps.history,
    manualUserLocation: selectManualUserLocation(store),
});

type Actions = ClearAllUserDataAction | SetManualUserLocationAction | ClearManualUserLocationAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): HelpComponentActions => ({
    clearAllUserState: (): ClearAllUserDataAction => dispatch(clearAllUserData()),
    setManualUserLocation: (userLocation: LatLong): SetManualUserLocationAction => dispatch(setManualUserLocation(userLocation)),
    clearManualUserLocation: (): ClearManualUserLocationAction => dispatch(clearManualUserLocation()),
});

export const HelpConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(HelpComponent);
