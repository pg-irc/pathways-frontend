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
                name: {
                    'en': 'Things to do right away',
                },
                description: {
                    'en': 'Important tasks for settling in your community',
                },
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'rightaway',
                }],
            },
            'settling_in': {
                id: 'settling_in',
                name: {
                    'en': 'Settling in',
                    'ar': 'تستقر في',
                    'fr': 'S\'installer',
                },
                description: {
                    'en': 'Social customs and getting around your community',
                    'fr': 'Coutumes sociales et déplacements dans votre communauté',
                    'ar': 'العادات الاجتماعية والتنقل داخل مجتمعك',
                },
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'settling_in',
                }],
            },
            'education': {
                id: 'education',
                name: {
                    'en': 'Education',
                    'ar': 'التعليم',
                    'fr': 'Éducation',
                },
                description: {
                    'en': 'Learning English, schools for children, youth and adults',
                    'fr': 'Cours d\'anglais, écoles pour enfants, jeunes et adultes',
                    'ar': 'تعلم اللغة الإنجليزية والمدارس للأطفال وللشباب وللكبار',
                },
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'education',
                }],
            },
            'healthCare': {
                id: 'healthCare',
                name: {
                    'en': 'Health care',
                    'ar': 'الرعاية الصحية',
                    'fr': 'Soins de santé',
                },
                description: {
                    'en': 'Medical insurance, finding a doctor, mental health',
                    'fr': 'Assurance médicale, recherche d\'un médecin, santé mentale',
                    'ar': 'التأمين الطبي والبحث عن طبيب والصحة النفسية',
                },
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'healthCare',
                }],
            },
            'money': {
                id: 'money',
                name: {
                    'en': 'Money & banking',
                    'ar': 'المال والبنوك',
                    'fr': 'Argent et banque',
                },
                description: {
                    'en': 'Opening a bank account, filing taxes',
                    'fr': 'Ouvrir un compte bancaire, produire une déclaration de revenus',
                    'ar': 'فتح حساب مصرفي وتقديم الإقرار الضريبي',
                },
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'money',
                }],
            },
            'housing': {
                id: 'housing',
                name: {
                    'en': 'Housing',
                    'ar': 'الإسكان',
                    'fr': 'Logement',
                },
                description: {
                    'en': 'Finding a place to rent or buy, getting rental assistance',
                    'fr': 'Trouver un logement à louer ou à acheter, accéder au programme de subvention aux logements locatifs',
                    'ar': 'إيجاد مسكن للإيجار أو التملك والحصول على دعم في سداد الإيجار',
                },
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'housing',
                }],
            },
            'employment': {
                id: 'employment',
                name: {
                    'en': 'Employment',
                    'ar': 'توظيف',
                    'fr': 'Emploi',
                },
                description: {
                    'en': 'Finding a job, working and workers’ rights',
                    'fr': 'Trouver un emploi, travailler, se prévaloir de ses droits comme travailleur',
                    'ar': 'البحث عن وظيفة والعمل وحقوق العاملين',
                },
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'employment',
                }],
            },
            'legal': {
                id: 'legal',
                name: {
                    'en': 'Legal system & immigration',
                    'ar': 'النظام القانوني والهجرة',
                    'fr': 'Système juridique et immigration',
                },
                description: {
                    'en': 'Immigration and citizenship, legal support, police',
                    'fr': 'Immigration et citoyenneté, aide juridique, police',
                    'ar': 'الهجرة والجنسية والدعم القانوني والشرطة',
                },
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'legal',
                }],
            },
            'driving': {
                id: 'driving',
                name: {
                    'en': 'Driving',
                    'ar': 'القيادة',
                    'fr': 'Conduite',
                },
                description: {
                    'en': 'Getting a driver\'s licence, traffic laws, basic insurance',
                    'fr': 'Permis de conduire, code de la route, assurance de base',
                    'ar': 'الحصول على رخصة القيادة وقوانين المرور والتأمين الأساسي',
                },
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'driving',
                }],
            },
            'helpForIndividualsAndFamilies': {
                id: 'helpForIndividualsAndFamilies',
                name: {
                    'en': 'Help for individuals & families',
                    'ar': 'مساعدة للأفراد والعائلات',
                    'fr': 'Aide pour les individus et les familles',
                },
                description: {
                    'en': 'For example low-income, disabilities, youth',
                    'fr': 'Exemples : personnes à faibles revenus, personnes handicapées, jeunes',
                    'ar': 'على سبيل المثال ذوي الدخل المحدود وذوي الاحتياجات الخاصة والشباب',
                },
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'helpForIndividualsAndFamilies',
                }],
            },
        },
    }
);
