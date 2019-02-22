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

type Props = LoaderProps & MainComponentProps & RouterProps;

const mapStateToProps = (store: Store, ownProps: RouterProps): Props => ({
    loading: isApplicationLoading(store),
    history: ownProps.history,
    location: ownProps.location,
    match: ownProps.match,
    staticContext: ownProps.staticContext,
    locale: selectLocale(store),
});

const mapDispatchToProps = (dispatch: Dispatch<RouteChangedAction>): MainComponentActions => ({
    routeChanged: (location: Location, locale: Locale): RouteChangedAction => dispatch(routeChanged(location, locale)),
});

const componentWithLoader = withLoader<MainComponentProps>(MainComponent);

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(componentWithLoader);

export const MainConnectedComponent = withRouter(connectedComponent);
