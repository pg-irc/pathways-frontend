import { Errors } from '../errors/types';
import { Id } from '../services/types';

export interface HumanOrganizationData {
    readonly id: Id;
    readonly name: string;
    readonly description: string;
    readonly website: string;
    readonly email: string;
}

export interface ValidOrganization {
    readonly type: 'ORGANIZATION:VALID';
    readonly organizationId: Id;
}

export interface LoadingOrganization {
    readonly type: 'ORGANIZATION:LOADING';
}

export interface ErrorForOrganization {
    readonly type: 'ORGANIZATION:ERROR';
    readonly errorMessageType: Errors;
}

export type StatusForOrganization = LoadingOrganization | ErrorForOrganization | ValidOrganization;

export interface OrganizationMap {
    readonly [organizationId: string]: HumanOrganizationData;
}

export interface OrganizationStore {
    readonly organizations: OrganizationMap;
    readonly organizationStatus: StatusForOrganization;
}