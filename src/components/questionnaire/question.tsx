import React from 'react';
import { Button, Grid, Row, Col, Text } from 'native-base';
import { Answer, AnswerActions } from './answer';
import * as selector from '../../selectors/questionnaire';
import { QuestionnaireActions } from './actions';
import { questionStyles } from './styles';
import { Trans } from '@lingui/react';
import { RouterProps, goToRouteWithoutParameter, Routes } from '../../application/routing';
import { History } from 'history';

export interface QuestionProps {
    readonly question: selector.Question;
    readonly isFinalQuestion: boolean;
}
type Props = QuestionProps & QuestionnaireActions & AnswerActions & RouterProps;

export const Question: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const { question, selectAnswer, isFinalQuestion, history }: Props = props;
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
                {isFinalQuestion ? renderFinalQuestionButton(history) : renderNextQuestionButton()}
            </Row>
        </Grid>
    );
};

const renderFinalQuestionButton = (history: History): JSX.Element => (
    <Button style={questionStyles.nextButton} small onPress={goToRouteWithoutParameter(Routes.MyPlan, history)}>
        <Text><Trans>GO TO MY PLAN</Trans></Text>
    </Button>
);

const renderNextQuestionButton = (): JSX.Element => (
    <Button style={questionStyles.nextButton} small>
        <Text><Trans>NEXT</Trans></Text>
    </Button>
);
