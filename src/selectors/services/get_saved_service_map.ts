import { Store } from '../../stores';
import { ServiceMap } from '../../validation/services/types';
import * as R from 'ramda';
import { isBookmarked } from './is_bookmarked';

export const getSavedServiceMap = (appStore: Store): ServiceMap => {
    const serviceMap = appStore.services.services;
    return R.filter(isBookmarked, serviceMap);
};