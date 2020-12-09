import { Store } from '../../stores';

export const selectOrganizationTab = (appStore: Store): number => (
    appStore.userExperience.organizationTab
);
