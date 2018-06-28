import { LocalizedText } from '../locale';
import { Id as TaskId } from './tasks';
import { TaxonomyTermReference } from './taxonomies';

export type Id = string;

export interface Article {
    readonly id: Id;
    readonly title: LocalizedText;
    readonly description: LocalizedText;
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
    readonly relatedTasks: ReadonlyArray<TaskId>;
    readonly relatedArticles: ReadonlyArray<Id>;
    readonly isRecommendedToAllUsers: boolean;
    readonly starred: boolean;
}

export interface ArticleMap {
    readonly [key: string]: Article;
}

export interface Store {
    readonly articles: ArticleMap;
}

export const buildArticlesFixture = (): Store => (
    {
        articles: {
            'a1': {
                'id': 'a1',
                'title': {
                    'en': 'British Columbia\'s Education System',
                    'ar': 'نظام التعليم في كولومبيا البريطانية',
                    'zh': '卑诗省的教育体系',
                },
                'description': {
                    'en': 'In British Columbia, all children between the ages of five and sixteen must go to school.',
                    'ar': 'في كولومبيا البريطانية ، يجب أن يذهب جميع الأطفال الذين تتراوح أعمارهم بين الخامسة والسادسة عشرة إلى المدرسة.',
                    'zh': '在不列颠哥伦比亚省，所有五至十六岁的孩子都必须上学。',
                },
                'taxonomyTerms': [],
                'relatedTasks': ['t1', 't2', 't3'],
                'relatedArticles': ['a2'],
                'isRecommendedToAllUsers': false,
                'starred': false,
            },
            'a2': {
                'id': 'a2',
                'title': {
                    'en': 'Elementary, middle, and secondary school',
                    'ar': 'المدرسة الابتدائية والمتوسطة والثانوية',
                    'zh': '小学，中学和中学',
                },
                'description': {
                    'en': 'In British Columbia, all children between the ages of five and sixteen must go to school.',
                    'ar': 'في كولومبيا البريطانية ، يجب أن يذهب جميع الأطفال الذين تتراوح أعمارهم بين الخامسة والسادسة عشرة إلى المدرسة.',
                    'zh': '在不列颠哥伦比亚省，所有五至十六岁的孩子都必须上学。',
                },
                'taxonomyTerms': [],
                'relatedTasks': ['t1', 't2', 't3'],
                'relatedArticles': ['a1'],
                'isRecommendedToAllUsers': false,
                'starred': false,
            },
        },
    }
);