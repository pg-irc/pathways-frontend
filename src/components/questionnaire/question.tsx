import React from 'react';
import { Button, Grid, Row, Col, Text, View } from 'native-base';
import { Answer, Actions } from './answer';
import * as selector from '../../selectors/questionnaire';
import { QuestionnaireActions } from './actions';
import { applicationStyles } from '../../application/styles';
import { questionStyles } from './styles';
import { Trans } from '@lingui/react';
import { Collapser } from '../collapser/collapser';
import { RouterProps, goToRouteWithoutParameter, Routes } from '../../application/routing';
import { History } from 'history';

export interface Props {
    readonly question: selector.Question;
}
export type Actions = QuestionnaireActions;
type AllQuestionProps = Props & Actions & RouterProps;

export const Question: React.StatelessComponent<AllQuestionProps> = (props: AllQuestionProps): JSX.Element => {
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

const renderQuestionCollapsedHeader = ({ question }: AllQuestionProps): JSX.Element => (
    <Text style={applicationStyles.bold}>
        <Text style={applicationStyles.bold}>{question.number}. {question.text}</Text>
    </Text>
);

const renderQuestionExpandedHeader = ({ question }: AllQuestionProps): JSX.Element => (
    <Row>
        <View style={questionStyles.expandedBG}>
            <Text style={questionStyles.expandedText}>{question.number}</Text>
        </View>
        <Text style={applicationStyles.bold}>{question.text}</Text>
    </Row>
);

const renderQuestionContent = ({ question, selectAnswer, history }: AllQuestionProps): JSX.Element => (
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
            {question.isFinalQuestion ? renderFinalQuestionButton(history) : renderNextQuestionButton()}
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
