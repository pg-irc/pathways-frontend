import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Props, Actions, HelloWorldContainer } from './hello_world_container';
import * as counter from '../stores/counter';
import * as message from '../stores/message';
import { Store } from '../application/store';

const mapStateToProps = (store: Store): Props => ({
    counterInProps: store.appState.counterInStore,
    messageInProps: store.appState.messageInStore,
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): Actions => ({
    increment: (prop: counter.Store) => dispatch(counter.increment(prop)),
    decrement: (prop: counter.Store) => dispatch(counter.decrement(prop)),
    setMessage: (aMessage: string) => dispatch(message.setMessage(aMessage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HelloWorldContainer);
