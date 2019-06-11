import { Store } from '../../stores';
import { Question } from './question';
import { pickQuestionnaire } from './pick_questionnaire';
import { toSelectorQuestion } from './to_selector_question';
import { pickActiveQuestion } from './pick_active_question';

export const selectActiveQuestion = (appStore: Store): Question => {
    const questionnaire = pickQuestionnaire(appStore);
    const activeQuestion = pickActiveQuestion(appStore);
    const question = questionnaire.questions[activeQuestion];
    return toSelectorQuestion(question, questionnaire.questions, questionnaire.answers);
};
