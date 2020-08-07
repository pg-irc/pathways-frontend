import { connect } from 'react-redux';
import { RouterProps } from '../../application/routing';
import { Dispatch } from 'redux';
import { AnalyticsLinkPressedAction, analyticsLinkPressed } from '../../stores/analytics';
import { OpenHeaderMenuAction, openHeaderMenu } from '../../stores/user_experience/actions';
import { OrganizationDetailComponent, OrganizationDetailActions, OrganizationDetailProps } from './organization_detail_component';

const mapStateToProps = (ownProps: RouterProps): OrganizationDetailProps => {
    return {
        history: ownProps.history,
    };
};

type Actions =
    AnalyticsLinkPressedAction |
    OpenHeaderMenuAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): OrganizationDetailActions => ({
    analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string): AnalyticsLinkPressedAction =>
        dispatch(analyticsLinkPressed(currentPath, linkContext, linkType, linkValue)),
    openHeaderMenu: (): OpenHeaderMenuAction => dispatch(openHeaderMenu()),
});

export const OrganizationDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(OrganizationDetailComponent);
