// tslint:disable:no-class readonly-keyword no-this no-expression-statement
import { Id, ExploreSection } from '../../explore';
import { LocalizedText } from '../../../locale';
import { TaxonomyTermReference } from '../../taxonomies';
import { aString } from '../../../application/__tests__/helpers/random_test_values';
import { LocalizedTextBuilder } from './locale_helpers';

export class ExploreSectionBuilder {
    id: Id = aString();
    name: LocalizedText = new LocalizedTextBuilder().build();
    introduction: LocalizedText = new LocalizedTextBuilder().build();
    description: LocalizedText = new LocalizedTextBuilder().build();
    taxonomyTerms: ReadonlyArray<TaxonomyTermReference> = [];

    withId(id: Id): ExploreSectionBuilder {
        this.id = id;
        return this;
    }

    withName(name: LocalizedText): ExploreSectionBuilder {
        this.name = name;
        return this;
    }

    withDescription(description: LocalizedText): ExploreSectionBuilder {
        this.description = description;
        return this;
    }

    withIntroduction(introduction: LocalizedText): ExploreSectionBuilder {
        this.introduction = introduction;
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
            introduction: this.introduction,
            taxonomyTerms: this.taxonomyTerms,
        };
    }
}
