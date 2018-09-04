// tslint:disable:max-line-length

import { ExploreStore } from '../types/explore';
import { Taxonomies } from '../../application/constants';

const exploreTaxonomyId = Taxonomies.EXPLORE_TAXONOMY_ID;

export const buildExploreFixture = (): ExploreStore => (
    {
        sections: {
            's1': {
                id: 's1',
                name: {
                    'en': 'Settling in',
                    'ar': 'تسوية في',
                    'fr': 'S\'installer',
                },
                introduction: {
                    'en': 'The provincial edition of the Newcomers’ Guide has information for people living anywhere in B.C. It has been translated into simplified and traditional Chinese, Punjabi, Tagalog, Arabic, Korean and French. It is available online and in print. Local editions have details and contact information for services in 26 different communities across B.C. They are available online, and in English only. www.welcomebc.ca/newcomersguides',
                    'ar': ' على دليل القادمين الجدد في بريتش كولومبيا يحتوي ستقرار في بريتش كولومبيا في إ معلومات ستساعدك على ال ولى من وصولك. أ شهر القليلة ال أال ت التي تتضمن معظم الفصول على قائمة بأسماء الوكال يمكنك الحصول منها على مزيد من المعلومات. سماء وأرقام قد تكون بعض المعلومات (مثل ال الهواتف والعناوين) قد تغيرت منذ وقت طباعة هذا الدليل. يجاد إستخدم الملحق في نهاية هذا الكتاب ل المعلومات في هذا الدليل. نترنت مكتوبة باللغة إ جميع المواقع على شبكة ال نجليزية. قد تقدم بعضها معلومات مكتوبة إ ال بلغات أخرى',
                    'fr': 'L\'édition provinciale du Guide des nouveaux arrivants contient de l\'information à l\'intention des personnes vivant en C.-B. Il a été traduit en chinois simplifié et traditionnel, punjabi, tagalog, arabe, coréen et français. Il est disponible en ligne et en version imprimée. Les éditions locales ont des détails et des informations de contact pour les services dans 26 communautés différentes à travers B.C. Ils sont disponibles en ligne et en anglais seulement. www.welcomebc.ca/newcomersguides',
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
                    'fr': 'Éducation',
                },
                introduction: {
                    'en': 'In British Columbia, all children between the ages of five and 16 must go to school. The school system is made up of public schools and independent (private) schools. Public schools are fully funded by the B.C. government. There is no fee for your child to attend a public school. Independent schools are only partially funded by government. Parents are required to pay fees for their children to attend most independent schools. The provincial government (Ministry of Education), local boards of education, and independent school authorities manage the school system (Kindergarten to Grade 12). The provincial government funds the school system and sets the legislation, regulations, and policies to make sure that every school meets provincial standards and every student receives a high-quality education. www.gov.bc.ca/bced Children can also learn at home.',
                    'ar': 'طفال من سن الـ في بريتش كولومبيا، يجب على جميع ال 5 إلى 16 الذهاب إلى المدرسة. ينقسم النظام المدرسي إلى مدارس عامة ومدارس مستقلة (خاصة). المدارس العامة هي مدارس مدعومة بشكل تام من قبل حكومة ل يتوجب دفع رسوم لكي يدرس طفلك بريتش كولومبيا. و في مدرسة عامة. أما المدارس المستقلة، فهي تحصل على تمويل جزئي من الحكومة. وعليه يتوجب على أولياء مور دفع رسوم لكي يدرس أطفالهم في معظم أ ال المدارس المستقلة. في بريتش كولومبيا، تقوم حكومة المقاطعة (وزارة التربية) ومجالس التربية المحلية وسلطات المدارس المستقلة بإدارة طفال إلى الصف 12). أ النظام المدرسي العام (من رياض ال تقوم حكومة المقاطعة بتمويل النظام التعليمي وتسن التشريعات والقوانين والسياسات لضمان توفر المعايير ذو ً قليمية في كافة المدارس وتلقي كافة الطلاب تعليما إ ال كفاءة عالية. www.gov.bc.ca/bced الحصول على التعليم في منازلهم. ً طفال أيضا أ يمكن للا لمزيد من المعلومات، يرجى مشاهدة الصفحة 49',
                    'fr': 'En Colombie-Britannique, tous les enfants âgés de cinq à 16 ans doivent aller à l\'école. Le système scolaire est composé d\'écoles publiques et d\'écoles indépendantes (privées). Les écoles publiques sont entièrement financées par le B.C. gouvernement. Il n\'y a pas de frais pour que votre enfant fréquente une école publique. Les écoles indépendantes ne sont financées que partiellement par le gouvernement. Les parents sont tenus de payer des frais pour que leurs enfants fréquentent la plupart des écoles indépendantes. Le gouvernement provincial (ministère de l\'Éducation), les conseils scolaires locaux et les administrations scolaires indépendantes gèrent le système scolaire (de la maternelle à la 12e année). Le gouvernement provincial finance le système scolaire et établit les lois, les règlements et les politiques pour s\'assurer que chaque école répond aux normes provinciales et que chaque élève reçoit une éducation de haute qualité. www.gov.bc.ca/bced Les enfants peuvent aussi apprendre à la maison.',
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
                    'fr': 'Soins de santé',
                },
                introduction: {
                    'en': '',
                    'ar': '',
                    'fr': '',
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
                    'fr': 'Argent et banque',
                },
                introduction: {
                    'en': '',
                    'ar': '',
                    'fr': '',
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
                    'fr': 'Logement',
                },
                introduction: {
                    'en': '',
                    'ar': '',
                    'fr': '',
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
                    'fr': 'Emploi',
                },
                introduction: {
                    'en': '',
                    'ar': '',
                    'fr': '',
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
                    'fr': 'Système juridique et immigration',
                },
                introduction: {
                    'en': 'When you arrive in Canada, you should learn how Canadian laws work. They may be different from your own country’s laws.\nThe federal (Canadian) government manages laws that affect the whole country. Provincial and territorial governments manage laws for only one province or territory (like British Columbia). Municipal governments manage laws for towns and cities (like Victoria or Metro Vancouver). Canadians vote for all levels of government. Each level of government makes laws. The courts enforce the law, but they are separate from the government.\nCanada has a law called the Canadian Charter of Rights and Freedoms. These rights and freedoms are very important to Canadians. The charter says that all Canadians have the right to speak freely, practise their own religion, live and work anywhere in Canada, and participate in peaceful political activities. https://laws-lois.justice.gc.ca/eng/Const/page-15.html',
                    'ar': 'عندما تأتي إلى كندا، يجب عليك فهم كيفية عمل نها قد تكون مختلفة عن القوانينأ القوانين الكندية ل صلي.  أ في بلدك ال تتولى الحكومة الفدرالية (الكندية) مسؤولية القوانين قليمية وحكومة إ التي تخص الدولة بأكملها. أما الحكومة ال ن القوانين المتعلقة بأقليم واحد المقاطعة فإنهما تتول أو مقاطعة واحدة (مثل بريتش كولومبيا). أما الحكومات البلدية فإنها تتولى مسؤولية القوانين المتعلقة بالمدن والبلدات (مثل فكتوريا أو مترو فانكوفر). ينتخب الكنديون جميع هذه المستويات الحكومية والتي لها حق إصدار القوانين. أما المحاكم، فتتولى تطبيق القانون وتكون مستقلة عن الحكومة.  يسمى الميثاق الكندي للحقوق يوجد في كندا قانون Canadian Charter of Rights and( والحرياتً . تعتبر هذه الحقوق والحريات مهمة جدا (Freedoms) للكنديين وتشمل على: الحق في حرية التعبير وحرية العقيدة وحرية العيش والعمل في أي مكان في كندا والحق في المشاركة في النشاط السياسي السلمي. https://laws-lois.justice.gc.ca/eng/Const/page-15.htm',
                    'fr': 'À votre arrivée au Canada, renseignez-vous sur le système juridique canadien. Il est peut-être différent de celui de votre pays d’origine.\nLe gouvernement fédéral (canadien) s’occupe des lois qui touchent le pays dans sa totalité. Les gouvernements provinciaux et territoriaux s’occupent des lois d’une province ou d’un territoire en particulier (comme la Colombie Britannique). Les gouvernements municipaux s’occupent des lois des villes et localités (comme Victoria et Metro Vancouver (la région métropolitaine de Vancouver). Les Canadiens votent à tous les niveaux gouvernementaux. Chaque niveau gouvernemental crée des lois. Les tribunaux font appliquer ces lois, mais ils ne font pas partie du gouvernement.\nLe Canada possède une série de lois appelée la Charte canadienne des droits et libertés. Ces droits et libertés sont très importants pour les Canadiens. La Charte stipule que tous les Canadiens ont le droit de s’exprimer librement, de pratiquer leur propre religion, de vivre et travailler partout au Canada, et de participer à des activités politiques pacifiques. https://laws-lois.justice.gc.ca/eng/Const/page-15.html',
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
                    'fr': 'Conduite',
                },
                introduction: {
                    'en': '',
                    'ar': '',
                    'fr': '',
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
                    'fr': 'Aide pour les individus et les familles',
                },
                introduction: {
                    'en': '',
                    'ar': '',
                    'fr': '',
                },
                'taxonomyTerms': [{
                    'taxonomyId': exploreTaxonomyId,
                    'taxonomyTermId': 'helpForIndividualsAndFamilies',
                }],
            },
        },
    }
);
