import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { HelpComponent, HelpComponentProps, HelpComponentActions } from './help_component';

const mapStateToProps = (_: Store): HelpComponentProps => ({
});

const mapDispatchToProps = (_: Dispatch<Store>): HelpComponentActions => ({
});

export const HelpConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(HelpComponent);
