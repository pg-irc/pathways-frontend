import { Store } from '../../stores';
import { Id as OrganizationId } from '../../stores/services';
import { HumanServiceData, Id } from '../../validation/services/types';

export const selectServicesForOrganization = (organizationId: OrganizationId, store: Store): ReadonlyArray<HumanServiceData> => {
    const servicesByOrganization = store.services.servicesByOrganization[organizationId];
    const serviceMap = store.services.services;
    if (!servicesByOrganization) {
        return [];
    }
    return servicesByOrganization.map((serviceId: Id) => serviceMap[serviceId]);
};
