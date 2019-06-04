import * as model from '../../stores/questionnaire';
import { Answer } from './answer';


export const toSelectorAnswerList =
    (answerIds: ReadonlyArray<string>, answers: model.AnswersMap, acceptMultipleAnswers: boolean): ReadonlyArray<Answer> => (
        answerIds.map((id: string) => {
            const { text, isChosen }: model.Answer = answers[id];
            return {
                id,
                text,
                isChosen,
                acceptMultipleAnswers,
            };
        })
    );