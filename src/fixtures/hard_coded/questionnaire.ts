import { Store } from '../types/questionnaire';

export const buildQuestionnaireFixture = (): Store => {
    return {
        questions: {
            'q1': {
                id: 'q1',
                text: {
                    'en': 'How long have you been in Canada?',
                    'ar': 'منذ متى وأنت في كندا؟',
                    'zh': '你在加拿大多久了？',
                },
                explanation: {
                    'en': 'Testing the explanation field.',
                    'ar': 'اختبار حقل التفسير.',
                    'zh': '测试解释领域。',
                },
                acceptMultipleAnswers: false,
            },
            'q2': {
                id: 'q2',
                text: {
                    'en': 'You are settling in Canada ...',
                    'ar': 'انت تستقر في كندا ...',
                    'zh': '你在加拿大定居...',
                },
                acceptMultipleAnswers: false,
            },
            'q3': {
                id: 'q3',
                text: {
                    'en': 'Which age group do you belong to?',
                    'ar': 'ما هي الفئة العمرية التي تنتمي إليها؟',
                    'zh': '你屬於哪個年齡組？',
                },
                acceptMultipleAnswers: false,
            },
            'q4': {
                id: 'q4',
                text: {
                    'en': 'What do you need help with in Canada?',
                    'ar': 'ما الذي تحتاجه للمساعدة في كندا؟',
                    'zh': '你在加拿大需要什麼幫助？',
                },
                acceptMultipleAnswers: true,
            },
            'q5': {
                id: 'q5',
                text: {
                    'en': 'Which age group do you belong to?',
                },
                acceptMultipleAnswers: false,
            },
            'q6': {
                id: 'q6',
                text: {
                    'en': 'Which immigrant type do you currently identify as?'
                },
                acceptMultipleAnswers: false,
            },
            'q7': {
                id: 'q7',
                text: {
                    'en': 'What is your current stage in the refugee claim process?',
                },
                acceptMultipleAnswers: false,
            },
            'q8': {
                id: 'q8',
                text: {
                    'en': 'What is your level of English?',
                },
                acceptMultipleAnswers: true,
            },
            'q9': {
                id: 'q9',
                text: {
                    'en': 'Finally, are you interested in learning about services for special groups?',
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
                    'zh': '我計劃搬到加拿大',
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
                    'zh': '我剛剛不到1個月前抵達',
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
                    'zh': '少於6個月',
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
                    'zh': '不到1年',
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
                    'zh': '不到2年',
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
                    'zh': '超過2年',
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
                    'zh': '由你自己',
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
                    'zh': '和你的家人',
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
                    'zh': '13歲以下',
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
                    'zh': '13-18歲',
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
                    'zh': '18-64歲',
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
                    'ar': '18-64 سنة',
                    'zh': '18-64歲',
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
                    'zh': '獲得工作',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'explore',
                    'taxonomyTermId': 'employment',
                }],
            },
            'a14': {
                id: 'a14',
                questionId: 'q4',
                text: {
                    'en': 'Learning English',
                    'ar': 'تعلم الانجليزية',
                    'zh': '學習英語',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'explore',
                    'taxonomyTermId': 'education',
                }],
            },
            'a15': {
                id: 'a15',
                questionId: 'q4',
                text: {
                    'en': 'Enrolling my children in school',
                    'ar': 'تسجيل أطفالي في المدرسة',
                    'zh': '將我的孩子報名參加學校',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'explore',
                    'taxonomyTermId': 'education',
                }],
            },
            'a16': {
                id: 'a16',
                questionId: 'q4',
                text: {
                    'en': 'Accessing health care',
                    'ar': 'الوصول إلى الرعاية الصحية',
                    'zh': '獲得醫療保健',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'explore',
                    'taxonomyTermId': 'health',
                }],
            },
            'a17': {
                id: 'a17',
                questionId: 'q4',
                text: {
                    'en': 'Finances, taxes, banking',
                    'ar': 'المالية والضرائب والخدمات المصرفية',
                    'zh': '財政，稅收，銀行業務',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'explore',
                    'taxonomyTermId': 'money',
                }],
            },
            'a18': {
                id: 'a18',
                questionId: 'q4',
                text: {
                    'en': 'Finding a place to live',
                    'ar': 'العثور على مكان للعيش فيه',
                    'zh': '找到一個生活的地方',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'explore',
                    'taxonomyTermId': 'housing',
                }],
            },
            'a19': {
                id: 'a19',
                questionId: 'q4',
                text: {
                    'en': 'Bringing my family to Canada',
                    'ar': 'جلب عائلتي إلى كندا',
                    'zh': '把我的家人帶到加拿大',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'explore',
                    'taxonomyTermId': 'legal',
                }],
            },
            'a20': {
                id: 'a20',
                questionId: 'q4',
                text: {
                    'en': 'Getting mental health support',
                    'ar': 'الحصول على دعم الصحة العقلية',
                    'zh': '獲得心理健康支持',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'explore',
                    'taxonomyTermId': 'health',
                }],
            },
            'a21': {
                id: 'a21',
                questionId: 'q4',
                text: {
                    'en': 'Legal assistance and protection',
                    'ar': 'المساعدة القانونية والحماية',
                    'zh': '法律援助和保護',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'explore',
                    'taxonomyTermId': 'legal',
                }],
            },
            'a22': {
                id: 'a22',
                questionId: 'q4',
                text: {
                    'en': 'Enrolling myself in education',
                    'ar': 'تسجيل نفسي في التعليم',
                    'zh': '報名參加教育',
                },
                isSelected: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'explore',
                    'taxonomyTermId': 'education',
                }],
            },
            'a23': {
                id: 'a23',
                questionId: 'q5',
                text: {
                    'en': 'Under 13 years old',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'age',
                    taxonomyTermId: 'under_13',
                }],
            },
            'a24': {
                id: 'a24',
                questionId: 'q5',
                text: {
                    'en': '13-18 years old',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'age',
                    taxonomyTermId: '13_to_18',
                }],
            },
            'a25': {
                id: 'a25',
                questionId: 'q5',
                text: {
                    'en': '18-64 years old',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'age',
                    taxonomyTermId: '18_to_64',
                }],
            },
            'a26': {
                id: 'a26',
                questionId: 'q5',
                text: {
                    'en': '65+ years old',
                },
                isSelected: false,
                taxonomyTerms: [{
                    taxonomyId: 'age',
                    taxonomyTermId: 'over_65',
                }],
            },
            'a27': {
                id: 'a27',
                questionId: 'q6',
                text: {
                    'en': 'Refugee claimant',
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
