import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { QuestionnaireComponent, QuestionnaireProps } from './questionnaire_component';
import { QuestionnaireActions } from './questionnaire_component';
import { Store } from '../../stores';
import { Id, ChooseAnswerAction, chooseAnswer, SetActiveQuestionAction, setActiveQuestion } from '../../stores/questionnaire';
import { selectActiveQuestion } from '../../selectors/questionnaire/select_active_question';
import { DismissNewlyAddedTasksPopupAction, dismissNewlyAddedTasksPopup } from '../../stores/questionnaire/actions';

const mapStateToProps = (store: Store): QuestionnaireProps => ({
    activeQuestion: selectActiveQuestion(store),
});

type DispatchActions = ChooseAnswerAction | SetActiveQuestionAction | DismissNewlyAddedTasksPopupAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): QuestionnaireActions => ({
    chooseAnswer: (answerId: Id): ChooseAnswerAction => dispatch(chooseAnswer(answerId)),
    setActiveQuestion: (activeQuestion: Id): SetActiveQuestionAction => dispatch(setActiveQuestion(activeQuestion)),
    // TODO This along with "saveToMyPlan" should be cleaned up
    dismissPopup: (): DismissNewlyAddedTasksPopupAction => dispatch(dismissNewlyAddedTasksPopup()),
});

export const QuestionnaireConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(QuestionnaireComponent);
