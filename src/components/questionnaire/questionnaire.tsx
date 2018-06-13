import React from 'react';
import { Content, View } from 'native-base';
import { Question, Actions } from './question';
import * as selector from '../../selectors/questionnaire';
import { QuestionnaireActions } from './actions';

export interface Props {
    readonly questionnaire: selector.Questionnaire;
}

export type Actions = QuestionnaireActions;

export const Component: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => (
    <Content>
        <View style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            flex: 1,
            padding: 10,
        }}>
            {props.questionnaire.map((question: selector.Question) => (
                <Question key={question.id} question={question} selectAnswer={props.selectAnswer} />
            ))}
        </View>
    </Content>
);
