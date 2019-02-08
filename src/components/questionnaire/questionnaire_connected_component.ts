import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { QuestionnaireComponent, QuestionnaireProps } from './questionnaire_component';
import { QuestionnaireActions } from './questionnaire_component';
import { Store } from '../../stores';
import { Id, ChooseAnswerAction, chooseAnswer, SetActiveQuestionAction, setActiveQuestion } from '../../stores/questionnaire';
import { selectActiveQuestion } from '../../selectors/questionnaire/select_active_question';
import { UpdateOldAnswersFromStoreAnswersAction, updateOldAnswersFromStoreAnswers } from '../../stores/questionnaire/actions';

const mapStateToProps = (store: Store): QuestionnaireProps => ({
    activeQuestion: selectActiveQuestion(store),
});

type DispatchActions = ChooseAnswerAction | SetActiveQuestionAction | UpdateOldAnswersFromStoreAnswersAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): QuestionnaireActions => ({
    chooseAnswer: (answerId: Id): ChooseAnswerAction => dispatch(chooseAnswer(answerId)),
    setActiveQuestion: (activeQuestion: Id): SetActiveQuestionAction => dispatch(setActiveQuestion(activeQuestion)),
    updateOldAnswersFromStoreAnswers: (): UpdateOldAnswersFromStoreAnswersAction => dispatch(updateOldAnswersFromStoreAnswers()),
});

export const QuestionnaireConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(QuestionnaireComponent);
