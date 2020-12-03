import { connect } from 'react-redux';
import { RouterProps } from '../../application/routing';
import { Dispatch } from 'redux';
import { AnalyticsLinkPressedAction, analyticsLinkPressed, AnalyticsLinkProps } from '../../stores/analytics';
import { OpenHeaderMenuAction, openHeaderMenu, SaveOrganizationServicesScrollOffsetAction, saveOrganizationServicesScrollOffset } from '../../stores/user_experience/actions';
import { OrganizationComponent, OrganizationActions, OrganizationProps } from './organization_component';
import { HumanServiceData } from '../../validation/services/types';
import { selectOrganizationServicesOffset } from '../../selectors/user_experience/select_organization_services_offset';
import { Store } from '../../stores';
import { BookmarkServiceAction, bookmarkService, UnbookmarkServiceAction, unbookmarkService, OpenServiceAction, openServiceDetail } from '../../stores/services/actions';
import { selectBookmarkedServicesIds } from '../../selectors/services/select_bookmarked_services_ids';
import { selectOrganizationById } from '../../selectors/organizations/select_organization_by_id';
import { selectServicesForOrganization } from '../../selectors/services/select_services_for_organization';
import { saveOrganizationTab, SaveOrganizationTabAction } from '../../stores/organization/actions';
import { selectOrganizationTab } from '../../selectors/organizations/select_organization_tab';

const mapStateToProps = (store: Store, ownProps: RouterProps): OrganizationProps => ({
    history: ownProps.history,
    organization: selectOrganizationById(store, ownProps.match.params.organizationId),
    organizationTab: selectOrganizationTab(store),
    servicesForOrganization: selectServicesForOrganization(store, ownProps.match.params.organizationId),
    organizationServicesOffset: selectOrganizationServicesOffset(store),
    bookmarkedServicesIds: selectBookmarkedServicesIds(store),
});

type Actions =
    AnalyticsLinkPressedAction |
    OpenHeaderMenuAction |
    SaveOrganizationTabAction |
    SaveOrganizationServicesScrollOffsetAction |
    BookmarkServiceAction |
    UnbookmarkServiceAction |
    OpenServiceAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): OrganizationActions => ({
    analyticsLinkPressed: (analyticsLinkProps: AnalyticsLinkProps): AnalyticsLinkPressedAction =>
        dispatch(analyticsLinkPressed(analyticsLinkProps)),
    bookmarkService: (service: HumanServiceData): BookmarkServiceAction => dispatch(bookmarkService(service)),
    unbookmarkService: (service: HumanServiceData): UnbookmarkServiceAction => dispatch(unbookmarkService(service)),
    openHeaderMenu: (): OpenHeaderMenuAction => dispatch(openHeaderMenu()),
    openServiceDetail: (service: HumanServiceData): OpenServiceAction => dispatch(openServiceDetail(service)),
    saveOrganizationTab: (index: number): SaveOrganizationTabAction => dispatch(saveOrganizationTab(index)),
    saveOrganizationServicesOffset: (offset: number): SaveOrganizationServicesScrollOffsetAction =>
        dispatch(saveOrganizationServicesScrollOffset(offset)),
});

export const OrganizationConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(OrganizationComponent);
