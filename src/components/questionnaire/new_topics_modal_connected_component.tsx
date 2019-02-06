import { Dispatch } from 'redux';
import { History } from 'history';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { NewTopicsModalProps, NewTopicsModalComponent, NewTopicsModalActions } from './new_topics_modal_component';
import { pickQuestionnaire } from '../../selectors/questionnaire/pick_questionnaire';
import { pickAnswers } from '../../selectors/questionnaire/pick_answers';
import { pickTasks } from '../../selectors/tasks/pick_tasks';
import { pickSavedTaskIds } from '../../selectors/tasks/pick_saved_task_ids';
import { selectLocale } from '../../selectors/locale/select_locale';

type OwnProps = {
    readonly history: History;
    readonly isVisible: boolean;
    readonly onModalButtonPress: () => void;
};

const mapStateToProps = (store: Store, ownProps: OwnProps): NewTopicsModalProps => ({
    oldAnswers: pickQuestionnaire(store).oldAnswers,
    newAnswers: pickAnswers(store),
    topics: pickTasks(store),
    savedTopicIds: pickSavedTaskIds(store),
    locale: selectLocale(store),
    history: ownProps.history,
    isVisible: ownProps.isVisible,
});

const mapDispatchToProps = (_: Dispatch, ownProps: OwnProps ): NewTopicsModalActions => ({
    onModalButtonPress: ownProps.onModalButtonPress,
});

export const NewTopicsModalConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(NewTopicsModalComponent);
