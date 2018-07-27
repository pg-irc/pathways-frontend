import React from 'react';
import { Content, Text } from 'native-base';
import { Question, Actions } from './question';
import * as selector from '../../selectors/questionnaire';
import { QuestionnaireActions } from './actions';
import { applicationStyles } from '../../application/styles';
import { questionnaireStyles } from './styles';
import { Trans } from '@lingui/react';
import { RouterProps } from '../../application/routing';

export interface Props {
    readonly questionnaire: selector.Questionnaire;
}
export type Actions = QuestionnaireActions;
type AllQuestionnaireProps = Props & Actions & RouterProps;

export const Component: React.StatelessComponent<AllQuestionnaireProps> = (props: AllQuestionnaireProps): JSX.Element => (
    <Content padder>
        <Text style={applicationStyles.pageTitle}><Trans>Personalize My Plan</Trans></Text>
        <Text style={questionnaireStyles.introText}>
            <Trans>There is no requirement to answer any of the following questions but in doing so you help us recommend tasks right for you.</Trans>
        </Text>
        {props.questionnaire.map((question: selector.Question) => (
            <Question
                {...props}
                key={question.id}
                question={question}
                selectAnswer={props.selectAnswer}
            />
        ))}
    </Content>
);
