import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Component, Props, Actions } from './questionnaire';
import { Store } from '../../application/store';
import { Id, SelectAnswerAction, selectAnswer } from '../../stores/questionnaire';
import { selectQuestionnaire } from '../../selectors/questionnaire';
import { selectLocale } from '../../selectors/locale';
import { LocaleManager } from '../../application/locale';

const mapStateToProps = (store: Store): Props => {
    const locale = LocaleManager.getLocale(selectLocale(store));
    return {
        questionnaire: selectQuestionnaire(locale, store),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Store>): Actions => ({
    selectAnswer: (answerId: Id): SelectAnswerAction => dispatch(selectAnswer(answerId)),
});

export const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Component);
