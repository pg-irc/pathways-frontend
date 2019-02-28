// tslint:disable:max-line-length

import { ExploreStore } from '../types/explore';
import { Taxonomies } from '../../application/constants';

const exploreTaxonomyId = Taxonomies.EXPLORE_TAXONOMY_ID;

export const buildExploreFixture = (): ExploreStore => (
    {
        sections: {
            's1': {
                id: 's1',
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
            's2': {
                id: 's2',
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
            's3': {
                id: 's3',
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
            's4': {
                id: 's4',
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
            's5': {
                id: 's5',
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
            's6': {
                id: 's6',
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
            's7': {
                id: 's7',
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
            's8': {
                id: 's8',
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
            's9': {
                id: 's9',
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
            's10': {
                id: 's10',
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
