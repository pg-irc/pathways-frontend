import { Dispatch } from 'redux';
import { History } from 'history';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { NewTopicsModalProps, NewTopicsModalComponent, NewTopicsModalActions } from './new_topics_modal_component';
import { pickQuestionnaire } from '../../selectors/questionnaire/pick_questionnaire';
import { pickAnswers } from '../../selectors/questionnaire/pick_answers';
import { pickTopics } from '../../selectors/topics/pick_topics';
import { pickSavedTopicIds } from '../../selectors/topics/pick_saved_topic_ids';

type OwnProps = {
    readonly history: History;
    readonly isVisible: boolean;
    readonly onModalButtonPress: () => void;
};

const mapStateToProps = (store: Store, ownProps: OwnProps): NewTopicsModalProps => ({
    oldAnswers: pickQuestionnaire(store).oldAnswers,
    newAnswers: pickAnswers(store),
    topics: pickTopics(store),
    savedTopicIds: pickSavedTopicIds(store),
    isVisible: ownProps.isVisible,
});

const mapDispatchToProps = (_: Dispatch, ownProps: OwnProps): NewTopicsModalActions => ({
    onModalButtonPress: ownProps.onModalButtonPress,
});

export const NewTopicsModalConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(NewTopicsModalComponent);
