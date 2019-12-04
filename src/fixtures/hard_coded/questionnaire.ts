import { ValidQuestionnaireStore, AnswersMap, QuestionsMap } from '../types/questionnaire';

export const buildQuestionnaireFixture = (): ValidQuestionnaireStore => {
    const questions: QuestionsMap = {
        'questionDurationInCanada': {
            id: 'questionDurationInCanada',
            text: 'How long have you been living in Canada?',
            acceptMultipleAnswers: false,
        },
        'questionDocuments': {
            id: 'questionDocuments',
            text: 'Do you have any of the following important Canadian documents?',
            acceptMultipleAnswers: true,
        },
        'questionAgeGroup': {
            id: 'questionAgeGroup',
            text: 'Are you arriving with children under 18 years? If yes, how old?',
            acceptMultipleAnswers: true,
        },
        'questionCurrentHousingSituation': {
            id: 'questionCurrentHousingSituation',
            text: 'What is your current housing situation?',
            acceptMultipleAnswers: true,
        },
        'questionEnglishLevel': {
            id: 'questionEnglishLevel',
            text: 'What is your current level of English?',
            acceptMultipleAnswers: false,
        },
        'questionImmigrantType': {
            id: 'questionImmigrantType',
            text: 'What is your status in Canada?',
            acceptMultipleAnswers: false,
        },
        'questionWorkStatus': {
            id: 'questionWorkStatus',
            text: 'What is your current work situation?',
            acceptMultipleAnswers: true,
        },
        'questionHealth': {
            id: 'questionHealth',
            text: 'What kinds of health care are you looking for?',
            acceptMultipleAnswers: true,
        },
        'questionLowIncome': {
            id: 'questionLowIncome',
            text: 'Do you need financial assistance or low-income support?',
            acceptMultipleAnswers: false,
        },
        'questionOther': {
            id: 'questionOther',
            text: 'Anything else you\'re interested in? Select all that apply',
            acceptMultipleAnswers: true,
        },
    };
    const answers: AnswersMap = {
        'answerMoreThan1Year': {
            id: 'answerMoreThan1Year',
            questionId: 'questionDurationInCanada',
            text: 'More than 1 year',
            isChosen: false,
            isInverted: false,
            'taxonomyTerms': [],
        },
        'answerLessThan1Year': {
            id: 'answerLessThan1Year',
            questionId: 'questionDurationInCanada',
            text: 'Less than 1 year',
            isChosen: false,
            isInverted: false,
            'taxonomyTerms': [],
        },
        'answerPlanningToMove': {
            id: 'answerPlanningToMove',
            questionId: 'questionDurationInCanada',
            text: 'I am planning to move to Canada',
            isChosen: false,
            isInverted: false,
            'taxonomyTerms': [],
        },
        'answerSocialInsuranceNumber': {
            id: 'answerSocialInsuranceNumber',
            questionId: 'questionDocuments',
            text: 'I have a Social Insurance Number',
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
            text: 'I have a Canadian bank account',
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
            text: 'I have a Permanent Resident Card',
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
            text: 'I have registered for MSP (Medical Services Plan)',
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
            text: 'I have a BC Services Card (health card)',
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
            text: 'I have a BC Driver\'s Licence',
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
            text: 'Under 5 years old',
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
            text: '5-12 years old',
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
            text: '13-18 years old',
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
            text: 'Pregnant (the child is not yet born)',
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
            text: 'No children',
            isChosen: false,
            isInverted: false,
            'taxonomyTerms': [],
        },
        'answerWantToRent': {
            id: 'answerWantToRent',
            questionId: 'questionCurrentHousingSituation',
            text: 'I want to rent a place to live',
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
            text: 'I want to buy a home',
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
            text: 'I am already renting a home',
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
            text: 'I already own a home',
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
            text: 'None',
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
            text: 'Beginner (Canadian Language Benchmarks 1-4)',
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
            text: 'Intermediate (Canadian Language Benchmarks 5-8)',
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
            text: 'Fluent (Canadian Language Benchmarks 9-12)',
            isChosen: false,
            isInverted: false,
            taxonomyTerms: [],
        },
        'answerPermanentResident': {
            id: 'answerPermanentResident',
            questionId: 'questionImmigrantType',
            text: 'Permanent resident',
            isChosen: false,
            isInverted: false,
            taxonomyTerms: [],
        },
        'answerRefugeeClass': {
            id: 'answerRefugeeClass',
            questionId: 'questionImmigrantType',
            text: 'Permanent Resident - Refugee Class or Protected Person',
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
            text: 'Refugee claimant',
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
            text: 'Temporary Foreign Worker',
            isChosen: false,
            isInverted: false,
            taxonomyTerms: [],
        },
        'answerStudentVisa': {
            id: 'answerStudentVisa',
            questionId: 'questionImmigrantType',
            text: 'Student visa',
            isChosen: false,
            isInverted: false,
            taxonomyTerms: [],
        },
        'answerImmigrantTypeNone': {
            id: 'answerImmigrantTypeNone',
            questionId: 'questionImmigrantType',
            text: 'Other',
            isChosen: false,
            isInverted: false,
            taxonomyTerms: [],
        },
        'answerLookingForWork': {
            id: 'answerLookingForWork',
            questionId: 'questionWorkStatus',
            text: 'I am looking for work',
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
            text: 'I want to learn about my rights at work',
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
            text: 'I have my own business or want to start my own business',
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
            text: 'General health care and learning about health care costs',
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
            text: 'I need urgent medical attention (for emergencies, call 9-1-1)',
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
            text: 'Prescription medication',
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
            text: 'Mental health support',
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
            text: 'Eye doctors',
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
            text: 'Dentists',
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
            text: 'Support for disabilities',
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
            text: 'Help finding information about services',
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
            text: 'Help managing stress',
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
            text: 'Yes',
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
            text: 'No',
            isChosen: false,
            isInverted: false,
            'taxonomyTerms': [],
        },
        'answerAlreadyHaveLowIncomeSupport': {
            id: 'answerAlreadyHaveLowIncomeSupport',
            questionId: 'questionLowIncome',
            text: 'I have low income support',
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
            text: 'Adult education and training',
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
            text: 'Becoming a Canadian citizen',
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
            text: 'Legal help',
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
            text: 'Banking and financial management',
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
            text: 'Taxes',
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
            text: 'LGBTQ2 services',
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
            text: 'Francophone services',
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
            text: 'Support for seniors (age 65+)',
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
            text: 'Driving in BC',
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
            text: 'Public transportation',
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
            text: 'Help with abuse and violence',
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
            text: 'Community services and organizations',
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
    };
    return new ValidQuestionnaireStore({
        questions,
        answers,
        oldAnswers: answers,
        activeQuestion: 'questionDurationInCanada',
    });
};
