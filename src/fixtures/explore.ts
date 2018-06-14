// tslint:disable:max-line-length

import { LocalizedText } from '../locale';

export type Id = string;

export interface ExploreSection {
    readonly id: Id;
    readonly name: LocalizedText;
    readonly introduction: LocalizedText;
    readonly icon: string;
}

export interface ExploreSectionMap {
    readonly [key: string]: ExploreSection;
}

export interface Store {
    readonly sections: ExploreSectionMap;
}

export const buildExploreFixture = (): Store => (
    {
        sections: {
            's1': {
                id: 's1',
                name: {
                    'en': 'Settling in',
                    'ar': 'تسوية في',
                    'zh': '定居',
                },
                introduction: {
                    'en': 'The provincial edition of the Newcomers’ Guide has information for people living anywhere in B.C. It has been translated into simplified and traditional Chinese, Punjabi, Tagalog, Arabic, Korean and French. It is available online and in print. Local editions have details and contact information for services in 26 different communities across B.C. They are available online, and in English only. www.welcomebc.ca/newcomersguides',
                    'ar': ' على دليل القادمين الجدد في بريتش كولومبيا يحتوي  ستقرار في بريتش كولومبيا في إ معلومات ستساعدك على ال ولى من وصولك. أ شهر القليلة ال أال ت التي تتضمن معظم الفصول على قائمة بأسماء الوكال يمكنك الحصول منها على مزيد من المعلومات. سماء وأرقام  قد تكون بعض المعلومات (مثل ال الهواتف والعناوين) قد تغيرت منذ وقت طباعة هذا الدليل. يجاد  إستخدم الملحق في نهاية هذا الكتاب ل المعلومات في هذا الدليل. نترنت مكتوبة باللغة إ جميع المواقع على شبكة ال نجليزية. قد تقدم بعضها معلومات مكتوبة إ ال بلغات أخرى',
                    'zh': '自 1850 年起就有人陆续从中国来到卑诗省 （即 BC 省）。今天，10 个卑诗省民当中就有 1 个自称拥有华人血统。事实上，迁移到这里的人当中，来自中国的比来自全球任何其他地方的都要多。无论您想在这里创业、求学还是继续您的事业，您和您的家人有多种方法可来到加拿大卑诗省。本指南可让您了解那些能帮助您以永久居民、临时外籍劳工或国际学生的身份迁居卑诗省的计划，并会帮助您选择最适合您和您家人需要的计划，为您在卑诗省展开新生活做好准备',
                },
                icon: 'sign-direction',
            },
            's2': {
                id: 's2',
                name: {
                    'en': 'Education',
                    'ar': 'التعليم',
                    'zh': '教育',
                },
                introduction: {
                    'en': '',
                    'ar': '',
                    'zh': '',
                },
                icon: 'book-open-variant',
            },
            's3': {
                id: 's3',
                name: {
                    'en': 'Health care',
                    'ar': 'الرعاىة الصحية',
                    'zh': '卫生保健',
                },
                introduction: {
                    'en': '',
                    'ar': '',
                    'zh': '',
                },
                icon: 'medical-bag',
            },
            's4': {
                id: 's4',
                name: {
                    'en': 'Money & banking',
                    'ar': 'المال والبنوك',
                    'zh': '货币和银行',
                },
                introduction: {
                    'en': '',
                    'ar': '',
                    'zh': '',
                },
                icon: 'currency-usd',
            },
            's5': {
                id: 's5',
                name: {
                    'en': 'Housing',
                    'ar': 'الإسكان',
                    'zh': '住房',
                },
                introduction: {
                    'en': '',
                    'ar': '',
                    'zh': '',
                },
                icon: 'home',
            },
            's6': {
                id: 's6',
                name: {
                    'en': 'Employment',
                    'ar': 'توظيف',
                    'zh': '雇用',
                },
                introduction: {
                    'en': '',
                    'ar': '',
                    'zh': '',
                },
                icon: 'briefcase',
            },
            's7': {
                id: 's7',
                name: {
                    'en': 'Legal system & immigration',
                    'ar': 'النظام القانوني والهجرة',
                    'zh': '法律制度和移民',
                },
                introduction: {
                    'en': '',
                    'ar': '',
                    'zh': '',
                },
                icon: 'gavel',
            },
            's8': {
                id: 's8',
                name: {
                    'en': 'Driving',
                    'ar': 'القيادة',
                    'zh': '驾驶',
                },
                introduction: {
                    'en': '',
                    'ar': '',
                    'zh': '',
                },
                icon: 'car',
            },
            's9': {
                id: 's9',
                name: {
                    'en': 'Help for individuals & families',
                    'ar': 'مساعدة للأفراد والعائلات',
                    'zh': '帮助个人和家庭',
                },
                introduction: {
                    'en': '',
                    'ar': '',
                    'zh': '',
                },
                icon: 'account',
            },
        },
    }
);
