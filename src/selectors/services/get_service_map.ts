import { Store } from '../../stores';
import { ServiceMap } from '../../validation/services/types';

export const getServiceMap = (appStore: Store): ServiceMap => (
    appStore.services.services
);