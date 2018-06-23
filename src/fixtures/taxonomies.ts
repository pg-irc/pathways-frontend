// Examples are Health, Education
export interface TaxonomyTerm {
    readonly icon?: string;
}

// Examples are AIRS, BC211
export interface Taxonomy {
    readonly [taxonomyTermId: string]: TaxonomyTerm;
}

export interface TaxonomyMap {
    readonly [taxonomyId: string]: Taxonomy;
}

export interface Store {
    readonly taxonomyMap: TaxonomyMap;
}

export interface TaxonomyTermReference {
    readonly taxonomyId: string;
    readonly taxonomyTermId: string;
}

export const ExploreTaxonomyId = 'Explore';

export const buildTaxonomyFixture = (): Store => ({
    taxonomyMap: {
        [ExploreTaxonomyId]: {
            'SettlingIn': { icon: 'sign-text' },
            'Education': { icon: 'book-open-variant' },
            'HealthCare': { icon: 'medical-bag' },
            'Money': { icon: 'currency-usd' },
            'Housing': { icon: 'home' },
            'Employment': { icon: 'briefcase' },
            'LegalOrImmigration': { icon: 'gavel' },
            'Driving': { icon: 'car' },
            'HelpForIndividualsAndFamilies': { icon: 'account' },
        },
    },
});
