import React from 'react';
import { ListItem, Body, Right, Text, CheckBox, Radio } from 'native-base';
import * as selector from '../../selectors/questionnaire';
import { SelectAnswerAction } from '../../stores/questionnaire';
import { QuestionnaireActions } from './actions';

export interface Props {
    readonly answer: selector.Answer;
    readonly acceptMultipleAnswers: boolean;
}

export type Actions = QuestionnaireActions;

export const Answer: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => {
    return props.answer.acceptMultipleAnswers ? <CheckboxAnswer {...props} /> : <RadioAnswer {...props} />;
};

const CheckboxAnswer: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => (
    renderAnswer(props, <CheckBox checked={props.answer.isSelected} />)
);

const RadioAnswer: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => (
    renderAnswer(props, <Radio selected={props.answer.isSelected} />)
);

const renderAnswer: React.StatelessComponent = (props: Props & Actions, component: JSX.Element): JSX.Element => (
    <ListItem button noBorder onPress={(): SelectAnswerAction => props.selectAnswer(props.answer.id)}>
        <Body>
            <Text>{props.answer.text}</Text>
        </Body>
        <Right>
            {component}
        </Right>
    </ListItem>
);
