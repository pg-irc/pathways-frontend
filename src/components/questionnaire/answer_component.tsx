import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { ChooseAnswerAction } from '../../stores/questionnaire';
import { Id } from '../../stores/questionnaire';
import { colors, values, textStyles } from '../../application/styles';
import { Answer as SelectorAnswer } from '../../selectors/questionnaire/answer';

export interface AnswerProps {
    readonly answer: SelectorAnswer;
    readonly acceptMultipleAnswers: boolean;
}
export interface AnswerActions {
    readonly chooseAnswer: (answerId: Id) => ChooseAnswerAction;
}

type Props = AnswerProps & AnswerActions;

export const AnswerComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const onPress = (): ChooseAnswerAction => props.chooseAnswer(props.answer.id);
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: values.roundedBorderRadius,
                borderWidth: 3,
                borderColor: props.answer.isChosen ? colors.topaz : colors.lightGrey,
                margin: 3,
                width: '100%',
            }}
        >
            <Text style={textStyles.headlineH3StyleBlackCenter}>
                {props.answer.text}
            </Text>
        </TouchableOpacity>
    );
};
