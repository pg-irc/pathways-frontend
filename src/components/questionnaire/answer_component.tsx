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

export const AnswerComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const answerType = props.answer.acceptMultipleAnswers ? AnswerType.CheckboxAnswer : AnswerType.RadioAnswer;
    const onPress = (): ChooseAnswerAction => props.chooseAnswer(props.answer.id);
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: values.lessRoundedBorderRadius,
                margin: 3,
                flex: 4,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <View style={{ flex: 4 }}>
                <Text style={textStyles.paragraphStyle}>
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
    const name = getIconName(answerType, props.answer.isChosen);
    const style = { color: colors.topaz, fontSize: values.mediumIconSize };
    return <Icon type={type} name={name} style={style} />;
};

const getIconName = (answerType: AnswerType, isChosen: boolean): string => {
    if (answerType === AnswerType.CheckboxAnswer) {
        return isChosen ? 'checkbox-marked' : 'checkbox-blank-outline';
    }
    return isChosen ? 'checkbox-blank-circle' : 'checkbox-blank-circle-outline';
};
