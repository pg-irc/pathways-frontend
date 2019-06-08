export const ROUTE_CHANGED = 'ROUTER:ROUTE_CHANGED';

export const REMOVE_NOTIFICATION = 'NOTIFICATIONS:REMOVE_NOTIFICATION';

export const LOAD_FONTS_REQUEST = 'UI:LOAD_FONTS_REQUEST';
export const LOAD_FONTS_SUCCESS = 'UI:LOAD_FONTS_SUCCESS';
export const LOAD_FONTS_FAILURE = 'UI:LOAD_FONTS_FAILURE';

export const SET_LOCALE_REQUEST = 'I18N:SET_LOCALE_REQUEST';
export const SET_LOCALE_SUCCESS = 'I18N:SET_LOCALE_SUCCESS';
export const SET_LOCALE_FAILURE = 'I18N:SET_LOCALE_FAILURE';
export const LOAD_CURRENT_LOCALE_REQUEST = 'I18N:LOAD_CURRENT_LOCALE_REQUEST';
export const LOAD_CURRENT_LOCALE_SUCCESS = 'I18N:LOAD_CURRENT_LOCALE_SUCCESS';
export const LOAD_CURRENT_LOCALE_FAILURE = 'I18N:LOAD_CURRENT_LOCALE_FAILURE';

export const CHOOSE_ANSWER = 'QUESTIONNAIRE:SELECT_ANSWER';
export const SET_ACTIVE_QUESTION = 'QUESTIONNAIRE:SET_ACTIVE_QUESTION';
export const UPDATE_OLD_ANSWERS_FROM_STORE_ANSWERS = 'QUESTIONNAIRE:UPDATE_OLD_ANSWERS_FROM_STORE_ANSWERS';

export const SET_ONBOARDING = 'ONBOARDING:SET_ONBOARDING';

export const SAVE_USER_DATA_SUCCESS = 'SAVE_USER_DATA_SUCCESS';
export const SAVE_USER_DATA_FAILURE = 'SAVE_USER_DATA_FAILURE';
export const LOAD_USER_DATA_REQUEST = 'LOAD_USER_DATA_REQUEST';
export const LOAD_USER_DATA_SUCCESS = 'LOAD_USER_DATA_SUCCESS';
export const LOAD_USER_DATA_FAILURE = 'LOAD_USER_DATA_FAILURE';

export const CLEAR_ERROR_STATE = 'REDUCERS:CLEAR_ERROR_STATE';
export const CLEAR_ALL_USER_DATA = 'CLEAR_ALL_USER_DATA';

export const ADD_TO_SAVED_TOPICS = 'ADD_TO_SAVED_TOPICS';
export const REMOVE_FROM_SAVED_TOPICS = 'REMOVE_FROM_SAVED_TOPICS';
export const TOGGLE_IS_TOPIC_COMPLETED = 'TOGGLE_IS_TOPIC_COMPLETED';
export const LOAD_SERVICES_REQUEST = 'LOAD_SERVICES_REQUEST';
export const LOAD_SERVICES_SUCCESS = 'LOAD_SERVICES_SUCCESS';
export const LOAD_SERVICES_FAILURE = 'LOAD_SERVICES_FAILURE';

export const PREFERENCES_LOCALE_CODE = 'PREFERENCES:LOCALE_CODE';
export const USER_DATA_STORAGE_KEY = 'QUESTIONNAIRE_LOCAL_STORAGE_KEY';

export namespace Taxonomies {
    export const EXPLORE_TAXONOMY_ID = 'explore';
    export const RECOMMENDATION_TAXONOMY_ID = 'recommendation';
    export const RECOMMEND_TO_ALL_TAXONOMY_TERM_ID = 'recommendToAll';
}

export namespace AnalyticsAsync {
    export const REQUEST = 'ASYNC:ANALYTICS:REQUEST';
    export const SUCCESS = 'ASYNC:ANALYTICS:SUCCESS';
    export const FAILURE = 'ASYNC:ANALYTICS:FAILURE';
}

export const TOPIC_SERVICES_VALID = 'ServicesForTopic:Valid';
export const TOPIC_SERVICES_LOADING = 'ServicesForTopic:Loading';
export const TOPIC_SERVICES_ERROR = 'ServicesForTopic:Error';
