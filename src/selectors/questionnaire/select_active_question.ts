import { Store } from '../../stores';
import { selectLocale } from '../locale/select_locale';
import { Question } from './question';
import { pickQuestionnaire } from './pick_questionnaire';
import { toSelectorQuestion } from './to_selector_question';
import { pickActiveQuestion } from './pick_active_question';

export const selectActiveQuestion = (appStore: Store): Question => {
    const locale = selectLocale(appStore);
    const questionnaire = pickQuestionnaire(appStore);
    const activeQuestion = pickActiveQuestion(appStore);
    const question = questionnaire.questions[activeQuestion];
    return toSelectorQuestion(locale, question, questionnaire.questions, questionnaire.answers);
};
