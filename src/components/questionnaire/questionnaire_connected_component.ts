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
import { selectTopicsForCurrentRegion } from '../../selectors/topics/select_topics_for_current_region';
import { Id as TopicId } from '../../stores/topics';
import { pickBookmarkedTopicIds } from '../../selectors/topics/pick_bookmarked_topic_ids';

const mapStateToProps = (store: Store): QuestionnaireProps => ({
    oldAnswers: pickQuestionnaire(store).oldAnswers,
    newAnswers: pickAnswers(store),
    topics: selectTopicsForCurrentRegion(store),
    savedTopicIds:  pickBookmarkedTopicIds(store),
    activeQuestion: selectActiveQuestion(store),
});

type DispatchActions = ChooseAnswerAction | SetActiveQuestionAction | CloseQuestionnaireAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): QuestionnaireActions => ({
    chooseAnswer: (answerId: Id): ChooseAnswerAction => dispatch(chooseAnswer(answerId)),
    setActiveQuestion: (activeQuestion: Id): SetActiveQuestionAction => dispatch(setActiveQuestion(activeQuestion)),
    closeQuestionnaire: (newTopics: ReadonlyArray<TopicId>): CloseQuestionnaireAction => dispatch(closeQuestionnaire(newTopics)),
});

export const QuestionnaireConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(QuestionnaireComponent);
