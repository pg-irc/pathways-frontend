import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { MainComponentProps, MainComponent, MainComponentActions } from './main_component';
import { LoaderProps, withLoader } from './loader';
import { isApplicationLoading } from '../../selectors/is_application_loading';
import { withRouter } from 'react-router-native';
import { RouterProps } from '../../application/routing';
import { Location } from 'history';
import { RouteChangedAction, routeChanged } from '../../stores/router_actions';
import { selectLocale } from '../../selectors/locale/select_locale';
import { Locale } from '../../locale';
import { selectShowOnboarding } from '../../selectors/user_profile/select_show_onboarding';
import { selectIsLocaleSet } from '../../selectors/locale/select_is_locale_set';
import { 
    CloseHeaderMenuAction, closeHeaderMenu, OpenHeaderMenuAction, openHeaderMenu, CloseAboutModalAction, closeAboutModal,
    openAboutModal, CloseDisclaimerModalAction, closeDisclaimerModal, OpenAboutModalAction, OpenDisclaimerModalAction, openDisclaimerModal,
} from '../../stores/user_experience/actions';
import { selectIsHeaderMenuVisible } from '../../selectors/user_experience/select_is_header_menu_visible';
import { selectIsAboutModalVisible } from '../../selectors/user_experience/select_is_about_modal_visible';
import { selectIsDisclaimerModalVisible } from '../../selectors/user_experience/select_is_disclaimer_modal_visible';

type Props = LoaderProps & MainComponentProps & RouterProps;

export interface OnboardingProps {
    readonly showOnboarding: boolean;
}

const mapStateToProps = (store: Store, ownProps: RouterProps): Props => ({
    loading: isApplicationLoading(store),
    history: ownProps.history,
    location: ownProps.location,
    match: ownProps.match,
    staticContext: ownProps.staticContext,
    locale: selectLocale(store),
    localeIsSet: selectIsLocaleSet(store),
    showOnboarding: selectShowOnboarding(store),
    isHeaderMenuVisible: selectIsHeaderMenuVisible(store),
    isAboutModalVisible: selectIsAboutModalVisible(store),
    isDisclaimerModalVisible: selectIsDisclaimerModalVisible(store),
});

type Actions =
    RouteChangedAction |
    CloseHeaderMenuAction |
    OpenHeaderMenuAction |
    CloseAboutModalAction |
    OpenAboutModalAction |
    CloseDisclaimerModalAction |
    OpenDisclaimerModalAction |
    RouteChangedAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): MainComponentActions => ({
    sendAnalyticsData: (location: Location, locale: Locale): RouteChangedAction => dispatch(routeChanged(location, locale)),
    closeHeaderMenu: (): CloseHeaderMenuAction => dispatch(closeHeaderMenu()),
    openHeaderMenu: (): OpenHeaderMenuAction => dispatch(openHeaderMenu()),
    closeAboutModal: (): CloseAboutModalAction => dispatch(closeAboutModal()),
    openAboutModal: (): OpenAboutModalAction => dispatch(openAboutModal()),
    closeDisclaimerModal: (): CloseDisclaimerModalAction => dispatch(closeDisclaimerModal()),
    openDisclaimerModal: (): OpenDisclaimerModalAction => dispatch(openDisclaimerModal()),
});

const componentWithLoader = withLoader<MainComponentProps>(MainComponent);

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(componentWithLoader);

export const MainConnectedComponent = withRouter(connectedComponent);
