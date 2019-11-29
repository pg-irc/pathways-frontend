import { Store } from '../../stores';
import { ServiceListData, Id } from '../../validation/services/types';
import { getSavedServicesMap } from './get_saved_services_map';
import { getSavedServicesIdsList } from './get_saved_services_ids_list';

export const selectSavedServices = (appStore: Store): ServiceListData => {
    const serviceMap = getSavedServicesMap(appStore);
    const serviceIds = getSavedServicesIdsList(appStore);
    return serviceIds.map((id: Id) => serviceMap[id]);
};
