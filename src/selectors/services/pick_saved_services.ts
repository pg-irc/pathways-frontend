import { Store } from '../../stores';
import { ServiceMap } from '../../validation/services/types';
import { getServiceMap } from './get_service_map';
import { getSavedServicesIdsList } from './get_saved_services_ids_list';
import * as R from 'ramda';

export const getSavedServicesMap = (appStore: Store): ServiceMap => {
    const savedServicesIdsList = getSavedServicesIdsList(appStore);
    const serviceMap = getServiceMap(appStore);
    return R.pick(savedServicesIdsList, serviceMap);
};