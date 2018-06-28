import { Store } from '../types/taxonomies';

export const buildTaxonomyFixture = (): Store => ({
    taxonomyMap: {
        'explore': {
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
