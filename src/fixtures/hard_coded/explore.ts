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
                    'ko': '새로운 환경에의 적응',
                    'zh_CN': '安家落户',
                    'ar': 'تستقر في',
                    'fr': 'S\'installer',
                },
                description: {
                    'en': 'Social customs and getting around your community',
                    'ko': '사회적 풍습과 지역 사회 둘러보기',
                    'zh_CN': '社会习俗与融入社区',
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
                    'ko': '교육',
                    'zh_CN': '教育',
                    'ar': 'التعليم',
                    'fr': 'Éducation',
                },
                description: {
                    'en': 'Learning English, schools for children, youth and adults',
                    'ko': '영어 학습, 아동과 청소년 또는 성인을 위한 교육 기관',
                    'zh_CN': '学习英语，适合儿童、青少年和成人上的学校',
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
                    'ko': '의료 보건',
                    'zh_CN': '医疗保健',
                    'ar': 'الرعاية الصحية',
                    'fr': 'Soins de santé',
                },
                description: {
                    'en': 'Medical insurance, finding a doctor, mental health',
                    'ko': '의료 보험, 병원 검색, 정신 건강',
                    'zh_CN': '医疗保险、找医生、心理健康',
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
                    'ko': '화폐와 금융',
                    'zh_CN': '货币与理财',
                    'ar': 'المال والبنوك',
                    'fr': 'Argent et banque',
                },
                description: {
                    'en': 'Opening a bank account, filing taxes',
                    'ko': '은행 계좌 개설, 세금 신고서 제출',
                    'zh_CN': '开银行账户、报税',
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
                    'ko': '주거',
                    'zh_CN': '住房',
                    'ar': 'الإسكان',
                    'fr': 'Logement',
                },
                description: {
                    'en': 'Finding a place to rent or buy, getting rental assistance',
                    'ko': '공간 임차 또는 구매, 임차 지원 프로그램 이용',
                    'zh_CN': '找租房或买房、寻求租金资助',
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
                    'ko': '고용',
                    'zh_CN': '就业',
                    'ar': 'توظيف',
                    'fr': 'Emploi',
                },
                description: {
                    'en': 'Finding a job, working and workers’ rights',
                    'ko': '구직, 근로와 근로자 권리',
                    'zh_CN': '找工作、工作和工作者的权利',
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
                    'ko': '사법 제도와 이민',
                    'zh_CN': '法律制度和移民',
                    'ar': 'النظام القانوني والهجرة',
                    'fr': 'Système juridique et immigration',
                },
                description: {
                    'en': 'Immigration and citizenship, legal support, police',
                    'ko': '이민과 시민권, 법률 자문, 경찰',
                    'zh_CN': '移民和公民、法律支持、警察',
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
                    'ko': '운전',
                    'zh_CN': '汽车驾驶',
                    'ar': 'القيادة',
                    'fr': 'Conduite',
                },
                description: {
                    'en': 'Getting a driver\'s licence, traffic laws, basic insurance',
                    'ko': '운전면허증 취득, 도로교통법, 기본 보험',
                    'zh_CN': '申办驾驶执照、交通法规、基本保险',
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
                    'ko': '개인과 가족을 위한 지원',
                    'zh_CN': '帮助个人与家庭',
                    'ar': 'مساعدة للأفراد والعائلات',
                    'fr': 'Aide pour les individus et les familles',
                },
                description: {
                    'en': 'For example low-income, disabilities, youth',
                    'ko': '예: 저소득층, 장애인, 청소년',
                    'zh_CN': '例如：低收入、残疾人、青少年',
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
