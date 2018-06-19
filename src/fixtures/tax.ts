// Examples are Health, Education
export interface TaxonomyTerm {
    readonly icon?: string;
}

// Examples are AIRS, BC211
export interface Taxonomy {
    readonly [termId: string]: TaxonomyTerm;
}

export interface TaxonomyMap {
    readonly [taxonomyId: string]: Taxonomy;
}

export interface Store {
    readonly taxonomies: TaxonomyMap;
}

export interface TaxTermIdetifyingPair {
    readonly taxId: string;
    readonly taxTermId: string;
}

export const buildTaxonomyFixture = (): Store => ({
    taxonomies: {
        'Explore': {
            'Education': {
                icon: 'the icon',
            },
            'Health': {
            },
        },
    },
});
