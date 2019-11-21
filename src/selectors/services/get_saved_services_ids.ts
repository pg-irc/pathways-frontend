import { Store } from '../../stores';
import { ServiceList } from '../../validation/services/types';

export const getSavedServicesIds = (appStore: Store): ServiceList => (
    appStore.services.savedServices
);