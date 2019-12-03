import { Store } from '../../stores';
import { Id, HumanServiceData } from '../../validation/services/types';
import { getSavedServiceMap } from './get_saved_service_map';
import { getSavedServicesIds } from './get_saved_services_ids';

export const selectSavedServices = (appStore: Store): ReadonlyArray<HumanServiceData> => {
    const serviceMap = getSavedServiceMap(appStore);
    const serviceIds = getSavedServicesIds(appStore);
    return serviceIds.map((id: Id) => serviceMap[id]);
};