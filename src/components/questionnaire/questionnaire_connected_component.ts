import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Component, QuestionnaireProps } from './questionnaire';
import { QuestionnaireActions } from './questionnaire';
import { Store } from '../../stores';
import { Id, ChooseAnswerAction, chooseAnswer, SetActiveQuestionAction, setActiveQuestion } from '../../stores/questionnaire';
import { selectActiveQuestion } from '../../selectors/questionnaire/select_active_question';
import { selectRecommendedTasks } from '../../selectors/tasks';
import { selectQuestionList } from '../../selectors/questionnaire/select_question_list';

const mapStateToProps = (store: Store): QuestionnaireProps => ({
    questionnaire: selectQuestionList(store),
    activeQuestion: selectActiveQuestion(store),
    recommendedTaskCount: selectRecommendedTasks(store).length,
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): QuestionnaireActions => ({
    chooseAnswer: (answerId: Id): ChooseAnswerAction => dispatch(chooseAnswer(answerId)),
    setActiveQuestion: (activeQuestion: Id): SetActiveQuestionAction => dispatch(setActiveQuestion(activeQuestion)),
});

export const QuestionnaireConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Component);
