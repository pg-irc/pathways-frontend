import { Store } from '../types/tasks';
import { Taxonomies } from '../../application/constants';

const exploreTaxonomyId = Taxonomies.EXPLORE_TAXONOMY_ID;

export const buildTasksFixture = (): Store => {
    return {
        taskMap: {
            't1': {
                'id': 't1',
                'title': {
                    'en': 'Enroll child in elementary school.',
                    'ar': 'تسجيل الطفل في المدرسة الابتدائية.',
                    'zh': '小學入學兒童。',
                },
                'description': {
                    'en': 'Example description.',
                    'ar': 'وصف المثال.',
                    'zh': '示例描述。',
                },
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'Education',
                }],
                'tags': ['important', 'do soon', 'free'],
                'category': 'education',
                'importance': 1,
                'relatedTasks': ['t2'],
                'relatedArticles': ['a1', 'a2'],
            },
            't2': {
                'id': 't2',
                'title': {
                    'en': 'Register for Language Instruction for Newcomer to Canada (LINC) classes.',
                    'ar': 'سجل لتعليم اللغة للدروس الوافدة الجدد إلى كندا (LINC).',
                    'zh': '註冊加拿大新手語言課程（LINC）課程。',
                },
                'description': {
                    'en': 'Example description.',
                    'ar': 'وصف المثال.',
                    'zh': '示例描述。',
                },
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'Education',
                }],
                'tags': ['important', 'do soon', 'free'],
                'category': 'education',
                'importance': 1,
                'relatedTasks': ['t1'],
                'relatedArticles': ['a1'],
            },
            't3': {
                'id': 't3',
                'title': {
                    'en': 'Get support for English language learning for children.',
                    'ar': 'احصل على دعم لتعلم اللغة الإنجليزية للأطفال.',
                    'zh': '獲得對兒童英語學習的支持。',
                },
                'description': {
                    'en': 'Example description.',
                    'ar': 'وصف المثال.',
                    'zh': '示例描述。',
                },
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'Education',
                }],
                'tags': ['important', 'do soon', 'free'],
                'category': 'education',
                'importance': 1,
                'relatedTasks': ['t2'],
                'relatedArticles': ['a1'],
            },
            't4': {
                'id': 't4',
                'title': {
                    'en': 'Open a bank account',
                    'ar': 'افتح حساب بنكي',
                    'zh': '打開一個銀行賬戶',
                },
                'description': {
                    'en': 'Example description.',
                    'ar': 'وصف المثال.',
                    'zh': '示例描述。',
                },
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'Money',
                }],
                'tags': ['important'],
                'category': 'finance',
                'importance': 1,
                'relatedTasks': [],
                'relatedArticles': [],
            },
            't5': {
                'id': 't5',
                'title': {
                    'en': 'Get social insurance number (SIN)',
                    'ar': 'الحصول على رقم التأمين الاجتماعي (SIN)',
                    'zh': '獲取社會保險號碼（SIN）',
                },
                'description': {
                    'en': 'Example description.',
                    'ar': 'وصف المثال.',
                    'zh': '示例描述。',
                },
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'Money',
                }],
                'tags': ['important'],
                'category': 'employment',
                'importance': 1,
                'relatedTasks': [],
                'relatedArticles': [],
            },
        },
        taskUserSettingsMap: {
            'tu1': {
                'id': 'tu1',
                'taskId': 't1',
                'starred': false,
                'completed': false,
            },
            'tu2': {
                'id': 'tu2',
                'taskId': 't2',
                'starred': false,
                'completed': false,
            },
            'tu3': {
                'id': 'tu3',
                'taskId': 't3',
                'starred': false,
                'completed': false,
            },
            'tu4': {
                'id': 'tu4',
                'taskId': 't4',
                'starred': false,
                'completed': false,
            },
            'tu5': {
                'id': 'tu5',
                'taskId': 't5',
                'starred': false,
                'completed': false,
            },
        },
        savedTasksList: [],
    };
};
