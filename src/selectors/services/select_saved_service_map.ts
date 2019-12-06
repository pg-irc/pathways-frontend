import { Store } from '../../stores';
import { ServiceMap } from '../../validation/services/types';
import * as R from 'ramda';
import { isBookmarked } from './is_bookmarked';
import { pickServiceMap } from './pick_service_map';

export const selectSavedServiceMap = (appStore: Store): ServiceMap => {
    const serviceMap = pickServiceMap(appStore);
    return R.filter(isBookmarked, serviceMap);
};