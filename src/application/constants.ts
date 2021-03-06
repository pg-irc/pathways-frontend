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
export const RESET_LOCALE = 'I18N:RESET_LOCALE';

export const SAVE_CURRENT_REGION = 'SAVE_CURRENT_REGION';
export const SELECT_REGION = 'SELECT_REGION';
export const SELECT_LOCALE = 'SELECT_LOCALE';

export const CHOOSE_ANSWER = 'QUESTIONNAIRE:SELECT_ANSWER';
export const SET_ACTIVE_QUESTION = 'QUESTIONNAIRE:SET_ACTIVE_QUESTION';
export const CLOSE_QUESTIONNAIRE = 'QUESTIONNAIRE:CLOSE_QUESTIONNAIRE';

export const HIDE_ONBOARDING = 'USER_PROFILE:HIDE_ONBOARDING';
export const DISABLE_ANALYTICS = 'USER_PROFILE:DISABLE_ANALYTICS';
export const ENABLE_CUSTOM_LATLONG = 'USER_PROFILE:ENABLE_CUSTOM_LATLONG';
export const HIDE_PARTIAL_LOCALIZATION_MESSAGE = 'USER_PROFILE:HIDE_PARTIAL_LOCALIZATION_MESSAGE';
export const HIDE_LINK_ALERTS = 'USER_PROFILE:HIDE_LINK_ALERTS';

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
export const SAVE_SERVICE_TO_MAP = 'SAVE_SERVICE';
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

export const PUSH_NOTIFICATION_TOKEN_REQUEST = 'PUSH_NOTIFICATION_TOKEN_REQUEST';
export const PUSH_NOTIFICATION_TOKEN_SUCCESS = 'PUSH_NOTIFICATION_TOKEN_SUCCESS';
export const PUSH_NOTIFICATION_TOKEN_FAILURE = 'PUSH_NOTIFICATION_TOKEN_FAILURE';

export const GET_ALERTS_SUCCESS = 'GET_ALERTS_SUCCESS';
export const GET_ALERTS_FAILURE = 'GET_ALERTS_FAILURE';

export const MEMORY_REPORT_SEND_EVERY_SERVICES_COUNT = 100;
export const EXPAND_DETAIL = 'EXPAND_DETAIL';
export const COLLAPSE_DETAIL = 'COLLAPSE_DETAIL';

export const SAVE_SEARCH_TERM = 'SAVE_SEARCH_TERM';
export const SAVE_SEARCH_LOCATION = 'SAVE_SEARCH_LOCATION';
export const SAVE_SEARCH_LAT_LONG = 'SAVE_SEARCH_LAT_LONG';
export const SAVE_SEARCH_PAGE = 'SAVE_SEARCH_PAGE';
export const SAVE_NUMBER_OF_SEARCH_PAGES = 'SAVE_NUMBER_OF_SEARCH_PAGES';
export const SAVE_SEARCH_RESULTS = 'SAVE_SEARCH_RESULTS';
export const SET_COLLAPSE_SEARCH_INPUT = 'SET_COLLAPSE_SEARCH_INPUT';

export const OPEN_ORGANIZATION = 'OPEN_ORGANIZATION';
export const SAVE_ORGANIZATION = 'SAVE_ORGANIZATION';
export const SAVE_ORGANIZATION_TAB = 'SAVE_ORGANIZATION_TAB';
export const SAVE_SERVICES_BY_ORGANIZATION = 'SAVE_SERVICES_BY_ORGANIZATION';

export const LOAD_ORGANIZATION_REQUEST = 'LOAD_ORGANIZATION_REQUEST';
export const LOAD_ORGANIZATION_SUCCESS = 'LOAD_ORGANIZATION_SUCCESS';
export const LOAD_ORGANIZATION_FAILURE = 'LOAD_ORGANIZATION_FAILURE';

export const VALID_ORGANIZATION = 'ORGANIZATION:VALID';
export const LOADING_ORGANIZATION = 'ORGANIZATION:LOADING';
export const ERROR_ORGANIZATION = 'ORGANIZATION:ERROR';

export const ANALYTICS_LINK_PRESSED = 'ANALYTICS_LINK_PRESSED';
export const SEARCH_EXECUTED = 'SEARCH_EXECUTED';

export const SUGGEST_AN_UPDATE = 'FEEDBACK:SUGGEST_AN_UPDATE';
export const CHOOSE_CHANGE_NAME_AND_DETAILS = 'FEEDBACK:CHOOSE_CHANGE_NAME_AND_DETAILS';
export const CHOOSE_REMOVE_SERVICE = 'FEEDBACK:CHOOSE_REMOVE_SERVICE';
export const CHOOSE_OTHER_CHANGES = 'FEEDBACK:CHOOSE_OTHER_CHANGES';
export const CHOOSE_EXPLAIN_FEEDBACK = 'FEEDBACK:CHOOSE_EXPLAIN_FEEDBACK';
export const DISCARD_CHANGES = 'FEEDBACK:DISCARD_CHANGES';
export const CANCEL_DISCARD_CHANGES = 'FEEDBACK:CANCEL_DISCARD_CHANGES';
export const CLOSE = 'FEEDBACK:CLOSE';
export const CLOSE_WITH_FEEDBACK = 'FEEDBACK:CLOSE_WITH_FEEDBACK';
export const SUBMIT = 'FEEDBACK:SUBMIT';
export const FINISH_FEEDBACK = 'FEEDBACK:FINISH';
export const SEND_FEEDBACK = 'FEEDBACK:SEND';
export const SET_IS_SENDING = 'FEEDBACK:SET_IS_SENDING';
export const SET_ERROR = 'FEEDBACK:SET_ERROR';
export const BACK_FROM_CONTACT_INFORMATION = 'FEEDBACK:BACK_FROM_CONTACT_INFORMATION';
export const FEEDBACK_INPUT_ID = 'FEEDBACK:INPUT_ID';

export const SAVE_BOOKMARKS_TAB = 'USER_EXPERIENCE:SAVE_BOOKMARKS_TAB';
export const CLOSE_HEADER_MENU = 'USER_EXPERIENCE:CLOSE_HEADER_MENU';
export const OPEN_HEADER_MENU = 'USER_EXPERIENCE:OPEN_HEADER_MENU';
export const CLOSE_REGION_DRAWER = 'USER_EXPERIENCE:CLOSE_REGION_DRAWER';
export const OPEN_REGION_DRAWER = 'USER_EXPERIENCE:OPEN_REGION_DRAWER';
export const CLOSE_LANGUAGE_DRAWER = 'USER_EXPERIENCE:CLOSE_LANGUAGE_DRAWER';
export const OPEN_LANGUAGE_DRAWER = 'USER_EXPERIENCE:OPEN_LANGUAGE_DRAWER';
export const CLOSE_ABOUT_MODAL = 'USER_EXPERIENCE:CLOSE_ABOUT_MODAL';
export const OPEN_ABOUT_MODAL = 'USER_EXPERIENCE:OPEN_ABOUT_MODAL';
export const CLOSE_DISCLAIMER_MODAL = 'USER_EXPERIENCE:CLOSE_DISCLAIMER_MODAL';
export const OPEN_DISCLAIMER_MODAL = 'USER_EXPERIENCE:OPEN_DISCLAIMER_MODAL';

export const CHOOSE_RATING = 'REVIEW:CHOOSE_RATING';
export const OPEN_DISCARD_CHANGES_MODAL = 'REVIEW:OPEN_DISCARD_CHANGES_MODAL';
export const CLOSE_DISCARD_CHANGES_MODAL = 'REVIEW:CLOSE_DISCARD_CHANGES_MODAL';
export const SUBMIT_SERVICE_REVIEW = 'REVIEW:SUBMIT_SERVICE_REVIEW';
export const FINISH_SERVICE_REVIEW = 'REVIEW:FINISH_SERVICE_REVIEW';
export const CLEAR_REVIEW = 'REVIEW:CLEAR_REVIEW';
export const SAVE_COMMENT = 'REVIEW:SAVE_COMMENT';
