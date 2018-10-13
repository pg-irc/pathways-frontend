import { connect } from 'react-redux';
import { Store } from '../../stores';
import * as main from './main';
import { LoaderProps, withLoader } from './loader';
import { isApplicationLoading } from '../../selectors/is_application_loading';
import { selectLocale } from '../../selectors/locale/select_locale';
import { withRouter } from 'react-router-native';
import { RouterProps } from '../../application/routing';
import { Dispatch } from 'redux';
import { Location, Action } from 'history';
import { RouteChangedAction, routeChanged } from '../../stores/router_actions';

const mapStateToProps = (store: Store, ownProps: RouterProps): LoaderProps & main.Props & RouterProps => ({
    currentLocale: selectLocale(store),
    loading: isApplicationLoading(store),
    history: ownProps.history,
    location: ownProps.location,
    match: ownProps.match,
    staticContext: ownProps.staticContext,
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): main.Actions => ({
    routeChanged: (location: Location, _: Action): RouteChangedAction => dispatch(routeChanged(location)),
});

const MainComponent = withLoader<main.Props>(main.Component);
const connector = connect(mapStateToProps, mapDispatchToProps);
export const ConnectedComponent = withRouter(connector(MainComponent));
