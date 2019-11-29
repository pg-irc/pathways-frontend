import { Store } from '../../stores';
import { ServiceList } from '../../validation/services/types';
import { getSavedServicesMap } from './get_saved_services_map';
export const getSavedServicesIdsList = (appStore: Store): ServiceList => (
    Object.keys(getSavedServicesMap(appStore))
);
