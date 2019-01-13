import { Store } from '../stores';
import { StoreState } from '../stores/server_version';

export const selectServerVersion = (appStore: Store): string => (
    appStore.serverVersionInStore.state === StoreState.Valid ? appStore.serverVersionInStore.serverVersion : 'unknown'
);
