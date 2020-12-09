import { Store } from '../../stores';
import { Id as OrganizationId } from '../../stores/services';
import { HumanServiceData, Id } from '../../validation/services/types';

export const selectServicesForOrganization = (store: Store, organizationId: OrganizationId): ReadonlyArray<HumanServiceData> => {
    const servicesForOrganization = store.services.servicesForOrganization[organizationId];
    const serviceMap = store.services.services;
    if (!servicesForOrganization) {
        return [];
    }
    return servicesForOrganization.map((serviceId: Id): HumanServiceData => serviceMap[serviceId]);
};
