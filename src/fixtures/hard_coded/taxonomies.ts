//This file is only included in the build if 'newcomers_guide/taxonomies.ts' is not present
import { TaxonomyStore } from '../types/taxonomies';
import { Taxonomies } from '../../application/constants';

export const buildTaxonomyFixture = (): TaxonomyStore => ({
    taxonomyMap: {
        [Taxonomies.EXPLORE_TAXONOMY_ID]: {
            'rightaway': { icon: 'check-square-o' },
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
