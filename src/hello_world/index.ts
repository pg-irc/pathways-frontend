import { connect } from 'react-redux';
import * as myContainers from './containers';
import * as counter from '../stores/counter';
import * as message from '../stores/message';
import { Store } from '../application/store';
import { Dispatch } from 'redux';

const mapStateToProps = (store: Store): myContainers.Props => ({
    counterInProps: store.counterInStore,
    messageInProps: store.messageInStore,
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): myContainers.Actions => ({
    increment: (prop: counter.Store) => dispatch(counter.increment(prop)),
    decrement: (prop: counter.Store) => dispatch(counter.decrement(prop)),
    setMessage: (newMessage: string) => dispatch(message.setMessage(newMessage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(myContainers.HelloWorldContainer);
