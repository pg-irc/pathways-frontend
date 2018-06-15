import { LocalizedText } from '../locale';
import { TaxonomyTermReference } from './taxonomies';

export type Id = string;

export interface Task {
    readonly id: Id;
    readonly title: LocalizedText;
    readonly description: LocalizedText;
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
    readonly tags: ReadonlyArray<string>; // i.e important, do soon, free etc.
    readonly category: string; // i.e. education, health, transportation etc.
    readonly importance: number;
}

export interface TaskUserSettings {
    readonly id: Id;
    readonly taskId: Id;
    readonly starred: boolean;
    readonly completed: boolean;
}

export interface TaskMap {
    readonly [property: string]: Task;
}

export interface TaskUserSettingsMap {
    readonly [property: string]: TaskUserSettings;
}

export type TaskList = ReadonlyArray<Id>;

export interface Store {
    readonly taskMap: TaskMap;
    readonly taskUserSettingsMap: TaskUserSettingsMap;
    readonly savedTasksList: TaskList;
    readonly suggestedTasksList: TaskList;
}

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
                'taxonomyTerms': [],
                'tags': ['important', 'do soon', 'free'],
                'category': 'education',
                'importance': 1,
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
                'taxonomyTerms': [],
                'tags': ['important', 'do soon', 'free'],
                'category': 'education',
                'importance': 1,
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
                'taxonomyTerms': [],
                'tags': ['important', 'do soon', 'free'],
                'category': 'education',
                'importance': 1,
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
                'taxonomyTerms': [],
                'tags': ['important'],
                'category': 'finance',
                'importance': 1,
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
                'taxonomyTerms': [],
                'tags': ['important'],
                'category': 'employment',
                'importance': 1,
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
        savedTasksList: ['t1', 't2', 't3'],
        suggestedTasksList: ['t4', 't5'],
    };
};
