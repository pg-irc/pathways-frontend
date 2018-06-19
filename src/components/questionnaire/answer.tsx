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

enum AnswerType {
    CheckboxAnswer,
    RadioAnswer,
}

export const Answer: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => {
    const answerType = props.answer.acceptMultipleAnswers ? AnswerType.CheckboxAnswer : AnswerType.RadioAnswer;
    const onPress = (): SelectAnswerAction => props.selectAnswer(props.answer.id);
    return (
        <ListItem button noBorder onPress={onPress}>
            <Body>
                <Text>{props.answer.text}</Text>
            </Body>
            <Right>
                {getComponentForAnswerType(props, answerType, onPress)}
            </Right>
        </ListItem>
    );
};

const getComponentForAnswerType = (props: Props, answerType: AnswerType, onPress: () => void): JSX.Element => {
    switch (answerType) {
        case AnswerType.CheckboxAnswer:
            return <CheckBox checked={props.answer.isSelected} onPress={onPress} />;
        case AnswerType.RadioAnswer:
        default:
            return <Radio selected={props.answer.isSelected} onPress={onPress} />;
    }
};
