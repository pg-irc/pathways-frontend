import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View,  Text, Icon } from 'native-base';
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

export const Answer: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const answerType = props.answer.acceptMultipleAnswers ? AnswerType.CheckboxAnswer : AnswerType.RadioAnswer;
    const onPress = (): ChooseAnswerAction => props.chooseAnswer(props.answer.id);
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: values.lessRoundedBorderRadius,
                margin: 5,
                flex: 4,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <View style={{ flex: 4 }}>
                <Text style={textStyles.paragraphBoldBlackLeft}>
                    {props.answer.text}
                </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', paddingRight: 5 }}>
                {renderComponentForAnswerType(props, answerType)}
            </View>
        </TouchableOpacity>
    );
};

enum AnswerType {
    CheckboxAnswer,
    RadioAnswer,
}

const renderComponentForAnswerType = (props: Props, answerType: AnswerType): JSX.Element => {
    const type = 'MaterialCommunityIcons';
    const style = { color: colors.topaz };
    switch (answerType) {
        case AnswerType.CheckboxAnswer:
            return props.answer.isChosen ?
                <Icon type={type} name='checkbox-marked' style={style} /> :
                <Icon type={type} name='checkbox-blank-outline' style={style} />;
        case AnswerType.RadioAnswer:
        default:
            return props.answer.isChosen ?
                <Icon type={type} name='checkbox-blank-circle' style={style}/> :
                <Icon type={type} name='checkbox-blank-circle-outline' style={style} />;
    }
};
