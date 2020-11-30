// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import { aString, aNumber } from '../../../application/helpers/random_test_values';
import { HumanOrganizationData, OrganizationMap, OrganizationStore } from '../../../validation/organizations/types';
import { Id } from '../../services';

export const buildNormalizedOrganizations = (
    organizations: ReadonlyArray<HumanOrganizationDataBuilder>,
): OrganizationStore => ({
    organizations: buildOrganizationMap(organizations),
    organizationTab: 0,
});

export const buildOrganizationMap = (organizations: ReadonlyArray<HumanOrganizationDataBuilder>): OrganizationMap => {
    const buildAndMapToId = (map: OrganizationMap, builder: HumanOrganizationDataBuilder): OrganizationMap => {
        return { ...map, [builder.id]: builder.build() };
    };
    return organizations.reduce(buildAndMapToId, {});
};

export class HumanOrganizationDataBuilder {
    id: Id = aString();
    latitude: number = aNumber();
    longitude: number = aNumber();
    name: string = aString();
    description: string = aString();
    website: string = aString();
    email: string = aString();

    withId(id: Id): HumanOrganizationDataBuilder {
        this.id = id;
        return this;
    }

    withName(name: string): HumanOrganizationDataBuilder {
        this.name = name;
        return this;
    }

    withDescription(description: string): HumanOrganizationDataBuilder {
        this.description = description;
        return this;
    }

    withEmail(email: string): HumanOrganizationDataBuilder {
        this.email = email;
        return this;
    }

    build(): HumanOrganizationData {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            website: this.website,
            email: this.email,
        };
    }
}