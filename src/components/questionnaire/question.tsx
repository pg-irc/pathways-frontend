import React from 'react';
import { Button, Grid, Row, Col, Text, View } from 'native-base';
import { Answer, AnswerActions } from './answer';
import * as selector from '../../selectors/questionnaire';
import { QuestionnaireActions } from './actions';
import { applicationStyles } from '../../application/styles';
import { questionStyles } from './styles';
import { Trans } from '@lingui/react';
import { Collapser } from '../collapser/collapser';
import { RouterProps, goToRouteWithoutParameter, Routes } from '../../application/routing';
import { History } from 'history';

export interface QuestionProps {
    readonly question: selector.Question;
    readonly isFinalQuestion: boolean;
}
type Props = QuestionProps & QuestionnaireActions & AnswerActions & RouterProps;

export const Question: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    return (
        <Collapser
            collapsedHeader={renderQuestionCollapsedHeader(props)}
            expandedHeader={renderQuestionExpandedHeader(props)}
            content={renderQuestionContent(props)}
            // TODO - This should likely be the next unaswered question in the questionnaire
            initiallyCollapsed={props.question.number === 1 ? false : true }
        />
    );
};

const renderQuestionCollapsedHeader = ({ question }: Props): JSX.Element => (
    <Text style={applicationStyles.bold}>
        <Text style={applicationStyles.bold}>{question.number}. {question.text}</Text>
    </Text>
);

const renderQuestionExpandedHeader = ({ question }: Props): JSX.Element => (
    <Row>
        <View style={questionStyles.expandedBG}>
            <Text style={questionStyles.expandedText}>{question.number}</Text>
        </View>
        <Text style={applicationStyles.bold}>{question.text}</Text>
    </Row>
);

const renderQuestionContent = ({ question, isFinalQuestion, selectAnswer, history }: Props): JSX.Element => (
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
