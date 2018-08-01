import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Component, QuestionnaireProps } from './questionnaire';
import { QuestionnaireActions } from './questionnaire';
import { Store } from '../../stores';
import { Id, SelectAnswerAction, selectAnswer, SetActiveQuestionAction, setActiveQuestion } from '../../stores/questionnaire';
import { selectQuestionnaire, selectActiveQuestion } from '../../selectors/questionnaire';

const mapStateToProps = (store: Store): QuestionnaireProps => {
    return {
        questionnaire: selectQuestionnaire(store),
        activeQuestion: selectActiveQuestion(store),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Store>): QuestionnaireActions => ({
    selectAnswer: (answerId: Id): SelectAnswerAction => dispatch(selectAnswer(answerId)),
    setActiveQuestion: (activeQuestion: Id): SetActiveQuestionAction => dispatch(setActiveQuestion(activeQuestion)),
});

export const QuestionnaireConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Component);
