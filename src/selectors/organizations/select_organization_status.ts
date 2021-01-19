import { Store } from '../../stores';
import { OrganizationStatus } from '../../validation/organizations/types';

export const selectOrganizationStatus = (appStore: Store): OrganizationStatus => (
    appStore.organizations.organizationStatus
);
