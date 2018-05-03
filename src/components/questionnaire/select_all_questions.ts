import * as model from '../../stores/questionnaire';
import * as viewModel from './view_model';

export const selectAllQuestions = (modelStore: model.Store): viewModel.AllTheQuestions => {
    const { questions, answers }: model.Store = modelStore;

    return Object.keys(questions).map((key: string) => {
        const { id, text }: model.Question = questions[key];
        return {
            id,
            text,
            answers: selectAnswersForQuestion(id, answers),
        };
    });
};

const selectAnswersForQuestion = (questionId: model.Id, answers: model.AnswersMap): ReadonlyArray<viewModel.Answer> => {
    const keys = answerKeysForGivenQuestion(questionId, answers);

    return buildViewModelForAnswers(keys, answers);
};

const answerKeysForGivenQuestion = (questionId: model.Id, answers: model.AnswersMap): Array<string> => {
    return Object.keys(answers).filter((key: string) => (
        answers[key].questionId === questionId
    ));
};

const buildViewModelForAnswers = (keys: Array<string>, answers: model.AnswersMap): ReadonlyArray<viewModel.Answer> => (
    keys.map((key: string) => {
        const { id, text, isSelected }: viewModel.Answer = answers[key];
        return {
            id,
            text,
            isSelected,
        };
    })
);
