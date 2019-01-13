import { connect } from 'react-redux';
import { Store } from '../../stores';
import { selectServerVersion } from '../../selectors/select_server_version';
import { AboutComponent, AboutComponentProps } from './about_component';

const mapStateToProps = (store: Store): AboutComponentProps => ({
    serverVersion: selectServerVersion(store),
});

export const AboutConnectedComponent = connect(mapStateToProps)(AboutComponent);
