import { Store } from '../../stores';
import { getIdsOfChosenAnswers } from '../questionnaire/get_ids_of_chosen_answers';
import { PersistedUserData } from '../../stores/user_data';
import { pickSavedTopicIds } from '../topics/pick_saved_topic_ids';
import { pickAnswers } from '../questionnaire/pick_answers';
import { selectShowOnboarding } from '../onboarding/select_show_onboarding';

export const selectUserDataForLocalPersistence = (appStore: Store): PersistedUserData => ({
    chosenAnswers: getIdsOfChosenAnswers(pickAnswers(appStore)),
    savedTopics: pickSavedTopicIds(appStore),
    showOnboarding: selectShowOnboarding(appStore),
});
