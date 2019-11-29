import { Store } from '../../stores';
import { ServiceList } from '../../validation/services/types';
import { getSavedServiceMap } from './get_saved_service_map';

export const getSavedServicesIdsList = (appStore: Store): ServiceList => (
    Object.keys(getSavedServiceMap(appStore))
);
