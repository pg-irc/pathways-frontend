// tslint:disable:no-class readonly-keyword no-this no-expression-statement
import { Id, ExploreSection, Name, Description } from '../../explore';
import { TaxonomyTermReference } from '../../taxonomies';
import { aString } from '../../../application/__tests__/helpers/random_test_values';

export class ExploreSectionBuilder {
    id: Id = aString();
    name: Name = aString();
    description: Description = aString();
    taxonomyTerms: ReadonlyArray<TaxonomyTermReference> = [];

    withId(id: Id): ExploreSectionBuilder {
        this.id = id;
        return this;
    }

    withName(name: Name): ExploreSectionBuilder {
        this.name = name;
        return this;
    }

    withDescription(description: Description): ExploreSectionBuilder {
        this.description = description;
        return this;
    }

    withTaxonomyTerms(taxonomyTerms: ReadonlyArray<TaxonomyTermReference>): ExploreSectionBuilder {
        this.taxonomyTerms = taxonomyTerms;
        return this;
    }

    build(): ExploreSection {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            taxonomyTerms: this.taxonomyTerms,
        };
    }
}
