import { Store } from '../../stores';
import { Id } from '../../validation/services/types';

export const selectServiceNameById = (appStore: Store, serviceId: Id): string => (
    appStore.services.services[serviceId].name
);
