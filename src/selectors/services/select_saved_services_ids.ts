import { Store } from '../../stores';
import { selectSavedServiceMap } from './select_saved_service_map';
import { Id } from '../../stores/services';

export const selectSavedServicesIds = (appStore: Store): ReadonlyArray<Id> => (
    Object.keys(selectSavedServiceMap(appStore))
);