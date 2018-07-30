import { Store } from '../types/questionnaire';
import { Taxonomies } from '../../application/constants';

const exploreTaxonomyId = Taxonomies.EXPLORE_TAXONOMY_ID;

export const buildQuestionnaireFixture = (): Store => {
    return {
        activeQuestion: 0,
        questions: {
            'q1': {
                id: 'q1',
                text: {
                    'en': 'How long have you been in Canada?',
                    'ar': 'منذ متى وأنت في كندا؟',
                    'fr': 'Depuis combien de temps êtes-vous au Canada?',
                },
                acceptMultipleAnswers: false,
            },
            'q2': {
                id: 'q2',
                text: {
                    'en': 'You are settling in Canada ...',
                    'ar': 'انت تستقر في كندا ...',
                    'fr': 'Vous vous installez au Canada ...',
                },
                acceptMultipleAnswers: false,
            },
            'q3': {
                id: 'q3',
                text: {
                    'en': 'Which age group do you belong to?',
                    'ar': 'ما هي الفئة العمرية التي تنتمي إليها؟',
                    'fr': 'De quoi avez-vous besoin pour aider au Canada?',
                },
                acceptMultipleAnswers: false,
            },
            'q4': {
                id: 'q4',
                text: {
                    'en': 'What do you need help with in Canada?',
                    'ar': 'ما الذي تحتاجه للمساعدة في كندا؟',
                    'fr': 'De quoi avez-vous besoin pour aider au Canada?',
                },
                acceptMultipleAnswers: true,
            },
            'q6': {
                id: 'q6',
                text: {
                    'en': 'Which immigrant type do you currently identify as?',
                    'ar': 'ما نوع المهاجر الذي تعرفه حاليا؟',
                    'fr': 'Quel type d\'immigrant identifiez-vous actuellement?',
                },
                acceptMultipleAnswers: false,
            },
            'q7': {
                id: 'q7',
                text: {
                    'en': 'What is your current stage in the refugee claim process?',
                    'ar': 'ما هو مستواك في اللغة الإنجليزية؟',
                    'fr': 'Quelle est votre étape actuelle dans le processus de demande d\'asile?',
                },
                acceptMultipleAnswers: false,
            },
            'q8': {
                id: 'q8',
                text: {
                    'en': 'What is your level of English?',
                    'ar': 'ما هو مستواك في اللغة الإنجليزية؟',
                    'fr': 'Quel est votre niveau d\'anglais?',
                },
                acceptMultipleAnswers: true,
            },
            'q9': {
                id: 'q9',
                text: {
                    'en': 'Finally, are you interested in learning about services for special groups?',
                    'ar': 'وأخيرًا ، هل أنت مهتم بالتعرف على الخدمات الخاصة بالمجموعات الخاصة؟',
                    'fr': 'Enfin, êtes-vous intéressé à en apprendre davantage sur les services offerts aux groupes spéciaux?',
                },
                acceptMultipleAnswers: true,
            },
        },
        answers: {
            'a1': {
                id: 'a1',
                questionId: 'q1',
                text: {
                    'en': 'I am planning to move to Canada',
                    'ar': 'أخطط للانتقال إلى كندا',
                    'fr': 'Je prévois déménager au Canada',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'time_in_canada',
                    'taxonomyTermId': 'not_yet_arrived',
                }],
            },
            'a2': {
                id: 'a2',
                questionId: 'q1',
                text: {
                    'en': 'I just arrived less than 1 month ago',
                    'ar': 'لقد وصلت للتو قبل أقل من شهر',
                    'fr': 'Je viens d\'arriver il y a moins d\'un mois',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'time_in_canada',
                    'taxonomyTermId': 'under_1_month',
                }],
            },
            'a3': {
                id: 'a3',
                questionId: 'q1',
                text: {
                    'en': 'Less than 6 months',
                    'ar': 'أقل من 6 أشهر',
                    'fr': 'Moins de 6 mois',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'time_in_canada',
                    'taxonomyTermId': 'under_6_months',
                }],
            },
            'a4': {
                id: 'a4',
                questionId: 'q1',
                text: {
                    'en': 'Less than 1 year',
                    'ar': 'أقل من 1 سنة',
                    'fr': 'Moins d\'un an',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'time_in_canada',
                    'taxonomyTermId': 'under_1_year',
                }],
            },
            'a5': {
                id: 'a5',
                questionId: 'q1',
                text: {
                    'en': 'Less than 2 years',
                    'ar': 'أقل من سنتين',
                    'fr': 'Moins de 2 ans',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'time_in_canada',
                    'taxonomyTermId': 'under_2_years',
                }],
            },
            'a6': {
                id: 'a6',
                questionId: 'q1',
                text: {
                    'en': 'More than 2 years',
                    'ar': 'أكثر من 2 سنوات',
                    'fr': 'Plus de 2 ans',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'time_in_canada',
                    'taxonomyTermId': 'over_2_years',
                }],
            },
            'a7': {
                id: 'a7',
                questionId: 'q2',
                text: {
                    'en': 'by yourself',
                    'ar': 'بنفسك',
                    'fr': 'par vous-même',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'user',
                    'taxonomyTermId': 'alone',
                }],
            },
            'a8': {
                id: 'a8',
                questionId: 'q2',
                text: {
                    'en': 'with your family',
                    'ar': 'مع عائلتك',
                    'fr': 'avec ta famille',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'user',
                    'taxonomyTermId': 'with_family',
                }],
            },
            'a9': {
                id: 'a9',
                questionId: 'q3',
                text: {
                    'en': 'Under 13 years old',
                    'ar': 'تحت 13 سنة',
                    'fr': 'Moins de 13 ans',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'age',
                    'taxonomyTermId': 'under_13',
                }],
            },
            'a10': {
                id: 'a10',
                questionId: 'q3',
                text: {
                    'en': '13-18 years old',
                    'ar': '13-18 سنة',
                    'fr': '13-18 ans',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'age',
                    'taxonomyTermId': '13_to_18',
                }],
            },
            'a11': {
                id: 'a11',
                questionId: 'q3',
                text: {
                    'en': '18-64 years old',
                    'ar': '18-64 سنة',
                    'fr': '18-64 ans',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'age',
                    'taxonomyTermId': '18_to_64',
                }],
            },
            'a12': {
                id: 'a12',
                questionId: 'q3',
                text: {
                    'en': '65+ years old',
                    'ar': '65+ سنة',
                    'fr': '65+ ans',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'age',
                    'taxonomyTermId': 'over_65',
                }],
            },
            'a13': {
                id: 'a13',
                questionId: 'q4',
                text: {
                    'en': 'Getting employed',
                    'ar': 'الحصول على موظف',
                    'fr': 'Trouver un emploi',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'employment',
                }],
            },
            'a14': {
                id: 'a14',
                questionId: 'q4',
                text: {
                    'en': 'Learning English',
                    'ar': 'تعلم الانجليزية',
                    'fr': 'Apprendre l\'anglais',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'education',
                }],
            },
            'a15': {
                id: 'a15',
                questionId: 'q4',
                text: {
                    'en': 'Enrolling my children in school',
                    'ar': 'تسجيل أطفالي في المدرسة',
                    'fr': 'Inscription de mes enfants à l\'école',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'education',
                }],
            },
            'a16': {
                id: 'a16',
                questionId: 'q4',
                text: {
                    'en': 'Accessing health care',
                    'ar': 'الوصول إلى الرعاية الصحية',
                    'fr': 'Accès aux soins de santé',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'health',
                }],
            },
            'a17': {
                id: 'a17',
                questionId: 'q4',
                text: {
                    'en': 'Finances, taxes, banking',
                    'ar': 'المالية والضرائب والخدمات المصرفية',
                    'fr': 'Finances, impôts, opérations bancaires',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'money',
                }],
            },
            'a18': {
                id: 'a18',
                questionId: 'q4',
                text: {
                    'en': 'Finding a place to live',
                    'ar': 'العثور على مكان للعيش فيه',
                    'fr': 'Trouver un endroit pour vivre',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'housing',
                }],
            },
            'a19': {
                id: 'a19',
                questionId: 'q4',
                text: {
                    'en': 'Bringing my family to Canada',
                    'ar': 'جلب عائلتي إلى كندا',
                    'fr': 'Amener ma famille au Canada',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'legal',
                }],
            },
            'a20': {
                id: 'a20',
                questionId: 'q4',
                text: {
                    'en': 'Getting mental health support',
                    'ar': 'الحصول على دعم الصحة العقلية',
                    'fr': 'Obtenir un soutien en santé mentale',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'health',
                }],
            },
            'a21': {
                id: 'a21',
                questionId: 'q4',
                text: {
                    'en': 'Legal assistance and protection',
                    'ar': 'المساعدة القانونية والحماية',
                    'fr': 'Assistance juridique et protection',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'legal',
                }],
            },
            'a22': {
                id: 'a22',
                questionId: 'q4',
                text: {
                    'en': 'Enrolling myself in education',
                    'ar': 'تسجيل نفسي في التعليم',
                    'fr': 'M\'inscrire à l\'éducation',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'education',
                }],
            },
            'a27': {
                id: 'a27',
                questionId: 'q6',
                text: {
                    'en': 'Refugee claimant',
                    'ar': 'طالب اللجوء',
                    'fr': 'Demandeur d\'asile',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'immigrant_type',
                    taxonomyTermId: 'refugee_claimant',
                }],
            },
            'a28': {
                id: 'a28',
                questionId: 'q6',
                text: {
                    'en': 'Temporary resident',
                    'ar': 'سكن مؤقت',
                    'fr': 'Résident(e) temporaire',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'immigrant_type',
                    taxonomyTermId: 'temporary_resident',
                }],
            },
            'a29': {
                id: 'a29',
                questionId: 'q6',
                text: {
                    'en': 'Permanent resident',
                    'ar': 'مقيم دائم',
                    'fr': 'Résident(e) permanent',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'immigrant_type',
                    taxonomyTermId: 'permanent_resident',
                }],
            },
            'a30': {
                id: 'a30',
                questionId: 'q6',
                text: {
                    'en': 'Permanent resident',
                    'ar': 'مقيم دائم',
                    'fr': 'Résident(e) permanent',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'immigrant_type',
                    taxonomyTermId: 'permanent_resident',
                }],
            },
            'a31': {
                id: 'a31',
                questionId: 'q6',
                text: {
                    'en': 'None of the above, or I’m not sure',
                    'ar': 'لا شيء مما سبق ، أو لست متأكداx',
                    'fr': 'Rien de ce qui précède, ou je ne suis pas sûr',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'immigrant_type',
                    taxonomyTermId: 'unknown',
                }],
            },
            'a32': {
                id: 'a32',
                questionId: 'q7',
                text: {
                    'en': 'I just claimed at an airport, seaport, or land border crossing',
                    'ar': 'لقد ادعت للتو في مطار أو ميناء بحري أو معبر للحدود البرية',
                    'fr': 'Je viens de réclamer dans un aéroport, un port maritime ou un poste frontalier terrestre',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'refugee_claim_stage',
                    taxonomyTermId: 'claim_at_border',
                }],
            },
            'a33': {
                id: 'a33',
                questionId: 'q7',
                text: {
                    'en': 'I have not yet started but will claim at a CIC office inside Canada',
                    'ar': 'لم أبدأ بعد ولكن سوف ادعي في مكتب CIC داخل كندا',
                    'fr': 'Je n\'ai pas encore commencé mais je vais réclamer dans un bureau de CIC à l\'intérieur du Canada',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'refugee_claim_stage',
                    taxonomyTermId: 'not_started',
                }],
            },
            'a34': {
                id: 'a34',
                questionId: 'q7',
                text: {
                    'en': 'I just claimed at a CIC office inside Canada',
                    'ar': 'أنا فقط ادعى في مكتب CIC داخل كندا',
                    'fr': 'Je viens de réclamer dans un bureau de CIC à l\'intérieur du Canada',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'refugee_claim_stage',
                    taxonomyTermId: 'claim_at_cic_office',
                }],
            },
            'a35': {
                id: 'a35',
                questionId: 'q7',
                text: {
                    'en': 'I am waiting for my refugee hearing',
                    'ar': 'أنا في انتظار جلسة استماع للاجئين',
                    'fr': 'J\'attends mon audience sur le statut de réfugié',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'refugee_claim_stage',
                    taxonomyTermId: 'hearing',
                }],
            },
            'a36': {
                id: 'a36',
                questionId: 'q7',
                text: {
                    'en': 'I received a positive decision and can apply or have applied to be a Permanent Resident',
                    'ar': 'لقد تلقيت قرارًا إيجابيًا ويمكنني تقديم طلب أو تقدمت بطلب ليكون مقيمًا دائمًا',
                    'fr': 'J\'ai reçu une décision positive et je peux demander ou être inscrit comme résident(e) permanent',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'refugee_claim_stage',
                    taxonomyTermId: 'positive_decision',
                }],
            },
            'a37': {
                id: 'a37',
                questionId: 'q7',
                text: {
                    'en': 'I received a negative decision and want to learn about my options',
                    'ar': 'تلقيت قرارًا سلبيًا وتريد التعرف على خياراتي',
                    'fr': 'J\'ai reçu une décision négative et je veux en savoir plus sur mes options',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'refugee_claim_stage',
                    taxonomyTermId: 'negative_decision',
                }],
            },
            'a38': {
                id: 'a38',
                questionId: 'q8',
                text: {
                    'en': 'None',
                    'ar': 'لا شيء',
                    'fr': 'Aucun',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'english_level',
                    taxonomyTermId: 'none',
                }],
            },
            'a39': {
                id: 'a39',
                questionId: 'q8',
                text: {
                    'en': 'Beginner',
                    'ar': 'مبتدئ',
                    'fr': 'Débutant(e)',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'english_level',
                    taxonomyTermId: 'beginner',
                }],
            },
            'a40': {
                id: 'a40',
                questionId: 'q8',
                text: {
                    'en': 'Intermediate',
                    'ar': 'متوسط',
                    'fr': 'Intermédiaire',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'english_level',
                    taxonomyTermId: 'intermediate',
                }],
            },
            'a41': {
                id: 'a41',
                questionId: 'q8',
                text: {
                    'en': 'Fluent',
                    'ar': 'بطلاقة',
                    'fr': 'Couramment',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'english_level',
                    taxonomyTermId: 'fluent',
                }],
            },
            'a42': {
                id: 'a42',
                questionId: 'q9',
                text: {
                    'en': 'Women’s services',
                    'ar': 'خدمات النساء',
                    'fr': 'Les services aux femmes',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'group',
                    taxonomyTermId: 'women',
                }],
            },
            'a43': {
                id: 'a43',
                questionId: 'q9',
                text: {
                    'en': 'Services for people with disabilities',
                    'ar': 'خدمات لذوي الاحتياجات الخاصة',
                    'fr': 'Services pour les personnes handicapées',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'group',
                    taxonomyTermId: 'disability',
                }],
            },
            'a44': {
                id: 'a44',
                questionId: 'q9',
                text: {
                    'en': 'LGBTQ2 services',
                    'ar': 'خدمات LGBTQ2',
                    'fr': 'LGBTQ2 services',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'group',
                    taxonomyTermId: 'lgbtq2',
                }],
            },
            'a45': {
                id: 'a45',
                questionId: 'q9',
                text: {
                    'en': 'Services offered in French',
                    'ar': 'الخدمات المقدمة باللغة الفرنسية',
                    'fr': 'Services offerts en français',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'group',
                    taxonomyTermId: 'services_in_french',
                }],
            },
            'a46': {
                id: 'a46',
                questionId: 'q9',
                text: {
                    'en': 'Services for low income people',
                    'ar': 'خدمات لذوي الدخل المحدود',
                    'fr': 'Services pour les personnes à faible revenu',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'group',
                    taxonomyTermId: 'low_income',
                }],
            },
        },
    };
};
