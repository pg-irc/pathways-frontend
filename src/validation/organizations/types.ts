import { Id } from "../services/types";

export interface HumanOrganizationData {
    readonly id: Id;
    readonly name: string;
    readonly description: string;
    readonly website: string;
    readonly email: string;
}

export interface OrganizationMap {
    readonly [organizationId: string]: HumanOrganizationData;
}

export interface OrganizationStore {
    readonly organizations: OrganizationMap;
}