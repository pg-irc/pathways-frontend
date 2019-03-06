import { ValidQuestionnaireStore } from '../types/questionnaire';

export const buildQuestionnaireFixture = (): ValidQuestionnaireStore => {
    return new ValidQuestionnaireStore({
        oldAnswers: {},
        activeQuestion: 'questionDurationInCanada',
        questions: {
            'questionDurationInCanada': {
                id: 'questionDurationInCanada',
                text: {
                    'en': 'How long have you been living in Canada?',
                    'fr': 'Depuis combien de temps habitez-vous au Canada?',
                    'ar': 'كم مضى عليك من الوقت مقيما في كندا؟',
                },
                acceptMultipleAnswers: false,
            },
            'questionDocuments': {
                id: 'questionDocuments',
                text: {
                    'en': 'Do you have any of the following important Canadian documents?',
                    'fr': 'Possédez-vous l’un ou l’autre de ces documents canadiens importants?',
                    'ar': 'هل لديك أي من الوثائق الكندية الهامة التالية؟',
                },
                acceptMultipleAnswers: true,
            },
            'questionAgeGroup': {
                id: 'questionAgeGroup',
                text: {
                    'en': 'Are you arriving with children under 18 years? If yes, how old?',
                    'fr': 'Êtes-vous accompagné(e) d’enfants de moins de 18 ans? Si c’est le cas, quel âge ont-ils?',
                    'ar': 'هل وصلت معك أطفال أقل من 18 سنة؟ لو كانت الإجابة نعم، كم عمرهم؟',
                },
                acceptMultipleAnswers: true,
            },
            'questionCurrentHousingSituation': {
                id: 'questionCurrentHousingSituation',
                text: {
                    'en': 'What is your current housing situation?',
                    'fr': 'Quelle est votre situation actuelle en matière de logement?',
                    'ar': 'ما هو موقفك الحالي من السكن؟',
                },
                acceptMultipleAnswers: true,
            },
            'questionEnglishLevel': {
                id: 'questionEnglishLevel',
                text: {
                    'en': 'What is your current level of English?',
                    'fr': 'Quel est votre niveau d’anglais actuel?',
                    'ar': 'ما هو مستوى إجادتك الحالي للغة الإنكليزية؟',
                },
                acceptMultipleAnswers: false,
            },
            'questionImmigrantType': {
                id: 'questionImmigrantType',
                text: {
                    'en': 'What is your status in Canada?',
                    'fr': 'De quel statut bénéficiez-vous au Canada?',
                    'ar': 'ما هو وضعك في كندا؟',
                },
                acceptMultipleAnswers: false,
            },
            'questionWorkStatus': {
                id: 'questionWorkStatus',
                text: {
                    'en': 'What is your current work situation?',
                    'fr': 'Quelle est votre situation actuelle en matière d’emploi?',
                    'ar': 'ما هو وضعك الحالي من ناحية العمل؟',
                },
                acceptMultipleAnswers: true,
            },
            'questionHealth': {
                id: 'questionHealth',
                text: {
                    'en': 'What kinds of health care are you looking for?',
                    'fr': 'De quel type de soins de santé avez-vous besoin?',
                    'ar': 'ما هي أنواع الرعاية الصحية التي تبحث عنها؟',
                },
                acceptMultipleAnswers: true,
            },
            'questionLowIncome': {
                id: 'questionLowIncome',
                text: {
                    'en': 'Do you need financial assistance or low-income support?',
                    'fr': 'Avez-vous besoin d’aide financière ou de soutien pour gens à faible revenu?',
                    'ar': 'هل تريد مساعدة مالية أو دعم موجه لأصحاب الدخل المتدني؟',
                },
                acceptMultipleAnswers: false,
            },
            'questionOther': {
                id: 'questionOther',
                text: {
                    'en': 'Anything else you\'re interested in? Select all that apply',
                    'fr': 'Y a-t-il d’autres sujets qui vous intéressent? Sélectionnez toutes les réponses appropriées.',
                    'ar': 'هل يوجد شيء آخر يهمك؟ اختر كل ما ينطبق',
                },
                acceptMultipleAnswers: true,
            },
        },
        answers: {
            'answerMoreThan1Year': {
                id: 'answerMoreThan1Year',
                questionId: 'questionDurationInCanada',
                text: {
                    'en': 'More than 1 year',
                    'fr': 'Plus d\'une année',
                    'ar': 'أكثر من سنة واحدة',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [],
            },
            'answerLessThan1Year': {
                id: 'answerLessThan1Year',
                questionId: 'questionDurationInCanada',
                text: {
                    'en': 'Less than 1 year',
                    'fr': 'Moins d\'une année',
                    'ar': 'أقل من سنة واحدة',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [],
            },
            'answerPlanningToMove': {
                id: 'answerPlanningToMove',
                questionId: 'questionDurationInCanada',
                text: {
                    'en': 'I am planning to move to Canada',
                    'fr': 'Je prévois déménager au Canada',
                    'ar': 'أعتزم الانتقال إلى كندا',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [],
            },
            'answerSocialInsuranceNumber': {
                id: 'answerSocialInsuranceNumber',
                questionId: 'questionDocuments',
                text: {
                    'en': 'I have a Social Insurance Number',
                    'fr': 'J\'ai un numéro d\'assurance sociale',
                    'ar': 'لدي رقم ضمان اجتماعي',
                },
                isChosen: false,
                isInverted: true,
                'taxonomyTerms': [{
                    'taxonomyId': 'settling_in',
                    'taxonomyTermId': 'social_insurance_number',
                }],
            },
            'answerBankAccount': {
                id: 'answerBankAccount',
                questionId: 'questionDocuments',
                text: {
                    'en': 'I have a Canadian bank account',
                    'fr': 'J\'ai un compte bancaire canadien',
                    'ar': 'لدي حساب مصرفي كندي',
                },
                isChosen: false,
                isInverted: true,
                'taxonomyTerms': [{
                    'taxonomyId': 'money',
                    'taxonomyTermId': 'bankAccount',
                }],
            },
            'answerPRCard': {
                id: 'answerPRCard',
                questionId: 'questionDocuments',
                text: {
                    'en': 'I have a Permanent Resident Card',
                    'fr': 'J\'ai une carte de résident permanent',
                    'ar': 'لدي بطاقة مقيم دائم',
                },
                isChosen: false,
                isInverted: true,
                'taxonomyTerms': [{
                    'taxonomyId': 'settling_in',
                    'taxonomyTermId': 'PR_card',
                }],
            },
            'answerMSP': {
                id: 'answerMSP',
                questionId: 'questionDocuments',
                text: {
                    'en': 'I have registered for MSP (Medical Services Plan)',
                    'fr': 'Je me suis inscrit(e) au régime de Services médicaux (MSP)',
                    'ar': 'لقد سجلت نفسي في خطة الخدمات الطبية (Medical Services Plan)',
                },
                isChosen: false,
                isInverted: true,
                'taxonomyTerms': [{
                    'taxonomyId': 'healthCare',
                    'taxonomyTermId': 'MSP',
                }],
            },
            'answerBCServicesCard': {
                id: 'answerBCServicesCard',
                questionId: 'questionDocuments',
                text: {
                    'en': 'I have a BC Services Card (health card)',
                    'fr': 'J\'ai une carte BC Services (carte santé)',
                    'ar': 'لدي بطاقة خدمات بريتيش كولومبيا (البطاقة الصحية)',
                },
                isChosen: false,
                isInverted: true,
                'taxonomyTerms': [{
                    'taxonomyId': 'healthCare',
                    'taxonomyTermId': 'bc_services_card',
                }],
            },
            'answerBCDriversLicence': {
                id: 'answerBCDriversLicence',
                questionId: 'questionDocuments',
                text: {
                    'en': 'I have a BC Driver\'s Licence',
                    'fr': 'J\'ai un permis de conduire de la C.-B.',
                    'ar': 'لدي رخصة قيادة خاصة ببريتيش كولومبيا',
                },
                isChosen: false,
                isInverted: true,
                'taxonomyTerms': [{
                    'taxonomyId': 'driving',
                    'taxonomyTermId': 'driversLicence',
                }],
            },
            'answerUnder5': {
                id: 'answerUnder5',
                questionId: 'questionAgeGroup',
                text: {
                    'en': 'Under 5 years old',
                    'fr': 'Moins de 5 ans',
                    'ar': 'أقل من 5 سنوات',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'group',
                    'taxonomyTermId': 'under_5',
                }, {
                    'taxonomyId': 'healthCare',
                    'taxonomyTermId': 'children',
                }],
            },
            'answerAge5to12': {
                id: 'answerAge5to12',
                questionId: 'questionAgeGroup',
                text: {
                    'en': '5-12 years old',
                    'fr': 'Entre 5 et 12 ans',
                    'ar': 'من 5 إلى 12 سنة',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'group',
                    'taxonomyTermId': '5_to_12',
                }, {
                    'taxonomyId': 'healthCare',
                    'taxonomyTermId': 'children',
                }],
            },
            'answerAge13to18': {
                id: 'answerAge13to18',
                questionId: 'questionAgeGroup',
                text: {
                    'en': '13-18 years old',
                    'fr': 'Entre 13 et 18 ans',
                    'ar': 'من 13 إلى 18 سنة',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'group',
                    'taxonomyTermId': '13_to_18',
                }, {
                    'taxonomyId': 'healthCare',
                    'taxonomyTermId': 'children',
                }],
            },
            'answerPregnant': {
                id: 'answerPregnant',
                questionId: 'questionAgeGroup',
                text: {
                    'en': 'Pregnant (not yet born)',
                    'fr': 'Enceinte (l\'enfant n\'est pas encore né)',
                    'ar': 'حبلى (لم يولد بعد)',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'group',
                    'taxonomyTermId': 'maternity',
                }, {
                    'taxonomyId': 'healthCare',
                    'taxonomyTermId': 'children',
                }],
            },
            'answerNoChildren': {
                id: 'answerNoChildren',
                questionId: 'questionAgeGroup',
                text: {
                    'en': 'No children',
                    'fr': 'Pas d\'enfant',
                    'ar': 'لا يوجد أطفال',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [],
            },
            'answerWantToRent': {
                id: 'answerWantToRent',
                questionId: 'questionCurrentHousingSituation',
                text: {
                    'en': 'I want to rent a place to live',
                    'fr': 'Je veux louer un logement',
                    'ar': 'أرغب في تأجير مسكن',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'housing',
                    taxonomyTermId: 'wantToRent',
                }],
            },
            'answerWantToBuy': {
                id: 'answerWantToBuy',
                questionId: 'questionCurrentHousingSituation',
                text: {
                    'en': 'I want to buy a home',
                    'fr': 'Je veux acheter un logement',
                    'ar': 'أرغب في شراء منزل',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'housing',
                    taxonomyTermId: 'wantToBuy',
                }],
            },
            'answerRenting': {
                id: 'answerRenting',
                questionId: 'questionCurrentHousingSituation',
                text: {
                    'en': 'I am already renting a home',
                    'fr': 'Je loue déjà un logement',
                    'ar': 'لقد استأجرت مسكن بالفعل',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'housing',
                    taxonomyTermId: 'renting',
                }],
            },
            'answerOwning': {
                id: 'answerOwning',
                questionId: 'questionCurrentHousingSituation',
                text: {
                    'en': 'I already own a home',
                    'fr': 'Je possède déjà un logement',
                    'ar': 'أملك منزل بالفعل',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'housing',
                    taxonomyTermId: 'owning',
                }],
            },
            'answerEnglishLevelNone': {
                id: 'answerEnglishLevelNone',
                questionId: 'questionEnglishLevel',
                text: {
                    'en': 'None',
                    'fr': 'Je ne parle pas anglais',
                    'ar': 'لا شيء',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'english_level',
                    taxonomyTermId: 'none',
                }, {
                    taxonomyId: 'education',
                    taxonomyTermId: 'language',
                }],
            },
            'answerEnglishLevelBeginner': {
                id: 'answerEnglishLevelBeginner',
                questionId: 'questionEnglishLevel',
                text: {
                    'en': 'Beginner (Canadian Language Benchmarks 1-4)',
                    'fr': 'Niveau de base (niveaux de compétence linguistique canadiens 1-4)',
                    'ar': 'مبتدئ (بين 1 و4 على المعيار الكندي للغة)',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'english_level',
                    taxonomyTermId: 'beginner',
                }, {
                    taxonomyId: 'language',
                    taxonomyTermId: 'education',
                }],
            },
            'answerEnglishLevelIntermediate': {
                id: 'answerEnglishLevelIntermediate',
                questionId: 'questionEnglishLevel',
                text: {
                    'en': 'Intermediate (Canadian Language Benchmarks 5-8)',
                    'fr': 'Niveau intermédiaire (niveaux de compétence linguistique canadiens 5-8)',
                    'ar': 'متوسط (بين 5 و8 على المعيار الكندي للغة)',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'english_level',
                    taxonomyTermId: 'intermediate',
                }, {
                    taxonomyId: 'language',
                    taxonomyTermId: 'education',
                }],
            },
            'answerEnglishLevelFluent': {
                id: 'answerEnglishLevelFluent',
                questionId: 'questionEnglishLevel',
                text: {
                    'en': 'Fluent (Canadian Language Benchmarks 9-12)',
                    'fr': 'Niveau avancé (niveaux de compétence linguistique canadiens 9-12)',
                    'ar': 'فصيح (بين 9 و12 على المعيار الكندي للغة)',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [],
            },
            'answerPermanentResident': {
                id: 'answerPermanentResident',
                questionId: 'questionImmigrantType',
                text: {
                    'en': 'Permanent resident',
                    'fr': 'Résident(e) permanent(e)',
                    'ar': 'مقيم دائم',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [],
            },
            'answerRefugeeClass': {
                id: 'answerRefugeeClass',
                questionId: 'questionImmigrantType',
                text: {
                    'en': 'Permanent Resident - Refugee Class or Protected Person',
                    'fr': 'Résident(e) permanent(e) - catégorie de réfugié ou personne protégée',
                    'ar': 'مقيم دائم – فئة لاجئ أو متمتع بالحماية',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'immigrant_type',
                    taxonomyTermId: 'resettled_refugee',
                }, {
                    taxonomyId: 'immigrant_type',
                    taxonomyTermId: 'protected_person',
                }],
            },
            'answerRefugeeClaimant': {
                id: 'answerRefugeeClaimant',
                questionId: 'questionImmigrantType',
                text: {
                    'en': 'Refugee claimant',
                    'fr': 'Demandeur(euse) d\'asile',
                    'ar': 'طالب لجوء',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'immigrant_type',
                    taxonomyTermId: 'refugee_claimant',
                }],
            },
            'answerTemporaryForeignWorker': {
                id: 'answerTemporaryForeignWorker',
                questionId: 'questionImmigrantType',
                text: {
                    'en': 'Temporary Foreign Worker',
                    'fr': 'Travailleur(euse) étranger(ère) temporaire',
                    'ar': 'عامل أجنبي مؤقت',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [],
            },
            'answerStudentVisa': {
                id: 'answerStudentVisa',
                questionId: 'questionImmigrantType',
                text: {
                    'en': 'Student visa',
                    'fr': 'Visa d\'étudiant(e)',
                    'ar': 'تأشيرة طالب',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [],
            },
            'answerImmigrantTypeNone': {
                id: 'answerImmigrantTypeNone',
                questionId: 'questionImmigrantType',
                text: {
                    'en': 'Other',
                    'fr': 'Autre',
                    'ar': 'أخرى',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [],
            },
            'answerLookingForWork': {
                id: 'answerLookingForWork',
                questionId: 'questionWorkStatus',
                text: {
                    'en': 'I am looking for work',
                    'fr': 'Je cherche du travail',
                    'ar': 'أبحث عن عمل',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'employment',
                    taxonomyTermId: 'looking',
                }],
            },
            'answerRightsAtWork': {
                id: 'answerRightsAtWork',
                questionId: 'questionWorkStatus',
                text: {
                    'en': 'I want to learn about my rights at work',
                    'fr': 'Je veux en apprendre davantage sur mes droits au travail',
                    'ar': 'أرغب في التعرف على المزيد عن حقوقي في مكان العمل',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'employment',
                    taxonomyTermId: 'laws',
                }],
            },
            'answerIAmSelfEmployed': {
                id: 'answerIAmSelfEmployed',
                questionId: 'questionWorkStatus',
                text: {
                    'en': 'I have my own business or want to start my own business',
                    'fr': 'Je possède ma propre entreprise ou je veux démarrer ma propre entreprise',
                    'ar': 'أملك نشاطي التجاري الخاص أو أرغب في تأسيس نشاطي التجاري',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'employment',
                    taxonomyTermId: 'startingABusiness',
                }],
            },
            'answerGeneralHealth': {
                id: 'answerGeneralHealth',
                questionId: 'questionHealth',
                text: {
                    'en': 'General health care and learning about health care costs',
                    'fr': 'Soins de santé généraux. Renseignements quant aux coûts des soins de santé',
                    'ar': 'رعاية صحية عامة والتعرف على تكلفة الرعاية الصحية',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'healthCare',
                    taxonomyTermId: 'costs',
                }, {
                    taxonomyId: 'healthCare',
                    taxonomyTermId: 'information',
                }, {
                    taxonomyId: 'healthCare',
                    taxonomyTermId: 'needDoctor',
                }],
            },
            'answerHealthEmergency': {
                id: 'answerHealthEmergency',
                questionId: 'questionHealth',
                text: {
                    'en': 'I need urgent medical attention (for emergencies, call 9-1-1)',
                    'fr': 'J\'ai besoin de soins médicaux immédiats (pour les urgences, appelez le 9-1-1)',
                    'ar': 'أريد رعاية صحية عاجلة (في حالات الطوارئ، اتصل بالرقم 911)',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'healthCare',
                    taxonomyTermId: 'emergency',
                }],
            },
            'answerHealthTakeMedication': {
                id: 'answerHealthTakeMedication',
                questionId: 'questionHealth',
                text: {
                    'en': 'Prescription medication',
                    'fr': 'Médicament d\'ordonnance',
                    'ar': 'أدوية تصرف بوصفة طبية',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'healthCare',
                    taxonomyTermId: 'needMedication',
                }],
            },
            'answerHealthMentalHealth': {
                id: 'answerHealthMentalHealth',
                questionId: 'questionHealth',
                text: {
                    'en': 'Mental health support',
                    'fr': 'Soutien de santé mentale',
                    'ar': 'مساعدة خاصة بالصحة النفسية',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'helpWith',
                    taxonomyTermId: 'mentalHealth',
                }],
            },
            'answerHealthEyeExam': {
                id: 'answerHealthEyeExam',
                questionId: 'questionHealth',
                text: {
                    'en': 'Eye doctors',
                    'fr': 'Optométriste',
                    'ar': 'طبيب عيون',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'healthCare',
                    taxonomyTermId: 'needEyeExam',
                }],
            },
            'answerNeedDentist': {
                id: 'answerNeedDentist',
                questionId: 'questionHealth',
                text: {
                    'en': 'Dentists',
                    'fr': 'Dentiste',
                    'ar': 'طبيب أسنان',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'healthCare',
                    taxonomyTermId: 'needDentist',
                }],
            },
            'answerDisabilities': {
                id: 'answerDisabilities',
                questionId: 'questionHealth',
                text: {
                    'en': 'Support for disabilities',
                    'fr': 'Soutien pour personnes handicapées',
                    'ar': 'مساعدة موجهة لأصحاب الاحتياجات الخاصة',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'healthCare',
                    taxonomyTermId: 'disability',
                }],
            },
            'answerHelpFindingServices': {
                id: 'answerHelpFindingServices',
                questionId: 'questionWhatHelpDoYouNeed',
                text: {
                    'en': 'Help finding information about services',
                    'fr': '',
                    'ar': '',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'helpWith',
                    'taxonomyTermId': 'findingServices',
                }],
            },
            'answerHelpWithMentalHealth': {
                id: 'answerHelpWithMentalHealth',
                questionId: 'questionWhatHelpDoYouNeed',
                text: {
                    'en': 'Help managing stress',
                    'fr': '',
                    'ar': '',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'helpWith',
                    'taxonomyTermId': 'mentalHealth',
                }],
            },
            'answerLowIncome': {
                id: 'answerLowIncome',
                questionId: 'questionLowIncome',
                text: {
                    'en': 'Yes',
                    'fr': 'Oui',
                    'ar': 'نعم',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'group',
                    'taxonomyTermId': 'low_income',
                }, {
                    'taxonomyId': 'housing',
                    'taxonomyTermId': 'lowIncome',
                }],
            },
            'answerNotLowIncome': {
                id: 'answerNotLowIncome',
                questionId: 'questionLowIncome',
                text: {
                    'en': 'No',
                    'fr': 'Non',
                    'ar': 'لا',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [],
            },
            'answerAlreadyHaveLowIncomeSupport': {
                id: 'answerAlreadyHaveLowIncomeSupport',
                questionId: 'questionLowIncome',
                text: {
                    'en': 'I have low income assistance',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'group',
                    'taxonomyTermId': 'low_income',
                }, {
                    'taxonomyId': 'housing',
                    'taxonomyTermId': 'lowIncome',
                }],
            },
            'answerAdultEducationTraining': {
                id: 'answerAdultEducationTraining',
                questionId: 'questionOther',
                text: {
                    'en': 'Adult education and training',
                    'fr': 'Éducation et formation des adultes',
                    'ar': 'تعليم الكبار وتدريبهم',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'education',
                    'taxonomyTermId': 'postSecondaryEducation',
                }, {
                    'taxonomyId': 'education',
                    'taxonomyTermId': 'continuingEducation',
                }],
            },
            'answerCanadianCitizen': {
                id: 'answerCanadianCitizen',
                questionId: 'questionOther',
                text: {
                    'en': 'Becoming a Canadian citizen',
                    'fr': 'Devenir citoyen(ne) canadien(ne)',
                    'ar': 'أن أصبح مواطنا كنديا',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'legalSystem',
                    'taxonomyTermId': 'immigration',
                }, {
                    'taxonomyId': 'legalSystem',
                    'taxonomyTermId': 'legalHelp',
                }],
            },
            'answerLegalHelp': {
                id: 'answerLegalHelp',
                questionId: 'questionOther',
                text: {
                    'en': 'Legal help',
                    'fr': 'Aide juridique',
                    'ar': 'مساعدة قانونية',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'legalSystem',
                    'taxonomyTermId': 'legalHelp',
                }],
            },
            'answerBanking': {
                id: 'answerBanking',
                questionId: 'questionOther',
                text: {
                    'en': 'Banking and financial management',
                    'fr': 'Gestion bancaire et financière',
                    'ar': 'أمور مصرفية وإدارة الأموال',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'money',
                    'taxonomyTermId': 'banking',
                }],
            },
            'answerTaxes': {
                id: 'answerTaxes',
                questionId: 'questionOther',
                text: {
                    'en': 'Taxes',
                    'fr': 'Taxes et impôts',
                    'ar': 'الضرائب',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'money',
                    'taxonomyTermId': 'taxes',
                }],
            },
            'answerLGBTQ': {
                id: 'answerLGBTQ',
                questionId: 'questionOther',
                text: {
                    'en': 'LGBTQ2 services',
                    'fr': 'Services pour les personnes LGBTQ2',
                    'ar': 'خدمات LGBTQ2',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'group',
                    'taxonomyTermId': 'lgbtq2',
                }],
            },
            'answerFrench': {
                id: 'answerFrench',
                questionId: 'questionOther',
                text: {
                    'en': 'Francophone services',
                    'fr': 'Services pour les francophones',
                    'ar': 'خدمات للناطقين باللغة الفرنسية',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'interest',
                    'taxonomyTermId': 'services_in_french',
                }],
            },
            'answerSeniors': {
                id: 'answerSeniors',
                questionId: 'questionOther',
                text: {
                    'en': 'Support for seniors (age 65+)',
                    'fr': 'Aide pour personnes âgées (plus de 65 ans)',
                    'ar': 'مساندة موجهة لكبار السن (أكبر من 65 سنة)',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'group',
                    'taxonomyTermId': 'over_65',
                }],
            },
            'answerDriving': {
                id: 'answerDriving',
                questionId: 'questionOther',
                text: {
                    'en': 'Driving in BC',
                    'fr': 'Conduire en Colombie-Britannique',
                    'ar': 'القيادة في بريتيش كولومبيا',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'driving',
                    'taxonomyTermId': 'cost',
                }, {
                    'taxonomyId': 'driving',
                    'taxonomyTermId': 'laws',
                }],
            },
            'answerTransit': {
                id: 'answerTransit',
                questionId: 'questionOther',
                text: {
                    'en': 'Public transportation',
                    'fr': 'Transports publics',
                    'ar': 'المواصلات العامة',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'travel',
                    'taxonomyTermId': 'local',
                }],
            },
            'answerAbuseAndViolence': {
                id: 'answerAbuseAndViolence',
                questionId: 'questionOther',
                text: {
                    'en': 'Help with abuse and violence',
                    'fr': 'Aide dans le cas de mauvais traitements et de violence',
                    'ar': 'مساعدة متعلقة بالعنف والإساءة',
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [{
                    'taxonomyId': 'helpWith',
                    'taxonomyTermId': 'violence',
                }, {
                    'taxonomyId': 'legalSystem',
                    'taxonomyTermId': 'legalHelp',
                }, {
                    'taxonomyId': 'legalSystem',
                    'taxonomyTermId': 'importantLaws',
                }],
            },
            'answerCommunityServices': {
                id: 'answerCommunityServices',
                questionId: 'questionOther',
                text: {
                    'en': 'Community services and organizations',
                    'fr': 'Services et organisations communautaires',
                    'ar': 'خدمات المجتمع ومنظمات المجتمع المدني',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'interest',
                    taxonomyTermId: 'communityServices',
                }, {
                    taxonomyId: 'interest',
                    taxonomyTermId: 'joinOrganizations',
                }],
            },
        },
    });
};
