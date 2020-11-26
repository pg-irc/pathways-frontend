import { Store } from '../../stores';

export const selectOrganizationTab = (appStore: Store): number => (
    appStore.organizations.organizationTab
);
