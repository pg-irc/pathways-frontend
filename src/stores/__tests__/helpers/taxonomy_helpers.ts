// tslint:disable:readonly-keyword
// tslint:disable:no-class
// tslint:disable:no-this
// tslint:disable:no-expression-statement

import * as store from '../../taxonomies';
import { aString } from '../../../helpers/random_test_values';

interface TaxonomyTerm {
    icon?: string;
}

interface TaxonomTermMap {
    [taxonomyTermId: string]: TaxonomyTerm;
}

interface TaxonomyMap {
    [taxonomyId: string]: TaxonomTermMap;
}

export class TaxonomyStoreBuilder {

    map: TaxonomyMap;
    currentTaxonomyId: string = aString();

    withTaxonomyId(taxonomyId: string): TaxonomyStoreBuilder {
        this.currentTaxonomyId = taxonomyId;
        return this;
    }

    addTaxonomyTerm(taxonomyTermId: string): TaxonomyStoreBuilder {
        return this.addTaxonomyTermWithIcon(taxonomyTermId, undefined);
    }

    addTaxonomyTermWithIcon(taxonomyTermId: string, icon: string): TaxonomyStoreBuilder {
        const taxonomyId = this.currentTaxonomyId;
        if (!this.map[taxonomyId]) {
            this.map[taxonomyId] = {};
        }
        this.map[taxonomyId][taxonomyTermId] = icon ? { icon } : {};
        return this;
    }

    build(): store.TaxonomyStore {
        return { taxonomyMap: this.map };
    }
}
