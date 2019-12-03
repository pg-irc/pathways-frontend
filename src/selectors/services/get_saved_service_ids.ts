import { Store } from '../../stores';
import { getSavedServiceMap } from './get_saved_service_map';
import { Id } from '../../stores/services';

export const getSavedServicesIds = (appStore: Store): ReadonlyArray<Id> => (
    Object.keys(getSavedServiceMap(appStore))
);