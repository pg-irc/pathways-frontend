import * as model from '../../stores/questionnaire';
import { getLocalizedText } from '../locale/get_localized_text';
import { Locale } from '../../locale/types';
import { Answer } from './types';

export const toSelectorAnswerList =
    (locale: Locale, answerIds: ReadonlyArray<string>, answers: model.AnswersMap, acceptMultipleAnswers: boolean): ReadonlyArray<Answer> => (
        answerIds.map((id: string) => {
            const { text, isChosen }: model.Answer = answers[id];
            return {
                id,
                text: getLocalizedText(locale, text),
                isChosen,
                acceptMultipleAnswers,
            };
        })
    );
