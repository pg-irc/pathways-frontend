import { ValidQuestionnaireStore, QuestionnaireRouteState } from '../types/questionnaire';

export const buildQuestionnaireFixture = (): ValidQuestionnaireStore => {
    return new ValidQuestionnaireStore({
        questionnaireRouteState: QuestionnaireRouteState.NotInQuestionnairePage,
        oldAnswers: {},
        activeQuestion: 'questionHowLongInCanada',
        questions: {
            'questionHowLongInCanada': {
                id: 'questionHowLongInCanada',
                text: {
                    'en': 'How long have you been in Canada?',
                    'ar': 'منذ متى وأنت في كندا؟',
                    'fr': 'Depuis combien de temps êtes-vous au Canada?',
                },
                acceptMultipleAnswers: false,
            },
            'questionAloneOrWithFamily': {
                id: 'questionAloneOrWithFamily',
                text: {
                    'en': 'You are settling in Canada ...',
                    'ar': 'انت تستقر في كندا ...',
                    'fr': 'Vous vous installez au Canada ...',
                },
                acceptMultipleAnswers: false,
            },
            'questionAgeGroup': {
                id: 'questionAgeGroup',
                text: {
                    'en': 'Which age group do you belong to?',
                    'ar': 'ما هي الفئة العمرية التي تنتمي إليها؟',
                    'fr': 'De quoi avez-vous besoin pour aider au Canada?',
                },
                acceptMultipleAnswers: false,
            },
            'questionWhatHelpDoYouNeed': {
                id: 'questionWhatHelpDoYouNeed',
                text: {
                    'en': 'What do you need help with in Canada?',
                    'ar': 'ما الذي تحتاجه للمساعدة في كندا؟',
                    'fr': 'De quoi avez-vous besoin pour aider au Canada?',
                },
                acceptMultipleAnswers: true,
            },




            'questionConnectingWithOthers': {
                id: 'questionConnectingWithOthers',
                text: {
                    'en': 'Are you interested in information about how to connect with others?',
                },
                acceptMultipleAnswers: true,
            },
            'questionCurrentHousingSituation': {
                id: 'questionCurrentHousingSituation',
                text: {
                    'en': 'What is your current housing situation?',
                },
                acceptMultipleAnswers: true,
            },
            'questionMoneyAndBanking': {
                id: 'questionMoneyAndBanking',
                text: {
                    'en': 'Information about money and banking',
                },
                acceptMultipleAnswers: true,
            },






            'questionImmigrantType': {
                id: 'questionImmigrantType',
                text: {
                    'en': 'Which immigrant type do you currently identify as?',
                    'ar': 'ما نوع المهاجر الذي تعرفه حاليا؟',
                    'fr': 'Quel type d\'immigrant identifiez-vous actuellement?',
                },
                acceptMultipleAnswers: false,
            },
            'questionStageInRefugeeProcess': {
                id: 'questionStageInRefugeeProcess',
                text: {
                    'en': 'What is your current stage in the refugee claim process?',
                    'ar': 'ما هو مستواك في اللغة الإنجليزية؟',
                    'fr': 'Quelle est votre étape actuelle dans le processus de demande d\'asile?',
                },
                acceptMultipleAnswers: false,
            },
            'questionEnglishLevel': {
                id: 'questionEnglishLevel',
                text: {
                    'en': 'What is your level of English?',
                    'ar': 'ما هو مستواك في اللغة الإنجليزية؟',
                    'fr': 'Quel est votre niveau d\'anglais?',
                },
                acceptMultipleAnswers: true,
            },
            'questionGroups': {
                id: 'questionGroups',
                text: {
                    'en': 'Finally, are you interested in learning about services for special groups?',
                    'ar': 'وأخيرًا ، هل أنت مهتم بالتعرف على الخدمات الخاصة بالمجموعات الخاصة؟',
                    'fr': 'Enfin, êtes-vous intéressé à en apprendre davantage sur les services offerts aux groupes spéciaux?',
                },
                acceptMultipleAnswers: true,
            },
        },
        answers: {
            'a1': {
                id: 'a1',
                questionId: 'questionHowLongInCanada',
                text: {
                    'en': 'I am planning to move to Canada',
                    'ar': 'أخطط للانتقال إلى كندا',
                    'fr': 'Je prévois déménager au Canada',
                },
                isChosen: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'time_in_canada',
                    'taxonomyTermId': 'not_yet_arrived',
                }],
            },
            'a2': {
                id: 'a2',
                questionId: 'questionHowLongInCanada',
                text: {
                    'en': 'I just arrived less than 1 month ago',
                    'ar': 'لقد وصلت للتو قبل أقل من شهر',
                    'fr': 'Je viens d\'arriver il y a moins d\'un mois',
                },
                isChosen: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'time_in_canada',
                    'taxonomyTermId': 'under_1_month',
                }],
            },
            'a3': {
                id: 'a3',
                questionId: 'questionHowLongInCanada',
                text: {
                    'en': 'Less than 6 months',
                    'ar': 'أقل من 6 أشهر',
                    'fr': 'Moins de 6 mois',
                },
                isChosen: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'time_in_canada',
                    'taxonomyTermId': 'under_6_months',
                }],
            },
            'a4': {
                id: 'a4',
                questionId: 'questionHowLongInCanada',
                text: {
                    'en': 'Less than 1 year',
                    'ar': 'أقل من 1 سنة',
                    'fr': 'Moins d\'un an',
                },
                isChosen: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'time_in_canada',
                    'taxonomyTermId': 'under_1_year',
                }],
            },
            'a5': {
                id: 'a5',
                questionId: 'questionHowLongInCanada',
                text: {
                    'en': 'Less than 2 years',
                    'ar': 'أقل من سنتين',
                    'fr': 'Moins de 2 ans',
                },
                isChosen: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'time_in_canada',
                    'taxonomyTermId': 'under_2_years',
                }],
            },
            'a6': {
                id: 'a6',
                questionId: 'questionHowLongInCanada',
                text: {
                    'en': 'More than 2 years',
                    'ar': 'أكثر من 2 سنوات',
                    'fr': 'Plus de 2 ans',
                },
                isChosen: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'time_in_canada',
                    'taxonomyTermId': 'over_2_years',
                }],
            },
            'a7': {
                id: 'a7',
                questionId: 'questionAloneOrWithFamily',
                text: {
                    'en': 'by yourself',
                    'ar': 'بنفسك',
                    'fr': 'par vous-même',
                },
                isChosen: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'user',
                    'taxonomyTermId': 'alone',
                }],
            },
            'a8': {
                id: 'a8',
                questionId: 'questionAloneOrWithFamily',
                text: {
                    'en': 'with your family',
                    'ar': 'مع عائلتك',
                    'fr': 'avec ta famille',
                },
                isChosen: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'user',
                    'taxonomyTermId': 'with_family',
                }],
            },
            'answerAgeUnder5': {
                id: 'answerAgeUnder5',
                questionId: 'questionAgeGroup',
                text: {
                    'en': 'Under 5 years old',
                    'ar': 'تحت 5 سنة',
                    'fr': 'Moins de 5 ans',
                },
                isChosen: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'age',
                    'taxonomyTermId': 'under_5',
                }],
            },
            'answerAge5to12': {
                id: 'answerAge5to12',
                questionId: 'questionAgeGroup',
                text: {
                    'en': '5-12 years old',
                    'ar': '5-12 سنة',
                    'fr': '5-12 ans',
                },
                isChosen: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'age',
                    'taxonomyTermId': '5_to_12',
                }],
            },
            'answerAge13to18': {
                id: 'answerAge13to18',
                questionId: 'questionAgeGroup',
                text: {
                    'en': '13-18 years old',
                    'ar': '13-18 سنة',
                    'fr': '13-18 ans',
                },
                isChosen: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'age',
                    'taxonomyTermId': '13_to_18',
                }],
            },
            'answerAge18to65': {
                id: 'answerAge18to65',
                questionId: 'questionAgeGroup',
                text: {
                    'en': '18-65 years old',
                    'ar': '18-65 سنة',
                    'fr': '18-65 ans',
                },
                isChosen: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'age',
                    'taxonomyTermId': '18_to_65',
                }],
            },
            'answerAgeOver65': {
                id: 'answerAgeOver65',
                questionId: 'questionAgeGroup',
                text: {
                    'en': '65+ years old',
                    'ar': '65+ سنة',
                    'fr': '65+ ans',
                },
                isChosen: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'age',
                    'taxonomyTermId': 'over_65',
                }],
            },
            'answerHelpFindingServices': {
                id: 'answerHelpFindingServices',
                questionId: 'questionWhatHelpDoYouNeed',
                text: {
                    'en': 'Help finding information about services',
                },
                isChosen: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'helpWith',
                    'taxonomyTermId': 'findingServices',
                }],
            },
            'answerHelpWithMentalHealth': {
                id: 'answerHelpWithMentalHealth',
                questionId: 'questionWhatHelpDoYouNeed',
                text: {
                    'en': 'Mental health TODO rephrace question',
                },
                isChosen: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'helpWith',
                    'taxonomyTermId': 'mentalHealth',
                }],
            },
            'answerHelpWithViolence': {
                id: 'answerHelpWithViolence',
                questionId: 'questionWhatHelpDoYouNeed',
                text: {
                    'en': 'Have you suffered from violence, abuse or neglect, now or in the past',
                },
                isChosen: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'helpWith',
                    'taxonomyTermId': 'violence',
                }],
            },
            'answerHelpWithSubstanceUse': {
                id: 'answerHelpWithSubstanceUse',
                questionId: 'questionWhatHelpDoYouNeed',
                text: {
                    'en': 'Do you need help related to alcohol, substance use or gambling?',
                },
                isChosen: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'helpWith',
                    'taxonomyTermId': 'substanceUse',
                }],
            },






            'answerConnectLibraries': {
                id: 'answerConnectLibraries',
                questionId: 'questionConnectingWithOthers',
                text: {
                    'en': 'Libraries and community centres',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'communicating',
                    taxonomyTermId: 'libraries',
                }],
            },
            'answerConnectOrganizations': {
                id: 'answerConnectOrganizations',
                questionId: 'questionConnectingWithOthers',
                text: {
                    'en': 'Joining organizations and communities',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'communicating',
                    taxonomyTermId: 'join_organizations',
                }],
            },
            'answerConnectInternet': {
                id: 'answerConnectInternet',
                questionId: 'questionConnectingWithOthers',
                text: {
                    'en': 'Internet',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'communicating',
                    taxonomyTermId: 'internet',
                }],
            },
            'answerConnectPhone': {
                id: 'answerConnectPhone',
                questionId: 'questionConnectingWithOthers',
                text: {
                    'en': 'Telephones',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'communicating',
                    taxonomyTermId: 'telephones',
                }],
            },
            'answerConnectMail': {
                id: 'answerConnectMail',
                questionId: 'questionConnectingWithOthers',
                text: {
                    'en': 'Mail',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'communicating',
                    taxonomyTermId: 'mail',
                }],
            },
            'answerConnectSendMoneyAbroad': {
                id: 'answerConnectSendMoneyAbroad',
                questionId: 'questionConnectingWithOthers',
                text: {
                    'en': 'Sending money to other countries',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'money',
                    taxonomyTermId: 'sendingMoneyAbroad',
                }],
            },
            'answerConnectSocialCustoms': {
                id: 'answerConnectSocialCustoms',
                questionId: 'questionConnectingWithOthers',
                text: {
                    'en': 'Candian social customs',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'communicating',
                    taxonomyTermId: 'social_customs',
                }],
            },


            'answerHousingSituationLooking': {
                id: 'answerHousingSituationLooking',
                questionId: 'questionCurrentHousingSituation',
                text: {
                    'en': 'I am currently looking for somewhere to live',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'housingStatus',
                    taxonomyTermId: 'looking',
                }],
            },
            'answerHousingSituationMovingIn': {
                id: 'answerHousingSituationLooking',
                questionId: 'questionCurrentHousingSituation',
                text: {
                    'en': 'I have found a place, I am about to move in',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'housingStatus',
                    taxonomyTermId: 'movingIn',
                }],
            },
            'answerHousingSituationHoused': {
                id: 'answerHousingSituationHoused',
                questionId: 'questionCurrentHousingSituation',
                text: {
                    'en': 'I have a home',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'housingStatus',
                    taxonomyTermId: 'housed',
                }],
            },
            'answerHousingSituationMovingOut': {
                id: 'answerHousingSituationMovingOut',
                questionId: 'questionCurrentHousingSituation',
                text: {
                    'en': 'I need to move out',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'housingStatus',
                    taxonomyTermId: 'movingOut',
                }],
            },
            'answerHousingSituationHomeless': {
                id: 'answerHousingSituationHomeless',
                questionId: 'questionCurrentHousingSituation',
                text: {
                    'en': 'I am curretly homeless',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'housingStatus',
                    taxonomyTermId: 'homeless',
                }],
            },
            'answerHousingPreferToRent': {
                id: 'answerHousingPreferToRent',
                questionId: 'questionCurrentHousingSituation',
                text: {
                    'en': 'I would prefer to rent my home',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'housing',
                    taxonomyTermId: 'renting',
                }],
            },
            'answerHousingPreferToOwn': {
                id: 'answerHousingPreferToOwn',
                questionId: 'questionCurrentHousingSituation',
                text: {
                    'en': 'I would prefer to buy a home',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'housing',
                    taxonomyTermId: 'owning',
                }],
            },

            'answerBanks': {
                id: 'answerBanks',
                questionId: 'questionMoneyAndBanking',
                text: {
                    'en': 'Banks, bank accounts, loans',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'money',
                    taxonomyTermId: 'banking',
                }],
            },
            'answerShopping': {
                id: 'answerBanks',
                questionId: 'questionMoneyAndBanking',
                text: {
                    'en': 'Shopping',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'money',
                    taxonomyTermId: 'shopping',
                }],
            },
            'answerBusiness': {
                id: 'answerBusiness',
                questionId: 'questionMoneyAndBanking',
                text: {
                    'en': 'Doing business with private companies',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'money',
                    taxonomyTermId: 'business',
                }],
            },
            'answerMoneyTaxes': {
                id: 'answerMoneyTaxes',
                questionId: 'questionMoneyAndBanking',
                text: {
                    'en': 'Paying taxes',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'money',
                    taxonomyTermId: 'taxes',
                }],
            },
            'answerMoneyBenefits': {
                id: 'answerMoneyBenefits',
                questionId: 'questionMoneyAndBanking',
                text: {
                    'en': 'Government financial support and tax credits',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'money',
                    taxonomyTermId: 'benefits',
                }],
            },
            'answerMoneySendingMoneyAbroad': {
                id: 'answerMoneySendingMoneyAbroad',
                questionId: 'questionMoneyAndBanking',
                text: {
                    'en': 'Sending money to other countries',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'money',
                    taxonomyTermId: 'sendingMoneyAbroad',
                }],
            },







            'answerRefugeeClaimant': {
                id: 'answerRefugeeClaimant',
                questionId: 'questionImmigrantType',
                text: {
                    'en': 'Refugee claimant',
                    'ar': 'طالب اللجوء',
                    'fr': 'Demandeur d\'asile',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'immigrant_type',
                    taxonomyTermId: 'refugee_claimant',
                }],
            },
            'answerProtectedPerson': {
                id: 'answerProtectedPerson',
                questionId: 'questionImmigrantType',
                text: {
                    'en': 'Protected person',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'immigrant_type',
                    taxonomyTermId: 'protected_person',
                }],
            },
            'answerResettledRefugee': {
                id: 'answerResettledRefugee',
                questionId: 'questionImmigrantType',
                text: {
                    'en': 'Resettled refugee',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'immigrant_type',
                    taxonomyTermId: 'resettled_refugee',
                }],
            },
            'answerTemporaryResident': {
                id: 'answerTemporaryResident',
                questionId: 'questionImmigrantType',
                text: {
                    'en': 'Temporary resident',
                    'ar': 'سكن مؤقت',
                    'fr': 'Résident(e) temporaire',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'immigrant_type',
                    taxonomyTermId: 'temporary_resident',
                }],
            },
            'answerPermanentResident': {
                id: 'answerPermanentResident',
                questionId: 'questionImmigrantType',
                text: {
                    'en': 'Permanent resident',
                    'ar': 'مقيم دائم',
                    'fr': 'Résident(e) permanent',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'immigrant_type',
                    taxonomyTermId: 'permanent_resident',
                }],
            },
            'answerImmigrantTypeNone': {
                id: 'answerImmigrantTypeNone',
                questionId: 'questionImmigrantType',
                text: {
                    'en': 'None of the above, or I’m not sure',
                    'ar': 'لا شيء مما سبق ، أو لست متأكداx',
                    'fr': 'Rien de ce qui précède, ou je ne suis pas sûr',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'immigrant_type',
                    taxonomyTermId: 'unknown',
                }],
            },
            'a32': {
                id: 'a32',
                questionId: 'questionStageInRefugeeProcess',
                text: {
                    'en': 'I just claimed at an airport, seaport, or land border crossing',
                    'ar': 'لقد ادعت للتو في مطار أو ميناء بحري أو معبر للحدود البرية',
                    'fr': 'Je viens de réclamer dans un aéroport, un port maritime ou un poste frontalier terrestre',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'refugee_claim_stage',
                    taxonomyTermId: 'claim_at_border',
                }],
            },
            'a33': {
                id: 'a33',
                questionId: 'questionStageInRefugeeProcess',
                text: {
                    'en': 'I have not yet started but will claim at a CIC office inside Canada',
                    'ar': 'لم أبدأ بعد ولكن سوف ادعي في مكتب CIC داخل كندا',
                    'fr': 'Je n\'ai pas encore commencé mais je vais réclamer dans un bureau de CIC à l\'intérieur du Canada',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'refugee_claim_stage',
                    taxonomyTermId: 'not_started',
                }],
            },
            'a34': {
                id: 'a34',
                questionId: 'questionStageInRefugeeProcess',
                text: {
                    'en': 'I just claimed at a CIC office inside Canada',
                    'ar': 'أنا فقط ادعى في مكتب CIC داخل كندا',
                    'fr': 'Je viens de réclamer dans un bureau de CIC à l\'intérieur du Canada',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'refugee_claim_stage',
                    taxonomyTermId: 'claim_at_cic_office',
                }],
            },
            'a35': {
                id: 'a35',
                questionId: 'questionStageInRefugeeProcess',
                text: {
                    'en': 'I am waiting for my refugee hearing',
                    'ar': 'أنا في انتظار جلسة استماع للاجئين',
                    'fr': 'J\'attends mon audience sur le statut de réfugié',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'refugee_claim_stage',
                    taxonomyTermId: 'hearing',
                }],
            },
            'a36': {
                id: 'a36',
                questionId: 'questionStageInRefugeeProcess',
                text: {
                    'en': 'I received a positive decision and can apply or have applied to be a Permanent Resident',
                    'ar': 'لقد تلقيت قرارًا إيجابيًا ويمكنني تقديم طلب أو تقدمت بطلب ليكون مقيمًا دائمًا',
                    'fr': 'J\'ai reçu une décision positive et je peux demander ou être inscrit comme résident(e) permanent',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'refugee_claim_stage',
                    taxonomyTermId: 'positive_decision',
                }],
            },
            'a37': {
                id: 'a37',
                questionId: 'questionStageInRefugeeProcess',
                text: {
                    'en': 'I received a negative decision and want to learn about my options',
                    'ar': 'تلقيت قرارًا سلبيًا وتريد التعرف على خياراتي',
                    'fr': 'J\'ai reçu une décision négative et je veux en savoir plus sur mes options',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'refugee_claim_stage',
                    taxonomyTermId: 'negative_decision',
                }],
            },
            'a38': {
                id: 'a38',
                questionId: 'questionEnglishLevel',
                text: {
                    'en': 'None',
                    'ar': 'لا شيء',
                    'fr': 'Aucun',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'english_level',
                    taxonomyTermId: 'none',
                }],
            },
            'a39': {
                id: 'a39',
                questionId: 'questionEnglishLevel',
                text: {
                    'en': 'Beginner',
                    'ar': 'مبتدئ',
                    'fr': 'Débutant(e)',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'english_level',
                    taxonomyTermId: 'beginner',
                }],
            },
            'a40': {
                id: 'a40',
                questionId: 'questionEnglishLevel',
                text: {
                    'en': 'Intermediate',
                    'ar': 'متوسط',
                    'fr': 'Intermédiaire',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'english_level',
                    taxonomyTermId: 'intermediate',
                }],
            },
            'a41': {
                id: 'a41',
                questionId: 'questionEnglishLevel',
                text: {
                    'en': 'Fluent',
                    'ar': 'بطلاقة',
                    'fr': 'Couramment',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'english_level',
                    taxonomyTermId: 'fluent',
                }],
            },
            'a42': {
                id: 'a42',
                questionId: 'questionGroups',
                text: {
                    'en': 'Women’s services',
                    'ar': 'خدمات النساء',
                    'fr': 'Les services aux femmes',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'group',
                    taxonomyTermId: 'women',
                }],
            },
            'a43': {
                id: 'a43',
                questionId: 'questionGroups',
                text: {
                    'en': 'Services for people with disabilities',
                    'ar': 'خدمات لذوي الاحتياجات الخاصة',
                    'fr': 'Services pour les personnes handicapées',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'group',
                    taxonomyTermId: 'disability',
                }],
            },
            'a44': {
                id: 'a44',
                questionId: 'questionGroups',
                text: {
                    'en': 'LGBTQ2 services',
                    'ar': 'خدمات LGBTQ2',
                    'fr': 'LGBTQ2 services',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'group',
                    taxonomyTermId: 'lgbtq2',
                }],
            },
            'a45': {
                id: 'a45',
                questionId: 'questionGroups',
                text: {
                    'en': 'Services offered in French',
                    'ar': 'الخدمات المقدمة باللغة الفرنسية',
                    'fr': 'Services offerts en français',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'group',
                    taxonomyTermId: 'services_in_french',
                }],
            },
            'a46': {
                id: 'a46',
                questionId: 'questionGroups',
                text: {
                    'en': 'Services for low income people',
                    'ar': 'خدمات لذوي الدخل المحدود',
                    'fr': 'Services pour les personnes à faible revenu',
                },
                isChosen: false,
                taxonomyTerms: [{
                    taxonomyId: 'group',
                    taxonomyTermId: 'low_income',
                }],
            },
        },
    });
};
