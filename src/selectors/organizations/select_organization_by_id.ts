import { Store } from '../../stores';
import { HumanOrganizationData } from '../../validation/organizations/types';
import { Id } from '../../validation/services/types';

export const selectOrganizationById = (appStore: Store, organizationId: Id): HumanOrganizationData => (
    appStore.organizations.organization[organizationId]
);
