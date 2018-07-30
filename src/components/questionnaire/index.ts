import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Component, QuestionnaireProps } from './questionnaire';
import { QuestionnaireActions } from './questionnaire';
import { Store } from '../../stores';
import { Id, SelectAnswerAction, selectAnswer, SetActiveQuestionAction, setActiveQuestion } from '../../stores/questionnaire';
import { selectQuestionnaire } from '../../selectors/questionnaire';

const mapStateToProps = (store: Store): QuestionnaireProps => {
    return {
        questionnaire: selectQuestionnaire(store),
        activeQuestion: store.questionnaireInStore.activeQuestion,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Store>): QuestionnaireActions => ({
    selectAnswer: (answerId: Id): SelectAnswerAction => dispatch(selectAnswer(answerId)),
    setActiveQuestion: (activeQuestion: number): SetActiveQuestionAction => dispatch(setActiveQuestion(activeQuestion)),
});

export const QuestionnaireConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Component);
