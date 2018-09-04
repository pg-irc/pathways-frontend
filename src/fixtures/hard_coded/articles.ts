import { ArticleStore } from '../types/articles';

export const buildArticlesFixture = (): ArticleStore => (
    {
        articles: {
            'a1': {
                'id': 'a1',
                'chapter': '',
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
                'chapter': '',
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