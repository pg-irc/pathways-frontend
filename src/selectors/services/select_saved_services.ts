import { Store } from '../../stores';
import { Id, ServiceListData } from '../../validation/services/types';
import { getSavedServicesIdsList } from './get_saved_services_ids_list';
import { getServiceMap } from './get_service_map';

export const selectSavedServices = (appStore: Store): ServiceListData => {
    const savedServicesIds = getSavedServicesIdsList(appStore);
    const serviceMap = getServiceMap(appStore);
    return savedServicesIds.map((id: Id) => serviceMap[id]);
};