import { LocalizedText } from '../application/locale';

export type Id = string;

export interface Question {
    readonly id: Id;
    readonly text: LocalizedText;
    readonly acceptMultipleAnswers: boolean;
}

export interface QuestionsMap {
    readonly [key: string]: Question;
}

export interface Answer {
    readonly id: Id;
    readonly questionId: Id;
    readonly text: LocalizedText;
    readonly isSelected: boolean;
}

export interface AnswersMap {
    readonly [key: string]: Answer;
}

export interface Store {
    readonly questions: QuestionsMap;
    readonly answers: AnswersMap;
}

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
            },
        },
    };
};
