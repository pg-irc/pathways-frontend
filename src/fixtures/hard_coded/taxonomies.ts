import { TaxonomyStore } from '../types/taxonomies';
import { Taxonomies } from '../../application/constants';

export const buildTaxonomyFixture = (): TaxonomyStore => ({
    taxonomyMap: {
        [Taxonomies.EXPLORE_TAXONOMY_ID]: {
            'settling_in': { icon: 'street-view' },
            'education': { icon: 'graduation-cap' },
            'healthCare': { icon: 'heartbeat' },
            'money': { icon: 'dollar' },
            'housing': { icon: 'building' },
            'employment': { icon: 'briefcase' },
            'legal': { icon: 'balance-scale' },
            'driving': { icon: 'car' },
            'helpForIndividualsAndFamilies': { icon: 'handshake-o' },
        },
    },
});
