import { Store } from '../../stores';
import { ServiceMap } from '../../validation/services/types';

export const pickServiceMap = (appStore: Store): ServiceMap => (
    appStore.services.services
);