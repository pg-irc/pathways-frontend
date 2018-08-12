import React from 'react';
import { colors, values } from '../../application/styles';
import { Button, View, Text } from 'native-base';
import { Answer } from './answer';
import * as selector from '../../selectors/questionnaire/types';
import { Trans } from '@lingui/react';
import { RouterProps, goToRouteWithoutParameter, Routes } from '../../application/routing';
import { History } from 'history';
import { SetActiveQuestionAction, ChooseAnswerAction, Id } from '../../stores/questionnaire';
import { EmptyComponent } from '../empty_component/empty_component';

export interface QuestionProps {
    readonly question: selector.Question;
    readonly isFinalQuestion: boolean;
}
export interface QuestionActions {
    readonly chooseAnswer: (answerId: Id) => ChooseAnswerAction;
    readonly nextButtonOnPress: () => SetActiveQuestionAction;
}
type Props = QuestionProps & QuestionActions & RouterProps;

export const Question: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const { question, chooseAnswer, isFinalQuestion, history, nextButtonOnPress }: Props = props;
    return (
        <View style={[
            { flex: 1 },
            { marginBottom: 10 },
        ]}>
            {question.explanation ? <Text style={[{ fontSize: values.smallTextSize }]}>{question.explanation}</Text> : <EmptyComponent />}
            {question.answers.map((answer: selector.Answer) => (
                <Answer
                    key={answer.id}
                    answer={answer}
                    chooseAnswer={chooseAnswer}
                    acceptMultipleAnswers={answer.acceptMultipleAnswers}
                />
            ))}
            <View style={[
                { marginTop: 10 },
                { marginLeft: 20 },
            ]}>
                {isFinalQuestion ? renderFinalQuestionButton(history) : renderNextQuestionButton(nextButtonOnPress)}
            </View>
        </View>
    );
};

const renderFinalQuestionButton = (history: History): JSX.Element => (
    <Button style={[{ backgroundColor: colors.darkGrey }]} small onPress={goToRouteWithoutParameter(Routes.MyPlan, history)}>
        <Text><Trans>GO TO MY PLAN</Trans></Text>
    </Button>
);

const renderNextQuestionButton = (onPress: () => SetActiveQuestionAction): JSX.Element => (
    <Button style={[{ backgroundColor: colors.darkGrey }]} small onPress={onPress}>
        <Text><Trans>NEXT</Trans></Text>
    </Button>
);
