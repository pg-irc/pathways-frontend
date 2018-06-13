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
                },
                icon: 'sign-direction',
            },
            's2': {
                id: 's2',
                name: {
                    'en': 'Education',
                },
                icon: 'book-open-variant',
            },
            's3': {
                id: 's3',
                name: {
                    'en': 'Health care',
                },
                icon: 'medical-bag',
            },
            's4': {
                id: 's4',
                name: {
                    'en': 'Money & banking',
                },
                icon: 'currency-usd',
            },
            's5': {
                id: 's5',
                name: {
                    'en': 'Housing',
                },
                icon: 'home',
            },
            's6': {
                id: 's6',
                name: {
                    'en': 'Employment',
                },
                icon: 'briefcase',
            },
            's7': {
                id: 's7',
                name: {
                    'en': 'Legal system & immigration',
                },
                icon: 'gavel',
            },
            's8': {
                id: 's8',
                name: {
                    'en': 'Driving',
                },
                icon: 'car',
            },
            's9': {
                id: 's9',
                name: {
                    'en': 'Help for individuals & families',
                },
                icon: 'account-group',
            },
        },
    }
);
