import { connect } from 'react-redux';
import { RouterProps } from '../../application/routing';
import { Dispatch } from 'redux';
import { AnalyticsLinkPressedAction, analyticsLinkPressed, AnalyticsLinkProps } from '../../stores/analytics';
import { OpenHeaderMenuAction, openHeaderMenu, SaveOrganizationServicesOffsetAction, saveOrganizationServicesOffset } from '../../stores/user_experience/actions';
import { OrganizationDetailComponent, OrganizationDetailActions, OrganizationDetailProps } from './organization_detail_component';
import { HumanServiceData } from '../../validation/services/types';
import { selectOrganizationServicesOffset } from '../../selectors/user_experience/select_organization_services_offset';
import { Store } from '../../stores';
import { BookmarkServiceAction, bookmarkService, UnbookmarkServiceAction, unbookmarkService, OpenServiceAction, openServiceDetail } from '../../stores/services/actions';

const mapStateToProps = (store: Store, ownProps: RouterProps): OrganizationDetailProps => ({
    history: ownProps.history,
    organizationServicesOffset: selectOrganizationServicesOffset(store),
});

type Actions =
    AnalyticsLinkPressedAction |
    OpenHeaderMenuAction |
    SaveOrganizationServicesOffsetAction |
    BookmarkServiceAction | 
    UnbookmarkServiceAction |
    OpenServiceAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): OrganizationDetailActions => ({
    analyticsLinkPressed: (analyticsLinkProps: AnalyticsLinkProps): AnalyticsLinkPressedAction =>
        dispatch(analyticsLinkPressed(analyticsLinkProps)),
    bookmarkService: (service: HumanServiceData): BookmarkServiceAction => dispatch(bookmarkService(service)),
    unbookmarkService: (service: HumanServiceData): UnbookmarkServiceAction => dispatch(unbookmarkService(service)),
    openHeaderMenu: (): OpenHeaderMenuAction => dispatch(openHeaderMenu()),
    openServiceDetail: (service: HumanServiceData): OpenServiceAction => dispatch(openServiceDetail(service)),
    saveOrganizationServicesOffset: (offset: number): SaveOrganizationServicesOffsetAction => dispatch(saveOrganizationServicesOffset(offset)),
});

export const OrganizationDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(OrganizationDetailComponent);
