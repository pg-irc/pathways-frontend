import * as R from 'ramda';
import { Store } from '../../stores';
import { ServiceMap } from '../../validation/services/types';
import { isReviewed } from './is_reviewed';
import { pickServiceMap } from './pick_service_map';

export const selectReviewedServiceMap = (appStore: Store): ServiceMap => {
    const serviceMap = pickServiceMap(appStore);
    return R.filter(isReviewed, serviceMap);
};