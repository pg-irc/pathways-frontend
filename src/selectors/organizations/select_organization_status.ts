import { Store } from '../../stores';
import { StatusForOrganization } from '../../validation/organizations/types';

export const selectOrganizationStatus = (appStore: Store): StatusForOrganization => (
    appStore.organizations.organizationStatus
);
