import { Store } from '../../stores';
import { selectLocale } from '../locale/select_locale';
import { Questionnaire } from '.';
import { buildQuestionnaire } from './build_questionnaire';

export const selectQuestionnaire = (appStore: Store): Questionnaire => {
    const locale = selectLocale(appStore);
    return buildQuestionnaire(locale, appStore.questionnaireInStore);
};
