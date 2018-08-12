import { Store } from '../../stores';
import { selectLocale } from '../locale/select_locale';
import { denormalizeQuestions, Questionnaire } from '.';

export const selectQuestionnaire = (appStore: Store): Questionnaire => {
    const locale = selectLocale(appStore);
    return denormalizeQuestions(locale, appStore.questionnaireInStore);
};
