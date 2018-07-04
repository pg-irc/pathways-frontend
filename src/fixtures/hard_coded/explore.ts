// tslint:disable:max-line-length

import { Store } from '../types/explore';
import { Taxonomies } from '../../application/constants';

const exploreTaxonomyId = Taxonomies.EXPLORE_TAXONOMY_ID;

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
                    'ar': ' على دليل القادمين الجدد في بريتش كولومبيا يحتوي ستقرار في بريتش كولومبيا في إ معلومات ستساعدك على ال ولى من وصولك. أ شهر القليلة ال أال ت التي تتضمن معظم الفصول على قائمة بأسماء الوكال يمكنك الحصول منها على مزيد من المعلومات. سماء وأرقام قد تكون بعض المعلومات (مثل ال الهواتف والعناوين) قد تغيرت منذ وقت طباعة هذا الدليل. يجاد إستخدم الملحق في نهاية هذا الكتاب ل المعلومات في هذا الدليل. نترنت مكتوبة باللغة إ جميع المواقع على شبكة ال نجليزية. قد تقدم بعضها معلومات مكتوبة إ ال بلغات أخرى',
                    'zh': '自 1850 年起就有人陆续从中国来到卑诗省 （即 BC 省）。今天，10 个卑诗省民当中就有 1 个自称拥有华人血统。事实上，迁移到这里的人当中，来自中国的比来自全球任何其他地方的都要多。无论您想在这里创业、求学还是继续您的事业，您和您的家人有多种方法可来到加拿大卑诗省。本指南可让您了解那些能帮助您以永久居民、临时外籍劳工或国际学生的身份迁居卑诗省的计划，并会帮助您选择最适合您和您家人需要的计划，为您在卑诗省展开新生活做好准备',
                },
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'settling_in',
                }],
            },
            's2': {
                id: 's2',
                name: {
                    'en': 'Education',
                    'ar': 'التعليم',
                    'zh': '教育',
                },
                introduction: {
                    'en': 'In British Columbia, all children between the ages of five and 16 must go to school. The school system is made up of public schools and independent (private) schools. Public schools are fully funded by the B.C. government. There is no fee for your child to attend a public school. Independent schools are only partially funded by government. Parents are required to pay fees for their children to attend most independent schools. The provincial government (Ministry of Education), local boards of education, and independent school authorities manage the school system (Kindergarten to Grade 12). The provincial government funds the school system and sets the legislation, regulations, and policies to make sure that every school meets provincial standards and every student receives a high-quality education. www.gov.bc.ca/bced Children can also learn at home. For more information, see page 49.',
                    'ar': 'طفال من سن الـ في بريتش كولومبيا، يجب على جميع ال 5 إلى 16 الذهاب إلى المدرسة. ينقسم النظام المدرسي إلى مدارس عامة ومدارس مستقلة (خاصة). المدارس العامة هي مدارس مدعومة بشكل تام من قبل حكومة ل يتوجب دفع رسوم لكي يدرس طفلك بريتش كولومبيا. و في مدرسة عامة. أما المدارس المستقلة، فهي تحصل على تمويل جزئي من الحكومة. وعليه يتوجب على أولياء مور دفع رسوم لكي يدرس أطفالهم في معظم أ ال المدارس المستقلة. في بريتش كولومبيا، تقوم حكومة المقاطعة (وزارة التربية) ومجالس التربية المحلية وسلطات المدارس المستقلة بإدارة طفال إلى الصف 12). أ النظام المدرسي العام (من رياض ال تقوم حكومة المقاطعة بتمويل النظام التعليمي وتسن التشريعات والقوانين والسياسات لضمان توفر المعايير ذو ً قليمية في كافة المدارس وتلقي كافة الطلاب تعليما إ ال كفاءة عالية. www.gov.bc.ca/bced الحصول على التعليم في منازلهم. ً طفال أيضا أ يمكن للا لمزيد من المعلومات، يرجى مشاهدة الصفحة 49',
                    'zh': 'ί 卑 詩 省dהϞ 5 Ї 16 ๋ٙՅɝኪf ̋ɽ઺ԃӻ୕ʱй͟ʮࣧʿዹͭ ӷͭ ኪࣧଡ଼ϓfʮࣧ͟卑詩省ִ݁Όᅰ資пfՅ ഁజᛘʮࣧdኪ൬Όеfዹͭӷ̥ࣧ݊݁͟ ִ௅΅資пfɽ௅΅ٙӷࣧdኪ͛ٙ˨͎ே ࠅ˹൬f ί 卑 詩 省dኪ ࣧ ӻ ୕ ( ̼͟ຯ෤Ցୋ 12 फ ) ݊ ͟省ִ݁ 卑詩省઺ԃᝂ dᑌΝήਜٙ઺ԃ ҅ʿዹͭኪࣧዚ࿴˾ڌ΍Ν၍ଣf省ִ݁ ᅡಛ資п઺ԃӻ୕dԨ˲ࠈͭجԷձ஝ۆd ᜫהϞኪࣧୌΥ省ٙ઺ԃᅺ๟d՘ɢމӊ Зኪ͛౤Զ৷ሯ९ٙ઺ԃf www.gov.bc.ca/bced Յഁ͵̙˸वί࢕ʕኪ୦f༉ઋԈୋ 49 fࠫ',
                },
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'education',
                }],
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
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'healthCare',
                }],
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
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'money',
                }],
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
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'housing',
                }],
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
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'employment',
                }],
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
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'legal',
                }],
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
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'driving',
                }],
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
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'helpForIndividualsAndFamilies',
                }],
            },
        },
    }
);
