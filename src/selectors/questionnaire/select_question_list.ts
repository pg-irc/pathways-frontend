import { Store } from '../../stores';
import { selectLocale } from '../locale/select_locale';
import { QuestionList } from './types';
import { buildQuestionList } from './build_question_list';

export const selectQuestionList = (appStore: Store): QuestionList => {
    const locale = selectLocale(appStore);
    return buildQuestionList(locale, appStore.questionnaireInStore);
};
