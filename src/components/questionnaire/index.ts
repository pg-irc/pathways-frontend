import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Component, QuestionnaireProps } from './questionnaire';
import { QuestionnaireActions } from './actions';
import { Store } from '../../stores';
import { Id, SelectAnswerAction, selectAnswer } from '../../stores/questionnaire';
import { selectQuestionnaire } from '../../selectors/questionnaire';

const mapStateToProps = (store: Store): QuestionnaireProps => {
    return {
        questionnaire: selectQuestionnaire(store),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Store>): QuestionnaireActions => ({
    selectAnswer: (answerId: Id): SelectAnswerAction => dispatch(selectAnswer(answerId)),
});

export const QuestionnaireConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Component);
