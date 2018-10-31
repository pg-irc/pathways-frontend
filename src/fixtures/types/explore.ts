import { LocalizedText } from '../../locale';
import { TaxonomyTermReference } from './taxonomies';

export type Id = string;

export interface ExploreSection {
    readonly id: Id;
    readonly name: LocalizedText;
    readonly introduction: LocalizedText;
    readonly description: LocalizedText;
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
}

export interface ExploreSectionMap {
    readonly [key: string]: ExploreSection;
}

export interface ExploreStore {
    readonly sections: ExploreSectionMap;
}
