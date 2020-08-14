import { connect } from 'react-redux';
import { RouterProps } from '../../application/routing';
import { Dispatch } from 'redux';
import * as actions from '../../stores/services/actions';
import { AnalyticsLinkPressedAction, analyticsLinkPressed } from '../../stores/analytics';
import { OpenHeaderMenuAction, openHeaderMenu, SaveOrganizationServicesOffsetAction, saveOrganizationServicesOffset } from '../../stores/user_experience/actions';
import { OrganizationDetailComponent, OrganizationDetailActions, OrganizationDetailProps } from './organization_detail_component';
import { HumanServiceData } from '../../validation/services/types';
import { selectOrganizationServicesOffset } from '../../selectors/user_experience/select_organization_services_offset';
import { Store } from '../../stores';

const mapStateToProps = (store: Store, ownProps: RouterProps): OrganizationDetailProps => {
    return {
        history: ownProps.history,
        organizationServicesOffset: selectOrganizationServicesOffset(store),
    };
};

type Actions =
    AnalyticsLinkPressedAction |
    OpenHeaderMenuAction |
    SaveOrganizationServicesOffsetAction |
    actions.ServicesAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): OrganizationDetailActions => ({
    analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string): AnalyticsLinkPressedAction =>
        dispatch(analyticsLinkPressed(currentPath, linkContext, linkType, linkValue)),
    bookmarkService: (service: HumanServiceData): actions.BookmarkServiceAction => dispatch(actions.bookmarkService(service)),
    unbookmarkService: (service: HumanServiceData): actions.UnbookmarkServiceAction => dispatch(actions.unbookmarkService(service)),
    openHeaderMenu: (): OpenHeaderMenuAction => dispatch(openHeaderMenu()),
    openServiceDetail: (service: HumanServiceData): actions.OpenServiceAction => dispatch(actions.openServiceDetail(service)),
    saveOrganizationServicesOffset: (offset: number): SaveOrganizationServicesOffsetAction => dispatch(saveOrganizationServicesOffset(offset)),
});

export const OrganizationDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(OrganizationDetailComponent);
