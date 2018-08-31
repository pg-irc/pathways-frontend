import { ValidTaskStore } from '../types/tasks';
import { Taxonomies } from '../../application/constants';

const exploreTaxonomyId = Taxonomies.EXPLORE_TAXONOMY_ID;

export const buildTasksFixture = (): ValidTaskStore => {
    return new ValidTaskStore({
        taskMap: {
            't1': {
                'id': 't1',
                'chapter': '',
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
                'completed': false,
                'relatedTasks': ['t2'],
                'relatedArticles': ['a1', 'a2'],
                'serviceQuery': 'elementary,school',
            },
            't2': {
                'id': 't2',
                'chapter': '',
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
                'completed': false,
                'relatedTasks': ['t1'],
                'relatedArticles': ['a1'],
                'serviceQuery': 'linc',
            },
            't3': {
                'id': 't3',
                'chapter': '',
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
                'completed': false,
                'relatedTasks': ['t2'],
                'relatedArticles': ['a1'],
                'serviceQuery': 'child,english,language,learning',
            },
            't4': {
                'id': 't4',
                'chapter': '',
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
                'completed': false,
                'relatedTasks': [],
                'relatedArticles': [],
                'serviceQuery': 'bank,account',
            },
            't5': {
                'id': 't5',
                'chapter': '',
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
                'completed': false,
                'relatedTasks': [],
                'relatedArticles': [],
                'serviceQuery': 'social,insurance,number',
            },
        },
        savedTasksList: [],
    });
};
