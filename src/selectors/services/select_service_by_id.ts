import { Store } from '../../stores';
import { HumanServiceData, Id } from '../../validation/services/types';

export const selectServiceById = (appStore: Store, serviceId: Id): HumanServiceData => (
    appStore.services.services[serviceId]
);
