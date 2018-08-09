import React from 'react';
import { ListItem, Body, Right, Text, CheckBox, Radio } from 'native-base';
import * as selector from '../../selectors/questionnaire';
import { ChooseAnswerAction } from '../../stores/questionnaire';
import { Id } from '../../stores/questionnaire';
import { colors } from '../../application/styles';

export interface AnswerProps {
    readonly answer: selector.Answer;
    readonly acceptMultipleAnswers: boolean;
}
export interface AnswerActions {
    readonly chooseAnswer: (answerId: Id) => ChooseAnswerAction;
}

type Props = AnswerProps & AnswerActions;
enum AnswerType {
    CheckboxAnswer,
    RadioAnswer,
}

export const Answer: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const answerType = props.answer.acceptMultipleAnswers ? AnswerType.CheckboxAnswer : AnswerType.RadioAnswer;
    const onPress = (): ChooseAnswerAction => props.chooseAnswer(props.answer.id);
    return (
        <ListItem button noIndent noBorder onPress={onPress} style={[
            { backgroundColor: colors.lighterGrey },
            { borderTopColor: colors.white },
            { borderTopWidth: 1 },
        ]}>
            <Body>
                <Text style={[
                    { textAlign: 'left' },
                ]}>
                    {props.answer.text}
                </Text>
            </Body>
            <Right style={[{ paddingHorizontal: 7 }]}>
                {renderComponentForAnswerType(props, answerType, onPress)}
            </Right>
        </ListItem>
    );
};

const renderComponentForAnswerType = (props: Props, answerType: AnswerType, onPress: () => void): JSX.Element => {
    switch (answerType) {
        case AnswerType.CheckboxAnswer:
            return <CheckBox checked={props.answer.isChosen} onPress={onPress} />;
        case AnswerType.RadioAnswer:
        default:
            return <Radio selected={props.answer.isChosen} onPress={onPress} />;
    }
};
