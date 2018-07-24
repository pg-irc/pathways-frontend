import { connect } from 'react-redux';
import { Store } from '../../stores';
import * as main from './main';
import { LoaderProps, withLoader } from './loader';
import { isApplicationLoading } from '../../selectors/application_loading';
import { selectLocale } from '../../selectors/locale';
import { withRouter } from 'react-router-native';
import { RouterProps } from '../../application/routing';

const mapStateToProps = (store: Store, ownProps: RouterProps): LoaderProps & main.Props & RouterProps => ({
    currentLocale: selectLocale(store),
    loading: isApplicationLoading(store),
    history: ownProps.history,
    location: ownProps.location,
    match: ownProps.match,
    staticContext: ownProps.staticContext,
});

const MainComponent = withLoader<main.Props>(main.Component);
const connector = connect(mapStateToProps, {});
export const ConnectedComponent = withRouter(connector(MainComponent));
