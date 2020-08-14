import { Store } from '../../stores';

export const selectOrganizationServicesOffset = (appStore: Store): number => (
    appStore.userExperience.organizationServicesOffset
);