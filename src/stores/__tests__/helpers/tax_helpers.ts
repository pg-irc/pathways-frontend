// tslint:disable:readonly-keyword
// tslint:disable:no-class
// tslint:disable:no-this
// tslint:disable:no-expression-statement

import * as taxStore from '../../../fixtures/tax'; // TODO change from fixture to store
import { aString } from '../../../application/__tests__/helpers/random_test_values';

interface TaxonomyTerm {
    icon?: string;
}

interface TaxonomTermMap {
    [taxonomyTermId: string]: TaxonomyTerm;
}

interface TaxonomyMap {
    [taxonomyId: string]: TaxonomTermMap;
}

export class TaxStoreBuilder {

    map: TaxonomyMap;
    currentTaxId: string = aString();

    withTaxId(taxId: string): TaxStoreBuilder {
        this.currentTaxId = taxId;
        return this;
    }

    addTaxTerm(taxTermId: string): TaxStoreBuilder {
        return this.addTaxTermWithIcon(taxTermId);
    }

    addTaxTermWithIcon(taxTermId: string, icon?: string): TaxStoreBuilder {
        const taxId = this.currentTaxId;
        if (!this.map[taxId]) {
            this.map[taxId] = {};
        }
        this.map[taxId][taxTermId] = icon ? { icon } : {};
        return this;
    }

    build(): taxStore.Store {
        return { taxonomies: this.map };
    }
}
