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
                },
                acceptMultipleAnswers: false,
            },
            'questionDocuments': {
                id: 'questionDocuments',
                text: {
                    'en': 'Do you have any of the following important Canadian documents?',
                },
                acceptMultipleAnswers: true,
            },
            'questionAgeGroup': {
                id: 'questionAgeGroup',
                text: {
                    'en': 'Are you arriving with children under 18 years? If yes, how old?',
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
            'questionEnglishLevel': {
                id: 'questionEnglishLevel',
                text: {
                    'en': 'What is your level of English?',
                    'ar': 'ما هو مستواك في اللغة الإنجليزية؟',
                    'fr': 'Quel est votre niveau d\'anglais?',
                },
                acceptMultipleAnswers: false,
            },
            'questionImmigrantType': {
                id: 'questionImmigrantType',
                text: {
                    'en': 'What is your status in Canada?',
                },
                acceptMultipleAnswers: false,
            },
            'questionWorkStatus': {
                id: 'questionWorkStatus',
                text: {
                    'en': 'What is your current work situation?',
                },
                acceptMultipleAnswers: true,
            },
            'questionHealth': {
                id: 'questionHealth',
                text: {
                    'en': 'What kinds of health care are you looking for?',
                },
                acceptMultipleAnswers: true,
            },
            'questionLowIncome': {
                id: 'questionLowIncome',
                text: {
                    'en': 'Are you looking for financial assistance or low-income support?',
                },
                acceptMultipleAnswers: false,
            },
            'questionOther': {
                id: 'questionOther',
                text: {
                    'en': 'Anything else that you\'re interested in? Select all that apply',
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
                    'ar': '5-12 سنة',
                    'fr': '5-12 ans',
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
                    'ar': '13-18 سنة',
                    'fr': '13-18 ans',
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
            'answerWantToRent': {
                id: 'answerWantToRent',
                questionId: 'questionCurrentHousingSituation',
                text: {
                    'en': 'I want to rent a place to live',
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
                    'ar': 'لا شيء',
                    'fr': 'Aucun',
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
                    'ar': 'مبتدئ',
                    'fr': 'Débutant(e)',
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
                    'ar': 'متوسط',
                    'fr': 'Intermédiaire',
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
                    'ar': 'بطلاقة',
                    'fr': 'Couramment',
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
                    'ar': 'مقيم دائم',
                    'fr': 'Résident(e) permanent',
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
                    'ar': 'طالب اللجوء',
                    'fr': 'Demandeur d\'asile',
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
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [],
            },
            'answerLookingForWork': {
                id: 'answerLookingForWork',
                questionId: 'questionWorkStatus',
                text: {
                    'en': 'I am currently looking for work',
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
                    'en': 'I take medication',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'healthCare',
                    taxonomyTermId: 'needMedication',
                }],
            },
            'answerNeedDentist': {
                id: 'answerNeedDentist',
                questionId: 'questionHealth',
                text: {
                    'en': 'Dentists',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'healthCare',
                    taxonomyTermId: 'needDentist',
                }],
            },
            'answerHealthEyeExam': {
                id: 'answerHealthEyeExam',
                questionId: 'questionHealth',
                text: {
                    'en': 'Eye doctors',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'healthCare',
                    taxonomyTermId: 'needEyeExam',
                }],
            },
            'answerHealthMentalHealth': {
                id: 'answerHealthMentalHealth',
                questionId: 'questionHealth',
                text: {
                    'en': 'Mental health support',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'helpWith',
                    taxonomyTermId: 'mentalHealth',
                }],
            },
            'answerDisabilities': {
                id: 'answerDisabilities',
                questionId: 'questionHealth',
                text: {
                    'en': 'Support for disabilities',
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
                },
                isChosen: false,
                isInverted: false,
                'taxonomyTerms': [],
            },
            'answerAdultEducationTraining': {
                id: 'answerAdultEducationTraining',
                questionId: 'questionOther',
                text: {
                    'en': 'Adult education and training',
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
                    'en': 'Support for seniors (65+)',
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
