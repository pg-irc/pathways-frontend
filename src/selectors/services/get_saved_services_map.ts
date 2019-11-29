import { Store } from '../../stores';
import { ServiceMap } from '../../validation/services/types';
import { getServiceMap } from './get_service_map';
import * as R from 'ramda';
import { isBookmarked } from './is_bookmarked';

export const getSavedServicesMap = (appStore: Store): ServiceMap => {
    const serviceMap = getServiceMap(appStore);
    return R.filter(isBookmarked, serviceMap);
};