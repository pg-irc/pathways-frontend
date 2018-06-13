import { LocalizedText } from '../locale';

export type Id = string;

export interface ExploreSection {
    readonly id: Id;
    readonly name: LocalizedText;
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
                icon: 'sign-direction',
            },
            's2': {
                id: 's2',
                name: {
                    'en': 'Education',
                    'ar': 'التعليم',
                    'zh': '教育',
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
                icon: 'medical-bag',
            },
            's4': {
                id: 's4',
                name: {
                    'en': 'Money & banking',
                    'ar': 'المال والبنوك',
                    'zh': '货币和银行',
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
                icon: 'home',
            },
            's6': {
                id: 's6',
                name: {
                    'en': 'Employment',
                    'ar': 'توظيف',
                    'zh': '雇用',
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
                icon: 'gavel',
            },
            's8': {
                id: 's8',
                name: {
                    'en': 'Driving',
                    'ar': 'القيادة',
                    'zh': '驾驶',
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
                icon: 'account',
            },
        },
    }
);
