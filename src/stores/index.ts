import { combineReducers } from 'redux';
import * as counter from './counter';
import * as message from './message';

export interface Store {
    readonly counterInStore: counter.Store;
    readonly messageInStore: message.Store;
}

export const rootReducer = combineReducers({
    counterInStore: counter.reducer,
    messageInStore: message.reducer,
});

// bla
