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
import { UserLocation } from '../../validation/latlong/types';
import { OpenHeaderMenuAction, openHeaderMenu } from '../../stores/user_experience/actions';
import { BuildServicesRequestAction, buildServicesRequest } from '../../stores/services/actions';
import { selectCustomLatLong } from '../../selectors/user_profile/select_custom_latlong';
import { selectHelpTopicForRegion } from '../../selectors/topics/select_help_topic_for_region';
import { pickRegion } from '../../selectors/region/pick_region';

const mapStateToProps = (store: Store, ownProps: RouterProps): HelpComponentProps => ({
    topicId: selectHelpTopicForRegion(store),
    history: ownProps.history,
    manualUserLocation: selectManualUserLocation(store),
    customLatLong: selectCustomLatLong(store),
    region: pickRegion(store),
    }
);

type Actions = ClearAllUserDataAction | SetManualUserLocationAction |
     ClearManualUserLocationAction | OpenHeaderMenuAction| BuildServicesRequestAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): HelpComponentActions => ({
    clearAllUserState: (): ClearAllUserDataAction => dispatch(clearAllUserData()),
    setManualUserLocation: (userLocation: UserLocation): SetManualUserLocationAction => dispatch(setManualUserLocation(userLocation)),
    clearManualUserLocation: (): ClearManualUserLocationAction => dispatch(clearManualUserLocation()),
    openHeaderMenu: (): OpenHeaderMenuAction => dispatch(openHeaderMenu()),
    dispatchServicesRequest: (topicId: string, manualUserLocation?: UserLocation): BuildServicesRequestAction =>
    dispatch(buildServicesRequest(topicId, manualUserLocation)),
});

export const HelpConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(HelpComponent);
