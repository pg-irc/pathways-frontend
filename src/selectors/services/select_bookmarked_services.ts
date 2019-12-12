import { Store } from '../../stores';
import { HumanServiceData } from '../../validation/services/types';
import { selectBookmarkedServiceMap } from './select_bookmarked_service_map';
import * as R from 'ramda';

export const selectBookmarkedServices = (appStore: Store): ReadonlyArray<HumanServiceData> => (
    R.values(selectBookmarkedServiceMap(appStore))
);