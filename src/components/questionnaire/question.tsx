import React from 'react';
import { applicationStyles, textStyles } from '../../application/styles';
import { Button, View, Text } from 'native-base';
import { Answer } from './answer';
import { Trans } from '@lingui/react';
import { RouterProps, goToRouteWithoutParameter, Routes } from '../../application/routing';
import { History } from 'history';
import { SetActiveQuestionAction, ChooseAnswerAction, Id } from '../../stores/questionnaire';
import { EmptyComponent } from '../empty_component/empty_component';
import { Answer as SelectorAnswer } from '../../selectors/questionnaire/answer';
import { Question as SelectorQuestion } from '../../selectors/questionnaire/question';

export interface QuestionProps {
    readonly question: SelectorQuestion;
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
        <View style={{ flex: 1, marginBottom: 10 }}>
            {question.explanation ? <Text style={textStyles.paragraphSmallStyleLeft}>{question.explanation}</Text> : <EmptyComponent />}
            {question.answers.map((answer: SelectorAnswer) => (
                <Answer
                    key={answer.id}
                    answer={answer}
                    chooseAnswer={chooseAnswer}
                    acceptMultipleAnswers={answer.acceptMultipleAnswers}
                />
            ))}
            <View style={{ marginTop: 5, marginLeft: 5 }}>
                {isFinalQuestion ? renderFinalQuestionButton(history) : renderNextQuestionButton(nextButtonOnPress)}
            </View>
        </View>
    );
};

const renderFinalQuestionButton = (history: History): JSX.Element => (
    <Button style={applicationStyles.orangeButton} small onPress={goToRouteWithoutParameter(Routes.MyPlan, history)}>
        <Text style={textStyles.button}><Trans>Go to my plan</Trans></Text>
    </Button>
);

const renderNextQuestionButton = (onPress: () => SetActiveQuestionAction): JSX.Element => (
    <Button style={applicationStyles.orangeButton} small onPress={onPress}>
        <Text style={textStyles.button}><Trans>Next</Trans></Text>
    </Button>
);
