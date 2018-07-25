import React from 'react';
import { Content, Text } from 'native-base';
import { Question, Actions } from './question';
import * as selector from '../../selectors/questionnaire';
import { QuestionnaireActions } from './actions';
import { applicationStyles } from '../../application/styles';
import { questionnaireStyles } from './styles';
import { Trans } from '@lingui/react';

export interface Props {
    readonly questionnaire: selector.Questionnaire;
}

export type Actions = QuestionnaireActions;

export const Component: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => (
    <Content padder>
        <Text style={applicationStyles.pageTitle}><Trans>Personalize My Plan</Trans></Text>
        <Text style={questionnaireStyles.introText}><Trans>Immigration can be overwhelming but we are here to help!</Trans></Text>
        {props.questionnaire.map((question: selector.Question) => (
            <Question key={question.id} question={question} selectAnswer={props.selectAnswer} />
        ))}
    </Content>
);
