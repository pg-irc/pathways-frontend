import { TaxonomyStore } from '../types/taxonomies';
import { Taxonomies } from '../../application/constants';

export const buildTaxonomyFixture = (): TaxonomyStore => ({
    taxonomyMap: {
        [Taxonomies.EXPLORE_TAXONOMY_ID]: {
            'settling_in': { icon: 'sign-text' },
            'education': { icon: 'book-open-variant' },
            'healthCare': { icon: 'medical-bag' },
            'money': { icon: 'currency-usd' },
            'housing': { icon: 'home' },
            'employment': { icon: 'briefcase' },
            'legal': { icon: 'gavel' },
            'driving': { icon: 'car' },
            'helpForIndividualsAndFamilies': { icon: 'account' },
        },
    },
});
