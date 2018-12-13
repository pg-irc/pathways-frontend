import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { QuestionnaireComponent, QuestionnaireProps } from './questionnaire_component';
import { QuestionnaireActions } from './questionnaire_component';
import { Store } from '../../stores';
import { Id, ChooseAnswerAction, chooseAnswer, SetActiveQuestionAction, setActiveQuestion } from '../../stores/questionnaire';
import { selectActiveQuestion } from '../../selectors/questionnaire/select_active_question';
import { selectRecommendedTasks } from '../../selectors/tasks/select_recommended_tasks';
import { selectQuestionList } from '../../selectors/questionnaire/select_question_list';

const mapStateToProps = (store: Store): QuestionnaireProps => ({
    questions: selectQuestionList(store),
    activeQuestion: selectActiveQuestion(store),
    recommendedTaskCount: selectRecommendedTasks(store).length,
});

type DispatchActions = ChooseAnswerAction | SetActiveQuestionAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): QuestionnaireActions => ({
    chooseAnswer: (answerId: Id): ChooseAnswerAction => dispatch(chooseAnswer(answerId)),
    setActiveQuestion: (activeQuestion: Id): SetActiveQuestionAction => dispatch(setActiveQuestion(activeQuestion)),
});

export const QuestionnaireConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(QuestionnaireComponent);
