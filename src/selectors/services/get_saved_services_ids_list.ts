import { Store } from '../../stores';
import { ServiceList } from '../../validation/services/types';

export const getSavedServicesIdsList = (appStore: Store): ServiceList => (
    appStore.services.savedServices
);