import { Store } from '../../stores';
import { selectLocale } from '../locale/select_locale';
import { Question } from './types';
import { toSelectorQuestionList } from './to_selector_question_list';
import { pullQuestionnaire } from './pull_questionnaire';

export const selectQuestionList = (appStore: Store): ReadonlyArray<Question> => {
    const locale = selectLocale(appStore);
    const questionnaire = pullQuestionnaire(appStore);
    return toSelectorQuestionList(locale, questionnaire);
};
