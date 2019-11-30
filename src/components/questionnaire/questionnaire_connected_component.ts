import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { QuestionnaireComponent, QuestionnaireProps } from './questionnaire_component';
import { QuestionnaireActions } from './questionnaire_component';
import { Store } from '../../stores';
import { Id, ChooseAnswerAction, chooseAnswer, SetActiveQuestionAction, setActiveQuestion } from '../../stores/questionnaire';
import { selectActiveQuestion } from '../../selectors/questionnaire/select_active_question';
import { CloseQuestionnaireAction, closeQuestionnaire } from '../../stores/questionnaire/actions';
import { pickQuestionnaire } from '../../selectors/questionnaire/pick_questionnaire';
import { pickAnswers } from '../../selectors/questionnaire/pick_answers';
import { pickTopics } from '../../selectors/topics/pick_topics';
import { pickSavedTopicIds } from '../../selectors/topics/pick_saved_topic_ids';
import { Topic } from '../../stores/topics';

const mapStateToProps = (store: Store): QuestionnaireProps => ({
    oldAnswers: pickQuestionnaire(store).oldAnswers,
    newAnswers: pickAnswers(store),
    topics: pickTopics(store),
    savedTopicIds: pickSavedTopicIds(store),
    activeQuestion: selectActiveQuestion(store),
});

type DispatchActions = ChooseAnswerAction | SetActiveQuestionAction | CloseQuestionnaireAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): QuestionnaireActions => ({
    chooseAnswer: (answerId: Id): ChooseAnswerAction => dispatch(chooseAnswer(answerId)),
    setActiveQuestion: (activeQuestion: Id): SetActiveQuestionAction => dispatch(setActiveQuestion(activeQuestion)),
    closeQuestionnaire: (newTopics: ReadonlyArray<Topic>): CloseQuestionnaireAction => dispatch(closeQuestionnaire(newTopics)),
});

export const QuestionnaireConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(QuestionnaireComponent);
