import { Store } from '../../stores';
import { HumanServiceData } from '../../validation/services/types';
import { selectSavedServiceMap } from './select_saved_service_map';
import * as R from 'ramda';

export const selectSavedServices = (appStore: Store): ReadonlyArray<HumanServiceData> => (
    R.values(selectSavedServiceMap(appStore))
);