import { Store } from '../../stores';
import { ServiceListData, Id } from '../../validation/services/types';
import * as R from 'ramda';
import { getSavedServicesMap } from './get_saved_services_map';

export const selectSavedServices = (appStore: Store): ServiceListData => {
    const serviceMap = getSavedServicesMap(appStore);
    const serviceIds = R.keys(serviceMap);
    return serviceIds.map((id: Id) => serviceMap[id]);
};
