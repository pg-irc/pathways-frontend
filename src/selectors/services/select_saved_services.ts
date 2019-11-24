import { Store } from '../../stores';
import { HumanServiceData, Id } from '../../validation/services/types';
import { getSavedServicesIdsList } from './get_saved_services_ids_list';
import { getServiceMap } from './get_service_map';

export const selectSavedServices = (appStore: Store): ReadonlyArray<HumanServiceData> => {
    const savedServicesIds = getSavedServicesIdsList(appStore);
    const serviceMap = getServiceMap(appStore);
    return savedServicesIds.map((id: Id) => serviceMap[id]);
};