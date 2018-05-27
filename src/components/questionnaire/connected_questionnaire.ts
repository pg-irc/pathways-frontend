import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Questionnaire, Props, Actions } from './questionnaire';
import { Store } from '../../application/store';
import { Id, SelectAnswerAction, selectAnswer } from '../../stores/questionnaire';
import { selectQuestionnaire } from '../../selectors/questionnaire';

const mapStateToProps = (store: Store): Props => ({
    questionnaire: selectQuestionnaire(store),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): Actions => ({
    selectAnswer: (answerId: Id): SelectAnswerAction => dispatch(selectAnswer(answerId)),
});

export const ConnectedQuestionnaire = connect(mapStateToProps, mapDispatchToProps)(Questionnaire);
