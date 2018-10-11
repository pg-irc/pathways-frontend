import { connect } from 'react-redux';
import { Store } from '../../stores';
import { MainComponentProps, MainComponent } from './main_component';
import { LoaderProps, withLoader } from './loader';
import { isApplicationLoading } from '../../selectors/is_application_loading';
import { selectLocale } from '../../selectors/locale/select_locale';
import { withRouter } from 'react-router-native';
import { RouterProps } from '../../application/routing';

type Props = LoaderProps & MainComponentProps & RouterProps;

const mapStateToProps = (store: Store, ownProps: RouterProps): Props => ({
    currentLocale: selectLocale(store),
    loading: isApplicationLoading(store),
    history: ownProps.history,
    location: ownProps.location,
    match: ownProps.match,
    staticContext: ownProps.staticContext,
});

const componentWithLoader = withLoader<MainComponentProps>(MainComponent);

const connectedComponent = connect(mapStateToProps)(componentWithLoader);

export const MainConnectedComponent = withRouter(connectedComponent);
