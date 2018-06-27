import { Store, ExploreTaxonomyId } from '../types/taxonomies';

export const buildTaxonomyFixture = (): Store => ({
    taxonomyMap: {
        [ExploreTaxonomyId]: {
            // TODO make sure these match the newcomer data
            'SettlingIn': { icon: 'sign-text' },
            'Education': { icon: 'book-open-variant' },
            'HealthCare': { icon: 'medical-bag' },
            'Money': { icon: 'currency-usd' },
            'Housing': { icon: 'home' },
            'Employment': { icon: 'briefcase' },
            'LegalOrImmigration': { icon: 'gavel' },
            'Driving': { icon: 'car' },
            'HelpForIndividualsAndFamilies': { icon: 'account' },
        },
    },
});
