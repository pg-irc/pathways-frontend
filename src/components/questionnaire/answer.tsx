import React from 'react';
import { Button, Icon, View, Text } from 'native-base';
import * as selector from '../../selectors/questionnaire';
import { SelectAnswerAction } from '../../stores/questionnaire';
import { QuestionnaireActions } from './questionnaire_actions';

export interface Props {
    readonly answer: selector.Answer;
}

export type Actions = QuestionnaireActions;

export const Answer: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => {
    return props.answer.isSelected ? <SelectedAnswer {...props} /> : <NonSelectedAnswer {...props} />;
};

const NonSelectedAnswer: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => (
    <View style={{ padding: 3 }}>
        <Button rounded block onPress={(): SelectAnswerAction => props.selectAnswer(props.answer.id)}>
            <Text>{props.answer.text}</Text>
        </Button>
    </View>
);

const SelectedAnswer: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => (
    <View style={{ padding: 3 }}>
        <Button rounded block onPress={(): SelectAnswerAction => props.selectAnswer(props.answer.id)}>
            <Text>{props.answer.text}</Text>
            <Icon name='navigate' />
        </Button>
    </View>
);
