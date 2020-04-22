export const ROUTE_CHANGED = 'ROUTER:ROUTE_CHANGED';

export const REMOVE_NOTIFICATION = 'NOTIFICATIONS:REMOVE_NOTIFICATION';

export const LOAD_FONTS_REQUEST = 'UI:LOAD_FONTS_REQUEST';
export const LOAD_FONTS_SUCCESS = 'UI:LOAD_FONTS_SUCCESS';
export const LOAD_FONTS_FAILURE = 'UI:LOAD_FONTS_FAILURE';

export const SAVE_LOCALE_REQUEST = 'I18N:SAVE_LOCALE_REQUEST';
export const SAVE_LOCALE_SUCCESS = 'I18N:SAVE_LOCALE_SUCCESS';
export const SAVE_LOCALE_FAILURE = 'I18N:SAVE_LOCALE_FAILURE';
export const LOAD_CURRENT_LOCALE_REQUEST = 'I18N:LOAD_CURRENT_LOCALE_REQUEST';
export const LOAD_CURRENT_LOCALE_SUCCESS = 'I18N:LOAD_CURRENT_LOCALE_SUCCESS';
export const LOAD_CURRENT_LOCALE_FAILURE = 'I18N:LOAD_CURRENT_LOCALE_FAILURE';

export const CHOOSE_ANSWER = 'QUESTIONNAIRE:SELECT_ANSWER';
export const SET_ACTIVE_QUESTION = 'QUESTIONNAIRE:SET_ACTIVE_QUESTION';
export const CLOSE_QUESTIONNAIRE = 'QUESTIONNAIRE:CLOSE_QUESTIONNAIRE';

export const HIDE_ONBOARDING = 'USER_PROFILE:HIDE_ONBOARDING';
export const DISABLE_ANALYTICS = 'USER_PROFILE:DISABLE_ANALYTICS';
export const HIDE_PARTIAL_LOCALIZATION_MESSAGE = 'USER_PROFILE:HIDE_PARTIAL_LOCALIZATION_MESSAGE';

export const SAVE_USER_DATA_SUCCESS = 'SAVE_USER_DATA_SUCCESS';
export const SAVE_USER_DATA_FAILURE = 'SAVE_USER_DATA_FAILURE';
export const LOAD_USER_DATA_REQUEST = 'LOAD_USER_DATA_REQUEST';
export const LOAD_USER_DATA_SUCCESS = 'LOAD_USER_DATA_SUCCESS';
export const LOAD_USER_DATA_FAILURE = 'LOAD_USER_DATA_FAILURE';

export const CLEAR_ERROR_STATE = 'REDUCERS:CLEAR_ERROR_STATE';
export const CLEAR_ALL_USER_DATA = 'CLEAR_ALL_USER_DATA';

export const BOOKMARK_TOPIC = 'BOOKMARK_TOPIC';
export const UNBOOKMARK_TOPIC = 'UNBOOKMARK_TOPIC';
export const BOOKMARK_SERVICE = 'BOOKMARK_SERVICE';
export const UNBOOKMARK_SERVICE = 'UNBOOKMARK_SERVICE';
export const TOGGLE_IS_TOPIC_COMPLETED = 'TOGGLE_IS_TOPIC_COMPLETED';
export const LOAD_SERVICES_REQUEST = 'LOAD_SERVICES_REQUEST';
export const LOAD_SERVICES_SUCCESS = 'LOAD_SERVICES_SUCCESS';
export const LOAD_SERVICES_FAILURE = 'LOAD_SERVICES_FAILURE';
export const SAVE_SERVICE = 'SAVE_SERVICE';
export const OPEN_SERVICE_DETAIL = 'OPEN_SERVICE_DETAIL';

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

export const VALID_SERVICES_FOR_TOPIC = 'SERVICES_FOR_TOPIC:VALID';
export const LOADING_SERVICES_FOR_TOPIC = 'SERVICES_FOR_TOPIC:LOADING';
export const ERROR_SERVICES_FOR_TOPIC = 'SERVICES_FOR_TOPIC:ERROR';
export const INITIAL_EMPTY_SERVICES_FOR_TOPIC = 'SERVICES_FOR_TOPIC:INITIAL_EMPTY';

export const SET_MANUAL_USER_LOCATION = 'SetManualLocation';
export const CLEAR_MANUAL_USER_LOCATION = 'ClearManualLocation';
export const MY_LOCATION = 'My Location';

export const SENTRY_SERVICES_LISTING_ERROR_CONTEXT = 'ServicesListing';

export const POST_PUSH_NOTIFICATION_TOKEN_REQUEST = 'POST_PUSH_NOTIFICATION_TOKEN_REQUEST';
export const POST_PUSH_NOTIFICATION_TOKEN_SUCCESS = 'POST_PUSH_NOTIFICATION_TOKEN_SUCCESS';
export const POST_PUSH_NOTIFICATION_TOKEN_FAILURE = 'POST_PUSH_NOTIFICATION_TOKEN_FAILURE';

export const MEMORY_REPORT_SEND_EVERY_SERVICES_COUNT = 100;
export const EXPAND_DETAIL = 'EXPAND_DETAIL';
export const COLLAPSE_DETAIL = 'COLLAPSE_DETAIL';

export const SAVE_SEARCH_TERM = 'SAVE_SEARCH_TERM';
export const SAVE_SEARCH_LOCATION = 'SAVE_SEARCH_LOCATION';
export const SAVE_SEARCH_LAT_LONG = 'SAVE_SEARCH_LAT_LONG';
export const SAVE_SEARCH_PAGE = 'SAVE_SEARCH_PAGE';
export const SAVE_NUMBER_OF_SEARCH_PAGES = 'SAVE_NUMBER_OF_SEARCH_PAGES';
export const SAVE_SEARCH_OFFSET = 'SAVE_SEARCH_OFFSET';
export const SAVE_SEARCH_RESULTS = 'SAVE_SEARCH_RESULTS';
export const SET_COLLAPSE_SEARCH_INPUT = 'SET_COLLAPSE_SEARCH_INPUT';

export const ANALYTICS_LINK_PRESSED = 'ANALYTICS_LINK_PRESSED';
export const SEARCH_EXECUTED = 'SEARCH_EXECUTED';

export const CLOSE_HEADER_MENU = 'CLOSE_HEADER_MENU';
export const OPEN_HEADER_MENU = 'OPEN_HEADER_MENU';
export const CLOSE_ABOUT_MODAL = 'CLOSE_ABOUT_MODAL';
export const OPEN_ABOUT_MODAL = 'OPEN_ABOUT_MODAL';
export const CLOSE_DISCLAIMER_MODAL = 'CLOSE_DISCLAIMER_MODAL';
export const OPEN_DISCLAIMER_MODAL = 'OPEN_DISCLAIMER_MODAL';

export const SUGGEST_AN_UPDATE = 'FEEDBACK:SUGGEST_AN_UPDATE';
export const CHOOSE_CHANGE_NAME_AND_DETAILS = 'FEEDBACK:CHOOSE_CHANGE_NAME_AND_DETAILS';
export const CHOOSE_REMOVE_SERVICE = 'FEEDBACK:CHOOSE_REMOVE_SERVICE';
export const CHOOSE_OTHER_CHANGES = 'FEEDBACK:CHOOSE_OTHER_CHANGES';
export const DISCARD_CHANGES = 'FEEDBACK:DISCARD_CHANGES';
export const CANCEL_DISCARD_CHANGES = 'FEEDBACK:CANCEL_DISCARD_CHANGES';
export const CLOSE = 'FEEDBACK:CLOSE';
export const BACK = 'FEEDBACK:BACK';
export const SUBMIT = 'FEEDBACK:SUBMIT';
export const FINISH_FEEDBACK = 'FEEDBACK:FINISH';
