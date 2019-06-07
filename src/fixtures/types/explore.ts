import { TaxonomyTermReference } from './taxonomies';

export type Id = string;

export interface ExploreSection {
    readonly id: Id;
    readonly name: string;
    readonly description: string;
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
}

export interface ExploreSectionMap {
    readonly [key: string]: ExploreSection;
}

export interface ExploreStore {
    readonly sections: ExploreSectionMap;
}
