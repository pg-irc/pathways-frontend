import { Store } from '../../stores';
import { HumanServiceData, Id } from '../../validation/services/types';
import { getSavedServicesIds } from './get_saved_services_ids';
import { getServiceMap } from './get_service_map';

export const getSavedServices = (appStore: Store): ReadonlyArray<HumanServiceData> => {
    const savedServicesIds = getSavedServicesIds(appStore);
    const serviceMap = getServiceMap(appStore);
    return savedServicesIds.map((id: Id) => serviceMap[id]);
};