import { ValidQuestionnaireStore, QuestionnaireRouteState } from '../types/questionnaire';

export const buildQuestionnaireFixture = (): ValidQuestionnaireStore => {
    return new ValidQuestionnaireStore({
        questionnaireRouteState: QuestionnaireRouteState.NotInQuestionnairePage,
        oldAnswers: {},
        activeQuestion: 'questionAgeGroup',
        questions: {
            'questionAgeGroup': {
                id: 'questionAgeGroup',
                text: {
                    'en': 'Which age group(s) do you (and your family members) belong to?',
                },
                acceptMultipleAnswers: true,
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
            'questionHealth': {
                id: 'questionHealth',
                text: {
                    'en': 'What is your current health situation?',
                },
                acceptMultipleAnswers: true,
            },
            'questionEducation': {
                id: 'questionEducation',
                text: {
                    'en': 'What is your situation regarding language skills and education?',
                },
                acceptMultipleAnswers: true,
            },
            'questionTransportation': {
                id: 'questionTransportation',
                text: {
                    'en': 'What is your situation regarding transportation and driving?',
                },
                acceptMultipleAnswers: true,
            },
            'questionWorkStatus': {
                id: 'questionWorkStatus',
                text: {
                    'en': 'What is your current work situation?',
                },
                acceptMultipleAnswers: true,
            },
            'questionWorkInformation': {
                id: 'questionWorkInformation',
                text: {
                    'en': 'I would like to see information about working',
                },
                acceptMultipleAnswers: true,
            },
            'questionLegalSystem': {
                id: 'questionLegalSystem',
                text: {
                    'en': 'Information about Canada\'s government and legal system',
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
            'answerAgeUnder5': {
                id: 'answerAgeUnder5',
                questionId: 'questionAgeGroup',
                text: {
                    'en': 'Under 5 years old',
                    'ar': 'تحت 5 سنة',
                    'fr': 'Moins de 5 ans',
                },
                isChosen: false,
                isInverted: false,
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
                isInverted: false,
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
                isInverted: false,
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
                isInverted: false,
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
                isInverted: false,
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
            'answerHelpWithViolence': {
                id: 'answerHelpWithViolence',
                questionId: 'questionWhatHelpDoYouNeed',
                text: {
                    'en': 'Have you suffered from violence, abuse or neglect, now or in the past',
                },
                isChosen: false,
                isInverted: false,
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
                isInverted: false,
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
                isInverted: false,
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
                isInverted: false,
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
                isInverted: false,
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
                isInverted: false,
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
                isInverted: false,
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
                isInverted: false,
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
                isInverted: false,
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
                isInverted: false,
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
                isInverted: false,
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
                isInverted: false,
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
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'housingStatus',
                    taxonomyTermId: 'movingOut',
                }],
            },
            'answerHousingSituationHomeless': {
                id: 'answerHousingSituationHomeless',
                questionId: 'questionCurrentHousingSituation',
                text: {
                    'en': 'I am currently homeless',
                },
                isChosen: false,
                isInverted: false,
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
                isInverted: false,
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
                isInverted: false,
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
                isInverted: false,
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
                isInverted: false,
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
                isInverted: false,
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
                isInverted: false,
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
                isInverted: false,
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
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'money',
                    taxonomyTermId: 'sendingMoneyAbroad',
                }],
            },
            'answerHealthEmergency': {
                id: 'answerHealthEmergency',
                questionId: 'questionHealth',
                text: {
                    'en': 'I have a health emergency (if urgent, call 9-1-1 and ask for an ambulance)',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'healthCare',
                    taxonomyTermId: 'emergency',
                }],
            },
            'answerNeedDoctor': {
                id: 'answerNeedDoctor',
                questionId: 'questionHealth',
                text: {
                    'en': 'I need to see a doctor or specialist',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'healthCare',
                    taxonomyTermId: 'needDoctor',
                }],
            },
            'answerNeedFamilyDoctor': {
                id: 'answerNeedFamilyDoctor',
                questionId: 'questionHealth',
                text: {
                    'en': 'I want to find a doctor I can visit regularly',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'healthCare',
                    taxonomyTermId: 'needFamilyDoctor',
                }],
            },
            'answerNeedDentist': {
                id: 'answerNeedDentist',
                questionId: 'questionHealth',
                text: {
                    'en': 'I have problems with my teeth',
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
                    'en': 'I need eye glasses or have other problems with my eyes',
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
                    'en': 'I am interested in information about mental health',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'healthCare',
                    taxonomyTermId: 'mentalHealth',
                }],
            },
            'answerHealthSurvivorOfTorture': {
                id: 'answerHealthSurvivorOfTorture',
                questionId: 'questionHealth',
                text: {
                    'en': 'I am a survivor of torture or other violence',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'healthCare',
                    taxonomyTermId: 'mentalHealth',
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
            'answerHealthNeedHospital': {
                id: 'answerHealthNeedHospital',
                questionId: 'questionHealth',
                text: {
                    'en': 'I need treatment in a hospital',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'healthCare',
                    taxonomyTermId: 'needHospital',
                }],
            },
            'answerHealthOutOfProvince': {
                id: 'answerHealthNeedHospital',
                questionId: 'questionHealth',
                text: {
                    'en': 'I need to access health care outside of British Columbia',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'healthCare',
                    taxonomyTermId: 'needOutOfProvinceCare',
                }],
            },
            'answerHealthCosts': {
                id: 'answerHealthCosts',
                questionId: 'questionHealth',
                text: {
                    'en': 'I want to learn more about health care costs and insurance',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'healthCare',
                    taxonomyTermId: 'costs',
                }],
            },
            'answerHealthQuestions': {
                id: 'answerHealthQuestions',
                questionId: 'questionHealth',
                text: {
                    'en': 'I have questions relating to my health',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'healthCare',
                    taxonomyTermId: 'information',
                }],
            },
            'answerLearnEnglish': {
                id: 'answerLearnEnglish',
                questionId: 'questionEducation',
                text: {
                    'en': 'I want to take courses to improve my English skills',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'education',
                    taxonomyTermId: 'language',
                }],
            },
            'answerImproveReadingAndMath': {
                id: 'answerImproveReadingAndMath',
                questionId: 'questionEducation',
                text: {
                    'en': 'I want to take courses to improve reading or math skills',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'education',
                    taxonomyTermId: 'continuingEducation',
                }],
            },
            'answerFinishHighSchoolAsAnAdult': {
                id: 'answerFinishHighSchoolAsAnAdult',
                questionId: 'questionEducation',
                text: {
                    'en': 'I am an adult and I want to finish high school',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'education',
                    taxonomyTermId: 'continuingEducation',
                }],
            },
            'answerLearnNewJobSkills': {
                id: 'answerLearnNewJobSkills',
                questionId: 'questionEducation',
                text: {
                    'en': 'I want to learn new job skills',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'education',
                    taxonomyTermId: 'continuingEducation',
                }],
            },
            'answerGoToUniversity': {
                id: 'answerGoToUniversity',
                questionId: 'questionEducation',
                text: {
                    'en': 'I want to go to university or college',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'education',
                    taxonomyTermId: 'postSecondaryEducation',
                }],
            },
            'answerEducationCosts': {
                id: 'answerEducationCosts',
                questionId: 'questionEducation',
                text: {
                    'en': 'I want to learn more about education costs',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'education',
                    taxonomyTermId: 'costs',
                }],
            },

            'answerTravelLocally': {
                id: 'answerTravelLocally',
                questionId: 'questionTransportation',
                text: {
                    'en': 'I need to travel within the city or town where I live',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'travel',
                    taxonomyTermId: 'local',
                }],
            },
            'answerTravelLongDistance': {
                id: 'answerTravelLongDistance',
                questionId: 'questionTransportation',
                text: {
                    'en': 'I need to travel longer distances (between cities)',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'travel',
                    taxonomyTermId: 'longDistance',
                }],
            },
            'answerTravelByCar': {
                id: 'answerTravelByCar',
                questionId: 'questionTransportation',
                text: {
                    'en': 'I want to know more about driving in British Columbia',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'travel',
                    taxonomyTermId: 'cars',
                }],
            },
            'answerDriversLicence': {
                id: 'answerDriversLicence',
                questionId: 'questionTransportation',
                text: {
                    'en': 'I need to get a driver\'s licence',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'driving',
                    taxonomyTermId: 'driversLicence',
                }],
            },
            'answerBuyingACar': {
                id: 'answerBuyingACar',
                questionId: 'questionTransportation',
                text: {
                    'en': 'I need to buy a car',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'driving',
                    taxonomyTermId: 'buyingVehicle',
                }],
            },
            'answerCarSharing': {
                id: 'answerCarSharing',
                questionId: 'questionTransportation',
                text: {
                    'en': 'I want to drive without buying a car (car sharing)',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'driving',
                    taxonomyTermId: 'carSharing',
                }],
            },
            'answerDrivingLaws': {
                id: 'answerDrivingLaws',
                questionId: 'questionTransportation',
                text: {
                    'en': 'I want to know more about the laws related to driving',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'driving',
                    taxonomyTermId: 'laws',
                }],
            },
            'answerDrivingCosts': {
                id: 'answerDrivingCosts',
                questionId: 'questionTransportation',
                text: {
                    'en': 'I want to know more about the costs of owning a car',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'driving',
                    taxonomyTermId: 'cost',
                }],
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
                    taxonomyId: 'employmentStatus',
                    taxonomyTermId: 'looking',
                }],
            },
            'answerIAmEmployed': {
                id: 'answerIAmEmployed',
                questionId: 'questionWorkStatus',
                text: {
                    'en': 'I have a job',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'employmentStatus',
                    taxonomyTermId: 'employed',
                }],
            },
            'answerIAmSelfEmployed': {
                id: 'answerIAmSelfEmployed',
                questionId: 'questionWorkStatus',
                text: {
                    'en': 'I work for myself',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'employmentStatus',
                    taxonomyTermId: 'selfEmployed',
                }],
            },
            'answerLeavingMyJob': {
                id: 'answerLeavingMyJob',
                questionId: 'questionWorkStatus',
                text: {
                    'en': 'I want to leave my current job',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'employmentStatus',
                    taxonomyTermId: 'leaving',
                }],
            },
            'answerLeaveAndVacation': {
                id: 'answerLeaveAndVacation',
                questionId: 'questionWorkInformation',
                text: {
                    'en': 'Taking time off from work',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'employment',
                    taxonomyTermId: 'leaveAndVacation',
                }],
            },
            'answerPayAndDeductions': {
                id: 'answerPayAndDeductions',
                questionId: 'questionWorkInformation',
                text: {
                    'en': 'Getting paid and paying taxes',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'employment',
                    taxonomyTermId: 'payAndDeductions',
                }],
            },
            'answerEmploymentLaws': {
                id: 'answerEmploymentLaws',
                questionId: 'questionWorkInformation',
                text: {
                    'en': 'Laws relating to work',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'employment',
                    taxonomyTermId: 'laws',
                }],
            },
            'answerStartingABusiness': {
                id: 'answerStartingABusiness',
                questionId: 'questionWorkInformation',
                text: {
                    'en': 'Starting your own business',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'employment',
                    taxonomyTermId: 'startingABusiness',
                }],
            },
            'answerImmigrationLaws': {
                id: 'answerImmigrationLaws',
                questionId: 'questionLegalSystem',
                text: {
                    'en': 'Immigration',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'legalSystem',
                    taxonomyTermId: 'immigration',
                }],
            },
            'answerCanadasGovernment': {
                id: 'answerCanadasGovernment',
                questionId: 'questionLegalSystem',
                text: {
                    'en': 'How Canada\'s government works',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'legalSystem',
                    taxonomyTermId: 'government',
                }],
            },
            'answerSomeImportantLaws': {
                id: 'answerSomeImportantLaws',
                questionId: 'questionLegalSystem',
                text: {
                    'en': 'Some important laws',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'legalSystem',
                    taxonomyTermId: 'importantLaws',
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
            'answerProtectedPerson': {
                id: 'answerProtectedPerson',
                questionId: 'questionImmigrantType',
                text: {
                    'en': 'Protected person',
                },
                isChosen: false,
                isInverted: false,
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
                isInverted: false,
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
            'answerImmigrantTypeNone': {
                id: 'answerImmigrantTypeNone',
                questionId: 'questionImmigrantType',
                text: {
                    'en': 'None of the above, or I’m not sure',
                    'ar': 'لا شيء مما سبق ، أو لست متأكداx',
                    'fr': 'Rien de ce qui précède, ou je ne suis pas sûr',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [],
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
                }],
            },
            'answerEnglishLevelBeginner': {
                id: 'answerEnglishLevelBeginner',
                questionId: 'questionEnglishLevel',
                text: {
                    'en': 'Beginner',
                    'ar': 'مبتدئ',
                    'fr': 'Débutant(e)',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'english_level',
                    taxonomyTermId: 'beginner',
                }],
            },
            'answerEnglishLevelIntermediate': {
                id: 'answerEnglishLevelIntermediate',
                questionId: 'questionEnglishLevel',
                text: {
                    'en': 'Intermediate',
                    'ar': 'متوسط',
                    'fr': 'Intermédiaire',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [],
            },
            'answerEnglishLevelFluent': {
                id: 'answerEnglishLevelFluent',
                questionId: 'questionEnglishLevel',
                text: {
                    'en': 'Fluent',
                    'ar': 'بطلاقة',
                    'fr': 'Couramment',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [],
            },
            'answerGroupWomen': {
                id: 'answerGroupWomen',
                questionId: 'questionGroups',
                text: {
                    'en': 'Women’s services',
                    'ar': 'خدمات النساء',
                    'fr': 'Les services aux femmes',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'group',
                    taxonomyTermId: 'women',
                }],
            },
            'answerGroupWithDisabilities': {
                id: 'answerGroupWithDisabilities',
                questionId: 'questionGroups',
                text: {
                    'en': 'Services for people with disabilities',
                    'ar': 'خدمات لذوي الاحتياجات الخاصة',
                    'fr': 'Services pour les personnes handicapées',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'group',
                    taxonomyTermId: 'disability',
                }],
            },
            'answerGroupLGBT': {
                id: 'answerGroupLGBT',
                questionId: 'questionGroups',
                text: {
                    'en': 'LGBTQ2 services',
                    'ar': 'خدمات LGBTQ2',
                    'fr': 'LGBTQ2 services',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'group',
                    taxonomyTermId: 'lgbtq2',
                }],
            },
            'answerGroupFrench': {
                id: 'answerGroupFrench',
                questionId: 'questionGroups',
                text: {
                    'en': 'Services offered in French',
                    'ar': 'الخدمات المقدمة باللغة الفرنسية',
                    'fr': 'Services offerts en français',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'group',
                    taxonomyTermId: 'services_in_french',
                }],
            },
            'answerGroupLowIncome': {
                id: 'answerGroupLowIncome',
                questionId: 'questionGroups',
                text: {
                    'en': 'Services for low income people',
                    'ar': 'خدمات لذوي الدخل المحدود',
                    'fr': 'Services pour les personnes à faible revenu',
                },
                isChosen: false,
                isInverted: false,
                taxonomyTerms: [{
                    taxonomyId: 'group',
                    taxonomyTermId: 'low_income',
                }],
            },
        },
    });
};
