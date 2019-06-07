// tslint:disable:max-line-length

import { ExploreStore } from '../types/explore';
import { Taxonomies } from '../../application/constants';

const exploreTaxonomyId = Taxonomies.EXPLORE_TAXONOMY_ID;
export const rightAwaySectionId = 'rightaway';

export const buildExploreFixture = (): ExploreStore => (
    {
        sections: {
            [rightAwaySectionId]: {
                id: rightAwaySectionId,
                name: 'Things to do right away',
                description: 'Important tasks for settling in your community',
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'rightaway',
                }],
            },
            'settling_in': {
                id: 'settling_in',
                name: 'Settling in',
                description: 'Social customs and getting around your community',
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'settling_in',
                }],
            },
            'education': {
                id: 'education',
                name:'Education',
                description: 'Learning English, schools for children, youth and adults',
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'education',
                }],
            },
            'healthCare': {
                id: 'healthCare',
                name:'Health care',
                description: 'Medical insurance, finding a doctor, mental health',
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'healthCare',
                }],
            },
            'money': {
                id: 'money',
                name:'Money & banking',
                description: 'Opening a bank account, filing taxes',
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'money',
                }],
            },
            'housing': {
                id: 'housing',
                name: 'Housing',
                description: 'Finding a place to rent or buy, getting rental assistance',
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'housing',
                }],
            },
            'employment': {
                id: 'employment',
                name: 'Employment',
                description: 'Finding a job, working and workers’ rights',
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'employment',
                }],
            },
            'legal': {
                id: 'legal',
                name: 'Legal system & immigration',
                description: 'Immigration and citizenship, legal support, police',
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'legal',
                }],
            },
            'driving': {
                id: 'driving',
                name: 'Driving',
                description: 'Getting a driver\'s licence, traffic laws, basic insurance',
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'driving',
                }],
            },
            'helpForIndividualsAndFamilies': {
                id: 'helpForIndividualsAndFamilies',
                name: 'Help for individuals & families',
                description: 'For example low-income, disabilities, youth',
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'helpForIndividualsAndFamilies',
                }],
            },
        },
    }
);
