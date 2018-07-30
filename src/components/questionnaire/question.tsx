import React from 'react';
import { Button, Grid, Row, Col, Text } from 'native-base';
import { Answer, AnswerActions } from './answer';
import * as selector from '../../selectors/questionnaire';
import { QuestionnaireActions } from './questionnaire';
import { questionStyles } from './styles';
import { Trans } from '@lingui/react';
import { RouterProps, goToRouteWithoutParameter, Routes } from '../../application/routing';
import { History } from 'history';
import { SetActiveQuestionAction } from '../../stores/questionnaire';

export interface QuestionProps {
    readonly question: selector.Question;
    readonly isFinalQuestion: boolean;
    readonly activeQuestion: number;
}
type Props = QuestionProps & QuestionnaireActions & AnswerActions & RouterProps;

export const Question: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const { question, selectAnswer, isFinalQuestion, history, setActiveQuestion }: Props = props;
    const nextButtonOnPress = (): SetActiveQuestionAction => setActiveQuestion(props.activeQuestion + 1);
    return (
        <Grid style={questionStyles.questionWrapper}>
            <Row>
                <Col>
                {question.explanation ? <Text style={questionStyles.explanationText}>{question.explanation}</Text> : undefined}
                {question.answers.map((answer: selector.Answer) => (
                    <Answer
                        key={answer.id}
                        answer={answer}
                        selectAnswer={selectAnswer}
                        acceptMultipleAnswers={answer.acceptMultipleAnswers}
                    />
                ))}
                </Col>
            </Row>
            <Row style={questionStyles.buttonsWrapper}>
                {isFinalQuestion ? renderFinalQuestionButton(history) : renderNextQuestionButton(nextButtonOnPress)}
            </Row>
        </Grid>
    );
};

const renderFinalQuestionButton = (history: History): JSX.Element => (
    <Button style={questionStyles.nextButton} small onPress={goToRouteWithoutParameter(Routes.MyPlan, history)}>
        <Text><Trans>GO TO MY PLAN</Trans></Text>
    </Button>
);

const renderNextQuestionButton = (onPress: () => SetActiveQuestionAction): JSX.Element => (
    <Button style={questionStyles.nextButton} small onPress={onPress}>
        <Text><Trans>NEXT</Trans></Text>
    </Button>
);
