import React from 'react';
import { Button, Grid, Row, Col, Text, View } from 'native-base';
import { Answer, Actions } from './answer';
import * as selector from '../../selectors/questionnaire';
import { QuestionnaireActions } from './actions';
import { applicationStyles } from '../../application/styles';
import { questionStyles } from './styles';
import { Trans } from '@lingui/react';
import { Collapser } from '../collapser/collapser';

export interface Props {
    readonly question: selector.Question;
    readonly questionNumber: number;
}

export type Actions = QuestionnaireActions;

export const Question: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => {
    const { question, questionNumber, selectAnswer }: Props & Actions = props;
    return (
        <Collapser
            collapsedHeader={getQuestionCollapsedHeader(questionNumber, question)}
            expandedHeader={getQuestionExpandedHeader(questionNumber, question)}
            content={getQuestionContent(question, selectAnswer)}
            // TODO - This should likely be the next unaswered question in the questionnaire
            initiallyCollapsed={questionNumber === 1 ? false : true }
        />
    );
};

const getQuestionCollapsedHeader = (questionNumber: number, question: selector.Question): JSX.Element => (
    <Text style={applicationStyles.bold}>
        <Text style={applicationStyles.bold}>{questionNumber}. {question.text}</Text>
    </Text>
);

const getQuestionExpandedHeader = (questionNumber: number, question: selector.Question): JSX.Element => (
    <Row>
        <View style={questionStyles.expandedBG}>
            <Text style={questionStyles.expandedText}>{questionNumber}</Text>
        </View>
        <Text style={applicationStyles.bold}>{question.text}</Text>
    </Row>
);

const getQuestionContent = (question: selector.Question, selectAnswer: Actions['selectAnswer']): JSX.Element => (
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
            <Button style={questionStyles.continueButton} small>
                <Text><Trans>CONTINUE</Trans></Text>
            </Button>
            <Button transparent small>
                <Text><Trans>SKIP</Trans></Text>
            </Button>
        </Row>
    </Grid>
);